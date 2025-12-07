export interface ApiResponseMeta {
  timestamp: string;
  path?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pageCount: number;
  };
  [key: string]: any; // Allow for additional meta properties
}

export interface ApiResponse<T = any> {
  status: string;
  statusCode: number;
  message: string | string[];
  data: T | null;
  meta: ApiResponseMeta;
}

// Use this for paginated responses
export interface PaginatedResult<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    pageCount: number;
  };
}
