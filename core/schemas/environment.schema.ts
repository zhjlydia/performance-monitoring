import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ApiProperty } from '@nestjs/swagger'
import * as mongoose from 'mongoose'

export type EnvironmentDocument = Environment & mongoose.Document

@Schema({
  timestamps: true,
  versionKey: false
})
export class Environment {
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
    description: '用户网络'
  })
  net: string

  @Prop()
  @ApiProperty({
    description: '用户浏览器'
  })
  browser: string

  @Prop()
  @ApiProperty({
    description: '用户浏览器版本'
  })
  borwserVersion: string

  @Prop()
  @ApiProperty({
    description: '用户操作系统'
  })
  system: string

  @Prop()
  @ApiProperty({
    description: '用户操作系统版本'
  })
  systemVersion: string

  @Prop()
  @ApiProperty({
    description: '国家'
  })
  country: string

  @Prop()
  @ApiProperty({
    description: '省'
  })
  province: string

  @Prop()
  @ApiProperty({
    description: '市'
  })
  city: string

  @Prop()
  @ApiProperty({
    description: '上报时间'
  })
  reportedAt: Date
}

export const EnvironmentSchema = SchemaFactory.createForClass(Environment)
