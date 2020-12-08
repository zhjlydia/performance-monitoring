import { EnvironmentModule } from '@/environment/environment.module'
import { StatisModule } from '@/statis/statis.module'
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { TaskService } from './task.service'

@Module({
  imports: [EnvironmentModule, StatisModule],
  providers: [TaskService]
})
export class TaskModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {}
}
