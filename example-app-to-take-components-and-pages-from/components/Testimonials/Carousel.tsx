"use client";
import Image from "next/image";
import googleLogo from "@/public/google.webp";

import { useEffect, useMemo, useRef, useState } from "react";
import { FaStar, FaQuoteLeft } from "react-icons/fa";

interface Testimonial {
  name: string;
  role: string;
  city: string;
  text: string;
  rating: number;
}

const testimonialsSeed: Testimonial[] = [
  {
    name: "Anna K.",
    role: "Manicurzystka",
    city: "Warszawa",
    text: "Dzięki tej platformie mam stały napływ rezerwacji. Prosty panel i świetna widoczność.",
    rating: 5,
  },
  {
    name: "Marysia N.",
    role: "Salon Urody",
    city: "Kraków",
    text: "W jeden weekend zdobyliśmy 12 nowych klientów. Rezerwacje online to game‑changer!",
    rating: 5,
  },
  {
    name: "Katarzyna Z.",
    role: "Stylistka paznokci",
    city: "Gdańsk",
    text: "Łatwe zarządzanie terminami i przejrzysty profil. Polecam każdemu profesjonaliście.",
    rating: 5,
  },
  {
    name: "Monika W.",
    role: "Manicurzystka",
    city: "Poznań",
    text: "Klienci znajdują mnie szybciej, a ja mam mniej wiadomości do odpisywania. Wszystko działa automatycznie.",
    rating: 5,
  },
];

const opinionImages = [
  "/opinions/opinion.png",
  "/opinions/opinion2.png",
  "/opinions/opinion3.png",
  "/opinions/opinion4.png",
];

export default function TestimonialsCarousel() {
  const items = useMemo(() => testimonialsSeed, []);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (paused) return;
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % items.length);
    }, 4500);
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [items.length, paused]);

  return (
    <div
      className="relative max-w-3xl mx-auto"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
        {items.map((t, idx) => (
          <article
            key={idx}
            aria-hidden={active !== idx}
            className={`p-6 sm:p-8 transition-opacity duration-500 ${
              active === idx ? "opacity-100" : "opacity-0 absolute inset-0"
            }`}
          >
            <div className="w-full justify-between">
              <div className="flex items-start gap-3 mb-3">
                <FaQuoteLeft className="text-black" />
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FaStar
                      key={i}
                      className={`text-xs ${
                        i < t.rating ? "text-warning-400" : "text-neutral-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <Image
                src={googleLogo}
                alt="Google Logo"
                width={100}
                height={100}
                className=""
              />
            </div>
            <p className="text-neutral-700 leading-relaxed mb-5">{t.text}</p>
            <div className="flex items-center gap-3">
              {opinionImages[idx] && (
                <Image
                  src={opinionImages[idx]}
                  alt={t.name}
                  width={40}
                  height={40}
                  className="rounded-full aspect-square object-cover"
                />
              )}
              <div>
                <p className="text-black">{t.name}</p>
                <p className="text-xs text-neutral-500">
                  {t.role} • {t.city}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
