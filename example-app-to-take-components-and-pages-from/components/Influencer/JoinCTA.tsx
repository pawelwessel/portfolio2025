"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";

export default function JoinCTA({ primary }: { primary?: boolean }) {
  const { user } = useSelector((s: RootState) => s.user);
  const router = useRouter();

  const go = () => {
    if (!user?.uid) {
      if (typeof window !== "undefined" && window.openLoginRegisterPopup) {
        window.openLoginRegisterPopup("register", "individual");
      } else {
        router.push("/");
      }
      return;
    }
    router.push("/influencer/dashboard");
  };

  return (
    <button
      onClick={go}
      className={`inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-sm font-semibold shadow-md transition-all duration-200 ${
        primary
          ? "bg-gradient-to-r from-rose-500 to-purple-600 text-white hover:shadow-lg"
          : "bg-white text-neutral-800 border border-neutral-200 hover:bg-neutral-50"
      }`}
    >
      Dołącz i utwórz swój link
    </button>
  );
}


