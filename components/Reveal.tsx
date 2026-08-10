"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Stagger between direct children, in seconds. */
  stagger?: number;
  y?: number;
  start?: string;
};

/**
 * Lifts its direct children into place on scroll.
 *
 * The markup ships visible: the hidden state is only ever set from JS, so
 * no-JS and reduced-motion readers get the finished page immediately.
 */
export default function Reveal({
  children,
  as: Tag = "div",
  className,
  stagger = 0.09,
  y = 30,
  start = "top 86%",
}: Props) {
  const host = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const targets = Array.from(el.children) as HTMLElement[];
    if (!targets.length) return;

    const ctx = gsap.context(() => {
      gsap.set(targets, { opacity: 0, y });
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 1.15,
        ease: "expo.out",
        stagger,
        scrollTrigger: { trigger: el, start, once: true },
      });
    }, el);

    return () => ctx.revert();
  }, [stagger, y, start]);

  return (
    <Tag ref={host} className={className}>
      {children}
    </Tag>
  );
}
