"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { createLinkFromText } from "@/utils/createLinkFromText";

type City = {
  name: string;
  id: string;
};

export default function HeaderSearch({
  placeholder = "Miasto",
}: {
  placeholder?: string;
}) {
  const [city, setCity] = useState<City>({ name: "", id: "" });
  const [currentCitiesArray, setCurrentCitiesArray] = useState<City[]>([]);
  const [suppressFetch, setSuppressFetch] = useState<boolean>(false);
  const [resultSelected, setResultSelected] = useState<boolean>(false);
  const [debouncedCityName, setDebouncedCityName] = useState<string>("");
  const router = useRouter();

  const abortRef = useRef<AbortController | null>(null);

  const fetchCities = useCallback(async (query: string) => {
    try {
      if (abortRef.current) abortRef.current.abort();
      const controller = new AbortController();
      abortRef.current = controller;
      const cityLink = createLinkFromText(query);
      const response = await fetch(`/cities/${cityLink}`, {
        signal: controller.signal,
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      if (Array.isArray(data)) setCurrentCitiesArray(data);
    } catch (err: any) {
      if (err?.name !== "AbortError") {
        // eslint-disable-next-line no-console
        console.error("HeaderSearch fetch error", err);
      }
    }
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedCityName(city.name), 400);
    return () => clearTimeout(t);
  }, [city.name]);

  useEffect(() => {
    if (!debouncedCityName || resultSelected) {
      setCurrentCitiesArray([]);
      return;
    }
    if (suppressFetch) {
      setSuppressFetch(false);
      return;
    }
    if (debouncedCityName.length >= 2) fetchCities(debouncedCityName);
    else setCurrentCitiesArray([]);
  }, [debouncedCityName, fetchCities, suppressFetch, resultSelected]);

  useEffect(() => {
    return () => {
      if (abortRef.current) abortRef.current.abort();
    };
  }, []);

  const search = () => {
    if (!city.name.length) {
      toast.error("Proszę wybrać miasto.");
      return;
    }
    const cityLink = createLinkFromText(city.name);
    router.push(`/manicure-pedicure/${cityLink}`);
  };

  return (
    <div className="pl-4 relative max-w-[80%] md:max-w-[320px] h-full flex items-end justify-end">
      <div className="relative flex h-full">
        <input
          type="text"
          value={city.name}
          onChange={(e) => {
            setResultSelected(false);
            setCity({ ...city, name: e.target.value });
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              search();
            }
          }}
          placeholder={placeholder}
          className="block h-10 w-full bg-white/95 backdrop-blur text-sm rounded-lg pl-10 pr-20 border border-white/20 focus:outline-none focus:ring-2 focus:ring-primary-500/30 shadow-sm"
          autoComplete="off"
        />
        <button
          onClick={search}
          disabled={!city.name.length}
          style={{ height: "40px" }}
          className={`scale-[0.82] lg:scale-[0.9] absolute -right-[2px] md:-right-0 top-1/2 -translate-y-1/2 px-3 rounded-lg text-xs ${
            city.name.length
              ? "bg-primary-600 text-white hover:bg-primary-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Szukaj
        </button>
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </span>
      </div>

      {(() => {
        const normalize = (s: string) => s.trim().toLowerCase();
        const onlySameSingle =
          currentCitiesArray.length === 1 &&
          normalize(currentCitiesArray[0].name) === normalize(city.name);
        return (
          currentCitiesArray.length > 0 && !onlySameSingle && !resultSelected
        );
      })() && (
        <div className="absolute z-[90] mt-2 w-full">
          <ul className="max-h-56 bg-white/95 backdrop-blur-md border border-neutral-200 rounded-xl shadow-xl overflow-hidden overflow-y-auto">
            {currentCitiesArray.map((c, index) => (
              <li
                key={`${c.id}-${index}`}
                className="px-3 py-2 text-sm hover:bg-primary-50 hover:text-primary-700 cursor-pointer border-b border-neutral-100 last:border-0"
                onMouseDown={(e) => {
                  e.preventDefault();
                  setCity({ ...city, name: c.name, id: c.id });
                  setCurrentCitiesArray([]);
                  setSuppressFetch(true);
                  setResultSelected(true);
                  const cityLink = createLinkFromText(c.name);
                  router.push(`/manicure-pedicure/${cityLink}`);
                }}
              >
                {c.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
