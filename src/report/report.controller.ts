import { EnvironmentService } from '@/environment/environment.service'
import { PageService } from '@/page/page.service'
import { ResourceService } from '@/resource/resource.service'
import { Controller, Get, Query, Req } from '@nestjs/common'
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger'
import { HandledException } from 'core/exception'
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
  @ApiQuery({
    name: 'reportJsonString',
    description: 'JSONString数据',
    example:
      '{"appId":"hkoqeiXDti02zIz0Nuu66","url":"https://docs.nestjs.com/custom-decorators","net":"4G","performance":{"fp":120,"fcp":150,"load":500,"tti":886,"dns":50,"tcp":20},"resourceList":[{"name":"https://use.fontawesome.com/releases/v5.0.8/js/all.js","initiatorType":"script","duration":217,"nextHopProtocol":"h2"},{"name":"https://use.fontawesome.com/releases/v5.0.8/js/example.js","initiatorType":"script","duration":217,"nextHopProtocol":"h2"}]}'
  })
  @Get()
  async create(
    @Req() req: any,
    @Query('reportJsonString') reportJsonString: string
  ): Promise<boolean> {
    const userAgent = req.headers['user-agent']
    const dto = JSON.parse(reportJsonString)
    const newReport = await this.reportService.create(req.ip, userAgent, dto)
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
