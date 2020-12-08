import { EnvironmentService } from '@/environment/environment.service'
import { PageService } from '@/page/page.service'
import { ResourceService } from '@/resource/resource.service'
import { Body, Controller, Post, Req } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { HandledException } from 'core/exception'
import { CreateReportDto } from 'core/models/report'
import { ReportService } from '../report/report.service'

@ApiTags('上报')
@Controller('report')
export class ReportController {
  constructor(
    private readonly reportService: ReportService,
    private readonly pageService: PageService,
    private readonly environmentService: EnvironmentService,
    private readonly resourceService: ResourceService
  ) {}

  @ApiOperation({ summary: '监控数据上报接口' })
  @Post()
  async create(
    @Req() req: any,
    @Body() createReportDto: CreateReportDto
  ): Promise<boolean> {
    const userAgent = req.headers['user-agent']
    const newReport = await this.reportService.create(
      req.ip,
      userAgent,
      createReportDto
    )
    if (newReport) {
      const res = await Promise.all([
        this.pageService.create(newReport),
        this.environmentService.create(newReport),
        this.resourceService.create(newReport)
      ])
      if (res.filter(item => !item).length) {
        return false
      } else {
        return true
      }
    } else {
      throw new HandledException('创建记录失败')
    }
  }
}
