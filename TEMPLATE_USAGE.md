# Using This Repository as a Boilerplate

This repository is designed to be used as a boilerplate/template for new Deno Fresh v2 projects. Here's how to use it effectively.

## ✅ Yes, This Can Be a Boilerplate!

This repository includes everything needed to start a new Fresh v2 project:

### What Makes It a Good Boilerplate

1. **Clean Starting Point**
   - No unnecessary boilerplate code
   - Minimal, production-ready structure
   - Ready to customize

2. **Comprehensive Setup**
   - Type definitions (`types/`)
   - Utility functions (`utils/`)
   - Error handling patterns
   - Validation utilities

3. **AI-Assisted Development**
   - `.cursorrules` for project-wide rules
   - MDC files for topic-specific guidance
   - Code examples showing patterns
   - Well-documented code

4. **Developer Experience**
   - Tailwind CSS v4 configured
   - Path aliases set up (`@/`)
   - TypeScript strict mode
   - Code quality tools configured

5. **Documentation**
   - Comprehensive README
   - Setup guides
   - Code examples
   - Pattern references

## How to Use as a Boilerplate

### Method 1: GitHub Template (Recommended)

1. **Make this repo a template**:
   - Go to repository Settings
   - Check "Template repository" checkbox
   - Save

2. **Create new project**:
   - Click "Use this template" button
   - Create new repository
   - Clone and start coding

### Method 2: Manual Clone

```bash
# Clone the repository
git clone <this-repo-url> my-new-project
cd my-new-project

# Remove git history for fresh start
rm -rf .git
git init
git add .
git commit -m "Initial commit from Fresh Lemonaid"

# Start customizing
```

### Method 3: Copy Files

1. Download or clone this repository
2. Copy files to your new project directory
3. Customize as needed

## Customization Checklist

When starting a new project from this boilerplate:

### Required Customizations

- [ ] Update project name in `README.md`
- [ ] Change title in `routes/_app.tsx`
- [ ] Copy `.env.example` to `.env` and configure
- [ ] Update `State` interface in `utils.ts` (if needed)

### Recommended Customizations

- [ ] Add project-specific types to `types/index.ts`
- [ ] Update `.cursorrules` with project context
- [ ] Replace `static/` assets (favicon, logo)
- [ ] Customize `deno.json` if needed
- [ ] Add license information

### Optional Cleanup

- [ ] Remove `examples/` directory if not needed
- [ ] Remove `exported_docs/` if not needed
- [ ] Remove `AI_PROJECT_SETUP_GUIDE.md` if not needed
- [ ] Remove `AI_EFFICIENCY_IMPROVEMENTS.md` if not needed

## What to Keep

These files are valuable for new projects:

- ✅ `.cursorrules` - AI assistance rules
- ✅ `.cursor/` directory - MDC rule files
- ✅ `types/index.ts` - Type definitions
- ✅ `utils/` directory - Utility functions
- ✅ `examples/` directory - Code patterns
- ✅ `deno.json` - Configuration
- ✅ `.env.example` - Environment template
- ✅ Documentation files

## What to Remove/Customize

These should be customized per project:

- 🔄 `README.md` - Update with project info
- 🔄 `routes/_app.tsx` - Update title
- 🔄 `routes/index.tsx` - Replace with your homepage
- 🔄 `utils.ts` - Customize `State` interface
- 🔄 `static/` assets - Replace with your assets
- 🔄 `.cursorrules` - Add project-specific context

## Project Structure After Setup

```
my-new-project/
├── .cursor/              # AI rules (keep)
├── components/           # Your components
├── examples/             # Code examples (optional)
├── islands/              # Your islands
├── routes/               # Your routes
├── static/               # Your assets
├── types/                # Your types
├── utils/                # Your utilities
├── .cursorrules          # AI rules (customize)
├── .env                  # Your env vars (create from .env.example)
├── deno.json             # Config (customize if needed)
└── main.ts               # Entry point (usually keep as-is)
```

## Benefits of Using This Boilerplate

1. **Saves Time**: No need to set up project structure from scratch
2. **Best Practices**: Includes proven patterns and utilities
3. **AI-Ready**: Optimized for AI-assisted development
4. **Type-Safe**: Comprehensive type definitions
5. **Well-Documented**: Examples and documentation included
6. **Production-Ready**: Error handling, validation, utilities included

## Quick Start Commands

```bash
# 1. Clone/copy the boilerplate
git clone <repo-url> my-project && cd my-project

# 2. Initialize git (if needed)
rm -rf .git && git init

# 3. Setup environment
cp .env.example .env
# Edit .env with your values

# 4. Start development
deno task dev

# 5. Customize
# - Update README.md
# - Update routes/_app.tsx
# - Add your routes, components, islands
```

## Support

- See [BOILERPLATE.md](./BOILERPLATE.md) for detailed information
- See [SETUP.md](./SETUP.md) for quick setup guide
- Check `examples/` directory for code patterns
- Review README.md for project structure

## License

This boilerplate is MIT licensed. You can use it for any project, commercial or personal.

---

**Ready to build something amazing! 🚀**

