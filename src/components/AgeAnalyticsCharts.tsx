import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type AgeStat = {
  _id: string;
  count: number;
};

export default function AgeAnalyticsCharts({
  data,
}: {
  data: AgeStat[];
}) {
  return (
    <section style={{ marginBottom: 40 }}>
      <h2 style={{ color: "#facc15", marginBottom: 16 }}>
        👥 Age Group Analytics
      </h2>

      <div style={cardStyle}>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data}>
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#38bdf8" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

const cardStyle: React.CSSProperties = {
  background: "rgba(2,6,23,0.9)",
  border: "1px solid #1e293b",
  borderRadius: 16,
  padding: 20,
};
