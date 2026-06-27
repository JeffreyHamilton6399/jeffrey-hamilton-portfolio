"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Lock, ExternalLink, FileText } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { projects, type Project } from "@/lib/portfolio-data";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";
import { ToolsBanner } from "./tools";
import { AnimationsGallery } from "./animations-gallery";

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

/** Robotics image — displayed as card background with text overlay */
const roboticsImage = "/robot-vex.jpg";

function handleCardClick(project: Project) {
  if (!project.link) return;
  if (project.openNewTab) {
    window.open(project.link, "_blank", "noopener,noreferrer");
  }
}

/** Desktop grid span classes based on the project's span config (6-col base).
 *  Static map so Tailwind's JIT can detect and generate these classes. */
const COL_SPAN: Record<number, string> = {
  1: "lg:col-span-1",
  2: "lg:col-span-2",
  3: "lg:col-span-3",
  4: "lg:col-span-4",
  5: "lg:col-span-5",
  6: "lg:col-span-6",
};
const ROW_SPAN: Record<number, string> = {
  1: "lg:row-span-1",
  2: "lg:row-span-2",
  3: "lg:row-span-3",
};
function spanClasses(project: Project): string {
  return `${COL_SPAN[project.span.col] ?? ""} ${
    ROW_SPAN[project.span.row] ?? ""
  }`;
}

function ProjectCard({ project }: { project: Project }) {
  const Icon = project.icon;
  const badge = statusBadge[project.status];
  const hasLink = Boolean(project.link);
  const buttonLabel = project.ctaLabel ?? "View Project";
  const isImageCard =
    project.media?.kind === "cad" || project.media?.kind === "robotics";

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`${spanClasses(project)} h-full`}
    >
      <Card
        className={`group relative flex h-full min-h-[200px] flex-col overflow-hidden border-border/60 shadow-sm transition-shadow duration-200 hover:shadow-lg hover:shadow-amber-500/10 hover:ring-1 hover:ring-amber-500/30 ${
          isImageCard ? "bg-zinc-950" : ""
        }`}
      >
        {/* Background image for CAD / Robotics cards */}
        {project.media?.kind === "cad" ? (
          <div className="absolute inset-0">
            <Image
              src={project.media.src}
              alt={project.name}
              fill
              unoptimized
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover opacity-40 transition-opacity duration-300 group-hover:opacity-55"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-zinc-950/30" />
          </div>
        ) : null}
        {project.media?.kind === "robotics" ? (
          <div className="absolute inset-0">
            <Image
              src={roboticsImage}
              alt={project.name}
              fill
              unoptimized
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover opacity-45 transition-opacity duration-300 group-hover:opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-zinc-950/30" />
          </div>
        ) : null}

        <CardContent className="relative flex h-full flex-col p-5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700 transition-transform duration-200 group-hover:scale-110 dark:bg-amber-950/50 dark:text-amber-300">
            <Icon className="h-5 w-5" />
          </div>
          <h3 className="mt-3 text-base font-semibold text-foreground">
            {project.name}
          </h3>
          <span
            className={`mt-2 w-fit rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${badge.className}`}
          >
            {badge.label}
          </span>
          <p
            className={`mt-2 text-sm leading-relaxed ${
              isImageCard ? "text-zinc-200" : "text-muted-foreground"
            }`}
          >
            {project.description}
          </p>

          {/* Animations gallery inline (only for School Animations card) */}
          {project.media?.kind === "animations" ? (
            <div className="mt-3">
              <AnimationsGallery />
            </div>
          ) : null}

          {/* Action button — pinned to bottom via mt-auto */}
          <div className="mt-auto pt-4">
            {hasLink ? (
              project.openNewTab ? (
                <button
                  type="button"
                  onClick={() => handleCardClick(project)}
                  className={`inline-flex items-center gap-1.5 text-sm font-semibold transition-colors ${
                    isImageCard
                      ? "text-amber-400 hover:text-amber-300"
                      : "text-amber-600 hover:text-amber-700 dark:text-amber-500 dark:hover:text-amber-400"
                  }`}
                >
                  {buttonLabel}
                  <ExternalLink className="h-3.5 w-3.5" />
                </button>
              ) : project.media?.kind === "cad" ? (
                <button
                  type="button"
                  onClick={() =>
                    window.open(
                      "/cad-housing.pdf",
                      "_blank",
                      "noopener,noreferrer"
                    )
                  }
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-400 transition-colors hover:text-amber-300"
                >
                  <FileText className="h-3.5 w-3.5" />
                  Open PDF
                  <ArrowUpRight className="h-3 w-3" />
                </button>
              ) : (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1.5 text-sm font-semibold transition-colors ${
                    isImageCard
                      ? "text-amber-400 hover:text-amber-300"
                      : "text-amber-600 hover:text-amber-700 dark:text-amber-500 dark:hover:text-amber-400"
                  }`}
                >
                  {buttonLabel}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              )
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

        {/* 6-column grid with varied spans. Mobile collapses to 1 col. */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6 lg:auto-rows-[200px]">
          {projects.map((project) => (
            <Reveal
              key={project.name}
              className={`h-full ${spanClasses(project)}`}
            >
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
