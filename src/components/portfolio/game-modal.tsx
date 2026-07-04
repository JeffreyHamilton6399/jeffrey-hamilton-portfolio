"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";

/**
 * Near-fullscreen modal that runs a single-file HTML game inside an iframe.
 * Used by Echo Heist (and any future single-HTML game).
 * Solid black background, iframe fills the whole modal.
 */
export function GameModal({
  open,
  onClose,
  src,
  title,
  fallbackLink,
}: {
  open: boolean;
  onClose: () => void;
  src: string;
  title: string;
  fallbackLink?: string;
}) {
  // Keyboard: Escape to close + lock background scroll
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          // Solid black, near-fullscreen (90vw × 90vh), centered
          className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-black p-3 sm:p-6"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`Play ${title}`}
        >
          {/* Large close button — top-right, high-contrast, easy to tap on mobile */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close game"
            className="absolute right-3 top-3 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/40 bg-white/20 text-white shadow-lg backdrop-blur transition-colors hover:bg-white/40 sm:right-6 sm:top-6"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Optional fallback link — top-left */}
          {fallbackLink ? (
            <a
              href={fallbackLink}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute left-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-medium text-zinc-200 transition-colors hover:bg-white/25 sm:left-6 sm:top-6"
            >
              Open in new tab
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          ) : null}

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative h-[90vh] w-[90vw] max-w-6xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Title bar */}
            <p className="mb-2 text-center text-sm font-semibold text-white">
              {title}
            </p>
            {/* Iframe fills the entire modal — no border, no distracting chrome */}
            {/* Drop echo-heist.html into project root and update src here */}
            <iframe
              src={src}
              title={title}
              className="h-[calc(90vh-2rem)] w-full rounded-lg border-none bg-black"
              allow="autoplay; fullscreen; gamepad; pointer-lock"
              allowFullScreen
            />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
