/**
 * Security utilities for API key validation and CORS.
 */

import { getConfig } from "./config.ts";
import { createErrorResponse } from "./errors.ts";
import { log } from "./logger.ts";

/**
 * Validates API key from request headers.
 * 
 * @param request - Incoming request
 * @returns true if valid, false otherwise
 * 
 * @example
 * ```ts
 * if (!validateApiKey(ctx.req)) {
 *   return createErrorResponse("Unauthorized", 401);
 * }
 * ```
 */
export function validateApiKey(request: Request): boolean {
  const config = getConfig();
  const apiKey = config.API_KEY;

  // If no API key is configured, skip validation
  if (!apiKey) {
    return true;
  }

  const providedKey = request.headers.get(config.API_KEY_HEADER);

  if (!providedKey) {
    log.warn("API key missing from request", {
      header: config.API_KEY_HEADER,
      path: new URL(request.url).pathname,
    });
    return false;
  }

  // Use constant-time comparison to prevent timing attacks
  if (!constantTimeEqual(providedKey, apiKey)) {
    log.warn("Invalid API key provided", {
      path: new URL(request.url).pathname,
    });
    return false;
  }

  return true;
}

/**
 * Constant-time string comparison to prevent timing attacks.
 * 
 * @param a - First string
 * @param b - Second string
 * @returns true if equal, false otherwise
 */
function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }

  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }

  return result === 0;
}

/**
 * Creates CORS headers based on configuration.
 * 
 * @param request - Incoming request
 * @returns CORS headers object
 * 
 * @example
 * ```ts
 * const headers = getCorsHeaders(request);
 * return new Response(data, { headers });
 * ```
 */
export function getCorsHeaders(request: Request): HeadersInit {
  const config = getConfig();

  if (!config.CORS_ENABLED) {
    return {};
  }

  const headers = new Headers();
  const origin = request.headers.get("origin");

  // Set allowed origin
  if (config.CORS_ORIGIN === "*") {
    headers.set("Access-Control-Allow-Origin", "*");
  } else if (origin && config.CORS_ORIGIN.split(",").includes(origin)) {
    headers.set("Access-Control-Allow-Origin", origin);
    headers.set("Vary", "Origin");
  } else if (config.CORS_ORIGIN) {
    headers.set("Access-Control-Allow-Origin", config.CORS_ORIGIN);
  }

  // Set allowed methods
  headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  );

  // Set allowed headers
  headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, x-api-key",
  );

  // Set credentials
  headers.set("Access-Control-Allow-Credentials", "true");

  // Set max age for preflight
  headers.set("Access-Control-Max-Age", "86400"); // 24 hours

  return headers;
}

/**
 * Handles CORS preflight requests.
 * 
 * @param request - Incoming request
 * @returns Response for OPTIONS request, null otherwise
 * 
 * @example
 * ```ts
 * const preflight = handleCorsPreflight(request);
 * if (preflight) return preflight;
 * ```
 */
export function handleCorsPreflight(request: Request): Response | null {
  if (request.method !== "OPTIONS") {
    return null;
  }

  const headers = getCorsHeaders(request);
  return new Response(null, { status: 204, headers });
}

