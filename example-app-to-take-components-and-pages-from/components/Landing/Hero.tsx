import OpenRegisterButton from "@/components/Cta/OpenRegisterButton";
import { FaRocket, FaArrowRight } from "react-icons/fa";

export default function Hero() {
  return (
    <section className="relative py-8 sm:py-12 md:py-16 px-4 sm:px-6 overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/vid.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/70 via-neutral-800/60 to-neutral-900/70" />
      </div>

      <div className="bg-black/50 backdrop-blur-sm p-4 sm:p-6 rounded-lg container-professional relative z-10">
        <div className="text-center animate-fade-in py-6 sm:py-8">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight text-white px-2">
            Zdobądź więcej klientek
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-white mb-6 sm:mb-8 max-w-2xl mx-auto font-medium leading-relaxed px-4">
            Zwiększ swoją widoczność, automatyzuj rezerwacje i zarabiaj więcej
          </p>
          <div className="">
            <OpenRegisterButton className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-primary-600 text-white rounded-md font-semibold text-sm sm:text-base md:text-lg transition-all duration-200 hover:bg-primary-700 overflow-hidden shadow-md w-max max-w-full sm:w-auto mx-auto">
              <FaRocket className="text-sm sm:text-base" />
              Utwórz darmowy profil
            </OpenRegisterButton>
          </div>
        </div>
      </div>
    </section>
  );
}
