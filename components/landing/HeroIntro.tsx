import Image from "next/image";
import Cta from "@/components/cta/Cta";
import ImageSlider from "@/components/ImageSlider";
import Link from "next/link";

export default function HeroIntro() {
  return (
    <>
      <div className="z-[15] absolute w-[130px] sm:w-[300px] h-[50px] left-0 top-20 lg:top-36 overflow-hidden rounded-r-xl">
        <div className="w-full flex items-start relative">
          <div className="w-max absolute left-[300px] top-0">
            <Image
              src="/loga.png"
              width={3600}
              height={200}
              alt="Quixy Studio - Tworzenie stron internetowych"
              className="w-auto h-[50px] move-from-right-to-left"
              priority
            />
          </div>
        </div>
      </div>

      <div className="mx-auto justify-evenly min-h-screen lg:mt-0 w-full flex flex-col px-3 lg:px-12 max-w-[90vw] relative pt-36 pb-12 overflow-x-hidden">
        <div className="mx-auto grid grid-cols-1 lg:grid-cols-2 h-max">
          <h1 className="z-50 bg-zinc-800 bg-opacity-80 rounded-xl p-6 lg:p-12 flex flex-col justify-center h-max my-auto">
            <Image
              src="/logo-quixy.png"
              width={400}
              height={400}
              alt="Quixy Studio Logo"
              className="mx-auto lg:mx-0 w-1/2 sm:w-[200px] lg:w-[300px]"
              priority
            />
            <div className="font-light mt-6 text-base lg:text-lg xl:text-xl text-gray-50 text-center lg:text-left z-30 w-full flex justify-center">
              <span className="text-white drop-shadow-md shadow-black italic sm:max-w-[30rem] lg:max-w-[50rem] max-w-[40rem]">
                Zlecenia dla firm i freelancerów, oferty pracy oraz zdalne
                projekty IT w jednym miejscu.
              </span>
            </div>
            <div className="gap-6 flex flex-col-reverse xl:flex-row z-30 w-full justify-center lg:justify-start items-center lg:items-start sm:w-max mt-6 mx-auto lg:mx-0">
              <Cta label="Dodaj zlecenie" />
              <Link
                href="/register"
                className="py-3 px-5 text-sm lg:text-base mt-4 hover:scale-110 duration-200 in-out text-white rounded-lg cursor-pointer bg-blue-500 w-max max-w-full"
              >
                Firma/Freelancer
              </Link>
            </div>
          </h1>
          <div className="flex items-center justify-center flex-col w-full lg:pl-12 mt-20 lg:mt-0">
            <div className="max-w-[90vw] lg:max-w-[550px] flex items-center justify-center">
              <ImageSlider />
            </div>
            <h2 className="text-2xl lg:text-3xl font-italic text-white font-sans italic text-center mt-12">
              Rozwiązania cyfrowe, które robią różnicę
            </h2>
          </div>
        </div>
      </div>
    </>
  );
}
