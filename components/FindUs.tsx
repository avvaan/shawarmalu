"use client";

import { useSyncExternalStore } from "react";
import DarkMap from "@/components/DarkMap";
import Magnetic from "@/components/Magnetic";
import Reveal from "@/components/Reveal";
import { shop, ui, type Lang } from "@/lib/content";

/** Minutes from midnight, per weekday. A close past 1440 spills into the next day. */
const SCHEDULE: Record<number, { open: number; close: number }> = {
  0: { open: 720, close: 1320 },
  1: { open: 660, close: 1380 },
  2: { open: 660, close: 1380 },
  3: { open: 660, close: 1380 },
  4: { open: 660, close: 1380 },
  5: { open: 660, close: 1560 },
  6: { open: 660, close: 1560 },
};

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/** Reads the clock in Orlando, not in the visitor's timezone. */
function shopNow() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date());

  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const day = Math.max(0, WEEKDAYS.indexOf(get("weekday")));
  const minutes = Number(get("hour")) % 24 * 60 + Number(get("minute"));

  const today = SCHEDULE[day];
  const yesterday = SCHEDULE[(day + 6) % 7];
  const open =
    (minutes >= today.open && minutes < today.close) ||
    (yesterday.close > 1440 && minutes < yesterday.close - 1440);

  return { day, open };
}

/** Re-reads once a minute. Null on the server, so the markup hydrates clean. */
const subscribeToMinute = (onChange: () => void) => {
  const timer = setInterval(onChange, 30_000);
  return () => clearInterval(timer);
};

export default function FindUs({ lang }: { lang: Lang }) {
  const minute = useSyncExternalStore(
    subscribeToMinute,
    () => Math.floor(Date.now() / 60_000),
    () => null,
  );
  const now = minute === null ? null : shopNow();

  const mapsHref = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    `${shop.street}, ${shop.city}, ${shop.region} ${shop.postal}`,
  )}`;

  return (
    <section id="find" className="bg-coal">
      <div className="rail py-[clamp(4rem,9vh,8rem)]">
        <div className="grid gap-x-[clamp(1.5rem,4vw,4rem)] gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="text-[length:var(--text-h1)] font-extrabold uppercase">
              {ui.find.heading[lang]}
            </h2>

            {now && (
              <p className="label mt-6 inline-flex items-center gap-2.5 text-bone/70">
                <span
                  aria-hidden
                  className={`block h-2 w-2 rounded-full ${
                    now.open ? "bg-ember" : "bg-bone/35"
                  }`}
                />
                {now.open ? ui.find.openNow[lang] : ui.find.closedNow[lang]}
              </p>
            )}

            <Reveal className="mt-10 flex flex-col" stagger={0.08} y={20}>
              <div className="border-t border-bone/14 py-6">
                <h3 className="label text-bone/40">{ui.find.address[lang]}</h3>
                <address className="mt-3 text-[1.125rem] leading-[1.45] not-italic">
                  {shop.street}
                  <br />
                  {shop.city}, {shop.region} {shop.postal}
                </address>
              </div>

              <div className="border-t border-bone/14 py-6">
                <h3 className="label text-bone/40">{ui.find.hours[lang]}</h3>
                <dl className="mt-3 flex flex-col gap-2">
                  {ui.hoursRows[lang].map((row) => {
                    const isToday = !!now && row.index.includes(now.day);
                    return (
                      <div
                        key={row.days}
                        className={`flex items-baseline gap-3 ${
                          isToday ? "text-bone" : "text-bone/60"
                        }`}
                      >
                        <dt className="shrink-0">{row.days}</dt>
                        <span aria-hidden className="leader" />
                        <dd className="tnum shrink-0">{row.time}</dd>
                        {isToday && (
                          <span className="label shrink-0 text-ember">
                            {ui.find.today[lang]}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </dl>
              </div>

              <div className="border-t border-bone/14 py-6">
                <h3 className="label text-bone/40">{ui.find.phone[lang]}</h3>
                <a
                  href={`tel:${shop.phone}`}
                  className="tnum mt-3 inline-block text-[1.125rem] transition-colors duration-300 hover:text-ember"
                >
                  {shop.phoneDisplay}
                </a>
              </div>

              <div className="border-y border-bone/14 py-6">
                <h3 className="label text-bone/40">{ui.find.delivery[lang]}</h3>
                <p className="measure mt-3 leading-[1.55] text-bone/72">
                  {ui.find.deliveryBody[lang]}
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Magnetic>
                  <a
                    href={mapsHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="label bg-ember px-6 py-4 text-coal transition-colors duration-300 hover:bg-bone"
                  >
                    {ui.find.directions[lang]}
                  </a>
                </Magnetic>
                <Magnetic>
                  <a
                    href={`tel:${shop.phone}`}
                    className="label border border-bone/25 px-6 py-4 transition-colors duration-300 hover:border-bone hover:bg-bone hover:text-coal"
                  >
                    {ui.find.call[lang]}
                  </a>
                </Magnetic>
              </div>
            </Reveal>
          </div>

          <div className="h-[380px] sm:h-[480px] lg:col-span-7 lg:h-auto lg:min-h-[560px]">
            <DarkMap label={ui.find.mapAlt[lang]} />
          </div>
        </div>
      </div>
    </section>
  );
}
