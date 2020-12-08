import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'

export type ResourceDocument = Resource & mongoose.Document

@Schema({
  timestamps: true,
  versionKey: false
})
export class Resource {
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
   * 访问页面
   */
  @Prop()
  url: string

  /**
   * 资源名称
   */
  @Prop()
  name: string

  /**
   * 资源类型
   */
  @Prop()
  initiatorType: string

  /**
   * 资源请求耗时(ms)
   */
  @Prop()
  duration: number

  /**
   * 资源请求类型
   */
  @Prop()
  nextHopProtocol: string

  /**
   * 上报时间
   */
  @Prop()
  reportedAt: Date
}

export const ResourceSchema = SchemaFactory.createForClass(Resource)
