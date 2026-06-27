"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Youtube,
  Coffee,
  ArrowUp,
  type LucideIcon,
} from "lucide-react";

import { profile, socials, navLinks } from "@/lib/portfolio-data";

const footerSocials: { label: string; href: string; icon: LucideIcon }[] = [
  { label: "GitHub", href: socials.github, icon: Github },
  { label: "LinkedIn", href: socials.linkedin, icon: Linkedin },
  { label: "YouTube", href: socials.youtube, icon: Youtube },
  { label: "Buy Me a Coffee", href: socials.buymeacoffee, icon: Coffee },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border/60 bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xs text-center md:text-left">
            <Link href="#top" className="inline-flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-foreground text-sm font-bold text-background">
                JH
              </span>
              <span className="text-sm font-semibold tracking-tight">
                {profile.name}
              </span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {profile.tagline}
            </p>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {footerSocials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-amber-400 hover:text-amber-600 dark:hover:border-amber-700"
              >
                <s.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-6 text-center text-xs text-muted-foreground sm:flex-row sm:text-left">
          <p>
            © {new Date().getFullYear()} {profile.name}. Built by hand, deployed
            on Vercel.
          </p>
          <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.96 }}>
            <Link
              href="#top"
              className="inline-flex items-center gap-1.5 rounded-full border border-border/60 px-3 py-1.5 font-medium transition-colors hover:border-amber-400 hover:text-foreground"
            >
              Back to top
              <ArrowUp className="h-3.5 w-3.5" />
            </Link>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
