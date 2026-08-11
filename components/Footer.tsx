import Magnetic from "@/components/Magnetic";
import { shop, ui } from "@/lib/content";

export default function Footer() {

  return (
    <footer className="relative overflow-hidden bg-coal pt-[clamp(3rem,7vh,5rem)]">
      <div className="rail flex flex-wrap items-start justify-between gap-8 border-t border-bone/14 pt-8">
        <ul className="flex flex-wrap gap-x-7 gap-y-3">
          {shop.socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="label group relative inline-block py-1 text-bone/62 transition-colors duration-300 hover:text-bone"
              >
                {social.label}
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-ember transition-[width] duration-[400ms] ease-out-expo group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <Magnetic>
          <a
            href="#top"
            className="label group flex items-center gap-3 border border-bone/25 px-5 py-3 transition-colors duration-300 hover:border-bone hover:bg-bone hover:text-coal"
          >
            <svg
              width="14"
              height="16"
              viewBox="0 0 14 16"
              fill="none"
              aria-hidden
              className="transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5"
            >
              <path
                d="M7 15V1M1 7L7 1L13 7"
                stroke="currentColor"
                strokeWidth="1.6"
              />
            </svg>
            {ui.footer.top}
          </a>
        </Magnetic>
      </div>

      <div className="rail mt-[clamp(3rem,8vh,6rem)]">
        <svg
          viewBox="0 0 1000 176"
          role="img"
          aria-label={shop.name}
          className="w-full"
        >
          <title>{shop.name}</title>
          <text
            x="0"
            y="140"
            textLength="1000"
            lengthAdjust="spacing"
            fontSize="146"
            fontWeight="800"
            wordSpacing="26"
            className="fill-bone font-display uppercase"
          >
            SHAWARMA LU
          </text>
        </svg>
      </div>

      <div className="rail flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-t border-bone/14 py-6 text-[0.8125rem] text-bone/60">
        <p>
          © {new Date().getFullYear()} {shop.name}. {ui.footer.rights}.
        </p>
        <p className="tnum">
          {shop.street}, {shop.city}, {shop.region} · {shop.phoneDisplay}
        </p>
      </div>
    </footer>
  );
}
