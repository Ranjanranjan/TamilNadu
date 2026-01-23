import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "@/config/api";

import AdminLayout from "@/layouts/AdminLayout";
import GraphAnalysis from "@/components/GraphAnalysis";
import NormalAnalysis from "@/components/NormalAnalysis";

import DeviceAnalyticsCharts from "@/components/DeviceAnalyticsCharts";
import PageAnalyticsCharts from "@/components/PageAnalyticsCharts";
import AgeAnalyticsCharts from "@/components/AgeAnalyticsCharts";
import EmotionAnalyticsCharts from "../components/EmotionAnalyticsCharts";
import AdminAnalyticsTabs from "@/components/AdminAnalyticsTabs";
import { socket } from "@/lib/socket";
import LivePageFeed from "@/components/LivePageFeed";






import {
  fetchOverview,
  fetchDevices,
  fetchAges,
  fetchEmotions,
} from "@/services/adminAnalytics";

/* ================= TYPES ================= */

type PrayerRequest = {
  _id: string;
  status: "pending" | "prayed" | "archived";
};

type OverviewStats = {
  totalVisits: number;
  uniqueSessions: number;
  avgSessionDuration: number;
};

type DeviceAnalytics = {
  deviceStats: Record<string, number>;
  osStats: Record<string, number>;
  browserStats: Record<string, number>;
};

type PageStat = {
  _id: string;   // page path
  count: number;
};

type LiveUser = {
  sessionId: string;
  page: string;
  device: string;
  os: string;
};



/* ================= COMPONENT ================= */

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [showCharts, setShowCharts] = useState(false);
  const [requests, setRequests] = useState<PrayerRequest[]>([]);
  const [overview, setOverview] = useState<OverviewStats | null>(null);
  const [deviceData, setDeviceData] = useState<DeviceAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [pagesData, setPagesData] = useState<PageStat[]>([]);
  const [ageData, setAgeData] = useState< { _id: string; count: number }[]>([]);
  const [emotionData, setEmotionData] = useState<{ _id: string; count: number }[]>([]);
  const [liveUsers, setLiveUsers] = useState<LiveUser[]>([]);






  /* 🔐 AUTH + DATA LOAD */
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/__kuyavan_admin");
      return;
    }

    Promise.all([
  fetch(`${API_BASE}/admin/prayers`, {
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => res.json()),
  fetchOverview(),
  fetchDevices(),
  fetchAges(),
  fetchEmotions(),
])
  .then(([prayers, overviewData, devices, ages, emotions]) => {
    setRequests(prayers);
    setOverview(overviewData);
    setDeviceData(devices);
    setAgeData(ages);
    setEmotionData(emotions);
  })
  .catch(console.error)
  .finally(() => setLoading(false));



  }, [navigate]);

  useEffect(() => {
  socket.on("live:users", (users) => {
    setLiveUsers(users);
  });

  return () => {
    socket.off("live:users");
  };
}, []);


  /* LOADING STATE */
  if (loading) {
    return (
      <AdminLayout>
        <p style={{ color: "#94a3b8" }}>Loading dashboard…</p>
      </AdminLayout>
    );
  }
  

  const pending = requests.filter((r) => r.status === "pending").length;
  const prayed = requests.filter((r) => r.status === "prayed").length;
  const archived = requests.filter((r) => r.status === "archived").length;

  return (
    <AdminLayout>
      {/* HEADER */}
      <div style={styles.header}>
        <button
          onClick={() => setShowCharts((p) => !p)}
          style={styles.switchBtn}
        >
          {showCharts ? "📋 Normal View" : "📊 Graph View"}
        </button>

        <h1 style={styles.title}>TamilNadu Admin Dashboard</h1>
      </div>

      {/* PRAYER ANALYTICS */}
      {showCharts ? (
        <GraphAnalysis requests={requests} />
      ) : (
        <NormalAnalysis requests={requests} />
      )}

      {/* WELCOME */}
      <section style={styles.hero}>
        <h2>Welcome, Admin ✨</h2>
        <p>
          You are stewarding <b>TamilNadu Gospel</b>.  
          Monitor prayer, outreach, and engagement across regions and devices.
        </p>
      </section>

      {/* OVERVIEW STATS */}
      <section style={styles.stats}>
        <StatCard title="Total Visitors" value={overview?.totalVisits ?? 0} />
        <StatCard title="Unique Sessions" value={overview?.uniqueSessions ?? 0} />
        <StatCard
          title="Avg Session Duration (s)"
          value={overview?.avgSessionDuration ?? 0}
        />
        <StatCard title="Total Requests" value={requests.length} />
      </section>

      {/* ANALYTICS TABS (C5) */}
<AdminAnalyticsTabs
  devices={deviceData && <DeviceAnalyticsCharts data={deviceData} />}
  pages={pagesData.length > 0 && <PageAnalyticsCharts data={pagesData} />}
  emotions={emotionData.length > 0 && <EmotionAnalyticsCharts data={emotionData} />}
  age={ageData.length > 0 && <AgeAnalyticsCharts data={ageData} />}
/>
      
      <LivePageFeed users={liveUsers} />


      {/* PRAYER STATUS */}
      <section style={styles.stats}>
        <StatCard title="Pending Prayers" value={pending} />
        <StatCard title="Prayed" value={prayed} />
        <StatCard title="Archived" value={archived} />
      </section>

      {/* ACTIONS */}
      <section style={styles.actions}>
        <button
          style={styles.actionBtn}
          onClick={() => navigate("/admin-prayer-requests")}
        >
          View Prayer Requests
        </button>

        <button style={styles.actionBtn} disabled>
          View Analytics (Next)
        </button>

        <button style={styles.actionBtn} disabled>
          Export Reports
        </button>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <p>
          “Go into all the world and preach the gospel to all creation.”
          <br />
          <b>— Mark 16:15</b>
        </p>
      </footer>
    </AdminLayout>
  );
}


/* ================= SMALL COMPONENT ================= */

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <div style={styles.card}>
      <h3>{title}</h3>
      <div style={styles.divider} />
      <p style={styles.number}>{value}</p>
    </div>
  );
}

/* ================= STYLES ================= */

const styles: Record<string, React.CSSProperties> = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
  },

  title: {
    color: "#facc15",
    letterSpacing: 1,
  },

  switchBtn: {
    padding: "8px 14px",
    background: "rgba(15,23,42,0.9)",
    color: "#facc15",
    border: "1px solid #334155",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: 500,
  },

  hero: {
    background:
      "linear-gradient(180deg, rgba(250,204,21,0.06), rgba(0,0,0,0))",
    border: "1px solid #1e293b",
    padding: 30,
    borderRadius: 14,
    marginBottom: 36,
  },

  stats: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 24,
    marginBottom: 40,
  },

  card: {
    background: "rgba(2,6,23,0.9)",
    border: "1px solid #1e293b",
    padding: 24,
    borderRadius: 16,
    textAlign: "center",
  },

  divider: {
    width: 40,
    height: 3,
    background: "#facc15",
    margin: "10px auto 16px",
    borderRadius: 2,
  },

  number: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#facc15",
  },

  actions: {
    display: "flex",
    gap: 16,
    flexWrap: "wrap",
    marginBottom: 60,
  },

  actionBtn: {
    padding: "14px 22px",
    background: "rgba(15,23,42,0.8)",
    color: "#facc15",
    border: "1px solid #334155",
    borderRadius: 12,
    cursor: "pointer",
    fontWeight: 500,
  },

  footer: {
    borderTop: "1px solid #1e293b",
    paddingTop: 30,
    textAlign: "center",
    fontStyle: "italic",
    color: "#cbd5f5",
  },
};
