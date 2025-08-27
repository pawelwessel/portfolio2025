import data from "polskie-miejscowosci";
import { createLinkFromText } from "@/utils/createLinkFromText";
import { NextResponse } from "next/server";

// Cache the processed cities data
let cachedCities: { id: string; name: string }[] | null = null;

function getCities() {
  if (!cachedCities) {
    cachedCities = Array.from(new Set(data.map((city) => city.Name))).map(
      (name) => ({
        id: createLinkFromText(name),
        name,
      })
    );
  }
  return cachedCities;
}

export async function GET() {
  const cities = getCities();
  return NextResponse.json(cities);
}
