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
    img: "/7.PNG",
    name: "Pizzuj.pl",
    desc: "Ranking pizzerii w branży gastronomicznej.",
    achievement:
      "Zwiększyliśmy ruch organiczny o 200% w ciągu 3 miesięcy poprzez optymalizację SEO i content marketing.",
  },
  {
    img: "/8.PNG",
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
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section className={`w-full py-12 ${className}`}>
      <h2 className="text-2xl lg:text-3xl font-bold text-center mb-8">
        Ostatnie projekty
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mx-auto">
        {projects.map((p, i) => (
          <div
            key={i}
            onClick={() => setSelectedProject(p)}
            className="group block rounded-xl bg-gray-200 duration-300 overflow-hidden cursor-pointer"
          >
            <div className="relative w-full aspect-[4/3] overflow-hidden">
              <Image
                src={p.img}
                alt={p.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
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

      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-lg w-full">
            <div className="relative w-full aspect-[4/3] mb-4 cursor-zoom-in">
              <Image
                src={selectedProject.img}
                alt={selectedProject.name}
                fill
                className="object-contain rounded-lg"
                sizes="(max-width: 768px) 100vw, 75vw"
                onClick={(e) => {
                  e.currentTarget.classList.toggle("fixed");
                  e.currentTarget.classList.toggle("inset-0");
                  e.currentTarget.classList.toggle("z-50");
                  e.currentTarget.classList.toggle("m-0");
                  e.currentTarget.classList.toggle("rounded-none");
                  e.currentTarget.classList.toggle("cursor-zoom-out");
                  e.currentTarget.parentElement.classList.toggle("static");
                  e.currentTarget.parentElement.classList.toggle("w-screen");
                  e.currentTarget.parentElement.classList.toggle("h-screen");
                }}
              />
            </div>
            <h3 className="text-xl font-bold mb-2">{selectedProject.name}</h3>
            <p className="text-gray-600 mb-4">{selectedProject.desc}</p>
            <p className="text-gray-800 mb-4">{selectedProject.achievement}</p>
            <button
              onClick={() => setSelectedProject(null)}
              className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Zamknij
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
