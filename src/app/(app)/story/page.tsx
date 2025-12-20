"use client";

import { useHover } from "@reactuses/core";
import { AnimatePresence, motion } from "framer-motion";
import { Pencil, Trash } from "lucide-react";
import { useMemo, useRef } from "react";
import useSWR from "swr";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "@/components/ui/item";
import type { Story } from "@/payload-types";

function StoryListItem({ story }: { story: Story }) {
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
    <Item className="group/story-item" ref={ref} variant="outline">
      <ItemContent>
        <div className="flex items-center justify-between gap-2">
          <ItemTitle className="font-mono">{story.title}</ItemTitle>
          <div className="flex items-center gap-2">
            <motion.span
              className="text-muted-foreground text-sm"
              layout
              transition={{ duration: 0.2, bounce: 0 }}
            >
              {formatDate(story.createdAt)}
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
                      aria-label="Rename story"
                      className="h-5 w-5 cursor-pointer"
                      onClick={handleRenameClick}
                      type="button"
                    >
                      <Pencil className="h-4 w-4 hover:text-muted-foreground" />
                    </button>
                    <button
                      aria-label="Delete story"
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
        {story.tagline ? (
          <ItemDescription>{story.tagline}</ItemDescription>
        ) : null}
      </ItemContent>
    </Item>
  );
}

export default function StoryPage() {
  const storiesKey = useMemo(
    () => ({
      path: "/api/story",
      select: (data: { docs: Story[] }) => data.docs,
    }),
    []
  );

  const { data: stories } = useSWR<Story[]>(storiesKey);

  return (
    <div className="mx-auto flex max-w-3xl flex-1 flex-col gap-6 p-6">
      <div className="flex items-center justify-between gap-2">
        <h1 className="font-bold text-3xl">Stories</h1>
      </div>

      {stories?.length === 0 ? (
        <div className="text-muted-foreground text-sm">No stories found.</div>
      ) : (
        <ItemGroup className="w-full gap-4">
          {stories?.map((story) => (
            <StoryListItem key={story.id} story={story} />
          ))}
        </ItemGroup>
      )}
    </div>
  );
}
