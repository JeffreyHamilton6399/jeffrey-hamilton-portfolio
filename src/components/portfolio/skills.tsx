"use client";

import { motion } from "framer-motion";

import { skillBlocks } from "@/lib/portfolio-data";
import { SectionHeading } from "./section-heading";
import { StaggerGroup, StaggerItem } from "./reveal";

export function Skills() {
  return (
    <section
      id="skills"
      className="scroll-mt-20 border-y border-border/60 bg-muted/30 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="What I Actually Work With"
          title="No skill bars. No percentage meters."
          description="Those always look fake. Here's the honest version — what I actually do, in plain language."
        />

        <StaggerGroup
          className="mt-12 grid gap-5 md:grid-cols-2"
          stagger={0.08}
        >
          {skillBlocks.map((block) => {
            const Icon = block.icon;
            return (
              <StaggerItem key={block.title}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="group h-full rounded-xl border border-border/60 bg-background p-6 shadow-sm transition-shadow duration-200 hover:shadow-md hover:shadow-amber-500/10 hover:ring-1 hover:ring-amber-500/30"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-amber-100 text-amber-700 transition-transform duration-200 group-hover:scale-110 dark:bg-amber-950/50 dark:text-amber-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold">
                    {block.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {block.body}
                  </p>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
