import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod
} from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Resource, ResourceSchema } from 'core/schemas/resource.schema'
import { ResourceController } from './resource.controller'
import { ResourceService } from './resource.service'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Resource.name, schema: ResourceSchema }])
  ],
  providers: [ResourceService],
  controllers: [ResourceController],
  exports: [ResourceService]
})
export class ResourceModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply().forRoutes(
      {
        path: 'resource/all',
        method: RequestMethod.GET
      },
      {
        path: 'resource',
        method: RequestMethod.POST
      }
    )
  }
}
