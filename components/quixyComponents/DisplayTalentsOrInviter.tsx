import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaDollarSign, FaMapMarker, FaPlusCircle } from "react-icons/fa";
import Pagination from "./pagination/Pagination";

export default function DisplayTalentsOrInviter({ data }: { data: any }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6); // Initially, 6 items per page
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleShowMore = () => {
    setItemsPerPage((prev) => prev + 6); // Load 6 more talents each time the button is clicked
  };
  return (
    <>
      <div
        className={`w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-6`}
      >
        {/* Wyświetlenie dostępnych talentów */}
        {data.map((talent: any, i: number) => (
          <Link
            key={talent?.pseudo || i}
            href={`/talent/${talent.pseudo}`}
            className="flex flex-col p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-200 hover:scale-[1.03]"
          >
            <div className="flex flex-row">
              {/* Zdjęcie lub inicjały */}
              {talent?.photoURL ? (
                <div className="relative min-w-16 lg:min-w-20 h-16 lg:h-20 aspect-square rounded-full overflow-hidden shadow">
                  <Image
                    src={talent.photoURL}
                    width={224}
                    height={224}
                    alt={`Zdjęcie talentu ${talent?.name || talent?.pseudo}`}
                    className="absolute inset-0 object-cover w-full h-full"
                  />
                </div>
              ) : (
                <span className="min-w-16 lg:min-w-20 h-16 lg:h-20 aspect-square rounded-full flex items-center justify-center text-4xl font-extrabold text-white bg-green-600 shadow">
                  {talent?.name
                    ? talent.name[0]?.toUpperCase()
                    : talent?.pseudo[0]?.toUpperCase()}
                </span>
              )}

              {/* Informacje o talencie */}
              <div className="px-2 sm:px-4 flex flex-col">
                <span className="font-extrabold text-base text-black">
                  {talent?.name}
                </span>
                <div className="text-xs sm:text-sm xl:text-base mt-0.5">
                  <span
                    style={{ lineHeight: 1.8 }}
                    className="font-gotham font-light text-black rounded-md py-1 w-max max-w-full"
                  >
                    {talent?.title}
                  </span>
                </div>
              </div>
            </div>

            <div className="w-full flex items-center gap-2 flex-wrap">
              <div className="flex flex-row items-center mt-2">
                <FaMapMarker className="mr-0.5 text-sm text-black" />
                <span className="text-xs lg:text-base  text-black font-gotham font-light">
                  {talent?.city}
                </span>
              </div>
              <div className="col-span-2 mt-2">
                <div className="flex flex-row items-center text-xs lg:text-base">
                  <FaDollarSign className="mr-0.5 text-sm text-black" />
                  <span
                    style={{ lineHeight: 1.8 }}
                    className="font-gotham font-light text-black w-max max-w-full"
                  >
                    {talent?.hourRate
                      ? `${talent.hourRate} PLN/h`
                      : "Zapytaj o wycenę"}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}

        <Link
          href="/register"
          className="flex items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-200 hover:scale-105"
        >
          <FaPlusCircle className="text-zinc-600 text-5xl min-w-16 lg:min-w-20 h-16 lg:h-20" />
          <div className="px-4">
            <p className="text-sm text-black font-gotham font-light">
              Skonfiguruj profil na naszej platformie i wyświetlaj swoje usługi.
            </p>
          </div>
        </Link>
      </div>
      {data.length > 0 && (
        <div className="">
          <Pagination
            onShowMore={handleShowMore}
            totalItems={data?.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </>
  );
}
