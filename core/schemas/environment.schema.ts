import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'

export type EnvironmentDocument = Environment & mongoose.Document

@Schema({
  timestamps: true,
  versionKey: false
})
export class Environment {
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
   * 用户浏览器
   */
  @Prop()
  browser: string

  /**
   * 用户浏览器版本
   */
  @Prop()
  borwserVersion: string

  /**
   * 用户操作系统
   */
  @Prop()
  system: string

  /**
   * 用户操作系统版本
   */
  @Prop()
  systemVersion: string

  /**
   * 国家
   */
  @Prop()
  country: string

  /**
   * 省
   */
  @Prop()
  province: string

  /**
   * 市
   */
  @Prop()
  city: string

  /**
   * 上报时间
   */
  @Prop()
  reportedAt: Date
}

export const EnvironmentSchema = SchemaFactory.createForClass(Environment)
