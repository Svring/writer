"use client";

import { AuthUIProvider } from "@daveyplate/better-auth-ui";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { toast } from "sonner";
import { authClient } from "@/auth/auth-client";
import { Toaster } from "@/components/ui/sonner";

export function Providers({ children }: { children: ReactNode }) {
  const router = useRouter();

  return (
    <AuthUIProvider
      authClient={authClient}
      basePath="/admin/auth"
      Link={Link}
      navigate={router.push}
      onSessionChange={() => {
        // Clear router cache (protected routes)
        router.refresh();
      }}
      redirectTo="/admin"
      replace={router.replace}
      toast={({ message, variant }) => {
        switch (variant) {
          case "error":
            toast.error(message);
            break;
          case "info":
            toast.info(message);
            break;
          case "success":
            toast.success(message);
            break;
          case "warning":
            toast.warning(message);
            break;
          default:
            toast(message);
        }
      }}
    >
      {children}
      <Toaster />
    </AuthUIProvider>
  );
}
