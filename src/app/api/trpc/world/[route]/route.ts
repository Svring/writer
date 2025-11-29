import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { createWorldContext, worldRouter } from "@/routers/world.router";

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc/world",
    req,
    router: worldRouter,
    createContext: createWorldContext,
  });

export { handler as GET, handler as POST };
