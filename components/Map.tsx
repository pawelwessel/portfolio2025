"use client";
import Image from "next/image";
import AOS from "aos";
import { useEffect } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
export default function Map() {
  useEffect(() => {
    AOS.init({
      offset: 0,
    });
  }, []);
  return (
    <div className="relative max-w-[400px] mx-auto h-auto">
      {/* Markers */}
      <div className="group">
        <div className="w-[8%] absolute top-[40%] left-[9.5%] sm:left-[8.5%] flex items-center justify-center cursor-pointer">
          <FaMapMarkerAlt
            size={40}
            className="text-red-600 group-hover:scale-125 transition-transform duration-200"
          />
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute left-full top-1/2 -translate-y-1/2 ml-2 bg-white text-black text-xs rounded shadow-lg px-2 py-1 whitespace-nowrap z-10">
            Szczecin - Strona internetowa dla restauracji
          </span>
        </div>
      </div>
      <div className="group">
        <div className="w-[10%] absolute top-[58%] left-[18%] flex items-center justify-center cursor-pointer">
          <FaMapMarkerAlt
            size={40}
            className="text-red-600 group-hover:scale-125 transition-transform duration-200"
          />
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute left-full top-1/2 -translate-y-1/2 ml-2 bg-white text-black text-xs rounded shadow-lg px-2 py-1 whitespace-nowrap z-10">
            Zielona Góra - Sklep online z elektroniką
          </span>
        </div>
      </div>
      <div className="group">
        <div className="w-[6%] absolute top-[69%] left-[33%] flex items-center justify-center cursor-pointer">
          <FaMapMarkerAlt
            size={40}
            className="text-red-600 group-hover:scale-125 transition-transform duration-200"
          />
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute left-full top-1/2 -translate-y-1/2 ml-2 bg-white text-black text-xs rounded shadow-lg px-2 py-1 whitespace-nowrap z-10">
            Wrocław - Portfolio fotografa
          </span>
        </div>
      </div>
      <div className="group">
        <div className="w-[6%] absolute top-[76%] left-[43%] flex items-center justify-center cursor-pointer">
          <FaMapMarkerAlt
            size={40}
            className="text-red-600 group-hover:scale-125 transition-transform duration-200"
          />
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute left-full top-1/2 -translate-y-1/2 ml-2 bg-white text-black text-xs rounded shadow-lg px-2 py-1 whitespace-nowrap z-10">
            Opole - Strona dla kancelarii prawnej
          </span>
        </div>
      </div>
      <div className="group">
        <div className="w-[6%] absolute top-[67%] left-[44.5%] flex items-center justify-center cursor-pointer">
          <FaMapMarkerAlt
            size={40}
            className="text-red-600 group-hover:scale-125 transition-transform duration-200"
          />
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute left-full top-1/2 -translate-y-1/2 ml-2 bg-white text-black text-xs rounded shadow-lg px-2 py-1 whitespace-nowrap z-10">
            Katowice - Sklep internetowy z odzieżą
          </span>
        </div>
      </div>
      <div className="group">
        <div className="w-[8%] absolute top-[81%] left-[56.5%] flex items-center justify-center cursor-pointer">
          <FaMapMarkerAlt
            size={40}
            className="text-red-600 group-hover:scale-125 transition-transform duration-200"
          />
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute left-full top-1/2 -translate-y-1/2 ml-2 bg-white text-black text-xs rounded shadow-lg px-2 py-1 whitespace-nowrap z-10">
            Kraków - Strona internetowa dla hotelu
          </span>
        </div>
      </div>
      <div className="group">
        <div className="w-[8%] absolute top-[78%] left-[72.5%] flex items-center justify-center cursor-pointer">
          <FaMapMarkerAlt
            size={40}
            className="text-red-600 group-hover:scale-125 transition-transform duration-200"
          />
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute left-full top-1/2 -translate-y-1/2 ml-2 bg-white text-black text-xs rounded shadow-lg px-2 py-1 whitespace-nowrap z-10">
            Rzeszów - Portal edukacyjny
          </span>
        </div>
      </div>
      <div className="group">
        <div className="w-[10%] absolute top-[57%] left-[79%] flex items-center justify-center cursor-pointer">
          <FaMapMarkerAlt
            size={40}
            className="text-red-600 group-hover:scale-125 transition-transform duration-200"
          />
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute left-full top-1/2 -translate-y-1/2 ml-2 bg-white text-black text-xs rounded shadow-lg px-2 py-1 whitespace-nowrap z-10">
            Lublin - Strona internetowa dla lekarza
          </span>
        </div>
      </div>
      <div className="group">
        <div className="w-[8%] absolute top-[65%] left-[60.5%] flex items-center justify-center cursor-pointer">
          <FaMapMarkerAlt
            size={40}
            className="text-red-600 group-hover:scale-125 transition-transform duration-200"
          />
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute left-full top-1/2 -translate-y-1/2 ml-2 bg-white text-black text-xs rounded shadow-lg px-2 py-1 whitespace-nowrap z-10">
            Kielce - Blog kulinarny
          </span>
        </div>
      </div>
      <div className="group">
        <div className="w-[10%] absolute top-[50%] left-[47.5%] flex items-center justify-center cursor-pointer">
          <FaMapMarkerAlt
            size={40}
            className="text-red-600 group-hover:scale-125 transition-transform duration-200"
          />
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute left-full top-1/2 -translate-y-1/2 ml-2 bg-white text-black text-xs rounded shadow-lg px-2 py-1 whitespace-nowrap z-10">
            Łódź - Portfolio grafika
          </span>
        </div>
      </div>
      <div className="group">
        <div className="w-[8%] absolute top-[46%] left-[30%] flex items-center justify-center cursor-pointer">
          <FaMapMarkerAlt
            size={40}
            className="text-red-600 group-hover:scale-125 transition-transform duration-200"
          />
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute left-full top-1/2 -translate-y-1/2 ml-2 bg-white text-black text-xs rounded shadow-lg px-2 py-1 whitespace-nowrap z-10">
            Poznań - Strona internetowa dla agencji marketingowej
          </span>
        </div>
      </div>
      <div className="group">
        <div className="w-[8%] absolute top-[36%] left-[22%] flex items-center justify-center cursor-pointer">
          <FaMapMarkerAlt
            size={40}
            className="text-red-600 group-hover:scale-125 transition-transform duration-200"
          />
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute left-full top-1/2 -translate-y-1/2 ml-2 bg-white text-black text-xs rounded shadow-lg px-2 py-1 whitespace-nowrap z-10">
            Gorzów Wlkp. - Strona internetowa dla szkoły językowej
          </span>
        </div>
      </div>
      <div className="group">
        <div className="w-[10%] absolute top-[27%] left-[37.5%] flex items-center justify-center cursor-pointer">
          <FaMapMarkerAlt
            size={40}
            className="text-red-600 group-hover:scale-125 transition-transform duration-200"
          />
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute left-full top-1/2 -translate-y-1/2 ml-2 bg-white text-black text-xs rounded shadow-lg px-2 py-1 whitespace-nowrap z-10">
            Bydgoszcz - Sklep internetowy z zabawkami
          </span>
        </div>
      </div>
      <div className="group">
        <div className="w-[8%] absolute top-[44%] left-[65%] flex items-center justify-center cursor-pointer">
          <FaMapMarkerAlt
            size={40}
            className="text-red-600 group-hover:scale-125 transition-transform duration-200"
          />
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute left-full top-1/2 -translate-y-1/2 ml-2 bg-white text-black text-xs rounded shadow-lg px-2 py-1 whitespace-nowrap z-10">
            Radom - Strona internetowa dla architekta
          </span>
        </div>
      </div>
      <div className="group">
        <div className="w-[8%] absolute top-[34%] left-[56%] flex items-center justify-center cursor-pointer">
          <FaMapMarkerAlt
            size={40}
            className="text-red-600 group-hover:scale-125 transition-transform duration-200"
          />
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute left-full top-1/2 -translate-y-1/2 ml-2 bg-white text-black text-xs rounded shadow-lg px-2 py-1 whitespace-nowrap z-10">
            Białystok - Portal informacyjny
          </span>
        </div>
      </div>
      <div className="group">
        <div className="w-[10%] absolute top-[23%] left-[78%] flex items-center justify-center cursor-pointer">
          <FaMapMarkerAlt
            size={40}
            className="text-red-600 group-hover:scale-125 transition-transform duration-200"
          />
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute left-full top-1/2 -translate-y-1/2 ml-2 bg-white text-black text-xs rounded shadow-lg px-2 py-1 whitespace-nowrap z-10">
            Suwałki - Strona internetowa dla firmy budowlanej
          </span>
        </div>
      </div>
      <div className="group" aos-data-aos="zoom-in">
        <div className="w-[10%] absolute top-[14.5%] sm:top-[13.5%] left-[58%] flex items-center justify-center cursor-pointer">
          <FaMapMarkerAlt
            size={40}
            className="text-red-600 group-hover:scale-125 transition-transform duration-200"
          />
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute left-full top-1/2 -translate-y-1/2 ml-2 bg-white text-black text-xs rounded shadow-lg px-2 py-1 whitespace-nowrap z-10">
            Olsztyn - Strona internetowa dla przedszkola
          </span>
        </div>
      </div>
      <div className="group">
        <div className="w-[10%] absolute top-[6%] left-[32%] flex items-center justify-center cursor-pointer">
          <FaMapMarkerAlt
            size={40}
            className="text-red-600 group-hover:scale-125 transition-transform duration-200"
          />
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute left-full top-1/2 -translate-y-1/2 ml-2 bg-white text-black text-xs rounded shadow-lg px-2 py-1 whitespace-nowrap z-10">
            Gdańsk - Strona internetowa dla salonu fryzjerskiego
          </span>
        </div>
      </div>
      <div className="group">
        <div className="w-[10%] absolute top-[20%] left-[10%] flex items-center justify-center cursor-pointer">
          <FaMapMarkerAlt
            size={40}
            className="text-red-600 group-hover:scale-125 transition-transform duration-200"
          />
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute left-full top-1/2 -translate-y-1/2 ml-2 bg-white text-black text-xs rounded shadow-lg px-2 py-1 whitespace-nowrap z-10">
            Koszalin - Strona internetowa dla trenera personalnego
          </span>
        </div>
      </div>
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
