"use client";

import { motion } from "framer-motion";
import { Trash } from "lucide-react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "@/components/ui/item";
import { SheetTrigger } from "@/components/ui/sheet";
import { useEditorContext } from "@/contexts/editor.context";
import { fetcher } from "@/lib/fetch";
import type { Story } from "@/payload-types";

function StoryListItem({
  story,
  onDelete,
}: {
  story: Story;
  onDelete: () => Promise<void>;
}) {
  const { setStory } = useEditorContext();
  const { trigger: deleteStory } = useSWRMutation(
    `/api/story/${story.id}`,
    (url) => fetcher({ path: url, method: "DELETE" })
  );

  const handleDeleteClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await deleteStory();
    await onDelete();
  };

  const handleClick = () => {
    setStory(story);
  };

  return (
    <SheetTrigger asChild onClick={handleClick}>
      <Item className="group cursor-pointer" variant="outline">
        <ItemContent>
          <div className="flex items-center justify-between gap-2">
            <ItemTitle className="font-mono">{story.title}</ItemTitle>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground text-sm">
                {new Date(story.createdAt).toLocaleDateString()}
              </span>
              <ItemActions>
                <motion.div
                  animate={{ opacity: 1, x: 0 }}
                  className="hidden items-center gap-2 group-hover:flex"
                  exit={{ opacity: 0, x: 34 }}
                  initial={{ opacity: 0, x: 34 }}
                  transition={{ duration: 0.2, bounce: 0 }}
                >
                  <button
                    aria-label="Delete story"
                    className="h-5 w-5 cursor-pointer"
                    onClick={handleDeleteClick}
                    type="button"
                  >
                    <Trash className="h-4 w-4 hover:text-destructive" />
                  </button>
                </motion.div>
              </ItemActions>
            </div>
          </div>
          {story.tagline ? (
            <ItemDescription>{story.tagline}</ItemDescription>
          ) : null}
        </ItemContent>
      </Item>
    </SheetTrigger>
  );
}

export default function StoryPage() {
  const { data: stories, mutate } = useSWR<Story[]>(
    "/api/story",
    (url: string) =>
      fetcher<Story[]>({
        path: url,
        select: (data: unknown) => (data as { docs: Story[] }).docs,
      })
  );

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
            <StoryListItem
              key={story.id}
              onDelete={async () => {
                await mutate();
              }}
              story={story}
            />
          ))}
        </ItemGroup>
      )}
    </div>
  );
}
