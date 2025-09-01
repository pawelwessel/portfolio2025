import Image from "next/image";
import Cta from "@/components/cta/Cta";
import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";

import OpinionsSection from "./OpinionsSection";
import Link from "next/link";
import JobBoardList from "../quixyComponents/JobBoardList";

export default function MainCard({
  talents,
  companies,
}: {
  talents: any[];
  companies: any[];
}) {
  return (
    <div
      id="about"
      className="w-full text-xl sm:text-2xl lg:text-3xl flex flex-col mt-12 bg-white px-6 xl:px-12 py-6 xl:pb-12 rounded-md relative text-zinc-700 drop-shadow-md shadow-black"
    >
      <div className="w-full flex flex-col lg:flex-row gap-12 items-center lg:items-start">
        <div className="w-full">
          <h2 className="text-xl lg:text-4xl font-bold font-gotham">
            Strony Internetowe w twojej okolicy
          </h2>
          <p className="text-base font-light max-w-[45rem] mt-4 lg:text-left">
            Projektujemy szybkie i skuteczne{" "}
            <Link
              className="text-blue-400"
              href="/oferta/dla-firm/rozwoj-oprogramowania/web-development/web-developer"
            >
              strony internetowe
            </Link>
            ,{" "}
            <Link
              className="text-blue-400"
              href="/oferta/dla-firm/e-commerce/rozwiazania-e-commerce/tworzenie-sklepow-internetowych"
            >
              sklepy internetowe e-commerce
            </Link>
            , a także prowadzimy{" "}
            <Link className="text-blue-400" href="/oferta/dla-firm/marketing">
              marketing
            </Link>{" "}
            w{" "}
            <Link
              className="text-blue-400"
              href="/oferta/dla-firm/marketing/marketing-cyfrowy/marketing-w-social-media"
            >
              mediach społecznościowych
            </Link>
            . Łączymy{" "}
            <Link
              className="text-blue-400"
              href="/oferta/dla-firm/projektowanie/web-design/projektowanie-stron-internetowych"
            >
              design
            </Link>
            ,{" "}
            <Link className="text-blue-400" href="/oferta/dla-firm/uslugi-it">
              technologię
            </Link>{" "}
            i{" "}
            <Link
              className="text-blue-400"
              href="/oferta/dla-firm/uslugi-it/doradztwo-it/bi-big-data"
            >
              analitykę
            </Link>
            , aby dowozić realne wyniki{" "}
            <Link
              className="text-blue-400"
              href="/oferta/dla-firm/uslugi-biznesowe"
            >
              biznesowe
            </Link>
            .
          </p>

          <div className="mt-6">
            <h2 className="text-2xl font-gotham mb-6">Co w ofercie?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border rounded-xl shadow-sm p-6 flex flex-col gap-2">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-blue-500 h-8 w-8 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    1
                  </div>
                  <span className="font-semibold text-lg">
                    Projekt i wdrożenie
                  </span>
                </div>
                <div className="text-sm text-zinc-700">
                  <Link
                    className="text-blue-500 hover:underline font-medium"
                    href="/oferta/tworzenie-stron-w-internecie-grudziadz"
                  >
                    Klasyczne strony internetowe
                  </Link>
                  {", "}
                  <Link
                    className="text-blue-500 hover:underline font-medium"
                    href="/oferta/strona-dla-firmy-koszt-grudziadz"
                  >
                    strony dla firm
                  </Link>
                  {", "}
                  <Link
                    className="text-blue-500 hover:underline font-medium"
                    href="/oferta/nextjs-sklep-internetowy-grudziadz"
                  >
                    sklepy internetowe
                  </Link>
                  {", "}
                  <Link
                    className="text-blue-500 hover:underline font-medium"
                    href="/tworzenie-platformy-webowej-grudziadz"
                  >
                    dedykowane projekty
                  </Link>
                  {" oraz "}
                  <Link
                    className="text-blue-500 hover:underline font-medium"
                    href="/oferta/tworzenie-landing-page-grudziadz"
                  >
                    strony internetowe typu landing page
                  </Link>
                </div>
              </div>
              <div className="bg-white border rounded-xl shadow-sm p-6 flex flex-col gap-2">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-blue-500 h-8 w-8 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    2
                  </div>
                  <span className="font-semibold text-lg">
                    Systemy i automatyzacje
                  </span>
                </div>
                <div className="text-sm text-zinc-700">
                  <Link
                    className="text-blue-500 hover:underline font-medium"
                    href="/oferta/dla-firm/rozwoj-oprogramowania/oprogramowanie/programista"
                  >
                    CMS i edycja treści
                  </Link>
                  {", "}
                  <Link
                    className="text-blue-500 hover:underline font-medium"
                    href="/oferta/dla-firm/rozwoj-oprogramowania/nowe-technologie/programista-sztucznej-inteligencji"
                  >
                    automatyzacje
                  </Link>
                  {" oraz "}
                  <Link
                    className="text-blue-500 hover:underline font-medium"
                    href="/oferta/dla-firm/uslugi-it/doradztwo-it/integracja-systemow"
                  >
                    integracje
                  </Link>
                </div>
              </div>
              <div className="bg-white border rounded-xl shadow-sm p-6 flex flex-col gap-2">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-blue-500 h-8 w-8 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    3
                  </div>
                  <span className="font-semibold text-lg">
                    SEO &amp; Performance
                  </span>
                </div>
                <div className="text-sm text-zinc-700">
                  <Link
                    className="text-blue-500 hover:underline font-medium"
                    href="/oferta/dla-firm/marketing/marketing-cyfrowy/seo"
                  >
                    SEO techniczne
                  </Link>
                  {" i Core Web Vitals, PageSpeed 95–100"}
                </div>
              </div>
              <div className="bg-white border rounded-xl shadow-sm p-6 flex flex-col gap-2">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-blue-500 h-8 w-8 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    4
                  </div>
                  <span className="font-semibold text-lg">
                    Hosting &amp; Wsparcie
                  </span>
                </div>
                <div className="text-sm text-zinc-700">
                  <Link
                    className="text-blue-500 hover:underline font-medium"
                    href="/oferta/dla-firm/uslugi-it/doradztwo-it/cloud-computing"
                  >
                    Hosting
                  </Link>
                  {", "}
                  <Link
                    className="text-blue-500 hover:underline font-medium"
                    href="/oferta/dla-firm/uslugi-it/bezpieczenstwo-it"
                  >
                    bezpieczeństwo
                  </Link>
                  {", "}
                  <Link
                    className="text-blue-500 hover:underline font-medium"
                    href="/oferta/dla-firm/uslugi-it/wsparcie-it"
                  >
                    wsparcie
                  </Link>
                  {" i rozwój po wdrożeniu"}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-gotham mb-6">
              Marketing dla <span className="text-blue-500">Twojej firmy</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border rounded-xl shadow-sm p-6 flex flex-col gap-2">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-blue-400 h-8 w-8 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    A
                  </div>
                  <span className="font-semibold text-lg">
                    Content &amp; Community
                  </span>
                </div>
                <div className="text-sm text-zinc-700">
                  <Link
                    className="text-blue-400 hover:underline font-medium"
                    href="/oferta/dla-firm/marketing/marketing-cyfrowy/content-marketing"
                  >
                    Content marketing
                  </Link>
                  {", "}
                  <Link
                    className="text-blue-400 hover:underline font-medium"
                    href="/oferta/dla-firm/marketing/kreacja/strategia-komunikacji"
                  >
                    storytelling
                  </Link>
                  {" i "}
                  <Link
                    className="text-blue-400 hover:underline font-medium"
                    href="/oferta/dla-firm/marketing/kreacja/public-relations"
                  >
                    budowanie społeczności online
                  </Link>
                </div>
              </div>
              <div className="bg-white border rounded-xl shadow-sm p-6 flex flex-col gap-2">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-blue-400 h-8 w-8 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    B
                  </div>
                  <span className="font-semibold text-lg">
                    Social Media Tools
                  </span>
                </div>
                <div className="text-sm text-zinc-700">
                  Facebook Business Manager, Instagram Creator Studio, social
                  media automation
                </div>
              </div>
              <div className="bg-white border rounded-xl shadow-sm p-6 flex flex-col gap-2">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-blue-400 h-8 w-8 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    C
                  </div>
                  <span className="font-semibold text-lg">
                    Kampanie reklamowe
                  </span>
                </div>
                <div className="text-sm text-zinc-700">
                  Kampanie reklamowe:{" "}
                  <Link
                    className="text-blue-400 hover:underline font-medium"
                    href="/oferta/dla-firm/uslugi-biznesowe/wsparcie-sprzedazy/generowanie-leadow"
                  >
                    lead generation
                  </Link>
                  {", "}
                  <Link
                    className="text-blue-400 hover:underline font-medium"
                    href="/oferta/dla-firm/uslugi-biznesowe/wsparcie-sprzedazy/kwalifikacja-leadow"
                  >
                    conversions
                  </Link>
                  {", "}
                  <Link
                    className="text-blue-400 hover:underline font-medium"
                    href="/oferta/dla-firm/marketing/reklama/branding"
                  >
                    brand awareness
                  </Link>
                  {", "}
                  <Link
                    className="text-blue-400 hover:underline font-medium"
                    href="/oferta/dla-firm/marketing/reklama/ppc-pay-per-click"
                  >
                    reach
                  </Link>
                </div>
              </div>
              <div className="bg-white border rounded-xl shadow-sm p-6 flex flex-col gap-2">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-blue-400 h-8 w-8 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    D
                  </div>
                  <span className="font-semibold text-lg">Analityka</span>
                </div>
                <div className="text-sm text-zinc-700">
                  Analytics: Facebook Insights, Instagram Analytics, Google
                  Analytics 4
                </div>
              </div>
            </div>

            <div className="mx-auto flex flex-row items-center gap-4 mt-10 w-full flex-wrap justify-center">
              <div className="">
                <div className=" text-blue-600">
                  <FaFacebook className="text-3xl" />
                </div>
              </div>
              <div className="">
                <div className=" text-pink-600">
                  <FaInstagram className="text-3xl" />
                </div>
              </div>
              <div className="">
                <div className=" text-black">
                  <FaTiktok className="text-3xl" />
                </div>
              </div>
              <div className="">
                <div className=" text-sky-600">
                  <FaLinkedin className="text-3xl" />
                </div>
              </div>
              <div className="">
                <div className=" text-red-600">
                  <FaYoutube className="text-3xl" />
                </div>
              </div>
            </div>
          </div>
          <div className="h-full relative w-full">
            <div className=" sticky top-[65px] lg:top-[94px] bg-white rounded-bl-lg rounded-tr-lg p-3 w-full max-w-[450px] mt-6">
              <OpinionsSection />
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto pb-16 bg-gradient-to-b from-gray-100 via-zinc-100 to-gray-100 rounded-2xl px-4 sm:px-8 pt-6">
        <div className="relative sm:px-8">
          <h2 className="font-gotham font-semibold text-zinc-800 drop-shadow-lg shadow-black w-full text-lg sm:text-3xl lg:text-4xl flex flex-row items-center justify-center mb-2 tracking-tight max-w-3xl text-center mx-auto">
            Współpracuj z Quixy Studio jako firma lub freelancer!
          </h2>
          <div className="w-16 h-1 bg-blue-500 rounded-full mx-auto mb-6"></div>
          <div className="mt-6">
            <JobBoardList talents={talents} companies={companies} />
          </div>
        </div>
        <p className="text-zinc-700 text-base sm:text-lg max-w-3xl mx-auto text-center mt-14 font-gotham font-light leading-relaxed px-2">
          W poszukiwaniu firmy lub freelancera?{" "}
          <span className="font-semibold text-blue-600">
            Sprawdź ofertę zaufanych partnerów Quixy Studio.
          </span>{" "}
          Możesz dodawać zlecenia dla freelancerów lub zlecenia dla firm.
        </p>
      </div>
    </div>
  );
}
