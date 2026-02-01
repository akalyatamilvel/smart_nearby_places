const moods = [
  { key: "cafe", label: "Cafe", color: "#7c3aed" },
  { key: "restaurant", label: "Restaurant", color: "#dc2626" },
  { key: "quick", label: "Quick Bite", color: "#f59e0b" },
  { key: "budget", label: "Budget", color: "#16a34a" },
];

export default function MoodSelector({ mood, setMood, loading }) {
  return (
    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
      {moods.map((m) => (
        <button
          key={m.key}
          disabled={loading}
          onClick={() => setMood(m.key)}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "scale(1.08)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.transform = "scale(1)")
          }
          style={{
            padding: "8px 16px",
            borderRadius: "999px",
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
            fontWeight: "600",
            fontSize: "14px",
            background: m.color,
            color: "white",
            opacity: loading ? 0.3 : mood === m.key ? 1 : 0.4,
            boxShadow:
              mood === m.key
                ? "0 6px 16px rgba(0,0,0,0.25)"
                : "none",
            transition: "all 0.2s ease",
          }}
        >
          {m.label}
        </button>
      ))}
    </div>
  );
}
