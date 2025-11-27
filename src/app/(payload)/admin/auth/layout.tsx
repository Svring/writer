import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";
import { Providers } from "@/components/Providers";
import "@/styles/globals.css";

export type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => (
  <html lang="en" suppressHydrationWarning>
    <body className="flex h-screen items-center justify-center">
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        disableTransitionOnChange
        enableSystem
      >
        <Providers>{children}</Providers>
      </ThemeProvider>
    </body>
  </html>
);

export default Layout;
