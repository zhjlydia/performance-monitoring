import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ApiProperty } from '@nestjs/swagger'
import * as mongoose from 'mongoose'

export type PageDocument = Page & mongoose.Document

@Schema({
  timestamps: true,
  versionKey: false
})
export class Page {
  @Prop()
  @ApiProperty({
    description: '应用唯一标识'
  })
  appId: string

  @Prop()
  @ApiProperty({
    description: '此次上报的唯一标识符'
  })
  reportMark: string

  @Prop()
  @ApiProperty({
    description: '用户ip'
  })
  ip: string

  @Prop()
  @ApiProperty({
    description: '访问页面url'
  })
  url: string

  @Prop()
  @ApiProperty({
    description: '首次绘制时间'
  })
  fp: number

  @Prop()
  @ApiProperty({
    description: '首次内容绘制时间'
  })
  fcp: number

  @Prop()
  @ApiProperty({
    description: '页面完全加载时间'
  })
  load: number

  @Prop()
  @ApiProperty({
    description: '页面可交互时间'
  })
  tti: number

  @Prop()
  @ApiProperty({
    description: 'DNS查询时间'
  })
  dns: number

  @Prop()
  @ApiProperty({
    description: 'TCP连接时间'
  })
  tcp: number

  @Prop()
  @ApiProperty({
    description: '上报时间'
  })
  reportedAt: Date
}

export const PageSchema = SchemaFactory.createForClass(Page)
