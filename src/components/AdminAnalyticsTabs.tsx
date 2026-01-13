import { useState } from "react";

type Tab = "devices" | "pages" | "emotions" | "age";

type Props = {
  devices?: React.ReactNode;
  pages?: React.ReactNode;
  emotions?: React.ReactNode;
  age?: React.ReactNode;
};

export default function AdminAnalyticsTabs({
  devices,
  pages,
  emotions,
  age,
}: Props) {
  const [active, setActive] = useState<Tab>("devices");

  return (
    <section style={{ marginBottom: 50 }}>
      {/* TAB HEADER */}
      <div style={styles.tabs}>
        <TabButton label="Devices" active={active === "devices"} onClick={() => setActive("devices")} />
        <TabButton label="Pages" active={active === "pages"} onClick={() => setActive("pages")} />
        <TabButton label="Emotions" active={active === "emotions"} onClick={() => setActive("emotions")} />
        <TabButton label="Age" active={active === "age"} onClick={() => setActive("age")} />
      </div>

      {/* TAB CONTENT */}
      <div style={styles.content}>
        {active === "devices" && devices}
        {active === "pages" && pages}
        {active === "emotions" && emotions}
        {active === "age" && age}
      </div>
    </section>
  );
}

/* ================= SMALL COMPONENT ================= */

function TabButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        ...styles.tab,
        ...(active ? styles.activeTab : {}),
      }}
    >
      {label}
    </button>
  );
}

/* ================= STYLES ================= */

const styles: Record<string, React.CSSProperties> = {
  tabs: {
    display: "flex",
    gap: 12,
    marginBottom: 20,
  },

  tab: {
    padding: "10px 18px",
    background: "rgba(15,23,42,0.8)",
    border: "1px solid #334155",
    borderRadius: 10,
    color: "#cbd5f5",
    cursor: "pointer",
    fontWeight: 500,
  },

  activeTab: {
    background: "rgba(250,204,21,0.15)",
    color: "#facc15",
    border: "1px solid rgba(250,204,21,0.4)",
  },

  content: {
    marginTop: 20,
  },
};
