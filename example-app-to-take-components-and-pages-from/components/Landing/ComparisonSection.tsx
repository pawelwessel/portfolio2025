"use client";

import Image from "next/image";
import { FaCheck, FaTimes } from "react-icons/fa";

declare global {
  interface Window {
    openLoginRegisterPopup?: (
      _tab?: "login" | "register",
      _accountType?: "salon" | "individual"
    ) => void;
  }
}

export default function ComparisonSection() {
  const openRegisterPopup = () => {
    if (typeof window !== "undefined" && window.openLoginRegisterPopup) {
      window.openLoginRegisterPopup("register");
    }
  };
  return (
    <section className="min-h-screen flex items-center justify-center py-12 px-4 bg-gradient-to-br from-purple-50 to-rose-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 md:mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-6 leading-tight">
            Korzystasz z innych platform?
            <br />
            <span className="text-purple-600 bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">
              Zaimportuj dane do Naily!
            </span>
          </h2>
          <p className="text-neutral-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Zachowaj swoje rezerwacje i bazę klientów, zyskując jednocześnie
            dostęp do zaawansowanych funkcji
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {/* Other Platforms Column */}
          <div className="bg-white rounded-2xl shadow-lg border border-neutral-200 overflow-hidden animate-slide-in hover:shadow-xl transition-shadow duration-300">
            <div className="bg-neutral-100 px-6 py-4 border-b border-neutral-200">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-neutral-400 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">?</span>
                </div>
                <h3 className="text-xl font-semibold text-neutral-900">
                  Popularne aplikacje rezerwacyjne
                </h3>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                <FeatureItem
                  icon={<FaCheck className="text-green-500" />}
                  text="Podstawowe funkcje rezerwacji"
                />
                <FeatureItem
                  icon={<FaCheck className="text-green-500" />}
                  text="Kalendarz terminów"
                />
                <FeatureItem
                  icon={<FaCheck className="text-green-500" />}
                  text="Baza klientów"
                />
                <FeatureItem
                  icon={<FaCheck className="text-green-500" />}
                  text="Standardowe powiadomienia"
                />
                <FeatureItem
                  icon={<FaTimes className="text-orange-500" />}
                  text="Prowizje od rezerwacji"
                />
                <FeatureItem
                  icon={<FaTimes className="text-orange-500" />}
                  text="Ograniczone opcje personalizacji"
                />
                <FeatureItem
                  icon={<FaTimes className="text-orange-500" />}
                  text="Podstawowe narzędzia marketingowe"
                />
                <FeatureItem
                  icon={<FaTimes className="text-orange-500" />}
                  text="Brak specjalizacji branżowej"
                />
              </div>

              <div className="mt-8 pt-6 border-t border-neutral-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-neutral-900 mb-2">
                    Standardowe rozwiązania
                  </div>
                  <div className="text-sm text-neutral-600">
                    z ograniczeniami rozwoju
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Naily Column */}
          <div className="bg-white rounded-2xl shadow-xl border-2 border-purple-300 relative animate-slide-in hover:shadow-2xl hover:scale-105 transform transition-all duration-300">
            {/* Popular Badge */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
              <div className="text-xs w-max bg-gradient-to-r from-purple-600 to-rose-500 text-white px-4 py-1 rounded-full font-semibold">
                Rozszerz możliwości
              </div>
            </div>

            <div className="rounded-t-2xl bg-gradient-to-r from-purple-100 to-rose-100 px-6 py-4 border-b border-purple-200">
              <div className="flex items-center gap-3">
                <Image
                  src="/naily-logo.png"
                  alt="Naily Logo"
                  width={100}
                  height={100}
                  className="w-auto h-16"
                />
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                <FeatureItem
                  icon={<FaCheck className="text-green-500" />}
                  text="Inteligentne rezerwacje"
                  highlight
                />
                <FeatureItem
                  icon={<FaCheck className="text-green-500" />}
                  text="0% prowizji od rezerwacji"
                  highlight
                />
                <FeatureItem
                  icon={<FaCheck className="text-green-500" />}
                  text="Zaawansowane ustawienia profilu"
                  highlight
                />
                <FeatureItem
                  icon={<FaCheck className="text-green-500" />}
                  text="Płatności online"
                  highlight
                />
                <FeatureItem
                  icon={<FaCheck className="text-green-500" />}
                  text="Rozwój biznesu"
                  highlight
                />
                <FeatureItem
                  icon={<FaCheck className="text-green-500" />}
                  text="Narzędzia do reklamy"
                  highlight
                />
                <FeatureItem
                  icon={<FaCheck className="text-green-500" />}
                  text="Dedykowana obsługa"
                  highlight
                />
              </div>

              <div className="mt-6">
                <button
                  onClick={openRegisterPopup}
                  className="w-full bg-gradient-to-r from-purple-600 to-rose-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-rose-600 transition-all duration-200 shadow-lg hover:scale-105 transform"
                >
                  Dołącz do Naily
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className="text-center mt-12 md:mt-16 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto border border-purple-200 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-2xl font-bold text-neutral-900 mb-4">
              Przenieś swoją działalność na wyższy poziom
            </h3>
            <p className="text-neutral-600 mb-6 leading-relaxed">
              Zachowaj swoich klientów i rezerwacje, zyskując dostęp do
              zaawansowanych narzędzi rozwoju biznesu bez prowizji.
            </p>
            <button
              onClick={openRegisterPopup}
              className="bg-gradient-to-r from-purple-600 to-rose-500 text-white py-3 px-8 rounded-lg font-semibold hover:from-purple-700 hover:to-rose-600 transition-all duration-200 shadow-lg hover:scale-105 transform"
            >
              Dołącz do Naily
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

interface FeatureItemProps {
  icon: React.ReactNode;
  text: string;
  highlight?: boolean;
}

function FeatureItem({ icon, text, highlight = false }: FeatureItemProps) {
  return (
    <div
      className={`flex items-start gap-3 ${
        highlight
          ? "bg-purple-50 -mx-2 px-2 py-1 rounded-lg hover:bg-purple-100 transition-colors duration-200"
          : ""
      }`}
    >
      <div className="flex-shrink-0 mt-0.5">{icon}</div>
      <span
        className={`text-sm leading-relaxed ${
          highlight ? "font-medium text-neutral-800" : "text-neutral-700"
        }`}
      >
        {text}
      </span>
    </div>
  );
}
