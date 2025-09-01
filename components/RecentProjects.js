"use client";
import Image from "next/image";
import { useState } from "react";

const projects = [
  {
    img: "/6.PNG",
    name: "Naily.pl",
    desc: "Platforma z systemem rezerwacji w branży beauty",
    achievement:
      "Zoptymalizowaliśmy czas ładowania strony z 7.2s do 0.8s poprzez implementację lazy loading i optymalizację obrazów.",
  },
  {
    img: "/5.PNG",
    name: "Blackbellartstudio.pl",
    desc: "E-commerce z obrazami w branży artystycznej",
    achievement:
      "Zwiększyliśmy konwersję o 156% poprzez optymalizację ścieżki zakupowej i implementację systemu rekomendacji.",
  },
  {
    img: "/8.PNG",
    name: "Pizzuj.pl",
    desc: "Ranking pizzerii w branży gastronomicznej.",
    achievement:
      "Zwiększyliśmy ruch organiczny o 200% w ciągu 3 miesięcy poprzez optymalizację SEO i content marketing.",
  },
  {
    img: "/7.PNG",
    name: "Mocnyrozwoj.pl",
    desc: "E-commerce z dietami i kursami. System CMS.",
    achievement:
      "Zredukowaliśmy koszty marketingowe o 40% przy jednoczesnym wzroście sprzedaży o 25% dzięki lepszemu targetowaniu.",
  },
  {
    img: "/images/projects/fryzurykaminska/hero.webp",
    name: "Fryzury Kamińska",
    desc: "Strona dla fryzjerki",
    achievement:
      "Zwiększyliśmy liczbę rezerwacji online o 85% poprzez wdrożenie intuicyjnego systemu bookingowego.",
  },
  {
    img: "/images/projects/kancelariadeluga/hero.webp",
    name: "Kancelaria Deluga",
    desc: "Strona dla prawnika",
    achievement:
      "Podwoiliśmy liczbę zapytań od klientów dzięki optymalizacji treści i implementacji chatbota.",
  },
  {
    img: "/images/projects/manicuregrudziadz/hero.webp",
    name: "Manicure Grudziądz",
    desc: "Strona dla manicurzystki",
    achievement:
      "Zwiększyliśmy zasięg lokalny o 120% poprzez optymalizację pod lokalne SEO i integrację z Google My Business.",
  },
];

export default function RecentProjects({ className = "" }) {
  return (
    <section className={`w-full py-12 ${className}`}>
      <h3 className="text-blue-500 text-center font-gotham font-extrabold">
        Case Studies
      </h3>
      <h2 className="text-2xl lg:text-3xl font-bold text-center mb-8">
        Tworzenie stron internetowych Quixy
      </h2>
      <p className="text-sm mb-8 text-gray-700 max-w-2xl mx-auto text-center">
        Nie tylko łączymy firmy, oferty pracy, zlecenia i freelancerów! Poza tym
        dodatkowo wykonujemy projekty jako Agencja Kreatywna.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mx-auto">
        {projects.map((p, i) => (
          <div
            key={i}
            className="group block rounded-xl bg-gray-200 duration-300 overflow-hidden"
          >
            <div className="relative w-full aspect-[4/3] overflow-hidden">
              <Image
                src={p.img}
                alt={p.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 25vw"
                priority={i === 0}
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2 text-black">
                {p.name}
              </h3>
              <p className="text-sm text-gray-600">{p.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
