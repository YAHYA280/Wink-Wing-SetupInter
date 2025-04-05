// components
import Hero from "@/components/Hero";
import RentalHero from "@/components/RentalHero";
import Renters from "@/components/Renters";
import SearchLocation from "@/components/SearchLocation";
import FAQ from "@/components/FAQ";
import About from "@/components/About";

export default function Home() {
  return (
    <>
      <Hero />
      <RentalHero bg="#FFF7F5" />
      <Renters />
      <SearchLocation />
      <FAQ />
      <About />
    </>
  );
}
