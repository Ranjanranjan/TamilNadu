import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type EmotionStat = {
  _id: string;
  count: number;
};

const COLORS = ["#facc15", "#22c55e", "#38bdf8", "#f472b6", "#64748b"];

export default function EmotionAnalyticsCharts({
  data,
}: {
  data: EmotionStat[];
}) {
  return (
    <section style={{ marginBottom: 40 }}>
      <h2 style={{ color: "#facc15", marginBottom: 16 }}>
        ❤️ Emotion Analytics
      </h2>

      <div style={cardStyle}>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={data} dataKey="count" nameKey="_id" label>
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
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
