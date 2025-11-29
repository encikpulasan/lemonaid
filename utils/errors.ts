/**
 * Error handling utilities for consistent error responses.
 */

import type { AppError } from "@/types/index.ts";

/**
 * Creates a standardized error response.
 * 
 * @param message - Error message
 * @param statusCode - HTTP status code (default: 500)
 * @param code - Optional error code
 * @param details - Additional error details
 * @returns AppError object
 * 
 * @example
 * ```ts
 * const error = createError("User not found", 404, "USER_NOT_FOUND");
 * return Response.json(error, { status: error.statusCode });
 * ```
 */
export function createError(
  message: string,
  statusCode = 500,
  code?: string,
  details?: Record<string, unknown>,
): AppError {
  return {
    message,
    code,
    statusCode,
    details,
  };
}

/**
 * Creates an HTTP error response.
 * 
 * @param error - Error object or message
 * @param statusCode - HTTP status code (default: 500)
 * @returns Response object
 * 
 * @example
 * ```ts
 * try {
 *   // ... operation
 * } catch (error) {
 *   return createErrorResponse(error, 400);
 * }
 * ```
 */
export function createErrorResponse(
  error: unknown,
  statusCode = 500,
): Response {
  const errorObj: AppError = error instanceof Error
    ? {
      message: error.message,
      statusCode,
    }
    : {
      message: String(error),
      statusCode,
    };

  return Response.json(errorObj, { status: statusCode });
}

