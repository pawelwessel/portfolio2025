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
    <div className="mt-3 flex flex-wrap items-center gap-1.5">
      {tags
        .slice(0, showMore ? tags.length : 10)
        .map((item: any, i: number) => (
          <Link
            key={i}
            href={`/oferta/dla-firm/${item?.slugUrl}/${item?.categoryUrl}/${item?.url}`}
            title={item.title}
            className="inline-flex max-w-full items-center truncate rounded-full 
                   bg-gradient-to-b from-primaryStart to-primaryEnd 
                   px-2 py-1 text-[11px] font-medium text-white shadow-sm 
                   transition hover:brightness-105"
          >
            {item.title}
          </Link>
        ))}

      {tags.length > 10 && (
        <button
          type="button"
          onClick={() => setShowMore(!showMore)}
          className="inline-flex items-center rounded-full 
                 bg-gradient-to-b from-accentStart to-accentEnd 
                 px-2 py-1 text-[11px] font-medium text-white shadow-sm 
                 hover:brightness-105"
        >
          {showMore ? "Ukryj" : `+${tags.length - 10}`}
        </button>
      )}
    </div>
  );
}
