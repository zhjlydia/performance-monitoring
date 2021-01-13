import { randomString } from '@/common/utils'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { CreateSiteVo } from 'core/models/site'
import { Site, SiteDocument } from 'core/schemas/site.schema'
import { Model } from 'mongoose'

@Injectable()
export class SiteService {
  constructor(
    @InjectModel(Site.name) private readonly siteModel: Model<SiteDocument>
  ) {}

  async create(createSiteVo: CreateSiteVo): Promise<Site> {
    const createdSite = new this.siteModel({
      domain: createSiteVo.domain,
      name: createSiteVo.name,
      appId: randomString(),
      isOpen: createSiteVo.isOpen
    })
    return createdSite.save()
  }

  async findAll(): Promise<Site[]> {
    return this.siteModel.find().select({ _id: 0 })
  }
}
