import { ApiProperty } from '@nestjs/swagger'

export class Pagination {
  @ApiProperty({
    description: '分页index'
  })
  index: number
  @ApiProperty({ description: '分页size' })
  size: number
}

export class TimeQuery {
  @ApiProperty({
    description: '开始时间'
  })
  begin?: string
  @ApiProperty({ description: '结束时间' })
  end?: string
}

export class AppIdTimeQuery extends TimeQuery {
  @ApiProperty({
    description: '应用唯一标识'
  })
  appId: string
}

export class PaginatedDto<TData> {
  @ApiProperty()
  total: number

  list: TData[]
}
