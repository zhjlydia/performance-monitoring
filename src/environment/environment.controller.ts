import { Controller, Get, Query } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { EnvironmentQuery, GroupDataDto } from 'core/models/environment'
import { Environment } from 'core/schemas/environment.schema'
import { EnvironmentService } from '../environment/environment.service'

@ApiTags('用户环境')
@Controller('environment')
export class EnvironmentController {
  constructor(private readonly environmentService: EnvironmentService) {}

  @ApiOperation({ summary: '获取所有数据' })
  @ApiOkResponse({ type: [Environment] })
  @Get('all')
  async findAll() {
    return this.environmentService.findAll()
  }

  @ApiOperation({ summary: '获取用户环境信息/pv分布图' })
  @ApiOkResponse({ type: [GroupDataDto] })
  @Get('getDataGroupBy')
  async getDataGroupBy(@Query() query: EnvironmentQuery) {
    return this.environmentService.getDataGroupBy(query)
  }
}
