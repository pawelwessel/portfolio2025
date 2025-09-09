import Link from "next/link";
import { polishToEnglish } from "../../../utils/polishToEnglish";
import LandingPageSearchInput from "@/components/LandingPageSearchInput";

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
    <div>
      <div
        className={`fixed w-screen h-full overflow-y-auto left-0 top-0 bg-gray-300 font-semibold transition-all duration-300 ${
          productsOpen
            ? "pt-[75px] opacity-100 z-[500]"
            : "z-[-10] opacity-0 pointer-events-none"
        } lg:hidden`}
        style={{ backdropFilter: "blur(2px)" }}
      >
        {/* Quick Links */}
        <div className="font-light font-gotham grid grid-cols-2 gap-2 px-4 py-3 bg-gray-300">
          <Link
            onClick={resetHeader}
            href="/login"
            className="rounded-lg bg-gradient-to-br from-green-600 to-green-700 text-white py-3 text-center text-base shadow hover:brightness-110 transition"
          >
            Logowanie
          </Link>
          <Link
            onClick={resetHeader}
            href="/news"
            className="rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 text-white py-3 text-center text-base shadow hover:brightness-110 transition"
          >
            Newsy
          </Link>
        </div>
        {/* Serch bar */}
        <LandingPageSearchInput
          rounded={false}
          isLandingPage={false}
          resetHeader={resetHeader}
        />
        {/* Oferta List */}
        <div className="w-full px-2 py-4 space-y-6">
          {jobs.map((job: any, i: number) => (
            <div
              className="rounded-2xl overflow-hidden shadow-lg bg-white/90 mb-6"
              key={i}
            >
              <div>
                {job.data.map((item: any, z: number) => (
                  <div
                    key={z}
                    className="border-b last:border-b-0 border-zinc-200"
                  >
                    <Link
                      href={`/oferta/dla-firm/${polishToEnglish(
                        job.title
                      )}/${polishToEnglish(item.title)}`}
                      onClick={resetHeader}
                      title={`Przejdź do ofert dla firm ${job.title}`}
                      className="block w-full text-center py-5 transition font-bold text-zinc-800 drop-shadow-xl shadow-black text-lg tracking-wide"
                    >
                      {item.title}
                    </Link>
                    {/* Subcategories */}
                    <div className="grid grid-cols-2 gap-2 bg-zinc-50 px-2 py-2">
                      {item.data.map((subcategory: any, j: number) => (
                        <Link
                          title={`Oferta ${subcategory.title} dla firm`}
                          key={j}
                          onClick={resetHeader}
                          className="flex items-center justify-center rounded-md py-3 px-2 text-center w-full h-full bg-gradient-to-br from-zinc-200 to-zinc-300 text-zinc-800 hover:bg-gradient-to-br hover:from-slate-400 hover:to-slate-600 hover:text-white transition font-gotham font-light"
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
