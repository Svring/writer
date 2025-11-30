"use client";

import type * as SheetPrimitiveLib from "@radix-ui/react-dialog";
import { Slot } from "@radix-ui/react-slot";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import type * as React from "react";
import type { ComponentProps } from "react";
import { createContext, use } from "react";
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  Sheet as SheetPrimitive,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

// Vessel container - wraps the entire bucket component
export const Vessel = ({
  className,
  asChild = false,
  ...props
}: ComponentProps<"div"> & {
  asChild?: boolean;
}) => {
  const Comp = asChild ? Slot : "div";
  return (
    <Comp
      className={cn("flex h-full w-full flex-col", className)}
      data-slot="container-vessel"
      {...props}
    />
  );
};

// Header section
export const Header = ({
  className,
  asChild = false,
  ...props
}: ComponentProps<"div"> & {
  asChild?: boolean;
}) => {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      className={cn(
        "flex h-full w-full items-center justify-between",
        className
      )}
      data-slot="container-header"
      {...props}
    />
  );
};

// Content section
export const Content = ({
  className,
  asChild = false,
  ...props
}: ComponentProps<"div"> & { asChild?: boolean }) => {
  const Comp = asChild ? Slot : "div";
  return (
    <Comp
      className={cn(
        "scrollbar-hide flex h-full w-full flex-col items-center overflow-auto",
        className
      )}
      data-slot="container-content"
      {...props}
    />
  );
};

// Footer section
export const Footer = ({
  className,
  asChild = false,
  ...props
}: ComponentProps<"div"> & { asChild?: boolean }) => {
  const Comp = asChild ? Slot : "div";
  return (
    <Comp
      className={cn(
        "flex h-full w-full items-center justify-between",
        className
      )}
      data-slot="container-footer"
      {...props}
    />
  );
};

// Sheet Context
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

// Sheet component
export const Sheet = ({
  children,
  className,
  ...props
}: {
  children?: React.ReactNode;
  className?: string;
} & Omit<
  React.ComponentProps<typeof SheetPrimitiveLib.Content>,
  "side" | "closeButton" | "className"
>) => {
  const {
    state: { editorOpen },
    actions: { onEditorOpenChange },
  } = use(Context);

  return (
    <SheetPrimitive onOpenChange={onEditorOpenChange} open={editorOpen}>
      <SheetContent
        className={cn(
          "h-full gap-0 border-none duration-250! ease-out",
          className
        )}
        closeButton={false}
        side="bottom"
        {...props}
      >
        <VisuallyHidden>
          <SheetHeader>
            <SheetTitle>Editor</SheetTitle>
            <SheetDescription>Editor</SheetDescription>
          </SheetHeader>
        </VisuallyHidden>
        {children}
      </SheetContent>
    </SheetPrimitive>
  );
};
