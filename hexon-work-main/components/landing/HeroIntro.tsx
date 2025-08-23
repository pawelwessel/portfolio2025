import Image from "next/image";
import Cta from "@/components/cta/Cta";
import ImageSlider from "@/components/ImageSlider";

export default function HeroIntro() {
  return (
    <>
      <div className="z-[1500] absolute w-[130px] sm:w-[300px] h-[50px] left-0 top-6 xl:top-12 overflow-hidden rounded-r-xl">
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

      <div className="justify-evenly min-h-screen lg:mt-0 w-full mx-0 sm:mx-auto flex flex-col sm:w-4/5 lg:w-3/4 relative pt-36 pb-12 lg:py-0 overflow-x-hidden">
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
                Tworzę nowoczesne strony internetowe i aplikacje.
                Współpracujmy razem nad Twoim projektem!
              </span>
            </div>
            <div className="flex flex-col-reverse xl:flex-row z-30 w-full justify-center lg:justify-start items-center lg:items-start sm:w-max mt-6 mx-auto lg:mx-0">
              <Cta label="Skontaktuj się ze mną" />
            </div>
          </h1>
          <div className="flex items-center xl:justify-center flex-col w-full lg:pl-12 mt-20 lg:mt-0">
            <ImageSlider />
            <h2 className="text-2xl lg:text-3xl font-italic text-white font-sans italic text-center mt-12">
              Tworzę rozwiązania cyfrowe, które robią różnicę
            </h2>
          </div>
        </div>
      </div>
    </>
  );
}