"use client";

import { useLocalStorage } from "@reactuses/core";
import { usePlateEditor } from "platejs/react";
import {
  createContext,
  type ReactNode,
  use,
  useEffect,
  useRef,
  useState,
} from "react";
import useSWRMutation from "swr/mutation";
import type { StoryInsert } from "@/collections/story";
import { AutoformatKit } from "@/components/editor/plugins/autoformat-kit";
import { BaseBasicBlocksKit } from "@/components/editor/plugins/basic-blocks-base-kit";
import { DndKit } from "@/components/editor/plugins/dnd-kit";
import { FloatingToolbarKit } from "@/components/editor/plugins/floating-toolbar-kit";
import { IndentKit } from "@/components/editor/plugins/indent-kit";
import { ListKit } from "@/components/editor/plugins/list-kit";
import { MarkdownKit } from "@/components/editor/plugins/markdown-kit";
import { SlashKit } from "@/components/editor/plugins/slash-kit";
import { ToggleKit } from "@/components/editor/plugins/toggle-kit";
import { fetcher } from "@/lib/fetch";

type EditorContextValue = {
  editor: ReturnType<typeof usePlateEditor>;
  onChange: (editorWrapper: { editor: { children: unknown } }) => void;
  saving: boolean;
  setSaving: (value: boolean) => void;
  onSaved: (storyData: Partial<StoryInsert>) => Promise<void>;
};

export const EditorContext = createContext<EditorContextValue | undefined>(
  undefined
);

type EditorProviderProps = {
  children: ReactNode;
};

export function EditorProvider({ children }: EditorProviderProps) {
  const [values, setValues] = useLocalStorage("editor-values", "");
  const [saving, setSaving] = useState(false);

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

  const { trigger: createStory } = useSWRMutation(
    "/api/story",
    (url, { arg }: { arg: Partial<StoryInsert> }) =>
      fetcher({ path: url, body: arg })
  );

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

  const onChange = (editorWrapper: { editor: { children: unknown } }) => {
    setValues(JSON.stringify(editorWrapper.editor.children));
  };

  const onSaved = async (storyData: Partial<StoryInsert>) => {
    try {
      await createStory(storyData);
    } finally {
      setSaving(false);
    }
  };

  return (
    <EditorContext.Provider
      value={{ editor, onChange, saving, setSaving, onSaved }}
    >
      {children}
    </EditorContext.Provider>
  );
}

export function useEditorContext() {
  const context = use(EditorContext);
  if (context === undefined) {
    throw new Error("useEditorContext must be used within an EditorProvider");
  }
  return context;
}
