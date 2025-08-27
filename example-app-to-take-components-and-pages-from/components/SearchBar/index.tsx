import Logic from "./Logic";
import RegisterButtons from "./RegisterButtons";

export default async function SearchBar({ slugCity }: { slugCity: string }) {
  return (
    <>
      <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/temp.mp4" type="video/mp4" />
        </video>

        {/* Modern gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/70 via-neutral-800/60 to-neutral-900/70"></div>

        {/* Content */}
        <div className="relative z-10 w-full min-h-[70vh] flex items-center justify-center max-w-2xl mx-auto px-4">
          <div className="w-full bg-black/50 rounded-2xl p-6 md:p-8 border border-white/20 shadow-2xl transition-all duration-300 ease-out">
            {/* Animated heading with staggered text reveal */}
            <div className="text-center mb-8">
              <h2 className="text-xl lg:text-2xl xl:text-3xl font-bold text-white mb-4 leading-tight">
                <span className="inline-block animate-fade-in-up text-white relative">
                  Perfekcyjny manicure
                </span>
                <span className="inline-block animate-fade-in-up animation-delay-200 ml-2">
                  w Twojej okolicy
                </span>
              </h2>
              <p className="text-gray-200 text-sm animate-fade-in-up animation-delay-400 mt-4">
                Znajdź najlepsze specjalistki manicure i pedicure
              </p>
            </div>

            {/* Animated register buttons */}
            <div className="animate-fade-in-up animation-delay-600">
              <RegisterButtons />
            </div>

            {/* Search logic with enhanced animations */}
            <div className="animate-fade-in-up animation-delay-800">
              <Logic slugCity={slugCity} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
