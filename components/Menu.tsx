"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, MotionConfig } from "framer-motion";
import MenuCard from "@/components/MenuCard";
import Reveal from "@/components/Reveal";
import { menu, ui, type Lang } from "@/lib/content";

const FILTERS = ["all", "meat", "spicy", "veg"] as const;
type Filter = (typeof FILTERS)[number];

export default function Menu({ lang }: { lang: Lang }) {
  const [filter, setFilter] = useState<Filter>("all");

  const shown = useMemo(
    () =>
      filter === "all"
        ? menu
        : menu.filter((item) => item.tags.includes(filter)),
    [filter],
  );

  return (
    <section id="menu" className="paper on-paper">
      <div className="rail py-[clamp(4rem,9vh,8rem)]">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 className="text-[length:var(--text-h1)] font-extrabold uppercase">
            {ui.menu.heading[lang]}
          </h2>
          <p className="max-w-[30ch] text-[1.0625rem] leading-[1.5] text-coal/65 md:text-right">
            {ui.menu.sub[lang]}
          </p>
        </Reveal>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-x-8 gap-y-5 border-t border-coal/20 pt-6">
          <div className="flex flex-wrap gap-2" role="group">
            {FILTERS.map((key) => {
              const active = filter === key;
              return (
                <button
                  key={key}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(key)}
                  className={`label px-4 py-2.5 transition-colors duration-300 ${
                    active
                      ? "bg-ember text-coal"
                      : "border border-coal/22 text-coal/70 hover:border-coal hover:text-coal"
                  }`}
                >
                  {ui.menu.filters[key][lang]}
                </button>
              );
            })}
          </div>

          <p className="label tnum text-coal/62" aria-live="polite">
            {shown.length} {ui.menu.count[lang]}
          </p>
        </div>

        <MotionConfig reducedMotion="user">
          <div className="mt-10 sm:mt-14 sm:grid sm:grid-cols-2 sm:gap-x-[clamp(1rem,2.4vw,2.25rem)] sm:gap-y-14 lg:grid-cols-4">
            <AnimatePresence mode="popLayout" initial={false}>
              {shown.map((item, index) => (
                <MenuCard
                  key={item.id}
                  item={item}
                  lang={lang}
                  index={index}
                />
              ))}
            </AnimatePresence>
          </div>
        </MotionConfig>
      </div>
    </section>
  );
}
