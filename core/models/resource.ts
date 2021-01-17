import { ApiProperty } from '@nestjs/swagger'

export class ResourceVo {
  @ApiProperty({ description: '资源名称' })
  readonly name: string
  @ApiProperty({ description: '资源类型' })
  readonly initiatorType: string
  @ApiProperty({ description: '资源获取耗时(ms)' })
  readonly duration: number
  @ApiProperty({ description: '资源请求类型' })
  readonly nextHopProtocol: string
}
export class ResourceDto extends ResourceVo {}

export class PageResourcesQuery {
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
