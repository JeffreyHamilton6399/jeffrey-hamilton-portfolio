"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

import { certificates } from "@/lib/portfolio-data";
import { Reveal } from "./reveal";

export function CertificateCarousel() {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;
    // Card width + gap (200px + 16px on desktop, 160px + 16px on mobile)
    const cardWidth = window.innerWidth < 640 ? 176 : 216;
    container.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <Reveal className="mt-10">
      {/* Heading */}
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Certifications
        </h3>
        <span className="text-xs text-muted-foreground/60">
          {certificates.length} certificates
        </span>
      </div>

      {/* Carousel container with arrow buttons */}
      <div className="relative">
        {/* Left arrow — desktop only */}
        <button
          type="button"
          onClick={() => scrollByCard("left")}
          aria-label="Scroll certificates left"
          className="absolute -left-3 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border/70 bg-background/90 text-foreground shadow-md backdrop-blur transition-colors hover:border-amber-400 hover:text-amber-500 sm:flex"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {/* Scrollable carousel */}
        <div
          ref={scrollRef}
          className="cert-carousel flex gap-4 overflow-x-auto scroll-smooth pb-2"
          style={{
            scrollSnapType: "x mandatory",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {certificates.map((cert) => (
            <CertCard key={cert.name} cert={cert} />
          ))}
        </div>

        {/* Right arrow — desktop only */}
        <button
          type="button"
          onClick={() => scrollByCard("right")}
          aria-label="Scroll certificates right"
          className="absolute -right-3 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border/70 bg-background/90 text-foreground shadow-md backdrop-blur transition-colors hover:border-amber-400 hover:text-amber-500 sm:flex"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </Reveal>
  );
}

function CertCard({
  cert,
}: {
  cert: { name: string; pdf: string; preview: string };
}) {
  const [failed, setFailed] = React.useState(false);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="group relative h-[210px] w-[160px] shrink-0 cursor-pointer overflow-hidden rounded-lg border border-border/60 bg-zinc-950 shadow-sm sm:h-[260px] sm:w-[200px]"
      style={{ scrollSnapAlign: "start" }}
    >
      {failed ? (
        // Dark placeholder if preview fails
        <div className="flex h-full w-full items-center justify-center bg-zinc-900 p-4 text-center">
          <span className="text-xs font-medium text-zinc-400">{cert.name}</span>
        </div>
      ) : (
        <Image
          src={cert.preview}
          alt={`${cert.name} certificate`}
          fill
          unoptimized
          loading="lazy"
          sizes="(max-width: 640px) 160px, 200px"
          className="object-cover"
          onError={() => setFailed(true)}
        />
      )}

      {/* Hover overlay with View button */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <button
          type="button"
          onClick={() =>
            window.open(cert.pdf, "_blank", "noopener,noreferrer")
          }
          className="inline-flex items-center gap-1.5 rounded-full bg-amber-500 px-3 py-1.5 text-xs font-semibold text-white shadow-md transition-colors hover:bg-amber-600"
        >
          View
          <ExternalLink className="h-3 w-3" />
        </button>
      </div>

      {/* Certificate name — always visible at bottom */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent px-3 py-2">
        <p className="text-[0.7rem] font-medium leading-tight text-white">
          {cert.name}
        </p>
      </div>
    </motion.div>
  );
}
