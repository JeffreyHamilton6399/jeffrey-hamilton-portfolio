"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";

/**
 * Floating theme toggle (top-right) + back-to-top button (bottom-right).
 * No sidebar nav — removed for more room.
 */
export function FloatingControls() {
  const [showTop, setShowTop] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 400);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Floating theme toggle */}
      <div className="fixed right-4 top-4 z-40">
        <ThemeToggle />
      </div>

      {/* Floating back-to-top — fades in after 400px scroll */}
      <motion.button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        initial={false}
        animate={{ opacity: showTop ? 1 : 0, y: showTop ? 0 : 8 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ pointerEvents: showTop ? "auto" : "none" }}
        className="fixed bottom-8 right-8 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-amber-500 text-white shadow-lg shadow-amber-500/30 transition-colors hover:bg-amber-600"
      >
        <ArrowUp className="h-4 w-4" />
      </motion.button>
    </>
  );
}
