import { ApiProperty } from '@nestjs/swagger'
export class CreateEnvironmentFromReport {
  readonly appId: string
  readonly reportMark: string
  readonly ip: string
  readonly net: string
  readonly browser: string
  readonly borwserVersion: string
  readonly system: string
  readonly systemVersion: string
  readonly county: string
  readonly province: string
  readonly reportedAt: Date
}

export class EnvironmentReq {
  @ApiProperty({
    description: '查询类型',
    enum: ['province', 'browser', 'system', 'net']
  })
  type: string
  @ApiProperty({ description: '应用唯一标识' })
  appId: string
  @ApiProperty({ description: '开始时间，不传则查询全部时间', required: false })
  beginTime?: string
  @ApiProperty({ description: '结束时间，不传则查询全部时间', required: false })
  endTime?: string
}

export class GroupData {
  @ApiProperty({
    description: '查询类型'
  })
  count: number
  @ApiProperty({
    description: '查询类型'
  })
  name: string
}
