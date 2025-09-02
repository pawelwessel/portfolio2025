import Link from "next/link";
import { polishToEnglish } from "../../../utils/polishToEnglish";
import { FaArrowLeftLong } from "react-icons/fa6";

export default function ProductsMobile({
  productsOpen,
  setProductsOpen,
  setMenuShow,
  jobs,
  menuShow,
  setHovered,
}: {
  productsOpen: boolean;
  setProductsOpen: Function;
  setMenuShow: Function;
  jobs: any;
  menuShow: boolean;
  setHovered: Function;
}) {
  function resetHeader() {
    setMenuShow(false);
    setProductsOpen(false);
    setHovered("");
  }
  return (
    <div className="">
      <div
        className={`fixed w-screen h-full overflow-y-scroll left-0 bg-white xl:space-x-3 xl:-ml-3 font-semibold shadow-black ${
          productsOpen ? "pt-[65px] opacity-100 z-[500]" : "z-[-10] opacity-0"
        } lg:hidden`}
      >
        <div className="bg-white grid grid-cols-2 mx-auto">
          <Link
            onClick={resetHeader}
            href="/oferta"
            className="bg-gradient-to-br from-zinc-600 to-zinc-800 text-white p-4 text-center text-sm"
          >
            Home
          </Link>

          <Link
            onClick={resetHeader}
            href="/news"
            className="bg-gradient-to-br from-zinc-600 to-zinc-800 text-white p-4 text-center text-sm"
          >
            Newsy
          </Link>
        </div>
        <div className="w-full flex items-center z-[200] sticky top-0 left-0 bg-gradient-to-b from-zinc-700 to-zinc-800 drop-shadow-lg shadow-zinc-800">
          <button
            onClick={() => {
              setMenuShow(false);
              setProductsOpen(false);
            }}
            className="text-xs text-black px-4 py-2 bg-zinc-700"
          >
            <FaArrowLeftLong className="text-white text-lg mx-3" />
          </button>
          <div className="text-center text-green-500 animate-pulse w-full">
            Oferta dla firm
          </div>
        </div>
        <div className="grid grid-cols-1 w-full">
          {jobs.map((job: any, i: any) => (
            <div className="flex flex-col" key={i}>
              <div className={`${i % 2 === 0 ? "" : ""} `}>
                {job.data.map((item: any, z: any) => (
                  <div key={z} className="relative">
                    <div
                      className={`flex items-center justify-between w-full text-xl`}
                    >
                      <Link
                        href={`/oferta/dla-firm/${polishToEnglish(
                          job.title
                        )}/${polishToEnglish(item.title)}`}
                        onClick={resetHeader}
                        title={`Przejdź do ofert pracy ${job.title}`}
                        className="bg-slate-800 w-full text-center py-12"
                      >
                        <span
                          title={`Oferta ${item.title}`}
                          className={`font-extrabold text-white `}
                        >
                          {item.title}
                        </span>
                      </Link>
                    </div>

                    {/* Hover dropdown */}
                    <div className="grid grid-cols-2">
                      {item.data.map((subcategory: any, i: any) => (
                        <Link
                          title={`Pracuj zdalnie w ${subcategory.title}`}
                          key={i}
                          onClick={resetHeader}
                          className="flex items-center justify-center p-4 text-center w-full h-full bg-gradient-to-br from-slate-500 to-slate-700"
                          href={`/oferta/dla-firm/${polishToEnglish(
                            job.title
                          )}/${polishToEnglish(item.title)}/${polishToEnglish(
                            subcategory.title
                          )}`}
                        >
                          {subcategory.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
