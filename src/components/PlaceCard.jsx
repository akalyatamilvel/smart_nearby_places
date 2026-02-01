export default function PlaceCard({ place }) {
  const name = place.tags?.name || "Unnamed place";
  const type = place.tags?.amenity || "place";

  return (
    <div
      style={{
        background: "white",
        borderRadius: "14px",
        padding: "14px",
        marginBottom: "14px",
        boxShadow: "0 10px 24px rgba(0,0,0,0.1)",
        animation: "slideUp 0.4s ease",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow =
          "0 16px 32px rgba(0,0,0,0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow =
          "0 10px 24px rgba(0,0,0,0.1)";
      }}
    >
      <h4 style={{ margin: "0 0 6px", color: "#1e3a8a" }}>
        {name}
      </h4>

      <p style={{ margin: 0, color: "#374151" }}>
        {type} •{" "}
        <span style={{ color: "#16a34a", fontWeight: 600 }}>
          {place.distance.toFixed(2)} km
        </span>
      </p>
    </div>
  );
}
