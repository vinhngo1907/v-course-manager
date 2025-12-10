import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

export const ApiPaginatedResponse = <TModel extends Type<any>>(
  model: TModel,
  options?: { description?: string },
) => {
  return applyDecorators(
    ApiExtraModels(model),
    ApiOkResponse({
      description: options?.description || 'Paginated response',
      schema: {
        type: 'object',
        properties: {
          data: {
            type: 'array',
            items: { $ref: getSchemaPath(model) },
          },
          total: { type: 'number' },
          page: { type: 'number' },
          limit: { type: 'number' },
          pageCount: { type: 'number' },
        },
      },
    }),
  );
};
