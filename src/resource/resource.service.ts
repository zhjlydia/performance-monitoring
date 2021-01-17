import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { PageResourcesQuery, ResourceDto } from 'core/models/resource'
import { Report } from 'core/schemas/report.schema'
import { Resource, ResourceDocument } from 'core/schemas/resource.schema'
import { formatQueryDatetoUtc } from 'core/utils'
import { Model } from 'mongoose'

@Injectable()
export class ResourceService {
  constructor(
    @InjectModel(Resource.name)
    private readonly resourceModel: Model<ResourceDocument>
  ) {}

  async create(report: Report): Promise<boolean> {
    const resourceList = report.resourceList as any
    let insertResourceList: Resource[] = []
    if (resourceList && resourceList.length) {
      insertResourceList = resourceList.map(element => {
        return {
          appId: report.appId,
          reportMark: report.reportMark,
          url: report.url,
          name: element.name,
          initiatorType: element.initiatorType,
          duration: element.duration,
          nextHopProtocol: element.nextHopProtocol,
          reportedAt: report.createdAt
        }
      })
      try {
        await this.resourceModel.insertMany(insertResourceList)
        return true
      } catch (error) {
        return false
      }
    }
    return true
  }

  async findAll(): Promise<Resource[]> {
    return this.resourceModel.find()
  }

  async getPageResources(
    PageResourcesQuery: PageResourcesQuery
  ): Promise<ResourceDto[]> {
    const { appId, url, begin, end } = PageResourcesQuery
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

    const group_id = '$name'
    const data = await this.resourceModel
      .aggregate([
        queryjson,
        {
          $group: {
            _id: group_id,
            duration: { $avg: '$duration' },
            initiatorType: {
              $first: '$initiatorType'
            },
            nextHopProtocol: {
              $first: '$nextHopProtocol'
            }
          }
        },
        {
          $project: {
            _id: 0,
            name: '$_id',
            duration: 1,
            initiatorType: 1,
            nextHopProtocol: 1
          }
        }
      ])
      .read('sp')
      .exec()

    return data
  }
}
