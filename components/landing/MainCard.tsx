import Image from "next/image";
import CountToTheNumberAnimated from "@/components/counter/CountToTheNumberAnimated";

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
        <h2 className="text-3xl lg:text-4xl font-bold mt-12">Kim jestem?</h2>
        <p className="text-base font-light max-w-[45rem] mt-4 text-justify lg:text-left">
          Cześć! Jestem Paweł Wessel – profesjonalny programista i pasjonat
          designu. Od ponad 10 lat zajmuję się full-stack developmentem,
          projektując i budując nowoczesne strony internetowe oraz aplikacje
          web. Moją misją jest przekładanie pomysłów na funkcjonalne, piękne i
          wydajne rozwiązania cyfrowe. Współpracuję z klientami od koncepcji po
          wdrożenie, dbając o każdy szczegół.
        </p>
        <div className="mt-3">
          <span className="text-base">Moja filozofia: </span>
          <span className="text-base font-bold">
            jakość, współpraca, innowacja
          </span>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-3xl lg:text-4xl font-bold">Co oferuję?</h2>
        <ul className="mt-6 space-y-3 flex flex-col text-sm">
          <li className="flex flex-row items-center">
            <div className="bg-[#52eba7] h-2 w-2 rounded-full mr-2"></div>
            Indywidualne podejście do każdego projektu
          </li>
          <li className="flex flex-row items-center">
            <div className="bg-[#52eba7] h-2 w-2 rounded-full mr-2"></div>
            Transparentny proces współpracy
          </li>
          <li className="flex flex-row items-center">
            <div className="bg-[#52eba7] h-2 w-2 rounded-full mr-2"></div>
            Wsparcie na każdym etapie rozwoju
          </li>
          <li className="flex flex-row items-center">
            <div className="bg-[#52eba7] h-2 w-2 rounded-full mr-2"></div>
            Czytelne ustalenia i wycena
          </li>
          <li className="flex flex-row items-center">
            <div className="bg-[#52eba7] h-2 w-2 rounded-full mr-2"></div>
            Długoterminowa współpraca i rozwój
          </li>
        </ul>
      </div>

      <div className="mt-6">
        <div className="flex flex-col">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold">
              Jakie projekty realizuję?
            </h2>
            <ul className="mt-6 space-y-3 flex flex-col text-sm">
              <li className="flex flex-row items-center font-bold">
                <div className="bg-[#52eba7] h-2 w-2 rounded-full mr-2"></div>
                Strona wizytówka
              </li>
              <li className="flex flex-row items-center font-bold">
                <div className="bg-[#52eba7] h-2 w-2 rounded-full mr-2"></div>
                Strona firmowa
              </li>
              <li className="flex flex-row items-center font-bold">
                <div className="bg-[#52eba7] h-2 w-2 rounded-full mr-2"></div>
                Sklep internetowy
              </li>
              <li className="flex flex-row items-center font-bold">
                <div className="bg-[#52eba7] h-2 w-2 rounded-full mr-2"></div>
                Oprogramowanie do zarządzania firmą
              </li>
              <li className="flex flex-row items-center font-bold">
                <div className="bg-[#52eba7] h-2 w-2 rounded-full mr-2"></div>
                Oprogramowanie dedykowane
              </li>
              <li className="flex flex-row items-center font-bold">
                <div className="bg-[#52eba7] h-2 w-2 rounded-full mr-2"></div>
                Aplikacje mobilne
              </li>
            </ul>
          </div>
          <div className="mt-12">
            <CountToTheNumberAnimated
              textBeforeNumber="Zrealizowałem już"
              textAfterNumber="Projektów"
              numberToAnimateTo={79}
              textColor="#3F3F46"
              animationSpeed={55}
            />
          </div>
        </div>
      </div>

      <div className="mt-12"></div>

      <div className="w-full">
        <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-center">
          Portfolio Projektów
        </h2>
        <p className="text-base lg:text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
          Poznaj moje najnowsze realizacje - od prostych stron wizytówek po
          zaawansowane systemy CRM
        </p>

        <div className="relative max-w-6xl mx-auto mb-16">
          <div className="overflow-hidden rounded-2xl">
            <div className="portfolio-slider flex transition-transform duration-500 ease-in-out">
              <div className="min-w-full bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="flex flex-col lg:flex-row">
                  <div className="lg:w-1/2 p-8 flex flex-col justify-center">
                    <div className="mb-4">
                      <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold mb-3">
                        Aplikacja Full-stack
                      </span>
                      <h3 className="text-3xl font-bold text-gray-800 mb-3">
                        Quixy.pl
                      </h3>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        Platforma internetowa z ofertami pracy zdalnej, która
                        łączy klientów z talentami. Zawiera system
                        mikropłatności, generator obrazów AI i zaawansowany
                        panel użytkownika.
                      </p>
                    </div>
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                          React
                        </span>
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                          Next.js
                        </span>
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                          Firebase
                        </span>
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                          Stripe
                        </span>
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                          OpenAI
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="min-w-full bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="flex flex-col lg:flex-row">
                  <div className="lg:w-1/2 p-8 flex flex-col justify-center">
                    <div className="mb-4">
                      <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold mb-3">
                        System CRM
                      </span>
                      <h3 className="text-3xl font-bold text-gray-800 mb-3">
                        Hexon.work
                      </h3>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        Zaawansowany system CRM dla branży energetycznej. System
                        reflinków, zarządzanie leadami, analityka, wykresy,
                        asystent AI. Obsłużył 10,000+ użytkowników podczas
                        kampanii marketingowej w Google Ads.
                      </p>
                    </div>
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                          React
                        </span>
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                          Next.js
                        </span>
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                          Firebase
                        </span>
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                          Chart.js
                        </span>
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                          OpenAI
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="min-w-full bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="flex flex-col lg:flex-row">
                  <div className="lg:w-1/2 p-8 flex flex-col justify-center">
                    <div className="mb-4">
                      <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold mb-3">
                        Sklep Online
                      </span>
                      <h3 className="text-3xl font-bold text-gray-800 mb-3">
                        Blackbellart.com
                      </h3>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        Aplikacja internetowa dla artysty. Sklep z obrazami,
                        oferta usług tatuatorskich, blog o tatuażach oraz
                        galeria prac z zaawansowanymi animacjami.
                      </p>
                    </div>
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                          React
                        </span>
                        <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                          TypeScript
                        </span>
                        <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                          Next.js
                        </span>
                        <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                          Stripe
                        </span>
                        <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                          Three.js
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="min-w-full bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="flex flex-col lg:flex-row">
                  <div className="lg:w-1/2 p-8 flex flex-col justify-center">
                    <div className="mb-4">
                      <span className="inline-block bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm font-semibold mb-3">
                        E-commerce
                      </span>
                      <h3 className="text-3xl font-bold text-gray-800 mb-3">
                        Zaklejki.pl
                      </h3>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        Sklep internetowy z kolekcją ponad 2000 ręcznie
                        wycinanych naklejek. System loterii, zarządzanie
                        produktami i automatyzacja procesów sprzedaży.
                      </p>
                    </div>
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm">
                          React
                        </span>
                        <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm">
                          Next.js
                        </span>
                        <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm">
                          Firebase
                        </span>
                        <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm">
                          Python
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-6 space-x-3">
            <button className="slider-dot w-3 h-3 rounded-full bg-blue-600 transition-colors duration-300"></button>
            <button className="slider-dot w-3 h-3 rounded-full bg-gray-300 hover:bg-gray-400 transition-colors duration-300"></button>
            <button className="slider-dot w-3 h-3 rounded-full bg-gray-300 hover:bg-gray-400 transition-colors duration-300"></button>
            <button className="slider-dot w-3 h-3 rounded-full bg-gray-300 hover:bg-gray-400 transition-colors duration-300"></button>
          </div>
        </div>

        <div className="mb-12">
          <h3 className="text-2xl lg:text-3xl font-bold text-center mb-8">
            Moja Droga Rozwoju
          </h3>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-300"></div>

              <div className="space-y-6">
                <div className="relative flex items-center">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm relative z-10">
                    15
                  </div>
                  <div className="ml-6 bg-blue-50 p-4 rounded-lg flex-1">
                    <div className="font-bold text-blue-700">
                      2015 - Szkoła Informatyczna
                    </div>
                    <p className="text-sm text-gray-600">
                      Zacząłem uczyć się informatyki w Technikum Informatycznym
                    </p>
                  </div>
                </div>

                <div className="relative flex items-center">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm relative z-10">
                    17
                  </div>
                  <div className="ml-6 bg-green-50 p-4 rounded-lg flex-1">
                    <div className="font-bold text-green-700">
                      2017 - Pierwsza Strona WWW
                    </div>
                    <p className="text-sm text-gray-600">
                      Utworzyłem swoją pierwszą prostą stronę opartą o HTML, CSS
                      i JavaScript
                    </p>
                  </div>
                </div>

                <div className="relative flex items-center">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm relative z-10">
                    21
                  </div>
                  <div className="ml-6 bg-purple-50 p-4 rounded-lg flex-1">
                    <div className="font-bold text-purple-700">
                      2021 - Nauka React
                    </div>
                    <p className="text-sm text-gray-600">
                      Chciałem rozwijać się w kierunku programowania i natknąłem
                      się na bibliotekę React
                    </p>
                  </div>
                </div>

                <div className="relative flex items-center">
                  <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-sm relative z-10">
                    23
                  </div>
                  <div className="ml-6 bg-indigo-50 p-4 rounded-lg flex-1">
                    <div className="font-bold text-indigo-700">
                      2023 - Tworzenie Projektów
                    </div>
                    <p className="text-sm text-gray-600">
                      Stworzyłem kilka projektów, które znajdują się w moim
                      portfolio
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
