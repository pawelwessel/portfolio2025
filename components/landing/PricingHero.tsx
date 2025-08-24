import Image from "next/image";

export default function PricingHero() {
  return (
    <div className="mt-12">
      <div className="w-[90vw] sm:w-3/4 mx-auto bg-gradient-to-br from-white via-zinc-50 to-green-50 rounded-2xl p-6 lg:p-10 shadow-lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="order-1 lg:order-none">
            <div className="bg-white rounded-xl p-4 shadow-md border flex items-center justify-center">
              <Image
                src="/google.webp"
                width={800}
                height={600}
                alt="Oferta cenowa – strony i kampanie"
                className="w-full h-auto rounded-lg"
                priority
              />
            </div>
          </div>

          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-zinc-800">
              Cennik – Strony WWW i Marketing
            </h2>
            <p className="text-gray-600 mt-3 text-sm lg:text-base">
              Transparentne pakiety dopasowane do Twoich celów. Poniższe ceny są
              orientacyjne (od), dokładną wycenę przygotujemy po krótkim
              briefie.
            </p>

            <div className="mt-6 overflow-x-auto text-zinc-800 drops-shadow-lg shadow-black">
              <table className="min-w-full text-left text-sm border-separate border-spacing-0">
                <thead>
                  <tr>
                    <th className="bg-zinc-100 text-zinc-800 font-semibold px-4 py-3 rounded-tl-lg border border-zinc-200">
                      Usługa
                    </th>
                    <th className="bg-zinc-100 text-zinc-800 font-semibold px-4 py-3 border-t border-b border-zinc-200">
                      Zakres
                    </th>
                    <th className="bg-zinc-100 text-zinc-800 font-semibold px-4 py-3 rounded-tr-lg border border-zinc-200">
                      Cena od
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <td className="px-4 py-3 border border-zinc-200">
                      Landing page
                    </td>
                    <td className="px-4 py-3 border border-zinc-200">
                      Projekt + wdrożenie, sekcja ofertowa, formularz lead
                    </td>
                    <td className="px-4 py-3 border border-zinc-200 font-semibold">
                      2 900 zł*
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-4 py-3 border border-zinc-200">
                      Strona firmowa
                    </td>
                    <td className="px-4 py-3 border border-zinc-200">
                      Do 6 podstron, CMS, SEO techniczne
                    </td>
                    <td className="px-4 py-3 border border-zinc-200 font-semibold">
                      4 900 zł*
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-4 py-3 border border-zinc-200">
                      Sklep internetowy
                    </td>
                    <td className="px-4 py-3 border border-zinc-200">
                      Katalog produktów, płatności, integracje
                    </td>
                    <td className="px-4 py-3 border border-zinc-200 font-semibold">
                      8 900 zł*
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-4 py-3 border border-zinc-200">
                      Aplikacja/Platforma
                    </td>
                    <td className="px-4 py-3 border border-zinc-200">
                      Dedykowana architektura i funkcje
                    </td>
                    <td className="px-4 py-3 border border-zinc-200 font-semibold">
                      15 000 zł*
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan={3}
                      className="bg-zinc-50 px-4 py-2 text-xs text-zinc-500"
                    >
                      &nbsp;
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-4 py-3 border border-zinc-200">
                      Google Ads – Start
                    </td>
                    <td className="px-4 py-3 border border-zinc-200">
                      Konta, GA4, GTM, 1-2 kampanie, optymalizacja
                    </td>
                    <td className="px-4 py-3 border border-zinc-200 font-semibold">
                      1 500 zł/mc*
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-4 py-3 border border-zinc-200">
                      Google Ads – Pro
                    </td>
                    <td className="px-4 py-3 border border-zinc-200">
                      Rozszerzona struktura, A/B testy, raporty
                    </td>
                    <td className="px-4 py-3 border border-zinc-200 font-semibold">
                      2 900 zł/mc*
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-4 py-3 border border-zinc-200">
                      Social Media – Prowadzenie
                    </td>
                    <td className="px-4 py-3 border border-zinc-200">
                      Strategia, kreacje, publikacje, moderacja
                    </td>
                    <td className="px-4 py-3 border border-zinc-200 font-semibold">
                      1 900 zł/mc*
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 text-xs text-zinc-500">
              * Ceny netto „od”. Końcowa wycena zależy od zakresu, ilości
              podstron, integracji i budżetów mediowych. Budżet reklam nie jest
              wliczony w abonament.
            </div>

            <div className="mt-6">
              <a
                href="#contact"
                className="inline-block bg-gradient-to-r from-[#B4FC2D] to-[#3EE7C0] text-black font-semibold px-5 py-3 rounded-lg shadow"
              >
                Zamów wycenę
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
