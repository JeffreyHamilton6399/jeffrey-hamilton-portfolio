"use client";

import { motion } from "framer-motion";
import { Youtube, ArrowUpRight } from "lucide-react";

import { youtubeChannels } from "@/lib/portfolio-data";
import { Reveal } from "./reveal";

/**
 * Compact YouTube strip — two side-by-side cards on desktop, stacked on mobile.
 * Still a footnote to the Projects section, not a full section.
 */
export function YouTube() {
  return (
    <section
      id="youtube"
      className="scroll-mt-20 border-y border-border/60 bg-muted/30 py-8 sm:py-10"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {youtubeChannels.map((channel) => (
              <motion.div
                key={channel.label}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="flex items-center gap-4 rounded-2xl border border-border/60 bg-background px-5 py-4 shadow-sm"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400">
                  <Youtube className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {channel.label}
                  </p>
                  <p className="mt-0.5 text-sm leading-snug text-foreground/80">
                    {channel.copy}
                  </p>
                </div>
                <motion.a
                  href={channel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileTap={{ scale: 0.97 }}
                  className="btn-press inline-flex shrink-0 items-center gap-1.5 rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition-colors hover:bg-red-700"
                >
                  Watch
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </motion.a>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
