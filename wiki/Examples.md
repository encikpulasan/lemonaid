# Examples

Code examples and patterns for Fresh Lemonaid.

## Route Examples

### Simple Page

```tsx
// routes/about.tsx
import { define } from "@/utils.ts";

export default define.page(() => {
  return (
    <div class="p-4">
      <h1 class="text-2xl font-bold">About Us</h1>
      <p>This is a simple page component.</p>
    </div>
  );
});
```

### Page with Data Fetching

```tsx
// routes/users.tsx
import { define } from "@/utils.ts";

interface PageData {
  users: Array<{ id: string; name: string }>;
}

export const handler = define.handlers({
  async GET(ctx) {
    const users = await fetchUsers();
    return { users } satisfies PageData;
  },
});

export default define.page<typeof handler>((props) => {
  const { users } = props.data;

  return (
    <div class="p-4">
      <h1 class="text-2xl font-bold mb-4">Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id} class="mb-2">{user.name}</li>
        ))}
      </ul>
    </div>
  );
});

async function fetchUsers() {
  // Your data fetching logic
  return [
    { id: "1", name: "Alice" },
    { id: "2", name: "Bob" },
  ];
}
```

### Dynamic Route

```tsx
// routes/users/[id].tsx
import { define } from "@/utils.ts";

interface PageData {
  user: { id: string; name: string };
}

export const handler = define.handlers({
  async GET(ctx) {
    const id = ctx.params.id;
    const user = await fetchUser(id);
    
    if (!user) {
      return createErrorResponse(createError("NOT_FOUND"), 404);
    }
    
    return { user } satisfies PageData;
  },
});

export default define.page<typeof handler>((props) => {
  const { user } = props.data;
  return <div class="p-4"><h1>{user.name}</h1></div>;
});
```

## API Route Examples

### Simple API Endpoint

```tsx
// routes/api/users.ts
import { define } from "@/utils.ts";

export const handler = define.handlers({
  GET(ctx) {
    return Response.json({ users: [] });
  },
});
```

### API with POST

```tsx
// routes/api/users.ts
import { define } from "@/utils.ts";
import { createError, createErrorResponse } from "@/utils/errors.ts";
import { isValidEmail } from "@/utils/validation.ts";

export const handler = define.handlers({
  GET(ctx) {
    return Response.json({ users: [] });
  },
  
  async POST(ctx) {
    const data = await ctx.req.json();
    
    // Validate
    if (!isValidEmail(data.email)) {
      return createErrorResponse(
        createError("INVALID_EMAIL", "Invalid email address"),
        400
      );
    }
    
    // Create user
    const user = await createUser(data);
    
    return Response.json({ user }, { status: 201 });
  },
});
```

### API with Authentication

```tsx
// routes/api/protected.ts
import { define } from "@/utils.ts";

export const handler = define.handlers({
  GET(ctx) {
    // API key is automatically validated
    // Access user from state if set by middleware
    const user = ctx.state.user;
    
    return Response.json({ message: "Protected data", user });
  },
});
```

## Island Examples

### Counter

```tsx
// islands/Counter.tsx
import { useSignal } from "@preact/signals";

export default function Counter() {
  const count = useSignal(0);
  
  return (
    <div class="p-4">
      <p>Count: {count.value}</p>
      <button 
        onClick={() => count.value++}
        class="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Increment
      </button>
    </div>
  );
}
```

### Form with State

```tsx
// islands/ContactForm.tsx
import { useSignal } from "@preact/signals";

export default function ContactForm() {
  const name = useSignal("");
  const email = useSignal("");
  const submitted = useSignal(false);
  
  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name.value, email: email.value }),
    });
    
    if (response.ok) {
      submitted.value = true;
    }
  };
  
  if (submitted.value) {
    return <p class="text-green-600">Thank you for your message!</p>;
  }
  
  return (
    <form onSubmit={handleSubmit} class="space-y-4">
      <input
        type="text"
        value={name.value}
        onInput={(e) => name.value = e.currentTarget.value}
        placeholder="Name"
        class="w-full px-4 py-2 border rounded"
      />
      <input
        type="email"
        value={email.value}
        onInput={(e) => email.value = e.currentTarget.value}
        placeholder="Email"
        class="w-full px-4 py-2 border rounded"
      />
      <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded">
        Submit
      </button>
    </form>
  );
}
```

## Component Examples

### Server Component

```tsx
// components/Header.tsx
interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <header class="bg-blue-500 text-white p-4">
      <h1 class="text-2xl font-bold">{title}</h1>
    </header>
  );
}
```

### Using Components

```tsx
// routes/index.tsx
import { define } from "@/utils.ts";
import { Header } from "@/components/Header.tsx";

export default define.page(() => {
  return (
    <div>
      <Header title="Welcome" />
      <main class="p-4">Content here</main>
    </div>
  );
});
```

## Middleware Examples

### Logging Middleware

```typescript
// routes/_middleware.ts
import { define } from "@/utils.ts";
import { log } from "@/utils/logger.ts";

export const handler = define.middleware((ctx) => {
  const start = Date.now();
  
  const response = await ctx.next();
  
  const duration = Date.now() - start;
  log.request(ctx.req.method, ctx.url.pathname, response.status, duration);
  
  return response;
});
```

### Authentication Middleware

```typescript
// routes/_middleware.ts
import { define } from "@/utils.ts";

export const handler = define.middleware((ctx) => {
  // Check authentication
  const token = ctx.req.headers.get("authorization");
  
  if (token) {
    const user = await validateToken(token);
    ctx.state.user = user;
  }
  
  return ctx.next();
});
```

## Using Utilities

### Configuration

```typescript
import { getConfig } from "@/utils/config.ts";

const config = getConfig();
const apiUrl = config.FRESH_PUBLIC_API_URL;
```

### Error Handling

```typescript
import { createError, createErrorResponse } from "@/utils/errors.ts";

export const handler = define.handlers({
  async GET(ctx) {
    try {
      const data = await fetchData();
      return Response.json({ data });
    } catch (error) {
      return createErrorResponse(
        createError("FETCH_ERROR", error.message),
        500
      );
    }
  },
});
```

### Validation

```typescript
import { isValidEmail, isValidUrl, isNotEmpty } from "@/utils/validation.ts";

export const handler = define.handlers({
  async POST(ctx) {
    const data = await ctx.req.json();
    
    if (!isNotEmpty(data.name)) {
      return createErrorResponse(createError("NAME_REQUIRED"), 400);
    }
    
    if (!isValidEmail(data.email)) {
      return createErrorResponse(createError("INVALID_EMAIL"), 400);
    }
    
    // Process data...
  },
});
```

### Logging

```typescript
import { log } from "@/utils/logger.ts";

log.info("User action", { userId: "123", action: "login" });
log.error("Operation failed", { error, context: "payment" });
log.request("POST", "/api/users", 201, 120);
```

## Real-World Examples

Check the `examples/` directory in the repository for complete, working examples:

- `route-with-handler.tsx` - Route with data fetching
- `api-route.tsx` - API endpoint example
- `api-with-auth.tsx` - API with authentication
- `island-component.tsx` - Interactive island
- `server-component.tsx` - Server-side component
- `using-config.ts` - Using configuration utilities

## Next Steps

- Read the [Architecture](Architecture) guide
- Check [API Reference](API-Reference) for detailed API docs
- Learn about [Vibe Coding](Vibe-Coding) for AI-assisted development

