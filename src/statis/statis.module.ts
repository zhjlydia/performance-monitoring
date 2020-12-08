import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Statis, StatisSchema } from 'core/schemas/statis.schema'
import { StatisController } from './statis.controller'
import { StatisService } from './statis.service'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Statis.name, schema: StatisSchema }])
  ],
  providers: [StatisService],
  controllers: [StatisController],
  exports: [StatisService]
})
export class StatisModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {}
}
