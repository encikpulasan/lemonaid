# Contributing

Thank you for considering contributing to Fresh Lemonaid! 🍋

## How to Contribute

### Reporting Issues

Found a bug or have a suggestion? Open an issue on GitHub:

1. Check if the issue already exists
2. Create a new issue with:
   - Clear description
   - Steps to reproduce (if bug)
   - Expected vs actual behavior
   - Environment details

### Suggesting Features

Have an idea for improvement?

1. Open an issue with the `enhancement` label
2. Describe the feature and its benefits
3. Discuss implementation approach

### Submitting Pull Requests

1. **Fork the repository**
2. **Create a branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**:
   - Follow code style guidelines
   - Add tests if applicable
   - Update documentation

4. **Commit your changes**:
   ```bash
   git commit -m "Add feature: description"
   ```

5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Open a Pull Request**:
   - Describe your changes
   - Reference related issues
   - Request review

## Code Style

### TypeScript

- Use TypeScript with strict mode
- Always include proper types
- Use type inference when obvious
- Export types from centralized files

### Components

- Prefer functional components
- Use async/await over promises
- Maximum function length: 50 lines
- Maximum file length: 300 lines
- One component per file

### Naming Conventions

- Routes: kebab-case (e.g., `user-profile.tsx`)
- Islands: PascalCase (e.g., `Counter.tsx`)
- Components: PascalCase (e.g., `Button.tsx`)
- Utilities: camelCase (e.g., `formatDate.ts`)
- Types: PascalCase (e.g., `UserData`)
- Constants: UPPER_SNAKE_CASE

### Imports

- Use `@/` path alias for project root
- Group imports: external, then internal
- Use JSR imports when available

## Documentation

- Add JSDoc comments for complex functions
- Document public APIs and interfaces
- Include parameter and return type documentation
- Update README and wiki pages when needed

## Testing

- Write tests for new features
- Ensure all tests pass
- Maintain or improve test coverage

## What to Contribute

### High Priority

- Bug fixes
- Security improvements
- Performance optimizations
- Documentation improvements
- Example additions

### Medium Priority

- New utility functions
- Additional examples
- Type definitions
- Code quality improvements

### Low Priority

- Styling improvements
- Minor refactoring
- Additional documentation

## Code Review Process

1. All PRs require review
2. Address review comments
3. Ensure CI checks pass
4. Maintain code quality standards

## Questions?

- Open an issue for questions
- Check existing documentation
- Review code examples

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for making Fresh Lemonaid better! 🎉**

