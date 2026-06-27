"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

// DROP ANIMATION FILES HERE — replace placeholder srcs with your real animation files.
// Add new entries to this array to show more tiles in the gallery.
const animationFiles = [
  { src: "/animations/TimpviewLogo3.gif", label: "Animation 1" },
  { src: "/animations/TimpviewLogo4.gif", label: "Animation 2" },
  { src: "/animations/TimpviewLogo5.gif", label: "Animation 3" },
  { src: "/animations/TimpviewLogo6TBirdTV.gif", label: "Animation 4" },
];

export function AnimationsGallery() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const close = React.useCallback(() => setOpenIndex(null), []);
  const showPrev = React.useCallback(() => {
    setOpenIndex((i) =>
      i === null ? i : (i - 1 + animationFiles.length) % animationFiles.length
    );
  }, []);
  const showNext = React.useCallback(() => {
    setOpenIndex((i) => (i === null ? i : (i + 1) % animationFiles.length));
  }, []);

  // keyboard nav
  React.useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex, close, showPrev, showNext]);

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {animationFiles.map((file, i) => (
          <button
            key={file.label}
            type="button"
            onClick={() => setOpenIndex(i)}
            aria-label={`Open ${file.label} in lightbox`}
            className="group relative aspect-video overflow-hidden rounded-lg border border-border/60 bg-muted"
          >
            <Image
              src={file.src}
              alt={file.label}
              fill
              unoptimized
              sizes="(max-width: 640px) 45vw, 20vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-2 py-1.5 text-left text-[11px] font-medium text-white">
              {file.label}
            </span>
          </button>
        ))}
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Click any tile to view it full-size. Animation files are placeholders —
        drop your own in <code className="rounded bg-muted px-1 py-0.5">/public/animations/</code>.
      </p>

      <AnimatePresence>
        {openIndex !== null ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label="Animation viewer"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close lightbox"
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                showPrev();
              }}
              aria-label="Previous animation"
              className="absolute left-3 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-2xl text-white transition-colors hover:bg-white/20 sm:left-6"
            >
              ‹
            </button>

            <motion.figure
              key={openIndex}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative max-h-[82vh] max-w-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video w-[88vw] max-w-3xl overflow-hidden rounded-xl border border-white/15 bg-black">
                <Image
                  src={animationFiles[openIndex].src}
                  alt={animationFiles[openIndex].label}
                  fill
                  unoptimized
                  sizes="88vw"
                  className="object-contain"
                />
              </div>
              <figcaption className="mt-3 text-center text-sm font-medium text-zinc-300">
                {animationFiles[openIndex].label}
              </figcaption>
            </motion.figure>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              aria-label="Next animation"
              className="absolute right-3 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-2xl text-white transition-colors hover:bg-white/20 sm:right-6"
            >
              ›
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
