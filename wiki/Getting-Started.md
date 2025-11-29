# Getting Started

Get up and running with Fresh Lemonaid in minutes.

## Prerequisites

- **Deno 1.40+** - [Install Deno](https://deno.land/)
- **Git** - For cloning the repository
- **Cursor IDE** (recommended) - For AI-assisted development

## Installation

### Option 1: GitHub Template (Recommended)

1. Go to the [Fresh Lemonaid repository](https://github.com/your-username/fresh-lemonaid)
2. Click **"Use this template"**
3. Create a new repository
4. Clone your new repository:
   ```bash
   git clone <your-new-repo-url> my-project
   cd my-project
   ```

### Option 2: Direct Clone

```bash
git clone https://github.com/encikpulasan/lemonaid my-project
cd my-project
rm -rf .git
git init
git add .
git commit -m "Initial commit from Fresh Lemonaid"
```

## Setup

### 1. Install Dependencies

Deno automatically installs dependencies on first run. No `npm install` needed!

```bash
deno task dev
```

This will:
- Download all dependencies
- Start the development server
- Open `http://localhost:8000`

### 2. Configure Environment

```bash
# Copy environment template
cp .env.example .env

# Edit .env with your values
```

**Important Environment Variables**:

```env
ENV=development
PORT=8000
API_KEY=your-secret-api-key-here
CORS_ORIGIN=http://localhost:8000
CORS_ENABLED=true
```

### 3. Customize Project

#### Update Project Name

1. Edit `README.md` - Change title and description
2. Edit `routes/_app.tsx` - Change `<title>` tag
3. Update `deno.json` if needed

#### Configure State (Optional)

Edit `utils.ts` to add properties to the `State` interface:

```typescript
export interface State {
  // Add your custom state properties here
  user?: User;
  session?: Session;
}
```

#### Add Your Types

Edit `types/index.ts` to add domain-specific types:

```typescript
export interface User {
  id: string;
  name: string;
  email: string;
}
```

## Development

### Start Development Server

```bash
deno task dev
```

The server will start at `http://localhost:8000` with hot reloading enabled.

### Build for Production

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

## First Steps

1. **Create your first route**: `routes/about.tsx`
2. **Add a component**: `components/Header.tsx`
3. **Create an island** (if needed): `islands/InteractiveWidget.tsx`
4. **Add API endpoint**: `routes/api/data.ts`

## Project Structure

```
lemonaid/
├── routes/          # File-based routing (pages and API endpoints)
├── islands/         # Interactive components (client-side JS)
├── components/     # Server-side components (no JS sent to client)
├── static/         # Static assets (images, CSS, etc.)
├── utils/          # Utility functions
├── types/          # TypeScript type definitions
├── examples/       # Code examples and patterns
├── main.ts         # Server entry point
└── utils.ts        # Define helper and State interface
```

## Common Tasks

```bash
# Development
deno task dev          # Start dev server
deno task build       # Build for production
deno task start       # Start production server

# Code Quality
deno task check       # Format, lint, and type check
deno lint             # Lint only
deno fmt              # Format only

# Testing
deno test             # Run tests
```

## Next Steps

- Read the [Architecture](Architecture) guide to understand the project structure
- Check out [Examples](Examples) for code patterns
- Learn about [Vibe Coding](Vibe-Coding) for AI-assisted development
- Read the [Deployment](Deployment) guide when ready to deploy

## Troubleshooting

### Port Already in Use

If port 8000 is already in use, set a different port:

```bash
PORT=3000 deno task dev
```

### Permission Errors

Deno requires permissions. Use `-A` flag or grant specific permissions:

```bash
deno run -A dev.ts
```

### Import Errors

Ensure all dependencies are in `deno.json`. Check import paths use `@/` alias.

## Need Help?

- Check the [Examples](Examples) directory
- Read the [Architecture](Architecture) guide
- Review [API Reference](API-Reference)
- Open an issue on GitHub

---

**Happy coding! 🚀**

