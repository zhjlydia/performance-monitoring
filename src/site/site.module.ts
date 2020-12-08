import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod
} from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Site, SiteSchema } from 'core/schemas/site.schema'
import { SiteController } from './site.controller'
import { SiteService } from './site.service'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Site.name, schema: SiteSchema }])
  ],
  providers: [SiteService],
  controllers: [SiteController]
})
export class SiteModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply().forRoutes(
      {
        path: 'site/all',
        method: RequestMethod.GET
      },
      {
        path: 'site',
        method: RequestMethod.POST
      }
    )
  }
}
