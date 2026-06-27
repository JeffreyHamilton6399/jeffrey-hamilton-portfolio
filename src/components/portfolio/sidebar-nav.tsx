"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowUp } from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";
import { navLinks } from "@/lib/portfolio-data";

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

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    restDelta: 0.001,
  });

  // Floating back-to-top: appears after 400px scroll, hidden on mobile
  const [showTop, setShowTop] = React.useState(false);
  React.useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 400);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* ---------- Desktop: transparent floating dot rail ---------- */}
      <nav
        aria-label="Section navigation"
        className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 md:block"
      >
        <div className="relative flex flex-col items-center gap-4">
          {/* muted track — same color as inactive dots */}
          <div
            aria-hidden
            className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-muted-foreground/25"
          />
          {/* animated progress fill — accent color, fills as user scrolls */}
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
                className="group relative flex h-3 w-3 items-center justify-center"
                aria-label={link.label}
                aria-current={isActive ? "true" : undefined}
              >
                {/* dot — hollow when inactive, filled accent when active */}
                <span
                  className={`block h-2 w-2 rounded-full border transition-colors duration-200 ${
                    isActive
                      ? "border-amber-500 bg-amber-500"
                      : "border-muted-foreground/40 bg-transparent group-hover:border-amber-500/70"
                  }`}
                />
                {/* tooltip label — appears on hover only */}
                <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md border border-border/70 bg-background/95 px-2 py-0.5 text-xs font-medium text-foreground opacity-0 shadow-sm backdrop-blur transition-all duration-200 group-hover:left-6 group-hover:opacity-100">
                  {link.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* ---------- Floating theme toggle (all viewports) ---------- */}
      <div className="fixed right-4 top-4 z-40">
        <ThemeToggle />
      </div>

      {/* ---------- Floating back-to-top (desktop only, after 400px scroll) ---------- */}
      <motion.button
        type="button"
        onClick={() =>
          window.scrollTo({ top: 0, behavior: "smooth" })
        }
        aria-label="Back to top"
        initial={false}
        animate={{ opacity: showTop ? 1 : 0, y: showTop ? 0 : 8 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ pointerEvents: showTop ? "auto" : "none" }}
        className="fixed bottom-8 right-8 z-50 hidden h-10 w-10 items-center justify-center rounded-full bg-amber-500 text-white shadow-lg shadow-amber-500/30 transition-colors hover:bg-amber-600 md:flex"
      >
        <ArrowUp className="h-4 w-4" />
      </motion.button>
    </>
  );
}
