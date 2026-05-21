import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Process from "@/components/Process";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import MailIn from "@/components/MailIn";
import Pricing from "@/components/Pricing";
import About from "@/components/About";
import Reviews from "@/components/Reviews";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Process />
      <Services />
      <Gallery />
      <MailIn />
      <Pricing />
      <About />
      <Reviews />
      <FAQ />
      <Contact />
    </>
  );
}
