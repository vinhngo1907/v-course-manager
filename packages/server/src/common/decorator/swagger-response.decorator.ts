import {applyDecorators, Type} from '@nestjs/common';
import {ApiExtraModels, ApiResponse, getSchemaPath} from '@nestjs/swagger';
import { ApiResponseDto, createResponseSchema } from '../dtos/api-response.dto';

// Instead of extending ApiResponseOptions, create a new interface that includes
// both our custom properties and the ones from ApiResponseOptions
interface ApiResponseDecoratorOptions {
  dataType?: Type<any> | [Type<any>];
  isArray?: boolean;
  isPaginated?: boolean;
  // Include properties from ApiResponseOptions
  status?: number;
  description?: string;
  type?: any;
  schema?: Record<string, any>;
  headers?: Record<string, any>;
  content?: Record<string, any>;
  isArray2xx?: boolean;
}

/**
 * Custom decorator to document API responses that follow our standard format
 * @param options Response options and data type
 * @returns Decorator
 */
export function ApiStandardResponse(options: ApiResponseDecoratorOptions) {
  const {dataType, isArray, isPaginated, ...responseOptions} = options;

  // Determine the schema reference based on whether a data type is provided
  let schema: Record<string, any>;

  if (dataType) {
    // If data type is provided, create a custom response schema
    const ResponseDto = createResponseSchema(dataType);

    // Create a reference to the data property schema
    const dataSchema = {
      allOf: [
        {$ref: getSchemaPath(ApiResponseDto)},
        {
          properties: {
            data: isArray
              ? {
                  type: 'array',
                  items: {
                    $ref: getSchemaPath(
                      Array.isArray(dataType) ? dataType[0] : dataType,
                    ),
                  },
                }
              : {
                  $ref: getSchemaPath(
                    Array.isArray(dataType) ? dataType[0] : dataType,
                  ),
                },
          },
        },
        // Only include pagination meta if explicitly requested AND it's an array response
        isPaginated && isArray
          ? {
              properties: {
                meta: {
                  type: 'object',
                  properties: {
                    pagination: {
                      type: 'object',
                      properties: {
                        page: {type: 'number', example: 1},
                        limit: {type: 'number', example: 10},
                        total: {type: 'number', example: 50},
                        pageCount: {type: 'number', example: 5},
                      },
                    },
                  },
                },
              },
            }
          : {},
      ],
    };

    schema = dataSchema;

    // Apply the extra models decorator to register the types with Swagger
    const modelsToRegister = [ApiResponseDto, ResponseDto];

    if (dataType) {
      modelsToRegister.push(Array.isArray(dataType) ? dataType[0] : dataType);
    }

    return applyDecorators(
      ApiExtraModels(...modelsToRegister),
      ApiResponse({
        ...responseOptions,
        schema,
      }),
    );
  }

  // If no data type is provided, use the basic ApiResponseDto
  return applyDecorators(
    ApiExtraModels(ApiResponseDto),
    ApiResponse({
      ...responseOptions,
      schema: {
        $ref: getSchemaPath(ApiResponseDto),
      },
    }),
  );
}

/**
 * Decorator for documenting success responses
 * @param dataType The return data type
 * @param options Additional API response options
 * @returns Decorator
 */
export function ApiSuccessResponse(
  dataType?: Type<any> | [Type<any>],
  options: Omit<ApiResponseDecoratorOptions, 'dataType'> = {},
) {
  return ApiStandardResponse({
    status: options.status || 200,
    description: options.description || 'Success',
    dataType,
    isArray: options.isArray || false,
    isPaginated: options.isPaginated || false,
    ...options,
  });
}

/**
 * Decorator for documenting paginated responses
 * @param dataType The item type in the paginated response
 * @param options Additional API response options
 * @returns Decorator
 */
export function ApiPaginatedResponse(
  dataType: Type<any>,
  options: Omit<
    ApiResponseDecoratorOptions,
    'dataType' | 'isArray' | 'isPaginated'
  > = {},
) {
  return ApiStandardResponse({
    status: options.status || 200,
    description: options.description || 'Paginated result',
    dataType,
    isArray: true,
    isPaginated: true,
    ...options,
  });
}

/**
 * Decorator for documenting error responses
 * @param options Error response options
 * @returns Decorator
 */
export function ApiErrorResponse(options: ApiResponseDecoratorOptions = {}) {
  return ApiStandardResponse({
    status: options.status || 400,
    description: options.description || 'Error',
    ...options,
  });
}
