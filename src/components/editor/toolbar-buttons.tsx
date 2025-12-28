"use client";

import {
  ArrowUpToLineIcon,
  ChevronDown,
  ChevronRight,
  Save,
} from "lucide-react";
import { useEditorReadOnly } from "platejs/react";
import { ExportToolbarButton } from "@/components/ui/export-toolbar-button";
import {
  RedoToolbarButton,
  UndoToolbarButton,
} from "@/components/ui/history-toolbar-button";
import { SheetClose } from "@/components/ui/sheet";
import { ToolbarButton, ToolbarGroup } from "@/components/ui/toolbar";
import { useEditorContext } from "@/contexts/editor.context";

export function ToolbarButtons() {
  const readOnly = useEditorReadOnly();
  const { setSaving, story, editor, onUpdateStory } = useEditorContext();

  return (
    <div className="flex w-full">
      {!readOnly && (
        <div className="flex w-full">
          <div className="flex flex-1">
            <ToolbarGroup>
              <SheetClose asChild data-slot="editor-sheet-close">
                <ToolbarButton>
                  <ChevronDown />
                </ToolbarButton>
              </SheetClose>
            </ToolbarGroup>

            <ToolbarGroup>
              <UndoToolbarButton />
              <RedoToolbarButton />
            </ToolbarGroup>
          </div>

          <div className="flex flex-1 items-center justify-center">
            {story?.title ? (
              <span className="truncate font-medium">{story.title}</span>
            ) : null}
          </div>

          <div className="flex flex-1 justify-end">
            <ToolbarGroup>
              <ExportToolbarButton>
                <ArrowUpToLineIcon />
              </ExportToolbarButton>
              {story ? (
                <ToolbarButton
                  onClick={() =>
                    onUpdateStory({
                      content: editor?.children,
                    })
                  }
                >
                  <Save />
                </ToolbarButton>
              ) : (
                <ToolbarButton onClick={() => setSaving(true)}>
                  <ChevronRight />
                </ToolbarButton>
              )}
            </ToolbarGroup>
          </div>
        </div>
      )}
    </div>
  );
}
