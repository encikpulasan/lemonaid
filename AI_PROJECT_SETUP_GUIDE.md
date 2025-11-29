# AI-Assisted Project Setup Guide for Deno Fresh v2

This guide provides a complete checklist and instructions for setting up a new Deno Fresh v2 project optimized for AI-assisted development in Cursor IDE.

---

## 📋 Quick Start Checklist

Copy this checklist and check off items as you complete them:

```
□ 1. Initialize Fresh project with deno run -Ar jsr:@fresh/init
□ 2. Review and configure deno.json
□ 3. Create .cursorrules file
□ 4. Write README.md with project overview
□ 5. Set up .gitignore for Deno
□ 6. Configure Deno linting and formatting
□ 7. Create .env.example file
□ 8. Set up Deno testing framework
□ 9. Create initial type definitions
□ 10. Document Fresh architecture decisions (islands, routes)
□ 11. Initialize git repository
```

---

## 🏗️ Step-by-Step Setup Instructions

### Step 1: Initialize Fresh Project

Initialize a new Fresh v2 project using the official init command:

```bash
deno run -Ar jsr:@fresh/init@2.0.3 .
```

This will guide you through:
- Project name
- Tailwind CSS integration (optional)
- VS Code support configuration

### Step 2: Project Structure

Fresh v2 uses a specific directory structure optimized for the island architecture:

```
project-name/
├── routes/                # File-based routing
│   ├── _app.tsx          # App wrapper (renders outer <html> structure)
│   ├── _layout.tsx       # Layout component (optional, per directory)
│   ├── _middleware.ts    # Middleware (optional, per directory)
│   ├── index.tsx         # Home page (/)
│   ├── about.tsx         # About page (/about)
│   ├── [slug].tsx        # Dynamic route (/:slug)
│   ├── [...path].tsx     # Wildcard route (/:path*)
│   ├── (marketing)/       # Route group (parentheses = not in URL)
│   │   ├── _layout.tsx   # Layout for this group
│   │   ├── (_components)/ # Local components
│   │   ├── (_islands)/    # Local islands directory
│   │   ├── about.tsx     # /about (with group layout)
│   │   └── career.tsx    # /career (with group layout)
│   └── api/              # API routes
│       └── [name].tsx    # API endpoint (/api/:name)
├── islands/              # Interactive components (client-side JS)
│   ├── Counter.tsx       # Example island
│   └── UserProfile.tsx
├── components/           # Server-side components (no JS sent to client)
│   ├── Button.tsx
│   └── Layout.tsx
├── static/               # Static assets (served directly)
│   ├── images/
│   └── styles/
├── utils/                # Utility functions
│   └── utils.ts          # Helper functions (includes define helper)
├── types/                # TypeScript type definitions
│   └── types.ts
├── main.ts               # Server entry point (creates App instance)
├── client.ts             # Client entry file (loaded on every page)
├── deno.json             # Deno configuration (tasks, imports, etc.)
├── vite.config.ts        # Vite configuration
├── .cursorrules          # Cursor AI rules
├── README.md
└── .gitignore
```

**Key Concepts:**
- **Routes**: File-based routing in `routes/` directory - files map to URLs automatically
- **Islands**: Interactive components that require client-side JavaScript (in `islands/` or `(_islands)/`)
- **Components**: Server-side components (no JavaScript sent to client) - default choice
- **Static**: Static assets served directly from `static/` directory
- **Route Groups**: Folders wrapped in parentheses `(name)` group routes without affecting URL
- **Local Islands**: `(_islands)` folders within route directories for co-located islands

### Step 3: Create `.cursorrules` File

Create `.cursorrules` in the project root with this template:

```markdown
# Project Context
This is a Deno Fresh v2 web application using the island architecture pattern.

# Tech Stack
- Runtime: Deno (latest stable)
- Framework: Fresh v2
- UI Library: Preact
- Styling: Tailwind CSS (if enabled) or CSS
- Build Tool: Vite (via Fresh)
- Testing: Deno's built-in test framework

# Fresh v2 Architecture
- Use file-based routing in routes/ directory (files map to URLs automatically)
- Islands (in islands/ or (_islands)/) are interactive components that require client-side JS
- Components (in components/ or (_components)/) are server-side only (no JS sent to client)
- Use define.page() for page components in routes
- Use define.handlers() for route handlers (GET, POST, etc.)
- Use define.middleware() for middleware functions
- Use define.layout() for layout components
- Minimize islands - prefer server components when possible
- Islands are automatically hydrated on the client
- Islands can be nested within other islands
- Only serializable props can be passed to islands (no functions)

# Code Style Guidelines
- Use TypeScript with strict mode (Deno default)
- Follow Fresh v2 conventions and best practices
- Prefer functional components
- Use async/await over promises
- Maximum function length: 50 lines
- Maximum file length: 300 lines
- Use JSR imports when available (jsr:@scope/package)

# Architecture Patterns
- Island Architecture: Keep interactivity minimal and isolated
- Server-first: Default to server components, use islands only when needed
- File-based routing: Routes map directly to files in routes/
- API routes: Use routes/api/ for backend endpoints
- Keep components small and focused (single responsibility)
- Separate business logic from UI/presentation
- Implement proper error handling

# Naming Conventions
- Routes: kebab-case (e.g., user-profile.tsx)
- Islands: PascalCase (e.g., Counter.tsx, UserProfile.tsx)
- Components: PascalCase (e.g., Button.tsx, Layout.tsx)
- Utilities: camelCase (e.g., formatDate.ts, validateEmail.ts)
- Types/Interfaces: PascalCase (e.g., UserData.ts, ApiResponse.ts)
- Constants: UPPER_SNAKE_CASE (e.g., API_BASE_URL)

# Dependencies
- Prefer JSR (JavaScript Registry) packages over npm
- Use deno.land/x for Deno-specific packages
- Avoid npm: imports unless necessary
- Keep dependencies minimal and well-maintained
- Use import maps in deno.json for cleaner imports

# File Organization
- One component per file
- Co-locate related files (component + types)
- Export types from centralized type files (types/)
- Use @/ path alias for imports (configured in deno.json)
- Routes go in routes/, islands in islands/, components in components/

# Testing Requirements
- Write unit tests for all utility functions
- Integration tests for critical user flows
- Use Deno.test() for all tests
- Aim for 80%+ code coverage
- Use descriptive test names
- Place tests next to source files with .test.ts extension

# Security
- Never commit API keys or secrets
- Validate all user inputs
- Use environment variables for configuration (Deno.env)
- Implement proper authentication/authorization
- Use Deno's built-in security features

# Performance
- Minimize islands (only use when interactivity is required)
- Use server components for static content
- Optimize images and assets in static/
- Use Fresh's built-in optimizations
- Monitor bundle size (islands are code-split automatically)

# When generating code:
- Always include proper TypeScript types
- Add JSDoc comments for complex functions
- Include error handling
- Follow Fresh v2 patterns (define.page, define.route)
- Distinguish between islands and components
- Use @/ alias for imports
- Ensure code is testable
- Use Deno's standard library when appropriate
```

### Step 4: Create `README.md`

Template:

```markdown
# Project Name

## Overview
Brief description of what this project does.

## Tech Stack
- Runtime: Deno (latest stable)
- Framework: Fresh v2
- UI Library: Preact
- Styling: Tailwind CSS (if enabled)
- Build Tool: Vite

## Getting Started

### Prerequisites
- Deno 1.40+ ([Install Deno](https://deno.land/))

### Installation
No installation needed! Deno downloads dependencies on first run.

### Environment Variables
Copy `.env.example` to `.env` and fill in values:
\`\`\`bash
cp .env.example .env
\`\`\`

### Running the Project
\`\`\`bash
deno task dev
\`\`\`

The server will start at `http://localhost:8000`

### Building for Production
\`\`\`bash
deno task build
deno task start
\`\`\`

### Testing
\`\`\`bash
deno test
\`\`\`

### Linting and Formatting
\`\`\`bash
deno lint
deno fmt
\`\`\`

## Project Structure
- `routes/` - File-based routing (pages and API endpoints)
- `islands/` - Interactive components (client-side JavaScript)
- `components/` - Server-side components (no JS sent to client)
- `static/` - Static assets (images, CSS, etc.)
- `utils/` - Utility functions
- `types/` - TypeScript type definitions
- `main.ts` - Server entry point
- `client.ts` - Client entry point

## Fresh v2 Concepts
- **Routes**: Files in `routes/` automatically become pages
- **Islands**: Interactive components that require client-side JS
- **Components**: Server-side components (default, no JS)
- **API Routes**: Files in `routes/api/` become API endpoints

## Contributing
[Guidelines for contributing]

## License
[License information]
```

### Step 5: Configure `deno.json`

Deno has built-in TypeScript support, so no separate `tsconfig.json` is needed. Configure your project in `deno.json`:

```json
{
  "tasks": {
    "dev": "deno run -A --watch=static/,routes/ dev.ts",
    "build": "deno run -A dev.ts build",
    "preview": "deno run -A main.ts",
    "start": "deno run -A main.ts",
    "lint": "deno lint",
    "fmt": "deno fmt",
    "test": "deno test -A"
  },
  "imports": {
    "fresh": "jsr:@fresh/core@^2",
    "fresh/": "jsr:@fresh/core@^2/",
    "@preact/signals": "jsr:@preact/signals@^1",
    "@preact/signals-core": "jsr:@preact/signals-core@^1",
    "preact": "jsr:@preact/signals@^1",
    "preact/": "jsr:@preact/signals@^1/",
    "@/": "./"
  },
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "preact"
  },
  "lint": {
    "rules": {
      "tags": ["fresh", "recommended"]
    }
  },
  "fmt": {
    "files": {
      "include": ["routes/", "islands/", "components/", "utils/"]
    }
  }
}
```

**Key Points:**
- `tasks`: Define common commands (dev, build, test, etc.)
- `imports`: Import map for cleaner imports (use `@/` for project root)
- Prefer JSR packages (`jsr:@scope/package`) over npm when available
- `compilerOptions`: TypeScript/JSX configuration (Preact, not React)
- No `node_modules` - dependencies are downloaded on demand
- The `fresh` init command will set up the correct imports automatically

### Step 6: Create `.gitignore`

Deno-specific template:

```gitignore
# Deno
.deno/
deno.lock

# Fresh
_fresh/
.fresh/

# Production
dist/
build/
*.local

# Environment variables
.env
.env.local
.env.*.local

# Logs
logs
*.log

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Testing
coverage/
.nyc_output

# Misc
.cache/
.temp/
```

### Step 7: Set Up Linting & Formatting

Deno includes built-in linting and formatting - no additional configuration needed!

#### Linting

Deno's linter is configured in `deno.json`:

```json
{
  "lint": {
    "rules": {
      "tags": ["fresh", "recommended"],
      "include": ["recommended"],
      "exclude": []
    }
  }
}
```

Run linting:
```bash
deno task lint
# or
deno lint
```

#### Formatting

Deno's formatter is built-in. Configure in `deno.json`:

```json
{
  "fmt": {
    "files": {
      "include": ["routes/", "islands/", "components/", "utils/"],
      "exclude": ["static/", "_fresh/"]
    },
    "options": {
      "useTabs": false,
      "lineWidth": 80,
      "indentWidth": 2,
      "singleQuote": false,
      "proseWrap": "preserve"
    }
  }
}
```

Run formatting:
```bash
deno task fmt
# or
deno fmt
```

**Note:** Deno's formatter uses a standard style - no Prettier needed!

### Step 8: Environment Variables

Create `.env.example`:

```env
# API Configuration
API_BASE_URL=http://localhost:3000
API_KEY=your_api_key_here

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/dbname

# Authentication
JWT_SECRET=your_jwt_secret_here

# Feature Flags
ENABLE_FEATURE_X=true

# Public Variables (inlined into islands at build time)
# Variables prefixed with FRESH_PUBLIC_ are available in islands
FRESH_PUBLIC_API_URL=https://api.example.com
FRESH_PUBLIC_ANALYTICS_ID=your_analytics_id
```

**Important Notes:**
- Use `Deno.env.get("VAR_NAME")` to read environment variables
- Variables prefixed with `FRESH_PUBLIC_` are inlined into islands during build
- `FRESH_PUBLIC_` variables are available in browser code (islands)
- Regular env vars are only available server-side
- Run with `--env-file` flag: `deno run --env-file .env -A main.ts`

**Usage:**
```typescript
// Server-side (routes, middleware)
const apiKey = Deno.env.get("API_KEY");

// Client-side (islands) - only FRESH_PUBLIC_ vars
const apiUrl = Deno.env.get("FRESH_PUBLIC_API_URL");
```

### Step 9: Testing Setup

Deno includes a built-in test framework - no Jest needed!

#### Test Structure

Create test files with `.test.ts` or `.spec.ts` extension:

```typescript
// utils/formatDate.test.ts
import { assertEquals } from "@std/assert";
import { formatDate } from "./formatDate.ts";

Deno.test("formatDate formats date correctly", () => {
  const date = new Date("2024-01-15");
  const result = formatDate(date);
  assertEquals(result, "Jan 15, 2024");
});
```

#### Running Tests

```bash
# Run all tests
deno task test
# or
deno test -A

# Run with watch mode
deno test --watch -A

# Run with coverage
deno test --coverage=cov_profile -A
deno coverage cov_profile
```

#### Test Configuration

Add to `deno.json`:

```json
{
  "test": {
    "include": ["**/*.test.ts", "**/*.spec.ts"],
    "exclude": ["_fresh/", "static/"]
  }
}
```

**Key Features:**
- Built-in test runner (no external dependencies)
- Supports async/await out of the box
- Built-in assertions via `@std/assert`
- Coverage support included

### Step 10: Initial Type Definitions and Utils

Create `utils/utils.ts` with the define helper:

```typescript
import { createDefine } from "fresh";

// Define your app state type
export interface State {
  // Add your global state properties here
  // Example: user?: User;
}

// Create the define helper with your state type
export const define = createDefine<State>();
```

Create `types/types.ts`:

```typescript
// Example type definitions - customize for your project

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}

export type Status = 'idle' | 'loading' | 'success' | 'error';
```

**Usage in routes:**
```typescript
// routes/users.tsx
import { define } from "@/utils/utils.ts";

// With handler (for data fetching)
export const handler = define.handlers({
  GET(ctx) {
    return { users: [] };
  },
});

export default define.page<typeof handler>((props) => {
  // props.data contains the return value from handler
  return <div>Users: {props.data.users.length}</div>;
});

// Simple page without handler
export default define.page(() => {
  return <div>Users page</div>;
});
```

### Step 11: Configure main.ts

The `main.ts` file is the server entry point where you create and configure your Fresh App instance:

```typescript
// main.ts
import { App, staticFiles } from "fresh";
import { config } from "@fresh/core/dev";

// Wait for dev config to load (only needed in dev mode)
await config;

// Create the app instance
const app = new App()
  // Serve static files (required for islands to work)
  .use(staticFiles())
  // Load all file-based routes from routes/ directory
  .fsRoutes();

// Start the server
app.listen();
```

**Advanced Configuration:**

```typescript
// main.ts
import { App, staticFiles } from "fresh";
import { config } from "@fresh/core/dev";
import { cors } from "fresh/plugins/cors";

await config;

const app = new App()
  // Add plugins
  .use(cors())
  // Add global middleware
  .use(async (ctx) => {
    console.log(`Request: ${ctx.req.method} ${ctx.url.pathname}`);
    return ctx.next();
  })
  // Serve static files
  .use(staticFiles())
  // Add error handler
  .onError("*", (ctx) => {
    console.error("Error:", ctx.error);
    return new Response("Internal Server Error", { status: 500 });
  })
  // Add 404 handler
  .notFound(() => {
    return new Response("Not Found", { status: 404 });
  })
  // Load file-based routes
  .fsRoutes();

app.listen();
```

**Key Points:**
- `staticFiles()` middleware is required for islands to work
- `.fsRoutes()` loads all routes from the `routes/` directory
- Middlewares are applied in order (top to bottom)
- Use `.onError()` for error handling
- Use `.notFound()` for 404 handling

### Step 12: Deno Tasks

Tasks are defined in `deno.json` (already shown in Step 5). Standard tasks:

```json
{
  "tasks": {
    "dev": "deno run -A --watch=static/,routes/ dev.ts",
    "build": "deno run -A dev.ts build",
    "preview": "deno run -A main.ts",
    "start": "deno run -A main.ts",
    "lint": "deno lint",
    "fmt": "deno fmt",
    "test": "deno test -A",
    "check": "deno check **/*.ts"
  }
}
```

Run tasks with:
```bash
deno task dev      # Development server
deno task build    # Build for production
deno task start    # Start production server
deno task lint     # Lint code
deno task fmt      # Format code
deno task test     # Run tests
deno task check    # Type check
```

---

## 🤖 AI-Assisted Development Best Practices

### Effective Prompting in Cursor

1. **Be Specific**: Instead of "add authentication", say:
   - "Add JWT authentication to the login endpoint in `src/api/auth.ts`"

2. **Reference Existing Code**: 
   - "Following the pattern in `userService.ts`, create a productService"

3. **Break Down Tasks**:
   - Instead of "build a dashboard", ask for:
     - "Create dashboard layout component"
     - "Add user stats widget"
     - "Implement data fetching hook"

4. **Provide Context**:
   - "Update the UserProfile component to include email verification status, using the User type from `src/types/index.ts`"

### Code Organization Tips

- **One concept per file**: Keep files focused
- **Clear naming**: Use descriptive names that explain purpose
- **Type everything**: TypeScript helps AI understand your code
- **Document complex logic**: JSDoc comments guide AI
- **Consistent patterns**: AI learns from your existing code

### File Naming Conventions

- Routes: `index.tsx`, `about.tsx`, `user-profile.tsx` (kebab-case)
- Islands: `Counter.tsx`, `UserProfile.tsx` (PascalCase)
- Components: `Button.tsx`, `Layout.tsx` (PascalCase)
- Utilities: `formatDate.ts`, `validateEmail.ts` (camelCase)
- Services: `userService.ts`, `apiClient.ts` (camelCase)
- Types: `user.types.ts`, `api.types.ts` (camelCase)
- API Routes: `users.ts`, `auth.ts` (in `routes/api/`)

---

## 📝 Fresh v2 Specific Features

### File-Based Routing

Fresh uses file-based routing with automatic URL mapping:

| File Name | Route Pattern | Matching Paths |
|-----------|---------------|----------------|
| `index.tsx` | `/` | `/` |
| `about.tsx` | `/about` | `/about` |
| `blog/index.tsx` | `/blog` | `/blog` |
| `blog/[slug].tsx` | `/blog/:slug` | `/blog/foo`, `/blog/bar` |
| `blog/[slug]/comments.tsx` | `/blog/:slug/comments` | `/blog/foo/comments` |
| `old/[...path].tsx` | `/old/:path*` | `/old/foo`, `/old/bar/baz` |
| `docs/[[version]]/index.tsx` | `/docs{/:version}?` | `/docs`, `/docs/latest` |

**Route Groups:**
Use parentheses to group routes without affecting the URL:
- `(marketing)/about.tsx` → `/about` (not `/marketing/about`)
- `(marketing)/_layout.tsx` → Layout applies only to routes in this group

**Custom Route Patterns:**
```typescript
// routes/my-route.ts
import { RouteConfig } from "fresh";

export const config: RouteConfig = {
  routeOverride: "/x/:module@:version/:path*",
};
```

### Islands Architecture

**When to use Islands:**
- User interactions (clicks, form submissions)
- Client-side state management (Preact Signals)
- Browser APIs (localStorage, geolocation, EventSource)
- Third-party widgets
- Real-time updates

**When to use Components:**
- Static content
- Server-rendered data
- SEO-important content
- Most UI elements (default choice)

**Island Locations:**
- Global: `islands/MyIsland.tsx`
- Local: `routes/shop/(_islands)/Cart.tsx` (co-located with routes)

**Island Props (Serializable Only):**
- ✅ Primitives: `string`, `number`, `boolean`, `bigint`, `undefined`, `null`
- ✅ Special values: `Infinity`, `-Infinity`, `-0`, `NaN`
- ✅ `Uint8Array`, `URL`, `Date`, `RegExp`
- ✅ `Map`, `Set`, plain objects, arrays
- ✅ JSX Elements (server-rendered)
- ✅ Preact Signals (if inner value is serializable)
- ❌ Functions (not supported)

**Client-Only Rendering:**
```typescript
import { IS_BROWSER } from "fresh/runtime";

export function MyIsland() {
  if (!IS_BROWSER) return <div>Loading...</div>;
  // Browser-only code here
  return <div>Client content</div>;
}
```

### API Routes

Create API endpoints in `routes/api/`:

```typescript
// routes/api/users.ts
import { define } from "@/utils/utils.ts";

export const handler = define.handlers({
  GET(ctx) {
    const users = await getUsers();
    return Response.json(users);
  },
  POST(ctx) {
    const user = await createUser(await ctx.req.json());
    return Response.json(user, { status: 201 });
  },
});
```

### Middleware

**File-based middleware:**
```typescript
// routes/_middleware.ts
import { define } from "@/utils/utils.ts";

export default define.middleware(async (ctx) => {
  // Add headers, authentication, etc.
  ctx.state.user = await getUser(ctx);
  return ctx.next();
});

// Multiple middlewares
export default [
  define.middleware(async (ctx) => {
    console.log("Middleware 1");
    return ctx.next();
  }),
  define.middleware(async (ctx) => {
    console.log("Middleware 2");
    return ctx.next();
  }),
];
```

**Programmatic middleware (in main.ts):**
```typescript
app.use(async (ctx) => {
  ctx.state.greeting = "Hello";
  return ctx.next();
});
```

### Context API

The `Context` object provides:
- `ctx.req` - Incoming Request
- `ctx.url` - URL instance
- `ctx.params` - Route parameters
- `ctx.state` - Request state (typed)
- `ctx.route` - Matched route pattern
- `ctx.config` - Fresh configuration
- `ctx.error` - Caught error (if any)
- `ctx.render(jsx, options?)` - Render JSX to HTML
- `ctx.redirect(url, status?)` - Redirect response
- `ctx.next()` - Call next middleware

---

## 🔄 Maintenance Checklist

Regularly update:

- [ ] Dependencies (security updates)
- [ ] `.cursorrules` (as project evolves)
- [ ] Documentation (README, architecture docs)
- [ ] Type definitions (keep them comprehensive)
- [ ] Test coverage (maintain >80%)

---

## 🚀 Quick Commands Reference

```bash
# Initialize Fresh project
deno run -Ar jsr:@fresh/init

# Development
deno task dev              # Start dev server
deno task build            # Build for production
deno task start            # Start production server
deno task preview          # Preview production build

# Code Quality
deno task lint             # Lint code
deno task fmt              # Format code
deno task check            # Type check

# Testing
deno task test             # Run tests
deno test --watch -A       # Watch mode
deno test --coverage -A    # With coverage

# Initialize git
git init
git add .
git commit -m "Initial Fresh v2 project setup"

# Create .cursorrules
touch .cursorrules

# Create environment template
touch .env.example
```

---

## 📚 Additional Resources

- [Cursor IDE Documentation](https://cursor.sh/docs)
- [Deno Manual](https://deno.land/manual)
- [Fresh Documentation](https://fresh.deno.dev/docs) - Official Fresh docs
- [Fresh v2 Getting Started](https://fresh.deno.dev/docs/getting-started)
- [Fresh Concepts](https://fresh.deno.dev/docs/concepts) - Routing, Islands, Middleware, etc.
- [Fresh Advanced](https://fresh.deno.dev/docs/advanced) - Layouts, Forms, Error Handling
- [Preact Documentation](https://preactjs.com/)
- [Preact Signals](https://preactjs.com/guide/v10/signals/) - State management for islands
- [JSR (JavaScript Registry)](https://jsr.io/) - Deno's package registry
- [Deno Deploy](https://deno.com/deploy) - Recommended deployment platform
- [URL Pattern API](https://developer.mozilla.org/en-US/docs/Web/API/URL_Pattern_API) - Routing patterns

---

## 💡 Pro Tips

1. **Minimize Islands**: Only use islands when interactivity is required. Most UI can be server components.
2. **Use JSR**: Prefer JSR packages (`jsr:@scope/package`) over npm when available.
3. **Leverage Deno Features**: Use Deno's built-in tools (test, lint, fmt) - no extra dependencies needed.
4. **File-based Routing**: Let Fresh handle routing - just create files in `routes/`. Use route groups `(name)` for organization.
5. **Type Safety**: Use `define.*` helpers for better TypeScript inference and less boilerplate.
6. **Island Props**: Remember - only serializable props! No functions, but JSX is allowed.
7. **Co-locate Islands**: Use `(_islands)` folders within route directories for better organization.
8. **Environment Variables**: Use `FRESH_PUBLIC_` prefix for variables needed in islands (browser).
9. **Deploy Easily**: Fresh projects deploy seamlessly to Deno Deploy with automatic detection.
10. **Use @/ Alias**: Import from project root using `@/` for cleaner imports.
11. **Context State**: Use `ctx.state` to pass data between middlewares and routes.
12. **Layouts**: Use `_layout.tsx` files for shared page structure within route groups.
13. **Start Small**: Begin with core structure, add complexity gradually.
14. **Document Decisions**: Note why you chose specific patterns.
15. **Use AI Effectively**: Break complex tasks into smaller, specific requests.

---

**Last Updated**: December 2024

**Customize this guide** for your specific Fresh v2 project needs and team preferences!

---

## 🎯 Fresh v2 Quick Reference

### Creating a Route with Handler
```typescript
// routes/users.tsx
import { define } from "@/utils/utils.ts";

export const handler = define.handlers({
  GET(ctx) {
    // Fetch data, access ctx.params, ctx.state, etc.
    return { users: [{ id: 1, name: "John" }] };
  },
});

export default define.page<typeof handler>((props) => {
  // props.data contains handler return value
  // props.state contains request state
  // props.url contains the URL
  return (
    <div>
      <h1>Users</h1>
      {props.data.users.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
});
```

### Creating a Simple Route
```typescript
// routes/about.tsx
import { define } from "@/utils/utils.ts";

export default define.page(() => {
  return <h1>About</h1>;
});
```

### Creating an Island
```typescript
// islands/Counter.tsx
import { useSignal } from "@preact/signals";

export default function Counter() {
  const count = useSignal(0);
  return (
    <div>
      <p>Count: {count.value}</p>
      <button onClick={() => count.value++}>+</button>
      <button onClick={() => count.value--}>-</button>
    </div>
  );
}
```

### Using Islands in Routes
```typescript
// routes/index.tsx
import { define } from "@/utils/utils.ts";
import Counter from "@/islands/Counter.tsx";

export default define.page(() => {
  return (
    <div>
      <h1>Home</h1>
      <Counter />
    </div>
  );
});
```

### Creating an API Route
```typescript
// routes/api/users.ts
import { define } from "@/utils/utils.ts";

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

### Creating Middleware
```typescript
// routes/_middleware.ts
import { define } from "@/utils/utils.ts";

export default define.middleware(async (ctx) => {
  // Modify request/response
  ctx.state.user = await getUser(ctx);
  
  const res = await ctx.next();
  res.headers.set("X-Custom-Header", "value");
  
  return res;
});
```

### Creating a Layout
```typescript
// routes/_layout.tsx or routes/(group)/_layout.tsx
import { define } from "@/utils/utils.ts";

export default define.layout((props) => {
  return (
    <div>
      <nav>Navigation</nav>
      <main>
        <props.Component />
      </main>
      <footer>Footer</footer>
    </div>
  );
});
```

### Using Environment Variables
```typescript
// Server-side (routes, middleware)
const apiKey = Deno.env.get("API_KEY");

// Client-side (islands) - only FRESH_PUBLIC_ vars
const apiUrl = Deno.env.get("FRESH_PUBLIC_API_URL");
```

### App Setup (main.ts)
```typescript
import { App, staticFiles } from "fresh";
import { config } from "@fresh/core/dev";

await config;

const app = new App()
  .use(staticFiles())  // Required for islands
  .fsRoutes();         // Loads all file-based routes

app.listen();
```

### App Wrapper (_app.tsx)
```typescript
// routes/_app.tsx
import { type PageProps } from "fresh";

export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>My Fresh App</title>
      </head>
      <body>
        <Component />
      </body>
    </html>
  );
}
```

