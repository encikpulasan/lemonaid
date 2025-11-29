# Architecture

Understanding the Fresh Lemonaid project structure and patterns.

## Project Structure

```
lemonaid/
├── .cursor/              # Cursor IDE rules and configuration
│   └── rules/           # MDC rule files for AI assistance
├── components/          # Server-side components (no JS sent to client)
├── examples/            # Code examples and patterns
├── islands/             # Interactive components (client-side JS)
├── routes/              # File-based routing
│   ├── _app.tsx        # App wrapper/layout
│   ├── _middleware.ts  # Middleware functions
│   ├── api/            # API endpoints
│   └── index.tsx       # Home page
├── static/              # Static assets (images, CSS, etc.)
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
│   ├── config.ts       # Environment configuration
│   ├── errors.ts       # Error handling
│   ├── logger.ts       # Logging utilities
│   ├── security.ts     # Security (CORS, API keys)
│   └── validation.ts   # Validation functions
├── .cursorrules         # Main AI rules
├── .cursorignore        # Files to exclude from AI context
├── deno.json            # Deno configuration
├── main.ts              # Server entry point
└── utils.ts             # Define helper and State interface
```

## Fresh v2 Architecture

### File-Based Routing

Routes are created by adding files to the `routes/` directory:

- `routes/index.tsx` → `/`
- `routes/about.tsx` → `/about`
- `routes/users/[id].tsx` → `/users/:id`
- `routes/api/data.ts` → `/api/data`

### Islands vs Components

#### Components (`components/`)
- Server-side only
- No JavaScript sent to client
- Fast, lightweight
- Use for static or server-rendered content

```tsx
// components/Button.tsx
export function Button({ children }: { children: preact.ComponentChildren }) {
  return <button>{children}</button>;
}
```

#### Islands (`islands/`)
- Interactive components
- JavaScript sent to client
- Automatically hydrated
- Use when you need interactivity

```tsx
// islands/Counter.tsx
import { useSignal } from "@preact/signals";

export default function Counter() {
  const count = useSignal(0);
  return <button onClick={() => count.value++}>Count: {count.value}</button>;
}
```

## State Management

Use `ctx.state` (typed via `State` interface) to share data between:

- Middlewares
- Layouts
- Routes

### Defining State

```typescript
// utils.ts
export interface State {
  user?: User;
  session?: Session;
}
```

### Using State

```typescript
// routes/_middleware.ts
export const handler = define.middleware((ctx) => {
  ctx.state.user = { id: "1", name: "Alice" };
});

// routes/profile.tsx
export default define.page((props) => {
  const user = props.state.user; // Typed!
  return <div>Hello {user.name}</div>;
});
```

## Route Patterns

### Simple Page

```tsx
// routes/about.tsx
import { define } from "@/utils.ts";

export default define.page(() => {
  return <div>About Us</div>;
});
```

### Page with Handler

```tsx
// routes/users.tsx
import { define } from "@/utils.ts";

export const handler = define.handlers({
  async GET(ctx) {
    const users = await fetchUsers();
    return { users };
  },
});

export default define.page<typeof handler>((props) => {
  return <div>{props.data.users.map(u => <div>{u.name}</div>)}</div>;
});
```

### API Route

```tsx
// routes/api/users.ts
import { define } from "@/utils.ts";

export const handler = define.handlers({
  GET(ctx) {
    return Response.json({ users: [] });
  },
  POST(ctx) {
    const data = await ctx.req.json();
    return Response.json({ created: data }, { status: 201 });
  },
});
```

## Middleware

Middleware runs before route handlers:

```typescript
// routes/_middleware.ts
import { define } from "@/utils.ts";

export const handler = define.middleware((ctx) => {
  // Add headers, modify state, etc.
  ctx.state.timestamp = Date.now();
  
  // Call next middleware/route
  return ctx.next();
});
```

## Utilities

### Configuration

```typescript
import { getConfig } from "@/utils/config.ts";

const config = getConfig();
const apiKey = config.API_KEY;
```

### Error Handling

```typescript
import { createError, createErrorResponse } from "@/utils/errors.ts";

// Create error
const error = createError("NOT_FOUND", "User not found");

// Return error response
return createErrorResponse(error, 404);
```

### Validation

```typescript
import { isValidEmail, isValidUrl } from "@/utils/validation.ts";

if (!isValidEmail(email)) {
  return createErrorResponse(createError("INVALID_EMAIL"), 400);
}
```

### Logging

```typescript
import { log } from "@/utils/logger.ts";

log.info("User logged in", { userId: "123" });
log.error("Failed to process", { error });
log.request("GET", "/api/users", 200, 45);
```

## Type Definitions

Centralized types in `types/index.ts`:

```typescript
export interface ApiResponse<T> {
  data: T;
  error?: AppError;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}
```

## Security

### API Key Authentication

API routes under `/api` are protected by default:

```typescript
// routes/api/data.ts
// Automatically validates x-api-key header
```

### CORS

Configured via environment variables:

```env
CORS_ORIGIN=https://yourdomain.com
CORS_ENABLED=true
```

## Best Practices

1. **Minimize Islands** - Use server components when possible
2. **Type Everything** - Use TypeScript types for all data
3. **Use Utilities** - Don't reinvent the wheel
4. **Follow Patterns** - Check `examples/` directory
5. **Error Handling** - Always handle errors properly
6. **Validation** - Validate all user inputs
7. **Logging** - Log important events

## Next Steps

- Check out [Examples](Examples) for code patterns
- Read [API Reference](API-Reference) for detailed API docs
- Learn about [Vibe Coding](Vibe-Coding) for AI-assisted development

