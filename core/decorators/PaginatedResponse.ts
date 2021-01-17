import { applyDecorators, Type } from '@nestjs/common'
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger'
import { PaginatedDto } from 'core/models/common'

export const PaginatedResponse = <TModel extends Type<any>>(model: TModel) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(PaginatedDto) },
          {
            properties: {
              list: {
                type: 'array',
                items: {
                  $ref: getSchemaPath(model)
                }
              }
            }
          }
        ]
      }
    })
  )
}
