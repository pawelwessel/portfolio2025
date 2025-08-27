import { Metadata, Viewport } from "next";
import SearchBar from "@/components/SearchBar";
import Hero from "@/components/Landing/Hero";
// import ImageCollage from "@/components/Landing/ImageCollage";
import ComparisonSection from "@/components/Landing/ComparisonSection";
import ProfessionalsHighlight from "@/components/Landing/ProfessionalsHighlight";
import TestimonialsCarousel from "@/components/Testimonials/Carousel";
import FinalCta from "@/components/Landing/FinalCta";
import PlacesCarousel from "@/components/Examples/PlacesCarousel";
import ShopSection from "@/components/ShopSection";
import RecentPosts from "@/components/Blog/RecentPosts";
// import ManicurePlaces from "@/components/ManicurePlaces";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <SearchBar slugCity="" />
      <PlacesCarousel />
      {/* <ImageCollage /> */}
      <Hero />
      <ComparisonSection />

      {/* Manicure places explorer
      <section className="section-padding px-4 sm:px-6 bg-neutral-50">
        <div className="container-professional">
          <ManicurePlaces initialCityName="Warszawa" />
        </div>
      </section> */}

      {/* How it works - 3 steps */}
      <section className="section-padding px-4 sm:px-6 bg-neutral-50">
        <div className="container-professional">
          <div className="pt-8 text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-rose-500 bg-clip-text text-transparent mb-3 sm:mb-4">
              Wypróbuj już dziś
            </h2>
            <p className="text-sm sm:text-base text-neutral-500 max-w-2xl mx-auto font-medium leading-relaxed px-4">
              Prosty proces w trzech krokach, który zmieni Twój biznes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="professional-card p-6 sm:p-8 group text-center hover:scale-105 transition-all duration-300 bg-gradient-to-br from-rose-50 to-purple-50 rounded-2xl shadow-lg hover:shadow-2xl border border-purple-100">
              <div className="font-bold text-3xl w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-rose-400 to-purple-400 text-white rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 animate-bounce">
                1
              </div>
              <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-transparent mb-3 sm:mb-4">
                Twój profil czeka!
              </h3>
              <p className="text-neutral-600 font-medium leading-relaxed text-sm sm:text-base">
                Tylko 2 minuty dzielą Cię od własnego, pięknego profilu!
              </p>
            </div>
            <div className="professional-card p-6 sm:p-8 group text-center hover:scale-105 transition-all duration-300 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-lg hover:shadow-2xl border border-purple-100">
              <div className="font-bold text-3xl w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                2
              </div>
              <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-3 sm:mb-4">
                Wyświetl ofertę
              </h3>
              <p className="text-neutral-600 font-medium leading-relaxed text-sm sm:text-base">
                Po rejestracji skonfiguruj usługi i dodaj zdjęcia
              </p>
            </div>
            <div className="professional-card p-6 sm:p-8 group text-center hover:scale-105 transition-all duration-300 bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl shadow-lg hover:shadow-2xl border border-purple-100">
              <div className="font-bold text-3xl w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-pink-400 to-rose-400 text-white rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                3
              </div>
              <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent mb-3 sm:mb-4">
                Uruchom rezerwacje
              </h3>
              <p className="text-neutral-600 font-medium leading-relaxed text-sm sm:text-base">
                Automatyczne rezerwacje, rosnąca społeczność i większe zyski
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Social Proof Section */}
      <section className="section-padding px-4 sm:px-6 bg-neutral-50">
        <div className="container-professional">
          <TestimonialsCarousel />
        </div>
      </section>
      <ProfessionalsHighlight />
      <RecentPosts limit={6} columns={3} />
      <FinalCta />
      <ShopSection
        title="Polecane przez ekspertki"
        subtitle="Sprawdzone produkty do stylizacji paznokci wybrane przez profesjonalne stylistki"
      />
    </div>
  );
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#d8b4fe",
};

export const metadata: Metadata = {
  publisher: "naily.pl",
  manifest: "/manifest.json",
  icons: [{ url: "/fav.png", sizes: "192x192", type: "image/png" }],
  title: "Naily – Cennik i Kalendarz Manicure",
  description:
    "Dołącz do profesjonalistek manicure i pedicure. Zwiększ widoczność, automatyzuj rezerwacje i zarabiaj więcej.",
  openGraph: {
    type: "website",
    url: "https://naily.pl",
    title: "Naily – Cennik i Kalendarz Manicure",
    description:
      "Dołącz do profesjonalistek manicure i pedicure. Zwiększ widoczność, automatyzuj rezerwacje i zarabiaj więcej.",
    siteName: "naily.pl",
    images: [
      {
        url: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=1200&h=630&fit=crop&crop=center&auto=format",
        width: 1200,
        height: 630,
        alt: "Profesjonalny manicure – zbliżenie",
      },
      {
        url: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&h=630&fit=crop&crop=center&auto=format",
        width: 1200,
        height: 630,
        alt: "Manicure w salonie – atmosfera",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Naily – Cennik i Kalendarz Manicure",
    description: "Dołącz do profesjonalistek manicure i pedicure.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=1200&h=630&fit=crop&crop=center&auto=format",
        alt: "Profesjonalny manicure – zbliżenie",
      },
    ],
  },
};
