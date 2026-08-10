"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useFinePointer, useReducedMotion } from "@/lib/hooks";

/**
 * Pulls its child toward the pointer. Fine pointers only — on touch the
 * child is an ordinary button with no wrapper behaviour at all.
 */
export default function Magnetic({
  children,
  className,
  strength = 0.34,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const active = fine && !reduced;
  const host = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el || !active) return;

    const moveX = gsap.quickTo(el, "x", { duration: 0.55, ease: "expo.out" });
    const moveY = gsap.quickTo(el, "y", { duration: 0.55, ease: "expo.out" });

    const move = (event: PointerEvent) => {
      const box = el.getBoundingClientRect();
      moveX((event.clientX - (box.left + box.width / 2)) * strength);
      moveY((event.clientY - (box.top + box.height / 2)) * strength);
    };

    const reset = () => {
      moveX(0);
      moveY(0);
    };

    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", reset);

    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", reset);
      gsap.killTweensOf(el);
      gsap.set(el, { x: 0, y: 0 });
    };
  }, [active, strength]);

  return (
    <span ref={host} className={`inline-flex ${className ?? ""}`}>
      {children}
    </span>
  );
}
