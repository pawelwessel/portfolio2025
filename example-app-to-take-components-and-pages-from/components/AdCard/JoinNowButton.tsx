"use client";

export default function JoinNowButton() {
  const openRegisterPopup = () => {
    if (typeof window !== "undefined" && window.openLoginRegisterPopup) {
      window.openLoginRegisterPopup("register");
    }
  };

  return (
    <button
      onClick={openRegisterPopup}
      className="w-full bg-yellow-400 hover:bg-yellow-300 text-primary-900 font-bold py-3 px-4 rounded-xl transition-all duration-200 transform group/btn"
    >
      <span className="flex items-center justify-center gap-2">
        <span>Dołącz teraz</span>
        <svg
          className="w-4 h-4 transition-transform group-hover/btn:translate-x-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 7l5 5m0 0l-5 5m5-5H6"
          />
        </svg>
      </span>
    </button>
  );
}
