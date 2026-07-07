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
        className={`group relative flex h-full flex-col border-border/60 shadow-sm transition-shadow duration-200 hover:shadow-lg hover:shadow-amber-500/10 hover:ring-1 hover:ring-amber-500/30 ${
          isImageCard ? "overflow-hidden bg-zinc-950" : "overflow-visible"
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

        <CardContent className="relative flex h-full flex-col gap-[0.35rem] p-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-700 transition-transform duration-200 group-hover:scale-110 dark:bg-amber-950/50 dark:text-amber-300">
            <Icon className="h-5 w-5" />
          </div>
          <h3 className="text-base font-bold leading-tight text-foreground">
            {project.name}
          </h3>
          {/* Only show status badge for school projects */}
          {project.status === "school" ? (
            <span
              className={`w-fit rounded-full px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide ${badge.className}`}
            >
              {badge.label}
            </span>
          ) : null}
          {/* Description */}
          <p
            className={`text-sm leading-relaxed ${
              isImageCard ? "text-zinc-200" : "text-muted-foreground"
            }`}
          >
            {project.description}
          </p>

          {/* Animations gallery inline (only for School Animations card) */}
          {project.media?.kind === "animations" ? (
            <div>
              <AnimationsGallery />
            </div>
          ) : null}

          {/* Action button — pinned to bottom of card */}
          {hasLink ? (
            <div className="mt-auto shrink-0 pt-2">
              {project.openNewTab ? (
                <button
                  type="button"
                  onClick={() =>
                    window.open(project.link, "_blank", "noopener,noreferrer")
                  }
                  className={`inline-flex items-center gap-1.5 text-sm font-semibold transition-colors ${
                    isImageCard
                      ? "text-amber-400 hover:text-amber-300"
                      : "text-amber-600 hover:text-amber-700 dark:text-amber-500 dark:hover:text-amber-400"
                  }`}
                >
                  {buttonLabel}
                  <ExternalLink className="h-3.5 w-3.5" />
                </button>
              ) : isCad || isRobotics ? (
                <button
                  type="button"
                  onClick={() =>
                    window.open(project.link, "_blank", "noopener,noreferrer")
                  }
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-400 transition-colors hover:text-amber-300"
                >
                  {buttonLabel}
                  <ArrowUpRight className="h-3.5 w-3.5" />
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
              )}
            </div>
          ) : null}
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="scroll-mt-20 pt-12 pb-8 sm:pt-16 sm:pb-12 md:pt-20 md:pb-16">
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

        {/* Clean 3-col grid, auto height, no forced sizing */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {projects.map((project) => (
            <Reveal key={project.name}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
