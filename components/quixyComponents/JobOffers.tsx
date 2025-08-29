"use client";
import Link from "next/link";
const JobOfferCard = dynamic(() => import("./JobOfferCard"), { ssr: false });
import { JobOffer } from "@/types";
import { AiFillThunderbolt } from "react-icons/ai";
import dynamic from "next/dynamic";
export default function JobOffers({
  offers,
  content,
}: {
  offers: JobOffer[];
  content: any;
}) {
  return (
    <div>
      {offers?.length === 0 && (
        <div className="rounded-lg p-3 bg-gradient-to-r from-zinc-700/30 to-primaryHoverEnd/30 mt-6 w-full mx-auto py-12">
          {/* Ikona w centrum */}
          <div
            style={{ boxShadow: "0px 1px 10px rgba(0,0,0,0.8)" }}
            className="bg-gradient-to-b from-zinc-600 to-zinc-700 rounded-full aspect-square mx-auto w-24 flex items-center justify-center"
          >
            <AiFillThunderbolt className="text-white text-4xl" />
          </div>

          {/* Treść komponentu */}
          <div className="mt-4 flex flex-col items-center justify-center max-w-xs mx-auto">
            <p className=" font-light text-gray-700 text-center text-base">
              Brak aktywnych zleceń w kategorii {content?.title}
            </p>
            <Link
              href="/register"
              className="mt-4 text-sm bg-gradient-to-br from-blue-500 to-blue-600 font-bold text-white px-4 py-2 rounded-md shadow-md hover:scale-105 duration-200"
            >
              Opublikuj ogłoszenie
            </Link>
          </div>
        </div>
      )}
      {offers?.length > 0 && (
        <section className="grid grid-cols-1 2xl:grid-cols-2 gap-3 mt-3">
          {offers.map((offer: JobOffer, i: any) => (
            <div className="overflow-hidden" key={i}>
              <JobOfferCard job={offer} />
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
