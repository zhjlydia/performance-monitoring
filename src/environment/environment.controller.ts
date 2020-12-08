import { Controller, Get, Query } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { EnvironmentReq, GroupData } from 'core/models/environment'
import { Environment } from 'core/schemas/environment.schema'
import { EnvironmentService } from '../environment/environment.service'

@ApiTags('用户环境')
@Controller('environment')
export class EnvironmentController {
  constructor(private readonly environmentService: EnvironmentService) {}

  @ApiOperation({ summary: '获取所有数据' })
  @Get('all')
  async findAll(): Promise<Environment[]> {
    return this.environmentService.findAll()
  }

  @ApiOperation({ summary: '获取用户环境信息/pv分布图' })
  @ApiResponse({
    schema: {}
  })
  @Get('getDataGroupBy')
  async getDataGroupBy(@Query() query: EnvironmentReq): Promise<GroupData[]> {
    return this.environmentService.getDataGroupBy(query)
  }
}
