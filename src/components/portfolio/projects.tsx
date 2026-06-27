"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Lock, Play, ExternalLink } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { projects, projectsTeaser, type Project } from "@/lib/portfolio-data";
import { SectionHeading } from "./section-heading";
import { StaggerGroup, StaggerItem } from "./reveal";
import { Reveal } from "./reveal";
import { ToolsBanner } from "./tools";
import { AnimationsGallery } from "./animations-gallery";
import { RoboticsGallery } from "./robotics-gallery";
import { GameModal } from "./game-modal";

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
  const hasLink = Boolean(project.link);
  const cta = project.cta;

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="h-full"
    >
      <Card className="group flex h-full flex-col overflow-hidden border-border/60 shadow-sm transition-shadow duration-200 hover:shadow-lg hover:shadow-amber-500/10 hover:ring-1 hover:ring-amber-500/30">
        <CardContent className="flex h-full flex-col p-6">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700 transition-transform duration-200 group-hover:scale-110 dark:bg-amber-950/50 dark:text-amber-300">
            <Icon className="h-5 w-5" />
          </div>
          <div className="mt-4 flex items-center gap-2">
            <h3 className="text-lg font-semibold">{project.name}</h3>
          </div>
          <span
            className={`mt-2 w-fit rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${badge.className}`}
          >
            {badge.label}
          </span>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>

          {/* Inline media (gallery / robot photo) — same vertical slot every card */}
          {project.media && project.media.kind === "animations" ? (
            <div className="mt-4">
              <AnimationsGallery />
            </div>
          ) : null}
          {project.media && project.media.kind === "robotics" ? (
            <div className="mt-4">
              <RoboticsGallery />
            </div>
          ) : null}

          {/* Action button — always at the bottom, same position every card */}
          <div className="mt-auto pt-5">
            {cta?.kind === "play" ? (
              <PlayButton project={project} />
            ) : cta?.kind === "link" && hasLink ? (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-600 transition-colors hover:text-amber-700 dark:text-amber-500 dark:hover:text-amber-400"
              >
                {cta.label}
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            ) : hasLink ? (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-600 transition-colors hover:text-amber-700 dark:text-amber-500 dark:hover:text-amber-400"
              >
                View Project
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            ) : (
              <span className="inline-flex cursor-not-allowed items-center gap-1.5 text-sm font-semibold text-muted-foreground/50">
                <Lock className="h-3.5 w-3.5" />
                Coming Soon
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

/** Button that opens the Echo Heist (or any single-HTML game) in an iframe modal. */
function PlayButton({ project }: { project: Project }) {
  const [open, setOpen] = React.useState(false);
  const src =
    project.media && project.media.kind === "game" ? project.media.src : "";
  const label = project.cta?.label ?? "Play";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-600 transition-colors hover:text-amber-700 dark:text-amber-500 dark:hover:text-amber-400"
      >
        {label}
        <Play className="h-3.5 w-3.5 fill-current" />
      </button>
      <GameModal
        open={open}
        onClose={() => setOpen(false)}
        src={src}
        title={project.name}
        fallbackLink={project.link}
      />
    </>
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

        {/* Full-width tools banner — featured, above the grid */}
        <Reveal className="mt-12">
          <ToolsBanner />
        </Reveal>

        {/* Uniform project card grid: 3-col desktop / 2-col tablet / 1-col mobile */}
        <StaggerGroup
          className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.08}
        >
          {projects.map((project) => (
            <StaggerItem key={project.name} className="h-full">
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
