import Pawełek from "../../public/Pawełek/2.png";
import Image from "next/image";
import Cta from "@/components/cta/Cta";
import ImageSlider from "@/components/ImageSlider";
import Link from "next/link";
import { FaPhoneAlt } from "react-icons/fa";

export default function HeroIntro({ city }: { city?: string }) {
  return (
    <>
      <div className="mx-auto justify-evenly min-h-screen lg:mt-0 w-full flex flex-col px-3 lg:px-12 max-w-[90vw] relative pt-36 pb-12">
        <div className="mx-auto grid grid-cols-1 lg:grid-cols-2 h-max">
          <div className="z-50 bg-zinc-800 bg-opacity-80 rounded-xl p-6 lg:p-12 flex flex-col justify-center h-max my-auto">
            <div className="my-5 flex flex-row items-center gap-3">
              <div className="relative">
                <div className="absolute bottom-3 right-3 bg-green-500 animate-ping w-5 h-5 rounded-full z-10" />
                <div className="absolute bottom-[13px] right-[13px] bg-green-500 w-4 h-4 rounded-full z-10" />
                <Image
                  src={Pawełek}
                  width={244}
                  height={244}
                  className="rounded-full min-w-32 min-h-32 aspect-square"
                  alt="Zleć wykonanie strony internetowej np. Pawełkowi"
                />
              </div>
              <div className="flex flex-col">
                <h2 className="text-xl">
                  Tworzymy unikalne i oryginalne, responsywne strony www, sklepy
                  internetowe i aplikacje webowe.
                </h2>
                <p className="text-sm font-gotham font-light text-white">
                  <Link href="/freelancer/strony-internetowe-marketing-seo">
                    Specjalista ds. Stron Internetowych, SEO i Marketingu Paweł
                    Wessel
                  </Link>{" "}
                  {city}
                </p>{" "}
                <Link
                  href="tel:+48721417154"
                  title="Skontaktuj się z Paweł Wessel"
                  className="mt-1 flex items-center gap-2 hover:underline text-blue-400"
                >
                  <FaPhoneAlt />
                  <p className="text-lg font-light font-gotham">
                    +48 721 417 154
                  </p>
                </Link>
              </div>
            </div>
            <div className="font-light mt-6 text-base lg:text-lg xl:text-xl text-gray-50 text-center lg:text-left z-30 w-full flex flex-col justify-center">
              <h1 className="text-white drop-shadow-md shadow-black italic sm:max-w-[30rem] lg:max-w-[50rem] max-w-[40rem]">
                Agencja Kreatywna, która zapewni Ci kompleksową obsługę {city} -
                od branży IT po marketing.
              </h1>
              <p className="font-gotham text-xs my-3">
                Aby otrzymać wycenę, kliknij przycisk &quot;Dodaj zlecenie&quot;
                - opisz stronę internetową, pomysł na kampanię marketingową, czy
                po prostu plan na biznes.
              </p>
            </div>
            <div className="gap-3 flex z-30 w-full items-center lg:items-start sm:w-max mx-auto lg:mx-0">
              <Cta label="Dodaj zlecenie" />
              <Link
                href="/register"
                className="!text-xs sm:!text-base py-3 px-5 mt-4 hover:scale-110 duration-200 in-out text-white rounded-lg cursor-pointer bg-blue-500 w-max max-w-full"
              >
                Firma/Freelancer
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center flex-col w-full lg:pl-12 mt-8 lg:mt-0">
            <div className="max-w-[90vw] lg:max-w-[550px] flex items-center justify-center">
              <Image
                src={`/assets/mockup.png`}
                width={1024}
                height={1024}
                alt={`Aplikacja dla freelancerów i firm IT`}
                blurDataURL="data:image/webp;base64,UklGRiIAAABXRUJQVlA4WAoAAAAQAAAfAADuwH/xAAfAQADAAQAAAAAAQAvAQADAAQAAAAAAQAvAQA"
                placeholder="blur"
                className="z-50 animate-left-to-right my-12 sm:my-0 w-full scale-125 sm:scale-100 h-auto mx-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
