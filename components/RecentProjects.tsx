"use client";
import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    img: "/6.png",
    name: "Naily.pl",
    desc: "Platforma z systemem rezerwacji w branży beauty",
    link: "https://naily.pl",
  },
  {
    img: "/5.png",
    name: "Blackbellartstudio.pl",
    desc: "E-commerce z obrazami w branży artystycznej",
    link: "https://blackbellartstudio.pl",
  },
  {
    img: "/7.png",
    name: "Mocnyrozwoj.pl",
    desc: "E-commerce z dietami i kursami. System CMS.",
    link: "https://mocnyrozwoj.pl",
  },
  {
    img: "/8.png",
    name: "Pizzuj.pl",
    desc: "Ranking pizzerii w branży gastronomicznej.",
    link: "https://pizzuj.pl",
  },
];

export default function RecentProjects({ className = "" }) {
  return (
    <section className={`w-full py-12 ${className}`}>
      <h2 className="text-2xl lg:text-3xl font-bold text-center mb-8">
        Ostatnie projekty
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mx-auto">
        {projects.map((p, i) => (
          <Link
            key={i}
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
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
          </Link>
        ))}
      </div>
    </section>
  );
}
