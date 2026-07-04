"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { toolsBanner } from "@/lib/portfolio-data";

/**
 * Full-width tools banner — rendered inside the Projects section,
 * above the project card grid. No section wrapper.
 */
export function ToolsBanner() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-amber-500/20 bg-zinc-950 px-4 py-8 text-center shadow-2xl sm:rounded-3xl sm:px-12 sm:py-16">
      {/* accent glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 -top-24 h-72 w-72 rounded-full bg-amber-500/30 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-orange-500/25 blur-3xl"
      />
      {/* subtle grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div className="relative">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-300">
          <Lock className="h-3.5 w-3.5" />
          Privacy by design
        </span>

        <h3 className="mx-auto mt-4 max-w-3xl text-2xl font-bold tracking-tight text-white sm:mt-6 sm:text-4xl">
          {toolsBanner.headline}
        </h3>
        <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-zinc-300 sm:mt-3 sm:text-base">
          {toolsBanner.subheadline}
        </p>

        {/* inline tool pills */}
        <div className="mx-auto mt-5 flex max-w-3xl flex-wrap justify-center gap-1.5 sm:mt-7 sm:gap-2">
          {toolsBanner.pills.map((pill, i) => (
            <motion.span
              key={pill}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-xs font-medium text-zinc-200 transition-colors hover:border-amber-400/50 hover:text-amber-300 sm:px-3.5 sm:py-1.5 sm:text-sm"
            >
              {pill}
            </motion.span>
          ))}
        </div>

        <div className="mt-6 px-4 sm:mt-9 sm:px-0">
          <Button
            asChild
            size="lg"
            className="btn-press w-full bg-amber-500 text-zinc-950 shadow-lg shadow-amber-500/25 hover:bg-amber-400 sm:w-auto"
          >
            <a
              href={toolsBanner.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {toolsBanner.cta}
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
