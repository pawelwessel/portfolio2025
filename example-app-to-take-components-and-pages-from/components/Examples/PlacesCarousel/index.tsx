"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { FaStar, FaMapMarkerAlt } from "react-icons/fa";

type OpeningHours = {
  open_now?: boolean;
  weekday_text?: string[];
};

type Geometry = {
  location: {
    lat: number;
    lng: number;
  };
};

type PlacePhoto = {
  url: string;
};

type Place = {
  place_id: string;
  name: string;
  rating?: number;
  user_ratings_total?: number;
  formatted_phone_number?: string;
  website?: string;
  opening_hours?: OpeningHours;
  geometry: Geometry;
  vicinity?: string;
  photos?: PlacePhoto[];
  _city?: string; // added locally for display/context
};

const CITIES = ["Warszawa", "Kraków", "Wrocław"] as const;

function shuffleArray<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

async function fetchCityPlaces(city: string, limit = 3): Promise<Place[]> {
  const params = new URLSearchParams({
    city,
    type: "beauty_salon",
    limit: String(limit),
  });
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/places?${params.toString()}`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) {
    return [];
  }
  const data = (await res.json()) as { results?: Place[] };
  return (data.results || []).map((p) => ({ ...p, _city: city }));
}

export default function PlacesCarousel() {
  const [items, setItems] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const results = await Promise.all(
          CITIES.map((city) => fetchCityPlaces(city, 3))
        );
        const merged = results.flat();
        const limited: Place[] = [];
        // Ensure up to 5 from each city in the merged output
        for (const city of CITIES) {
          const perCity = merged.filter((p) => p._city === city).slice(0, 5);
          limited.push(...perCity);
        }
        const randomized = shuffleArray(limited);
        if (isMounted) setItems(randomized);
      } catch (e) {
        if (isMounted) setError("Nie udało się pobrać listy salonów.");
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  const [emblaRef] = useEmblaCarousel({ loop: true, align: "start" });

  if (loading) {
    return (
      <section className="pt-10 px-4 sm:px-6 pb-16">
        <div className="container-professional">
          <div className="text-center mb-6">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-neutral-900">
              Popularne salony
            </h2>
            <p className="text-sm text-neutral-600">Ładowanie…</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-white shadow-sm border border-neutral-200 p-4 animate-pulse h-64"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="pt-10 px-4 sm:px-6 pb-16">
        <div className="container-professional text-center">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-neutral-900 mb-2">
            Popularne salony
          </h2>
          <p className="text-sm text-red-600">{error}</p>
        </div>
      </section>
    );
  }

  if (!items.length) return null;

  return (
    <section className="pt-10 px-4 sm:px-6 pb-16">
      <div className="container-professional">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-neutral-900">
            Popularne salony
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 max-w-2xl mx-auto">
            Bookuj najlepsze usługi z branży beauty
          </p>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4">
              {items.map(
                (place) =>
                  place.photos?.[0]?.url && (
                    <div
                      key={place.place_id}
                      className="min-w-0 flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-1 sm:px-2"
                    >
                      <PlaceCard place={place} />
                    </div>
                  )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PlaceCard({ place }: { place: Place }) {
  const photoUrl = place.photos?.[0]?.url;

  return (
    <article className="group w-full">
      <div className="mb-3 bg-white shadow-large hover:shadow-golden-lg border border-white/20 transition-all duration-300">
        <div className="relative overflow-hidden">
          <div className="aspect-[4/3] w-full">
            <Image
              src={photoUrl!}
              alt={place.name}
              width={800}
              height={600}
              className="w-full h-full rounded-2xl object-cover"
            />
          </div>
          {place.rating && (
            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 shadow-medium">
              <FaStar className="text-yellow-500 text-sm" />
              <span className="font-heading text-sm font-semibold text-gray-800">
                {place.rating} ({place.user_ratings_total})
              </span>
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="text-base sm:text-lg font-semibold text-neutral-900 line-clamp-1">
            {place.name}
          </h3>
          <div className="mt-1 flex items-center gap-2 text-neutral-600 text-sm">
            <FaMapMarkerAlt className="text-primary-600" />
            <span className="line-clamp-1">
              {place._city || ""}
              {place.vicinity ? ` • ${place.vicinity}` : ""}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
