"use client";
import Link from "next/link";
import { polishToEnglish } from "../../utils/polishToEnglish";
import { useState } from "react";

export default function Tags({ talent }: { talent: any }) {
  const [showMore, setShowMore] = useState<boolean>(false);

  // Ensure tags is always an array
  const tags = Array.isArray(talent?.tags) ? talent.tags : [];

  if (!tags.length) {
    return null;
  }

  return (
    <>
      <div className="flex flex-wrap">
        {tags
          .slice(0, showMore ? tags.length : 10)
          .map((item: any, i: number) => (
            <div key={i}>
              <div>
                <Link
                  href={`/oferta/dla-firm/${item?.slugUrl}/${item?.categoryUrl}/${item?.url}`}
                  className="rounded-md text-xs sm:text-sm lg:text-base bg-gradient-to-b from-zinc-700 to-primaryHoverEnd hover:from-zinc-700/80 hover:to-primaryHoverEnd/80 px-[0.7rem] text-white ml-1 mt-1 duration-100 flex items-center py-[0.5rem]"
                >
                  {item.title}
                </Link>
              </div>
            </div>
          ))}
        {tags.length > 10 && (
          <button
            type="button"
            className="rounded-md text-xs sm:text-sm lg:text-base bg-gradient-to-b from-ctaStart to-primaryHoverEnd hover:from-ctaStart/80 hover:to-primaryHoverEnd/80 px-[1rem] text-white ml-1 mt-1 duration-100 flex items-center py-[0.5rem]"
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? "Ukryj" : `Pokaż więcej (${tags.length - 10})`}
          </button>
        )}
      </div>
    </>
  );
}
