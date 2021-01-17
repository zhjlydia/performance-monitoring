import { ApiProperty } from '@nestjs/swagger'

export class StatisDto {
  @ApiProperty({ description: '统计量数值' })
  readonly data: number
  @ApiProperty({ description: '统计时间' })
  readonly time: Date
}

export class StatisGroupDto {
  @ApiProperty({ description: '统计类型' })
  readonly type: string
  @ApiProperty({ description: '统计数据' })
  readonly statis: StatisDto[]
}
