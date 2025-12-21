import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { headers as getHeaders } from "next/headers.js";
import { redirect } from "next/navigation";
import { ThemeProvider } from "next-themes";
import type React from "react";
import { SiteHeader } from "@/components/site-header";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/contexts/auth.context";
import { EditorProvider } from "@/contexts/editor.context";
import SWRProvider from "@/contexts/swr.context";
import { getUserFromHeaders } from "@/lib/header";

import "@/styles/globals.css";

export const metadata = {
  description: "A blank template using Payload in a Next.js app.",
  title: "Payload Blank Template",
};

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  const headers = await getHeaders();
  const user = await getUserFromHeaders(headers);

  // Get current pathname to avoid redirect loops
  const xPathname = headers.get("x-pathname");
  const referer = headers.get("referer");
  const pathname = xPathname ?? referer ?? "";
  const isAuthPage = pathname.includes("/admin/auth/");

  // Redirect to sign-in if user is not found and not already on auth page
  const shouldRedirect = user === null && !isAuthPage;

  if (shouldRedirect) {
    redirect("/admin/auth/sign-in");
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} h-screen w-screen antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
          enableSystem
        >
          <AuthProvider user={user}>
            <SWRProvider>
              <EditorProvider>
                <div className="flex size-full flex-col">
                  <SiteHeader />
                  <main className="flex size-full">{children}</main>
                </div>
              </EditorProvider>
            </SWRProvider>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
