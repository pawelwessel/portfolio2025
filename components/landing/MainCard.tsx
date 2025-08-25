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

export default function MainCard() {
  return (
    <div
      id="about"
      className="w-[90vw] sm:w-3/4 mx-auto text-xl sm:text-2xl lg:text-3xl flex flex-col mt-12 bg-white px-6 xl:px-12 py-3 xl:pb-12 rounded-md relative text-zinc-700 drop-shadow-md shadow-black"
    >
      <div>
        <div className="group">
          <Image
            src="/logo-quixy.png"
            width={400}
            height={400}
            alt="Quixy Studio Logo"
            className="max-w-[250px] lg:mx-0 mt-6"
            priority
          />
        </div>
        <h2 className="text-3xl lg:text-4xl font-bold mt-12">
          Strony WWW i Marketing dla Twojej firmy
        </h2>
        <p className="text-base font-light max-w-[45rem] mt-4 text-justify lg:text-left">
          Projektujemy szybkie i skuteczne strony internetowe, sklepy oraz
          landing pages, a także prowadzimy marketing w mediach
          społecznościowych. Łączymy design, technologię i analitykę, aby
          dowozić realne wyniki biznesowe.
        </p>
      </div>

      <div className="mt-6">
        <h2 className="text-3xl lg:text-4xl font-bold">
          Oferta stron internetowych
        </h2>
        <ul className="mt-6 space-y-3 flex flex-col text-sm">
          <li className="flex flex-row items-center">
            <div className="bg-[#52eba7] h-2 w-2 rounded-full mr-2"></div>
            Projekt i wdrożenie: wizytówki, strony firmowe, sklepy, landing
            pages
          </li>
          <li className="flex flex-row items-center">
            <div className="bg-[#52eba7] h-2 w-2 rounded-full mr-2"></div>
            CMS i edycja treści, automatyzacje oraz integracje
          </li>
          <li className="flex flex-row items-center">
            <div className="bg-[#52eba7] h-2 w-2 rounded-full mr-2"></div>
            SEO techniczne i Core Web Vitals, PageSpeed 95–100
          </li>
          <li className="flex flex-row items-center">
            <div className="bg-[#52eba7] h-2 w-2 rounded-full mr-2"></div>
            Hosting, bezpieczeństwo, wsparcie i rozwój po wdrożeniu
          </li>
        </ul>
      </div>

      <div className="mt-10">
        <h2 className="text-3xl lg:text-4xl font-bold">
          Marketing w social media
        </h2>

        <ul className="mt-6 space-y-2 flex flex-col text-sm">
          <li className="flex flex-row items-center">
            <div className="bg-[#52eba7] h-2 w-2 rounded-full mr-2"></div>
            Content marketing, storytelling i budowanie społeczności online
          </li>
          <li className="flex flex-row items-center">
            <div className="bg-[#52eba7] h-2 w-2 rounded-full mr-2"></div>
            Facebook Business Manager, Instagram Creator Studio, social media
            automation
          </li>
          <li className="flex flex-row items-center">
            <div className="bg-[#52eba7] h-2 w-2 rounded-full mr-2"></div>
            Kampanie reklamowe: lead generation, conversions, brand awareness,
            reach
          </li>
          <li className="flex flex-row items-center">
            <div className="bg-[#52eba7] h-2 w-2 rounded-full mr-2"></div>
            Analytics: Facebook Insights, Instagram Analytics, Google Analytics
            4
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
      <p className="text-base font-light max-w-[45rem] mt-4">
        Kompleksowa obsługa social media: zarządzanie profilami, strategia
        content marketingu, kreacje graficzne i video, kampanie reklamowe
        Facebook Ads i Instagram Ads, community management, influencer
        marketing, remarketing, targeting demograficzny, analityka mediów
        społecznościowych, organic reach, engagement, hashtag strategy,
        user-generated content (UGC), social listening, brand awareness i
        raportowanie KPI.
      </p>
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
                  <div className="bg-[#52eba7] h-2 w-2 rounded-full mr-2"></div>
                  Audyt i strategia kampanii pod cele biznesowe
                </li>
                <li className="flex items-center">
                  <div className="bg-[#52eba7] h-2 w-2 rounded-full mr-2"></div>
                  Landing page nastawiony na konwersję
                </li>
                <li className="flex items-center">
                  <div className="bg-[#52eba7] h-2 w-2 rounded-full mr-2"></div>
                  GA4, Google Tag Manager, śledzenie konwersji
                </li>
                <li className="flex items-center">
                  <div className="bg-[#52eba7] h-2 w-2 rounded-full mr-2"></div>
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
