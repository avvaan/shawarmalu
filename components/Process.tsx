"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { steps, ui } from "@/lib/content";
import imageLoader from "@/lib/imageLoader";
import { useMotionOK } from "@/lib/hooks";

/**
 * Desktop: the section pins and the four frames travel sideways with the scroll.
 * Touch and reduced-motion: the same four frames on a native snap rail — the
 * cheap analogue, not a cut-down version.
 */
export default function Process() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const { rich } = useMotionOK();

  useEffect(() => {
    const sectionEl = section.current;
    const trackEl = track.current;
    if (!sectionEl || !trackEl) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          const distance = () =>
            Math.max(0, trackEl.scrollWidth - window.innerWidth + 24);

          gsap.to(trackEl, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: {
              trigger: sectionEl,
              start: "top top",
              end: () => `+=${distance()}`,
              pin: true,
              scrub: 0.7,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                if (bar.current) {
                  bar.current.style.transform = `scaleX(${self.progress})`;
                }
              },
            },
          });
        },
      );

      return () => mm.revert();
    }, sectionEl);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={section}
      id="process"
      className="relative overflow-hidden bg-coal md:flex md:h-[100svh] md:flex-col md:justify-center md:gap-9 md:pt-16"
    >
      <div className="rail flex items-end justify-between gap-6 pt-[clamp(4rem,9vh,7rem)] pb-8 md:pt-0 md:pb-0">
        <h2 className="text-[length:var(--text-h1)] font-extrabold uppercase">
          {ui.process.heading}
        </h2>
        <p className="label hidden shrink-0 pb-2 text-bone/60 md:block">
          {ui.process.hint}
        </p>
      </div>

      <div className="snap-x snap-mandatory overflow-x-auto pb-[clamp(3rem,7vh,5rem)] motion-safe:md:overflow-visible md:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div
          ref={track}
          className="flex w-max gap-4 px-[var(--rail)] md:gap-8"
        >
          {steps.map((step) => (
            <figure
              key={step.n}
              className="w-[78vw] shrink-0 snap-center sm:w-[56vw] md:w-[42vw] lg:w-[34vw]"
            >
              <div className="relative aspect-3/2 overflow-hidden bg-coal">
                {step.kind === "video" && rich ? (
                  <video
                    aria-label={step.title}
                    muted
                    loop
                    autoPlay
                    playsInline
                    preload="metadata"
                    // sources live outside public/, so reach for the built ladder
                    poster={imageLoader({ src: step.poster!, width: 1440 })}
                    className="h-full w-full object-cover"
                  >
                    <source src={step.media} type="video/mp4" />
                  </video>
                ) : (
                  <Image
                    src={step.kind === "video" ? step.poster! : step.media}
                    alt={`${step.title} — ${step.body}`}
                    fill
                    loading="lazy"
                    quality={70}
                    sizes="(max-width: 768px) 78vw, 40vw"
                    className="object-cover"
                  />
                )}
                <span className="absolute top-4 left-4 label tnum bg-coal/70 px-2.5 py-1.5 text-ember backdrop-blur-sm">
                  {step.n}
                </span>
              </div>
              <figcaption className="mt-6 max-w-[38ch]">
                <h3 className="text-[length:var(--text-h3)] font-bold uppercase">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-[1rem] leading-[1.5] text-bone/62">
                  {step.body}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className="rail hidden md:block">
        <span className="block h-px w-full bg-bone/15">
          <span
            ref={bar}
            className="block h-px w-full origin-left scale-x-0 bg-ember"
          />
        </span>
      </div>
    </section>
  );
}
