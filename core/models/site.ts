
import { ApiProperty } from '@nestjs/swagger';

export class CreateSiteDto {
  @ApiProperty({description: '应用域名', example: 'www.baidu.com'})
  readonly domain: string;
  @ApiProperty({description: '应用名称', example: '应用一'})
  readonly name: number;
  @ApiProperty({description: '是否启用', example: true})
  readonly isOpen: boolean;
}
