"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";

/**
 * Fullscreen modal that runs a single-file HTML game inside an iframe.
 * Used by Echo Heist (and any future single-HTML game).
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
  // Keyboard: Escape to close
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    // Lock background scroll while open
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
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 p-3 backdrop-blur-sm sm:p-6"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`Play ${title}`}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close game"
            className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6 sm:top-6"
          >
            <X className="h-5 w-5" />
          </button>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative flex h-full w-full max-w-5xl flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-2 flex items-center justify-between px-1">
              <p className="text-sm font-semibold text-white">{title}</p>
              {fallbackLink ? (
                <a
                  href={fallbackLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-400 transition-colors hover:text-white"
                >
                  Open in new tab
                  <ExternalLink className="h-3 w-3" />
                </a>
              ) : null}
            </div>
            <div className="relative flex-1 overflow-hidden rounded-xl border border-white/15 bg-black shadow-2xl">
              {/* Drop echo-heist.html into project root and update src here */}
              <iframe
                src={src}
                title={title}
                className="h-full w-full border-none"
                allow="autoplay; fullscreen; gamepad"
                allowFullScreen
              />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
