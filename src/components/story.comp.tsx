import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { createContext, use } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

// Side Context
type ContextValue = {
  state: {
    editorOpen: boolean;
  };
  actions: {
    onEditorOpenChange: undefined | (() => void);
  };
};

export const Context = createContext<ContextValue>({
  state: {
    editorOpen: false,
  },
  actions: {
    onEditorOpenChange: undefined,
  },
});

export const Provider = ({
  children,
  state,
  actions,
}: {
  children: React.ReactNode;
  state: {
    editorOpen: boolean;
  };
  actions: {
    onEditorOpenChange: undefined | (() => void);
  };
}) => (
  <Context.Provider
    value={{
      state: { editorOpen: state.editorOpen },
      actions: { onEditorOpenChange: actions.onEditorOpenChange },
    }}
  >
    {children}
  </Context.Provider>
);

export const Start = () => {
  const {
    actions: { onEditorOpenChange },
  } = use(Context);

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
  const {
    state: { editorOpen },
    actions: { onEditorOpenChange },
  } = use(Context);

  return (
    <Sheet onOpenChange={onEditorOpenChange} open={editorOpen}>
      <SheetContent
        className="h-full border-none duration-250! ease-out"
        closeButton={false}
        side="bottom"
      >
        <SheetHeader>
          <VisuallyHidden>
            <SheetTitle>Editor</SheetTitle>
            <SheetDescription>Editor</SheetDescription>
          </VisuallyHidden>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
