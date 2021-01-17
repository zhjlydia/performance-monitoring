import { ApiProperty } from '@nestjs/swagger'
import { PerformanceVo } from 'core/models/page'
import { ResourceVo } from './resource'

export class ReportVo {
  @ApiProperty({ description: '应用唯一标识' })
  readonly appId: string
  @ApiProperty({ description: '访问页面url' })
  readonly url: number
  @ApiProperty({ description: '用户网络' })
  readonly net: string
  @ApiProperty({ description: '页面性能数据' })
  readonly performance: PerformanceVo
  @ApiProperty({ description: '页面资源数据', isArray: true })
  readonly resourceList: ResourceVo
}
