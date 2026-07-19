import type { GeocodingResponse } from "../types/geocoding";

const searchLocation = async (query: string) => {
  const params = new URLSearchParams({
    name: query,
    count: "5",
    language: "en",
    format: "json",
  });

  const response = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?${params}`,
  );

  if (!response.ok) {
    throw new Error("Error searching location");
  }

  return response.json() as Promise<GeocodingResponse>;
};

export default searchLocation
