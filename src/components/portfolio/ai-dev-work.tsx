"use client";

import { motion } from "framer-motion";

import { aiDevFeatures } from "@/lib/portfolio-data";
import { Reveal, StaggerGroup, StaggerItem } from "./reveal";
import { SectionHeading } from "./section-heading";

export function AiDevWork() {
  return (
    <section
      id="ai-dev"
      className="scroll-mt-20 border-y border-border/60 bg-muted/30 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Left: narrative */}
          <div className="md:col-span-5">
            <SectionHeading
              eyebrow="AI &amp; Dev Work"
              title="Built with curiosity, shipped with confidence."
              align="left"
            />
            <Reveal delay={0.1}>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                I don&apos;t just prompt an AI and hope. I read the output,
                debug it, break it on purpose, and ship the version that
                actually holds up. Here&apos;s how I work.
              </p>
            </Reveal>
          </div>

          {/* Right: feature list */}
          <div className="md:col-span-7">
            <StaggerGroup className="flex flex-col gap-4" stagger={0.08}>
              {aiDevFeatures.map((feature) => (
                <StaggerItem key={feature.title}>
                  <FeatureRow feature={feature} />
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureRow({
  feature,
}: {
  feature: (typeof aiDevFeatures)[number];
}) {
  const Icon = feature.icon;
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="group flex items-start gap-4 rounded-xl border border-border/60 bg-background p-5 shadow-sm transition-shadow hover:shadow-md hover:shadow-amber-500/10 hover:ring-1 hover:ring-amber-500/30"
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-700 transition-transform duration-200 group-hover:scale-110 dark:bg-amber-950/50 dark:text-amber-300">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h3 className="text-base font-semibold">{feature.title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
          {feature.body}
        </p>
      </div>
    </motion.div>
  );
}
