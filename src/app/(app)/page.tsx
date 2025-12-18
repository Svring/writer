"use client";

import { useDisclosure } from "@reactuses/core";
import useSWR from "swr";
import * as Container from "@/components/container.comp";
import * as Story from "@/components/story.comp";
import * as World from "@/components/world.comp";
import { fetcher } from "@/lib/fetch";

export default function HomePage() {
  const { isOpen: editorOpen, onOpenChange: onEditorOpenChange } =
    useDisclosure();

  const { data } = useSWR({ path: "/api/users" }, fetcher);

  console.log(data);

  return (
    <Container.Provider actions={{ onEditorOpenChange }} state={{ editorOpen }}>
      <Container.Vessel className="bg-background-0 p-6">
        <Container.Content className="gap-6">
          <World.Time />
          <Story.Start />
        </Container.Content>
      </Container.Vessel>

      <Container.Sheet>
        <Story.Editor />
      </Container.Sheet>
    </Container.Provider>
  );
}
