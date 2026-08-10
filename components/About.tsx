"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "@/components/Reveal";
import { ui, type Lang } from "@/lib/content";

export default function About({ lang }: { lang: Lang }) {
  const frame = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = frame.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const img = el.querySelector("img");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { clipPath: "inset(0% 0% 100% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.4,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 84%", once: true },
        },
      );
      if (img) {
        gsap.fromTo(
          img,
          { scale: 1.16 },
          {
            scale: 1,
            duration: 1.8,
            ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 84%", once: true },
          },
        );
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="bg-coal">
      <div className="rail py-[clamp(4rem,9vh,8rem)]">
        <div
          ref={frame}
          className="relative aspect-4/3 w-full overflow-hidden bg-coal sm:aspect-16/9 lg:aspect-21/9"
        >
          <Image
            src="/media/counter.png"
            alt={ui.about.imageAlt[lang]}
            fill
            loading="lazy"
            quality={70}
            sizes="100vw"
            className="object-cover"
          />
        </div>

        <div className="mt-12 grid gap-x-[clamp(1.5rem,4vw,4rem)] gap-y-8 lg:grid-cols-12">
          <h2 className="text-[length:var(--text-h1)] font-extrabold uppercase lg:col-span-4">
            {ui.about.heading[lang]}
          </h2>

          <Reveal
            className="flex flex-col gap-5 text-[1.0625rem] leading-[1.6] text-bone/72 lg:col-span-8 lg:columns-2 lg:gap-x-[clamp(1.5rem,3vw,3rem)] lg:block"
            stagger={0.12}
            y={22}
          >
            {ui.about.body[lang].map((paragraph, index) => (
              <p
                key={index}
                className={`break-inside-avoid ${index > 0 ? "lg:mt-5" : ""} ${
                  index === 0 ? "text-bone/92" : ""
                }`}
              >
                {paragraph}
              </p>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
