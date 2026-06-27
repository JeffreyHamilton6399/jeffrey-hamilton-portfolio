"use client";

import { motion } from "framer-motion";
import { Youtube, ArrowUpRight } from "lucide-react";

import { youtubeBanner } from "@/lib/portfolio-data";
import { Reveal } from "./reveal";

/**
 * Compact slim banner — a footnote to the Projects section, not a peer.
 * One line of copy + one button. Max height roughly a single card.
 */
export function YouTube() {
  return (
    <section
      id="youtube"
      className="scroll-mt-20 border-y border-border/60 bg-muted/30 py-10 sm:py-12"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-border/60 bg-background px-6 py-5 shadow-sm sm:flex-row sm:justify-between sm:gap-6">
            <div className="flex items-center gap-3.5 text-center sm:text-left">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400">
                <Youtube className="h-5 w-5" />
              </div>
              <p className="max-w-xl text-sm leading-relaxed text-foreground/80">
                {youtubeBanner.copy}
              </p>
            </div>
            <motion.a
              href={youtubeBanner.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="btn-press inline-flex shrink-0 items-center gap-1.5 rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-red-700"
            >
              {youtubeBanner.cta}
              <ArrowUpRight className="h-4 w-4" />
            </motion.a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
