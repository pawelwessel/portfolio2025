"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Project = {
  img: string;
  name: string;
  desc: string;
  achievement?: string;
  link?: string;
};

const projects: Project[] = [
  {
    img: "/6.PNG",
    name: "Naily.pl",
    desc: "Platforma z systemem rezerwacji w branży beauty",
    link: "https://naily.pl",
    achievement:
      "Zoptymalizowaliśmy czas ładowania strony z 7.2s do 0.8s poprzez implementację lazy loading i optymalizację obrazów.",
  },
  {
    img: "/5.PNG",
    name: "Blackbellartstudio.pl",
    desc: "E-commerce z obrazami w branży artystycznej",
    link: "https://blackbellartstudio.pl",
    achievement:
      "Zwiększyliśmy konwersję o 156% poprzez optymalizację ścieżki zakupowej i implementację systemu rekomendacji.",
  },
  {
    img: "/7.PNG",
    name: "Mocnyrozwoj.pl",
    desc: "E-commerce z dietami i kursami. System CMS.",
    link: "https://mocnyrozwoj.pl",
    achievement:
      "Zredukowaliśmy koszty marketingowe o 40% przy jednoczesnym wzroście sprzedaży o 25% dzięki lepszemu targetowaniu.",
  },
  {
    img: "/8.PNG",
    name: "Pizzuj.pl",
    desc: "Ranking pizzerii w branży gastronomicznej.",
    link: "https://pizzuj.pl",
    achievement:
      "Zwiększyliśmy ruch organiczny o 200% w ciągu 3 miesięcy poprzez optymalizację SEO i content marketing.",
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
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setSelectedProject(null);
    }
    if (selectedProject) {
      document.addEventListener("keydown", onKeyDown);
    }
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [selectedProject]);

  return (
    <section className={`w-full py-12 ${className}`}>
      <h2 className="text-2xl lg:text-3xl font-bold text-center mb-8">
        Ostatnie projekty
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mx-auto">
        {projects.map((p, i) => (
          <button
            key={i}
            onClick={() => setSelectedProject(p)}
            className="group block text-left rounded-xl bg-gray-200 duration-300 overflow-hidden cursor-pointer"
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
          </button>
        ))}
      </div>

      {selectedProject && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-white rounded-xl p-6 max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-title"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 id="project-title" className="text-2xl font-bold">
                {selectedProject.name}
              </h3>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Zamknij"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative w-full h-[300px] md:h-[400px]">
                <Image
                  src={selectedProject.img}
                  alt={selectedProject.name}
                  fill
                  className="object-contain rounded-lg"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  quality={100}
                />
              </div>
              <div>
                <p className="text-gray-600 mb-4">{selectedProject.desc}</p>
                {selectedProject.achievement && (
                  <p className="text-gray-800 mb-4">
                    {selectedProject.achievement}
                  </p>
                )}
                {selectedProject.link && (
                  <Link
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-black text-white px-4 py-2 rounded-md hover:bg-zinc-800 text-sm"
                  >
                    Zobacz stronę
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
