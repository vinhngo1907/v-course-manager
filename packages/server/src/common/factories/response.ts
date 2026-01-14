import {HttpStatus, Injectable} from '@nestjs/common';

import {
  ApiResponse,
  ApiResponseMeta,
  PaginatedResult,
} from '../interfaces/response.interface';

@Injectable()
export class ResponseFactory {
  /**
   * Create a success response
   * @param data The data to return
   * @param message Optional message
   * @param statusCode HTTP status code (defaults to 200 OK)
   * @param meta Additional metadata
   * @returns Formatted API response
   */
  success<T>(
    data: T,
    message = 'Operation successful',
    statusCode = HttpStatus.OK,
    meta: Partial<ApiResponseMeta> = {},
  ): ApiResponse<T> {
    return {
      status: 'success',
      statusCode,
      message,
      data,
      meta: {
        timestamp: new Date().toISOString(),
        ...meta,
      },
    };
  }

  /**
   * Create an error response
   * @param message Error message or messages
   * @param statusCode HTTP status code (defaults to 400 Bad Request)
   * @param data Optional data to include
   * @param meta Additional metadata
   * @returns Formatted API error response
   */
  error<T = null>(
    message: string | string[],
    statusCode = HttpStatus.BAD_REQUEST,
    data: T | null = null,
    meta: Partial<ApiResponseMeta> = {},
  ): ApiResponse<T> {
    return {
      status: 'error',
      statusCode,
      message,
      data,
      meta: {
        timestamp: new Date().toISOString(),
        ...meta,
      },
    };
  }

  /**
   * Create a paginated response
   * @param paginatedData The paginated data result
   * @param message Optional success message
   * @returns Formatted API response with pagination metadata
   */
  paginated<T>(
    paginatedData: PaginatedResult<T>,
    message = 'Data retrieved successfully',
  ): ApiResponse<T[]> {
    const {data, meta} = paginatedData;

    return this.success(data, message, HttpStatus.OK, {
      pagination: meta,
    });
  }
}
