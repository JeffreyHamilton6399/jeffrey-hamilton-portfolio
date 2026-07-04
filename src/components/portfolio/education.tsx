"use client";

import { motion } from "framer-motion";

import { Card, CardContent } from "@/components/ui/card";
import { education } from "@/lib/portfolio-data";
import { SectionHeading } from "./section-heading";
import { StaggerGroup, StaggerItem } from "./reveal";
import { CertificateCarousel } from "./certificate-carousel";

export function Education() {
  return (
    <section id="education" className="scroll-mt-20 py-12 sm:py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Education & Certifications"
          title="What I've earned — in school and out."
        />

        <StaggerGroup
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          stagger={0.08}
        >
          {education.map((item) => {
            const Icon = item.icon;
            return (
              <StaggerItem key={item.title}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="h-full"
                >
                  <Card className="group h-full border-border/60 shadow-sm transition-shadow duration-200 hover:shadow-md hover:shadow-amber-500/10 hover:ring-1 hover:ring-amber-500/30">
                    <CardContent className="flex h-full flex-col p-6">
                      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-muted text-foreground/80 transition-all duration-200 group-hover:scale-110 group-hover:bg-amber-100 group-hover:text-amber-700 dark:group-hover:bg-amber-950/50 dark:group-hover:text-amber-300">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="mt-4 text-base font-semibold leading-tight">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {item.org}
                      </p>
                      <p className="mt-auto pt-4 text-xs font-medium text-muted-foreground/80">
                        {item.period}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>

        {/* Certificate carousel — horizontal scroll of certificate previews */}
        <CertificateCarousel />
      </div>
    </section>
  );
}
