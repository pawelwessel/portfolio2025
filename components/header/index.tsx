"use client";
import {
  FaDownload,
  FaHome,
  FaPeopleArrows,
  FaRegQuestionCircle,
  FaUser,
} from "react-icons/fa";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePhoneModal } from "@/common/context/PhoneModalContext";
import Faq from "../faq";
import Cta from "../cta/Cta";
export default function Header({ view }: { view: any }) {
  const { open } = usePhoneModal();
  const [isFaqOpen, setFaqOpen] = useState<boolean>(false);
  const faqs = [
    {
      question: "Jak zamówić stronę internetową?",
      answer:
        "Wystarczy wypełnić krótki brief na stronie lub skontaktować się z nami mailowo. Odezwiemy się, by omówić szczegóły i przygotować ofertę.",
    },
    {
      question: "Czy muszę znać się na stronach, by zamówić swoją?",
      answer:
        "Nie! Wszystko tłumaczymy prostym językiem i prowadzimy przez cały proces. Wystarczy, że opiszesz, czego potrzebujesz.",
    },
    {
      question: "Ile kosztuje strona internetowa?",
      answer:
        "Każda wycena jest indywidualna i zależy od zakresu projektu. Po wypełnieniu briefu przygotujemy dla Ciebie jasną ofertę.",
    },
  ];
  const [supportsPWA, setSupportsPWA] = useState<any>(false);
  const [promptInstall, setPromptInstall] = useState<any>(null);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setSupportsPWA(true);
      setPromptInstall(e);
    };
    window?.addEventListener("beforeinstallprompt", handler);

    return () => window?.removeEventListener("transitionend", handler);
  }, []);

  const onClick = (evt: any) => {
    evt.preventDefault();
    if (!promptInstall) {
      return;
    }
    promptInstall.prompt();
  };

  return (
    <header className="fixed left-0 top-6 xl:top-12 w-full z-[500] font-sans">
      <Faq faqs={faqs} isFaqOpen={isFaqOpen} setFaqOpen={setFaqOpen} />
      <div className="w-[98vw] mx-auto flex flex-row justify-end px-6">
        <Cta label="Zamów stronę" />
      </div>
    </header>
  );
}
