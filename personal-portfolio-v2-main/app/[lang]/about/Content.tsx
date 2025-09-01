"use client";
import AOS from "aos";
import { FaCode } from "react-icons/fa";
import StarsBg from "@/components/StarsBg";
import { useEffect } from "react";
import { RiComputerLine } from "react-icons/ri";
import { FaComputerMouse } from "react-icons/fa6";
import { LiaRocketSolid } from "react-icons/lia";
import Link from "next/link";
import Footer from "@/components/Footer";
export default function Content({
  dictionary,
  lang,
}: {
  dictionary: any;
  lang: any;
}) {
  useEffect(() => {
    AOS.init({
      offset: 100,
    });
  }, []);
  return (
    <>
      <div className="fixed top-0 left-0 w-screen h-screen bg-gradient-to-br from-black via-zinc-800 to-black scale-150"></div>
      <StarsBg />
      <Link
        href="/"
        className="fixed left-6 lg:left-12 top-12 z-[1000] flex flex-row items-center justify-center"
      >
        <h2 className="italic font-bold text-2xl text-white drop-shadow-md shadow-black">
          wesiu.
          <span className=" text-yellow-500">dev</span>
        </h2>
      </Link>
      <div className="mt-60 pt-8 pb-12 flex flex-col items-center z-[600] relative w-max md:w-[675px] lg:w-[900px] mx-auto space-y-6">
        <div className="absolute left-[-42px] md:left-[50%] top-0 md:-translate-x-[50%] h-full w-1 bg-yellow-300 z-[600] rounded-full"></div>

        <div className="text-white font-bold text-2xl p-2 absolute -left-[20%] md:left-[50%] top-[0%] -translate-y-[138%] md:-translate-x-[50%] h-max w-max bg-slate-800 border-2 border-yellow-300 z-[600] rounded-xl px-12 font-anta">
          {dictionary.HomePage.about}
        </div>

        {dictionary.HomePage.timeline.map((item: any, i: number) => (
          <RoadmapItem key={i} item={item} alignLeft={i % 2 === 0} />
        ))}
      </div>
      <div
        data-aos="fade-up"
        id="about"
        data-aos-duration={1200}
        className="w-screen flex flex-col z-[600] relative group"
      >
        <div className="z-[50] top-0 h-1 rounded-full w-full bg-transparent absolute left-[50%] -translate-x-[50%] group-hover:bg-yellow-300 scale-x-0 group-hover:scale-x-100 duration-[1000ms]"></div>
        <div className="bg-slate-800 p-3 py-12 relative">
          <RiComputerLine className="text-gray-300 w-[200px] h-[200px] z-[25] absolute right-24 top-[70%] lg:top-[60%] -translate-y-1/2 opacity-10 rotate-12" />
          <div className="md:w-[675px] lg:w-[900px] mx-auto text-white z-[50]">
            <h2 className="text-white drop-shadow-xl shadow-black text-3xl lg:text-4xl 2xl:text-5xl font-bold relative ml-24">
              <FaCode className="text-gray-300 w-[75px] h-[75px] z-[25] absolute -translate-x-[130%] opacity-10 top-1/2 -translate-y-1/2" />
              <span className="text-yellow-300 font-anta">
                {dictionary.HomePage.motivation}
              </span>
            </h2>
            <h3 className="font-anta drop-shadow-xl shadow-black text-xl lg:text-2xl xl:text-3xl font-bold mt-6">
              {dictionary.HomePage.logic}
            </h3>
            <p className="font-dosis text-base lg:text-xl">
              {dictionary.HomePage.logicDesc}
            </p>
            <h3 className="font-anta drop-shadow-xl shadow-black text-xl lg:text-2xl xl:text-3xl font-bold mt-3">
              {dictionary.HomePage.learning}
            </h3>
            <p className="font-dosis text-base lg:text-xl">
              {dictionary.HomePage.learningDesc}
            </p>
            <h3 className="font-anta drop-shadow-xl shadow-black text-xl lg:text-2xl xl:text-3xl font-bold mt-3">
              {dictionary.HomePage.visualization}
            </h3>
            <p className="font-dosis text-base lg:text-xl">
              {dictionary.HomePage.visualizationDesc}
            </p>
            <div className="mt-24">
              <h2 className="text-white drop-shadow-xl shadow-black text-3xl lg:text-4xl 2xl:text-5xl font-bold relative ml-24">
                <FaComputerMouse className="text-gray-300 w-[75px] h-[75px] z-[25] absolute -translate-x-[130%] opacity-10 top-1/2 -translate-y-1/2" />
                <span className="text-yellow-300 font-anta">
                  {dictionary.HomePage.story}
                </span>
              </h2>
              <p className="font-dosis text-base lg:text-xl mt-6">
                {dictionary.HomePage.storyDesc}
              </p>
            </div>
            <div className="mt-24">
              <h2 className="text-white drop-shadow-xl shadow-black text-3xl lg:text-4xl 2xl:text-5xl font-bold relative ml-24">
                <LiaRocketSolid className="text-gray-300 w-[75px] h-[75px] z-[25] absolute -translate-x-[130%] opacity-10 top-1/2 -translate-y-1/2" />
                <span className="text-yellow-300 font-anta">
                  {dictionary.HomePage.plans}
                </span>
              </h2>
              <ul className="mt-6">
                <li className="relative ml-4 mt-2">
                  <div className="absolute top-2 w-2 h-2 bg-white rounded-full left-0 -translate-x-[150%]"></div>
                  {dictionary.HomePage.plan1}
                </li>
                <li className="relative ml-4 mt-2">
                  <div className="absolute top-2 w-2 h-2 bg-white rounded-full left-0 -translate-x-[150%]"></div>
                  {dictionary.HomePage.plan2}
                </li>
                <li className="relative ml-4 mt-2">
                  <div className="absolute top-2 w-2 h-2 bg-white rounded-full left-0 -translate-x-[150%]"></div>
                  {dictionary.HomePage.plan3}
                </li>
              </ul>
            </div>
            <div className="mt-12">
              <Link
                target="_blank"
                href={`/assets/resume_${lang}.pdf`}
                className="text-white font-bold text-2xl p-2 h-max w-max bg-slate-800 hover:bg-slate-700 duration-300 border-2 border-yellow-300 z-[600] rounded-xl px-12"
              >
                {dictionary.HomePage.resume}
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
const RoadmapItem = ({
  item,
  alignLeft,
}: {
  item: any;
  alignLeft: boolean;
}) => (
  <div
    className={`text-white w-[250px] sm:w-[400px] md:w-[300px] lg:w-[410px] rounded-xl border-2 border-slate-900 bg-slate-800 ${
      alignLeft
        ? "md:mr-auto md:rounded-tr-none"
        : "md:ml-auto md:rounded-tl-none"
    } relative duration-300`}
  >
    <div
      className={`absolute top-[50%] -translate-y-[50%] ${
        alignLeft
          ? "md:-right-[41px] md:left-auto -left-[42px]"
          : "-left-[41px]"
      } h-1 w-10 bg-yellow-300`}
    ></div>
    <div
      className={`flex flex-col items-start md:items-center justify-between ${
        alignLeft ? "md:flex-row-reverse" : "md:flex-row"
      }`}
    >
      <div
        className={`font-anta bg-yellow-300 rounded-br-lg rounded-tl-lg px-3 py-1 w-max text-zinc-800 ${
          alignLeft
            ? "md:rounded-bl-lg md:rounded-br-none md:rounded-tl-none"
            : "rounded-br-lg md:rounded-l-none"
        }`}
      >
        {item.year}
      </div>
      <h2 className="px-3 font-bold md:text-xl font-anta mt-3 md:mt-0">
        {item.title}
      </h2>
    </div>
    <p className="p-3 text-sm sm:text-base">{item.description}</p>
  </div>
);
