"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";
import { useFinePointer, useReducedMotion } from "@/lib/hooks";
import { money, type Lang, type MenuItem } from "@/lib/content";

export default function MenuCard({
  item,
  lang,
  index,
}: {
  item: MenuItem;
  lang: Lang;
  index: number;
}) {
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const tiltable = fine && !reduced;
  const host = useRef<HTMLDivElement>(null);

  const tilt = (event: React.PointerEvent<HTMLElement>) => {
    const el = host.current;
    if (!el || !tiltable) return;
    const box = el.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;
    gsap.to(el, {
      rotateY: x * 11,
      rotateX: -y * 11,
      duration: 0.7,
      ease: "expo.out",
      transformPerspective: 900,
      transformOrigin: "center",
    });
  };

  const settle = () => {
    const el = host.current;
    if (!el || !tiltable) return;
    gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.9, ease: "expo.out" });
  };

  const alt =
    lang === "ru"
      ? `${item.name.ru} — шаурма в разрезе крупным планом`
      : `${item.name.en} — shawarma in close cross-section`;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1],
        layout: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
      }}
      onPointerMove={tilt}
      onPointerLeave={settle}
      data-cursor="hot"
      className="group flex items-center gap-5 border-b border-coal/14 py-5 sm:block sm:border-0 sm:py-0"
    >
      <div ref={host} className="contents sm:block sm:[transform-style:preserve-3d]">
        <div className="relative aspect-4/5 w-24 shrink-0 overflow-hidden bg-coal sm:w-full">
          <Image
            src={item.image}
            alt={alt}
            fill
            loading={index < 4 ? "eager" : "lazy"}
            quality={70}
            sizes="(max-width: 640px) 96px, (max-width: 1024px) 44vw, 23vw"
            className="object-cover transition-[transform,filter] duration-[900ms] ease-out-expo group-hover:scale-[1.07] group-hover:brightness-[1.14]"
          />
          <span className="pointer-events-none absolute inset-0 bg-ember opacity-0 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-25" />
        </div>

        <div className="min-w-0 flex-1 sm:mt-5">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-[clamp(0.95rem,1.15vw,1.1rem)] font-bold uppercase leading-[1.15] tracking-[-0.02em]">
              {item.name[lang]}
            </h3>
            <span className="tnum shrink-0 font-display text-[clamp(0.95rem,1.15vw,1.1rem)] font-bold leading-[1.15]">
              {money(item.price)}
            </span>
          </div>
          <p className="mt-2 text-[0.9rem] leading-[1.45] text-coal/62">
            {item.note[lang]}
          </p>
        </div>
      </div>
    </motion.article>
  );
}
