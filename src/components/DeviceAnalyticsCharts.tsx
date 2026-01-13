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

type DeviceAnalytics = {
  deviceStats: Record<string, number>;
  osStats: Record<string, number>;
  browserStats: Record<string, number>;
};

const COLORS = ["#facc15", "#22c55e", "#38bdf8", "#a78bfa", "#fb7185"];

export default function DeviceAnalyticsCharts({
  data,
}: {
  data: DeviceAnalytics;
}) {
  const toChartData = (obj: Record<string, number>) =>
    Object.entries(obj).map(([name, value]) => ({ name, value }));

  return (
    <section style={{ marginBottom: 60 }}>
      <h2 style={{ color: "#facc15", marginBottom: 20 }}>
        🖥️ Device Analytics
      </h2>

      <div style={grid}>
        <ChartCard title="Device Types">
          <PieBlock data={toChartData(data.deviceStats)} />
        </ChartCard>

        <ChartCard title="Operating Systems">
          <BarBlock data={toChartData(data.osStats)} />
        </ChartCard>

        <ChartCard title="Browsers">
          <BarBlock data={toChartData(data.browserStats)} />
        </ChartCard>
      </div>
    </section>
  );
}

/* ---------- CHART BLOCKS ---------- */

function PieBlock({ data }: { data: { name: string; value: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie data={data} dataKey="value" label>
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}

function BarBlock({ data }: { data: { name: string; value: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#facc15" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

function ChartCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div style={card}>
      <h3 style={{ marginBottom: 12 }}>{title}</h3>
      {children}
    </div>
  );
}

/* ---------- STYLES ---------- */

const grid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
  gap: 24,
};

const card: React.CSSProperties = {
  background: "rgba(2,6,23,0.9)",
  border: "1px solid #1e293b",
  padding: 20,
  borderRadius: 16,
  color: "#e5e7eb",
};
