"use client";

import { SWRConfig } from "swr";
import { fetcher } from "@/lib/fetch";

export default function SWRProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SWRConfig value={{ fetcher }}>{children}</SWRConfig>;
}
