import { randomString } from '@/common/utils'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { CreateSiteDto } from 'core/models/site'
import { Site, SiteDocument } from 'core/schemas/site.schema'
import { Model } from 'mongoose'

@Injectable()
export class SiteService {
  constructor(
    @InjectModel(Site.name) private readonly siteModel: Model<SiteDocument>
  ) {}

  async create(createSiteDto: CreateSiteDto): Promise<Site> {
    const createdSite = new this.siteModel({
      domain: createSiteDto.domain,
      name: createSiteDto.name,
      appId: randomString(),
      isOpen: createSiteDto.isOpen
    })
    return createdSite.save()
  }

  async findAll(): Promise<Site[]> {
    return this.siteModel.find().select({ _id: 0 })
  }
}
