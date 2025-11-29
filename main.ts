import { App, staticFiles } from "fresh";
import { type State } from "./utils.ts";
import { getConfig } from "./utils/config.ts";
import { log } from "./utils/logger.ts";
import { getCorsHeaders, handleCorsPreflight, validateApiKey } from "./utils/security.ts";

// Initialize config early to validate environment
const config = getConfig();

log.info("Starting Fresh server", {
  env: config.ENV,
  port: config.PORT,
  host: config.HOST,
});

export const app = new App<State>();

// Request logging middleware
app.use(async (ctx) => {
  const start = Date.now();
  const { method, url } = ctx.req;
  const pathname = new URL(url).pathname;

  // Handle CORS preflight
  const preflight = handleCorsPreflight(ctx.req);
  if (preflight) {
    return preflight;
  }

  // Continue to next middleware
  const response = await ctx.next();

  // Log request
  const duration = Date.now() - start;
  log.request(method, pathname, response.status, duration);

  // Add CORS headers to response
  const corsHeaders = getCorsHeaders(ctx.req);
  for (const [key, value] of Object.entries(corsHeaders)) {
    response.headers.set(key, value);
  }

  return response;
});

// API key validation middleware (only for API routes)
app.use("/api", async (ctx) => {
  if (!validateApiKey(ctx.req)) {
    return new Response(
      JSON.stringify({ error: "Unauthorized: Invalid or missing API key" }),
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
  return ctx.next();
});

// Serve static files
app.use(staticFiles());

// Load file-based routes
app.fsRoutes();

// Error handler
app.onError("*", (ctx) => {
  log.error("Unhandled error", {
    error: ctx.error?.message,
    stack: ctx.error?.stack,
    path: ctx.url.pathname,
  });

  return new Response(
    JSON.stringify({
      error: config.ENV === "production"
        ? "Internal Server Error"
        : ctx.error?.message || "Unknown error",
    }),
    {
      status: 500,
      headers: { "Content-Type": "application/json" },
    },
  );
});

// 404 handler
app.notFound((ctx) => {
  log.warn("404 Not Found", { path: ctx.url.pathname });
  return new Response(
    JSON.stringify({ error: "Not Found" }),
    {
      status: 404,
      headers: { "Content-Type": "application/json" },
    },
  );
});

// Start server
if (import.meta.main) {
  const port = config.PORT;
  const hostname = config.HOST;

  log.info(`Server listening on http://${hostname}:${port}`);

  await app.listen({ port, hostname });
}
