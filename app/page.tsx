import SearchJobs from "@/components/quixyComponents/HomeUnderHero/SearchJobs";
import OpenableOpportunity from "@/components/quixyComponents/HomeUnderHero/OpenableOpportunity";
import FAQ from "@/components/quixyComponents/Faq";
import Regions from "@/components/quixyComponents/Regions";
import AboutQuixyTalent from "@/components/quixyComponents/AboutQuixyTalent";
import Image from "next/image";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
import Pawełek from "../public/Pawełek/2.png";
import ytLogo from "../public/assets/yt-logo.png";
import Hero from "@/components/hero/Hero";
import { Metadata } from "next";
import HeroIntro from "../components/landing/HeroIntro";
import MainCard from "../components/landing/MainCard";
import BlogSection from "../components/landing/BlogSection";
import ReachSection from "../components/landing/ReachSection";
import { getUsersData } from "@/lib/getUsersData";
import ProjectShowcase from "@/components/ProjectShowcase";
import Contact from "@/components/quixyComponents/Contact";
import LandingPageSearchInput from "@/components/LandingPageSearchInput";
import JobBoardList from "@/components/quixyComponents/JobBoardList";
import Cta from "@/components/cta/Cta";

const faqItems = [
  {
    question: "Czym jest Quixy?",
    answer:
      "Quixy to platforma, która łączy klientów z firmami i freelancerami. Utwórz swoje portfolio, dodaj usługi na rynek lub znajdź pracę zdalną.",
  },
  {
    question: "Jak działa rynek usług?",
    answer:
      "Nasza platforma prezentuje oferty usług wszystkich użytkowników, umożliwiając klientom łatwe dotarcie do profilu dostawcy, który świadczy interesującą ich usługę.",
  },
  {
    question: "Czy mogę ustawić różne ceny dla różnych usług?",
    answer:
      "Tak, możesz dostosować cenę oraz preferowany sposób płatności indywidualnie dla każdej dodawanej usługi.",
  },
  {
    question: "Jak klienci kontaktują się ze mną po znalezieniu mojej oferty?",
    answer:
      "Klienci mogą skorzystać z przycisku *Wyślij zapytanie* dostępnego na Twoim profilu.",
  },
  {
    question: "Czy istnieje opłata za korzystanie z platformy?",
    answer:
      "Dodanie usługi do naszej platformy wiąże się z jednorazową opłatą.",
  },
  {
    question: "Ile kosztuje 1 Quixie?",
    answer:
      "Aktualny cennik jest dostępny w panelu użytkownika po zalogowaniu.",
  },
  {
    question: "Jakie rodzaje usług są najczęściej poszukiwane przez klientów?",
    answer:
      "Najczęściej wyszukiwane usługi to: tworzenie stron internetowych, aplikacje mobilne, marketing, projektowanie graficzne, księgowość oraz usługi biznesowe.",
  },
  {
    question: "Czy platforma oferuje wsparcie w promowaniu moich usług?",
    answer:
      "Tak, nasze podstrony oraz oferty dostępne na rynku są promowane m.in. za pośrednictwem Google.",
  },
  {
    question:
      "Jakie informacje powinienem umieścić w swoim profilu, aby przyciągnąć klientów?",
    answer:
      "Zadbaj o szczegółowy opis swoich usług, profesjonalne zdjęcia, referencje od klientów oraz jasne warunki współpracy.",
  },
  {
    question: "Czy platforma zapewnia ochronę płatności za świadczone usługi?",
    answer:
      "Płatności są ustalane bezpośrednio między klientami a dostawcami usług. Platforma nie pośredniczy w rozliczeniach.",
  },
  {
    question: "Jak mogę znaleźć pracę zdalną na Quixy?",
    answer:
      "Aby znaleźć pracę zdalną, przejdź do sekcji 'Kategorie' na naszej stronie. Możesz przeglądać dostępne oferty pracy, filtrować je według kategorii oraz aplikować bezpośrednio przez platformę.",
  },
  {
    question: "Jak mogę zatrudnić freelancera lub firmę?",
    answer:
      "Jeśli szukasz ekspertów do swojego projektu, przejdź do sekcji 'Kategorie'. Możesz przeglądać profile specjalistów, sprawdzać ich doświadczenie i umiejętności oraz nawiązywać współpracę bezpośrednio przez platformę.",
  },
  {
    question: "Czy Quixy zapewnia bezpieczeństwo moich danych?",
    answer:
      "Tak, bezpieczeństwo naszych użytkowników jest dla nas priorytetem. Korzystamy z niezawodnych technologii zabezpieczających dane oraz oferujemy, aby zapewnić Ci bezpieczne i komfortowe korzystanie z platformy.",
  },
  {
    question: "Jakie korzyści oferuje Quixy nowym użytkownikom?",
    answer:
      "Nowi użytkownicy otrzymują darmowe Quixies na start, które mogą wykorzystać do korzystania z różnych funkcji platformy. To nasz sposób na powitanie Cię w społeczności Quixy i wsparcie Cię w rozpoczęciu Twojej przygody z nami.",
  },
  {
    question: "Jak mogę dodać ogłoszenie o pracę na Quixy?",
    answer:
      "Aby dodać ogłoszenie o pracę, zaloguj się na swoje konto, przejdź do sekcji 'Dodaj ofertę pracy' i wypełnij formularz z informacjami o ofercie pracy. Twoje ogłoszenie zostanie natychmiast opublikowane na platformie, aby przyciągnąć odpowiednich kandydatów.",
  },
  {
    question: "Gdzie mogę znaleźć opinie innych użytkowników o Quixy?",
    answer:
      "Opinie naszych klientów znajdziesz w sekcji 'Praca zdalna'. Z dumą prezentujemy oceny i recenzje, które świadczą o wysokiej jakości naszych usług oraz zaufaniu, jakim obdarzyli nas użytkownicy.",
  },
];
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
  const jobs = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/apiQuixy/jobs?tubylytylkofigi=${process.env.API_SECRET_KEY}`
  ).then((res) => res.json());
  return (
    <>
      <div className="w-screen overflow-x-hidden">
        <div className="flex flex-col bg-white">
          <div className="bg-white z-50 pt-[125px] lg:pt-[175px] pb-36">
            <div className=" mx-auto px-4 lg:px-12 xl:container flex flex-col lg:items-center lg:grid lg:grid-cols-2 relative z-50 pt-12">
              <div className="group relative flex flex-col">
                <div className="absolute w-12 h-12 rounded-full bg-green-400/30 -left-14 -top-16" />
                <div className="absolute w-5 h-5 rounded-full bg-green-400/50 -left-24 -top-3" />
                <h1
                  style={{ lineHeight: 1.3 }}
                  className="font-gotham italic block text-center max-w-sm mx-auto lg:mx-0 lg:text-left lg:max-w-lg text-4xl lg:text-5xl text-zinc-800"
                >
                  Zlecenia w branży kreatywnej
                </h1>
                <p className="pt-4 max-w-lg text-center lg:text-left text-sm mx-auto lg:mx-0 text-zinc-800 drop-shadow-sm shadow-black">
                  <strong>Koniec z nudnymi ofertami pracy!</strong> Nie bądź na
                  smyczy od 9 do 17. Pracuj jak chcesz i gdzie chcesz.
                </p>
                <LandingPageSearchInput rounded={false} isLandingPage={true} />
                <div className="flex flex-row items-center gap-3 w-max mx-auto lg:mx-0">
                  <Link
                    href="/register"
                    className="w-max max-w-full flex items-center gap-3 rounded-md font-gotham bg-gradient-to-r from-ctaStart to-ctaEnd hover:scale-105 duration-100 text-white px-4 py-2 text-center mt-6"
                  >
                    Utwórz profil
                    <FaChevronRight />
                  </Link>
                  <Link
                    href="/oferta"
                    className="w-max max-w-full flex items-center gap-3 rounded-md font-gotham bg-gradient-to-r from-accentStart to-accentEnd hover:scale-105 duration-100 text-white px-4 py-2 text-center mt-6"
                  >
                    Nasza oferta
                    <FaChevronRight />
                  </Link>
                </div>
                <div className="mx-auto lg:mx-0 my-6">
                  <Regions />
                </div>
              </div>
              <div className="flex flex-col items-center justify-center w-full h-full mx-auto relative max-w-[420px]">
                <Image
                  style={{ boxShadow: "0px 0px 12px rgb(82 82 91 / 0.8)" }}
                  src={Pawełek}
                  alt="Praca od 9-17? to nie dla mnie. ~Pawełek"
                  title="Praca od 9-17? to nie dla mnie. ~Pawełek"
                  className="w-full max-w-lg lg:max-w-none rounded-lg drop-shadow-lg shadow-black"
                />
                <div
                  style={{ boxShadow: "0px 0px 12px rgb(82 82 91 / 0.8)" }}
                  className="text-zinc-800 drop-shadow-sm shadow-black font-extralight font-gotham p-3 rounded-xl w-max max-w-full bg-white absolute bottom-[-36px] left-0 lg:-left-4"
                >
                  &quot;Pracowałem po 12 godzin w sprintach IT dla{" "}
                  <strong>Janusza</strong>. Dziś nie wyobrażam sobie biznesu bez
                  Quixy&quot; ~{" "}
                  <Link
                    href="https://youtube.com/@kudlaty-koduje"
                    target="_blank"
                    title="Kudłaty Koduje YouTube"
                    className="inline-flex items-center align-middle ml-1 text-blue-600"
                  >
                    <Image
                      src={ytLogo}
                      width={24}
                      height={24}
                      alt="YouTube logo"
                      className="h-auto w-5 mr-1"
                    />
                    Kudłaty
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="infinite-bg p-3 sm:px-12 py-8 lg:py-16 h-max">
            <div className="flex flex-col justify-center items-center">
              <div className="flex flex-row">
                <h2
                  style={{ textShadow: "0px 1px 5px black" }}
                  className="w-full md:max-w-[50rem] xl:max-w-[1024px] text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white text-center"
                >
                  Wyobraź sobie wymarzony biznes online, pomnożony przez
                  maksymalizację efektywności - To właśnie oferuje Quixy!
                </h2>
              </div>
            </div>
          </div>

          <div className="relative bg- z-50 w-full bg-gradient-to-b from-gray-100 via-zinc-100 to-gray-100 pb-24">
            <div className="relative mx-auto pb-16 rounded-2xl px-4 sm:px-8 pt-6">
              <div className="relative sm:px-8">
                <div className="mt-6">
                  <JobBoardList talents={talents} companies={companies} />
                </div>
              </div>
              <p className="text-zinc-700 text-base sm:text-lg max-w-3xl mx-auto text-center mt-14 font-gotham font-light leading-relaxed px-2">
                W poszukiwaniu firmy lub freelancera?{" "}
                <span className="font-semibold text-blue-600">
                  Sprawdź ofertę naszych zaufanych partnerów.
                </span>{" "}
                Możesz dodawać zlecenia dla freelancerów i firm.
              </p>
              <div className="mx-auto w-max max-w-full">
                <Cta label="Utwórz nowe zlecenie!" />
              </div>
            </div>
          </div>

          <div className="w-full relative z-50 bg-white pt-12 pb-12">
            <div className="mx-auto px-4 lg:px-12 mb-12 xl:container">
              <AboutQuixyTalent />
            </div>
          </div>

          <div className="w-full relative z-50 bg-white pb-24">
            <div className="xl:container mx-auto h-max px-4 lg:px-12">
              <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 2xl:gap-12">
                <div className="h-full w-full md:p-3 lg:p-0 lg:bg-white md:bg-[#f7faf7]">
                  <Image
                    src="/assets/happy-woman.webp"
                    width={1024}
                    height={1024}
                    alt="Praca zdalna Quixy Talent"
                    className="rounded-lg sticky top-12"
                  />
                </div>
                <div className="flex flex-col justify-center text-black">
                  <h2
                    style={{ lineHeight: 1.325 }}
                    className="text-4xl font-extrabold drop-shadow-md shadow-black"
                  >
                    Dynamiczne projekty z freelancerami i firmami
                  </h2>
                  <div className="my-3">
                    <div className="flex items-start">
                      <span className="text-2xl mt-1">🤝</span>
                      <div className="ml-1.5 flex flex-col">
                        <h3 className="font-bold text-lg lg:text-xl">
                          Zatrudniaj freelancerów
                        </h3>
                        <p className="text-black text-sm  font-gotham font-light">
                          Zanurz się w świecie pracy zdalnej! Wyszukaj i
                          zatrudnij eksperta.
                        </p>
                      </div>
                    </div>
                    <div className="flex mt-3 items-start">
                      <span className="text-2xl mt-1">🌍</span>
                      <div className="ml-1.5 flex flex-col">
                        <h3 className="font-bold text-lg lg:text-xl text-black font-gotham font-light">
                          Dodaj ofertę pracy
                        </h3>
                        <p className="text-black text-sm ">
                          Znajdź utalentowane osoby, skontaktuj się i
                          rozpocznijcie zdalną współpracę.
                        </p>
                      </div>
                    </div>
                    <div className="flex mt-3 items-start">
                      <span className="text-2xl mt-1">🚀</span>
                      <div className="ml-1.5 flex flex-col">
                        <h3 className="font-bold text-lg lg:text-xl">
                          Zaufani eksperci
                        </h3>
                        <p className="text-black text-sm font-gotham font-light">
                          Znajdziesz najlepszych zawodowców z branży.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row mt-4">
                    <Link
                      className="hover:scale-105 duration-100 gap-3 flex items-center py-2 rounded-md px-4 bg-gradient-to-r from-ctaStart to-ctaEnd text-white"
                      href={`${process.env.NEXT_PUBLIC_URL}/oferta`}
                    >
                      Sprawdź kategorie <FaChevronRight />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full relative z-50 bg-white pb-24">
            <div className="xl:container mx-auto px-4 lg:px-12 mt-12 w-full">
              <div className="rounded-lg relative bg-cover bg-center lg:bg-right-bottom p-4 h-screen lg:h-[80vh] bg-woman-pc">
                <div className="rounded-lg absolute left-0 top-0  bg-black bg-opacity-50 w-full h-full z-0"></div>
                <div className="rounded-md px-4 py-2 bg-gradient-to-r from-accentStart to-accentEnd absolute left-4 top-4 text-white">
                  Dla klientów
                </div>
                <div className="flex flex-col justify-end relative z-10 h-full w-full">
                  <h2 className="text-xl lg:text-3xl font-extrabold text-white">
                    Znajdź eksperta, którego potrzebujesz!
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2  gap-2 md:gap-4 mt-4">
                    <Link
                      href={`${process.env.NEXT_PUBLIC_URL}/oferta/rozwoj-oprogramowania/web-development`}
                      className="group flex flex-col  bg-black/50 text-white group p-3 rounded-md"
                    >
                      <h3 className="group-hover:underline md:mb-1 text-lg lg:text-xl font-extrabold">
                        Zamów stronę internetową
                      </h3>
                      <div className="flex flex-row items-center font-light">
                        Nasi web developerzy czekają na Twój projekt
                      </div>
                    </Link>
                    <Link
                      href={`${process.env.NEXT_PUBLIC_URL}/oferta/marketing/marketing-cyfrowy/seo`}
                      className="group flex flex-col  bg-black/50 text-white group p-3 rounded-md"
                    >
                      <h3 className="group-hover:underline md:mb-1 text-lg lg:text-xl font-extrabold">
                        Zamów SEO
                      </h3>
                      <div className="flex flex-row items-center font-light">
                        Zwiększ widoczność w sieci dzięki SEO.
                      </div>
                    </Link>
                    <Link
                      href={`${process.env.NEXT_PUBLIC_URL}/oferta/projektowanie/web-design`}
                      className="group flex flex-col  bg-black/50 text-white group p-3 rounded-md"
                    >
                      <h3 className="group-hover:underline md:mb-1 text-lg lg:text-xl font-extrabold">
                        Zamów design
                      </h3>
                      <div className="flex flex-row items-center font-light">
                        Wyróżnij się wizualnie – specjaliści od designu są
                        tutaj, by pomóc.
                      </div>
                    </Link>
                    <Link
                      href={`${process.env.NEXT_PUBLIC_URL}/oferta`}
                      className="group flex flex-col  bg-black/50 text-white group p-3 rounded-md"
                    >
                      <h3 className="group-hover:underline md:mb-1 text-lg lg:text-xl font-extrabold">
                        Zobacz więcej...
                      </h3>
                      <div className="flex flex-row items-center font-light">
                        Szukasz usług firmy lub freelancera?
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full relative z-50 bg-white pb-24">
            <div className="xl:container mx-auto px-4 lg:px-12 mt-12 flex flex-col md:flex-row w-full">
              <div className="mt-3 md:mt-0 md:w-[55%] w-full text-black">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mx-auto">
                  <div className="flex flex-row">
                    <span className="text-2xl">💎</span>
                    <div className="ml-3 flex flex-col">
                      <h3 className="font-bold text-lg -mt-1 font-gotham">
                        Darmowe Quixies na start
                      </h3>
                      <p className="text-sm w-3/4 ">
                        Na początku przygody otrzymasz od nas bonus.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-row">
                    <span className="text-2xl">⭐</span>
                    <div className="ml-3 flex flex-col">
                      <h3 className="font-bold text-lg -mt-1 font-gotham">
                        Wyświetlaj swoje usługi
                      </h3>
                      <p className="text-sm w-3/4 ">
                        Zdobywaj zlecenia jako freelancer lub firma.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-row">
                    <span className="text-2xl">✔️</span>
                    <div className="ml-3 flex flex-col">
                      <h3 className="font-bold text-lg -mt-1 font-gotham">
                        Zapewnimy bezpieczeństwo
                      </h3>
                      <p className="text-sm w-3/4 ">
                        Potrzebujesz pomocy? Skontaktuj się z nami!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* just a component for the future 🤷‍♀️ */}
          <div className="w-full relative z-50 bg-white pb-24">
            <div className="relative xl:container px-4 lg:px-12 mx-auto mt-12 h-max">
              <div className="grid grid-cols-1 md:grid-cols-2 w-full h-full relative">
                <div className="rounded-lg bg-guitar-man bg-center h-[60vh] xl:h-[80vh] relative">
                  <h3 className="rounded-md px-4 py-2 bg-gradient-to-r from-accentStart to-accentEnd absolute left-4 top-4 text-white">
                    Dla freelancerów
                  </h3>
                </div>
                <div className="py-4 md:py-8 2xl:py-10 md:px-8 2xl:px-10 text-black w-full md:h-full grid grid-cols-1">
                  <div>
                    <h2 className="text-black text-2xl lg:text-4xl font-extrabold">
                      Szukaj zleceń lub pracy zdalnej
                    </h2>
                    <p className="text-base lg:text-lg my-3 lg:my-4 lg:mb-3 ">
                      Przeglądaj zlecenia klientów, szukaj pracy zdalnej lub
                      sprzedawaj gotowe strony internetowe, aplikacje lub
                      projekty.
                    </p>
                    <Link
                      className="w-max max-w-full flex items-center gap-2 rounded-md bg-gradient-to-r from-ctaStart to-ctaEnd hover:scale-105 duration-100 px-4 py-2 font-gotham text-white"
                      href="/register"
                    >
                      Utwórz portfolio <FaChevronRight />
                    </Link>
                  </div>
                  <div className="flex items-end  text-base md:text-sm lg:text-base xl:text-lg">
                    <div className="w-full grid grid-cols-2 gap-3 pt-3 mt-12 border-t-2 border-primaryStart">
                      <h4 className="text-center bg-gradient-to-r from-primaryStart to-primaryEnd text-white py-2 rounded-md">
                        Wysyłaj aplikacje
                      </h4>
                      <h4 className="text-center bg-gradient-to-r from-primaryStart to-primaryEnd text-white py-2 rounded-md">
                        Szukaj zleceń
                      </h4>
                      <h4 className="text-center bg-gradient-to-r from-primaryStart to-primaryEnd text-white py-2 rounded-md">
                        Prezentuj usługi
                      </h4>
                      <h4 className="text-center bg-gradient-to-r from-primaryStart to-primaryEnd text-white py-2 rounded-md">
                        Sprzedaj projekt
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full relative z-50 bg-white pb-24">
            <div className="mt-12 xl:container mx-auto bg-white relative h-max pb-12 px-4 lg:px-12">
              <FAQ faqItems={faqItems} />
            </div>
          </div>
        </div>
        <div className="font-sans w-full bg-[#222222] pb-48 h-full">
          <HeroIntro />

          <main className="font-sans overflow-visible relative items-center min-h-screen grid grid-cols-1 z-30">
            <section className={`max-w-[90vw] mx-auto h-max z-50`}>
              <MainCard talents={talents} companies={companies} />
              <ProjectShowcase dictionary={dictionary} />
              {/* <PricingHero /> */}
              <BlogSection />
              <ReachSection markers={markers} isLandingPage={true} />
              <Contact isLandingPage={true} />
            </section>
          </main>
        </div>
      </div>
      <div className="z-[0] fixed h-screen w-full left-0 top-0">
        <Hero />
      </div>
    </>
  );
}
const siteTitle = "Quixy Studio | Współpraca w Branży Kreatywnej";
const siteDescription =
  "Quixy to platforma łącząca freelancerów i firmy IT. Dodawaj zlecenia, szukaj pracy, realizuj projekty i rozwijaj swoją karierę lub biznes w jednym miejscu.";
const siteUrl = "https://quixy.pl";
const siteName = "Quixy Studio";
const mainImage = {
  url: "/main.png",
  width: 1200,
  height: 630,
  alt: "Quixy Studio",
};
const keywords =
  "freelancerzy, firmy IT, zlecenia IT, praca zdalna, projekty IT, platforma dla freelancerów, oferty pracy IT, współpraca IT, ogłoszenia IT, marketplace IT";
const icons = [
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
];

export const metadata: Metadata = {
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#ffffff",
  manifest: "/manifest.json",
  title: siteTitle,
  description: siteDescription,
  openGraph: {
    type: "website",
    url: siteUrl,
    title: siteTitle,
    description: siteDescription,
    siteName,
    images: [mainImage],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [mainImage.url],
  },
  authors: [{ name: siteName, url: siteUrl }],
  publisher: siteName,
  keywords,
  icons,
};
const markers = [
  {
    style: "w-[8%] absolute top-[40%] left-[9.5%] sm:left-[8.5%]",
    label: "Szczecin - Strona internetowa dla restauracji",
  },
  {
    style: "w-[10%] absolute top-[58%] left-[18%]",
    label: "Zielona Góra - Sklep online z elektroniką",
  },
  {
    style: "w-[6%] absolute top-[69%] left-[33%]",
    label: "Wrocław - Portfolio fotografa",
  },
  {
    style: "w-[6%] absolute top-[76%] left-[43%]",
    label: "Opole - Strona dla kancelarii prawnej",
  },
  {
    style: "w-[6%] absolute top-[67%] left-[44.5%]",
    label: "Katowice - Sklep internetowy z odzieżą",
  },
  {
    style: "w-[8%] absolute top-[81%] left-[56.5%]",
    label: "Kraków - Strona internetowa dla hotelu",
  },
  {
    style: "w-[8%] absolute top-[78%] left-[72.5%]",
    label: "Rzeszów - Portal edukacyjny",
  },
  {
    style: "w-[10%] absolute top-[57%] left-[79%]",
    label: "Lublin - Strona internetowa dla lekarza",
  },
  {
    style: "w-[8%] absolute top-[65%] left-[60.5%]",
    label: "Kielce - Blog kulinarny",
  },
  {
    style: "w-[10%] absolute top-[50%] left-[47.5%]",
    label: "Łódź - Portfolio grafika",
  },
  {
    style: "w-[8%] absolute top-[46%] left-[30%]",
    label: "Poznań - Strona internetowa dla agencji marketingowej",
  },
  {
    style: "w-[8%] absolute top-[36%] left-[22%]",
    label: "Gorzów Wlkp. - Strona internetowa dla szkoły językowej",
  },
  {
    style: "w-[10%] absolute top-[27%] left-[37.5%]",
    label: "Bydgoszcz - Sklep internetowy z zabawkami",
  },
  {
    style: "w-[8%] absolute top-[44%] left-[65%]",
    label: "Radom - Strona internetowa dla architekta",
  },
  {
    style: "w-[8%] absolute top-[34%] left-[56%]",
    label: "Białystok - Portal informacyjny",
  },
  {
    style: "w-[10%] absolute top-[23%] left-[78%]",
    label: "Suwałki - Strona internetowa dla firmy budowlanej",
  },
  {
    style: "w-[10%] absolute top-[14.5%] sm:top-[13.5%] left-[58%]",
    label: "Olsztyn - Strona internetowa dla przedszkola",
    aos: "zoom-in",
  },
  {
    style: "w-[10%] absolute top-[6%] left-[32%]",
    label: "Gdańsk - Strona internetowa dla salonu fryzjerskiego",
  },
  {
    style: "w-[10%] absolute top-[20%] left-[10%]",
    label: "Koszalin - Strona internetowa dla trenera personalnego",
  },
];
