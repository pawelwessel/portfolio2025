import OpenRegisterButton from "@/components/Cta/OpenRegisterButton";
import { FaArrowRight, FaGem } from "react-icons/fa";

export default function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 to-accent-600">
      <div className="pointer-events-none absolute -top-24 -right-16 w-80 h-80 bg-white/15 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-10 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.06),_transparent_60%)]" />

      <div className="relative z-10 px-4 sm:px-8 py-8 sm:py-12 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3 sm:mb-4 leading-tight px-4">
            Twórz piękne stylizacje. Resztą zajmiemy się my.
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-white/95 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed font-medium px-4">
            Dołącz do społeczności specjalistek, pokaż swoje prace i pozwól
            klientom łatwo Cię odkryć.
          </p>

          <OpenRegisterButton className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-white text-primary-600 rounded-md font-semibold text-sm sm:text-base md:text-lg transition-all duration-200 hover:bg-neutral-100 overflow-hidden shadow-md">
            Dołącz do Naily
            <FaArrowRight className="text-sm sm:text-base transition-transform group-hover:translate-x-1" />
          </OpenRegisterButton>

          <p className="text-white/85 text-xs sm:text-sm mt-3 sm:mt-4">
            Bez opłat na start • Profil w 2 minuty
          </p>
        </div>
      </div>
    </section>
  );
}
