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
import { marqueeWords } from "@/lib/content";

export default function Page() {
  return (
    <>
      <Header />
      <main id="top">
        <Hero />
        <Marquee words={marqueeWords} tone="ember" duration={46} />
        <Menu />
        <Process />
        <Counters />
        <About />
        <Marquee words={marqueeWords} tone="coal" reverse duration={58} />
        <Reviews />
        <FindUs />
      </main>
      <Footer />
    </>
  );
}
