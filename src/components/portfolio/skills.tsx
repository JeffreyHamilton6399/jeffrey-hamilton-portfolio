"use client";

import { motion } from "framer-motion";
import { Users, Wrench, Shield, type LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { skillGroups } from "@/lib/portfolio-data";
import { SectionHeading } from "./section-heading";

const iconMap: Record<string, LucideIcon> = {
  users: Users,
  wrench: Wrench,
  shield: Shield,
};

const accentByIndex = [
  {
    bar: "from-amber-500 to-orange-500",
    chip: "bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-200",
    icon: "bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300",
  },
  {
    bar: "from-emerald-500 to-teal-500",
    chip: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200",
    icon: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300",
  },
  {
    bar: "from-rose-500 to-pink-500",
    chip: "bg-rose-100 text-rose-800 dark:bg-rose-950/40 dark:text-rose-200",
    icon: "bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300",
  },
];

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-20 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Skills & strengths"
          title="What I bring to the table"
          description="A blend of people skills, hands-on reliability, and the discipline that comes from years of martial arts training."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {skillGroups.map((group, i) => {
            const Icon = iconMap[group.icon] ?? Users;
            const accent = accentByIndex[i % accentByIndex.length];
            return (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="group h-full overflow-hidden border-border/60 shadow-sm transition-shadow hover:shadow-md">
                  <div
                    className={`h-1.5 w-full bg-gradient-to-r ${accent.bar}`}
                  />
                  <CardContent className="p-6">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl ${accent.icon}`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold">
                      {group.category}
                    </h3>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {group.skills.map((skill) => (
                        <span
                          key={skill}
                          className={`rounded-full px-3 py-1 text-xs font-medium ${accent.chip}`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
