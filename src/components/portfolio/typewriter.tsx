"use client";

import * as React from "react";

/**
 * Types out `text` one character at a time, shows a blinking cursor while
 * typing, then fades the cursor out once finished. Types once — no loop.
 */
export function Typewriter({
  text,
  speed = 55,
  startDelay = 250,
  className,
}: {
  text: string;
  speed?: number;
  startDelay?: number;
  className?: string;
}) {
  const [shown, setShown] = React.useState("");
  const [typing, setTyping] = React.useState(false);
  const [cursorVisible, setCursorVisible] = React.useState(true);

  React.useEffect(() => {
    let typingTimer: ReturnType<typeof setTimeout>;
    let fadeTimer: ReturnType<typeof setTimeout>;

    const startTimer = setTimeout(() => {
      setTyping(true);
      let i = 0;
      const step = () => {
        i += 1;
        setShown(text.slice(0, i));
        if (i < text.length) {
          typingTimer = setTimeout(step, speed);
        } else {
          setTyping(false);
          fadeTimer = setTimeout(() => setCursorVisible(false), 900);
        }
      };
      step();
    }, startDelay);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(typingTimer);
      clearTimeout(fadeTimer);
    };
  }, [text, speed, startDelay]);

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden>{shown}</span>
      <span
        aria-hidden
        className="ml-0.5 inline-block w-[2px] -translate-y-[1px] self-center bg-amber-500 transition-opacity duration-500"
        style={{
          height: "1.05em",
          opacity: cursorVisible ? 1 : 0,
          animation: typing ? "tw-blink 1s steps(2, start) infinite" : undefined,
        }}
      />
    </span>
  );
}
