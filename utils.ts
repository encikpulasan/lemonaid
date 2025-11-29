import { createDefine } from "fresh";

// This specifies the type of "ctx.state" which is used to share
// data among middlewares, layouts and routes.
export interface State {
  // Add your global state properties here
}

export const define = createDefine<State>();
