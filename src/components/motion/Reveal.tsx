"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delayMs?: number;
};

/** Lightweight scroll reveal — respects reduced motion via CSS. */
export function Reveal({ children, className = "", delayMs = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      queueMicrotask(() => setShow(true));
      return;
    }
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) setShow(true);
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${show ? "animate-reveal-up" : "opacity-0"} ${className}`}
      style={delayMs && show ? { animationDelay: `${delayMs}ms` } : undefined}
    >
      {children}
    </div>
  );
}
