import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus
} from '@nestjs/common'
import { CustomException } from 'core/exception'

@Catch()
export class CommonExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException | CustomException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    let code: number
    let status: number
    if (exception instanceof CustomException) {
      code = exception.code
      status = exception.getStatus()
    } else if (exception instanceof HttpException) {
      code = exception.getStatus()
      status = exception.getStatus()
    } else {
      code = 500
      status = HttpStatus.INTERNAL_SERVER_ERROR
    }

    response.status(status).json({
      code,
      message: exception.message
    })
  }
}
