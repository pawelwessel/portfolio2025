import { NextRequest, NextResponse } from "next/server";
import { getDocument, addDocument } from "@/firebase";

export const dynamic = "force-dynamic";

type OpeningHours = {
  open_now?: boolean;
  weekday_text?: string[];
};

type Geometry = {
  location: {
    lat: number;
    lng: number;
  };
};

type PlacePhoto = {
  url: string;
};

type PlaceDetails = {
  place_id: string;
  name: string;
  rating?: number;
  user_ratings_total?: number;
  formatted_phone_number?: string;
  website?: string;
  opening_hours?: OpeningHours;
  geometry: Geometry;
  vicinity?: string;
  photos?: PlacePhoto[];
};

type GooglePlacePhotoRef = {
  photo_reference: string;
};

type GooglePlaceDetailsResult = {
  place_id: string;
  name: string;
  rating?: number;
  user_ratings_total?: number;
  formatted_phone_number?: string;
  website?: string;
  opening_hours?: OpeningHours;
  geometry: Geometry;
  vicinity?: string;
  photos?: GooglePlacePhotoRef[];
};

function normalizeCityId(input: string): string {
  return (
    input
      .toLowerCase()
      .normalize("NFD")
      // Remove diacritics
      .replace(/\p{Diacritic}/gu, "")
      // Remove anything that is not letter/number/space
      .replace(/[^a-z0-9\s]/g, "")
      // Collapse spaces
      .trim()
      .replace(/\s+/g, " ")
      // Remove spaces
      .replace(/\s/g, "")
  );
}

function parseLimit(raw: string | null, fallback = 20, max = 20): number {
  if (!raw) return fallback;
  const parsed = Number.parseInt(raw, 10);
  if (Number.isNaN(parsed) || parsed <= 0) return fallback;
  return Math.min(parsed, max);
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city");
  const type = searchParams.get("type") ?? "beauty_salon";
  const limit = parseLimit(searchParams.get("limit"));
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_MAP_KEY;

  if (!city) {
    return NextResponse.json(
      { error: "City parameter is required" },
      { status: 400 }
    );
  }

  // 0) Try cache first
  try {
    const cityId = normalizeCityId(city);
    const cached = await getDocument("places", cityId);
    const seventyTwoHoursMs = 72 * 60 * 60 * 1000;
    const isFresh =
      cached && typeof cached.updatedAt === "number"
        ? Date.now() - cached.updatedAt < seventyTwoHoursMs
        : false;
    // If cached is fresh and either type matches or no type stored, return cached
    if (cached && isFresh && (!cached.type || cached.type === type)) {
      const results = Array.isArray(cached.results) ? cached.results : [];
      return NextResponse.json({
        results: results.slice(0, limit),
        status: "OK",
        cached: true,
        updatedAt: cached.updatedAt,
      });
    }
  } catch (e) {
    console.warn("Cache lookup for places failed:", e);
  }

  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing GOOGLE_MAPS_API_KEY environment variable" },
      { status: 500 }
    );
  }

  try {
    // 1) Geocode city to lat/lng
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      city
    )}&language=pl&region=pl&key=${apiKey}`;

    const geocodeRes = await fetch(geocodeUrl, {
      cache: "no-store",
      next: { revalidate: 0 },
    });
    if (!geocodeRes.ok) {
      return NextResponse.json(
        { error: "Failed to geocode city" },
        { status: geocodeRes.status }
      );
    }
    const geocodeData: {
      status?: string;
      results?: Array<{
        geometry?: { location?: { lat: number; lng: number } };
      }>;
      error_message?: string;
    } = await geocodeRes.json();

    if (
      geocodeData.status !== "OK" ||
      !geocodeData.results?.[0]?.geometry?.location
    ) {
      return NextResponse.json(
        {
          error:
            geocodeData.error_message || "Could not find location for city",
        },
        { status: 400 }
      );
    }

    const { lat, lng } = geocodeData.results[0].geometry!.location!;

    // 2) Nearby search for places
    const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=${encodeURIComponent(
      type
    )}&language=pl&key=${apiKey}`;

    const placesRes = await fetch(placesUrl, {
      cache: "no-store",
      next: { revalidate: 0 },
    });
    if (!placesRes.ok) {
      return NextResponse.json(
        { error: "Failed to search for places" },
        { status: placesRes.status }
      );
    }
    const placesData: {
      status?: string;
      results?: Array<{ place_id: string }>;
      error_message?: string;
    } = await placesRes.json();

    if (placesData.status !== "OK" || !placesData.results?.length) {
      return NextResponse.json(
        { error: placesData.error_message || "No places found" },
        { status: 404 }
      );
    }

    // 3) Enrich each place with details (including photos)
    const placeIds = placesData.results.map((p) => p.place_id).slice(0, limit);

    const detailedPlaces: PlaceDetails[] = await Promise.all(
      placeIds.map(async (placeId) => {
        const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(
          placeId
        )}&fields=name,rating,user_ratings_total,formatted_phone_number,website,opening_hours,geometry,vicinity,photos,place_id&language=pl&key=${apiKey}`;
        try {
          const detailsRes = await fetch(detailsUrl, {
            cache: "no-store",
            next: { revalidate: 0 },
          });
          if (!detailsRes.ok) {
            throw new Error(`Details HTTP ${detailsRes.status}`);
          }
          const detailsData: {
            status?: string;
            result?: GooglePlaceDetailsResult;
            error_message?: string;
          } = await detailsRes.json();

          if (detailsData.status !== "OK" || !detailsData.result) {
            throw new Error(detailsData.error_message || "No details");
          }

          const photos: PlacePhoto[] = Array.isArray(detailsData.result.photos)
            ? detailsData.result.photos.map((photo) => ({
                // Google Places Photo API parameter name is "photoreference"
                url: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${encodeURIComponent(
                  photo.photo_reference
                )}&key=${apiKey}`,
              }))
            : [];

          const enriched: PlaceDetails = {
            place_id: detailsData.result.place_id,
            name: detailsData.result.name,
            rating: detailsData.result.rating,
            user_ratings_total: detailsData.result.user_ratings_total,
            formatted_phone_number: detailsData.result.formatted_phone_number,
            website: detailsData.result.website,
            opening_hours: detailsData.result.opening_hours,
            geometry: detailsData.result.geometry,
            vicinity: detailsData.result.vicinity,
            photos,
          };
          return enriched;
        } catch (_err) {
          // If details fail for a single place, skip it rather than failing the whole response
          return Promise.resolve(null as unknown as PlaceDetails);
        }
      })
    ).then((arr) => arr.filter(Boolean));

    // 4) Persist to Firestore cache
    try {
      const cityId = normalizeCityId(city);
      await addDocument("places", cityId, {
        city: cityId,
        originalCity: city,
        type,
        updatedAt: Date.now(),
        results: detailedPlaces,
      });
    } catch (persistErr) {
      console.warn("Failed to persist places cache:", persistErr);
    }

    return NextResponse.json({
      results: detailedPlaces.slice(0, limit),
      status: "OK",
      cached: false,
    });
  } catch (error) {
    console.error("Error fetching places:", error);
    return NextResponse.json(
      { error: "Failed to fetch places data" },
      { status: 500 }
    );
  }
}
