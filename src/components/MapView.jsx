import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const icons = {
  cafe: new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-violet.png",
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  }),
  restaurant: new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  }),
  quick: new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png",
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  }),
  budget: new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  }),
};

const userIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function MapView({ location, places, mood }) {
  return (
    <div style={{ animation: "fadeIn 0.6s ease" }}>
      <MapContainer
        center={[location.latitude, location.longitude]}
        zoom={12}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker
          position={[location.latitude, location.longitude]}
          icon={userIcon}
        >
          <Popup>You are here 📍</Popup>
        </Marker>

        {places.map((p) => {
          const lat = p.lat || p.center?.lat;
          const lon = p.lon || p.center?.lon;

          return (
            <Marker
              key={p._id}
              position={[lat, lon]}
              icon={icons[mood]}
            >
              <Popup>
                <b>{p.tags?.name || "Unnamed place"}</b>
                <br />
                {p.distance.toFixed(2)} km away
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
