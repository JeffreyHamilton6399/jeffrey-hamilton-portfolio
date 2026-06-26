"use client";

import Link from "next/link";
import { Heart } from "lucide-react";

import { profile, navLinks } from "@/lib/portfolio-data";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border/60 bg-background">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col items-center gap-6 md:flex-row md:items-start md:justify-between">
          <div className="text-center md:text-left">
            <Link href="#top" className="inline-flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-sm font-bold text-white shadow-sm">
                {profile.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
              <span className="text-sm font-semibold tracking-tight">
                {profile.name}
              </span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              {profile.title} — building a future on hard work, discipline, and
              a genuine love for people.
            </p>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-border/60 pt-6 text-center text-xs text-muted-foreground sm:flex-row sm:text-left">
          <p>
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
          <p className="inline-flex items-center gap-1.5">
            Built with
            <Heart className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
            using Next.js &amp; Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
