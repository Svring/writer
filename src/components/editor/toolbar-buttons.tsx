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

export function ToolbarButtons() {
  const readOnly = useEditorReadOnly();

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
              <ToolbarButton>
                <ChevronRight />
              </ToolbarButton>
            </ToolbarGroup>
          </div>
        </div>
      )}
    </div>
  );
}
