import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/* ================= TYPES ================= */

type PrayerRequest = {
  _id: string;
  status: "pending" | "prayed" | "archived";
};

type DeviceAnalytics = {
  deviceStats: Record<string, number>;
  osStats: Record<string, number>;
  browserStats: Record<string, number>;
};

type Props = {
  requests: PrayerRequest[];
  deviceData?: DeviceAnalytics;
};


/* ================= COMPONENT ================= */

export default function GraphAnalysis({ requests }: Props) {
  const counts = {
    pending: requests.filter((r) => r.status === "pending").length,
    prayed: requests.filter((r) => r.status === "prayed").length,
    archived: requests.filter((r) => r.status === "archived").length,
  };

  const pieData = [
    { name: "Pending", value: counts.pending },
    { name: "Prayed", value: counts.prayed },
    { name: "Archived", value: counts.archived },
  ];

  const COLORS = ["#facc15", "#22c55e", "#64748b"];

  return (
    <section style={{ marginBottom: 50 }}>
      <h2 style={{ color: "#facc15", marginBottom: 20 }}>
        📊 Prayer Request Analytics
      </h2>

      <div style={styles.grid}>
        {/* PIE */}
        <div style={styles.card}>
          <h3>Status Distribution</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={pieData} dataKey="value" label>
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* BAR */}
        <div style={styles.card}>
          <h3>Status Count</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={pieData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="value"
                fill="#facc15"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}

/* ================= STYLES ================= */

const styles: Record<string, React.CSSProperties> = {
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 30,
  },

  card: {
    background: "rgba(2,6,23,0.9)",
    border: "1px solid #1e293b",
    padding: 20,
    borderRadius: 16,
    color: "#e5e7eb",
  },
};
