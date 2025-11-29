/**
 * Example: Server Component
 * 
 * This demonstrates creating a server-side component (no JS sent to client).
 * Server components are the default - use these for most UI.
 */

/**
 * Props for the Card component.
 */
interface CardProps {
  /** Card title */
  title: string;
  /** Card content */
  children: preact.ComponentChildren;
  /** Optional CSS classes */
  className?: string;
}

/**
 * Reusable card component (server-side, no JS).
 * 
 * This component is rendered on the server and no JavaScript
 * is sent to the client. Use this for static or server-rendered content.
 * 
 * @example
 * ```tsx
 * <Card title="Welcome">
 *   <p>This is server-rendered content.</p>
 * </Card>
 * ```
 */
export function Card(props: CardProps) {
  return (
    <div class={`bg-white rounded-lg shadow-md p-6 ${props.className ?? ""}`}>
      <h2 class="text-xl font-bold mb-4">{props.title}</h2>
      <div>{props.children}</div>
    </div>
  );
}

