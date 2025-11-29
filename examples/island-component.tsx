/**
 * Example: Interactive Island Component
 * 
 * This demonstrates creating an island (client-side interactive component).
 * Islands are placed in islands/ directory and can use Preact Signals for state.
 */

import { useSignal } from "@preact/signals";

/**
 * Props for the Counter island.
 * Only serializable types are allowed (no functions).
 */
interface CounterProps {
  /** Initial count value */
  initialCount?: number;
  /** Label to display */
  label?: string;
}

/**
 * Interactive counter component using Preact Signals.
 * 
 * This is an island - it will be hydrated on the client and can handle
 * user interactions.
 * 
 * @example
 * ```tsx
 * // In a route component
 * <Counter initialCount={0} label="Clicks" />
 * ```
 */
export default function Counter(props: CounterProps) {
  const count = useSignal(props.initialCount ?? 0);
  const label = props.label ?? "Count";

  return (
    <div class="flex items-center gap-4 p-4">
      <button
        onClick={() => count.value--}
        class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        -
      </button>
      <span class="text-lg font-semibold">
        {label}: {count.value}
      </span>
      <button
        onClick={() => count.value++}
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        +
      </button>
    </div>
  );
}

