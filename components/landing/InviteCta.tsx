"use client";
import Link from "next/link";
import Cta from "@/components/cta/Cta";

export default function InviteCta() {
  return (
    <div className="w-[90vw] sm:w-3/4 mx-auto mt-12 bg-white px-6 xl:px-12 py-8 xl:py-12 rounded-md relative text-zinc-700 drop-shadow-md shadow-black">
      <div className="flex flex-col lg:flex-row items-start gap-8">
        <div className="flex-1">
          <h2 className="text-3xl lg:text-4xl font-bold">
            Masz zaproszenie? Skorzystaj z oferty stron WWW
          </h2>
          <p className="text-base font-light max-w-[45rem] mt-4">
            Jeśli otrzymałeś link lub kod zaproszenia, możesz skorzystać z
            priorytetowej konsultacji i dedykowanej oferty na wykonanie strony
            internetowej. Wpisz kod na stronie zaproszeń i umów termin.
          </p>
          <ul className="mt-6 space-y-2 text-sm">
            <li className="flex items-center">
              <div className="bg-[#52eba7] h-2 w-2 rounded-full mr-2"></div>
              Szybszy termin konsultacji oraz wdrożenia
            </li>
            <li className="flex items-center">
              <div className="bg-[#52eba7] h-2 w-2 rounded-full mr-2"></div>
              Dedykowana oferta dopasowana do Twojej branży
            </li>
            <li className="flex items-center">
              <div className="bg-[#52eba7] h-2 w-2 rounded-full mr-2"></div>
              Opcjonalne benefity w zależności od zaproszenia
            </li>
          </ul>
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
            <Link href="/invite">
              <button className="py-3 px-5 text-sm lg:text-base hover:scale-110 duration-200 in-out text-white rounded-lg cursor-pointer bg-green-500 w-max">
                Wykorzystaj zaproszenie
              </button>
            </Link>
            <div className="opacity-70 text-sm">lub</div>
            <Cta label="Zostaw brief – odezwiemy się" />
          </div>
        </div>
      </div>
    </div>
  );
}
