import { EnvironmentService } from '@/environment/environment.service'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Statis, StatisDocument } from 'core/schemas/statis.schema'
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
    return historyPv.length ? historyPv[0].pv + todayPv : todayPv
  }
}
