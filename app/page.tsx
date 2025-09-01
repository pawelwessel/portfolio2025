import Hero from "@/components/hero/Hero";
import { Metadata } from "next";
import HeroIntro from "../components/landing/HeroIntro";
import MainCard from "../components/landing/MainCard";
import BlogSection from "../components/landing/BlogSection";
import ReachSection from "../components/landing/ReachSection";
import { mapMarkers } from "@/lib/mapMarkers";
import { getUsersData } from "@/lib/getUsersData";
import ProjectShowcase from "@/components/ProjectShowcase";
import Contact from "@/components/quixyComponents/Contact";

const dictionary = {
  HomePage: {
    projects: [
      {
        name: "Blackbellart.com",
        shortDescription:
          "Aplikacja internetowa dla artysty. Sklep z obrazami, oferta usług tatuatorskich.",
        images: [
          "/images/projects/blackbellart/hero.webp",
          "/images/projects/blackbellart/shop.webp",
          "/images/projects/blackbellart/shopItem.webp",
          "/images/projects/blackbellart/tattooBlog.webp",
          "/images/projects/blackbellart/tattoos.webp",
          "/images/projects/blackbellart/contact.webp",
        ],
        link: "https://www.blackbellartstudio.pl/",
        type: "Sklep Online",
        technologies: [
          "React",
          "TypeScript",
          "Next",
          "Redux",
          "Stripe",
          "Firebase",
          "Tailwind",
          "ThreeJS",
          "PWA",
        ],
        colors: ["#252326", "#8F26F3", "#22C55E"],
        fonts: [
          {
            fontName: "CocoSharp",
            variants: ["regular", "bold", "light", "italic"],
          },
          {
            fontName: "Gilroy",
            variants: ["regular"],
          },
          {
            fontName: "GraublauWeb",
            variants: ["regular", "bold"],
          },
        ],
        sourceCode: "https://github.com/wesiudev/art-tattoo",
      },
      {
        name: "Zaklejki.pl",
        shortDescription:
          "Sklep internetowy z kolekcją ponad 2000 ręcznie wycinanych naklejkami.",
        images: [
          "/images/projects/zaklejki/hero.webp",
          "/images/projects/zaklejki/lottery.webp",
          "/images/projects/zaklejki/shop.webp",
          "/images/projects/zaklejki/product.webp",
        ],
        link: "https://www.zaklejki.pl/",
        type: "Sklep Online",
        technologies: ["React", "Next", "Firebase", "Python", "Web Scraping"],
        colors: ["#F389EC", "#FFFFFF", "#4338CA"],
        fonts: [
          {
            fontName: "Inter",
            variants: ["regular", "bold"],
          },
          {
            fontName: "Druk-wide",
            variants: ["bold"],
          },
        ],
        sourceCode: "https://github.com/wesiudev/zaklejki",
      },
      {
        name: "Manicuregrudziadz.pl",
        shortDescription:
          "Strona dedykowana usługom manicure, gdzie mozna zarezerwować terminy, i otrzymać rabaty za zapraszanie znajomych. ",
        images: [
          "/images/projects/manicuregrudziadz/hero.webp",
          "/images/projects/manicuregrudziadz/dashboard.webp",
          "/images/projects/manicuregrudziadz/rezerwacje.webp",
        ],
        link: "https://www.manicuregrudziadz.pl/",
        type: "Front-end z bazą danych",
        technologies: [
          "React",
          "TypeScript",
          "Next",
          "Redux",
          "Firebase",
          "Tailwind",
        ],
        colors: ["#3F3F46", "#FACC15", "#4F46E5"],
        fonts: [
          {
            fontName: "CocoSharp",
            variants: ["light", "light italic", "regular", "bold"],
          },
        ],
        sourceCode: "https://github.com/wesiudev/manicuregrudziadz",
      },
      {
        name: "Quixy.pl",
        shortDescription:
          "Platforma internetowa z ofertami pracy zdalnej, która połączy klientów z talentami, czyli osobami, które zrealizują wizję klienta.",
        images: [
          "/images/projects/quixy/hero.png",
          "/images/projects/quixy/why-us.png",
          "/images/projects/quixy/footer.png",
          "/images/projects/quixy/register.png",
          "/images/projects/quixy/dashboard.png",
        ],
        link: "https://www.quixy.pl/",
        type: "Aplikacja Full-stack",
        technologies: [
          "React",
          "Next",
          "Tailwind",
          "Firebase",
          "PWA",
          "ThreeJS",
          "Stripe",
          "openai",
          "redux",
          "Mikropłatności",
        ],
        colors: ["#126b91", "#14A800", "#27272A"],
        fonts: [
          {
            fontName: "CocoSharp",
            variants: ["light", "light italic", "regular", "bold"],
          },
          {
            fontName: "Gotham",
            variants: ["light", "regular", "bold"],
          },
        ],
        sourceCode: "https://github.com/wesiudev/quixy",
      },
      {
        name: "Fryzurykaminska.pl",
        shortDescription:
          "Strona wizytówka z ofertą usług fryzjerskich, kontaktem i portfolio.",
        images: [
          "/images/projects/fryzurykaminska/hero.webp",
          "/images/projects/fryzurykaminska/offer.webp",
        ],
        link: "https://www.fryzurykaminska.pl/",
        type: "Front-end z bazą danych",
        technologies: ["React", "Next", "Tailwind"],
        colors: ["#22C55E", "#F3F4F6", "#93C5FD"],
        fonts: [
          {
            fontName: "CocoSharp",
            variants: ["regular", "bold"],
          },
        ],
        sourceCode: "https://github.com/wesiudev/fryzury-kaminska",
      },
      {
        name: "Radcadeluga.pl",
        shortDescription:
          "Strona wizytówka dla kancelarii. Lista usług, kontakt.",
        images: [
          "/images/projects/kancelariadeluga/hero.webp",
          "/images/projects/kancelariadeluga/offer.webp",
        ],
        link: "https://www.delugakancelaria.pl/",
        type: "Front-end z bazą danych",
        technologies: ["React", "Next", "Firebase"],
        colors: ["#685A50", "#4ADE80", "#D8B4FE"],
        fonts: [
          {
            fontName: "CocoSharp",
            variants: ["regular", "bold"],
          },
        ],
        sourceCode: "https://github.com/wesiudev/kancelaria-artur-deluga",
      },
    ],
  },
};

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const users = await getUsersData();
  const talents = users.filter(
    (user) =>
      user.seek && user.configured && user.access && user.tags?.length > 0
  );
  const companies = users.filter(
    (user) =>
      !user.seek && user.configured && user.access && user.tags?.length > 0
  );
  return (
    <div className="w-screen overflow-x-hidden">
      <div className="font-sans w-full bg-[#222222] pb-48 h-full">
        <HeroIntro />
        <div className="z-[30] fixed h-screen w-full left-0 top-0">
          <Hero />
        </div>

        <main className="font-sans overflow-visible relative items-center min-h-screen grid grid-cols-1 z-30">
          <section className={`max-w-[90vw] mx-auto h-max z-50`}>
            <MainCard talents={talents} companies={companies} />
            <ProjectShowcase dictionary={dictionary} />
            {/* <PricingHero /> */}
            <BlogSection />
            <ReachSection markers={mapMarkers} />
            <Contact isLandingPage={true} />
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
  title: "Strony internetowe dla firm. Tworzenie stron i sklepów.",
  description:
    "Projektujemy szybkie strony i sklepy, prowadzimy social media i realizujemy skuteczne kampanie Google Ads. Transparentne ceny i realne wyniki biznesowe.",
  openGraph: {
    type: "website",
    url: "https://quixy.pl",
    title: "Strony internetowe dla firm. Tworzenie stron i sklepów.",
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
    title: "Strony internetowe dla firm. Tworzenie stron i sklepów.",
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
