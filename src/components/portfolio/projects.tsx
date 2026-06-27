"use client";

import { motion } from "framer-motion";

import { Card, CardContent } from "@/components/ui/card";
import { projects } from "@/lib/portfolio-data";
import { SectionHeading } from "./section-heading";
import { StaggerGroup, StaggerItem } from "./reveal";

export function Projects() {
  return (
    <section id="projects" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Projects"
          title="Things I've actually shipped."
          description="Not tutorials. Not half-finished repos. These are projects I planned, built, and put out into the world."
        />

        {/* Intentionally uneven: first card spans wide, the other two sit beside each other */}
        <StaggerGroup
          className="mt-12 grid gap-5 md:grid-cols-6"
          stagger={0.1}
        >
          {projects.map((project, i) => {
            const Icon = project.icon;
            const wide = i === 0;
            return (
              <StaggerItem
                key={project.name}
                className={wide ? "md:col-span-6" : "md:col-span-3"}
              >
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="h-full"
                  >
                    <Card className="group flex h-full flex-col overflow-hidden border-border/60 shadow-sm transition-shadow duration-200 hover:shadow-lg hover:shadow-amber-500/10 hover:ring-1 hover:ring-amber-500/30 md:flex-row">
                      <CardContent
                        className={`flex flex-col p-7 ${
                          wide ? "md:flex-row md:items-center md:gap-8" : ""
                        }`}
                      >
                        <div
                          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700 transition-transform duration-200 group-hover:scale-110 dark:bg-amber-950/50 dark:text-amber-300 ${
                            wide ? "md:h-20 md:w-20" : ""
                          }`}
                        >
                          <Icon className={wide ? "h-9 w-9" : "h-6 w-6"} />
                        </div>
                        <div className={wide ? "mt-5 md:mt-0" : "mt-5"}>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3
                              className={`font-semibold ${
                                wide ? "text-2xl" : "text-lg"
                              }`}
                            >
                              {project.name}
                            </h3>
                            <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                              {project.tag}
                            </span>
                          </div>
                          <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                            {project.description}
                          </p>
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
