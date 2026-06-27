"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUp, Linkedin, Coffee, Github } from "lucide-react";

import { profile, socials } from "@/lib/portfolio-data";

const footerButtons = [
  {
    label: "LinkedIn",
    href: socials.linkedin,
    icon: Linkedin,
  },
  {
    label: "Donate",
    href: socials.buymeacoffee,
    icon: Coffee,
  },
  {
    label: "GitHub",
    href: socials.github,
    icon: Github,
  },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border/60 bg-background">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-4 py-10 sm:px-6">
        <p className="text-base font-semibold tracking-tight">
          {profile.name}
        </p>

        {/* Social buttons — single row */}
        <div className="flex items-center gap-2.5">
          {footerButtons.map((btn) => (
            <motion.a
              key={btn.label}
              href={btn.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={btn.label}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="btn-press inline-flex items-center gap-1.5 rounded-full border border-border/60 px-3.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-amber-400 hover:text-foreground"
            >
              <btn.icon className="h-3.5 w-3.5" />
              {btn.label}
            </motion.a>
          ))}
        </div>

        <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.96 }}>
          <Link
            href="#top"
            className="inline-flex items-center gap-1.5 rounded-full border border-border/60 px-4 py-1.5 text-sm font-medium transition-colors hover:border-amber-400 hover:text-foreground"
          >
            Back to Top
            <ArrowUp className="h-3.5 w-3.5" />
          </Link>
        </motion.div>

        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} {profile.name}
        </p>
      </div>
    </footer>
  );
}
