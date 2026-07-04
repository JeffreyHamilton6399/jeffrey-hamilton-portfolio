"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Lock } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { modProjects, type ModProject } from "@/lib/portfolio-data";
import { SectionHeading } from "./section-heading";
import { StaggerGroup, StaggerItem } from "./reveal";

const statusBadge: Record<
  ModProject["status"],
  { label: string; className: string }
> = {
  public: {
    label: "Public",
    className:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300",
  },
  review: {
    label: "Under Review",
    className:
      "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300",
  },
};

function modrinthUrl(mod: ModProject): string {
  return `https://modrinth.com/${mod.kind}/${mod.slug}`;
}

export function MinecraftMods() {
  return (
    <section id="mods" className="scroll-mt-20 border-y border-border/60 bg-muted/30 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Minecraft Mods"
          title="Mods & modpacks on Modrinth."
          description="Java mods and a modpack — built for Minecraft, published on Modrinth for anyone to use."
        />

        <StaggerGroup
          className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
          stagger={0.08}
        >
          {modProjects.map((mod) => {
            const Icon = mod.icon;
            const badge = statusBadge[mod.status];
            const isReview = mod.status === "review";

            return (
              <StaggerItem key={mod.name} className="h-full">
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="h-full"
                >
                  <Card className="group flex h-full flex-col overflow-hidden border-border/60 shadow-sm transition-shadow duration-200 hover:shadow-lg hover:shadow-amber-500/10 hover:ring-1 hover:ring-amber-500/30">
                    <CardContent className="flex h-full flex-col gap-[0.35rem] p-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-700 transition-transform duration-200 group-hover:scale-110 dark:bg-amber-950/50 dark:text-amber-300">
                        <Icon className="h-[1.05rem] w-[1.05rem]" />
                      </div>
                      <h3 className="text-[0.95rem] font-bold leading-tight text-foreground">
                        {mod.name}
                      </h3>
                      <span
                        className={`w-fit rounded-full px-[0.4rem] py-[0.15rem] text-[0.65rem] font-semibold uppercase tracking-wide ${badge.className}`}
                      >
                        {badge.label}
                      </span>
                      <p className="shrink text-[0.78rem] leading-[1.4] text-muted-foreground">
                        {mod.kind === "modpack"
                          ? "A performance-focused modpack — clean, fast, ready to play."
                          : "A Minecraft mod — syncs keybinds across installs."}
                      </p>

                      <div className="mt-auto shrink-0 pt-2">
                        {isReview ? (
                          <span className="inline-flex cursor-not-allowed items-center gap-1.5 px-[0.65rem] py-[0.3rem] text-[0.78rem] font-semibold text-muted-foreground/50">
                            <Lock className="h-3 w-3" />
                            Pending review
                          </span>
                        ) : (
                          <a
                            href={modrinthUrl(mod)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-[0.65rem] py-[0.3rem] text-[0.78rem] font-semibold text-amber-600 transition-colors hover:text-amber-700 dark:text-amber-500 dark:hover:text-amber-400"
                          >
                            View on Modrinth
                            <ArrowUpRight className="h-3 w-3" />
                          </a>
                        )}
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
