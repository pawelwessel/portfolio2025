"use client";
import dynamic from "next/dynamic";

const HeroStars = dynamic(() => import("@/components/hero/Hero"), {
  ssr: false,
});

export default function Page() {
  return (
    <div className="relative w-screen overflow-x-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="fixed left-0 top-0 w-full h-screen">
          <HeroStars />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#11131a]/70 to-[#0b0d12]" />
      </div>

      <main className="relative z-10 min-h-screen w-full px-4">
        <section className="w-full max-w-4xl mx-auto py-28">
          <h1 className="text-3xl lg:text-4xl font-bold text-white">
            Regulamin i informacje o danych
          </h1>
          <p className="text-gray-300 mt-4 leading-relaxed">
            W ramach realizacji usług przechowujemy wyłącznie następujące dane:
          </p>
          <ul className="mt-4 space-y-2 text-gray-200 list-disc list-inside">
            <li>Numer telefonu</li>
            <li>Imię i nazwisko</li>
          </ul>

          <div className="mt-8 space-y-4 text-gray-300">
            <p>
              Dane przetwarzamy wyłącznie w celu wykonania prac związanych z
              przygotowaniem i realizacją stron oraz materiałów. Nie
              udostępniamy ich podmiotom trzecim.
            </p>
            <p>
              Okres przechowywania: przez czas trwania współpracy oraz tak
              długo, jak wymagają tego obowiązujące przepisy prawa lub
              uzasadniony interes (np. rozliczenia).
            </p>
            <p>
              Prawa osoby, której dane dotyczą: dostęp do danych, ich
              sprostowanie, ograniczenie przetwarzania lub usunięcie. W celu
              realizacji praw skontaktuj się z nami.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
