"use client";

import { motion } from "framer-motion";

import { Card, CardContent } from "@/components/ui/card";
import { tools } from "@/lib/portfolio-data";
import { SectionHeading } from "./section-heading";
import { StaggerGroup, StaggerItem } from "./reveal";

export function Tools() {
  return (
    <section id="tools" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Tools I've Built"
          title="Nine tools. Zero servers."
          description="Every one of these runs entirely in your browser — no logins, no databases, no data leaving your device. Privacy by design, not as an afterthought."
        />

        <StaggerGroup
          className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.07}
        >
          {tools.map((tool, i) => {
            const Icon = tool.icon;
            return (
              <StaggerItem key={tool.name}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="h-full"
                >
                  <Card className="group h-full overflow-hidden border-border/60 shadow-sm transition-shadow duration-200 hover:shadow-md hover:shadow-amber-500/10 hover:ring-1 hover:ring-amber-500/30">
                    <CardContent className="flex h-full flex-col p-5">
                      <div className="flex items-center justify-between">
                        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-muted text-foreground/80 transition-all duration-200 group-hover:scale-110 group-hover:bg-amber-100 group-hover:text-amber-700 dark:group-hover:bg-amber-950/50 dark:group-hover:text-amber-300">
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="text-xs font-medium text-muted-foreground/70">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <h3 className="mt-4 text-base font-semibold">
                        {tool.name}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                        {tool.blurb}
                      </p>
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
