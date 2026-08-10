import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Menu from "@/components/Menu";
import Process from "@/components/Process";
import Counters from "@/components/Counters";
import About from "@/components/About";
import Reviews from "@/components/Reviews";
import FindUs from "@/components/FindUs";
import Footer from "@/components/Footer";
import { isLang, marqueeWords } from "@/lib/content";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  return (
    <>
      <Header lang={lang} />
      <main id="top">
        <Hero lang={lang} />
        <Marquee words={marqueeWords[lang]} tone="ember" duration={46} />
        <Menu lang={lang} />
        <Process lang={lang} />
        <Counters lang={lang} />
        <About lang={lang} />
        <Marquee words={marqueeWords[lang]} tone="coal" reverse duration={58} />
        <Reviews lang={lang} />
        <FindUs lang={lang} />
      </main>
      <Footer lang={lang} />
    </>
  );
}
