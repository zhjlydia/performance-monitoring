import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'

export type ReportDocument = Report & mongoose.Document

@Schema({
  timestamps: true,
  versionKey: false
})
export class Report {
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
   * 用户网络
   */
  @Prop()
  net: string

  /**
   * 访问页面url
   */
  @Prop()
  url: string

  /**
   * 用户浏览器信息标识
   */
  @Prop()
  userAgent: string

  /**
   * 页面性能数据
   */
  @Prop()
  performance: mongoose.Schema.Types.Mixed

  /**
   * 页面资源数据
   */
  @Prop()
  resourceList: mongoose.Schema.Types.Mixed

  createdAt: Date
}

export const ReportSchema = SchemaFactory.createForClass(Report)
