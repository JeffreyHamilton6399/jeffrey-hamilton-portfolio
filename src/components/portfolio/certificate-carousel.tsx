"use client";

import * as React from "react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

import { certificates } from "@/lib/portfolio-data";
import { Reveal } from "./reveal";

export function CertificateCarousel() {
  return (
    <Reveal className="mt-8 sm:mt-10">
      {/* Heading */}
      <div className="mb-4 flex items-center justify-between sm:mb-3">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Certifications
        </h3>
        <span className="text-xs text-muted-foreground/60">
          {certificates.length} certificates
        </span>
      </div>

      {/* Scrollable carousel — swipe/scroll horizontally, no arrows */}
      <div
        className="cert-carousel flex gap-4 overflow-x-auto pb-2"
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
    <a
      href={cert.pdf}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative h-[210px] w-[160px] shrink-0 cursor-pointer overflow-hidden rounded-lg border border-border/60 bg-zinc-950 shadow-sm transition-transform duration-200 hover:-translate-y-1 sm:h-[260px] sm:w-[200px]"
      style={{ scrollSnapAlign: "start" }}
    >
      {failed ? (
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

      {/* Hover overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500 px-3 py-1.5 text-xs font-semibold text-white shadow-md">
          View
          <ExternalLink className="h-3 w-3" />
        </span>
      </div>

      {/* Certificate name */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent px-3 py-2">
        <p className="text-[0.7rem] font-medium leading-tight text-white">
          {cert.name}
        </p>
      </div>
    </a>
  );
}
