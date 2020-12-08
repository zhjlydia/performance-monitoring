import { ApiProperty } from '@nestjs/swagger'
import { Pagination } from './common'

export class PerformanceDto {
  @ApiProperty({ description: '首次绘制时间(ms)' })
  readonly fp: number
  @ApiProperty({ description: '首次内容绘制时间(ms)' })
  readonly fcp: number
  @ApiProperty({ description: '页面完全加载时间(ms)' })
  readonly load: number
  @ApiProperty({ description: '页面可交互时间(ms)' })
  readonly tti: number
  @ApiProperty({ description: 'DNS查询时间(ms)' })
  readonly dns: number
  @ApiProperty({ description: 'TCP连接时间(ms)' })
  readonly tcp: number
}

export class PerformanceReq extends Pagination {
  @ApiProperty({ description: '应用唯一标识' })
  appId: string
  @ApiProperty({ description: '页面url，可按url查询', required: false })
  url?: string
  @ApiProperty({
    description: '开始时间',
    required: false
  })
  begin?: string
  @ApiProperty({ description: '结束时间', required: false })
  end?: string
}

export class PerformanceDetailReq {
  @ApiProperty({ description: '应用唯一标识' })
  appId: string
  @ApiProperty({ description: '页面url' })
  url: string
  @ApiProperty({
    description: '开始时间',
    required: false
  })
  begin?: string
  @ApiProperty({ description: '结束时间', required: false })
  end?: string
}
