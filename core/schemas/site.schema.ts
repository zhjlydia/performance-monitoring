import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'

export type SiteDocument = Site & mongoose.Document

@Schema({
  timestamps: true,
  versionKey: false
})
export class Site {
  /**
   * 应用域名
   */
  @Prop()
  domain: string

  /**
   * 应用名称
   */
  @Prop()
  name: string

  /**
   * 应用唯一标识
   */
  @Prop()
  appId: string

  /**
   * 是否启用
   */
  @Prop()
  isOpen: boolean
}

export const SiteSchema = SchemaFactory.createForClass(Site)
