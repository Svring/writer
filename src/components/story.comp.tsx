import { Plate, usePlateEditor } from "platejs/react";
import { use } from "react";
import * as Container from "@/components/container.comp";
import { DndKit } from "@/components/editor/plugins/dnd-kit";
import { FloatingToolbarKit } from "@/components/editor/plugins/floating-toolbar-kit";
import { ToolbarButtons } from "@/components/editor/toolbar-buttons";
import { FixedToolbar } from "@/components/ui/fixed-toolbar";
import { EditorContainer, Editor as EditorContent } from "./editor";

export const Start = () => {
  const {
    actions: { onEditorOpenChange },
  } = use(Container.Context);

  return (
    <div className="flex w-lg gap-2 rounded-lg border p-1 *:flex-1 *:cursor-pointer *:rounded-lg *:p-4 *:text-center">
      <button className="bg-padding-0" type="button">
        continue recent
      </button>
      <button onClick={() => onEditorOpenChange?.()} type="button">
        new story
      </button>
    </div>
  );
};

export const Editor = () => {
  const editor = usePlateEditor({
    plugins: [...FloatingToolbarKit, ...DndKit],
  });

  return (
    <Plate editor={editor}>
      <FixedToolbar>
        <ToolbarButtons />
      </FixedToolbar>
      <EditorContainer>
        <EditorContent />
      </EditorContainer>
    </Plate>
  );
};
