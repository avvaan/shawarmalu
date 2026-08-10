import { Fragment } from "react";

/**
 * The seam between scenes. Pure CSS, so it costs nothing and stops dead
 * under prefers-reduced-motion.
 */
export default function Marquee({
  words,
  tone = "ember",
  reverse = false,
  duration = 42,
}: {
  words: string[];
  tone?: "ember" | "coal";
  reverse?: boolean;
  duration?: number;
}) {
  const onEmber = tone === "ember";

  const run = (key: string) => (
    <div className="flex shrink-0 items-center" key={key} aria-hidden={key !== "a"}>
      {words.map((word, index) => (
        <Fragment key={`${key}-${word}-${index}`}>
          <span className="whitespace-nowrap px-[0.55em]">{word}</span>
          <span
            aria-hidden
            className={`h-[0.28em] w-[0.28em] shrink-0 rotate-45 ${
              onEmber ? "bg-coal/55" : "bg-ember"
            }`}
          />
        </Fragment>
      ))}
    </div>
  );

  return (
    <div
      className={`relative overflow-hidden ${
        onEmber
          ? "bg-ember text-coal"
          : "border-y border-bone/12 bg-coal text-bone/80"
      } ${reverse ? "marquee-rev" : ""}`}
    >
      <div
        className="marquee-track flex w-max items-center py-[0.7em] font-display text-[clamp(1.1rem,2.3vw,1.9rem)] font-bold uppercase tracking-[-0.02em]"
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        {run("a")}
        {run("b")}
      </div>
    </div>
  );
}
