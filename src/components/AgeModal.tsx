import React from "react";
import { setAgeRange, AgeRange, getSession } from "@/utils/session";
import { trackAgeSelection } from "@/services/analytics";

const AGE_RANGES: AgeRange[] = [
  "10-15",
  "16-19",
  "20-30",
  "31-45",
  "46+",
];

export default function AgeModal({
  onClose,
}: {
  onClose: () => void;
}) {
  const handleSelect = (range: AgeRange) => {
    const session = getSession();

    setAgeRange(range);

    trackAgeSelection({
      sessionId: session.sessionId,
      ageRange: range,
    });

    onClose();
  };

  return (
    <div style={overlay}>
      <div style={modal}>
        <h3 style={{ color: "#facc15" }}>
          Help us understand our reach
        </h3>
        <p style={{ color: "#cbd5f5" }}>
          Select your age range (anonymous)
        </p>

        <div style={grid}>
          {AGE_RANGES.map((range) => (
            <button
              key={range}
              style={btn}
              onClick={() => handleSelect(range)}
            >
              {range}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* styles */
const overlay = {
  position: "fixed" as const,
  inset: 0,
  background: "rgba(0,0,0,0.6)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 999,
};

const modal = {
  background: "#020617",
  border: "1px solid #1e293b",
  padding: 30,
  borderRadius: 16,
  width: 360,
  textAlign: "center" as const,
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: 12,
  marginTop: 20,
};

const btn = {
  padding: "10px",
  background: "rgba(15,23,42,0.8)",
  color: "#facc15",
  border: "1px solid #334155",
  borderRadius: 10,
  cursor: "pointer",
};
