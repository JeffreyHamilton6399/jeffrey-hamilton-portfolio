"use client";

import { motion } from "framer-motion";
import { ExternalLink, Lock } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { projects, projectsTeaser, type Project } from "@/lib/portfolio-data";
import { SectionHeading } from "./section-heading";
import { StaggerGroup, StaggerItem } from "./reveal";
import { AnimationsGallery } from "./animations-gallery";

const spanClass: Record<Project["span"], string> = {
  wide: "md:col-span-3",
  normal: "md:col-span-1",
  gallery: "md:col-span-3",
};

const statusBadge: Record<
  Project["status"],
  { label: string; className: string }
> = {
  live: {
    label: "Live",
    className:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300",
  },
  school: {
    label: "School",
    className: "bg-muted text-muted-foreground",
  },
  progress: {
    label: "In Progress",
    className:
      "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300",
  },
};

function ProjectCard({ project }: { project: Project }) {
  const Icon = project.icon;
  const badge = statusBadge[project.status];
  const isGallery = project.span === "gallery";
  const isInProgress = project.status === "progress";

  const Inner = (
    <Card className="group flex h-full flex-col overflow-hidden border-border/60 shadow-sm transition-shadow duration-200 hover:shadow-lg hover:shadow-amber-500/10 hover:ring-1 hover:ring-amber-500/30">
      <CardContent
        className={`flex h-full flex-col p-6 sm:p-7 ${
          project.span === "wide" ? "md:flex-row md:items-center md:gap-8" : ""
        }`}
      >
        <div
          className={`flex items-start gap-4 ${
            project.span === "wide" ? "md:flex-col" : ""
          }`}
        >
          <div
            className={`flex shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700 transition-transform duration-200 group-hover:scale-110 dark:bg-amber-950/50 dark:text-amber-300 ${
              project.span === "wide" ? "h-16 w-16" : "h-12 w-12"
            }`}
          >
            <Icon className={project.span === "wide" ? "h-8 w-8" : "h-5 w-5"} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3
                className={`font-semibold ${
                  project.span === "wide" ? "text-2xl" : "text-lg"
                }`}
              >
                {project.name}
              </h3>
              <span
                className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${badge.className}`}
              >
                {badge.label}
              </span>
            </div>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {project.description}
            </p>
          </div>
        </div>

        {isGallery ? (
          <div className="mt-6">
            <AnimationsGallery />
          </div>
        ) : null}

        {/* link row */}
        <div className="mt-auto pt-5">
          {isInProgress ? (
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <Lock className="h-3.5 w-3.5" />
              Details coming soon
            </span>
          ) : project.link ? (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-600 transition-colors hover:text-amber-700 dark:text-amber-500 dark:hover:text-amber-400"
            >
              View project
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="h-full"
    >
      {Inner}
    </motion.div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Projects"
          title="Things I've actually shipped."
          description="Live web apps, school coursework, and builds from digital media, CAD, and robotics. A mix — because I like building a mix."
        />

        <StaggerGroup
          className="mt-12 grid gap-5 md:grid-cols-3"
          stagger={0.08}
        >
          {projects.map((project) => (
            <StaggerItem
              key={project.name}
              className={spanClass[project.span]}
            >
              <ProjectCard project={project} />
            </StaggerItem>
          ))}
        </StaggerGroup>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mt-10 text-center text-base font-medium text-muted-foreground"
        >
          {projectsTeaser}
        </motion.p>
      </div>
    </section>
  );
}
