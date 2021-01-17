import { ApiProperty } from '@nestjs/swagger'

export class EnvironmentQuery {
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

export class GroupDataDto {
  @ApiProperty({
    description: '数量'
  })
  count: number
  @ApiProperty({
    description: '指标值'
  })
  name: string
}
