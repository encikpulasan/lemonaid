# Fresh Lemonaid

This is a production-ready boilerplate for Deno Fresh v2 projects, optimized for AI-assisted development in Cursor IDE.

## What's Included

### 🏗️ Project Structure
- Clean, organized directory structure
- File-based routing setup
- Islands and components directories
- Type definitions and utilities

### 🤖 AI-Assisted Development
- Comprehensive `.cursorrules` file
- MDC rule files for topic-specific guidance
- Code examples showing proper patterns
- Type definitions for better code generation
- Utility functions for common operations

### 📚 Documentation
- Enhanced README with code examples
- JSDoc comments throughout
- Pattern examples in `examples/` directory
- Setup guide for new projects

### 🛠️ Developer Experience
- TypeScript with strict mode
- Tailwind CSS v4 configured
- Error handling utilities
- Validation utilities
- Path aliases configured (`@/`)

## Quick Start

### 1. Use as Template

#### Option A: GitHub Template
1. Click "Use this template" on GitHub
2. Create a new repository
3. Clone and start developing

#### Option B: Manual Clone
```bash
# Clone the repository
git clone <your-repo-url> my-new-project
cd my-new-project

# Remove git history (optional, for fresh start)
rm -rf .git
git init
git add .
git commit -m "Initial commit from Fresh Lemonaid"
```

### 2. Customize Project

#### Update Project Name
1. Update `README.md` - Change project name and description
2. Update `routes/_app.tsx` - Change `<title>` tag
3. Update `deno.json` - Update any project-specific config

#### Configure Environment
```bash
# Copy environment template
cp .env.example .env

# Edit .env with your values
```

#### Clean Up (Optional)
- Remove `exported_docs/` if not needed
- Remove `AI_PROJECT_SETUP_GUIDE.md` if not needed
- Customize `static/` assets (favicon, logo, etc.)

### 3. Start Development

```bash
# Install dependencies (Deno does this automatically)
deno task dev

# The server will start at http://localhost:8000
```

## Customization Checklist

- [ ] Update project name in `README.md`
- [ ] Update title in `routes/_app.tsx`
- [ ] Configure `.env` file
- [ ] Update `static/` assets (favicon, logo)
- [ ] Customize `State` interface in `utils.ts`
- [ ] Add project-specific types to `types/index.ts`
- [ ] Update `.cursorrules` with project-specific context
- [ ] Remove unnecessary example files if desired
- [ ] Add license file
- [ ] Update `deno.json` with project-specific config

## Project Structure

```
lemonaid/
├── .cursor/
│   └── rules/          # MDC rule files for AI assistance
├── components/         # Server-side components
├── examples/           # Code pattern examples
├── islands/            # Interactive components (client-side JS)
├── routes/             # File-based routing
│   ├── _app.tsx       # App wrapper
│   ├── api/           # API routes
│   └── index.tsx      # Home page
├── static/             # Static assets
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├── .cursorrules        # Main AI rules
├── .cursorignore       # Files to exclude from AI context
├── .env.example        # Environment variables template
├── deno.json           # Deno configuration
├── main.ts             # Server entry point
└── utils.ts            # Define helper and State interface
```

## Key Features

### Type Safety
- Centralized types in `types/index.ts`
- Typed `State` interface for context state
- Type-safe route handlers with `define` helper

### Error Handling
- Standardized error creation (`utils/errors.ts`)
- HTTP error response helpers
- Consistent error structure

### Validation
- Email validation
- URL validation
- Value validation utilities

### Code Examples
- Route with handler pattern
- API endpoint examples
- Island component examples
- Server component examples

### AI Assistance
- Comprehensive rules in `.cursorrules`
- Topic-specific MDC files
- Example patterns for reference
- Well-documented utilities

## Next Steps

1. **Review Examples**: Check `examples/` directory for patterns
2. **Read Documentation**: Review `README.md` and `AI_EFFICIENCY_IMPROVEMENTS.md`
3. **Customize State**: Add properties to `State` interface in `utils.ts`
4. **Add Types**: Extend `types/index.ts` with your domain types
5. **Create Routes**: Start building your application routes
6. **Add Components**: Create reusable components in `components/`
7. **Add Islands**: Create interactive components in `islands/` when needed

## Resources

- [Fresh Documentation](https://fresh.deno.dev/docs)
- [Fresh v2 Getting Started](https://fresh.deno.dev/docs/getting-started)
- [Preact Documentation](https://preactjs.com/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [JSR (JavaScript Registry)](https://jsr.io/)

## Security Features

### API Key Authentication

API routes under `/api` are protected by API key authentication:

```bash
# Set API key in environment
API_KEY=your-secret-api-key

# Include in requests
curl -H "x-api-key: your-secret-api-key" https://your-app.com/api/data
```

### CORS Configuration

Configure CORS in environment variables:

```env
CORS_ORIGIN=https://yourdomain.com,https://app.yourdomain.com
CORS_ENABLED=true
```

### Environment Configuration

All configuration is managed through environment variables. See `.env.example` for all options.

## Logging

Structured logging is available throughout the application:

```ts
import { log } from "@/utils/logger.ts";

log.info("User logged in", { userId: "123" });
log.error("Failed to process", { error });
log.request("GET", "/api/users", 200, 45);
```

## Deployment

This project is optimized for Deno Deploy. See [DEPLOY.md](./DEPLOY.md) for detailed deployment instructions.

Quick deploy:
1. Push to GitHub
2. Connect to Deno Deploy
3. Set environment variables
4. Deploy!

## License

MIT License - See [LICENSE](./LICENSE) file for details.

## Contributing

This is a boilerplate template. Feel free to:
- Fork and customize for your needs
- Submit improvements via pull requests
- Share your customizations with the community

---

**Happy coding! 🚀**

