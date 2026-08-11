import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Geologica, Golos_Text } from "next/font/google";
import "../globals.css";
import { LANGS, isLang, openingHours, shop, ui } from "@/lib/content";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";

const geologica = Geologica({
  variable: "--font-geologica",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "700", "800"],
  display: "swap",
});

const golos = Golos_Text({
  variable: "--font-golos",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};

  const title = ui.meta.title[lang];
  const description = ui.meta.description[lang];

  return {
    metadataBase: new URL(shop.url),
    title,
    description,
    alternates: {
      canonical: `/${lang}`,
      languages: { ru: "/ru", en: "/en", "x-default": "/ru" },
    },
    openGraph: {
      type: "website",
      title,
      description,
      url: `/${lang}`,
      siteName: shop.name,
      locale: lang === "ru" ? "ru_RU" : "en_US",
      images: [
        {
          url: "/og.jpg",
          width: 1200,
          height: 630,
          alt: ui.hero.videoAlt[lang],
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og.jpg"],
    },
    icons: { icon: "/favicon.ico" },
  };
}

function restaurantSchema(lang: "ru" | "en") {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: shop.name,
    description: ui.meta.description[lang],
    url: `${shop.url}/${lang}`,
    image: `${shop.url}/og.jpg`,
    telephone: shop.phone,
    priceRange: shop.priceRange,
    servesCuisine: lang === "ru" ? ["Ближневосточная", "Шаурма"] : ["Middle Eastern", "Shawarma"],
    acceptsReservations: false,
    address: {
      "@type": "PostalAddress",
      streetAddress: shop.street,
      addressLocality: shop.city,
      addressRegion: shop.region,
      postalCode: shop.postal,
      addressCountry: shop.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: shop.lat, longitude: shop.lon },
    openingHoursSpecification: openingHours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    sameAs: shop.socials.map((s) => s.href),
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  return (
    <html lang={lang} className={`${geologica.variable} ${golos.variable}`}>
      <body>
        {/*
          THESIS: a shawarma counter is a working place, not a cosy cafe — this page
          is the price board at the grill, and it refuses the all-dark landing that
          never leaves its own gloom.
          OWN-WORLD: warm charcoal #0C0B0A, greaseproof bone #E9E0D2, ember #E4531B.
          Ember is ink and firelight, never a CSS glow. One bone sheet of paper
          inverts the middle of the page. Geologica cut hard, Golos Text set quiet.
          STORY: this is real fire cooking, eight things done the same way daily,
          fifteen minutes from you — so go, or call.
          FIRST VIEWPORT: full-bleed spit video, wordmark set mega across the lower
          left, one line of copy, ember menu button, hairline scroll rule at right.
          FORM: brief-pinned direction (Blackhouse mood, 2026 execution); no roll.
          FINISH: unreviewed and undocumented is unfinished; this build ends with
          the finish review, the verdict, and DESIGN.md.
        */}
        <SmoothScroll />
        <Cursor />
        <a
          href="#menu"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-ember focus:px-4 focus:py-3 focus:text-coal focus:label"
        >
          {lang === "ru" ? "К меню" : "Skip to menu"}
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(restaurantSchema(lang)),
          }}
        />
      </body>
    </html>
  );
}
