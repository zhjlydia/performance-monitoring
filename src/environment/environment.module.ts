import { IpLibraryModule } from '@/ipLibrary/ipLibrary.module'
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod
} from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Environment, EnvironmentSchema } from 'core/schemas/environment.schema'
import { IpLibrary, IpLibrarySchema } from 'core/schemas/ipLibrary.schema'
import { EnvironmentController } from './environment.controller'
import { EnvironmentService } from './environment.service'

@Module({
  imports: [
    IpLibraryModule,
    MongooseModule.forFeature([
      { name: Environment.name, schema: EnvironmentSchema },
      { name: IpLibrary.name, schema: IpLibrarySchema }
    ])
  ],
  providers: [EnvironmentService],
  controllers: [EnvironmentController],
  exports: [EnvironmentService]
})
export class EnvironmentModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply().forRoutes(
      {
        path: 'environment/all',
        method: RequestMethod.GET
      },
      {
        path: 'environment/getDataGroupBy',
        method: RequestMethod.GET
      }
    )
  }
}
