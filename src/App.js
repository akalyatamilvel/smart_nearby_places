import { useEffect, useState } from "react";
import MapView from "./components/MapView";
import MoodSelector from "./components/MoodSelector";
import PlaceCard from "./components/PlaceCard";
import { getNearbyPlaces } from "./services/placesService";
import { getDistance } from "./utils/distance";

function App() {
  const [location, setLocation] = useState(null);
  const [mood, setMood] = useState(null);
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [maxDistance, setMaxDistance] = useState(10);
  const [cache, setCache] = useState({});

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setLocation({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        }),
      () => alert("Location permission is required")
    );
  }, []);

  useEffect(() => {
    if (!mood || !location) return;

    const key = `${mood}-${location.latitude.toFixed(
      2
    )}-${location.longitude.toFixed(2)}`;

    if (cache[key]) {
      setPlaces(cache[key]);
      return;
    }

    setLoading(true);
    setPlaces([]);

    getNearbyPlaces(
      location.latitude,
      location.longitude,
      mood
    )
      .then((data) => {
        const enriched = data.map((p, index) => {
          const lat = p.lat || p.center?.lat;
          const lon = p.lon || p.center?.lon;

          return {
            ...p,
            _id: p.id || index,
            distance: getDistance(
              location.latitude,
              location.longitude,
              lat,
              lon
            ),
          };
        });

        enriched.sort((a, b) => a.distance - b.distance);

        setCache((prev) => ({ ...prev, [key]: enriched }));
        setPlaces(enriched);
      })
      .finally(() => setLoading(false));
  }, [mood, location, cache]);

  const filteredPlaces = places.filter(
    (p) => p.distance <= maxDistance
  );

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "1100px",
        margin: "24px auto",
        background: "rgba(255,255,255,0.85)",
        borderRadius: "18px",
        boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
        backdropFilter: "blur(10px)",
        animation: "fadeIn 0.6s ease",
      }}
    >
      <h1 style={{ color: "#1d4ed8" }}>
        Smart Nearby Places
      </h1>

      <MoodSelector
        mood={mood}
        setMood={setMood}
        loading={loading}
      />

      {mood && (
        <div
          style={{
            margin: "14px 0",
            padding: "12px",
            background: "white",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            maxWidth: "340px",
          }}
        >
          <label style={{ fontWeight: 600 }}>
            Max Distance:{" "}
            <span style={{ color: "#dc2626" }}>
              {maxDistance} km
            </span>
          </label>
          <input
            type="range"
            min="1"
            max="50"
            value={maxDistance}
            onChange={(e) =>
              setMaxDistance(Number(e.target.value))
            }
            style={{ width: "100%" }}
          />
        </div>
      )}

      {!location && <p>📍 Fetching your location…</p>}

      {loading && (
        <div style={{ marginTop: "12px" }}>
          <div className="spinner" />
          <p>Finding nearby places…</p>
        </div>
      )}

      {location && (
        <MapView
          location={location}
          places={filteredPlaces}
          mood={mood}
        />
      )}

      {mood && !loading && filteredPlaces.length === 0 && (
        <p style={{ marginTop: "14px", color: "#555" }}>
          😕 No places found within {maxDistance} km.
        </p>
      )}

      {filteredPlaces.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h3>Nearby Places</h3>
          <div style={{ maxHeight: "320px", overflowY: "auto" }}>
            {filteredPlaces.map((p) => (
              <PlaceCard key={p._id} place={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
