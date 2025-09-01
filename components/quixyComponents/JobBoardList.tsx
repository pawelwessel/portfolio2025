"use client";
import React, { useState } from "react";
import Pagination from "./pagination/Pagination";
import DisplayTalentsOrInviter from "./DisplayTalentsOrInviter";
import DisplayCompaniesOrInviter from "./DisplayCompaniesOrInviter";

export default function JobBoardList({
  talents,
  companies,
  content,
}: {
  talents: any;
  companies: any;
  content?: any;
}) {
  const [searchType, setSearchType] = useState("companies");

  return (
    <div className="">
      {content && (
        <div>
          <h2 className="text-white font-extrabold text-xl lg:text-3xl">
            {content?.informal_title_plural}{" "}
          </h2>
          <p className="mb-2 text-white">Czego szukasz tym razem?</p>
        </div>
      )}
      <div className="mx-auto rounded-xl">
        <div className="flex items-center justify-center w-full flex-wrap gap-3">
          <button
            onClick={() => setSearchType("talents")}
            className={`${
              searchType === "talents"
                ? "bg-blue-600 text-white"
                : "bg-white text-black"
            } w-[150px] text-center flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-gray-300 duration-200 hover:scale-105 font-gotham text-lg font-light`}
          >
            Freelancerzy
          </button>
          <button
            onClick={() => setSearchType("companies")}
            className={`${
              searchType === "companies"
                ? " bg-blue-600 text-white"
                : "bg-white text-black"
            } w-[150px] text-center flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-gray-300 duration-200 hover:scale-[1.03] font-gotham text-lg font-light`}
          >
            Firmy
          </button>
        </div>
        <div className={`rounded-lg block ${content ? "mt-6" : "mt-3"}`}>
          <div className={`${searchType === "talents" ? "" : "hidden"}`}>
            <DisplayTalentsOrInviter data={talents} />
          </div>
          <div className={`${searchType === "companies" ? "" : "hidden"}`}>
            <DisplayCompaniesOrInviter data={companies} />
          </div>
        </div>
      </div>
    </div>
  );
}
