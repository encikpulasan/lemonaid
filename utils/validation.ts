/**
 * Common validation utilities.
 */

/**
 * Validates an email address.
 * 
 * @param email - Email address to validate
 * @returns true if valid, false otherwise
 * 
 * @example
 * ```ts
 * if (!isValidEmail(userInput)) {
 *   return createErrorResponse("Invalid email", 400);
 * }
 * ```
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates a URL.
 * 
 * @param url - URL string to validate
 * @returns true if valid, false otherwise
 * 
 * @example
 * ```ts
 * if (!isValidUrl(url)) {
 *   return createErrorResponse("Invalid URL", 400);
 * }
 * ```
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validates that a value is not empty.
 * 
 * @param value - Value to check
 * @returns true if not empty, false otherwise
 */
export function isNotEmpty(value: unknown): boolean {
  if (typeof value === "string") {
    return value.trim().length > 0;
  }
  if (Array.isArray(value)) {
    return value.length > 0;
  }
  if (value && typeof value === "object") {
    return Object.keys(value).length > 0;
  }
  return value !== null && value !== undefined;
}

