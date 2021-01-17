import { Controller, Get, Query } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { AppIdTimeQuery } from 'core/models/common'
import { StatisGroupDto } from 'core/models/statis'
import { StatisService } from './statis.service'

@ApiTags('统计')
@Controller('statis')
export class StatisController {
  constructor(private readonly statisService: StatisService) {}

  @ApiOperation({ summary: '获取应用总pv' })
  @ApiOkResponse({ type: Number })
  @Get('getTotalPvByAppId')
  async getTotalPvByAppId(@Query('appId') appId: string) {
    return this.statisService.getTotalPvByAppId(appId)
  }

  @ApiOperation({ summary: '获取应用总uv' })
  @ApiOkResponse({ type: Number })
  @Get('getTotalUvByAppId')
  async getTotalUvByAppId(@Query('appId') appId: string) {
    return this.statisService.getTotalUvByAppId(appId)
  }

  @ApiOperation({ summary: '获取pvuv分日数据' })
  @ApiOkResponse({ type: [StatisGroupDto] })
  @Get('getDailyPvAndUv')
  async getDailyPvAndUv(@Query() query: AppIdTimeQuery) {
    return this.statisService.getDailyPvAndUv(query)
  }
}
