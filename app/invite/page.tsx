"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/header";
import Hero from "@/components/hero/Hero";

export default function InviteLandingPage() {
  const [inviteCode, setInviteCode] = useState("");
  const [copied, setCopied] = useState(false);
  const shareUrl = useMemo(() => {
    if (typeof window === "undefined") return "";
    const base = `${window.location.origin}/invite/${inviteCode || ""}`;
    return base;
  }, [inviteCode]);

  const canShare =
    typeof navigator !== "undefined" && (navigator as any)?.share !== undefined;

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {}
  };

  const onShare = async () => {
    try {
      if (!canShare) return;
      await (navigator as any).share({
        title: "Zaproszenie – Quixy Studio",
        text: "Skorzystaj z mojego zaproszenia do priorytetowej konsultacji",
        url: shareUrl,
      });
    } catch (e) {}
  };

  return (
    <div className="min-h-screen w-full relative font-sans">
      <Link href="/" className="absolute left-8 top-6 xl:top-12 z-[501]">
        <Image
          src="/logo-quixy.png"
          width={400}
          height={400}
          alt=""
          className="w-[150px] sm:w-[200px]"
        />
      </Link>
      <Header />
      <div className="bg-zinc-800 h-screen w-full fixed left-0 top-0">
        <Hero />
      </div>
      <div className="relative z-50 flex items-center justify-center h-full py-48">
        <div className="bg-black bg-opacity-50 rounded-xl h-max flex items-center justify-center flex-col mx-8 lg:mx-24 xl:mx-36 2xl:mx-64 p-6 w-full max-w-3xl">
          <h1 className="text-white text-2xl lg:text-3xl font-bold text-center">
            Zaproszenie do priorytetowej konsultacji
          </h1>
          <p className="text-white/80 text-sm mt-4 text-center">
            Wpisz kod zaproszenia, aby przejść do wyboru terminu i dedykowanej
            oferty na stronę WWW.
          </p>

          <div className="w-full bg-white/5 border border-white/10 rounded-lg mt-6 p-4">
            <label className="text-white/80 text-sm">Kod zaproszenia</label>
            <input
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value.trim())}
              placeholder="np. QX-AB12CD"
              className="mt-2 w-full bg-black/40 border border-white/10 rounded-md p-3 text-white outline-none"
            />
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <Link href={inviteCode ? `/invite/${inviteCode}` : "#"}>
                <button
                  disabled={!inviteCode}
                  className={`py-3 px-5 text-sm lg:text-base duration-200 text-white rounded-lg cursor-pointer w-max ${
                    inviteCode
                      ? "bg-green-500 hover:scale-110"
                      : "bg-zinc-600 cursor-not-allowed"
                  }`}
                >
                  Przejdź dalej
                </button>
              </Link>
              <button
                onClick={onCopy}
                className="py-3 px-5 text-sm lg:text-base duration-200 text-white rounded-lg cursor-pointer w-max bg-zinc-700 hover:bg-zinc-600"
              >
                {copied ? "Skopiowano" : "Kopiuj link"}
              </button>
              {canShare && (
                <button
                  onClick={onShare}
                  className="py-3 px-5 text-sm lg:text-base duration-200 text-white rounded-lg cursor-pointer w-max bg-zinc-700 hover:bg-zinc-600"
                >
                  Udostępnij
                </button>
              )}
              <Link
                href={`mailto:?subject=Zaproszenie%20Quixy%20Studio&body=${encodeURIComponent(
                  shareUrl
                )}`}
              >
                <button className="py-3 px-5 text-sm lg:text-base duration-200 text-white rounded-lg cursor-pointer w-max bg-zinc-700 hover:bg-zinc-600">
                  Wyślij e‑mailem
                </button>
              </Link>
            </div>
          </div>

          <div className="text-white/70 text-xs mt-4 text-center">
            Nie masz kodu? Poproś o zaproszenie – przygotujemy ofertę dla Twojej
            firmy.
          </div>
        </div>
      </div>
    </div>
  );
}
