import { applyDecorators, Type } from '@nestjs/common'
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger'
import { BaseResponse } from 'core/models/base'

export const SimpleResponse = <TModel extends Type<any>>(model: TModel) => {
  console.log(getSchemaPath(model))
  return applyDecorators(
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(BaseResponse) },
          {
            properties: {
              data: {
                type: 'object',
                items: { $ref: getSchemaPath(model) }
              }
            }
          }
        ]
      }
    })
  )
}
