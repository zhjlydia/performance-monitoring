import { Controller, Get, Query } from '@nestjs/common'
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger'
import { PaginatedResponse } from 'core/decorators/PaginatedResponse'
import { HandledException } from 'core/exception'
import { PaginatedDto } from 'core/models/common'
import {
  PerformanceDetailQuery,
  PerformanceDto,
  PerformanceQuery
} from 'core/models/page'
import { Page } from 'core/schemas/page.schema'
import { PageService } from '../page/page.service'

@ApiTags('页面性能')
@Controller('page')
@ApiExtraModels(PaginatedDto, PerformanceDto)
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @ApiOperation({ summary: '获取所有数据' })
  @ApiOkResponse({ type: [Page] })
  @Get('all')
  async findAll() {
    return this.pageService.findAll()
  }

  @ApiOperation({ summary: '获取页面性能数据列表，按pv降序' })
  @PaginatedResponse(PerformanceDto)
  @Get('getAveragePerformance')
  async getAveragePerformance(@Query() query: PerformanceQuery) {
    return this.pageService.getAveragePerformance(query)
  }

  @ApiOperation({ summary: '获取单个页面性能数据' })
  @ApiOkResponse({ type: PerformanceDto })
  @Get('getPerformanceDetail')
  async getPerformanceDetail(@Query() query: PerformanceDetailQuery) {
    if (!query.url) {
      throw new HandledException('url不允许为空')
    }
    return this.pageService.getPerformanceDetail(query)
  }
}
