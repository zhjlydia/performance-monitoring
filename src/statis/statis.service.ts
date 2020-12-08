import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Statis, StatisDocument } from 'core/schemas/statis.schema'
import { Model } from 'mongoose'

@Injectable()
export class StatisService {
  constructor(
    @InjectModel(Statis.name)
    private readonly statisModel: Model<StatisDocument>
  ) {}

  async create(statis: Statis): Promise<Statis> {
    const newStatis = new this.statisModel({
      ...statis
    })
    return newStatis.save()
  }

  async createMany(statisList: Statis[]): Promise<boolean> {
    try {
      const res = await this.statisModel.insertMany(statisList)
      console.log(res)
      return true
    } catch (error) {
      return false
    }
  }
}
