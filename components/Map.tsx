"use client";
import Image from "next/image";
import AOS from "aos";
import { useEffect, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

const markers = [
  {
    style: "w-[8%] absolute top-[40%] left-[9.5%] sm:left-[8.5%]",
    label: "Szczecin - Strona internetowa dla restauracji",
  },
  {
    style: "w-[10%] absolute top-[58%] left-[18%]",
    label: "Zielona Góra - Sklep online z elektroniką",
  },
  {
    style: "w-[6%] absolute top-[69%] left-[33%]",
    label: "Wrocław - Portfolio fotografa",
  },
  {
    style: "w-[6%] absolute top-[76%] left-[43%]",
    label: "Opole - Strona dla kancelarii prawnej",
  },
  {
    style: "w-[6%] absolute top-[67%] left-[44.5%]",
    label: "Katowice - Sklep internetowy z odzieżą",
  },
  {
    style: "w-[8%] absolute top-[81%] left-[56.5%]",
    label: "Kraków - Strona internetowa dla hotelu",
  },
  {
    style: "w-[8%] absolute top-[78%] left-[72.5%]",
    label: "Rzeszów - Portal edukacyjny",
  },
  {
    style: "w-[10%] absolute top-[57%] left-[79%]",
    label: "Lublin - Strona internetowa dla lekarza",
  },
  {
    style: "w-[8%] absolute top-[65%] left-[60.5%]",
    label: "Kielce - Blog kulinarny",
  },
  {
    style: "w-[10%] absolute top-[50%] left-[47.5%]",
    label: "Łódź - Portfolio grafika",
  },
  {
    style: "w-[8%] absolute top-[46%] left-[30%]",
    label: "Poznań - Strona internetowa dla agencji marketingowej",
  },
  {
    style: "w-[8%] absolute top-[36%] left-[22%]",
    label: "Gorzów Wlkp. - Strona internetowa dla szkoły językowej",
  },
  {
    style: "w-[10%] absolute top-[27%] left-[37.5%]",
    label: "Bydgoszcz - Sklep internetowy z zabawkami",
  },
  {
    style: "w-[8%] absolute top-[44%] left-[65%]",
    label: "Radom - Strona internetowa dla architekta",
  },
  {
    style: "w-[8%] absolute top-[34%] left-[56%]",
    label: "Białystok - Portal informacyjny",
  },
  {
    style: "w-[10%] absolute top-[23%] left-[78%]",
    label: "Suwałki - Strona internetowa dla firmy budowlanej",
  },
  {
    style: "w-[10%] absolute top-[14.5%] sm:top-[13.5%] left-[58%]",
    label: "Olsztyn - Strona internetowa dla przedszkola",
    aos: "zoom-in",
  },
  {
    style: "w-[10%] absolute top-[6%] left-[32%]",
    label: "Gdańsk - Strona internetowa dla salonu fryzjerskiego",
  },
  {
    style: "w-[10%] absolute top-[20%] left-[10%]",
    label: "Koszalin - Strona internetowa dla trenera personalnego",
  },
];

export default function Map() {
  useEffect(() => {
    AOS.init({
      offset: 0,
    });
  }, []);

  // Track which marker is hovered
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div className="relative max-w-[400px] mx-auto h-auto">
      {/* Markers */}
      {markers.map((marker, idx) => (
        <div
          key={idx}
          className={`group${marker.aos ? "" : ""}`}
          {...(marker.aos ? { "data-aos": marker.aos } : {})}
        >
          <div
            className={`${marker.style} flex items-center justify-center cursor-pointer`}
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
            onFocus={() => setHoveredIdx(idx)}
            onBlur={() => setHoveredIdx(null)}
            tabIndex={0}
          >
            <FaMapMarkerAlt
              size={40}
              className="text-red-600 group-hover:scale-125 transition-transform duration-200"
            />
            <span
              className={`${
                hoveredIdx === idx
                  ? "opacity-100"
                  : "opacity-0 pointer-events-none"
              } transition-opacity duration-200 absolute left-full top-1/2 -translate-y-1/2 ml-2 bg-white text-black text-xs rounded shadow-lg px-2 py-1 whitespace-nowrap z-10`}
            >
              {marker.label}
            </span>
          </div>
        </div>
      ))}
      {/* Map image at the bottom so markers are above */}
      <div className="w-full h-auto">
        <Image
          src="/map/map6.png"
          height={1024}
          width={1024}
          alt=""
          className="w-full h-auto"
        />
      </div>
    </div>
  );
}
