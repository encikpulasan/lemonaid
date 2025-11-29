/**
 * Central type definitions for the project.
 * Export all shared types from here for easy importing.
 */

/**
 * Common API response structure
 */
export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  error?: string;
  status?: number;
}

/**
 * Pagination metadata
 */
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

/**
 * Paginated API response
 */
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: PaginationMeta;
}

/**
 * Common status types for async operations
 */
export type Status = "idle" | "loading" | "success" | "error";

/**
 * Common error structure
 */
export interface AppError {
  message: string;
  code?: string;
  statusCode?: number;
  details?: Record<string, unknown>;
}

/**
 * Route handler return types
 */
export type HandlerReturn<T = unknown> = T | Response | Promise<T | Response>;

