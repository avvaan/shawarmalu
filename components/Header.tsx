"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Magnetic from "@/components/Magnetic";
import type { Lang } from "@/lib/content";
import { shop, ui } from "@/lib/content";

const sections = [
  { href: "#menu", key: "menu" as const },
  { href: "#process", key: "process" as const },
  { href: "#about", key: "about" as const },
  { href: "#find", key: "find" as const },
];

export default function Header({ lang }: { lang: Lang }) {
  const [dense, setDense] = useState(false);
  const [open, setOpen] = useState(false);
  const other: Lang = lang === "ru" ? "en" : "ru";

  useEffect(() => {
    const onScroll = () => setDense(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[60] transition-[background-color,backdrop-filter,border-color] duration-500 ease-out-expo ${
          dense
            ? "border-b border-bone/12 bg-coal/88 backdrop-blur-lg"
            : "border-b border-transparent"
        }`}
      >
        <div
          className={`rail flex items-center justify-between transition-[height] duration-500 ease-out-expo ${
            dense ? "h-[58px]" : "h-[84px]"
          }`}
        >
          <Link
            href={`/${lang}`}
            className="font-display font-extrabold whitespace-nowrap uppercase leading-none transition-[font-size,letter-spacing] duration-500 ease-out-expo"
            style={{
              fontSize: dense ? "0.95rem" : "1.2rem",
              letterSpacing: dense ? "-0.02em" : "0.01em",
            }}
          >
            Shawarma <span className="text-ember">Lu</span>
          </Link>

          <nav className="hidden items-center gap-9 md:flex" aria-label={shop.name}>
            {sections.map((section) => (
              <a
                key={section.href}
                href={section.href}
                className="label group relative py-2 text-bone/62 transition-colors duration-300 hover:text-bone"
              >
                {ui.nav[section.key][lang]}
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-ember transition-[width] duration-[400ms] ease-out-expo group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4 md:gap-6">
            <div
              className="label hidden items-center gap-1.5 text-bone/60 sm:flex"
              aria-label={ui.footer.langLabel[lang]}
            >
              <span aria-current="true" className="text-bone">
                {lang.toUpperCase()}
              </span>
              <span aria-hidden>/</span>
              <Link
                href={`/${other}`}
                className="transition-colors duration-300 hover:text-ember"
              >
                {other.toUpperCase()}
              </Link>
            </div>

            <div className="hidden md:block">
              <Magnetic>
                <a
                  href="#find"
                  className="label bg-ember px-5 py-3 text-coal transition-colors duration-300 hover:bg-bone"
                >
                  {ui.nav.order[lang]}
                </a>
              </Magnetic>
            </div>

            <button
              type="button"
              onClick={() => setOpen(true)}
              className="label flex items-center gap-2.5 py-2 md:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
            >
              {ui.nav.menu[lang]}
              <span aria-hidden className="flex w-5 flex-col gap-[5px]">
                <span className="h-px w-full bg-bone" />
                <span className="h-px w-full bg-bone" />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[70] flex flex-col bg-coal md:hidden"
          >
            <div className="rail flex h-[84px] shrink-0 items-center justify-between">
              <span className="font-display text-[1.2rem] font-extrabold uppercase">
                Shawarma <span className="text-ember">Lu</span>
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="label py-2"
              >
                {lang === "ru" ? "Закрыть" : "Close"}
              </button>
            </div>

            <nav className="rail flex flex-1 flex-col justify-center gap-5">
              {sections.map((section, index) => (
                <motion.a
                  key={section.href}
                  href={section.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.06 + index * 0.06,
                    duration: 0.7,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="font-display text-[10.5vw] font-extrabold uppercase leading-[0.95] tracking-[-0.04em]"
                >
                  {ui.nav[section.key][lang]}
                </motion.a>
              ))}
            </nav>

            <div className="rail flex shrink-0 items-center justify-between border-t border-bone/12 py-6">
              <a href={`tel:${shop.phone}`} className="text-bone/70">
                {shop.phoneDisplay}
              </a>
              <Link href={`/${other}`} className="label text-bone/70">
                {other.toUpperCase()}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
