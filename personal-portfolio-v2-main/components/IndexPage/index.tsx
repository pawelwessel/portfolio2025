"use client";
import { Suspense, useEffect, useRef } from "react";
import AOS from "aos";
import HeroSection from "@/components/HeroSection";
import { motion, useScroll, useTransform } from "framer-motion";
import StarsBg from "@/components/StarsBg";
import Link from "next/link";
export default function IndexPage({ dictionary }: { dictionary: any }) {
  useEffect(() => {
    AOS.init({
      offset: 100,
    });
  }, []);
  const mainWrapper = useRef<any>();
  const { scrollYProgress } = useScroll({
    target: mainWrapper,
    offset: ["start end", "end end"],
  });
  const background = useTransform(scrollYProgress, (pos) =>
    pos >= 0.35 ? "rgb(12,12,12)" : ""
  );
  const opacity = useTransform(scrollYProgress, (pos) =>
    pos >= 0.35 ? "0" : "1"
  );
  return (
    <motion.div
      ref={mainWrapper}
      style={{ background }}
      className="relative duration-500"
    >
      <Link
        href="/"
        className="fixed left-6 lg:left-12 top-12 z-[550] flex flex-row items-center justify-center"
      >
        <h2 className="italic font-bold text-2xl text-white drop-shadow-md shadow-black">
          wesiu.
          <span className=" text-yellow-500">dev</span>
        </h2>
      </Link>
      <div className="relative h-screen w-screen">
        <div className="fixed top-0 left-0 w-screen h-screen bg-gradient-to-br from-black via-zinc-800 to-black scale-150"></div>
        <StarsBg />
        <motion.div
          style={{ opacity }}
          className="z-[0] duration-500 fixed left-0 top-0 bg-gradient-to-br from-blue-500 via-green-300 to-blue-500 background-animate delay-1000 h-full w-full"
        ></motion.div>
      </div>
      <Suspense>
        <HeroSection dictionary={dictionary} />
      </Suspense>
    </motion.div>
  );
}
