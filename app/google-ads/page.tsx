import Hero from "@/components/hero/Hero";
import Header from "@/components/header";
import HeroIntroAds from "@/components/google-ads/HeroIntroAds";
import PricingPlans from "@/components/google-ads/PricingPlans";
import HowItWorks from "@/components/google-ads/HowItWorks";
import FaqAds from "@/components/google-ads/FaqAds";
import References from "@/components/google-ads/References";
import Image from "next/image";

export default function GoogleAdsPage() {
  return (
    <>
      <div className="z-[1500] absolute w-[130px] sm:w-[300px] h-[50px] left-0 top-6 xl:top-12 overflow-hidden rounded-r-xl">
        <div className="w-full flex items-start relative">
          <div className="w-max absolute left-[300px] top-0">
            <Image
              src="/loga.png"
              width={3600}
              height={200}
              alt="Quixy Studio - Tworzenie stron internetowych"
              className="w-auto h-[50px] move-from-right-to-left"
              priority
            />
          </div>
        </div>
      </div>
      <div className="w-screen overflow-x-hidden">
        <div className="font-sans w-full bg-[#222222] pb-48 h-full">
          <Header />
          <div className="z-[30] fixed h-screen w-full left-0 top-0">
            <Hero />
          </div>

          <main className="font-sans overflow-visible relative items-center min-h-screen grid grid-cols-1 z-30">
            <section className={`w-full h-max z-50`}>
              <HeroIntroAds />
              <PricingPlans />
              <HowItWorks />
              <FaqAds />
              <References />
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
