"use client";
import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { useLoader } from "@react-three/fiber";
import {
  MotionValue,
  useScroll,
  useTransform,
  motion as motionDiv,
} from "framer-motion";
import { motion } from "framer-motion-3d";
import ProjectShowcase from "../ProjectShowcase";
import useWindowDimensions from "../../utils/useWindowDimensions";
type motion = MotionValue<number>;

interface ModelProps {
  gltfPath: string;
  rotateX: motion;
  rotateY: motion;
  rotateZ: motion;
  donutPosX: motion;
  donutPosY: motion;
  donutPosZ: motion;
  scale: motion;
}

const FlyingDonut: React.FC<ModelProps> = ({
  donutPosX,
  donutPosY,
  donutPosZ,
  rotateX,
  rotateY,
  rotateZ,
  gltfPath,
  scale,
}) => {
  const gltf = useLoader(GLTFLoader, gltfPath);

  return (
    <motion.primitive
      object={gltf.scene}
      scale={scale}
      rotation-x={rotateX}
      duration={300}
      position={[donutPosX, donutPosY, donutPosZ]}
    />
  );
};
const HeroDonut = ({
  gltfPath,
  donut2PosX,
  donut2PosY,
  donut2PosZ,
  scale,
  rotationX,
}: {
  gltfPath: string;
  donut2PosX: motion;
  donut2PosY: motion;
  donut2PosZ: motion;
  scale: motion;
  rotationX: motion;
}) => {
  const gltf = useLoader(GLTFLoader, gltfPath);
  const mesh = useRef<any>();
  useFrame(() => (mesh.current.rotation.y += 0.0009));
  return (
    <motion.primitive
      ref={mesh}
      object={gltf.scene}
      scale={scale}
      rotation-x={rotationX}
      position={[donut2PosX, donut2PosY, donut2PosZ]}
    />
  );
};

export default function HeroSection({ dictionary }: { dictionary: any }) {
  const gltfPath = "/assets/untitled5.glb";
  const gltfPath2 = "/assets/untitled.glb";
  const mainWrapper = useRef<any>();
  const { scrollYProgress } = useScroll({
    target: mainWrapper,
    offset: ["start end", "end end"],
  });
  const { width } = useWindowDimensions();
  const scale = useTransform(scrollYProgress, [0.2, 0.6, 1], [0, 1.5, 25]);
  const rotateX = useTransform(scrollYProgress, [0.1, 0.7, 1], [0, 8, 9.3]);
  const rotateY = useTransform(scrollYProgress, [0.4, 0.6], [0, 3]);
  const rotateZ = useTransform(scrollYProgress, [0.4, 0.6, 1], [0, 3, 6]);
  const donutPosX = useTransform(scrollYProgress, [0.1, 0.3], [0, 0]);
  const donutPosY = useTransform(scrollYProgress, [0.1, 0.7, 1], [1, 0, -8]);
  const donutPosZ = useTransform(scrollYProgress, [0.1, 0.5], [1, 2.8]);

  const donut2PosX = useTransform(scrollYProgress, [0.1, 0.3], [0, 0]);
  const donut2PosY = useTransform(scrollYProgress, [0.1, 0.6], [0, -7]);
  const donut2PosZ = useTransform(scrollYProgress, [0.1, 0.6], [0, 2]);
  const donut2RotationX = useTransform(scrollYProgress, [0.1, 0.3], [0, 2]);
  const donut2Scale = useTransform(scrollYProgress, [0.1, 0.6], [1, 2]);

  const h1TextOpacity = useTransform(
    scrollYProgress,
    [0.2, 0.3, 0.4],
    [0, 1, 0]
  );
  const h2TextOpacity = useTransform(
    scrollYProgress,
    [0.4, 0.5, 0.6],
    [0, 1, 0]
  );
  const h4TextOpacity = useTransform(
    scrollYProgress,
    [0.6, 0.7, 0.9],
    [0, 1, 0]
  );
  const h1TextTranslateX = useTransform(
    scrollYProgress,
    [0.1, 0.2, 0.4],
    ["5vw", "10vw", "15vw"]
  );
  const h2TextTranslateX = useTransform(
    scrollYProgress,
    [0.4, 0.5, 0.6],
    ["5vw", "10vw", "15vw"]
  );
  const h1TextTranslateY = useTransform(
    scrollYProgress,
    [0.1, 0.2, 0.4],
    ["-4vw", "0vw", "4vw"]
  );
  const h2TextTranslateY = useTransform(
    scrollYProgress,
    [0.4, 0.5, 0.6],
    ["4vw", "0vw", "-4vw"]
  );
  const h4TextTranslateY = useTransform(
    scrollYProgress,
    [0.6, 0.7, 0.9],
    ["4vw", "0vw", "-4vw"]
  );

  //children values
  const menuOpacity = useTransform(scrollYProgress, (pos) =>
    pos <= 0.9 ? 1 : 0
  );

  return (
    <>
      <ProjectShowcase dictionary={dictionary} />
      <motionDiv.div
        className="absolute left-0 top-0 h-[700vh] w-screen"
        ref={mainWrapper}
      >
        <motionDiv.h2
          style={{
            opacity: h1TextOpacity,
            translateX: h1TextTranslateX,
            translateY: h1TextTranslateY,
          }}
          className="font-bold text-[22px] sm:text-5xl lg:text-7xl xl:text-8xl bottom-36 left-0 fixed z-[500] font-sans"
        >
          <div className="bg-yellow-300 px-6 box-decoration-clone shadow-lg shadow-black select-none w-max">
            {dictionary.HomePage.hi}
          </div>
        </motionDiv.h2>
        <motionDiv.h2
          style={{
            opacity: h2TextOpacity,
            translateX: h2TextTranslateX,
            translateY: h2TextTranslateY,
          }}
          className="font-bold top-36 left-[-30px] sm:left-0 fixed z-[500] font-sans"
        >
          <div className="bg-yellow-300 select-none shadow-lg shadow-black px-6 box-decoration-clone text-[26px] sm:text-[5xl] lg:text-7xl xl:text-8xl w-max">
            {dictionary.HomePage.dev}
          </div>
        </motionDiv.h2>
        <motionDiv.h2
          style={{
            opacity: h4TextOpacity,
            translateY: h4TextTranslateY,
            translateX: "-50%",
          }}
          className="font-bold bottom-36 text-center w-[90%] md:w-[70%] lg:w-[60%] left-1/2 fixed z-[500] font-sans"
        >
          <div className="bg-yellow-300 shadow-lg shadow-black select-none px-6 box-decoration-clone text-[16px] sm:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl">
            {dictionary.HomePage.h2Text}
          </div>
        </motionDiv.h2>
        <motionDiv.div
          className=" duration-500"
          style={{ opacity: menuOpacity }}
        >
          <Suspense fallback={<div>Loading</div>}>
            <Canvas
              style={{
                zIndex: "10",
                position: "fixed",
                top: "50%",
                transform: "translateY(-50%)",
                left: "0px",
                height: "100vh",
                width: "100vw",
              }}
            >
              <ambientLight />
              <pointLight position={[3, 3, -5]} />
              <FlyingDonut
                scale={scale}
                donutPosX={donutPosX}
                donutPosY={donutPosY}
                donutPosZ={donutPosZ}
                rotateX={rotateX}
                rotateY={rotateY}
                rotateZ={rotateZ}
                gltfPath={gltfPath}
              />
              <HeroDonut
                donut2PosX={donut2PosX}
                donut2PosY={donut2PosY}
                donut2PosZ={donut2PosZ}
                gltfPath={gltfPath2}
                scale={donut2Scale}
                rotationX={donut2RotationX}
              />
            </Canvas>
          </Suspense>
        </motionDiv.div>
      </motionDiv.div>
    </>
  );
}
