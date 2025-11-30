"use client";

import { ChevronDown, ChevronRight } from "lucide-react";
import { useEditorReadOnly } from "platejs/react";
import { use } from "react";
import * as Container from "@/components/container.comp";
import {
  RedoToolbarButton,
  UndoToolbarButton,
} from "@/components/ui/history-toolbar-button";
import { ToolbarButton, ToolbarGroup } from "@/components/ui/toolbar";

export function ToolbarButtons() {
  const readOnly = useEditorReadOnly();

  const {
    actions: { onEditorOpenChange },
  } = use(Container.Context);

  return (
    <div className="flex w-full">
      {!readOnly && (
        <div className="flex w-full justify-between">
          <div className="flex">
            <ToolbarGroup>
              <ToolbarButton onClick={() => onEditorOpenChange?.()}>
                <ChevronDown />
              </ToolbarButton>
            </ToolbarGroup>

            <ToolbarGroup>
              <UndoToolbarButton />
              <RedoToolbarButton />
            </ToolbarGroup>
          </div>

          <div className="flex">
            <ToolbarGroup>
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
