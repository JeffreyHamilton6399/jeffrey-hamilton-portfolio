"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown, Mail, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { profile } from "@/lib/portfolio-data";
import { Typewriter } from "./typewriter";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden"
    >
      {/* subtle warm wash at the top */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[42rem] bg-gradient-to-b from-amber-50/70 via-background to-background dark:from-amber-950/15"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pb-24 pt-16 sm:px-6 md:grid-cols-[1.2fr_0.8fr] md:pb-32 md:pt-24">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Open to work &amp; projects
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05, ease: EASE }}
            className="mt-5 text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl"
          >
            {profile.firstName}{" "}
            <span className="text-amber-600 dark:text-amber-500">Hamilton</span>
          </motion.h1>

          {/* Typewriter tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="mt-4 font-mono text-sm text-muted-foreground sm:text-base"
          >
            <Typewriter text={profile.tagline} />
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6, ease: EASE }}
            className="mt-6 max-w-xl text-base leading-relaxed text-foreground/80 sm:text-lg"
          >
            {profile.intro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7, ease: EASE }}
            className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground"
          >
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-amber-600" />
              {profile.location}
            </span>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
            >
              <Mail className="h-4 w-4 text-amber-600" />
              {profile.email}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8, ease: EASE }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Button
              asChild
              size="lg"
              className="btn-press bg-amber-500 text-white shadow-md hover:bg-amber-600"
            >
              <Link href="#projects">
                See what I&apos;ve built
                <ArrowDown className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="btn-press">
              <Link href="#contact">Get in touch</Link>
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
          className="relative mx-auto"
        >
          {/* glow ring behind the circular photo */}
          <div
            aria-hidden
            className="absolute -inset-4 rounded-full bg-amber-400/25 blur-2xl"
          />
          {/* circular crop via border-radius: 50% + overflow: hidden on wrapper */}
          <div
            className="relative aspect-square w-60 overflow-hidden rounded-full border-4 border-background bg-muted shadow-xl sm:w-72 md:w-80"
            style={{ imageRendering: "high-quality" }}
          >
            <Image
              src="/profile.jpg"
              alt={`${profile.name} — professional portrait`}
              fill
              priority
              quality={100}
              sizes="(max-width: 768px) 18rem, 20rem"
              className="object-cover object-top"
            />
          </div>
          {/* small floating tag — breaks the grid intentionally */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9, ease: EASE }}
            className="absolute -bottom-2 -right-2 rounded-xl border border-border/60 bg-background/95 px-4 py-2.5 shadow-lg backdrop-blur sm:-right-6"
          >
            <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
              Currently
            </p>
            <p className="text-sm font-semibold">Teaching karate</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
