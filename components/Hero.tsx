"use client";

import Image from "next/image";
import { useState } from "react";
import Magnetic from "@/components/Magnetic";
import { useMotionOK } from "@/lib/hooks";
import type { Lang } from "@/lib/content";
import { ui } from "@/lib/content";

const WORDMARK = ["SHAWARMA", "LU"];

export default function Hero({ lang }: { lang: Lang }) {
  const { rich } = useMotionOK();
  const [videoReady, setVideoReady] = useState(false);
  let charIndex = 0;

  return (
    <section className="relative isolate flex h-[100svh] min-h-[600px] flex-col justify-end overflow-hidden">
      {/* The still is the LCP and the video's own poster: it stays under the
          video so a blocked or slow file never leaves a black screen. */}
      <Image
        src="/media/hero-spit.png"
        alt={ui.hero.videoAlt[lang]}
        fill
        preload
        quality={70}
        sizes="100vw"
        className="object-cover object-[70%_center]"
      />

      {rich && (
        <video
          aria-hidden
          muted
          loop
          autoPlay
          playsInline
          preload="metadata"
          onCanPlay={() => setVideoReady(true)}
          className={`absolute inset-0 h-full w-full object-cover object-[70%_center] transition-opacity duration-1000 ease-out-expo ${
            videoReady ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src="/media/hero-spit.mp4" type="video/mp4" />
        </video>
      )}

      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_top,var(--color-coal)_4%,color-mix(in_oklab,var(--color-coal)_72%,transparent)_36%,transparent_72%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-coal)_0%,color-mix(in_oklab,var(--color-coal)_55%,transparent)_38%,transparent_66%)]"
      />
      <div aria-hidden className="soot-layer" />

      <div className="rail relative z-10 pb-[clamp(2.5rem,7vh,5rem)]">
        <h1
          aria-label={`${WORDMARK[0]} ${WORDMARK[1]}`}
          className="font-display text-[length:var(--text-mega)] font-extrabold uppercase leading-[0.82] tracking-[-0.045em]"
        >
          {WORDMARK.map((word, wordIndex) => (
            <span key={word} className="block">
              {Array.from(word).map((letter) => {
                const delay = 0.22 + charIndex++ * 0.035;
                return (
                  <span
                    key={`${word}-${charIndex}`}
                    aria-hidden
                    className="char-mask"
                  >
                    <span
                      className={`char ${wordIndex === 1 ? "text-ember" : ""}`}
                      style={{ animationDelay: `${delay}s` }}
                    >
                      {letter}
                    </span>
                  </span>
                );
              })}
            </span>
          ))}
        </h1>

        <div className="mt-8 flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-[26ch] text-[clamp(1.05rem,1.5vw,1.375rem)] leading-[1.45] text-bone/78">
            {ui.hero.line[lang]}
          </p>

          <Magnetic>
            <a
              href="#menu"
              className="label group flex items-center gap-3 bg-ember px-7 py-4 text-coal transition-colors duration-300 hover:bg-bone"
            >
              {ui.hero.cta[lang]}
              <svg
                width="16"
                height="10"
                viewBox="0 0 16 10"
                fill="none"
                aria-hidden
                className="transition-transform duration-500 ease-out-expo group-hover:translate-y-0.5"
              >
                <path
                  d="M1 1L8 8.5L15 1"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
              </svg>
            </a>
          </Magnetic>
        </div>
      </div>

      <div
        aria-hidden
        className="absolute right-[var(--rail)] bottom-[38%] z-10 hidden flex-col items-center gap-4 md:flex"
      >
        <span
          className="label text-bone/45"
          style={{ writingMode: "vertical-rl" }}
        >
          {ui.hero.scroll[lang]}
        </span>
        <span className="relative block h-16 w-px overflow-hidden bg-bone/20">
          <span className="cue-run absolute inset-x-0 top-0 h-1/2 bg-ember" />
        </span>
      </div>
    </section>
  );
}
