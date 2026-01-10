import {Type} from '@nestjs/common';
import {ApiProperty, ApiPropertyOptions} from '@nestjs/swagger';

/**
 * Base metadata structure for all responses
 */
export class ApiResponseMetaDto {
  @ApiProperty({
    example: '2023-04-29T12:34:56.789Z',
    description: 'Timestamp of the response',
  })
  timestamp: string;

  @ApiProperty({
    example: '/api/users',
    description: 'Path of the request',
    required: false,
  })
  path?: string;
}

/**
 * Metadata structure for error responses
 */
export class ApiErrorMetaDto extends ApiResponseMetaDto {
  @ApiProperty({
    description: 'Error type identifier',
    example: 'ValidationError',
  })
  errorType: string;
}

/**
 * Pagination information for paginated responses
 */
export class PaginationMetaDto {
  @ApiProperty({example: 1})
  page: number;

  @ApiProperty({example: 10})
  limit: number;

  @ApiProperty({example: 50})
  total: number;

  @ApiProperty({example: 5})
  pageCount: number;
}

/**
 * Metadata structure for paginated responses
 */
export class ApiPaginatedMetaDto extends ApiResponseMetaDto {
  @ApiProperty({
    description: 'Pagination information',
    type: PaginationMetaDto,
  })
  pagination: PaginationMetaDto;
}

/**
 * Generic API response wrapper base class
 */
export class ApiResponseDto<T = any> {
  @ApiProperty({
    example: 'success',
    description: 'Response status',
    enum: ['success', 'error'],
  })
  status: string;

  @ApiProperty({
    example: 200,
    description: 'HTTP status code',
  })
  statusCode: number;

  @ApiProperty({
    example: 'Operation successful',
    description: 'Response message',
  })
  message: string;

  @ApiProperty({
    description: 'Response data',
    required: false,
  })
  data: T | null;

  @ApiProperty({
    description: 'Response metadata',
    type: ApiResponseMetaDto,
  })
  meta: ApiResponseMetaDto;
}

/**
 * Response structure for success responses
 */
export class ApiSuccessResponseDto<T = any> extends ApiResponseDto<T> {
  @ApiProperty({
    example: 'success',
  })
  status: string = 'success';
}

/**
 * Response structure for error responses
 */
export class ApiErrorResponseDto extends ApiResponseDto<null> {
  @ApiProperty({
    example: 'error',
  })
  status: string = 'error';

  @ApiProperty({
    example: null,
  })
  data: null = null;

  @ApiProperty({
    type: ApiErrorMetaDto,
  })
  declare meta: ApiErrorMetaDto;
}

/**
 * Response structure for paginated responses
 */
export class ApiPaginatedResponseDto<T = any> extends ApiResponseDto<T[]> {
  @ApiProperty({
    example: 'success',
  })
  status: string = 'success';

  @ApiProperty({
    isArray: true,
  })
  declare data: T[];

  @ApiProperty({
    type: ApiPaginatedMetaDto,
  })
  declare meta: ApiPaginatedMetaDto;
}

/**
 * Helper factory function to create a response DTO type with a specific data type
 * @param dataType The type of data in the response
 * @param schemaOptions Additional schema options for Swagger
 * @returns A response DTO class with the specified data type
 */
export function createResponseSchema<T>(
  dataType: Type<T> | [Type<T>],
  schemaOptions?: ApiPropertyOptions,
) {
  class ResponseDto extends ApiSuccessResponseDto<T> {
    @ApiProperty({
      ...(schemaOptions || {}),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      type: () => (Array.isArray(dataType) ? dataType[0] : dataType),
    })
    declare data: T;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const typeName = Array.isArray(dataType)
    ? dataType[0].name
    : // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      (dataType as any).name || 'Generic';

  Object.defineProperty(ResponseDto, 'name', {
    value: `${typeName}ResponseDto`,
  });

  return ResponseDto;
}

/**
 * Helper factory function to create a paginated response DTO type with a specific item type
 * @param itemType The type of items in the paginated response
 * @param schemaOptions Additional schema options for Swagger
 * @returns A paginated response DTO class with the specified item type
 */
export function createPaginatedResponseSchema<T>(
  itemType: Type<T>,
  schemaOptions?: ApiPropertyOptions,
) {
  class PaginatedResponseDto extends ApiPaginatedResponseDto<T> {
    @ApiProperty({
      ...(schemaOptions || {}),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      type: () => [itemType],
      isArray: true,
    })
    declare data: T[];
  }

  Object.defineProperty(PaginatedResponseDto, 'name', {
    value: `Paginated${itemType.name}ResponseDto`,
  });

  return PaginatedResponseDto;
}
