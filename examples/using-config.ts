/**
 * Example: Using environment configuration
 * 
 * This demonstrates how to use the config utility to access
 * environment variables in your routes and utilities.
 */

import { getConfig, getEnv, getEnvBool, getEnvNumber } from "@/utils/config.ts";
import { log } from "@/utils/logger.ts";

// Method 1: Get full config (validated)
const config = getConfig();
console.log(config.PORT); // 8000
console.log(config.ENV); // "development" | "production" | "test"
console.log(config.CORS_ORIGIN); // "*" or specific origin

// Method 2: Get single environment variable
const apiUrl = getEnv("API_URL", "http://localhost:3000");
console.log(apiUrl);

// Method 3: Get boolean environment variable
const featureEnabled = getEnvBool("FEATURE_ENABLED", false);
if (featureEnabled) {
  log.info("Feature is enabled");
}

// Method 4: Get number environment variable
const maxRetries = getEnvNumber("MAX_RETRIES", 3);
console.log(`Max retries: ${maxRetries}`);

// Example: Using in a route handler
export async function exampleHandler() {
  const config = getConfig();

  // Access configuration
  if (config.ENV === "production") {
    log.info("Running in production mode");
  }

  // Check if API key is configured
  if (config.API_KEY) {
    log.info("API key authentication is enabled");
  } else {
    log.warn("API key not configured - API routes are unprotected");
  }

  // Use CORS configuration
  if (config.CORS_ENABLED) {
    log.info(`CORS enabled for origin: ${config.CORS_ORIGIN}`);
  }
}

