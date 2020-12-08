import { Controller, Get, Query } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { HandledException } from 'core/exception'
import { PerformanceDetailReq, PerformanceReq } from 'core/models/page'
import { Page } from 'core/schemas/page.schema'
import { PageService } from '../page/page.service'

@ApiTags('页面性能')
@Controller('page')
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @ApiOperation({ summary: '获取所有数据' })
  @Get('all')
  async findAll(): Promise<Page[]> {
    return this.pageService.findAll()
  }

  @ApiOperation({ summary: '获取页面性能数据列表，按pv降序' })
  @Get('getAveragePerformance')
  async getAveragePerformance(@Query() query: PerformanceReq): Promise<any> {
    return this.pageService.getAveragePerformance(query)
  }

  @ApiOperation({ summary: '获取单个页面性能数据' })
  @Get('getPerformanceDetail')
  async getPerformanceDetail(
    @Query() query: PerformanceDetailReq
  ): Promise<any> {
    if (!query.url) {
      throw new HandledException('url不允许为空')
    }
    return this.pageService.getPerformanceDetail(query)
  }
}
