import { ApiProperty } from '@nestjs/swagger'

export class BaseResponse<T> {
  @ApiProperty({
    description: '分页index'
  })
  code: number

  @ApiProperty({
    description: '分页index'
  })
  message: string

  data: T
}

export class PaginatedDto<TData> {
  @ApiProperty()
  total: number

  @ApiProperty()
  limit: number

  @ApiProperty()
  offset: number

  results: TData[]
}
export class CatDto {
  @ApiProperty()
  name: string

  @ApiProperty()
  age: number

  @ApiProperty()
  breed: string
}
