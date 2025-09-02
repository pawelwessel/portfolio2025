import Image from "next/image";
import Cta from "@/components/cta/Cta";
import ImageSlider from "@/components/ImageSlider";
import Link from "next/link";

export default function HeroIntro() {
  return (
    <>
      <div className="mx-auto justify-evenly min-h-screen lg:mt-0 w-full flex flex-col px-3 lg:px-12 max-w-[90vw] relative pt-36 pb-12">
        <div className="mx-auto grid grid-cols-1 lg:grid-cols-2 h-max">
          <div className="z-50 bg-zinc-800 bg-opacity-80 rounded-xl p-6 lg:p-12 flex flex-col justify-center h-max my-auto">
            <Image
              src="/logo-quixy.png"
              width={400}
              height={400}
              alt="Quixy Studio Logo"
              className="mx-auto lg:mx-0 w-1/2 sm:w-[200px] lg:w-[300px]"
              priority
            />
            <div className="font-light mt-6 text-base lg:text-lg xl:text-xl text-gray-50 text-center lg:text-left z-30 w-full flex justify-center">
              <h1 className="text-white drop-shadow-md shadow-black italic sm:max-w-[30rem] lg:max-w-[50rem] max-w-[40rem]">
                Zlecenia dla firm i freelancerów, oferty pracy oraz zdalne
                projekty IT w jednym miejscu.
              </h1>
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
