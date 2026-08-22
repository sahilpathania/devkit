import Link from "next/link";
import { Code2 } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { Separator } from "@/components/ui/separator";
import { SITE_CONFIG } from "@/lib/constants";
import { getActiveCategories } from "@/services/tools";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const categories = getActiveCategories().slice(0, 8);

  return (
    <footer className="border-t border-border/50 bg-muted/5">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-sm font-semibold tracking-[-0.02em] text-foreground">
              Categories
            </h3>
            <ul className="mt-4 space-y-2.5">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/category/${category.slug}`}
                    className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-[-0.02em] text-foreground">
              Resources
            </h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link
                  href="/#popular-tools"
                  className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
                >
                  Popular tools
                </Link>
              </li>
              <li>
                <Link
                  href="/search"
                  className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
                >
                  Search
                </Link>
              </li>
              <li>
                <Link
                  href="/#new-tools"
                  className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
                >
                  New tools
                </Link>
              </li>
              <li>
                <Link
                  href="/#faq"
                  className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-[-0.02em] text-foreground">
              Legal
            </h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
                >
                  Terms
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-[-0.02em] text-foreground">
              Company
            </h3>
            <div className="mt-4">
              <Logo />
              <p className="mt-3 max-w-[220px] text-sm leading-relaxed text-muted-foreground">
                {SITE_CONFIG.tagline}
              </p>
            </div>
            <ul className="mt-5 space-y-2.5">
              <li>
                <a
                  href={SITE_CONFIG.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
                >
                  <Code2 className="size-3.5" aria-hidden />
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.email}?subject=ToolBay%20feedback`}
                  className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
                >
                  Feedback
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-10" />

        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {currentYear} {SITE_CONFIG.name}
          </p>
          <p className="text-sm text-muted-foreground">
            Fast · Private · Free
          </p>
        </div>
      </div>
    </footer>
  );
}
