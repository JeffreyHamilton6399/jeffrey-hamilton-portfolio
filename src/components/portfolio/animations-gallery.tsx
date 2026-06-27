"use client";

import * as React from "react";
import Image from "next/image";
import { Film } from "lucide-react";

// DROP ANIMATION FILES HERE and replace src paths.
// GIFs autoplay natively. For .mp4/.webm files, a <video> tag is used
// with autoplay loop muted playsinline so they play silently like a GIF.
// Add new entries to show more tiles.
const animationFiles = [
  { src: "/animations/TimpviewLogo3.gif", label: "Animation 1", type: "gif" as const },
  { src: "/animations/TimpviewLogo4.gif", label: "Animation 2", type: "gif" as const },
  { src: "/animations/TimpviewLogo5.gif", label: "Animation 3", type: "gif" as const },
  { src: "/animations/TimpviewLogo6TBirdTV.gif", label: "Animation 4", type: "gif" as const },
];

function AnimationTile({
  file,
}: {
  file: (typeof animationFiles)[number];
}) {
  const [failed, setFailed] = React.useState(false);

  if (failed) {
    // Dark placeholder shown if file fails to load
    return (
      <div className="relative aspect-square overflow-hidden rounded-lg border border-white/10 bg-zinc-900">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 text-zinc-600">
          <Film className="h-5 w-5" />
          <span className="text-[10px] font-medium">{file.label}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative aspect-square overflow-hidden rounded-lg border border-white/10 bg-zinc-900">
      {file.type === "gif" ? (
        <Image
          src={file.src}
          alt={file.label}
          fill
          unoptimized
          sizes="(max-width: 640px) 28vw, 18vw"
          className="object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        // For .mp4/.webm files — autoplay silently like a GIF
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
          onError={() => setFailed(true)}
        >
          <source src={file.src} type="video/mp4" />
        </video>
      )}
      <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-2 py-1 text-left text-[10px] font-medium text-white">
        {file.label}
      </span>
    </div>
  );
}

// Memoized so tiles never re-mount on parent renders.
const Tiles = React.memo(function Tiles() {
  return (
    <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4">
      {animationFiles.map((file) => (
        <AnimationTile key={file.label} file={file} />
      ))}
    </div>
  );
});

export function AnimationsGallery() {
  return <Tiles />;
}
