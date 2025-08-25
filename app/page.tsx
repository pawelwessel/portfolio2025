import Hero from "@/components/hero/Hero";
import Header from "@/components/header";
import Cta from "@/components/cta/Cta";
import HeroIntro from "../components/landing/HeroIntro";
import MainCard from "../components/landing/MainCard";
import PricingHero from "../components/landing/PricingHero";
import BlogSection from "../components/landing/BlogSection";
import OpinionsSection from "../components/landing/OpinionsSection";
import ReachSection from "../components/landing/ReachSection";
export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const ref = searchParams?.ref;
  const mapMarkers = [
    {
      id: "szczecin",
      top: "40%",
      left: "9.5%",
      leftSm: "8.5%",
      width: "8%",
      text: "Szczecin - Strona internetowa dla restauracji",
    },
    {
      id: "zielona-gora",
      top: "58%",
      left: "18%",
      width: "10%",
      text: "Zielona Góra - Sklep online z elektroniką",
    },
    {
      id: "wroclaw",
      top: "69%",
      left: "33%",
      width: "6%",
      text: "Wrocław - Portfolio fotografa",
    },
    {
      id: "opole",
      top: "76%",
      left: "43%",
      width: "6%",
      text: "Opole - Strona dla kancelarii prawnej",
    },
    {
      id: "katowice",
      top: "67%",
      left: "44.5%",
      width: "6%",
      text: "Katowice - Sklep internetowy z odzieżą",
    },
    {
      id: "krakow",
      top: "81%",
      left: "56.5%",
      width: "8%",
      text: "Kraków - Strona internetowa dla hotelu",
    },
    {
      id: "rzeszow",
      top: "78%",
      left: "72.5%",
      width: "8%",
      text: "Rzeszów - Portal edukacyjny",
    },
    {
      id: "lublin",
      top: "57%",
      left: "79%",
      width: "10%",
      text: "Lublin - Strona internetowa dla lekarza",
    },
  ];
  return (
    <div className="w-screen overflow-x-hidden">
      <div className="font-sans w-full bg-[#222222] pb-48 h-full">
        <Header view={searchParams?.view} />
        <HeroIntro />
        <div className="z-[30] fixed h-screen w-full left-0 top-0">
          <Hero />
        </div>

        <main className="font-sans overflow-visible relative items-center min-h-screen grid grid-cols-1 z-30">
          <section className={`w-full h-max z-50`}>
            <MainCard />
            <PricingHero />
            <BlogSection />
            <OpinionsSection />
            <ReachSection markers={mapMarkers} />
          </section>
        </main>
      </div>
    </div>
  );
}
