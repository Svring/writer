import Link from "next/link";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background">
      <div className="container-wrapper flex justify-end gap-2 p-2 3xl:fixed:px-0 px-6">
        <Button asChild className="lg:flex" variant="ghost">
          <Link href="/">
            <span>Home</span>
          </Link>
        </Button>
        <Button asChild className="lg:flex" variant="ghost">
          <Link href="/story">
            <span>Stories</span>
          </Link>
        </Button>
        <Button asChild className="lg:flex" variant="ghost">
          <Link href="/world">
            <span>Worlds</span>
          </Link>
        </Button>
      </div>
    </header>
  );
}
