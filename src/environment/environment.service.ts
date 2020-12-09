import { IpLibraryService } from '@/ipLibrary/ipLibrary.service'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { TimeReq } from 'core/models/common'
import { EnvironmentReq, GroupData } from 'core/models/environment'
import {
  Environment,
  EnvironmentDocument
} from 'core/schemas/environment.schema'
import { Report } from 'core/schemas/report.schema'
import { formatQueryDatetoUtc } from 'core/utils'
import { Model } from 'mongoose'
import UAParser from 'ua-parser-js'

@Injectable()
export class EnvironmentService {
  constructor(
    @InjectModel(Environment.name)
    private readonly environmentModel: Model<EnvironmentDocument>,
    private ipLibraryService: IpLibraryService
  ) {}

  async create(report: Report): Promise<boolean> {
    // 检测用户UA相关信息
    const parser = new UAParser()
    parser.setUA(report.userAgent)
    const result = parser.getResult()
    const locationData = await this.ipLibraryService.getLocationByIp(report.ip)
    const newEnvironmentDto = {
      appId: report.appId,
      reportMark: report.reportMark,
      ip: report.ip,
      net: report.net,
      browser: result.browser.name || '',
      borwserVersion: result.browser.version || '',
      system: result.os.name || '',
      systemVersion: result.os.version || '',
      country: locationData ? locationData.country : '',
      province: locationData ? locationData.province : '',
      city: locationData ? locationData.city : '',
      reportedAt: report.createdAt
    }
    try {
      const newEnvironment = new this.environmentModel(newEnvironmentDto)
      await newEnvironment.save()
      return true
    } catch (error) {
      return false
    }
  }

  async findAll(): Promise<Environment[]> {
    return this.environmentModel.find()
  }

  async getDataGroupBy(req: EnvironmentReq): Promise<GroupData[]> {
    const { beginTime, endTime, type, appId } = req
    const queryjson = {
      $match: {
        appId,
        reportedAt: {
          $gte: beginTime
            ? formatQueryDatetoUtc(beginTime)
            : formatQueryDatetoUtc('2020-10-01'),
          $lte: endTime ? formatQueryDatetoUtc(endTime) : new Date()
        }
      }
    }

    const group_id = `$${type}`

    const datas = await this.environmentModel
      .aggregate([
        queryjson,
        {
          $group: {
            _id: group_id,
            count: { $sum: 1 }
          }
        },
        {
          $project: { _id: 0, name: '$_id', count: 1 }
        },
        { $sort: { count: -1 } },
        { $limit: 10 }
      ])
      .exec()
    return datas
  }

  // pv
  async pv(req: TimeReq): Promise<any> {
    const { begin, end } = req
    const queryjson = {
      $match: {
        reportedAt: {
          $gte: begin
            ? formatQueryDatetoUtc(begin)
            : formatQueryDatetoUtc('2020-10-01'),
          $lte: end ? formatQueryDatetoUtc(end) : new Date()
        }
      }
    }
    return this.environmentModel
      .aggregate([
        queryjson,
        {
          $group: { _id: '$appId', pv: { $sum: 1 } }
        },
        {
          $project: { _id: 0, appId: '$_id', pv: 1 }
        }
      ])
      .read('sp')
      .exec()
  }

  // uv
  async uv(req: TimeReq): Promise<any> {
    const { begin, end } = req
    const queryjson = {
      $match: {
        reportedAt: {
          $gte: begin
            ? formatQueryDatetoUtc(begin)
            : formatQueryDatetoUtc('2020-10-01'),
          $lte: end ? formatQueryDatetoUtc(end) : new Date()
        }
      }
    }

    return this.environmentModel
      .aggregate([
        queryjson,
        {
          $group: { _id: { appId: '$appId', ip: '$ip' } }
        },
        {
          $project: { _id: 0, appId: '$_id.appId', ip: '$_id.ip' }
        },
        {
          $group: {
            _id: '$appId',
            uv: { $sum: 1 }
          }
        },
        {
          $project: { _id: 0, appId: '$_id', uv: 1 }
        }
      ])
      .read('sp')
      .exec()
  }

  // pv
  async pvByAppId(appId: string, req: TimeReq): Promise<number> {
    const { begin, end } = req
    const queryjson = {
      $match: {
        appId,
        reportedAt: {
          $gte: begin
            ? formatQueryDatetoUtc(begin)
            : formatQueryDatetoUtc('2020-10-01'),
          $lte: end ? formatQueryDatetoUtc(end) : new Date()
        }
      }
    }
    return this.environmentModel.countDocuments(queryjson.$match)
  }

  // uv
  async uvByAppId(appId: string, req: TimeReq): Promise<number> {
    const { begin, end } = req
    const queryjson = {
      $match: {
        appId,
        reportedAt: {
          $gte: begin
            ? formatQueryDatetoUtc(begin)
            : formatQueryDatetoUtc('2020-10-01'),
          $lte: end ? formatQueryDatetoUtc(end) : new Date()
        }
      }
    }
    const res = await this.environmentModel
      .aggregate([
        queryjson,
        {
          $group: { _id: '$ip' }
        },
        {
          $group: { _id: null, uv: { $sum: 1 } }
        },
        {
          $project: { _id: 0, uv: 1 }
        }
      ])
      .read('sp')
      .exec()

    return res && res.length ? res[0].uv : 0
  }
}
