"use client";

export default function RegisterButtons() {
  const openRegisterPopup = (accountType: "salon" | "individual") => {
    if (typeof window !== "undefined" && window.openLoginRegisterPopup) {
      window.openLoginRegisterPopup("register", accountType);
    }
  };

  return (
    <div className="flex flex-row justify-center gap-3 mx-auto mb-4">
      <button
        onClick={() => openRegisterPopup("individual")}
        className="group relative px-6 py-3 text-sm font-semibold text-white text-center bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] overflow-hidden w-max max-w-full"
      >
        <span className="w-full relative z-10 flex items-center justify-center gap-2">
          Manicurzystka
        </span>
        {/* Animated background effect */}
        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </button>

      <button
        onClick={() => openRegisterPopup("salon")}
        className="group relative px-6 py-3 text-sm font-semibold text-white text-center bg-gradient-to-r from-accent-600 to-accent-700 rounded-xl hover:from-accent-700 hover:to-accent-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] overflow-hidden w-max max-w-full"
      >
        <span className="w-full relative z-10 flex items-center justify-center gap-2">
          Salon Urody
        </span>
        {/* Animated background effect */}
        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </button>
    </div>
  );
}
