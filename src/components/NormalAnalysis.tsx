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

export default function NormalAnalysis({ requests }: Props) {
  const pending = requests.filter((r) => r.status === "pending").length;
  const prayed = requests.filter((r) => r.status === "prayed").length;
  const archived = requests.filter((r) => r.status === "archived").length;

  return (
    <section style={styles.wrapper}>
      <h2 style={styles.title}>📋 Overview</h2>

      <ul style={styles.list}>
        <li>⏳ Pending prayers: <b>{pending}</b></li>
        <li>🙏 Prayed prayers: <b>{prayed}</b></li>
        <li>🗂 Archived prayers: <b>{archived}</b></li>
      </ul>
    </section>
  );
}

/* ================= STYLES ================= */

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    marginBottom: 40,
    background: "rgba(2,6,23,0.85)",
    border: "1px solid #1e293b",
    padding: 24,
    borderRadius: 16,
    color: "#e5e7eb",
  },

  title: {
    color: "#facc15",
    marginBottom: 16,
  },

  list: {
    lineHeight: 2,
    paddingLeft: 20,
  },
};
