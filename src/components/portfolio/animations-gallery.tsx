"use client";

import * as React from "react";
import Image from "next/image";

// Drop animation files here — no titles needed.
// GIFs autoplay natively. For .mp4/.webm files, set type to "video"
// and a <video autoplay loop muted playsinline> tag is used.
const animationFiles = [
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
    // Plain dark rectangle — no label, no icon, nothing
    return (
      <div className="relative aspect-square overflow-hidden rounded-lg bg-zinc-900" />
    );
  }

  return (
    <div className="relative aspect-square overflow-hidden rounded-lg bg-zinc-900">
      {file.type === "gif" ? (
        <Image
          src={file.src}
          alt=""
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
    </div>
  );
}

// Memoized so tiles never re-mount on parent renders.
const Tiles = React.memo(function Tiles() {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      {animationFiles.map((file, i) => (
        <AnimationTile key={i} file={file} />
      ))}
    </div>
  );
});

export function AnimationsGallery() {
  return <Tiles />;
}
