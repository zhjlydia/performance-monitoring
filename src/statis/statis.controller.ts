import { Controller, Get, Query } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { AppIdTimeReq } from 'core/models/common'
import { StatisService } from './statis.service'

@ApiTags('统计')
@Controller('statis')
export class StatisController {
  constructor(private readonly statisService: StatisService) {}

  @ApiOperation({ summary: '获取应用总pv' })
  @Get('getTotalPvByAppId')
  async getTotalPvByAppId(@Query('appId') appId: string): Promise<number> {
    return this.statisService.getTotalPvByAppId(appId)
  }

  @ApiOperation({ summary: '获取应用总uv' })
  @Get('getTotalUvByAppId')
  async getTotalUvByAppId(@Query('appId') appId: string): Promise<number> {
    return this.statisService.getTotalUvByAppId(appId)
  }

  @ApiOperation({ summary: '获取pvuv分日数据' })
  @Get('getDailyPvAndUv')
  async getDailyPvAndUv(@Query() query: AppIdTimeReq): Promise<any> {
    return this.statisService.getDailyPvAndUv(query)
  }
}
