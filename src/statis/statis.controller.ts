import { Controller, Get, Query } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
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
}
