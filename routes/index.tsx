import { define } from "../utils.ts";

export default define.page(() => {
  return (
    <div class="px-4 py-8 mx-auto min-h-screen">
      <div class="max-w-screen-md mx-auto">
        <h1 class="text-4xl font-bold">Welcome to Fresh Lemonaid</h1>
        <p class="mt-4 text-lg text-gray-600">A refreshing boilerplate for Deno Fresh v2 projects</p>
      </div>
    </div>
  );
});
