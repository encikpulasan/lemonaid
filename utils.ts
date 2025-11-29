import { createDefine } from "fresh";

/**
 * Global application state interface.
 * 
 * This specifies the type of `ctx.state` which is used to share
 * data among middlewares, layouts, and routes.
 * 
 * @example
 * ```ts
 * // In middleware
 * app.use(async (ctx) => {
 *   ctx.state.user = await getUser(ctx);
 *   return ctx.next();
 * });
 * 
 * // In route
 * export default define.page((props) => {
 *   const user = props.state.user;
 *   return <div>Hello {user.name}</div>;
 * });
 * ```
 */
export interface State {
  // Add your global state properties here
  // Example: user?: User;
  // Example: session?: Session;
}

/**
 * Fresh define helper with typed State.
 * 
 * Use this helper to create pages, handlers, middleware, and layouts
 * with proper TypeScript inference.
 * 
 * @example
 * ```ts
 * // Page component
 * export default define.page(() => {
 *   return <div>Hello</div>;
 * });
 * 
 * // Route with handler
 * export const handler = define.handlers({
 *   GET(ctx) {
 *     return { data: "hello" };
 *   },
 * });
 * 
 * export default define.page<typeof handler>((props) => {
 *   return <div>{props.data.data}</div>;
 * });
 * ```
 */
export const define = createDefine<State>();

