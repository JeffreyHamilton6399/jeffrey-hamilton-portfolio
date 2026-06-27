"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X, ArrowUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { navLinks, profile } from "@/lib/portfolio-data";

function useScrollSpy(ids: string[], offset = 140) {
  const [active, setActive] = React.useState<string>(ids[0] ?? "");

  React.useEffect(() => {
    const handler = () => {
      const pos = window.scrollY + offset;
      let current = ids[0] ?? "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= pos) {
          current = id;
        }
      }
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 80
      ) {
        current = ids[ids.length - 1] ?? current;
      }
      setActive(current);
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("scroll", handler);
      window.removeEventListener("resize", handler);
    };
  }, [ids, offset]);

  return active;
}

export function SidebarNav() {
  const active = useScrollSpy(navLinks.map((n) => n.id));
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <>
      {/* ---------- Desktop: floating left dot rail ---------- */}
      <nav
        aria-label="Section navigation"
        className="fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 md:block"
      >
        <div className="relative flex flex-col items-center gap-5">
          {/* muted track */}
          <div
            aria-hidden
            className="absolute left-1/2 top-1 h-full w-px -translate-x-1/2 bg-border"
          />
          {/* animated progress fill */}
          <motion.div
            aria-hidden
            style={{ scaleY: progress }}
            className="absolute left-1/2 top-0 h-full w-px origin-top -translate-x-1/2 bg-gradient-to-b from-amber-500 to-orange-500"
          />

          {navLinks.map((link) => {
            const isActive = active === link.id;
            return (
              <Link
                key={link.id}
                href={link.href}
                className="group relative flex h-4 w-4 items-center justify-center"
                aria-label={link.label}
                aria-current={isActive ? "true" : undefined}
              >
                {/* dot */}
                <motion.span
                  layoutId={`dot-${link.id}`}
                  className={`block h-2.5 w-2.5 rounded-full border transition-colors duration-300 ${
                    isActive
                      ? "border-amber-500 bg-amber-500 shadow-[0_0_0_4px_rgba(245,158,11,0.18)]"
                      : "border-muted-foreground/40 bg-background group-hover:border-amber-500/70"
                  }`}
                />
                {/* hover tooltip label */}
                <span className="pointer-events-none absolute left-6 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md border border-border/70 bg-background/95 px-2.5 py-1 text-xs font-medium text-foreground opacity-0 shadow-sm backdrop-blur transition-all duration-200 group-hover:left-7 group-hover:opacity-100">
                  {link.label}
                </span>
              </Link>
            );
          })}

          {/* divider before back-to-top */}
          <span aria-hidden className="my-1 h-px w-3 bg-border" />

          {/* Back to top — pinned below the dots */}
          <Link
            href="#top"
            className="group relative flex h-4 w-4 items-center justify-center"
            aria-label="Back to top"
          >
            <motion.span
              whileHover={{ y: -2 }}
              className="flex h-4 w-4 items-center justify-center rounded-full border border-muted-foreground/40 text-muted-foreground transition-colors duration-300 group-hover:border-amber-500 group-hover:text-amber-500"
            >
              <ArrowUp className="h-2.5 w-2.5" />
            </motion.span>
            <span className="pointer-events-none absolute left-6 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md border border-border/70 bg-background/95 px-2.5 py-1 text-xs font-medium text-foreground opacity-0 shadow-sm backdrop-blur transition-all duration-200 group-hover:left-7 group-hover:opacity-100">
              Back to top
            </span>
          </Link>
        </div>
      </nav>

      {/* ---------- Floating theme toggle (all viewports) ---------- */}
      <div className="fixed right-4 top-4 z-40">
        <ThemeToggle />
      </div>

      {/* ---------- Mobile: hamburger top-left + slide-in drawer ---------- */}
      <button
        type="button"
        onClick={() => setDrawerOpen(true)}
        aria-label="Open navigation menu"
        className="fixed left-4 top-4 z-40 flex h-10 w-10 items-center justify-center rounded-lg border border-border/70 bg-background/80 text-foreground shadow-sm backdrop-blur md:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      <AnimatePresence>
        {drawerOpen ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setDrawerOpen(false)}
              className="fixed inset-0 z-50 bg-background/60 backdrop-blur-sm md:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed left-0 top-0 z-50 flex h-full w-72 max-w-[82vw] flex-col border-r border-border bg-background p-6 shadow-xl md:hidden"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-foreground text-sm font-bold text-background">
                  JH
                </span>
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Close navigation menu"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {profile.name}
              </p>

              <nav className="mt-3 flex flex-col gap-1">
                {navLinks.map((link) => {
                  const isActive = active === link.id;
                  return (
                    <Link
                      key={link.id}
                      href={link.href}
                      onClick={() => setDrawerOpen(false)}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300"
                          : "text-muted-foreground hover:bg-accent hover:text-foreground"
                      }`}
                    >
                      <span
                        className={`h-2 w-2 rounded-full ${
                          isActive ? "bg-amber-500" : "bg-muted-foreground/30"
                        }`}
                      />
                      {link.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-auto flex items-center justify-between pt-6">
                <span className="text-xs text-muted-foreground">
                  Theme
                </span>
                <ThemeToggle />
              </div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
