import { HttpService, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectModel } from '@nestjs/mongoose'
import { IpLibrary, IpLibraryDocument } from 'core/schemas/ipLibrary.schema'
import { Model } from 'mongoose'

@Injectable()
export class IpLibraryService {
  constructor(
    @InjectModel(IpLibrary.name)
    private readonly ipLibraryModel: Model<IpLibraryDocument>,
    private httpService: HttpService,
    private configService: ConfigService
  ) {}

  async getLocationByIp(ip: string): Promise<IpLibrary> {
    if (!ip || ip === '127.0.0.1') {
      return null
    }
    const data = await this.ipLibraryModel.findOne({ ip })
    if (data) {
      return data
    } else {
      const res = (await this.httpService
        .get(
          `https://api.map.baidu.com/location/ip?ip=${ip}&ak=${this.configService.get<
            string
          >('BAIDUMAPKEY')}&coor=bd09ll`
        )
        .toPromise()) as any
      if (res.data.status === 0 && res.data.content) {
        const locationData = res.data.content
        const ipLibraryDto = {
          ip,
          country: locationData.address_detail.country,
          province: locationData.address_detail.province,
          city: locationData.address_detail.city,
          latitude: locationData.point.y,
          longitude: locationData.point.x
        }
        const newIpLibrary = new this.ipLibraryModel(ipLibraryDto)
        return newIpLibrary.save()
      }
    }
  }
}
