"use client";
import Link from "next/link";
import { polishToEnglish } from "../../../utils/polishToEnglish";
import { FaFacebook, FaTiktok } from "react-icons/fa6";

export default function ProductsWide({
  width,

  hovered,
  handleMouseEnter,
  handleMouseLeave,
  jobs,

  setProductsOpen,
}: {
  width: number;

  hovered: string;
  handleMouseEnter: any;
  handleMouseLeave: any;
  jobs: any;

  setProductsOpen: any;
}) {
  function resetHeader() {
    handleMouseLeave();
  }
  return (
    <div
      onMouseEnter={() => {
        width >= 1024 && handleMouseEnter("cat");
      }}
      onMouseLeave={() => {
        width >= 1024 && handleMouseLeave();
      }}
      className={`z-[9999] pb-12 fixed w-full max-h-[80vh] overflow-y-scroll top-0 left-0 bg-white shadow-black ${
        hovered === "cat"
          ? "translate-y-[116px] lg:translate-y-[84px]"
          : "-translate-y-[100vh] opacity-0"
      } hidden lg:grid shadow-sm`}
    >
      <div className="relative mt-12">
        <div className="sticky top-0 left-0 flex flex-col z-[500] px-12">
          <div className="my-4 relative flex flex-col">
            <div className="flex items-center flex-wrap gap-4">
              <Link
                title="Strony Internetowe WWW z Cennikiem Grudziądz Tiktok"
                target="_blank"
                href="https://www.tiktok.com/@strony_www_grudziadz"
                className="flex items-center"
              >
                <FaTiktok className="text-2xl text-black" />
              </Link>
              <Link
                title="Strony Internetowe WWW z Cennikiem Grudziądz Facebook"
                href="https://www.facebook.com/profile.php?id=61579945978455"
                target="_blank"
                className="flex items-center"
              >
                <FaFacebook className="text-2xl text-black" />
              </Link>
            </div>
          </div>
          <div className="gap-4 grid grid-cols-3">
            {jobs.map((job: any, i: any) => (
              <div className={` flex flex-col font-extrabold`} key={i}>
                <Link
                  href={`/oferta/dla-firm/${polishToEnglish(job.title)}`}
                  title={`Oferta ${job.title}`}
                  className={`w-max max-w-full border-2 border-white text-center rounded-lg flex flex-col bg-gradient-to-b from-zinc-700 to-zinc-800 hover:scale-105 duration-100`}
                  key={i}
                  onClick={resetHeader}
                >
                  <span
                    style={{ textShadow: "2px 2px 5px gray" }}
                    className="text-white text-xl p-2"
                  >
                    {job.title}
                  </span>
                </Link>
                <div className="flex flex-col mt-3">
                  {job.data.map((item: any, i: any) => (
                    <div key={i} className="relative group w-max">
                      <div
                        title={`Oferta ${job.title} / ${item.title}`}
                        className="group-hover:text-white duration-150 group-hover:bg-gradient-to-r group-hover:from-green-700 group-hover:to-green-800 p-1 text-base text-black"
                      >
                        {item.title}
                      </div>

                      {/* Hover dropdown */}
                      <div className="mt-[4px] flex flex-col absolute left-0 top-0 group-hover:-translate-y-0 -translate-y-[1000%] opacity-0 group-hover:opacity-100 z-50">
                        <Link
                          onClick={resetHeader}
                          title={`Oferta ${item.title}`}
                          className="py-3.5 text-white font-bold w-full text-left text-base"
                          href={`/oferta/dla-firm/${polishToEnglish(
                            job.title
                          )}/${polishToEnglish(item.title)}`}
                        ></Link>
                        <div className="flex flex-col xl:flex-row xl:flex-wrap xl:w-[420px] w-[210px] overflow-hidden">
                          {item.data.map((subcategory: any, i: any) => (
                            <Link
                              onClick={() => resetHeader()}
                              title={`Oferta ${job.title}/${item.title}/${subcategory.title}`}
                              key={i}
                              style={{ boxShadow: "inset 0px 0px 3px black" }}
                              className={`hover:underline bg-white font-normal p-2 text-black w-[210px] xl:min-w-[210px] max-w-[420px] ${
                                item.data.length % 2 !== 0 &&
                                i + 1 === item.data.length &&
                                ""
                              }`}
                              href={`/oferta/dla-firm/${polishToEnglish(
                                job.title
                              )}/${polishToEnglish(
                                item.title
                              )}/${polishToEnglish(subcategory.title)}`}
                            >
                              {subcategory.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
