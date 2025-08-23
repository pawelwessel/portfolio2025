"use client";
import Image from "next/image";
import AOS from "aos";
import { useEffect, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

type MapMarker = {
  id: string;
  top: string;
  left: string;
  leftSm?: string;
  topSm?: string;
  width: string;
  text: string;
  hasAnimation?: boolean;
};

type MapProps = {
  markers: MapMarker[];
};

export default function Map({ markers }: MapProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    AOS.init({
      offset: 0,
    });
  }, []);
  return (
    <div className="relative w-full h-full">
      {/* Markers - only render after image is loaded */}
      {imageLoaded &&
        markers.map((marker) => {
          const leftClass = marker.leftSm
            ? `left-[${marker.left}] sm:left-[${marker.leftSm}]`
            : `left-[${marker.left}]`;
          const topClass = marker.topSm
            ? `top-[${marker.top}] sm:top-[${marker.topSm}]`
            : `top-[${marker.top}]`;

          return (
            <div
              key={marker.id}
              className="group"
              {...(marker.hasAnimation && { "data-aos": "zoom-in" })}
            >
              <div
                className={`w-[${marker.width}] absolute ${topClass} ${leftClass} flex items-center justify-center cursor-pointer`}
              >
                <FaMapMarkerAlt
                  size={40}
                  className="text-red-600 group-hover:scale-125 transition-transform duration-200"
                />
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute left-full top-1/2 -translate-y-1/2 ml-2 bg-white text-black text-xs rounded shadow-lg px-2 py-1 whitespace-nowrap z-10">
                  {marker.text}
                </span>
              </div>
            </div>
          );
        })}
      {/* Map image at the bottom so markers are above */}
      <div className="w-full h-full">
        <Image
          src="/map/map6.png"
          height={1024}
          width={1024}
          alt=""
          className="w-full h-auto"
          onLoad={() => setImageLoaded(true)}
        />
      </div>
    </div>
  );
}
