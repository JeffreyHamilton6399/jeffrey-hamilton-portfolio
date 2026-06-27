"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Lock, Play, ExternalLink, FileText } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { projects, type Project } from "@/lib/portfolio-data";
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

/** Alternating grid: every 3rd card spans 2 columns to break the rhythm. */
function colSpanClass(index: number): string {
  // index is 0-based; every 3rd card (index 2, 5, 8...) spans 2 cols on desktop
  return (index + 1) % 3 === 0 ? "lg:col-span-2" : "lg:col-span-1";
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const Icon = project.icon;
  const badge = statusBadge[project.status];
  const hasLink = Boolean(project.link);
  const cta = project.cta;
  const isLive = project.status === "live";
  const isWide = (index + 1) % 3 === 0;

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="h-full"
    >
      <Card
        className={`group flex h-full flex-col overflow-hidden border-border/60 shadow-sm transition-shadow duration-200 hover:shadow-lg hover:shadow-amber-500/10 hover:ring-1 hover:ring-amber-500/30 ${
          isLive ? "border-l-2 border-l-amber-500/60" : ""
        }`}
      >
        <CardContent className="flex h-full flex-col p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700 transition-transform duration-200 group-hover:scale-110 dark:bg-amber-950/50 dark:text-amber-300">
              <Icon className="h-5 w-5" />
            </div>
            {/* Wide cards get a larger name */}
            <h3
              className={`font-semibold ${
                isWide ? "text-xl" : "text-lg"
              }`}
            >
              {project.name}
            </h3>
          </div>
          <span
            className={`mt-3 w-fit rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${badge.className}`}
          >
            {badge.label}
          </span>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>

          {/* Inline media — natural heights vary per card */}
          {project.media?.kind === "animations" ? (
            <div className="mt-4">
              <AnimationsGallery />
            </div>
          ) : null}
          {project.media?.kind === "robotics" ? (
            <div className="mt-4">
              <RoboticsGallery />
            </div>
          ) : null}
          {project.media?.kind === "cad" ? (
            <div className="mt-4">
              <CadPreview src={project.media.src} link={project.link} />
            </div>
          ) : null}

          {/* Action button — bottom of every card */}
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

/** CAD housing: static preview image + "View Full →" opens PDF in new tab. */
function CadPreview({ src, link }: { src: string; link?: string }) {
  return (
    <div>
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-border/60 bg-muted">
        <Image
          src={src}
          alt="CAD housing floor plan"
          fill
          unoptimized
          sizes="(max-width: 768px) 90vw, 40vw"
          className="object-contain"
        />
      </div>
      {link ? (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <FileText className="h-3.5 w-3.5" />
          View Full
          <ArrowUpRight className="h-3 w-3" />
        </a>
      ) : null}
    </div>
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
    <section id="projects" className="scroll-mt-20 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Projects"
          title="Things I've actually shipped."
          description="Live web apps, school coursework, and builds from digital media, CAD, and robotics. A mix — because I like building a mix."
        />

        {/* Full-width tools banner — featured, above the grid */}
        <Reveal className="mt-10">
          <ToolsBanner />
        </Reveal>

        {/* Alternating grid: 3 cols, every 3rd card spans 2. Natural heights. */}
        <StaggerGroup
          className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.08}
        >
          {projects.map((project, i) => (
            <StaggerItem key={project.name} className={`h-full ${colSpanClass(i)}`}>
              <ProjectCard project={project} index={i} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
