"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { counters, type Lang } from "@/lib/content";

export default function Counters({ lang }: { lang: Lang }) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      el.querySelectorAll<HTMLElement>("[data-count]").forEach((node) => {
        const target = Number(node.dataset.count);
        const box = { value: 0 };
        node.textContent = "0";
        gsap.to(box, {
          value: target,
          duration: 1.9,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 78%", once: true },
          onUpdate: () => {
            node.textContent = String(Math.round(box.value));
          },
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-ember text-coal">
      <div
        ref={host}
        className="rail grid gap-y-10 py-[clamp(3.5rem,8vh,6rem)] sm:grid-cols-3 sm:gap-x-8"
      >
        {counters.map((counter, index) => (
          <div
            key={counter.label.en}
            className={
              index > 0
                ? "border-t border-coal/22 pt-9 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-8"
                : ""
            }
          >
            <p className="tnum font-display text-[length:var(--text-num)] font-extrabold leading-[0.82] tracking-[-0.05em]">
              <span data-count={counter.value}>{counter.value}</span>
            </p>
            <p className="label mt-4 text-coal/72">{counter.label[lang]}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
