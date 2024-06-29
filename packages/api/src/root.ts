import { authRouter } from "./router/auth";
import { postRouter } from "./router/post";
import { roastRouter } from "./router/roast";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  post: postRouter,
  roast: roastRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
