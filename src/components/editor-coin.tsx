"use client";

import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SheetTrigger } from "@/components/ui/sheet";

export function EditorCoin() {
  return (
    <SheetTrigger asChild>
      <Button
        className="fixed bottom-6 left-6 z-50 size-12 rounded-full shadow-lg"
        size="icon"
        variant="default"
      >
        <Pencil className="size-5" />
      </Button>
    </SheetTrigger>
  );
}
