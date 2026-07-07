"use client";

import * as React from "react";
import Image from "next/image";

// Drop animation files here — no titles needed.
// GIFs autoplay natively. For .mp4/.webm files, set type to "video".
const animationFiles = [
  { src: "/animations/TimpviewLogo1.gif", type: "gif" as const },
  { src: "/animations/TimpviewLogo2.gif", type: "gif" as const },
  { src: "/animations/TimpviewLogo3.gif", type: "gif" as const },
  { src: "/animations/TimpviewLogo4.gif", type: "gif" as const },
  { src: "/animations/TimpviewLogo5.gif", type: "gif" as const },
  { src: "/animations/TimpviewLogo6TBirdTV.gif", type: "gif" as const },
];

function AnimationTile({
  file,
}: {
  file: (typeof animationFiles)[number];
}) {
  const [failed, setFailed] = React.useState(false);

  if (failed) {
    return (
      <div className="h-24 w-36 shrink-0 rounded-lg bg-zinc-900 sm:h-28 sm:w-44" />
    );
  }

  return (
    <div className="relative h-24 w-36 shrink-0 overflow-hidden rounded-lg bg-zinc-900 sm:h-28 sm:w-44">
      {file.type === "gif" ? (
        <Image
          src={file.src}
          alt=""
          fill
          unoptimized
          loading="lazy"
          sizes="180px"
          className="object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          className="h-full w-full object-cover"
          onError={() => setFailed(true)}
        >
          <source src={file.src} type="video/mp4" />
        </video>
      )}
    </div>
  );
}

/** Auto-scrolling carousel — tiles move slowly left, infinite loop. */
export function AnimationsGallery() {
  // Duplicate the files so the loop is seamless
  const looped = [...animationFiles, ...animationFiles];

  return (
    <div className="animations-scroll relative overflow-hidden">
      <style>{`
        @keyframes animations-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animations-track {
          display: flex;
          gap: 0.5rem;
          width: max-content;
          animation: animations-marquee 40s linear infinite;
        }
        .animations-scroll:hover .animations-track {
          animation-play-state: paused;
        }
      `}</style>
      <div className="animations-track">
        {looped.map((file, i) => (
          <AnimationTile key={i} file={file} />
        ))}
      </div>
    </div>
  );
}
