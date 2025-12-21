"use client";

import { ArrowUpToLineIcon, ChevronDown, ChevronRight } from "lucide-react";
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
  const { setSaving } = useEditorContext();

  return (
    <div className="flex w-full">
      {!readOnly && (
        <div className="flex w-full justify-between">
          <div className="flex">
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

          <div className="flex">
            <ToolbarGroup>
              <ExportToolbarButton>
                <ArrowUpToLineIcon />
              </ExportToolbarButton>
              <ToolbarButton onClick={() => setSaving(true)}>
                <ChevronRight />
              </ToolbarButton>
            </ToolbarGroup>
          </div>
        </div>
      )}
    </div>
  );
}
