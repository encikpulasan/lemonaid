/**
 * Environment configuration utility.
 * 
 * Provides type-safe access to environment variables with validation
 * and default values. Suitable for Deno Deploy.
 */

/**
 * Environment configuration interface.
 * Extend this interface to add new environment variables.
 */
export interface EnvConfig {
  // Server
  PORT: number;
  HOST: string;
  ENV: "development" | "production" | "test";

  // API Security
  API_KEY?: string;
  API_KEY_HEADER: string;

  // CORS
  CORS_ORIGIN: string;
  CORS_ENABLED: boolean;

  // Public variables (available in browser/islands)
  FRESH_PUBLIC_API_URL?: string;
  FRESH_PUBLIC_ANALYTICS_ID?: string;

  // Supabase
  SUPABASE_URL?: string;
  SUPABASE_ANON_KEY?: string;
  SUPABASE_SERVICE_ROLE_KEY?: string;

  // Add your custom environment variables here
}

/**
 * Default configuration values.
 */
const defaults: Partial<EnvConfig> = {
  PORT: 8000,
  HOST: "0.0.0.0",
  ENV: "development",
  API_KEY_HEADER: "x-api-key",
  CORS_ORIGIN: "*",
  CORS_ENABLED: true,
};

/**
 * Validates and loads environment configuration.
 * 
 * @returns Validated environment configuration
 * @throws Error if required variables are missing or invalid
 * 
 * @example
 * ```ts
 * const config = getEnvConfig();
 * console.log(config.PORT); // 8000
 * ```
 */
export function getEnvConfig(): EnvConfig {
  const env = Deno.env.get("ENV") || defaults.ENV || "development";
  const port = parseInt(Deno.env.get("PORT") || String(defaults.PORT || 8000), 10);

  if (isNaN(port) || port < 1 || port > 65535) {
    throw new Error(`Invalid PORT: ${Deno.env.get("PORT")}`);
  }

  return {
    PORT: port,
    HOST: Deno.env.get("HOST") || defaults.HOST || "0.0.0.0",
    ENV: env as EnvConfig["ENV"],
    API_KEY: Deno.env.get("API_KEY"),
    API_KEY_HEADER: Deno.env.get("API_KEY_HEADER") || defaults.API_KEY_HEADER || "x-api-key",
    CORS_ORIGIN: Deno.env.get("CORS_ORIGIN") || defaults.CORS_ORIGIN || "*",
    CORS_ENABLED: Deno.env.get("CORS_ENABLED") !== "false",
    FRESH_PUBLIC_API_URL: Deno.env.get("FRESH_PUBLIC_API_URL"),
    FRESH_PUBLIC_ANALYTICS_ID: Deno.env.get("FRESH_PUBLIC_ANALYTICS_ID"),
    SUPABASE_URL: Deno.env.get("SUPABASE_URL"),
    SUPABASE_ANON_KEY: Deno.env.get("SUPABASE_ANON_KEY"),
    SUPABASE_SERVICE_ROLE_KEY: Deno.env.get("SUPABASE_SERVICE_ROLE_KEY"),
  };
}

/**
 * Gets a single environment variable with optional default.
 * 
 * @param key - Environment variable key
 * @param defaultValue - Default value if not set
 * @returns Environment variable value or default
 * 
 * @example
 * ```ts
 * const apiUrl = getEnv("API_URL", "http://localhost:3000");
 * ```
 */
export function getEnv(key: string, defaultValue?: string): string | undefined {
  return Deno.env.get(key) || defaultValue;
}

/**
 * Gets a boolean environment variable.
 * 
 * @param key - Environment variable key
 * @param defaultValue - Default value if not set
 * @returns Boolean value
 * 
 * @example
 * ```ts
 * const enabled = getEnvBool("FEATURE_ENABLED", false);
 * ```
 */
export function getEnvBool(key: string, defaultValue = false): boolean {
  const value = Deno.env.get(key);
  if (!value) return defaultValue;
  return value.toLowerCase() === "true" || value === "1";
}

/**
 * Gets a number environment variable.
 * 
 * @param key - Environment variable key
 * @param defaultValue - Default value if not set
 * @returns Number value
 * 
 * @example
 * ```ts
 * const port = getEnvNumber("PORT", 8000);
 * ```
 */
export function getEnvNumber(key: string, defaultValue: number): number {
  const value = Deno.env.get(key);
  if (!value) return defaultValue;
  const num = parseInt(value, 10);
  return isNaN(num) ? defaultValue : num;
}

/**
 * Global config instance (lazy-loaded).
 * Access via getConfig() to ensure it's initialized.
 */
let config: EnvConfig | null = null;

/**
 * Gets the global configuration instance.
 * Initializes on first call.
 * 
 * @returns Environment configuration
 */
export function getConfig(): EnvConfig {
  if (!config) {
    config = getEnvConfig();
  }
  return config;
}

