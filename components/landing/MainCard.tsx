import Image from "next/image";
import Cta from "@/components/cta/Cta";
import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";
import RecentProjects from "../RecentProjects";
import VideoPlayer from "../VideoPlayer";
import OpinionsSection from "./OpinionsSection";
import Link from "next/link";

export default function MainCard() {
  return (
    <div
      id="about"
      className="text-xl sm:text-2xl lg:text-3xl flex flex-col mt-12 bg-white px-6 xl:px-12 py-3 xl:pb-12 rounded-md relative text-zinc-700 drop-shadow-md shadow-black"
    >
      <div className="flex flex-col lg:flex-row gap-12 items-center lg:items-start">
        <div>
          <h2 className="text-3xl lg:text-4xl font-bold mt-12 font-gotham">
            Strony Internetowe w twojej okolicy – projektowanie i tworzenie
            stron www
          </h2>
          <p className="text-base font-light max-w-[45rem] mt-4 text-justify lg:text-left">
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
            </Link>
            w
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
            , aby dowozić realne wyniki
            <Link
              className="text-blue-400"
              href="/oferta/dla-firm/uslugi-biznesowe"
            >
              biznesowe
            </Link>
            .
          </p>

          <div className="mt-6">
            <h2 className="text-2xl font-gotham">Co w ofercie?</h2>
            <ul className="mt-6 space-y-3 flex flex-col text-sm">
              <li className="flex items-start gap-2">
                <div className="bg-blue-500 h-2 w-2 rounded-full mt-2"></div>
                <div>
                  <span className="font-medium">Projekt i wdrożenie:</span>{" "}
                  <Link
                    className="text-blue-500 hover:underline font-medium"
                    href="/oferta/tworzenie-stron-w-internecie-grudziadz"
                  >
                    klasyczne strony internetowe
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
              </li>
              <li className="flex items-start gap-2">
                <div className="bg-blue-500 h-2 w-2 rounded-full mt-2"></div>
                <div>
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
              </li>
              <li className="flex items-start gap-2">
                <div className="bg-blue-500 h-2 w-2 rounded-full mt-2"></div>
                <div>
                  <Link
                    className="text-blue-500 hover:underline font-medium"
                    href="/oferta/dla-firm/marketing/marketing-cyfrowy/seo"
                  >
                    SEO techniczne
                  </Link>
                  {" i Core Web Vitals, PageSpeed 95–100"}
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="bg-blue-500 h-2 w-2 rounded-full mt-2"></div>
                <div>
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
              </li>
            </ul>
          </div>

          <div className="mt-10">
            <h2 className="text-2xl font-gotham">
              Marketing dla <span className="text-blue-500">Twojej firmy</span>
            </h2>

            <ul className="mt-6 space-y-2 flex flex-col text-sm">
              <li className="flex flex-row items-center">
                <div className="bg-blue-500 min-h-2 min-w-2 rounded-full mr-2"></div>
                <Link
                  className="text-blue-400"
                  href="/oferta/dla-firm/marketing/marketing-cyfrowy/content-marketing"
                >
                  Content marketing
                </Link>
                ,{" "}
                <Link
                  className="text-blue-400"
                  href="/oferta/dla-firm/marketing/kreacja/strategia-komunikacji"
                >
                  storytelling
                </Link>{" "}
                i{" "}
                <Link
                  className="text-blue-400"
                  href="/oferta/dla-firm/marketing/kreacja/public-relations"
                >
                  budowanie społeczności online
                </Link>
              </li>
              <li className="flex flex-row items-center">
                <div className="bg-blue-500 min-h-2 min-w-2 rounded-full mr-2"></div>
                Facebook Business Manager, Instagram Creator Studio, social
                media automation
              </li>
              <li className="flex flex-row items-center">
                <div className="bg-blue-500 min-h-2 min-w-2 rounded-full mr-2"></div>
                Kampanie reklamowe:{" "}
                <Link
                  className="text-blue-400"
                  href="/oferta/dla-firm/uslugi-biznesowe/wsparcie-sprzedazy/generowanie-leadow"
                >
                  lead generation
                </Link>
                ,{" "}
                <Link
                  className="text-blue-400"
                  href="/oferta/dla-firm/uslugi-biznesowe/wsparcie-sprzedazy/kwalifikacja-leadow"
                >
                  conversions
                </Link>
                ,{" "}
                <Link
                  className="text-blue-400"
                  href="/oferta/dla-firm/marketing/reklama/branding"
                >
                  brand awareness
                </Link>
                ,{" "}
                <Link
                  className="text-blue-400"
                  href="/oferta/dla-firm/marketing/reklama/ppc-pay-per-click"
                >
                  reach
                </Link>
              </li>
              <li className="flex flex-row items-center">
                <div className="bg-blue-500 min-h-2 min-w-2 rounded-full mr-2"></div>
                Analytics: Facebook Insights, Instagram Analytics, Google
                Analytics 4
              </li>
            </ul>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-6">
              <div className="bg-white border rounded-xl p-4 flex flex-col items-center justify-center shadow-sm">
                <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                  <FaFacebook className="text-2xl" />
                </div>
                <div className="text-sm mt-2">Facebook</div>
              </div>
              <div className="bg-white border rounded-xl p-4 flex flex-col items-center justify-center shadow-sm">
                <div className="w-14 h-14 rounded-full bg-pink-50 flex items-center justify-center text-pink-600">
                  <FaInstagram className="text-2xl" />
                </div>
                <div className="text-sm mt-2">Instagram</div>
              </div>
              <div className="bg-white border rounded-xl p-4 flex flex-col items-center justify-center shadow-sm">
                <div className="w-14 h-14 rounded-full bg-black/5 flex items-center justify-center text-black">
                  <FaTiktok className="text-2xl" />
                </div>
                <div className="text-sm mt-2">TikTok</div>
              </div>
              <div className="bg-white border rounded-xl p-4 flex flex-col items-center justify-center shadow-sm">
                <div className="w-14 h-14 rounded-full bg-sky-50 flex items-center justify-center text-sky-600">
                  <FaLinkedin className="text-2xl" />
                </div>
                <div className="text-sm mt-2">LinkedIn</div>
              </div>
              <div className="bg-white border rounded-xl p-4 flex flex-col items-center justify-center shadow-sm">
                <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center text-red-600">
                  <FaYoutube className="text-2xl" />
                </div>
                <div className="text-sm mt-2">YouTube</div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full  mt-12">
          <div className="flex flex-col">
            <Image
              src="https://images.pexels.com/photos/18569238/pexels-photo-18569238.jpeg?_gl=1*cakisu*_ga*NzU4NzQzMjk1LjE3NTU1MTc3ODk.*_ga_8JE65Q40S6*czE3NTU2MDYyMTckbzIkZzEkdDE3NTU2MDYyNjgkajkkbDAkaDA."
              width={800}
              height={600}
              alt="Strony Internetowe w twojej okolicy – projektowanie i tworzenie stron www"
              className="w-full max-w-[650px] h-auto rounded-lg"
              priority
            />
            <div className="max-w-[450px] mt-12">
              <OpinionsSection />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <RecentProjects />
      </div>

      <div className="w-full">
        <div className="bg-gradient-to-br from-white to-zinc-50 border rounded-2xl p-6 lg:p-10 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <h2 className="text-3xl lg:text-4xl font-bold">
                Ekskluzywna kampania w Google Ads
              </h2>
              <p className="text-base font-light mt-4">
                Kompleksowa realizacja kampanii: audyt, dobór słów kluczowych,
                kreacje, landing page, konfiguracja GA4 i GTM, śledzenie
                konwersji, cotygodniowa optymalizacja oraz przejrzyste
                raportowanie wyników. Pakiet zawiera również ofertę z zakresu
                SEO - nie, nie generujemy treści przy użyciu AI Botów.
              </p>
              <ul className="mt-6 space-y-2 text-sm">
                <li className="flex items-center">
                  <div className="bg-blue-500 min-h-2 min-w-2 rounded-full mr-2"></div>
                  Audyt i strategia kampanii pod cele biznesowe
                </li>
                <li className="flex items-center">
                  <div className="bg-blue-500 min-h-2 min-w-2 rounded-full mr-2"></div>
                  Landing page nastawiony na konwersję
                </li>
                <li className="flex items-center">
                  <div className="bg-blue-500 min-h-2 min-w-2 rounded-full mr-2"></div>
                  GA4, Google Tag Manager, śledzenie konwersji
                </li>
                <li className="flex items-center">
                  <div className="bg-blue-500 min-h-2 min-w-2 rounded-full mr-2"></div>
                  Optymalizacja stawek i jakości, A/B testy
                </li>
              </ul>
              <div className="mt-6">
                <Cta label="Zamów kampanię Google Ads" />
              </div>
            </div>
            <div className="flex justify-end h-max">
              <Image
                src="/google.webp"
                alt="Google Ads"
                width={600}
                height={400}
                className="w-full max-w-[179px]"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
