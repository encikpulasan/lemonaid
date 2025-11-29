# Komiti

A Deno Fresh v2 web application using the island architecture pattern.

## Tech Stack

- **Runtime**: Deno (latest stable)
- **Framework**: Fresh v2
- **UI Library**: Preact
- **Styling**: Tailwind CSS v4
- **Build Tool**: Vite (via Fresh)

## Getting Started

### Prerequisites

- Deno 1.40+ ([Install Deno](https://deno.land/))

### Development

Start the development server:

```bash
deno task dev
```

The server will start at `http://localhost:8000`

### Building for Production

```bash
deno task build
deno task start
```

### Code Quality

```bash
deno task check  # Format, lint, and type check
deno lint        # Lint only
deno fmt         # Format only
```

## Project Structure

```
komiti/
├── routes/          # File-based routing (pages and API endpoints)
├── islands/         # Interactive components (client-side JS)
├── components/      # Server-side components (no JS sent to client)
├── static/          # Static assets (images, CSS, etc.)
├── utils/           # Utility functions
├── types/           # TypeScript type definitions
├── examples/        # Code examples and patterns
├── main.ts          # Server entry point
└── utils.ts         # Define helper and State interface
```

## Code Patterns

### Creating a Route with Handler

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

### Creating an API Route

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

### Creating an Island (Interactive Component)

```tsx
// islands/Counter.tsx
import { useSignal } from "@preact/signals";

export default function Counter() {
  const count = useSignal(0);
  return (
    <div>
      <button onClick={() => count.value++}>Count: {count.value}</button>
    </div>
  );
}
```

### Creating a Server Component

```tsx
// components/Button.tsx
interface ButtonProps {
  children: preact.ComponentChildren;
  onClick?: () => void;
}

export function Button(props: ButtonProps) {
  return <button onClick={props.onClick}>{props.children}</button>;
}
```

## Examples

See the `examples/` directory for complete code examples:
- `route-with-handler.tsx` - Route with data fetching
- `api-route.tsx` - API endpoint example
- `island-component.tsx` - Interactive island component
- `server-component.tsx` - Server-side component

## Type Definitions

Common types are exported from `types/index.ts`:
- `ApiResponse<T>` - Standard API response structure
- `PaginationMeta` - Pagination metadata
- `Status` - Async operation status
- `AppError` - Error structure

## Utilities

Utility functions are in `utils/`:
- `utils/errors.ts` - Error handling helpers
- `utils/validation.ts` - Validation functions

## State Management

Use `ctx.state` (typed via `State` interface in `utils.ts`) to share data between:
- Middlewares
- Layouts
- Routes

## Resources

- [Fresh Documentation](https://fresh.deno.dev/docs)
- [Fresh v2 Getting Started](https://fresh.deno.dev/docs/getting-started)
- [Preact Documentation](https://preactjs.com/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [JSR (JavaScript Registry)](https://jsr.io/)

## License

[Your License Here]
