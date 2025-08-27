import NotFound from "@/app/not-found";
import JoinNowButton from "@/components/AdCard/JoinNowButton";
import Link from "next/link";
import { getCityUsers } from "@/utils/getCityUsers";
import { ICity } from "@/types";
import { getSingleCity } from "@/utils/getSingleCity";
import { Viewport } from "next";
import Image from "next/image";
import RecentPosts from "@/components/Blog/RecentPosts";
import { createLinkFromText } from "@/utils/createLinkFromText";
import {
  FaMapMarkerAlt,
  FaGem,
  FaStar,
  FaClock,
  FaPhone,
} from "react-icons/fa";
import { MdSpa } from "react-icons/md";
import { FaArrowRightLong } from "react-icons/fa6";

export const dynamic = "force-dynamic";

export default async function ServiceCitySlug({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const cityParam = (await params).city;
  const city = await getSingleCity(cityParam);

  if (city?.error) {
    return <NotFound />;
  }

  // Fetch registered users matching city
  const cityUsers = await getCityUsers(city.id);

  // Fetch salons from Google Places API
  const fetchSalons = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/places?city=manicure-${city.name}&limit=5`
      );
      if (!res.ok) return [];
      const data = await res.json();
      return data.results || [];
    } catch (error) {
      console.error("Error fetching salons:", error);
      return [];
    }
  };

  const salons = await fetchSalons();
  const filteredSalons = Array.isArray(salons)
    ? salons.filter((s) => s?.photos?.[0]?.url && s?.website)
    : [];

  // Add promotional AD to salons array
  const salonsWithAd = [
    ...filteredSalons,
    {
      id: "ad",
      name: "Twój profil tutaj!",
      isAd: true,
      title: "Twój profil w Naily.pl",
      subtitle: "Za darmo",
      description: "Wyświetlaj się wśród najlepszych w mieście",
      image:
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop&crop=center",
      features: [
        "Zwiększ widoczność",
        "Zyskaj nowych klientów",
        "Profesjonalny profil",
        "Wysoka pozycja w wynikach",
      ],
    },
  ];

  // Helper: Get today's opening hours string from Google weekday_text
  const getTodayHours = (weekdayText?: string[]): string => {
    try {
      if (!Array.isArray(weekdayText) || weekdayText.length < 7) {
        return "Brak danych o godzinach";
      }
      // Google returns Monday-first array; convert JS Sunday-first index
      const jsDay = new Date().getDay(); // 0..6, Sunday = 0
      const mondayFirstIndex = jsDay === 0 ? 6 : jsDay - 1;
      const raw = weekdayText[mondayFirstIndex] || "";
      const parts = raw.split(": ");
      const hours = parts.length > 1 ? parts.slice(1).join(": ") : raw;
      return hours?.trim()?.length
        ? `Dziś: ${hours}`
        : "Brak danych o godzinach";
    } catch {
      return "Brak danych o godzinach";
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Registered Professionals Section */}
      {Array.isArray(cityUsers) && cityUsers.length > 0 && (
        <section className="pt-24 pb-12 px-6 bg-white">
          <div className="container-professional">
            <h2 className="text-2xl md:text-3xl font-bold text-black mb-6">
              Specjaliści w {city.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cityUsers.map((u: any) => (
                <Link
                  key={u.uid}
                  href={`/u/${u.userSlugUrl || u.uid}`}
                  className="group bg-white rounded-2xl border border-neutral-200 p-4 md:p-5 hover:shadow-md transition"
                >
                  <div className="flex items-center gap-4">
                    <Image
                      src={u.logo || "/default-user.png"}
                      alt={u.name}
                      width={72}
                      height={72}
                      className="w-16 h-16 rounded-full object-cover border"
                    />
                    <div className="min-w-0">
                      <h3 className="font-semibold text-neutral-900 group-hover:text-primary-700 truncate">
                        {u.name}
                      </h3>
                      <p className="text-sm text-neutral-600 truncate">
                        {u.location?.address || ""}
                      </p>
                      <p className="text-xs text-neutral-500 mt-1">
                        Usługi: {u?.services?.length || 0} • Zdjęcia:{" "}
                        {u?.portfolioImages?.length || 0}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      {/* Featured Salons Section - Modern Design */}
      <section className="pb-16 pt-32 px-6 bg-gray-100">
        <div className="container-professional">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">
              Najlepsze salony {city.name}
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Sprawdzone miejsca z najwyższymi ocenami klientów i profesjonalną
              obsługą
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {salonsWithAd.map((salon, index) => {
              // Special rendering for AD card
              if (salon.isAd) {
                return (
                  <div
                    key={salon.id}
                    className="group bg-white h-max rounded-2xl transition-all duration-300 overflow-hidden animate-fade-in-up border border-primary-200 hover:shadow-lg"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="md:grid md:grid-cols-12 gap-6 p-4 md:p-6">
                      {/* AD Image */}
                      <div className="relative h-[300px] md:col-span-4 rounded-xl overflow-hidden">
                        <Image
                          src="/naily-logo.png"
                          alt="Naily Logo"
                          fill
                          sizes="(min-width: 1024px) 33vw, 100vw"
                          className="object-contain bg-primary-50"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary-100 text-primary-700">
                            Reklama
                          </span>
                        </div>
                      </div>

                      {/* AD Content */}
                      <div className="md:col-span-8 flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                          <h3 className="text-xl font-bold text-neutral-900 group-hover:text-primary-600 transition-colors">
                            {salon.title}
                          </h3>
                          <span className="inline-flex items-center rounded-full bg-primary-50 text-primary-700 px-3 py-1 text-xs font-semibold">
                            {salon.subtitle}
                          </span>
                        </div>

                        <p className="text-neutral-700 text-sm">
                          {salon.description}
                        </p>

                        {/* AD Features */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {salon.features?.map(
                            (feature: string, featureIndex: number) => (
                              <div
                                key={featureIndex}
                                className="flex items-center gap-2 text-sm text-neutral-700"
                              >
                                <FaArrowRightLong className="text-primary-500" />
                                <span>{feature}</span>
                              </div>
                            )
                          )}
                        </div>

                        {/* CTA Button */}
                        <div className="pt-2">
                          <JoinNowButton />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              // Regular salon card rendering
              return (
                <div
                  key={salon.place_id}
                  className="group bg-white h-max rounded-2xl transition-all duration-300 overflow-hidden animate-fade-in-up border border-neutral-200 hover:shadow-lg"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="md:grid md:grid-cols-12 gap-6 p-4 md:p-6">
                    {/* Salon Image */}
                    <div className="relative h-[300px] md:col-span-4 rounded-xl overflow-hidden">
                      <Image
                        src={salon.photos?.[0]?.url || "/placeholder-salon.jpg"}
                        alt={salon.name}
                        fill
                        sizes="(min-width: 1024px) 33vw, 100vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            salon.opening_hours?.open_now
                              ? "bg-green-100 text-green-800"
                              : "bg-neutral-100 text-neutral-800"
                          }`}
                        >
                          {salon.opening_hours?.open_now
                            ? "Otwarte"
                            : "Zamknięte"}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="md:col-span-8 flex flex-col gap-4">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                        <h3 className="text-xl font-bold text-neutral-900 group-hover:text-primary-600 transition-colors">
                          {salon.name}
                        </h3>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1 text-sm">
                            <FaStar className="text-yellow-500 text-sm" />
                            <span className="font-semibold">
                              {salon.rating}
                            </span>
                            <span className="text-neutral-500 text-norwap w-max">
                              ({salon.user_ratings_total} opinii)
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Address */}
                      <div className="flex items-center gap-2 text-sm text-neutral-700">
                        <FaMapMarkerAlt className="text-neutral-400" />
                        <span className="truncate">
                          {salon.vicinity || "Adres niedostępny"}
                        </span>
                      </div>

                      {/* Hours Today */}
                      <div className="flex items-center gap-2 text-sm text-neutral-700">
                        <FaClock className="text-neutral-400" />
                        <span>
                          {getTodayHours(salon?.opening_hours?.weekday_text)}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap gap-2 md:mt-auto pt-2">
                        {salon.website && (
                          <a
                            href={salon.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-max flex items-center justify-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-all duration-200 font-medium text-sm"
                          >
                            <span>Strona</span>
                          </a>
                        )}
                        {salon.formatted_phone_number && (
                          <a
                            href={`tel:${salon.formatted_phone_number}`}
                            className="w-max flex items-center justify-center gap-2 px-4 py-2 border-2 border-primary-600 text-primary-600 rounded-xl hover:bg-primary-50 transition-all duration-200 font-medium text-sm"
                          >
                            <FaPhone className="text-sm" />
                            <span>Zadzwoń</span>
                          </a>
                        )}
                        {salon?.geometry?.location?.lat &&
                          salon?.geometry?.location?.lng && (
                            <a
                              href={`https://www.google.com/maps/search/?api=1&query=${salon.geometry.location.lat},${salon.geometry.location.lng}&query_place_id=${salon.place_id}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-max flex items-center justify-center gap-2 px-4 py-2 border-2 border-neutral-300 text-neutral-700 rounded-xl hover:bg-neutral-50 transition-all duration-200 font-medium text-sm"
                            >
                              <span>Mapa</span>
                            </a>
                          )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Nearby Warsaw Cities Section */}
      <section className="py-10 px-6 bg-white">
        <div className="container-professional">
          <div className="mb-6">
            <h3 className="text-xl md:text-2xl font-semibold text-neutral-900">
              Szukaj też w innych miastach
            </h3>
            <p className="text-neutral-600 text-sm mt-1">
              Zobacz salony manicure i pedicure w miejscowościach wokół Warszawy
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-3">
            {[
              "Manicure Pruszków",
              "Manicure Piaseczno",
              "Manicure Legionowo",
              "Manicure Marki",
              "Manicure Ząbki",
              "Manicure Wołomin",
              "Manicure Otwock",
              "Manicure Józefów",
              "Manicure Konstancin-Jeziorna",
              "Manicure Grodzisk Mazowiecki",
              "Manicure Milanówek",
              "Manicure Żyrardów",
              "Manicure Piastów",
              "Manicure Raszyn",
              "Manicure Łomianki",
              "Manicure Nowy Dwór Mazowiecki",
              "Manicure Mińsk Mazowiecki",
              "Manicure Sulejówek",
              "Manicure Radzymin",
              "Manicure Kobyłka",
            ].map((name) => {
              const slug = createLinkFromText(name.replace("Manicure ", ""));
              return (
                <Link
                  key={name}
                  href={`/manicure-pedicure/${slug}`}
                  className="text-center inline-flex items-center justify-center rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-800 hover:border-primary-300 hover:bg-primary-50/50 hover:text-primary-700 transition-colors"
                >
                  {name}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* City Overview Section - Enhanced */}
      <section className="py-16 px-6 bg-gradient-to-br from-primary-50 to-accent-50">
        <div className="container-professional">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-primary-600 text-sm font-medium mb-6">
              <FaMapMarkerAlt className="text-sm" />
              {city.name}
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-6 leading-tight">
              Manicure i Pedicure
              <br />
              <span className="text-primary-600 bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                {city.name}
              </span>
            </h1>
            <p className="text-neutral-600 text-lg max-w-3xl mx-auto leading-relaxed">
              Odkryj najlepsze salony manicure i pedicure w {city.name}.
              Profesjonalne usługi, sprawdzone miejsca i najwyższe oceny
              klientów.
            </p>
          </div>

          {/* Enhanced Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white transition-all duration-300 hover:shadow-xl">
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <MdSpa className="text-2xl text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">
                150+ Salonów
              </h3>
              <p className="text-neutral-600">
                Sprawdzone miejsca z certyfikowanymi specjalistami
              </p>
            </div>

            <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white transition-all duration-300 hover:shadow-xl">
              <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaStar className="text-2xl text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">
                4.8+ Ocena
              </h3>
              <p className="text-neutral-600">
                Średnia ocena salonów na podstawie tysięcy recenzji klientów
              </p>
            </div>

            <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white transition-all duration-300 hover:shadow-xl">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaClock className="text-2xl text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">
                7 Dni w Tygodniu
              </h3>
              <p className="text-neutral-600">
                Elastyczne godziny otwarcia dostosowane do Twojego harmonogramu
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Professional Salons */}
      <section className="py-12 px-6 bg-neutral-50">
        <div className="container-professional">
          <div className="text-center mb-12">
            <h2 className="text-xl md:text-2xl font-semibold text-neutral-900 mb-4">
              Dlaczego warto wybrać profesjonalny salon?
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Profesjonalne salony oferują najwyższą jakość usług i
              bezpieczeństwo
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="professional-card p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FaGem className="text-lg text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-2">
                    Certyfikowane produkty
                  </h3>
                  <p className="text-neutral-600 text-sm">
                    Używanie tylko sprawdzonych i bezpiecznych kosmetyków
                  </p>
                </div>
              </div>
            </div>

            <div className="professional-card p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-success-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FaStar className="text-lg text-success-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-2">
                    Doświadczone stylistki
                  </h3>
                  <p className="text-neutral-600 text-sm">
                    Wykwalifikowany personel z wieloletnim doświadczeniem
                  </p>
                </div>
              </div>
            </div>

            <div className="professional-card p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-warning-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FaClock className="text-lg text-warning-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-2">
                    Dogodne terminy
                  </h3>
                  <p className="text-neutral-600 text-sm">
                    Elastyczne godziny otwarcia dostosowane do Twoich potrzeb
                  </p>
                </div>
              </div>
            </div>

            <div className="professional-card p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FaPhone className="text-lg text-accent-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-2">
                    Łatwa rezerwacja
                  </h3>
                  <p className="text-neutral-600 text-sm">
                    Szybkie i wygodne umawianie wizyt online lub telefonicznie
                  </p>
                </div>
              </div>
            </div>

            <div className="professional-card p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FaMapMarkerAlt className="text-lg text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-2">
                    Dogodne lokalizacje
                  </h3>
                  <p className="text-neutral-600 text-sm">
                    Salony w centrum miasta z łatwym dojazdem komunikacją
                    miejską
                  </p>
                </div>
              </div>
            </div>

            <div className="professional-card p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-success-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MdSpa className="text-lg text-success-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-2">
                    Sterylne narzędzia
                  </h3>
                  <p className="text-neutral-600 text-sm">
                    Dezynfekcja i sterylizacja wszystkich narzędzi po każdym
                    kliencie
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent blog posts */}
      <RecentPosts limit={3} columns={3} className="bg-white" />
    </div>
  );
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#1e40af",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const cityData: ICity = await getSingleCity(city);
  return {
    title: `Manicure ${cityData.name} - Pedicure ${cityData.name} - Salon Manicure ${cityData.name}`,
    description: `Profesjonalne salony manicure i pedicure w ${cityData.name}. Sprawdzone miejsca z najwyższymi ocenami. Rezerwuj online.`,
    publisher: "naily.pl",
    url: `https://naily.pl/manicure-pedicure/${cityData.id}`,
    authors: [
      {
        name: "Naily",
        url: "https://naily.pl",
      },
    ],
    icons: [
      {
        url: "/fav.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
    openGraph: {
      type: "website",
      title: `Manicure ${cityData.name} - Pedicure ${cityData.name} - Salon Manicure ${cityData.name}`,
      description: `Profesjonalne salony manicure i pedicure w ${cityData.name}. Sprawdzone miejsca z najwyższymi ocenami. Rezerwuj online.`,
      siteName: "Naily",
      images: [
        {
          url: "/pricing.png",
          type: "image/png",
        },
      ],
    },
    twitter: {
      cardType: "summary_large_image",
      site: "@Naily",
      title: `Manicure ${cityData.name} - Pedicure ${cityData.name} - Salon Manicure ${cityData.name}`,
      description: `Profesjonalne salony manicure i pedicure w ${cityData.name}. Sprawdzone miejsca z najwyższymi ocenami. Rezerwuj online.`,
      image: {
        url: "/pricing.png",
      },
    },
    meta: [
      {
        name: "theme-color",
        image: {
          url: "/pricing.png",
        },
      },
    ],
  };
}
