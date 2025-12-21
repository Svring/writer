"use client";

import { VisuallyHidden } from "@ariakit/react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { Plate } from "platejs/react";
import { EditorContainer, Editor as EditorContent } from "@/components/editor";
import { ToolbarButtons } from "@/components/editor/toolbar-buttons";
import { EditorCoin } from "@/components/editor-coin";
import { StoryForm } from "@/components/story-form";
import { Timeline } from "@/components/timeline";
import { Button } from "@/components/ui/button";
import { FixedToolbar } from "@/components/ui/fixed-toolbar";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { useEditorContext } from "@/contexts/editor.context";

export default function HomePage() {
  const { editor, onChange, saving, onCreateStory, setSaving } =
    useEditorContext();

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
        <AnimatePresence mode="wait">
          {saving ? (
            <motion.div
              animate={{ opacity: 1, x: 0 }}
              className="relative flex flex-1 flex-col"
              exit={{ opacity: 0, x: 100 }}
              initial={{ opacity: 0, x: 100 }}
              key="story-form"
              transition={{ duration: 0.1 }}
            >
              <Button
                className="absolute top-4 left-4 z-10"
                onClick={() => setSaving(false)}
                size="sm"
                variant="ghost"
              >
                <ChevronLeft className="size-4" />
                Back
              </Button>
              <div className="flex flex-1 items-center justify-center">
                <div className="max-w-sm flex-1">
                  <StoryForm
                    defaultValues={{ content: editor?.children }}
                    onSubmit={onCreateStory}
                  />
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              animate={{ opacity: 1, x: 0 }}
              className="relative flex flex-1 flex-col"
              exit={{ opacity: 0, x: -100 }}
              initial={{ opacity: 0, x: -100 }}
              key="editor"
              transition={{ duration: 0.1 }}
            >
              <Plate editor={editor} onChange={onChange}>
                <FixedToolbar>
                  <ToolbarButtons />
                </FixedToolbar>
                <EditorContainer
                  style={{
                    fontFamily:
                      '"New York", -apple-system-ui-serif, ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
                  }}
                >
                  <EditorContent />
                </EditorContainer>
              </Plate>
            </motion.div>
          )}
        </AnimatePresence>
      </SheetContent>
    </Sheet>
  );
}
