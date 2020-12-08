import { EnvironmentModule } from '@/environment/environment.module'
import { PageModule } from '@/page/page.module'
import { ResourceModule } from '@/resource/resource.module'
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod
} from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Report, ReportSchema } from 'core/schemas/report.schema'
import { ReportController } from './report.controller'
import { ReportService } from './report.service'

@Module({
  imports: [
    PageModule,
    EnvironmentModule,
    ResourceModule,
    MongooseModule.forFeature([{ name: Report.name, schema: ReportSchema }])
  ],
  providers: [ReportService],
  controllers: [ReportController]
})
export class ReportModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply().forRoutes({
      path: 'report',
      method: RequestMethod.POST
    })
  }
}
