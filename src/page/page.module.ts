import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod
} from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Page, PageSchema } from 'core/schemas/page.schema'
import { PageController } from './page.controller'
import { PageService } from './page.service'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Page.name, schema: PageSchema }])
  ],
  providers: [PageService],
  controllers: [PageController],
  exports: [PageService]
})
export class PageModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply().forRoutes(
      {
        path: 'page/all',
        method: RequestMethod.GET
      },
      {
        path: 'page',
        method: RequestMethod.POST
      }
    )
  }
}
