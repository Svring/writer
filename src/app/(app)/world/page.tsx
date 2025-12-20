"use client";

import { useHover } from "@reactuses/core";
import { AnimatePresence, motion } from "framer-motion";
import { Pencil, Plus, Trash } from "lucide-react";
import { useMemo, useRef } from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import type { WorldInsert } from "@/collections/world";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "@/components/ui/item";
import { WorldForm } from "@/components/world-form";
import { fetcher } from "@/lib/fetch";
import type { World } from "@/payload-types";

function WorldListItem({ world }: { world: World }) {
  const ref = useRef<HTMLDivElement>(null);
  const hovered = useHover(ref);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString();

  const handleRenameClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // TODO: Implement rename functionality
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // TODO: Implement delete functionality
  };

  return (
    <Item className="group/world-item" ref={ref} variant="outline">
      <ItemContent>
        <div className="flex items-center justify-between gap-2">
          <ItemTitle className="font-mono">{world.name}</ItemTitle>
          <div className="flex items-center gap-2">
            <motion.span
              className="text-muted-foreground text-sm"
              layout
              transition={{ duration: 0.2, bounce: 0 }}
            >
              {formatDate(world.createdAt)}
            </motion.span>
            <ItemActions>
              <AnimatePresence mode="popLayout">
                {hovered ? (
                  <motion.div
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2"
                    exit={{ opacity: 0, x: 34 }}
                    initial={{ opacity: 0, x: 34 }}
                    transition={{ duration: 0.2, bounce: 0 }}
                  >
                    <button
                      aria-label="Rename world"
                      className="h-5 w-5 cursor-pointer"
                      onClick={handleRenameClick}
                      type="button"
                    >
                      <Pencil className="h-4 w-4 hover:text-muted-foreground" />
                    </button>
                    <button
                      aria-label="Delete world"
                      className="h-5 w-5 cursor-pointer"
                      onClick={handleDeleteClick}
                      type="button"
                    >
                      <Trash className="h-4 w-4 hover:text-destructive" />
                    </button>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </ItemActions>
          </div>
        </div>
        {world.tagline ? (
          <ItemDescription>{world.tagline}</ItemDescription>
        ) : null}
      </ItemContent>
    </Item>
  );
}

export default function WorldPage() {
  const worldsKey = useMemo(
    () => ({
      path: "/api/world",
      select: (data: { docs: World[] }) => data.docs,
    }),
    []
  );

  const { data: worlds, mutate } = useSWR<World[]>(worldsKey);

  const { trigger: createWorld } = useSWRMutation(
    "/api/world",
    (url, { arg }: { arg: WorldInsert }) => fetcher({ path: url, body: arg })
  );

  return (
    <div className="mx-auto flex max-w-3xl flex-1 flex-col gap-6 p-6">
      <div className="flex items-center justify-between gap-2">
        <h1 className="font-bold text-3xl">Worlds</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="size-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <WorldForm
              onSubmit={async (values) => {
                await createWorld(values);
                mutate();
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      {worlds?.length === 0 ? (
        <div className="text-muted-foreground text-sm">No worlds found.</div>
      ) : (
        <ItemGroup className="w-full gap-4">
          {worlds?.map((world) => (
            <WorldListItem key={world.id} world={world} />
          ))}
        </ItemGroup>
      )}
    </div>
  );
}
