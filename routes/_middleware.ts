/**
 * Route-level middleware.
 * This middleware runs for all routes in this directory and subdirectories.
 */

import { define } from "@/utils.ts";
import { log } from "@/utils/logger.ts";
import { getCorsHeaders, handleCorsPreflight } from "@/utils/security.ts";

export default define.middleware(async (ctx) => {
  const start = Date.now();

  // Handle CORS preflight
  const preflight = handleCorsPreflight(ctx.req);
  if (preflight) {
    return preflight;
  }

  // Continue to route handler
  const response = await ctx.next();

  // Add CORS headers
  const corsHeaders = getCorsHeaders(ctx.req);
  for (const [key, value] of Object.entries(corsHeaders)) {
    response.headers.set(key, value);
  }

  // Log request (optional, main.ts already logs)
  const duration = Date.now() - start;
  if (ctx.url.pathname.startsWith("/api")) {
    log.debug("API request", {
      method: ctx.req.method,
      path: ctx.url.pathname,
      status: response.status,
      duration,
    });
  }

  return response;
});

