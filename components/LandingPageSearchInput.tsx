"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function LandingPageSearchInput({
  rounded,

  isLandingPage,
}: {
  rounded: boolean;
  isLandingPage: boolean;
}) {
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();
  return (
    <form
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.push(
          `/zlecenia-dla-freelancerow?search=${encodeURIComponent(inputValue)}`
        );
      }}
      className={`mx-auto lg:mx-0 mt-6 relative ${
        isLandingPage ? "w-[350px] max-w-full" : ""
      }`}
    >
      <input
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setInputValue(e.target.value)
        }
        type="text"
        placeholder="np. Marketing, Grafika..."
        className={`text-zinc-800 font-gotham placeholder:font-light placeholder:italic w-full px-4 py-2 ${
          rounded ? "rounded-full" : "rounded-md"
        } focus:outline-none ring-2 ring-green-700`}
      />
      <Link
        href={`/zlecenia-dla-freelancerow?search=${encodeURIComponent(
          inputValue
        )}`}
        title="Szukaj zleceń"
        className={`absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-700 text-white px-4 py-1 ${
          rounded ? "rounded-full" : "rounded-md"
        } hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-700`}
      >
        Szukaj
      </Link>
    </form>
  );
}
