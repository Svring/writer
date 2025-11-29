"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { createTRPCContext } from "@trpc/tanstack-react-query";
import { useState } from "react";
import { createQueryClient, createRouteClient } from "@/lib/query";
import type { WorldRouter } from "@/routers/world.router";

export const worldClient = createTRPCContext<
  WorldRouter,
  { keyPrefix: true }
>();

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => createQueryClient());
  const [worldTrpcClient] = useState(() =>
    createRouteClient<WorldRouter>("world")
  );

  return (
    <QueryClientProvider client={queryClient}>
      <worldClient.TRPCProvider
        keyPrefix="world"
        queryClient={queryClient}
        trpcClient={worldTrpcClient}
      >
        {children}
      </worldClient.TRPCProvider>
    </QueryClientProvider>
  );
}

export function useTRPCClients() {
  return {
    world: worldClient,
  };
}
