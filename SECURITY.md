# Security Features

This document describes the security features included in this boilerplate.

## API Key Authentication

### Overview

API routes under `/api` are protected by API key authentication. This prevents unauthorized access to your API endpoints.

### Configuration

Set the API key in environment variables:

```env
API_KEY=your-secret-api-key-here
API_KEY_HEADER=x-api-key
```

### Usage

#### Enable API Key Protection

1. Set `API_KEY` in your environment variables
2. All routes under `/api` will require the API key
3. If `API_KEY` is not set, API routes are unprotected (useful for development)

#### Making Authenticated Requests

Include the API key in the request header:

```bash
# Using curl
curl -H "x-api-key: your-secret-api-key-here" \
  https://your-app.com/api/data

# Using fetch
fetch("https://your-app.com/api/data", {
  headers: {
    "x-api-key": "your-secret-api-key-here"
  }
})
```

#### Security Features

- **Constant-time comparison**: Prevents timing attacks
- **Configurable header name**: Change via `API_KEY_HEADER`
- **Optional validation**: Disabled if `API_KEY` is not set
- **Automatic logging**: Failed attempts are logged

### Example

See `examples/api-with-auth.tsx` for a complete example.

## CORS (Cross-Origin Resource Sharing)

### Overview

CORS is configured to allow or restrict cross-origin requests. This is essential for web applications that need to make requests from different domains.

### Configuration

```env
CORS_ORIGIN=https://yourdomain.com,https://app.yourdomain.com
CORS_ENABLED=true
```

### Options

#### Allow All Origins (Development Only)

```env
CORS_ORIGIN=*
CORS_ENABLED=true
```

⚠️ **Warning**: Never use `*` in production. Always specify exact origins.

#### Allow Specific Origins

```env
CORS_ORIGIN=https://example.com,https://app.example.com
CORS_ENABLED=true
```

#### Disable CORS

```env
CORS_ENABLED=false
```

### Features

- **Preflight handling**: Automatic OPTIONS request handling
- **Configurable origins**: Single origin or comma-separated list
- **Credentials support**: Allows cookies and authentication headers
- **Configurable methods**: GET, POST, PUT, DELETE, PATCH, OPTIONS
- **Configurable headers**: Content-Type, Authorization, x-api-key

### Headers Set

- `Access-Control-Allow-Origin`
- `Access-Control-Allow-Methods`
- `Access-Control-Allow-Headers`
- `Access-Control-Allow-Credentials`
- `Access-Control-Max-Age`

## Environment Configuration

### Overview

All configuration is managed through environment variables with validation and type safety.

### Configuration File

See `.env.example` for all available options.

### Usage

```ts
import { getConfig, getEnv, getEnvBool, getEnvNumber } from "@/utils/config.ts";

// Get full validated config
const config = getConfig();
console.log(config.PORT); // 8000
console.log(config.ENV); // "development" | "production" | "test"

// Get single variable
const apiUrl = getEnv("API_URL", "http://localhost:3000");

// Get boolean
const enabled = getEnvBool("FEATURE_ENABLED", false);

// Get number
const port = getEnvNumber("PORT", 8000);
```

### Validation

- **Port validation**: Ensures port is between 1-65535
- **Type validation**: Validates ENV is one of allowed values
- **Default values**: Sensible defaults for all options

## Logging

### Overview

Structured logging with different log levels. Logs are formatted differently for development and production.

### Usage

```ts
import { log } from "@/utils/logger.ts";

// Different log levels
log.debug("Debug information", { data });
log.info("Informational message", { userId: "123" });
log.warn("Warning message", { issue: "..." });
log.error("Error occurred", { error });

// HTTP request logging
log.request("GET", "/api/users", 200, 45); // method, path, status, duration
```

### Log Levels

- **debug**: Detailed information (development only)
- **info**: General information
- **warn**: Warning messages
- **error**: Error messages

### Production vs Development

- **Development**: Colored output, debug logs enabled, formatted JSON
- **Production**: Plain text, info level and above, compact JSON

## Security Best Practices

### 1. API Keys

- ✅ Use strong, random API keys (generate with `openssl rand -hex 32`)
- ✅ Never commit API keys to version control
- ✅ Use different keys for development and production
- ✅ Rotate keys regularly
- ✅ Store keys in environment variables only

### 2. CORS

- ✅ Never use `*` in production
- ✅ Specify exact origins
- ✅ Use HTTPS for all origins
- ✅ Test CORS configuration thoroughly

### 3. Environment Variables

- ✅ Never commit `.env` files
- ✅ Use `.env.example` as template
- ✅ Validate all environment variables
- ✅ Use different values for dev/staging/production

### 4. Logging

- ✅ Don't log sensitive information (passwords, API keys, tokens)
- ✅ Use appropriate log levels
- ✅ Log security events (failed auth, suspicious activity)
- ✅ Monitor logs in production

### 5. Deno Deploy

- ✅ Set environment variables in Deno Deploy dashboard
- ✅ Use production values for production deployments
- ✅ Enable API key authentication
- ✅ Configure CORS for your domain
- ✅ Monitor logs and errors

## Testing Security

### Test API Key Authentication

```bash
# Should fail without API key
curl https://your-app.com/api/data

# Should succeed with API key
curl -H "x-api-key: your-key" https://your-app.com/api/data
```

### Test CORS

```bash
# Test preflight
curl -X OPTIONS https://your-app.com/api/data \
  -H "Origin: https://example.com" \
  -H "Access-Control-Request-Method: POST"

# Test actual request
curl -X POST https://your-app.com/api/data \
  -H "Origin: https://example.com" \
  -H "Content-Type: application/json"
```

## Troubleshooting

### API Key Not Working

- Check `API_KEY` is set in environment variables
- Verify header name matches `API_KEY_HEADER`
- Check logs for authentication failures
- Ensure API key matches exactly (case-sensitive)

### CORS Issues

- Verify `CORS_ORIGIN` is set correctly
- Check that `CORS_ENABLED=true`
- Ensure origin matches exactly (no trailing slashes)
- Check browser console for CORS errors

### Environment Variables Not Loading

- Verify variables are set in Deno Deploy dashboard
- Check variable names match exactly
- Restart server after changing variables
- Use `getConfig()` to validate configuration

## Resources

- [OWASP Security Guidelines](https://owasp.org/)
- [Deno Deploy Security](https://deno.com/deploy/docs/security)
- [CORS Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

