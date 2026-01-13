import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type PageStat = {
  _id: string;
  count: number;
};

export default function PageAnalyticsCharts({
  data,
}: {
  data: PageStat[];
}) {
  const chartData = data.map((p) => ({
    page: p._id,
    visits: p.count,
  }));

  return (
    <section style={{ marginBottom: 50 }}>
      <h2 style={{ color: "#facc15", marginBottom: 20 }}>
        📄 Page Visit Analytics
      </h2>

      <div style={cardStyle}>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={chartData}>
            <XAxis dataKey="page" />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="visits"
              fill="#facc15"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

const cardStyle: React.CSSProperties = {
  background: "rgba(2,6,23,0.9)",
  border: "1px solid #1e293b",
  padding: 24,
  borderRadius: 16,
  color: "#e5e7eb",
};
