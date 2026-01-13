type DeviceAnalytics = {
  deviceStats: Record<string, number>;
  osStats: Record<string, number>;
  browserStats: Record<string, number>;
};

export default function DeviceAnalyticsCards({
  data,
}: {
  data: DeviceAnalytics;
}) {
  return (
    <section style={{ marginBottom: 40 }}>
      <h2 style={styles.title}>🖥 Device Analytics</h2>

      <div style={styles.grid}>
        <AnalyticsCard title="Devices Used" stats={data.deviceStats} />
        <AnalyticsCard title="Operating Systems" stats={data.osStats} />
        <AnalyticsCard title="Browsers" stats={data.browserStats} />
      </div>
    </section>
  );
}

/* 🔹 SMALL CARD */
function AnalyticsCard({
  title,
  stats,
}: {
  title: string;
  stats: Record<string, number>;
}) {
  return (
    <div style={styles.card}>
      <h3>{title}</h3>
      <ul style={styles.list}>
        {Object.entries(stats).map(([key, value]) => (
          <li key={key}>
            <span>{key}</span>
            <b>{value}</b>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* 🎨 STYLES */
const styles: Record<string, React.CSSProperties> = {
  title: {
    color: "#facc15",
    marginBottom: 16,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: 24,
  },

  card: {
    background: "rgba(2,6,23,0.9)",
    border: "1px solid #1e293b",
    padding: 20,
    borderRadius: 14,
    color: "#e5e7eb",
  },

  list: {
    listStyle: "none",
    padding: 0,
    marginTop: 12,
    lineHeight: 2,
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
};
