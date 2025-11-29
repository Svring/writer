import config from "@payload-config";
import { initTRPC } from "@trpc/server";
import { getPayload } from "payload";
import { z } from "zod";
import { WorldInsertSchema, WorldUpdateSchema } from "@/collections/world";
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

  search: t.procedure.query(async ({ ctx }) => {
    // Implementation
    const payloadConfig = await config;
    const payload = await getPayload({ config: payloadConfig });
    const worlds = await payload.find({
      collection: "world",
      overrideAccess: false,
      user: ctx.user,
      limit: 10,
    });
    return worlds.docs;
  }),

  get: t.procedure.input(z.string()).query(async ({ ctx, input }) => {
    // Implementation
    const payloadConfig = await config;
    const payload = await getPayload({ config: payloadConfig });
    const world = await payload.findByID({
      collection: "world",
      overrideAccess: false,
      id: input,
      user: ctx.user,
    });
    return world;
  }),

  // ===== MUTATION PROCEDURES =====

  create: t.procedure
    .input(WorldInsertSchema)
    .mutation(async ({ ctx, input }) => {
      // Implementation
      const payloadConfig = await config;
      const payload = await getPayload({ config: payloadConfig });
      const world = await payload.create({
        collection: "world",
        overrideAccess: false,
        data: {
          ...input,
          author: ctx.user?.id,
        },
        draft: true,
        user: ctx.user,
      });
      return world;
    }),

  update: t.procedure
    .input(WorldUpdateSchema.extend({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // Implementation
      const payloadConfig = await config;
      const payload = await getPayload({ config: payloadConfig });
      const world = await payload.update({
        collection: "world",
        overrideAccess: false,
        id: input.id,
        data: input,
        user: ctx.user,
      });
      return world;
    }),

  delete: t.procedure.input(z.string()).mutation(async ({ ctx, input }) => {
    // Implementation
    const payloadConfig = await config;
    const payload = await getPayload({ config: payloadConfig });
    await payload.delete({
      collection: "world",
      id: input,
      user: ctx.user,
    });
  }),
});

export type WorldRouter = typeof worldRouter;
