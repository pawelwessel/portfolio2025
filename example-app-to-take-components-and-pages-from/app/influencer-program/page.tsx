import JoinCTA from "@/components/Influencer/JoinCTA";
import Image from "next/image";
import influencer from "@/public/influencer.jpg";
export default function InfluencerProgramPage() {
  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden pt-24 sm:pt-28 pb-12 sm:pb-16 bg-gradient-to-br from-rose-50 to-purple-50 rounded-b-3xl">
        <div className="container-professional">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <div className="flex items-center justify-center max-h-[70vh] overflow-hidden rounded-xl">
                <Image
                  src={influencer}
                  width={555}
                  height={555}
                  alt="Influencer Program"
                  className="w-full h-auto shadow-lg mb-6 lg:mb-0"
                />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 to-rose-500 bg-clip-text text-transparent leading-tight">
                Program influencerów Naily
              </h1>
              <p className="mt-4 text-neutral-600 text-base sm:text-lg leading-relaxed">
                Zarabiaj polecając platformę, którą tworzymy z miłości do
                manicure i pedicure. Tworzymy kampanie marketingowe i
                współpracujemy z influencerami — jak Booksy, tylko że za darmo
                dla Twojej społeczności.
              </p>
              <div className="mt-6">
                <JoinCTA primary />
              </div>
              <p className="mt-3 text-xs sm:text-sm text-neutral-500">
                Dołącz w 1 minutę. Otrzymasz własny link i panel wyników.
              </p>
              <div className="professional-card p-6 rounded-2xl shadow-lg bg-white border border-purple-100">
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-gradient-to-br from-rose-100 to-purple-100 text-center">
                    <p className="text-3xl font-bold text-purple-600">15%</p>
                    <p className="text-xs text-neutral-600 mt-1">
                      Śr. konwersja
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 text-center">
                    <p className="text-3xl font-bold text-rose-600">+120</p>
                    <p className="text-xs text-neutral-600 mt-1">Partnerów</p>
                  </div>
                  <div className="p-4 rounded-xl bg-gradient-to-br from-pink-100 to-rose-100 text-center">
                    <p className="text-3xl font-bold text-purple-600">∞</p>
                    <p className="text-xs text-neutral-600 mt-1">
                      Potencjał zysków
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding px-4 sm:px-6 bg-white">
        <div className="container-professional">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-rose-500 bg-clip-text text-transparent mb-3">
              Dlaczego warto?
            </h2>
            <p className="text-sm sm:text-base text-neutral-500 max-w-2xl mx-auto font-medium leading-relaxed">
              Silna propozycja wartości, która zwiększa Twoje przychody i
              zasięgi
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="professional-card p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-rose-50 to-purple-50 border border-purple-100">
              <h3 className="text-lg sm:text-xl font-bold text-neutral-900 mb-2">
                Własny link polecający
              </h3>
              <p className="text-neutral-600 text-sm sm:text-base">
                Po zalogowaniu utworzysz unikalny link. Promuj go w bio, Stories
                i postach.
              </p>
            </div>
            <div className="professional-card p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100">
              <h3 className="text-lg sm:text-xl font-bold text-neutral-900 mb-2">
                Kampanie i wsparcie
              </h3>
              <p className="text-neutral-600 text-sm sm:text-base">
                Dostajesz materiały, briefy i kreacje reklamowe. Ty skupiasz się
                na relacjach, my na marketingu.
              </p>
            </div>
            <div className="professional-card p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-pink-50 to-rose-50 border border-purple-100">
              <h3 className="text-lg sm:text-xl font-bold text-neutral-900 mb-2">
                Etycznie i za darmo
              </h3>
              <p className="text-neutral-600 text-sm sm:text-base">
                Jak Booksy, ale bez kosztów dla Twojej społeczności. Wygrywają
                wszyscy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section-padding px-4 sm:px-6 bg-neutral-50">
        <div className="container-professional">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="professional-card p-6 sm:p-8 text-center bg-white rounded-2xl border border-purple-100">
              <div className="font-bold text-3xl w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-rose-400 to-purple-400 text-white rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                1
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">Dołącz</h3>
              <p className="text-neutral-600 text-sm sm:text-base">
                Zaloguj się i utwórz konto influencera
              </p>
            </div>
            <div className="professional-card p-6 sm:p-8 text-center bg-white rounded-2xl border border-purple-100">
              <div className="font-bold text-3xl w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                2
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">Stwórz link</h3>
              <p className="text-neutral-600 text-sm sm:text-base">
                Ustal alias i wygeneruj swój link polecający
              </p>
            </div>
            <div className="professional-card p-6 sm:p-8 text-center bg-white rounded-2xl border border-purple-100">
              <div className="font-bold text-3xl w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-pink-400 to-rose-400 text-white rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                3
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">Zarabiaj</h3>
              <p className="text-neutral-600 text-sm sm:text-base">
                Udostępniaj link i obserwuj wyniki w panelu
              </p>
            </div>
          </div>
          <div className="text-center mt-8">
            <JoinCTA />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding px-4 sm:px-6 bg-white">
        <div className="container-professional">
          <div className="professional-card p-6 sm:p-8 rounded-2xl shadow-lg bg-gradient-to-br from-rose-50 to-purple-50 border border-purple-100 text-center">
            <h3 className="text-xl sm:text-2xl font-bold text-neutral-900">
              Dołącz do programu influencerów Naily już dziś
            </h3>
            <p className="mt-2 text-neutral-600 max-w-2xl mx-auto">
              Najłatwiejszy sposób, aby monetyzować Twój wpływ w świecie nails.
            </p>
            <div className="mt-5">
              <JoinCTA primary />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
