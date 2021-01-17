import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { PaginatedDto } from 'core/models/common'
import {
  PerformanceDetailQuery,
  PerformanceDto,
  PerformanceQuery
} from 'core/models/page'
import { Page, PageDocument } from 'core/schemas/page.schema'
import { Report } from 'core/schemas/report.schema'
import { formatQueryDatetoUtc } from 'core/utils'
import { Model } from 'mongoose'

@Injectable()
export class PageService {
  constructor(
    @InjectModel(Page.name) private readonly pageModel: Model<PageDocument>
  ) {}

  async create(report: Report): Promise<boolean> {
    const newPageDto = {
      appId: report.appId,
      reportMark: report.reportMark,
      ip: report.ip,
      url: report.url,
      fp: (report.performance as any).fp,
      fcp: (report.performance as any).fcp,
      load: (report.performance as any).load,
      tti: (report.performance as any).tti,
      dns: (report.performance as any).dns,
      tcp: (report.performance as any).tcp,
      reportedAt: report.createdAt
    }
    try {
      const newPage = new this.pageModel(newPageDto)
      await newPage.save()
      return true
    } catch (error) {
      return false
    }
  }

  async findAll(): Promise<Page[]> {
    return this.pageModel.find()
  }

  async getAveragePerformance(
    query: PerformanceQuery
  ): Promise<PaginatedDto<PerformanceDto>> {
    const { appId, url, index, size, begin, end } = query
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
    if (url) {
      Object.assign(queryjson.$match, { url: { $regex: new RegExp(url, 'i') } })
    }

    const group_id = '$url'
    const count = Promise.resolve(
      this.pageModel
        .distinct('url', queryjson.$match)
        .read('sp')
        .exec()
    )
    const datas = Promise.resolve(
      this.pageModel
        .aggregate([
          queryjson,
          {
            $group: {
              _id: group_id,
              pv: { $sum: 1 },
              fp: { $avg: '$fp' },
              fcp: { $avg: '$fcp' },
              load: { $avg: '$load' },
              tti: { $avg: '$tti' },
              dns: { $avg: '$dns' },
              tcp: { $avg: '$tcp' }
            }
          },
          {
            $project: {
              _id: 0,
              url: '$_id',
              pv: 1,
              fp: 1,
              fcp: 1,
              load: 1,
              tti: 1,
              dns: 1,
              tcp: 1
            }
          },
          { $skip: (Number(index) - 1) * Number(size) },
          { $sort: { pv: -1 } },
          { $limit: Number(size) }
        ])
        .read('sp')
        .exec()
    )
    const all = await Promise.all([count, datas])
    const [totalNum, datalist] = all

    return {
      list: datalist,
      total: totalNum.length
    }
  }

  async getPerformanceDetail(
    query: PerformanceDetailQuery
  ): Promise<PerformanceDto> {
    const { appId, url, begin, end } = query
    const queryjson = {
      $match: {
        appId,
        url,
        reportedAt: {
          $gte: begin
            ? formatQueryDatetoUtc(begin)
            : formatQueryDatetoUtc('2020-10-01'),
          $lte: end ? formatQueryDatetoUtc(end) : new Date()
        }
      }
    }

    const group_id = '$url'
    const data = await this.pageModel
      .aggregate([
        queryjson,
        {
          $group: {
            _id: group_id,
            pv: { $sum: 1 },
            fp: { $avg: '$fp' },
            fcp: { $avg: '$fcp' },
            load: { $avg: '$load' },
            tti: { $avg: '$tti' },
            dns: { $avg: '$dns' },
            tcp: { $avg: '$tcp' }
          }
        },
        {
          $project: {
            _id: 0,
            url: '$_id',
            pv: 1,
            fp: 1,
            fcp: 1,
            load: 1,
            tti: 1,
            dns: 1,
            tcp: 1
          }
        }
      ])
      .read('sp')
      .exec()

    if (data && data.length) {
      return data[0]
    }
    return null
  }
}
