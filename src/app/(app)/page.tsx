"use client";

import { Plate, usePlateEditor } from "platejs/react";
import { EditorContainer, Editor as EditorContent } from "@/components/editor";
import { DndKit } from "@/components/editor/plugins/dnd-kit";
import { FloatingToolbarKit } from "@/components/editor/plugins/floating-toolbar-kit";
import { ToolbarButtons } from "@/components/editor/toolbar-buttons";
import { Timeline } from "@/components/timeline";
import { Button } from "@/components/ui/button";
import { FixedToolbar } from "@/components/ui/fixed-toolbar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function HomePage() {
  const editor = usePlateEditor({
    plugins: [...FloatingToolbarKit, ...DndKit],
  });

  return (
    <Sheet data-slot="editor-sheet">
      <div className="mx-auto flex max-w-3xl flex-1 flex-col gap-2 p-6">
        <Timeline />
        <SheetTrigger asChild>
          <Button>Open</Button>
        </SheetTrigger>
      </div>

      <SheetContent
        className="h-full gap-0 border-none duration-250! ease-out"
        closeButton={false}
        data-slot="editor-sheet-content"
        side="bottom"
      >
        <Plate editor={editor}>
          <FixedToolbar>
            <ToolbarButtons />
          </FixedToolbar>
          <EditorContainer>
            <EditorContent />
          </EditorContainer>
        </Plate>
      </SheetContent>
    </Sheet>
  );
}
