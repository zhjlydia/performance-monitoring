import { EnvironmentService } from '@/environment/environment.service'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { AppIdTimeReq } from 'core/models/common'
import { Statis, StatisDocument } from 'core/schemas/statis.schema'
import { formatQueryDatetoUtc } from 'core/utils'
import dayjs from 'dayjs'
import { Model } from 'mongoose'

@Injectable()
export class StatisService {
  constructor(
    @InjectModel(Statis.name)
    private readonly statisModel: Model<StatisDocument>,
    private readonly environmentService: EnvironmentService
  ) {}

  async create(statis: Statis): Promise<Statis> {
    const newStatis = new this.statisModel({
      ...statis
    })
    return newStatis.save()
  }

  async createMany(statisList: Statis[]): Promise<boolean> {
    try {
      await this.statisModel.insertMany(statisList)
      return true
    } catch (error) {
      return false
    }
  }

  async getTotalPvByAppId(appId: string): Promise<number> {
    const historyPv = await this.statisModel.aggregate([
      {
        $match: {
          appId,
          type: 'pv'
        }
      },
      { $group: { _id: null, pv: { $sum: '$data' } } },
      {
        $project: {
          _id: 0,
          pv: 1
        }
      }
    ])
    const begin = dayjs()
      .startOf('date')
      .format('YYYY-MM-DD')
    const todayPv = await this.environmentService.pvByAppId(appId, { begin })
    return historyPv.length ? (historyPv[0] as any).pv + todayPv : todayPv
  }

  async getTotalUvByAppId(appId: string): Promise<number> {
    const historyUv = await this.statisModel.aggregate([
      {
        $match: {
          appId,
          type: 'uv'
        }
      },
      { $group: { _id: null, uv: { $sum: '$data' } } },
      {
        $project: {
          _id: 0,
          uv: 1
        }
      }
    ])
    const begin = dayjs()
      .startOf('date')
      .format('YYYY-MM-DD')
    const todayUv = await this.environmentService.uvByAppId(appId, { begin })
    return historyUv.length ? (historyUv[0] as any).uv + todayUv : todayUv
  }

  async getDailyPvAndUv(req: AppIdTimeReq): Promise<any> {
    const { begin, appId } = req
    let end = req.end
    let includeToday = false
    if (!dayjs(end).isBefore(dayjs(), 'day')) {
      includeToday = true
      end = dayjs()
        .subtract(1, 'day')
        .format('YYYY-MM-DD')
    }

    let dayDiff = dayjs(end).diff(begin, 'day') + 1
    dayDiff = includeToday ? dayDiff - 1 : dayDiff
    const dateArray = []
    for (let i = 0; i <= dayDiff; i++) {
      dateArray.push(
        formatQueryDatetoUtc(
          dayjs(begin)
            .add(i, 'day')
            .format('YYYY-MM-DD')
        )
      )
    }
    const queryjson = {
      $match: {
        appId,
        $or: [{ type: 'uv' }, { type: 'pv' }],
        time: {
          $gte: formatQueryDatetoUtc(begin),
          $lte: formatQueryDatetoUtc(end)
        }
      }
    }
    let historyPvUv = await this.statisModel.aggregate([
      queryjson,
      {
        $group: {
          _id: '$type',
          statis: {
            $push: {
              time: '$time',
              count: '$data'
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          type: '$_id',
          statis: 1
        }
      },
      {
        $addFields: {
          statis: {
            $reduce: {
              input: {
                $setDifference: [dateArray, '$statis.time']
              },
              initialValue: '$statis',
              in: {
                $concatArrays: [
                  '$$value',
                  [
                    {
                      time: '$$this',
                      count: 0
                    }
                  ]
                ]
              }
            }
          }
        }
      }
    ])
    let todayUv = 0
    let todayPv = 0
    const today = dayjs()
      .startOf('date')
      .format('YYYY-MM-DD')
    if (includeToday) {
      todayUv = await this.environmentService.uvByAppId(appId, { begin: today })
      todayPv = await this.environmentService.pvByAppId(appId, { begin: today })
    }
    // if (!historyPvUv.length) {
    //   const mock = dateArray.map(item => {
    //     return {
    //       time: item,
    //       count: 0
    //     }
    //   })
    //   historyPvUv = [
    //     { type: 'pv', statis: mock },
    //     { type: 'uv', statis: mock }
    //   ]
    // }
    return historyPvUv.map((item: any) => {
      if (includeToday) {
        if (item.type === 'pv') {
          item.statis = item.statis.concat([
            { time: formatQueryDatetoUtc(today), count: 1 }
          ])
        } else if (item.type === 'uv') {
          item.statis = item.statis.concat([
            { time: formatQueryDatetoUtc(today), count: 2 }
          ])
        }
      }
      return {
        type: item.type,
        statis: item.statis.sort((a, b) => {
          return a.time - b.time
        })
      }
    })
  }
}
