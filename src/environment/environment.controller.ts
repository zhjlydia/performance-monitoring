import { Controller, Get, Query } from '@nestjs/common'
import { ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger'
import { SimpleResponse } from 'core/decorators/simpleResponse'
import { BaseResponse } from 'core/models/base'
import { EnvironmentReq, GroupData } from 'core/models/environment'
import { Environment } from 'core/schemas/environment.schema'
import { EnvironmentService } from '../environment/environment.service'

@ApiTags('用户环境')
@ApiExtraModels(BaseResponse)
@Controller('environment')
export class EnvironmentController {
  constructor(private readonly environmentService: EnvironmentService) {}

  @ApiOperation({ summary: '获取所有数据' })
  @Get('all')
  async findAll(): Promise<Environment[]> {
    return this.environmentService.findAll()
  }

  @ApiOperation({ summary: '获取用户环境信息/pv分布图' })
  @SimpleResponse(GroupData)
  @Get('getDataGroupBy')
  async getDataGroupBy(@Query() query: EnvironmentReq): Promise<GroupData[]> {
    return this.environmentService.getDataGroupBy(query)
  }
}
