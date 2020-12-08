import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'

export type PageDocument = Page & mongoose.Document

@Schema({
  timestamps: true,
  versionKey: false
})
export class Page {
  /**
   * 应用唯一标识
   */
  @Prop()
  appId: string

  /**
   * 此次上报的唯一标识符
   */
  @Prop()
  reportMark: string

  /**
   * 用户ip
   */
  @Prop()
  ip: string

  /**
   * 访问页面url
   */
  @Prop()
  url: string

  /**
   * 首次绘制时间
   */
  @Prop()
  fp: number

  /**
   * 首次内容绘制时间
   */
  @Prop()
  fcp: number

  /**
   * 页面完全加载时间
   */
  @Prop()
  load: number

  /**
   * 页面可交互时间
   */
  @Prop()
  tti: number

  /**
   * DNS查询时间
   */
  @Prop()
  dns: number

  /**
   * TCP连接时间
   */
  @Prop()
  tcp: number

  /**
   * 上报时间
   */
  @Prop()
  reportedAt: Date
}

export const PageSchema = SchemaFactory.createForClass(Page)
