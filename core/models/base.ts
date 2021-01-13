export class BaseResponse<T> {
  code: number
  data: T
  message: string
}
