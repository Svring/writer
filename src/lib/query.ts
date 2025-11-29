import { QueryClient } from "@tanstack/react-query";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import type { AnyRouter } from "@trpc/server";

export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        staleTime: 20 * 1000, // Shorter stale time - 20 seconds
        gcTime: 3 * 60 * 1000, // Keep in cache for 3 minutes
      },
      mutations: {
        retry: 1,
      },
    },
  });
}

export function createRouteClient<TRouter extends AnyRouter>(route: string) {
  const link = httpBatchLink({
    url: `/api/trpc/${route}`,
    maxURLLength: 6000,
  });

  return createTRPCClient<TRouter>({
    links: [link],
  });
}
