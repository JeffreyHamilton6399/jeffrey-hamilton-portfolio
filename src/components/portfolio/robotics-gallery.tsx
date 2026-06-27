"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

// More robot photos can be added here — just append to this array.
// Each entry becomes a slide in the swipeable gallery.
const robotPhotos = [
  {
    src: "/robot-vex.jpg",
    caption: "VEX robotics build from Robotics 1 & 2 coursework.",
  },
];

export function RoboticsGallery() {
  const [active, setActive] = React.useState(0);
  const [lightbox, setLightbox] = React.useState(false);

  const hasMultiple = robotPhotos.length > 1;
  const current = robotPhotos[active];

  const prev = React.useCallback(
    () => setActive((i) => (i - 1 + robotPhotos.length) % robotPhotos.length),
    []
  );
  const next = React.useCallback(
    () => setActive((i) => (i + 1) % robotPhotos.length),
    []
  );

  React.useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false);
      if (e.key === "ArrowLeft" && hasMultiple) prev();
      if (e.key === "ArrowRight" && hasMultiple) next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, hasMultiple, prev, next]);

  return (
    <div>
      <button
        type="button"
        onClick={() => setLightbox(true)}
        aria-label="View robot photo full-size"
        className="group relative block w-full overflow-hidden rounded-lg border border-border/60 bg-muted"
      >
        <div className="relative aspect-video w-full">
          <Image
            src={current.src}
            alt={current.caption}
            fill
            unoptimized
            sizes="(max-width: 768px) 90vw, 28vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent px-3 py-2 text-left text-xs font-medium text-white">
          {current.caption}
        </span>
      </button>

      {/* Swipe controls — only show when multiple photos exist */}
      {hasMultiple ? (
        <div className="mt-2 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous photo"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-colors hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="text-xs text-muted-foreground">
            {active + 1} / {robotPhotos.length}
          </span>
          <button
            type="button"
            onClick={next}
            aria-label="Next photo"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-colors hover:text-foreground"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      ) : null}

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
            onClick={() => setLightbox(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Robot photo viewer"
          >
            <button
              type="button"
              onClick={() => setLightbox(false)}
              aria-label="Close"
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </button>
            {hasMultiple ? (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    prev();
                  }}
                  aria-label="Previous photo"
                  className="absolute left-3 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-6"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    next();
                  }}
                  aria-label="Next photo"
                  className="absolute right-3 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6"
                >
                  ›
                </button>
              </>
            ) : null}
            <motion.figure
              key={active}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative max-h-[85vh] max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video w-[90vw] max-w-4xl overflow-hidden rounded-xl border border-white/15 bg-black">
                <Image
                  src={current.src}
                  alt={current.caption}
                  fill
                  unoptimized
                  sizes="90vw"
                  className="object-contain"
                />
              </div>
              <figcaption className="mt-3 text-center text-sm font-medium text-zinc-300">
                {current.caption}
              </figcaption>
            </motion.figure>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
