import { initTRPC } from "@trpc/server";
import { getUserFromHeaders } from "@/lib/header";
import { createErrorFormatter } from "@/lib/trpc-error";
import type { User } from "@/payload-types";

// ===== CONTEXT =====

type WorldContext = {
  user: (User & { collection: "users" }) | null;
};

export async function createWorldContext(opts: {
  req: Request;
}): Promise<WorldContext> {
  const user = await getUserFromHeaders(opts.req.headers);

  return {
    user,
  };
}

// ===== ROUTER =====

const t = initTRPC.context<WorldContext>().create(createErrorFormatter());

export const worldRouter = t.router({
  // ===== QUERY PROCEDURES =====

  search: t.procedure.query(({ ctx: _ctx }) => {
    // Implementation
    throw new Error("Not implemented");
  }),

  // ===== MUTATION PROCEDURES =====

  create: t.procedure.mutation(({ input: _input, ctx: _ctx }) => {
    // Implementation
    throw new Error("Not implemented");
  }),

  update: t.procedure.mutation(({ input: _input, ctx: _ctx }) => {
    // Implementation
    throw new Error("Not implemented");
  }),

  delete: t.procedure.mutation(({ input: _input, ctx: _ctx }) => {
    // Implementation
    throw new Error("Not implemented");
  }),
});

export type WorldRouter = typeof worldRouter;
