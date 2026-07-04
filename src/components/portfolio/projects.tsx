"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Lock, ExternalLink } from "lucide-react";

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

/** Desktop grid span classes — static map so Tailwind JIT generates them. */
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
  return `${COL_SPAN[project.span.col] ?? ""} ${ROW_SPAN[project.span.row] ?? ""}`;
}

function ProjectCard({ project }: { project: Project }) {
  const Icon = project.icon;
  const badge = statusBadge[project.status];
  const hasLink = Boolean(project.link);
  const buttonLabel = project.ctaLabel ?? "View Project";
  const isImageCard =
    project.media?.kind === "cad" || project.media?.kind === "robotics";
  const isCad = project.media?.kind === "cad";
  const isRobotics = project.media?.kind === "robotics";

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="h-full"
    >
      <Card
        className={`group relative flex h-full flex-col overflow-hidden border-border/60 shadow-sm transition-shadow duration-200 hover:shadow-lg hover:shadow-amber-500/10 hover:ring-1 hover:ring-amber-500/30 ${
          isImageCard ? "bg-zinc-950" : ""
        }`}
      >
        {/* Background image for CAD / Robotics cards */}
        {isCad ? (
          <div className="absolute inset-0">
            <Image
              src={project.media!.src}
              alt={`${project.name} floor plan`}
              fill
              unoptimized
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover opacity-40 transition-opacity duration-300 group-hover:opacity-55"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-zinc-950/30" />
          </div>
        ) : null}
        {isRobotics ? (
          <div className="absolute inset-0">
            <Image
              src={roboticsImage}
              alt={`${project.name} robot`}
              fill
              unoptimized
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover opacity-45 transition-opacity duration-300 group-hover:opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-zinc-950/30" />
          </div>
        ) : null}

        <CardContent className="relative flex h-full flex-col gap-[0.35rem] p-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-700 transition-transform duration-200 group-hover:scale-110 dark:bg-amber-950/50 dark:text-amber-300">
            <Icon className="h-[1.05rem] w-[1.05rem]" />
          </div>
          <h3 className="text-[0.95rem] font-bold leading-tight text-foreground">
            {project.name}
          </h3>
          <span
            className={`w-fit rounded-full px-[0.4rem] py-[0.15rem] text-[0.65rem] font-semibold uppercase tracking-wide ${badge.className}`}
          >
            {badge.label}
          </span>
          {/* Description: hidden on mobile for compact cards */}
          <p
            className={`shrink text-[0.78rem] leading-[1.4] ${
              isImageCard ? "text-zinc-200" : "text-muted-foreground"
            } ${project.mobileCompact ? "hidden sm:block" : ""}`}
          >
            {project.description}
          </p>

          {/* Animations gallery inline (only for School Animations card) */}
          {project.media?.kind === "animations" ? (
            <div>
              <AnimationsGallery />
            </div>
          ) : null}

          {/* Action button — flex-shrink:0 so it never gets compressed/hidden.
              mt-auto pins it to the bottom. */}
          <div className="mt-auto shrink-0">
            {hasLink ? (
              project.openNewTab ? (
                // Echo Heist — opens local html in new tab
                <button
                  type="button"
                  onClick={() =>
                    window.open(project.link, "_blank", "noopener,noreferrer")
                  }
                  className={`inline-flex items-center gap-1.5 px-[0.65rem] py-[0.3rem] text-[0.78rem] font-semibold transition-colors ${
                    isImageCard
                      ? "text-amber-400 hover:text-amber-300"
                      : "text-amber-600 hover:text-amber-700 dark:text-amber-500 dark:hover:text-amber-400"
                  }`}
                >
                  {buttonLabel}
                  <ExternalLink className="h-3 w-3" />
                </button>
              ) : isCad ? (
                // CAD Housing — links to Drive folder (PDF is background only)
                <button
                  type="button"
                  onClick={() =>
                    window.open(project.link, "_blank", "noopener,noreferrer")
                  }
                  className="inline-flex items-center gap-1.5 px-[0.65rem] py-[0.3rem] text-[0.78rem] font-semibold text-amber-400 transition-colors hover:text-amber-300"
                >
                  {buttonLabel}
                  <ArrowUpRight className="h-3 w-3" />
                </button>
              ) : isRobotics ? (
                // Robotics — opens Drive folder in new tab
                <button
                  type="button"
                  onClick={() =>
                    window.open(project.link, "_blank", "noopener,noreferrer")
                  }
                  className="inline-flex items-center gap-1.5 px-[0.65rem] py-[0.3rem] text-[0.78rem] font-semibold text-amber-400 transition-colors hover:text-amber-300"
                >
                  {buttonLabel}
                  <ArrowUpRight className="h-3 w-3" />
                </button>
              ) : (
                // Default — regular link
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1.5 px-[0.65rem] py-[0.3rem] text-[0.78rem] font-semibold transition-colors ${
                    isImageCard
                      ? "text-amber-400 hover:text-amber-300"
                      : "text-amber-600 hover:text-amber-700 dark:text-amber-500 dark:hover:text-amber-400"
                  }`}
                >
                  {buttonLabel}
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              )
            ) : (
              <span className="inline-flex cursor-not-allowed items-center gap-1.5 px-[0.65rem] py-[0.3rem] text-[0.78rem] font-semibold text-muted-foreground/50">
                <Lock className="h-3 w-3" />
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
    <section id="projects" className="scroll-mt-20 py-12 sm:py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Projects"
          title="Things I've actually shipped."
          description="Live web apps, school coursework, and builds from digital media, CAD, and robotics. A mix — because I like building a mix."
        />

        {/* Full-width tools banner — featured, above the grid */}
        <Reveal className="mt-8 sm:mt-10">
          <ToolsBanner />
        </Reveal>

        {/* Mobile: 2-col grid (compact cards = half width, others = full width).
            Desktop: 6-col grid with varied spans. */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:grid-cols-2 sm:gap-5 lg:grid-cols-6 lg:auto-rows-[220px]">
          {projects.map((project) => (
            <Reveal
              key={project.name}
              className={`h-full ${
                project.mobileCompact
                  ? "col-span-1 sm:col-span-1"
                  : "col-span-2 sm:col-span-1"
              } ${spanClasses(project)}`}
            >
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
