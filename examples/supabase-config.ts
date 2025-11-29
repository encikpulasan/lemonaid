/**
 * Example: Using Supabase configuration
 * 
 * This demonstrates how to access Supabase configuration
 * from environment variables.
 */

import { getConfig } from "@/utils/config.ts";
import { log } from "@/utils/logger.ts";

/**
 * Example: Initialize Supabase client
 * 
 * Note: This is a placeholder example. Install @supabase/supabase-js
 * to use Supabase in your project.
 */
export function getSupabaseConfig() {
  const config = getConfig();

  if (!config.SUPABASE_URL || !config.SUPABASE_ANON_KEY) {
    log.warn("Supabase configuration missing", {
      hasUrl: !!config.SUPABASE_URL,
      hasAnonKey: !!config.SUPABASE_ANON_KEY,
    });
    return null;
  }

  return {
    url: config.SUPABASE_URL,
    anonKey: config.SUPABASE_ANON_KEY,
    serviceRoleKey: config.SUPABASE_SERVICE_ROLE_KEY,
  };
}

/**
 * Example: Using Supabase in a route handler
 * 
 * ```ts
 * import { getSupabaseConfig } from "@/examples/supabase-config.ts";
 * 
 * export const handler = define.handlers({
 *   async GET(ctx) {
 *     const supabaseConfig = getSupabaseConfig();
 *     if (!supabaseConfig) {
 *       return createErrorResponse("Supabase not configured", 500);
 *     }
 *     
 *     // Use Supabase client here
 *     // const supabase = createClient(supabaseConfig.url, supabaseConfig.anonKey);
 *     
 *     return Response.json({ data: "..." });
 *   },
 * });
 * ```
 */

/**
 * Example: Using Supabase in an island (client-side)
 * 
 * For client-side usage, use FRESH_PUBLIC_ prefixed variables:
 * 
 * ```ts
 * // In .env
 * FRESH_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
 * FRESH_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
 * 
 * // In island
 * const supabaseUrl = Deno.env.get("FRESH_PUBLIC_SUPABASE_URL");
 * const supabaseKey = Deno.env.get("FRESH_PUBLIC_SUPABASE_ANON_KEY");
 * ```
 */

