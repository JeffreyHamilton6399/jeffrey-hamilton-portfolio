"use client";

import { motion } from "framer-motion";

import { Card, CardContent } from "@/components/ui/card";
import { skillGroups } from "@/lib/portfolio-data";
import { SectionHeading } from "./section-heading";
import { StaggerGroup, StaggerItem } from "./reveal";

export function Skills() {
  return (
    <section
      id="skills"
      className="scroll-mt-20 border-y border-border/60 bg-muted/30 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="What I Work With"
          title="The toolbox, more or less."
          description="Three buckets: what I build with, what I create with, and the stuff you can't really put on a résumé but shows up every day."
        />

        <StaggerGroup className="mt-12 grid gap-6 md:grid-cols-3" stagger={0.1}>
          {skillGroups.map((group) => {
            const Icon = group.icon;
            return (
              <StaggerItem key={group.category}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="h-full"
                >
                  <Card className="group h-full overflow-hidden border-border/60 shadow-sm transition-shadow duration-200 hover:shadow-md hover:shadow-amber-500/10 hover:ring-1 hover:ring-amber-500/30">
                    <div className="h-1 w-full bg-amber-500" />
                    <CardContent className="p-6">
                      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-amber-100 text-amber-700 transition-transform duration-200 group-hover:scale-110 dark:bg-amber-950/50 dark:text-amber-300">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="mt-4 text-lg font-semibold">
                        {group.category}
                      </h3>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {group.skills.map((skill) => (
                          <motion.span
                            key={skill}
                            whileHover={{ scale: 1.08 }}
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 17,
                            }}
                            className="cursor-default rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-foreground/80 transition-colors hover:border-amber-400 hover:bg-amber-50 hover:text-amber-700 dark:hover:border-amber-700 dark:hover:bg-amber-950/40 dark:hover:text-amber-300"
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
