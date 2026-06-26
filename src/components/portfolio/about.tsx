"use client";

import { motion } from "framer-motion";
import { Briefcase, Heart, Sparkles } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { profile } from "@/lib/portfolio-data";
import { SectionHeading } from "./section-heading";

const values = [
  {
    icon: Briefcase,
    title: "Show up, every day",
    text: "Reliability is my baseline. Early mornings and consistent effort are second nature to me.",
  },
  {
    icon: Heart,
    title: "People first",
    text: "From customers to karate students, I treat everyone with patience, respect, and a positive attitude.",
  },
  {
    icon: Sparkles,
    title: "Always learning",
    text: "I pick things up quickly and look for ways to improve — whether it's a new skill or a better process.",
  },
];

export function About() {
  return (
    <section id="about" className="scroll-mt-20 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="About me"
          title="A little about who I am"
        />

        <div className="mt-12 grid gap-8 md:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="md:col-span-3"
          >
            <Card className="h-full border-border/60 shadow-sm">
              <CardContent className="p-6 sm:p-8">
                <p className="text-lg leading-relaxed text-foreground/90">
                  {profile.summary}
                </p>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  Whether I&apos;m feeding hens at dawn, leading a karate class
                  full of energized kids, or helping a customer find what they
                  need at the market, I bring the same energy:{" "}
                  <span className="font-medium text-foreground">
                    be dependable, be kind, and do the work well.
                  </span>
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-2"
          >
            <Card className="h-full border-border/60 bg-gradient-to-br from-amber-50 to-orange-50 shadow-sm dark:from-amber-950/30 dark:to-orange-950/20">
              <CardContent className="grid grid-cols-2 gap-4 p-6 sm:p-8">
                {profile.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-border/50 bg-background/60 p-4 text-center"
                  >
                    <p className="bg-gradient-to-br from-amber-600 to-orange-600 bg-clip-text text-3xl font-bold text-transparent">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-xs font-medium text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {values.map((value, i) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
            >
              <Card className="h-full border-border/60 shadow-sm transition-shadow hover:shadow-md">
                <CardContent className="p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300">
                    <value.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {value.text}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
