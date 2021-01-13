import { Body, Controller, Get, Post } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { HandledException } from 'core/exception'
import { CreateSiteVo } from 'core/models/site'
import { Site } from 'core/schemas/site.schema'
import { SiteService } from './site.service'

@ApiTags('应用')
@Controller('site')
export class SiteController {
  constructor(private readonly siteService: SiteService) {}

  @ApiOperation({ summary: '创建应用' })
  @Post()
  async create(@Body() createSiteVo: CreateSiteVo): Promise<string> {
    const res: Site = await this.siteService.create(createSiteVo)
    if (!res) {
      throw new HandledException('创建应用失败')
    }
    return res.appId
  }

  @ApiOperation({ summary: '获取所有应用' })
  @Get('all')
  async findAll(): Promise<Site[]> {
    return this.siteService.findAll()
  }
}
