import Hero from "@/components/hero/Hero";
import Header from "@/components/header";
import Cta from "@/components/cta/Cta";
import { Metadata } from "next";
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
        <Header />
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
export const metadata: Metadata = {
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#ffffff",
  manifest: "/manifest.json",
  title: "Tworzenie Stron Internetowych | Strony i sklepy | Grudziądz",
  description:
    "Projektujemy szybkie strony i sklepy, prowadzimy social media i realizujemy skuteczne kampanie Google Ads. Transparentne ceny i realne wyniki biznesowe.",
  openGraph: {
    type: "website",
    url: "https://quixy.pl",
    title: "Tworzenie Stron Internetowych | Strony i sklepy | Grudziądz",
    description:
      "Projektujemy szybkie strony i sklepy, prowadzimy social media i realizujemy skuteczne kampanie Google Ads.",
    siteName: "Quixy Studio",
    images: [
      {
        url: "/logo-quixy.png",
        width: 1200,
        height: 630,
        alt: "Quixy Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tworzenie Stron Internetowych | Strony i sklepy | Grudziądz",
    description:
      "Projektujemy szybkie strony i sklepy, prowadzimy social media i realizujemy skuteczne kampanie Google Ads.",
    images: ["/logo-quixy.png"],
  },
  authors: [{ name: "Quixy Studio", url: "https://quixy.pl" }],
  publisher: "Quixy Studio",
  keywords:
    "strony internetowe, strony www, sklepy internetowe, landing page, web developer, projektowanie stron, social media, marketing, Google Ads, kampanie reklamowe, SEO, Core Web Vitals",
  icons: [
    {
      url: "/favicons/apple-touch-icon.png",
      sizes: "180x180",
      type: "image/png",
    },
    {
      url: "/favicons/favicon-16x16.png",
      sizes: "16x16",
      type: "image/png",
    },
    {
      url: "/favicons/android-chrome-512x512.png",
      sizes: "512x512",
      type: "image/png",
    },
    {
      url: "/favicons/android-chrome-192x192.png",
      sizes: "192x192",
      type: "image/png",
    },
    {
      url: "/favicons/favicon-32x32.png",
      sizes: "32x32",
      type: "image/png",
    },
    {
      url: "/favicons/favicon.ico",
      sizes: "48x48",
      type: "image/x-icon",
    },
  ],
};
