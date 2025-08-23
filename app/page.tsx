import Image from "next/image";
import Hero from "@/components/hero/Hero";
import Header from "@/components/header";
import Cta from "@/components/cta/Cta";
import ScrollTo from "@/components/ScrollTo";
import Opinions from "@/components/opinions/Opinions";
import CountToTheNumberAnimated from "@/components/counter/CountToTheNumberAnimated";
import Link from "next/link";
import Map from "@/components/Map";
import AssistantAI from "@/components/AssistantAI";
import ClientFormWrapper from "@/components/cta/ClientFormWrapper";
import SecondCta from "@/components/cta/SecondCta";
import ImageSlider from "@/components/ImageSlider";
import RecentProjects from "../components/RecentProjects";
export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const ref = searchParams?.ref;
  return (
    <div className="w-screen overflow-x-hidden">
      <ClientFormWrapper searchParams={ref} />
      <div className="font-sans w-full bg-[#222222] pb-48 h-full">
        <Header view={searchParams?.view} />
        <div className="z-[1500] absolute w-[130px] sm:w-[300px] h-[50px] left-0 top-6 xl:top-12 overflow-hidden rounded-r-xl">
          <div className="w-full flex items-start relative">
            <div className="w-max absolute left-[300px] top-0">
              <Image
                src="/loga.png"
                width={3600}
                height={200}
                alt="Quixy Studio - Strony internetowe"
                className="w-auto h-[50px] move-from-right-to-left"
              />
            </div>
          </div>
        </div>
        <div className="z-[30] fixed h-screen w-full left-0 top-0">
          <Hero />
        </div>
        <div className="justify-evenly min-h-screen lg:mt-0 w-full mx-0 sm:mx-auto flex flex-col sm:w-4/5 lg:w-3/4 relative pt-36 pb-12 lg:py-0 overflow-x-hidden">
          <div className="mx-auto grid grid-cols-1 lg:grid-cols-2 h-max">
            <h1 className="z-50 bg-zinc-800 bg-opacity-80 rounded-xl p-6 lg:p-12 flex flex-col justify-center h-max my-auto">
              <Image
                src="/logo-quixy.png"
                width={400}
                height={400}
                alt=""
                className="mx-auto lg:mx-0 w-1/2 sm:w-[200px] lg:w-[300px]"
              />
              <div className="font-light mt-6 text-base lg:text-lg xl:text-xl text-gray-50 text-center lg:text-left z-30 w-full flex justify-center">
                <span className="text-white drop-shadow-md shadow-black italic sm:max-w-[30rem] lg:max-w-[50rem] max-w-[40rem]">
                  Tworzymy strony internetowe dla firm i osób prywatnych. Zamów
                  stronę www – to proste!
                </span>
              </div>
              <div className="flex flex-col-reverse xl:flex-row z-30 w-full justify-center lg:justify-start items-center lg:items-start sm:w-max mt-6 mx-auto lg:mx-0">
                <Cta label="Zamów stronę" />
                {/* ScrollTo button will be updated separately */}
              </div>
            </h1>
            <div className="flex items-center xl:justify-center flex-col w-full lg:pl-12 mt-20 lg:mt-0">
              <ImageSlider />
              <h2 className="text-2xl lg:text-3xl font-italic text-white font-sans italic text-center mt-12">
                Profesjonalne strony internetowe dla Twojego biznesu
              </h2>
            </div>
          </div>
        </div>

        <main className="font-sans overflow-visible relative items-center min-h-screen px-3 lg:px-0 grid grid-cols-1 z-30">
          <section className={`w-full h-max z-50`}>
            <div
              id="about"
              className="w-[90vw] sm:w-3/4 mx-auto text-xl sm:text-2xl lg:text-3xl flex flex-col mt-12 bg-white px-6 xl:px-12 py-3 xl:pb-12 rounded-md relative text-zinc-700 drop-shadow-md shadow-black"
            >
              <div>
                <div className="group">
                  <Image
                    src="/logo-quixy.png"
                    width={400}
                    height={400}
                    alt=""
                    className="max-w-[250px] lg:mx-0 mt-6"
                  />
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold mt-12">
                  Kim jesteśmy?
                </h2>
                <p className="text-base font-light max-w-[45rem] mt-4 text-justify lg:text-left">
                  Tworzymy nowoczesne i skuteczne strony internetowe. Zadbamy o
                  wszystko – od projektu po uruchomienie. Nie musisz znać się na
                  technologiach, wystarczy, że powiesz nam, czego potrzebujesz.
                </p>
                <div className="mt-3">
                  <span className="text-base">W skrócie: </span>
                  <span className="text-base font-bold">
                    prosto, wygodnie, bez stresu
                  </span>
                </div>
              </div>
              <div className="mt-6">
                <h2 className="text-3xl lg:text-4xl font-bold">
                  Co zyskujesz?
                </h2>
                <ul className="mt-6 space-y-3 flex flex-col text-sm">
                  <li className="flex flex-row items-center">
                    <div className="bg-[#52eba7] h-2 w-2 rounded-full mr-2"></div>
                    Strona dopasowana do Twoich potrzeb
                  </li>
                  <li className="flex flex-row items-center">
                    <div className="bg-[#52eba7] h-2 w-2 rounded-full mr-2"></div>
                    Prosty i szybki proces realizacji
                  </li>
                  <li className="flex flex-row items-center">
                    <div className="bg-[#52eba7] h-2 w-2 rounded-full mr-2"></div>
                    Pomoc na każdym etapie
                  </li>
                  <li className="flex flex-row items-center">
                    <div className="bg-[#52eba7] h-2 w-2 rounded-full mr-2"></div>
                    Przejrzysta wycena
                  </li>
                  <li className="flex flex-row items-center">
                    <div className="bg-[#52eba7] h-2 w-2 rounded-full mr-2"></div>
                    Wsparcie po uruchomieniu
                  </li>
                </ul>
              </div>
              <div className="mt-6">
                <div className="flex flex-col">
                  <div>
                    <h2 className="text-3xl lg:text-4xl font-bold">
                      Jakie strony tworzymy?
                    </h2>
                    <ul className="mt-6 space-y-3 flex flex-col text-sm">
                      <li className="flex flex-row items-center font-bold">
                        <div className="bg-[#52eba7] h-2 w-2 rounded-full mr-2"></div>
                        Strona wizytówka
                      </li>
                      <li className="flex flex-row items-center font-bold">
                        <div className="bg-[#52eba7] h-2 w-2 rounded-full mr-2"></div>
                        Strona firmowa
                      </li>
                      <li className="flex flex-row items-center font-bold">
                        <div className="bg-[#52eba7] h-2 w-2 rounded-full mr-2"></div>
                        Sklep internetowy
                      </li>
                    </ul>
                  </div>
                  <div className="mt-12">
                    <CountToTheNumberAnimated
                      textBeforeNumber="Zrealizowaliśmy już"
                      textAfterNumber="Projektów"
                      numberToAnimateTo={79}
                      textColor="#3F3F46"
                      animationSpeed={55}
                    />
                  </div>
                </div>
              </div>

              <Cta label="Zostaw brief – odezwiemy się do Ciebie" />

              <div className="mt-12">
                <Opinions />
              </div>
              <div className="mt-12 text-center flex items-center justify-center">
                <RecentProjects />
              </div>
              <h2 className="text-center text-3xl lg:text-4xl font-light font-gotham mt-24 italic">
                Realizacje stron internetowych w całej Polsce.
              </h2>
              <div className="relative w-[100%] lg:max-w-[40rem] mt-3 mx-auto p-3 overflow-visible">
                <Map />
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
