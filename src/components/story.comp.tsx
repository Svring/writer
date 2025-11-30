import { Plate, usePlateEditor } from "platejs/react";
import { use } from "react";
import * as Container from "@/components/container.comp";
import { FixedToolbar } from "@/components/ui/fixed-toolbar";
import { MarkToolbarButton } from "@/components/ui/mark-toolbar-button";
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
  const editor = usePlateEditor();

  return (
    <Plate editor={editor}>
      <FixedToolbar>
        <MarkToolbarButton nodeType="bold" tooltip="Bold">
          B
        </MarkToolbarButton>
        {/* ... other toolbar buttons ... */}
      </FixedToolbar>
      <EditorContainer>
        <EditorContent />
      </EditorContainer>
    </Plate>
  );
};
