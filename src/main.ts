import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express/interfaces/nest-express-application.interface'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { CommonExceptionFilter } from 'core/filters/common-exception.filter'
import alias from 'module-alias'
import path from 'path'
import { AppModule } from './app.module'

alias.addAliases({
  '@': __dirname,
  core: path.join(__dirname, '../core/src'),
  schemas: path.join(__dirname, '../core/src/schemas'),
  model: path.resolve(__dirname, '../core/src/models')
})

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  // 全局错误过滤器
  app.useGlobalFilters(new CommonExceptionFilter())

  const options = new DocumentBuilder()
    .setTitle('Web Monitoring')
    .setDescription('前端性能监控系统api服务')
    .setVersion('0.0.1')
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api', app, document)
  app.set('trust proxy', 1)
  await app.listen(3009, '0.0.0.0')
}
bootstrap()
