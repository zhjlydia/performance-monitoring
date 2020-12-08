import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'

export type StatisDocument = Statis & mongoose.Document

@Schema({
  timestamps: true,
  versionKey: false
})
export class Statis {
  /**
   * 应用唯一标识
   */
  @Prop()
  appId: string

  /**
   * 统计量类型（pv/uv）
   */
  @Prop()
  type: string

  /**
   * 统计量数值
   */
  @Prop()
  data: number

  /**
   * 统计时间
   */
  @Prop()
  time: Date
}

export const StatisSchema = SchemaFactory.createForClass(Statis)
