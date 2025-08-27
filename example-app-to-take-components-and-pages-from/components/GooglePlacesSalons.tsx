"use client";
import { useState, useEffect } from "react";
import {
  FaMapMarkerAlt,
  FaStar,
  FaPhone,
  FaGlobe,
  FaClock,
  FaDirections,
} from "react-icons/fa";
import { MdSpa } from "react-icons/md";

interface Salon {
  place_id: string;
  name: string;
  rating?: number;
  user_ratings_total?: number;
  vicinity: string;
  formatted_phone_number?: string;
  website?: string;
  opening_hours?: {
    open_now: boolean;
    weekday_text?: string[];
  };
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
}

interface GooglePlacesSalonsProps {
  city: string;
}

export default function GooglePlacesSalons({ city }: GooglePlacesSalonsProps) {
  const [salons, setSalons] = useState<Salon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSalons = async () => {
      try {
        setLoading(true);
        // In a real implementation, you would call your API endpoint
        // that uses Google Places API with proper authentication
        const response = await fetch(
          `/api/places?city=${encodeURIComponent(city)}&type=beauty_salon`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch salons");
        }

        const data = await response.json();
        setSalons(data.results || []);
      } catch (err) {
        console.error("Error fetching salons:", err);
        setError("Nie udało się załadować salonów");
        // Fallback to mock data for demonstration
        setSalons([
          {
            place_id: "1",
            name: "Salon Urody Elegance",
            rating: 4.8,
            user_ratings_total: 127,
            vicinity: "ul. Marszałkowska 123, Warszawa",
            formatted_phone_number: "+48 22 123 45 67",
            website: "https://elegance-salon.pl",
            opening_hours: {
              open_now: true,
              weekday_text: [
                "Poniedziałek: 9:00–20:00",
                "Wtorek: 9:00–20:00",
                "Środa: 9:00–20:00",
                "Czwartek: 9:00–20:00",
                "Piątek: 9:00–20:00",
                "Sobota: 9:00–18:00",
                "Niedziela: Zamknięte",
              ],
            },
            geometry: {
              location: {
                lat: 52.2297,
                lng: 21.0122,
              },
            },
          },
          {
            place_id: "2",
            name: "Studio Manicure & Pedicure",
            rating: 4.6,
            user_ratings_total: 89,
            vicinity: "ul. Nowy Świat 45, Warszawa",
            formatted_phone_number: "+48 22 987 65 43",
            website: "https://studio-manicure.pl",
            opening_hours: {
              open_now: true,
              weekday_text: [
                "Poniedziałek: 10:00–19:00",
                "Wtorek: 10:00–19:00",
                "Środa: 10:00–19:00",
                "Czwartek: 10:00–19:00",
                "Piątek: 10:00–19:00",
                "Sobota: 10:00–16:00",
                "Niedziela: Zamknięte",
              ],
            },
            geometry: {
              location: {
                lat: 52.2319,
                lng: 21.0067,
              },
            },
          },
          {
            place_id: "3",
            name: "Beauty Nail Studio",
            rating: 4.9,
            user_ratings_total: 203,
            vicinity: "ul. Wilcza 67, Warszawa",
            formatted_phone_number: "+48 22 555 44 33",
            website: "https://beauty-nail-studio.pl",
            opening_hours: {
              open_now: false,
              weekday_text: [
                "Poniedziałek: 8:00–21:00",
                "Wtorek: 8:00–21:00",
                "Środa: 8:00–21:00",
                "Czwartek: 8:00–21:00",
                "Piątek: 8:00–21:00",
                "Sobota: 9:00–17:00",
                "Niedziela: 10:00–16:00",
              ],
            },
            geometry: {
              location: {
                lat: 52.2281,
                lng: 21.0178,
              },
            },
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchSalons();
  }, [city]);

  const getDirectionsUrl = (lat: number, lng: number, name: string) => {
    return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&query=${encodeURIComponent(
      name
    )}`;
  };

  const formatRating = (rating?: number) => {
    if (!rating) return null;
    return rating.toFixed(1);
  };

  const getStatusColor = (openNow?: boolean) => {
    if (openNow === undefined) return "text-neutral-500";
    return openNow ? "text-success-600" : "text-neutral-500";
  };

  const getStatusText = (openNow?: boolean) => {
    if (openNow === undefined) return "Brak informacji";
    return openNow ? "Otwarte" : "Zamknięte";
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="professional-card p-6 animate-pulse">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-neutral-200 rounded-lg"></div>
              <div className="flex-1 space-y-3">
                <div className="h-4 bg-neutral-200 rounded w-3/4"></div>
                <div className="h-3 bg-neutral-200 rounded w-1/2"></div>
                <div className="h-3 bg-neutral-200 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="professional-card p-6 text-center">
        <p className="text-neutral-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-xl font-semibold text-neutral-900 mb-2">
          Profesjonalne salony manicure w {city}
        </h2>
        <p className="text-neutral-600 text-sm">
          Sprawdzone i polecane salony z najwyższymi ocenami
        </p>
      </div>

      {salons.map((salon) => (
        <div
          key={salon.place_id}
          className="professional-card p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Salon Info */}
            <div className="flex-1">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MdSpa className="text-2xl text-primary-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-1">
                    {salon.name}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-neutral-600 mb-2">
                    <div className="flex items-center gap-1">
                      <FaMapMarkerAlt className="text-primary-600" />
                      <span>{salon.vicinity}</span>
                    </div>
                    {salon.rating && (
                      <div className="w-max text-nowrap flex items-center gap-1">
                        <FaStar className="text-warning-500" />
                        <span>{formatRating(salon.rating)}</span>
                        <span className="text-nowrap w-max text-neutral-500">
                          ({salon.user_ratings_total} opinii)
                        </span>
                      </div>
                    )}
                  </div>
                  <div
                    className={`flex items-center gap-1 text-sm ${getStatusColor(
                      salon.opening_hours?.open_now
                    )}`}
                  >
                    <FaClock className="text-xs" />
                    <span>{getStatusText(salon.opening_hours?.open_now)}</span>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                {salon.formatted_phone_number && (
                  <div className="flex items-center gap-2 text-neutral-600">
                    <FaPhone className="text-primary-600" />
                    <a
                      href={`tel:${salon.formatted_phone_number}`}
                      className="hover:text-primary-600 transition-colors"
                    >
                      {salon.formatted_phone_number}
                    </a>
                  </div>
                )}
                {salon.website && (
                  <div className="flex items-center gap-2 text-neutral-600">
                    <FaGlobe className="text-primary-600" />
                    <a
                      href={salon.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary-600 transition-colors"
                    >
                      Strona internetowa
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2 lg:flex-shrink-0">
              <a
                href={getDirectionsUrl(
                  salon.geometry.location.lat,
                  salon.geometry.location.lng,
                  salon.name
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
              >
                <FaDirections className="text-xs" />
                Wyznacz trasę
              </a>
              {salon.formatted_phone_number && (
                <a
                  href={`tel:${salon.formatted_phone_number}`}
                  className="flex items-center justify-center gap-2 px-4 py-2 border border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors text-sm font-medium"
                >
                  <FaPhone className="text-xs" />
                  Zadzwoń
                </a>
              )}
            </div>
          </div>

          {/* Opening Hours */}
          {salon.opening_hours?.weekday_text && (
            <div className="mt-4 pt-4 border-t border-neutral-200">
              <h4 className="text-sm font-medium text-neutral-900 mb-2">
                Godziny otwarcia:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-1 text-xs text-neutral-600">
                {salon.opening_hours.weekday_text.map((day, index) => (
                  <div key={index} className="flex justify-between">
                    <span>{day}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
