import React, { useRef } from "react";
import { useScroll, useTransform, motion as motionDiv } from "framer-motion";
import Link from "next/link";
import { FaCode, FaEnvelope, FaLink, FaPhone } from "react-icons/fa";
import ProjectImages from "./ProjectImages";
import Footer from "../Footer";
export default function ProjectShowcase({ dictionary }: { dictionary: any }) {
  const mainWrapper = useRef<any>();
  const { scrollYProgress } = useScroll({
    target: mainWrapper,
    offset: ["start end", "end end"],
  });
  const h1TextOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1],
    ["0", "1", "1", "0"]
  );
  const h1TextTranslateY = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1],
    ["-200px", "0px", "0px", "-200px"]
  );

  return (
    <>
      <div
        ref={mainWrapper}
        id="projects"
        className="flex-col flex w-screen relative mt-[470vh]"
      >
        <motionDiv.div
          style={{
            opacity: h1TextOpacity,
            translateY: h1TextTranslateY,
            translateX: "50%",
            left: "-50%",
          }}
          className="h-[20vh] lg:h-[50vh] relative w-screen flex justify-center"
        >
          <motionDiv.h2
            style={{
              boxShadow: "inset 0 0 12px #000000",
            }}
            className="bg-yellow-300 p-6 z-[550] sticky font-sans w-max h-max top-36 lg:top-24 text-3xl font-bold xl:text-7xl text-black select-none text-center"
          >
            {dictionary.HomePage.projectShowcase}
          </motionDiv.h2>
        </motionDiv.div>
        <div className="z-auto top-0 w-screen flex flex-col">
          {dictionary.HomePage.projects.map((item: any, i: any) => (
            <div
              key={i}
              className="relative h-max py-3 lg:py-24 my-12 lg:my-0 flex items-center duration-75 px-6 lg:px-12"
            >
              <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-3 h-max">
                <ProjectImages images={item.images} />
                <div
                  className="z-[504] mt-4 lg:mt-0 text-white bg-slate-800 overflow-hidden rounded-xl min-h-full"
                  style={{
                    boxShadow: "0px 0px 6px black",
                  }}
                >
                  <h2 className="px-12 bg-yellow-300 w-max p-3 shadow-sm shadow-black rounded-br-xl font-anta text-center text-black font-bold text-2xl lg:text-3xl xl:text-5xl ">
                    {item.name}
                  </h2>
                  <div className="p-3">
                    <p className="text-gray-400 my-2 italic font-dosis">
                      {item.type}
                    </p>
                    <p className="text-lg font-dosis">
                      {item.shortDescription}
                    </p>{" "}
                    <h2 className="shadow-sm shadow-black -ml-3 px-3 bg-yellow-300 rounded-br-2xl w-max text-zinc-800 font-anta text-lg lg:text-xl xl:text-2xl mt-3 lg:mt-1.5 xl:mt-3">
                      {dictionary.HomePage.colors}
                    </h2>
                    <div className="-ml-3 z-50 h-max sm:w-max flex flex-row flex-wrap lg:-ml-4 mt-3 pl-2 pr-6 bg-gray-300 bg-opacity-20">
                      {item.colors.map((color: any, i: number) => (
                        <li
                          key={i}
                          className={`flex flex-row items-center ml-2 lg:ml-4 flex-wrap my-3`}
                        >
                          <div
                            style={{ background: `${color}` }}
                            className={`lg:h-8 h-7 lg:w-8 w-7 mr-2 rounded`}
                          ></div>
                          <span className=" text-white">{color}</span>
                        </li>
                      ))}
                    </div>
                    <h2 className="shadow-sm shadow-black -ml-3 px-3 bg-yellow-300 rounded-br-2xl w-max text-zinc-800 font-anta text-lg lg:text-xl xl:text-2xl mt-3 lg:mt-1.5 xl:mt-3">
                      {dictionary.HomePage.stack}
                    </h2>
                    <div className="flex flex-row items-start flex-wrap -ml-3">
                      {item.technologies.map((technology: any, i: any) => (
                        <p
                          key={i}
                          className="text-sm lg:text-base xl:text-lg ml-3 mt-3 font-dosis"
                        >
                          {technology.toLowerCase()}
                        </p>
                      ))}
                    </div>
                    <h2 className="shadow-sm shadow-black -ml-3 px-3 bg-yellow-300 rounded-br-2xl w-max text-zinc-800 font-anta text-lg lg:text-xl xl:text-2xl mt-3 lg:mt-1.5 xl:mt-3">
                      {dictionary.HomePage.fonts}
                    </h2>
                    <div className="flex flex-col items-start mt-3">
                      {item.fonts.map((font: any, i: any) => (
                        <div key={i} className="flex flex-row items-center">
                          <p
                            key={i}
                            className="text-sm lg:text-base xl:text-lg font-dosis"
                          >
                            {font.fontName}
                          </p>

                          {font.variants.map((variant: any, i: any) => (
                            <div
                              className="text-sm ml-2 mt-[2px] text-gray-400 font-dosis"
                              key={i}
                            >
                              {variant}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>{" "}
        <Footer />
      </div>
    </>
  );
}
