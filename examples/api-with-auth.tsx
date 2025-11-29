/**
 * Example: API route with authentication
 * 
 * This demonstrates creating an API endpoint that requires API key authentication.
 * The API key validation is handled automatically by middleware in main.ts.
 */

import { define } from "@/utils.ts";
import { createErrorResponse } from "@/utils/errors.ts";
import { log } from "@/utils/logger.ts";
import type { ApiResponse } from "@/types/index.ts";

// GET endpoint (requires API key)
export const handler = define.handlers({
  async GET(ctx) {
    try {
      // API key validation is handled by middleware in main.ts
      // If we reach here, the API key is valid

      const { id } = ctx.params;

      // Your business logic here
      const data = await fetchDataById(id);

      log.info("API request successful", { id, path: ctx.url.pathname });

      return Response.json({
        data,
        message: "Success",
      } satisfies ApiResponse);
    } catch (error) {
      log.error("API request failed", { error, path: ctx.url.pathname });
      return createErrorResponse(error, 500);
    }
  },

  // POST endpoint (requires API key)
  async POST(ctx) {
    try {
      const body = await ctx.req.json();

      // Validate input
      if (!body.name) {
        return Response.json(
          { error: "Name is required" },
          { status: 400 },
        );
      }

      // Process and return
      const result = await createItem(body);

      log.info("Item created", { id: result.id });

      return Response.json(
        { data: result, message: "Created" },
        { status: 201 },
      );
    } catch (error) {
      log.error("Failed to create item", { error });
      return createErrorResponse(error, 500);
    }
  },
});

// Mock functions
async function fetchDataById(id: string) {
  return { id, name: "Example", createdAt: new Date() };
}

async function createItem(data: unknown) {
  return { id: "123", ...data, createdAt: new Date() };
}

