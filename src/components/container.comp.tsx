"use client";

import { Slot } from "@radix-ui/react-slot";
import type { ComponentProps } from "react";
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
