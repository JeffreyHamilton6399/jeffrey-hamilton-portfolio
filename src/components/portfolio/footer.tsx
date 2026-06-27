"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

import { profile } from "@/lib/portfolio-data";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border/60 bg-background">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-10 sm:px-6">
        <p className="text-sm font-semibold tracking-tight">
          {profile.name}
        </p>
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
