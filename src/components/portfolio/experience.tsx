"use client";

import { motion } from "framer-motion";
import { Check, Calendar, MapPin, ExternalLink } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { experiences, type Experience } from "@/lib/portfolio-data";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";

const accentMap: Record<
  string,
  { dot: string; iconBg: string; check: string; ring: string }
> = {
  amber: {
    dot: "bg-amber-500",
    iconBg:
      "bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300",
    check: "text-amber-500",
    ring: "hover:ring-amber-500/30 hover:shadow-amber-500/10",
  },
  rose: {
    dot: "bg-rose-500",
    iconBg: "bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300",
    check: "text-rose-500",
    ring: "hover:ring-rose-500/30 hover:shadow-rose-500/10",
  },
  emerald: {
    dot: "bg-emerald-500",
    iconBg:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300",
    check: "text-emerald-500",
    ring: "hover:ring-emerald-500/30 hover:shadow-emerald-500/10",
  },
};

function ExperienceCard({ exp, index }: { exp: Experience; index: number }) {
  const Icon = exp.icon;
  const accent = accentMap[exp.accent] ?? accentMap.amber;

  return (
    <Reveal delay={index * 0.08} className="relative pl-10 sm:pl-14">
      {/* timeline dot */}
      <div className="absolute left-0 top-6 flex h-7 w-7 items-center justify-center rounded-full border-2 border-background bg-background shadow-sm">
        <span className={`h-2.5 w-2.5 rounded-full ${accent.dot}`} />
      </div>

      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="h-full"
      >
        <Card
          className={`group h-full overflow-hidden border-border/60 shadow-sm transition-shadow duration-200 hover:shadow-md hover:ring-1 ${accent.ring}`}
        >
          <CardContent className="p-6 sm:p-7">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-4">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-110 ${accent.iconBg}`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold leading-tight">
                    {exp.role}
                  </h3>
                  <p className="mt-0.5 text-sm font-medium text-amber-600 dark:text-amber-500">
                    {exp.company}
                  </p>
                </div>
              </div>
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                {exp.period}
              </span>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {exp.description}
            </p>

            <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
              {exp.highlights.map((h) => (
                <li
                  key={h}
                  className="flex items-start gap-2 text-sm text-foreground/80"
                >
                  <Check className={`mt-0.5 h-4 w-4 shrink-0 ${accent.check}`} />
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" />
                {exp.location}
              </span>
              {exp.website ? (
                <a
                  href={exp.website.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-medium text-amber-600 transition-colors hover:text-amber-700 dark:text-amber-500 dark:hover:text-amber-400"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  {exp.website.label}
                </a>
              ) : null}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Reveal>
  );
}

export function Experience() {
  return (
    <section
      id="experience"
      className="scroll-mt-20 border-y border-border/60 bg-muted/30 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Where I've Shown Up"
          title="Work that taught me something."
          description="Three very different worlds — a farm, a dojo, and a market. Each one hammered in the same lesson: show up, do the work, don't be a jerk about it."
        />

        <div className="relative mt-14">
          <div
            aria-hidden
            className="absolute left-[13px] top-2 bottom-2 w-px bg-gradient-to-b from-amber-300 via-border to-transparent sm:left-[27px]"
          />
          <div className="flex flex-col gap-8">
            {experiences.map((exp, i) => (
              <ExperienceCard key={exp.company} exp={exp} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
