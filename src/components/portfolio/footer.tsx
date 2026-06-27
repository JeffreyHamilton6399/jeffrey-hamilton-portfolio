"use client";

import { motion } from "framer-motion";
import { Linkedin, Coffee, Github, Package } from "lucide-react";

import { profile, socials } from "@/lib/portfolio-data";

const footerButtons = [
  { label: "LinkedIn", href: socials.linkedin, icon: Linkedin },
  { label: "Donate", href: socials.buymeacoffee, icon: Coffee },
  { label: "GitHub", href: socials.github, icon: Github },
  { label: "Modrinth", href: socials.modrinth, icon: Package },
];

// Manually update this date when you redeploy.
const LAST_UPDATED = "June 2026";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border/60 bg-background">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 py-4 sm:px-8 md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-4">
        {/* Left — empty, balances layout on desktop */}
        <div className="hidden md:block" />

        {/* Center — name + updated date */}
        <div className="text-center">
          <span className="text-sm font-medium text-foreground">
            {profile.name}
          </span>
          <span className="mx-2 text-muted-foreground/40">·</span>
          <span className="text-sm text-muted-foreground">
            Updated {LAST_UPDATED}
          </span>
        </div>

        {/* Right — three icon buttons */}
        <div className="flex items-center justify-center gap-2.5 md:justify-end">
          {footerButtons.map((btn) => (
            <motion.a
              key={btn.label}
              href={btn.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={btn.label}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="btn-press flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 text-muted-foreground transition-all hover:border-amber-400 hover:text-amber-500 hover:shadow-[0_0_12px_rgba(245,158,11,0.25)]"
            >
              <btn.icon className="h-4 w-4" />
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  );
}
