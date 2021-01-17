import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ApiProperty } from '@nestjs/swagger'
import * as mongoose from 'mongoose'

export type SiteDocument = Site & mongoose.Document

@Schema({
  timestamps: true,
  versionKey: false
})
export class Site {
  @Prop()
  @ApiProperty({
    description: '应用域名'
  })
  domain: string

  @Prop()
  @ApiProperty({
    description: '应用名称'
  })
  name: string

  @Prop()
  @ApiProperty({
    description: '应用唯一标识'
  })
  appId: string

  @Prop()
  @ApiProperty({
    description: '是否启用'
  })
  isOpen: boolean
}

export const SiteSchema = SchemaFactory.createForClass(Site)
