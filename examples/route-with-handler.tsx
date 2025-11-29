/**
 * Example: Route with data fetching handler
 * 
 * This demonstrates the pattern for creating a route that fetches data
 * in the handler and passes it to the page component.
 */

import { define } from "@/utils.ts";
import type { ApiResponse } from "@/types/index.ts";

// Define the handler return type
interface PageData {
  users: Array<{ id: string; name: string }>;
}

// Handler fetches data server-side
export const handler = define.handlers({
  async GET(ctx) {
    // Fetch data (e.g., from database, API, etc.)
    const users = await fetchUsers();

    // Return data that will be available in props.data
    return { users } satisfies PageData;
  },
});

// Page component receives handler data via props.data
export default define.page<typeof handler>((props) => {
  const { users } = props.data;

  return (
    <div class="p-4">
      <h1 class="text-2xl font-bold mb-4">Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id} class="mb-2">
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
});

// Mock function - replace with actual data fetching
async function fetchUsers(): Promise<Array<{ id: string; name: string }>> {
  return [
    { id: "1", name: "Alice" },
    { id: "2", name: "Bob" },
  ];
}

