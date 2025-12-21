"use client";

import { useLocalStorage } from "@reactuses/core";
import { asyncDebounce } from "@tanstack/pacer";
import type { Editor, Value } from "platejs";
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
import type { Story } from "@/payload-types";

type EditorContextValue = {
  editor: ReturnType<typeof usePlateEditor>;
  onChange: (editorWrapper: { editor: Editor<Value> }) => void;
  saving: boolean;
  setSaving: (value: boolean) => void;
  onCreateStory: (storyData: Partial<StoryInsert>) => Promise<void>;
  onUpdateStory: (storyData: Partial<StoryInsert>) => Promise<void>;
  story: Story | null;
  setStory: (story: Story | null) => void;
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
  const [story, setStory] = useState<Story | null>(null);

  const hasLoadedInitialValue = useRef(false);
  const loadedStoryIdRef = useRef<string | null>(null);

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
      fetcher<Story>({
        path: url,
        body: arg,
        select: (data: unknown) => (data as { doc: Story }).doc,
      })
  );

  const { trigger: updateStory } = useSWRMutation(
    story ? `/api/story/${story.id}` : null,
    (url, { arg }: { arg: Partial<StoryInsert> }) =>
      fetcher<Story>({
        path: url,
        body: arg,
        method: "PATCH",
        select: (data: unknown) => (data as { doc: Story }).doc,
      })
  );

  // Load content: prioritize story content, reload when story changes
  useEffect(() => {
    // If story is present, always load from story (even if already loaded)
    if (story?.content) {
      // Only reload if it's a different story
      if (loadedStoryIdRef.current !== story.id) {
        editor.tf.setValue(story.content as Value);
        loadedStoryIdRef.current = story.id;
        hasLoadedInitialValue.current = true;
      }
      return;
    }

    // Only load from local storage if no story and not already loaded
    if (!hasLoadedInitialValue.current && values) {
      const parsed = JSON.parse(values);
      if (parsed.length > 0) {
        editor.tf.setValue(parsed);
        hasLoadedInitialValue.current = true;
      }
    }
  }, [values, editor.tf, story]);

  const debouncedUpdate = useRef(
    asyncDebounce(
      async (content: Value) => {
        await onUpdateStory({ content });
      },
      { wait: 500 }
    )
  ).current;

  const onChange = (editorWrapper: { editor: Editor<Value> }) => {
    const content = editorWrapper.editor.children;
    setValues(JSON.stringify(content));

    if (story) {
      debouncedUpdate(content);
    }
  };

  const onCreateStory = async (storyData: Partial<StoryInsert>) => {
    try {
      const newStory = await createStory(storyData);
      setStory(newStory);
      editor.tf.setValue(newStory.content as Value);
      loadedStoryIdRef.current = newStory.id;
    } finally {
      setSaving(false);
    }
  };

  const onUpdateStory = async (storyData: Partial<StoryInsert>) => {
    await updateStory(storyData);
  };

  return (
    <EditorContext.Provider
      value={{
        editor,
        onChange,
        saving,
        setSaving,
        onCreateStory,
        onUpdateStory,
        story,
        setStory,
      }}
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
