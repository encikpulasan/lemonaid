# API Reference

Complete API reference for Fresh Lemonaid utilities and helpers.

## Define Helper

The `define` helper from `utils.ts` provides type-safe route definitions.

### `define.page()`

Create a page component.

```typescript
// Simple page
export default define.page(() => {
  return <div>Hello</div>;
});

// Page with handler data
export default define.page<typeof handler>((props) => {
  const { data } = props; // Handler return data
  const { state } = props; // Context state
  return <div>{data.message}</div>;
});
```

### `define.handlers()`

Create route handlers (GET, POST, etc.).

```typescript
export const handler = define.handlers({
  async GET(ctx) {
    return { message: "Hello" };
  },
  async POST(ctx) {
    const data = await ctx.req.json();
    return Response.json({ created: data }, { status: 201 });
  },
});
```

### `define.middleware()`

Create middleware functions.

```typescript
export const handler = define.middleware((ctx) => {
  // Modify state, headers, etc.
  ctx.state.timestamp = Date.now();
  return ctx.next();
});
```

## Configuration

### `getConfig()`

Get validated environment configuration.

```typescript
import { getConfig } from "@/utils/config.ts";

const config = getConfig();
// Returns typed config object with all environment variables
```

**Available Config Properties**:

- `ENV` - Environment (development/production)
- `PORT` - Server port
- `HOST` - Server host
- `API_KEY` - API key for authentication
- `CORS_ORIGIN` - CORS allowed origin
- `CORS_ENABLED` - CORS enabled flag
- `FRESH_PUBLIC_*` - Public environment variables

## Error Handling

### `createError(code, message?)`

Create a standardized error object.

```typescript
import { createError } from "@/utils/errors.ts";

const error = createError("NOT_FOUND", "Resource not found");
// Returns: { code: "NOT_FOUND", message: "Resource not found" }
```

### `createErrorResponse(error, status)`

Create an HTTP error response.

```typescript
import { createError, createErrorResponse } from "@/utils/errors.ts";

const error = createError("VALIDATION_ERROR", "Invalid input");
return createErrorResponse(error, 400);
// Returns Response with JSON body and status code
```

## Validation

### `isValidEmail(email)`

Validate email address.

```typescript
import { isValidEmail } from "@/utils/validation.ts";

if (isValidEmail("user@example.com")) {
  // Valid email
}
```

### `isValidUrl(url)`

Validate URL.

```typescript
import { isValidUrl } from "@/utils/validation.ts";

if (isValidUrl("https://example.com")) {
  // Valid URL
}
```

### `isNotEmpty(value)`

Check if value is not empty.

```typescript
import { isNotEmpty } from "@/utils/validation.ts";

if (isNotEmpty(name)) {
  // Value is not empty
}
```

## Logging

### `log.info(message, meta?)`

Log info message.

```typescript
import { log } from "@/utils/logger.ts";

log.info("User logged in", { userId: "123" });
```

### `log.error(message, meta?)`

Log error message.

```typescript
import { log } from "@/utils/logger.ts";

log.error("Operation failed", { error, context: "payment" });
```

### `log.warn(message, meta?)`

Log warning message.

```typescript
import { log } from "@/utils/logger.ts";

log.warn("Rate limit approaching", { requests: 95, limit: 100 });
```

### `log.debug(message, meta?)`

Log debug message.

```typescript
import { log } from "@/utils/logger.ts";

log.debug("Processing request", { requestId: "abc123" });
```

### `log.request(method, path, status, duration)`

Log HTTP request.

```typescript
import { log } from "@/utils/logger.ts";

log.request("GET", "/api/users", 200, 45);
```

## Security

### API Key Authentication

API routes under `/api` automatically validate the `x-api-key` header.

**Request**:
```bash
curl -H "x-api-key: your-api-key" https://your-app.com/api/data
```

**Environment Variable**:
```env
API_KEY=your-secret-api-key
```

### CORS

CORS is configured via environment variables.

```env
CORS_ORIGIN=https://yourdomain.com,https://app.yourdomain.com
CORS_ENABLED=true
```

## Type Definitions

### `ApiResponse<T>`

Standard API response structure.

```typescript
interface ApiResponse<T> {
  data: T;
  error?: AppError;
}
```

### `PaginatedResponse<T>`

Paginated API response.

```typescript
interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}
```

### `AppError`

Error structure.

```typescript
interface AppError {
  code: string;
  message: string;
}
```

### `State`

Context state interface (extend in `utils.ts`).

```typescript
export interface State {
  // Add your state properties here
}
```

## Context Object

The `ctx` object in handlers provides:

- `ctx.req` - Request object
- `ctx.params` - Route parameters
- `ctx.state` - Typed state object
- `ctx.url` - URL object
- `ctx.next()` - Call next middleware/route

## Response Helpers

### JSON Response

```typescript
return Response.json({ data: "value" });
return Response.json({ data: "value" }, { status: 201 });
```

### Error Response

```typescript
import { createErrorResponse } from "@/utils/errors.ts";

return createErrorResponse(createError("NOT_FOUND"), 404);
```

## Examples

See the [Examples](Examples) page for complete code examples using these APIs.

## Next Steps

- Check [Examples](Examples) for usage patterns
- Read [Architecture](Architecture) for project structure
- Learn about [Deployment](Deployment) for production setup

