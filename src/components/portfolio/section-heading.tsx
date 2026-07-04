"use client";

import * as React from "react";
import { Reveal } from "./reveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
}) {
  const alignment =
    align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl text-left";
  return (
    <Reveal className={alignment}>
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-600 dark:text-amber-500">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:mt-4 sm:text-base">
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
