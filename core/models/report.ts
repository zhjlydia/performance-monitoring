
import { ApiProperty } from '@nestjs/swagger';
import { PerformanceDto } from 'core/models/page';
import { ResourceDto } from 'core/models/resource';

export class CreateReportDto {
    @ApiProperty({description: '应用唯一标识'})
    readonly appId: string;
    @ApiProperty({description: '访问页面url'})
    readonly url: number;
    @ApiProperty({description: '用户网络'})
    readonly net: string;
    @ApiProperty({description: '页面性能数据'})
    readonly performance: PerformanceDto;
    @ApiProperty({description: '页面资源数据', isArray: true})
    readonly resourceList: ResourceDto;
  }
