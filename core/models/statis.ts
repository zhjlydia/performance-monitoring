import { ApiProperty } from '@nestjs/swagger'

export class StatisDto {
  @ApiProperty({ description: '应用唯一标识' })
  readonly appId: string
  @ApiProperty({ description: '类型' })
  readonly type: string
  @ApiProperty({ description: '统计量数值' })
  readonly data: number
  @ApiProperty({ description: '统计时间' })
  readonly time: Date
}
