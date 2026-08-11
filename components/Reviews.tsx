import Reveal from "@/components/Reveal";
import { reviews, ui } from "@/lib/content";

/** Two of the six are printed on paper — the wall behind the till, not a carousel. */
const PAPER = new Set([1, 4]);
const LOUD = new Set([0, 3]);

export default function Reviews() {
  return (
    <section className="bg-coal">
      <div className="rail py-[clamp(4rem,9vh,8rem)]">
        <h2 className="text-[length:var(--text-h1)] font-extrabold uppercase">
          {ui.reviews.heading}
        </h2>

        <Reveal
          className="group/list mt-12 gap-5 sm:columns-2 lg:columns-3"
          stagger={0.07}
          y={26}
        >
          {reviews.map((review, index) => {
            const onPaper = PAPER.has(index);
            return (
              <figure
                key={review.author}
                className={`mb-5 break-inside-avoid p-7 transition-[opacity,border-color,transform] duration-500 ease-out-expo group-hover/list:opacity-45 hover:-translate-y-1 hover:opacity-100! ${
                  onPaper
                    ? "paper on-paper hover:shadow-[0_18px_40px_-24px_rgba(0,0,0,0.9)]"
                    : "border border-bone/14 hover:border-ember"
                } ${LOUD.has(index) ? "py-9" : ""}`}
              >
                <blockquote
                  className={`${
                    LOUD.has(index)
                      ? "font-display text-[clamp(1.15rem,1.7vw,1.5rem)] font-medium leading-[1.25] tracking-[-0.02em]"
                      : "text-[1.0625rem] leading-[1.55]"
                  } ${onPaper ? "text-coal" : "text-bone/88"}`}
                >
                  {review.text}
                </blockquote>
                <figcaption
                  className={`mt-6 flex items-center gap-2.5 label ${
                    onPaper ? "text-coal/62" : "text-bone/60"
                  }`}
                >
                  <span className={onPaper ? "text-coal" : "text-ember"}>
                    {review.author}
                  </span>
                  <span
                    aria-hidden
                    className={`h-[0.3em] w-[0.3em] rotate-45 ${
                      onPaper ? "bg-coal/35" : "bg-bone/30"
                    }`}
                  />
                  <span>{review.source}</span>
                </figcaption>
              </figure>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
