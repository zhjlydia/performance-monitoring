import { Controller, Get, Query } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { HandledException } from 'core/exception'
import { PageResourcesReq } from 'core/models/resource'
import { Resource } from 'core/schemas/resource.schema'
import { ResourceService } from '../resource/resource.service'

@ApiTags('请求资源')
@Controller('resource')
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) {}

  @ApiOperation({ summary: '获取所有数据' })
  @Get('all')
  async findAll(): Promise<Resource[]> {
    return this.resourceService.findAll()
  }

  @ApiOperation({ summary: '获取单个页面资源数据' })
  @Get('getPageResources')
  async getPageResources(@Query() query: PageResourcesReq): Promise<any> {
    if (!query.url) {
      throw new HandledException('url不允许为空')
    }
    return this.resourceService.getPageResources(query)
  }
}
