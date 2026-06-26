"use client";

import { motion } from "framer-motion";
import {
  Egg,
  Dumbbell,
  Store,
  Check,
  MapPin,
  Calendar,
  type LucideIcon,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { experiences, type Experience } from "@/lib/portfolio-data";
import { SectionHeading } from "./section-heading";

const iconMap: Record<string, LucideIcon> = {
  egg: Egg,
  karate: Dumbbell,
  store: Store,
};

const accentMap: Record<
  string,
  { ring: string; chip: string; dot: string; icon: string }
> = {
  amber: {
    ring: "border-amber-200/70 dark:border-amber-900/50",
    chip: "bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-200",
    dot: "bg-amber-500",
    icon: "bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300",
  },
  rose: {
    ring: "border-rose-200/70 dark:border-rose-900/50",
    chip: "bg-rose-100 text-rose-800 dark:bg-rose-950/50 dark:text-rose-200",
    dot: "bg-rose-500",
    icon: "bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300",
  },
  emerald: {
    ring: "border-emerald-200/70 dark:border-emerald-900/50",
    chip: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-200",
    dot: "bg-emerald-500",
    icon: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300",
  },
};

function ExperienceCard({ exp, index }: { exp: Experience; index: number }) {
  const Icon = iconMap[exp.icon] ?? Egg;
  const accent = accentMap[exp.accent] ?? accentMap.amber;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative pl-10 sm:pl-14"
    >
      {/* timeline dot */}
      <div className="absolute left-0 top-6 flex h-7 w-7 items-center justify-center rounded-full border-2 border-background bg-background shadow-sm">
        <span className={`h-2.5 w-2.5 rounded-full ${accent.dot}`} />
      </div>

      <Card
        className={`overflow-hidden border shadow-sm transition-shadow hover:shadow-md ${accent.ring}`}
      >
        <CardContent className="p-6 sm:p-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-4">
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${accent.icon}`}
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
            <span
              className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${accent.chip}`}
            >
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
                <Check
                  className={`mt-0.5 h-4 w-4 shrink-0 ${accent.dot.replace(
                    "bg-",
                    "text-"
                  )}`}
                />
                <span>{h}</span>
              </li>
            ))}
          </ul>

          <div className="mt-5 flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            {exp.location}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function Experience() {
  return (
    <section
      id="experience"
      className="scroll-mt-20 bg-muted/30 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Work experience"
          title="Where I've made an impact"
          description="Three different worlds — farming, martial arts, and retail — each one taught me something valuable about hard work and people."
        />

        <div className="relative mt-14">
          {/* vertical line */}
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
