import { initTRPC } from "@trpc/server";
import { getPayload } from "payload";
import { createErrorFormatter } from "@/lib/trpc-error";
import config from "@/payload.config";
import type { User } from "@/payload-types";

// ===== CONTEXT =====

type WorldContext = {
  user: (User & { collection: "users" }) | null;
};

export async function createWorldContext(opts: {
  req: Request;
}): Promise<WorldContext> {
  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });
  const { user } = await payload.auth({ headers: opts.req.headers });

  return {
    user,
  };
}

// ===== ROUTER =====

const t = initTRPC.context<WorldContext>().create(createErrorFormatter());

export const worldRouter = t.router({
  // Routes will be implemented here
  // Example structure:
  // search: t.procedure.query(async ({ ctx }) => {
  //   // Implementation
  // }),
  // create: t.procedure.mutation(async ({ input, ctx }) => {
  //   // Implementation
  // }),
});

export type WorldRouter = typeof worldRouter;
