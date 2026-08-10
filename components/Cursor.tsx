"use client";

import { useEffect, useRef, useState } from "react";
import { useFinePointer, useReducedMotion } from "@/lib/hooks";

/**
 * Desktop-only cursor: a bone dot on the pointer, an ember ring trailing it.
 * Touch, coarse pointers and reduced-motion users keep the native cursor —
 * the native one is never hidden until this has mounted.
 */
export default function Cursor() {
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const live = fine && !reduced;

  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hot, setHot] = useState(false);

  useEffect(() => {
    if (!live) return;

    document.documentElement.classList.add("cursor-live");

    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const trail = { ...pointer };
    let frame = 0;

    const move = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      setVisible(true);
      const target = event.target as HTMLElement | null;
      setHot(
        !!target?.closest?.(
          'a, button, [role="button"], input, [data-cursor="hot"]',
        ),
      );
    };

    const leave = () => setVisible(false);

    const tick = () => {
      trail.x += (pointer.x - trail.x) * 0.16;
      trail.y += (pointer.y - trail.y) * 0.16;
      if (dot.current) {
        dot.current.style.transform = `translate3d(${pointer.x}px, ${pointer.y}px, 0) translate(-50%, -50%)`;
      }
      if (ring.current) {
        ring.current.style.transform = `translate3d(${trail.x}px, ${trail.y}px, 0) translate(-50%, -50%)`;
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    window.addEventListener("blur", leave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      window.removeEventListener("blur", leave);
      document.documentElement.classList.remove("cursor-live");
    };
  }, [live]);

  if (!live) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[90]">
      <div
        ref={ring}
        className="absolute top-0 left-0 rounded-full border border-ember transition-[width,height,background-color,opacity] duration-300 ease-out-expo"
        style={{
          width: hot ? 58 : 32,
          height: hot ? 58 : 32,
          opacity: visible ? 1 : 0,
          backgroundColor: hot ? "rgba(228, 83, 27, 0.14)" : "transparent",
        }}
      />
      <div
        ref={dot}
        className="absolute top-0 left-0 rounded-full bg-bone transition-opacity duration-200"
        style={{ width: 5, height: 5, opacity: visible && !hot ? 1 : 0 }}
      />
    </div>
  );
}
