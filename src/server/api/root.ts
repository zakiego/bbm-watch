import { createTRPCRouter } from "./trpc";
import { fuelsRouter } from "./routers/fuels";
import { cityRouter } from "./routers/city";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  fuels: fuelsRouter,
  city: cityRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

// create a caller for server-side use
export const appRouterCaller = appRouter.createCaller({});
