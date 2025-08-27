"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { createLinkFromText } from "@/utils/createLinkFromText";

interface City {
  name: string;
  id: string;
}

export default function Logic({ slugCity }: { slugCity?: string }) {
  const [city, setCity] = useState<City>({
    name: "",
    id: "",
  });
  const [currentCitiesArray, setCurrentCitiesArray] = useState<City[]>([]);
  const [suppressFetch, setSuppressFetch] = useState<boolean>(false);
  const [resultSelected, setResultSelected] = useState<boolean>(false);
  const router = useRouter();
  // Debounce state updates
  const [debouncedCityName, setDebouncedCityName] = useState<string>(city.name);
  // Keep track of in-flight request to cancel stale ones
  const abortRef = useRef<AbortController | null>(null);
  // Fetch cities with abort controller for cancelling previous requests
  const fetchCities = useCallback(
    async (query: string) => {
      try {
        // Cancel any previous request before starting a new one
        if (abortRef.current) {
          abortRef.current.abort();
        }
        const controller = new AbortController();
        abortRef.current = controller;
        const cityLink = createLinkFromText(query);
        const response = await fetch(`/cities/${cityLink}`, {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (data.length > 0 && data[0].name === city.name) {
          setCity({
            name: data[0].name,
            id: data[0].id,
          });
        }
        setCurrentCitiesArray(data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        if (error.name !== "AbortError") {
          console.error("Error fetching cities:", error);
        }
      }
    },
    [city.name]
  );

  // Handle debounce logic - increased debounce time for better performance
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedCityName(city.name), 500);
    return () => clearTimeout(handler);
  }, [city.name]);

  // Cleanup on unmount: abort any in-flight request
  useEffect(() => {
    return () => {
      if (abortRef.current) {
        abortRef.current.abort();
      }
    };
  }, []);

  // Fetch cities when debouncedCityName changes
  useEffect(() => {
    if (!debouncedCityName || resultSelected) {
      setCurrentCitiesArray([]);
      return;
    }

    // Only search if we have at least 2 characters
    if (suppressFetch) {
      // Skip one fetch cycle right after a selection
      setSuppressFetch(false);
      return;
    }
    if (debouncedCityName.length >= 2) {
      fetchCities(debouncedCityName);
    } else {
      setCurrentCitiesArray([]);
    }
  }, [debouncedCityName, fetchCities, suppressFetch, resultSelected]);

  const search = () => {
    if (!city.name.length) {
      toast.error("Proszę wybrać miasto.", {
        position: "top-center",
        draggable: true,
        autoClose: 5000,
      });
      return;
    }
    if (city.name.length > 0) {
      const cityLink = createLinkFromText(city.name);
      router.push(`/manicure-pedicure/${cityLink}`);
    }
  };
  return (
    <div className="flex flex-col w-full relative">
      <div className="flex flex-col items-center justify-center">
        {/* Enhanced input with floating label effect */}
        <div className="relative w-full group">
          <input
            type="text"
            name="city"
            value={city.name}
            onChange={(e) => {
              setResultSelected(false);
              setCity({ ...city, name: e.target.value });
            }}
            placeholder={slugCity || "Miasto"}
            className="w-full bg-white border-2 border-neutral-300 rounded-xl placeholder:text-neutral-500 text-neutral-900 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all duration-300 shadow-md hover:shadow-lg group-hover:border-primary-400"
            autoComplete="off"
            list="no-autocomplete"
          />
          {/* Search icon */}
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 group-focus-within:text-primary-500 transition-colors duration-200">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Enhanced search button with modern design */}
        <button
          type="button"
          className="group relative mt-4 rounded-xl font-semibold z-[50] p-3 text-base bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800 disabled:from-neutral-300 disabled:to-neutral-400 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-[1.01] active:scale-[0.99] w-max max-w-full px-8"
          onClick={search}
        >
          <span className="flex items-center justify-center gap-2">
            <span>Wyszukaj</span>
            <svg
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </span>
          {/* Subtle hover effect */}
          <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
      </div>

      {/* Enhanced dropdown with modern styling and animations */}
      {(() => {
        const normalize = (s: string) => s.trim().toLowerCase();
        const onlySameSingle =
          currentCitiesArray.length === 1 &&
          normalize(currentCitiesArray[0].name) === normalize(city.name);
        return (
          currentCitiesArray.length > 0 && !onlySameSingle && !resultSelected
        );
      })() && (
        <div className="z-[60] absolute w-full top-[60px] animate-slide-in-down">
          <ul className="max-h-[200px] bg-white/95 backdrop-blur-md border border-neutral-200 rounded-xl shadow-xl overflow-hidden overflow-y-auto">
            {currentCitiesArray.map((c, index) => (
              <li
                key={index}
                className="group px-4 py-3 hover:bg-gradient-to-r hover:from-primary-50 hover:to-primary-100 hover:text-primary-700 cursor-pointer transition-all duration-200 border-b border-neutral-100 last:border-b-0 animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
                onMouseDown={(e) => {
                  // Prevent input from losing focus before handler runs
                  e.preventDefault();
                  setCity({ ...city, name: c.name, id: c.id });
                  setCurrentCitiesArray([]);
                  setSuppressFetch(true);
                  setResultSelected(true);
                  const cityLink = createLinkFromText(c.name);
                  router.push(`/manicure-pedicure/${cityLink}`);
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{c.name}</span>
                  <svg
                    className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
