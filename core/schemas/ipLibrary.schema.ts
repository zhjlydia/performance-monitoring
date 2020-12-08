import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'

export type IpLibraryDocument = IpLibrary & mongoose.Document

@Schema({
  timestamps: true,
  versionKey: false
})
export class IpLibrary {
  /**
   * 用户ip
   */
  @Prop()
  ip: string

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
   * 纬度
   */
  @Prop()
  latitude: number

  /**
   * 经度
   */
  @Prop()
  longitude: number
}

export const IpLibrarySchema = SchemaFactory.createForClass(IpLibrary)
