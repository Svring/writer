"use client";

import { VisuallyHidden } from "@ariakit/react";
import { useLocalStorage } from "@reactuses/core";
import { Plate, usePlateEditor } from "platejs/react";
import { useEffect, useRef } from "react";
import { EditorContainer, Editor as EditorContent } from "@/components/editor";
import { AutoformatKit } from "@/components/editor/plugins/autoformat-kit";
import { BaseBasicBlocksKit } from "@/components/editor/plugins/basic-blocks-base-kit";
import { DndKit } from "@/components/editor/plugins/dnd-kit";
import { FloatingToolbarKit } from "@/components/editor/plugins/floating-toolbar-kit";
import { IndentKit } from "@/components/editor/plugins/indent-kit";
import { ListKit } from "@/components/editor/plugins/list-kit";
import { MarkdownKit } from "@/components/editor/plugins/markdown-kit";
import { SlashKit } from "@/components/editor/plugins/slash-kit";
import { ToggleKit } from "@/components/editor/plugins/toggle-kit";
import { ToolbarButtons } from "@/components/editor/toolbar-buttons";
import { EditorCoin } from "@/components/editor-coin";
import { Timeline } from "@/components/timeline";
import { FixedToolbar } from "@/components/ui/fixed-toolbar";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";

export default function HomePage() {
  const [values, setValues] = useLocalStorage("editor-values", "");

  // Track if we've loaded initial value to prevent race condition
  const hasLoadedInitialValue = useRef(false);

  const editor = usePlateEditor({
    plugins: [
      ...BaseBasicBlocksKit,
      ...FloatingToolbarKit,
      ...DndKit,
      ...MarkdownKit,
      ...ToggleKit,
      ...AutoformatKit,
      ...ListKit,
      ...IndentKit,
      ...SlashKit,
    ],
  });

  // Load from local storage on mount (handles race condition)
  useEffect(() => {
    if (!hasLoadedInitialValue.current && values) {
      const parsed = JSON.parse(values);
      if (parsed.length > 0) {
        editor.tf.setValue(parsed);
        hasLoadedInitialValue.current = true;
      }
    }
  }, [values, editor.tf]);

  return (
    <Sheet data-slot="editor-sheet">
      <EditorCoin />
      <div className="mx-auto flex max-w-3xl flex-1 flex-col gap-2 p-6">
        <Timeline />
      </div>

      <SheetContent
        aria-describedby={undefined}
        className="h-full gap-0 border-none duration-250! ease-out"
        closeButton={false}
        data-slot="editor-sheet-content"
        side="bottom"
      >
        <VisuallyHidden>
          <SheetTitle>Editor</SheetTitle>
        </VisuallyHidden>
        <Plate
          editor={editor}
          onChange={(editorWrapper) =>
            setValues(JSON.stringify(editorWrapper.editor.children))
          }
        >
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
