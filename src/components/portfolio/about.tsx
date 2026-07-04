"use client";

import { motion } from "framer-motion";

import { profile } from "@/lib/portfolio-data";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const facts = [
  { k: "Age", v: "17" },
  { k: "Graduate", v: "2027" },
  { k: "Working since", v: "2018" },
  { k: "Tools shipped", v: "9" },
];

export function About() {
  return (
    <section id="about" className="scroll-mt-20 py-12 sm:py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="About"
          title="A little about me"
          align="left"
        />

        <div className="mt-8 grid gap-8 md:mt-10 md:grid-cols-12 md:gap-10">
          {/* Narrative — takes 7 cols, intentionally asymmetric */}
          <Reveal className="md:col-span-7" y={18}>
            <div className="space-y-4 text-base leading-relaxed text-foreground/85 sm:space-y-5 sm:text-lg">
              <p>
                I&apos;m{" "}
                <span className="font-semibold text-foreground">
                  Jeffrey Hamilton
                </span>
                . I&apos;m 17, and I&apos;ve been working since I was old enough
                to carry an egg basket.
              </p>
              <p>
                These days I split my time between teaching karate at Bobby
                Lawrence, helping out at Day&apos;s Market, building small tools
                that run in the browser, and making YouTube videos. None of it
                came from a bootcamp or a fancy program — I just kept showing up
                and figuring things out.
              </p>
              <p className="text-muted-foreground">
                I like the kind of work where you can point at something at the
                end of the day and say{" "}
                <span className="text-foreground">I made that</span>. A clean
                edit, a kid who finally lands a kick, a tool that loads in under
                a second — same feeling.
              </p>
            </div>

            <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-4">
              {facts.map((f) => (
                <div key={f.k} className="bg-background p-4">
                  <dt className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                    {f.k}
                  </dt>
                  <dd className="mt-1 text-lg font-semibold">{f.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {/* Big pull-quote — intentionally larger, breaks symmetry */}
          <Reveal className="md:col-span-5" delay={0.1} y={26}>
            <figure className="flex h-full flex-col justify-center rounded-2xl border border-amber-200/70 bg-amber-50/60 p-7 dark:border-amber-900/40 dark:bg-amber-950/20">
              <span
                aria-hidden
                className="font-serif text-6xl leading-none text-amber-500"
              >
                &ldquo;
              </span>
              <blockquote className="-mt-4 text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">
                {profile.quote}
              </blockquote>
              <figcaption className="mt-4 text-sm font-medium text-muted-foreground">
                — {profile.name}
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
