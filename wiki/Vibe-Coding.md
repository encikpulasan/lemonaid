# Vibe Coding with Fresh Lemonaid

Fresh Lemonaid is optimized for vibe coding—using AI to generate code from natural language descriptions.

## What is Vibe Coding?

Vibe coding is a programming approach where developers use AI tools (like Cursor IDE) to generate code based on natural language descriptions, often without fully understanding every line of code. It emphasizes rapid development and intuition.

## Why Fresh Lemonaid is Perfect for Vibe Coding

### 1. AI-Optimized Structure

- **Comprehensive `.cursorrules`** - Project-wide rules for AI
- **MDC rule files** - Topic-specific guidance
- **Code examples** - Patterns AI can follow
- **Type definitions** - Help AI generate correct code
- **Utility functions** - Reusable code AI can use

### 2. Clear Patterns

The boilerplate provides clear patterns that AI can easily understand and replicate:

```tsx
// AI can easily generate routes following this pattern
export const handler = define.handlers({
  async GET(ctx) {
    const data = await fetchData();
    return { data };
  },
});

export default define.page<typeof handler>((props) => {
  return <div>{props.data.data}</div>;
});
```

### 3. Type Safety

Centralized types help AI generate correctly typed code:

```typescript
// types/index.ts
export interface ApiResponse<T> {
  data: T;
  error?: AppError;
}
```

### 4. Ready-to-Use Utilities

AI can use existing utilities instead of writing from scratch:

```typescript
import { isValidEmail } from "@/utils/validation.ts";
import { createErrorResponse } from "@/utils/errors.ts";
import { log } from "@/utils/logger.ts";
```

## How to Vibe Code with Fresh Lemonaid

### 1. Use Natural Language

Describe what you want in plain English:

```
"Create a route that shows a list of blog posts with pagination"
```

The AI will generate code following Fresh Lemonaid patterns.

### 2. Reference Examples

Point AI to examples in the `examples/` directory:

```
"Create a route similar to route-with-handler.tsx but for products"
```

### 3. Use Types

Ask AI to use existing types:

```
"Create an API endpoint that returns ApiResponse<User[]>"
```

### 4. Leverage Utilities

Encourage AI to use utilities:

```
"Validate the email using the validation utility before saving"
```

## Best Practices for Vibe Coding

### ✅ Do

- **Review generated code** - Always review AI-generated code
- **Test thoroughly** - Test all AI-generated functionality
- **Use types** - Ask AI to use existing types
- **Follow patterns** - Reference examples and patterns
- **Use utilities** - Leverage existing utility functions
- **Understand security** - Review security-sensitive code carefully

### ❌ Don't

- **Blindly accept code** - Always review and understand
- **Skip testing** - Test all generated code
- **Ignore errors** - Fix all TypeScript and linting errors
- **Copy without understanding** - Understand what the code does
- **Skip security review** - Review security-sensitive code

## AI Assistance Features

### `.cursorrules`

Comprehensive rules that guide AI:

- Project structure
- Code patterns
- Naming conventions
- Best practices

### MDC Rule Files

Topic-specific guidance:

- `fresh-v2.mdc` - Fresh architecture patterns
- `code-style.mdc` - Code style guidelines
- `tailwind.mdc` - Tailwind CSS guidelines
- `examples.mdc` - Example patterns reference

### Code Examples

Working examples in `examples/`:

- `route-with-handler.tsx`
- `api-route.tsx`
- `island-component.tsx`
- `server-component.tsx`

### Type Definitions

Centralized types in `types/index.ts`:

- `ApiResponse<T>`
- `PaginatedResponse<T>`
- `AppError`
- `Status`

### Utility Functions

Reusable utilities in `utils/`:

- Error handling
- Validation
- Logging
- Configuration

## Example Vibe Coding Session

### Prompt 1

```
Create a route at /products that shows a list of products
```

**AI generates**:
```tsx
// routes/products.tsx
import { define } from "@/utils.ts";

export const handler = define.handlers({
  async GET(ctx) {
    const products = await fetchProducts();
    return { products };
  },
});

export default define.page<typeof handler>((props) => {
  return (
    <div class="p-4">
      <h1>Products</h1>
      {props.data.products.map(p => <div>{p.name}</div>)}
    </div>
  );
});
```

### Prompt 2

```
Add validation to the POST endpoint to ensure the email is valid
```

**AI generates**:
```tsx
import { isValidEmail } from "@/utils/validation.ts";
import { createError, createErrorResponse } from "@/utils/errors.ts";

if (!isValidEmail(data.email)) {
  return createErrorResponse(createError("INVALID_EMAIL"), 400);
}
```

## Tips for Better AI Code Generation

1. **Be specific** - Provide clear requirements
2. **Reference examples** - Point to similar code
3. **Use types** - Mention existing types
4. **Ask for utilities** - Request use of utility functions
5. **Iterate** - Refine prompts based on results
6. **Review** - Always review generated code

## Security Considerations

When vibe coding, pay special attention to:

- **Input validation** - Always validate user inputs
- **Authentication** - Verify authentication is correct
- **Authorization** - Check authorization logic
- **Error handling** - Ensure errors are handled properly
- **API keys** - Never expose API keys or secrets

## Resources

- [Getting Started](Getting-Started) - Setup guide
- [Examples](Examples) - Code examples
- [Architecture](Architecture) - Project structure
- [API Reference](API-Reference) - API documentation

---

**Happy vibe coding! 🎨✨**

