# Quick Setup Guide

This is a quick reference for setting up a new project from this boilerplate.

## 1. Clone or Use Template

```bash
# Option 1: Use GitHub template (recommended)
# Click "Use this template" on GitHub, then:
git clone <your-new-repo-url> my-project
cd my-project

# Option 2: Clone this repo directly
git clone <this-repo-url> my-project
cd my-project
rm -rf .git
git init
```

## 2. Install Dependencies

Deno automatically installs dependencies on first run. No `npm install` needed!

```bash
# This will download dependencies automatically
deno task dev
```

## 3. Configure Environment

```bash
# Copy environment template
cp .env.example .env

# Edit .env with your values
# (Use your preferred editor)
```

## 4. Customize Project

### Essential Customizations

1. **Update project name**:
   - Edit `README.md` - Change title and description
   - Edit `routes/_app.tsx` - Change `<title>` tag

2. **Configure state** (if needed):
   - Edit `utils.ts` - Add properties to `State` interface

3. **Add your types**:
   - Edit `types/index.ts` - Add domain-specific types

### Optional Cleanup

- Remove `examples/` if you don't need them
- Remove `exported_docs/` if not needed
- Update `static/` assets (favicon, logo)

## 5. Start Developing

```bash
# Start dev server
deno task dev

# Server runs at http://localhost:8000
```

## 6. First Steps

1. **Create your first route**: `routes/about.tsx`
2. **Add a component**: `components/Header.tsx`
3. **Create an island** (if needed): `islands/InteractiveWidget.tsx`
4. **Add API endpoint**: `routes/api/data.ts`

## What's Next?

- Read [BOILERPLATE.md](./BOILERPLATE.md) for detailed information
- Check `examples/` directory for code patterns
- Review [AI_EFFICIENCY_IMPROVEMENTS.md](./AI_EFFICIENCY_IMPROVEMENTS.md) to understand AI assistance features

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

## Need Help?

- [Fresh Documentation](https://fresh.deno.dev/docs)
- [Fresh v2 Getting Started](https://fresh.deno.dev/docs/getting-started)
- Check `examples/` directory for code patterns
- Review `README.md` for project structure

---

**Happy coding! 🚀**

