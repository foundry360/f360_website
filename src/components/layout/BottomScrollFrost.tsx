"use client";

import { useEffect, useState } from "react";

type BottomScrollFrostProps = {
  /**
   * Frost stays off until this section enters the viewport (or is scrolled above).
   * Home: use the third band (`difference`) so hero + StatBand + Services stay clear.
   */
  activateAfterId: string;
};

/**
 * Thin fixed bottom gradient. Visibility follows scroll relative to
 * `activateAfterId` so early page sections stay unaffected.
 */
export function BottomScrollFrost({ activateAfterId }: BottomScrollFrostProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const read = () => {
      const node = document.getElementById(activateAfterId);
      if (!node) {
        setVisible(false);
        return;
      }
      const { top, bottom } = node.getBoundingClientRect();
      const vh = window.innerHeight;
      // On: third section is entering from below, or we have scrolled past it.
      setVisible(top < vh || bottom < 0);
    };

    read();
    window.addEventListener("scroll", read, { passive: true });
    window.addEventListener("resize", read, { passive: true });
    return () => {
      window.removeEventListener("scroll", read);
      window.removeEventListener("resize", read);
    };
  }, [activateAfterId]);

  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed inset-x-0 bottom-0 z-40 h-28 bg-gradient-to-t from-background/14 from-0% via-background/5 via-[50%] to-transparent to-[92%] transition-opacity duration-500 ease-out motion-reduce:transition-none ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}
