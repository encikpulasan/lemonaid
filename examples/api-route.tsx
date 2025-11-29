/**
 * Example: API route handler
 * 
 * This demonstrates creating an API endpoint that returns JSON.
 * Place this file in routes/api/ directory.
 */

import { define } from "@/utils.ts";
import { createErrorResponse } from "@/utils/errors.ts";
import type { ApiResponse } from "@/types/index.ts";

// GET endpoint
export const handler = define.handlers({
  async GET(ctx) {
    try {
      // Access route params
      const { id } = ctx.params;

      // Fetch or process data
      const data = await fetchDataById(id);

      // Return JSON response
      return Response.json({
        data,
        message: "Success",
      } satisfies ApiResponse);
    } catch (error) {
      return createErrorResponse(error, 500);
    }
  },

  // POST endpoint
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

      return Response.json(
        { data: result, message: "Created" },
        { status: 201 },
      );
    } catch (error) {
      return createErrorResponse(error, 500);
    }
  },
});

// Mock functions
async function fetchDataById(id: string) {
  return { id, name: "Example" };
}

async function createItem(data: unknown) {
  return { id: "123", ...data };
}

