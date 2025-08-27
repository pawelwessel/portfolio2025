"use client";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { FaArrowRight } from "react-icons/fa";

export default function StartRegisterClient() {
  const { user } = useSelector((state: any) => state.user);

  function start() {
    if (!user?.uid) {
      if (typeof window !== "undefined" && window.openLoginRegisterPopup) {
        window.openLoginRegisterPopup("register", "salon");
      } else {
        window.location.href = "/"; // fallback
      }
      return;
    }
    window.location.href = "/dashboard";
  }

  return (
    <Button
      onClick={start}
      className="group relative px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold text-base transition-colors duration-200 hover:bg-primary-700 shadow-sm w-full sm:w-auto"
    >
      Załóż konto i stwórz cennik
      <FaArrowRight className="text-sm ml-2" />
    </Button>
  );
}
