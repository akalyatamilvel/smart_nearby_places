import { moodMap } from "../utils/moodMap";

export async function getNearbyPlaces(lat, lon, mood) {
  const amenities = moodMap[mood];
  if (!amenities) return [];

  const query = `
    [out:json];
    (
      ${amenities
        .map(
          (a) =>
            `node["amenity"="${a}"](around:50000,${lat},${lon});`
        )
        .join("\n")}
    );
    out center;
  `;

  const res = await fetch(
    "https://overpass-api.de/api/interpreter",
    {
      method: "POST",
      body: query,
    }
  );

  const data = await res.json();
  return data.elements || [];
}
