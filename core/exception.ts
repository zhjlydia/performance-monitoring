import { HttpException, HttpStatus } from '@nestjs/common';

/** 自定义错误 */
export class CustomException extends HttpException {
  /**
   * 自定义错误码
   */
  readonly code?: number;
  constructor(code: number, message: string) {
    super(message, HttpStatus.OK);
    this.code = code;
  }
}

/**
 * 通用错误
 */
export class HandledException extends CustomException {
  /**
   * 创建一个通用错误实例
   *
   * @param message 错误消息
   */
  constructor(message: string) {
    super(-1, message);
  }
}
