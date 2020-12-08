import {
  HttpModule,
  MiddlewareConsumer,
  Module,
  NestModule
} from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { IpLibrary, IpLibrarySchema } from 'core/schemas/ipLibrary.schema'
import { IpLibraryController } from './ipLibrary.controller'
import { IpLibraryService } from './ipLibrary.service'

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: IpLibrary.name, schema: IpLibrarySchema }
    ])
  ],
  providers: [IpLibraryService],
  controllers: [IpLibraryController],
  exports: [IpLibraryService]
})
export class IpLibraryModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {}
}
