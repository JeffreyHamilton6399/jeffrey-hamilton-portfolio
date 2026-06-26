"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown, Mail, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { profile } from "@/lib/portfolio-data";

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-gradient-to-b from-amber-50/60 via-background to-background dark:from-amber-950/20"
    >
      {/* decorative blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-amber-300/30 blur-3xl dark:bg-amber-700/20"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-orange-300/25 blur-3xl dark:bg-orange-800/20"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 pb-20 pt-12 sm:px-6 md:grid-cols-[1.15fr_0.85fr] md:pb-28 md:pt-20">
        <div className="order-2 md:order-1">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-100/70 px-3 py-1 text-xs font-medium text-amber-800 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-200"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Available for new opportunities
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
          >
            Hi, I&apos;m{" "}
            <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              {profile.name}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 flex flex-wrap items-center gap-3 text-sm text-muted-foreground"
          >
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-amber-600" />
              {profile.location}
            </span>
            <span className="hidden h-1 w-1 rounded-full bg-border sm:inline-block" />
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
            >
              <Mail className="h-4 w-4 text-amber-600" />
              {profile.email}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.28 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-md hover:from-amber-600 hover:to-orange-700"
            >
              <Link href="#experience">
                View my experience
                <ArrowDown className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="#contact">Contact me</Link>
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="order-1 mx-auto md:order-2"
        >
          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-amber-400/40 to-orange-500/40 blur-xl"
            />
            <div className="relative aspect-[4/5] w-64 overflow-hidden rounded-[1.75rem] border border-border/60 bg-muted shadow-xl sm:w-72 md:w-80">
              <Image
                src="/profile.jpg"
                alt={`${profile.name} professional portrait`}
                fill
                priority
                sizes="(max-width: 768px) 18rem, 20rem"
                className="object-cover object-center"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 rounded-2xl border border-border/60 bg-background/95 px-4 py-3 shadow-lg backdrop-blur">
              <p className="text-xs font-medium text-muted-foreground">
                Currently teaching
              </p>
              <p className="text-sm font-semibold">Bobby Lawrence Karate</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
