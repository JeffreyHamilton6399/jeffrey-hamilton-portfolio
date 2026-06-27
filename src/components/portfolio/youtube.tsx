"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { socials, youtubeCards } from "@/lib/portfolio-data";
import { SectionHeading } from "./section-heading";
import { StaggerGroup, StaggerItem } from "./reveal";

export function YouTube() {
  return (
    <section
      id="youtube"
      className="scroll-mt-20 border-y border-border/60 bg-muted/30 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="On YouTube"
          title="Building in public, one video at a time."
        />

        <StaggerGroup className="mt-12 grid gap-6 md:grid-cols-2" stagger={0.1}>
          {youtubeCards.map((card) => {
            const Icon = card.icon;
            return (
              <StaggerItem key={card.title}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="h-full"
                >
                  <Card className="group h-full overflow-hidden border-border/60 bg-background shadow-sm transition-shadow duration-200 hover:shadow-lg hover:shadow-amber-500/10 hover:ring-1 hover:ring-amber-500/30">
                    <CardContent className="flex h-full flex-col p-7">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600 transition-transform duration-200 group-hover:scale-110 dark:bg-red-950/40 dark:text-red-400">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="mt-5 text-xl font-semibold">
                        {card.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {card.body}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Button
            asChild
            size="lg"
            className="btn-press bg-red-600 text-white shadow-md hover:bg-red-700"
          >
            <a
              href={socials.youtube}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Channel
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <a
            href={socials.youtubeVR}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-muted-underline text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            Also on my VR channel →
          </a>
        </div>
      </div>
    </section>
  );
}
