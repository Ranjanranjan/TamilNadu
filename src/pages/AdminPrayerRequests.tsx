import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { FaSort } from "react-icons/fa";
import { saveAs } from "file-saver";
import { motion, AnimatePresence } from "framer-motion";
import { API_BASE } from "@/config/api";

type PrayerStatus = "pending" | "prayed" | "archived";

type PrayerRequest = {
  _id: string;
  name: string;
  message: string;
  ageRange?: string;
  phoneNumber?: string;
  location?: string;
  status: PrayerStatus;
  createdAt: string;
};

export default function AdminPrayerRequests() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState<PrayerRequest[]>([]);
  const [sortType, setSortType] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<PrayerStatus>("pending");
  const [selected, setSelected] = useState<string[]>([]);

  const counts = {
  pending: requests.filter((r) => r.status === "pending").length,
  prayed: requests.filter((r) => r.status === "prayed").length,
  archived: requests.filter((r) => r.status === "archived").length,
};



  /* 🔐 Fetch prayer requests */
  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      navigate("/__kuyavan_admin");
      return;
    }

    fetch(`${API_BASE}/admin/prayers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => {
        setRequests(data);
        setLoading(false);
      })
      .catch(() => {
        localStorage.removeItem("adminToken");
        navigate("/__kuyavan_admin");
      });
  }, [navigate]);

  /* ✅ MARK AS PRAYED */
  const markAsPrayed = async (id: string) => {
  const token = localStorage.getItem("adminToken");
  if (!token) return;

  try {
    const res = await fetch(
      `${API_BASE}/admin/prayers/${id}/prayed`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to mark as prayed");
    }

    const updated = await res.json();

    // 🔄 Update UI immediately
    setRequests((prev) =>
      prev.map((r) => (r._id === updated._id ? updated : r))
    );
  } catch (err) {
    console.error("Mark as prayed error:", err);
  }
};
    
 const deletePrayer = async (id: string) => {
    const token = localStorage.getItem("adminToken");
    if (!token) return;

    if (!confirm("Are you sure you want to delete this prayer request?")) return;

    try {
      await fetch(
        `${API_BASE}/admin/prayers/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRequests((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error("Delete prayer error:", err);
    }
  };

  const archivePrayer = async (id: string) => {
  const token = localStorage.getItem("adminToken");
  if (!token) return;

  try {
    const res = await fetch(
      `${API_BASE}/admin/prayers/${id}/archive`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to archive prayer");
    }

    const updated = await res.json();

    // 🔄 Update UI instantly
    setRequests((prev) =>
      prev.map((r) => (r._id === updated._id ? updated : r))
    );
  } catch (err) {
    console.error("Archive error:", err);
  }
};
    const toggleSelect = (id: string) => {
  setSelected((prev) =>
    prev.includes(id)
      ? prev.filter((x) => x !== id)
      : [...prev, id]
  );
};


  if (loading) {
    return (
      <div style={styles.page}>
        <p style={{ color: "#facc15" }}>Loading prayer requests…</p>
      </div>
    );
  }

  const exportToExcel = () => {
  const data = requests.map((req) => ({
    Name: req.name || "Anonymous",
    Message: req.message,
    Status: req.status,
    Date: new Date(req.createdAt).toLocaleDateString(),
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Prayer Requests");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const blob = new Blob([excelBuffer], {
    type:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  saveAs(blob, `prayer_requests_${Date.now()}.xlsx`);
};
  const bulkMarkAsPrayed = async () => {
  const token = localStorage.getItem("adminToken");
  if (!token) return;

  await Promise.all(
    selected.map((id) =>
      fetch(`${API_BASE}/admin/prayers/${id}/prayed`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    )
  );

  setRequests((prev) =>
    prev.map((r) =>
      selected.includes(r._id) ? { ...r, status: "prayed" } : r
    )
  );

  setSelected([]);
};

const bulkArchive = async () => {
  const token = localStorage.getItem("adminToken");
  if (!token) return;

  await Promise.all(
    selected.map((id) =>
      fetch(`${API_BASE}/admin/prayers/${id}/archive`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    )
  );

  setRequests((prev) =>
    prev.map((r) =>
      selected.includes(r._id) ? { ...r, status: "archived" } : r
    )
  );

  setSelected([]);
};

const bulkDelete = async () => {
  if (!confirm(`Delete ${selected.length} prayer requests?`)) return;

  const token = localStorage.getItem("adminToken");
  if (!token) return;

  await Promise.all(
    selected.map((id) =>
      fetch(`${API_BASE}/admin/prayers/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    )
  );

  setRequests((prev) => prev.filter((r) => !selected.includes(r._id)));
  setSelected([]);
};


  return (
    <div style={styles.page}>
      {/* Header */}
     {/* Header */}
<header style={styles.header}>
  <div>
    <h1 style={styles.title}>Prayer Requests</h1>

    {/* Filter Tabs */}
    <div style={styles.filters}>
  {(["pending", "prayed", "archived"] as PrayerStatus[]).map((type) => (
    <button
      key={type}
      onClick={() => setFilter(type)}
      style={{
        ...styles.filterBtn,
        ...(filter === type ? styles.activeFilter : {}),
      }}
    >
      {type.charAt(0).toUpperCase() + type.slice(1)}
      <span style={styles.badge}>{counts[type]}</span>
    </button>
  ))}
</div>


  </div>

  {/* Right side actions */}
  <div style={{ display: "flex", gap: 12 }}>
    <button style={styles.exportBtn} onClick={exportToExcel}>
      ⬇ Export Excel
    </button>

    <button onClick={() => navigate("/admin-dashboard")} style={styles.back}>
  
    // Sorting logic
    const getSortedRequests = () => {
      let filtered = requests.filter((r) => r.status === filter);
      if (sortType === "district") {
        filtered = [...filtered].sort((a, b) => {
          if (!a.location) return 1;
          if (!b.location) return -1;
          return a.location.localeCompare(b.location);
        });
      } else if (sortType === "age") {
        filtered = [...filtered].sort((a, b) => {
          if (!a.ageRange) return 1;
          if (!b.ageRange) return -1;
          return a.ageRange.localeCompare(b.ageRange);
        });
      }
      return filtered;
    };
      ← Back
    </button>
  </div>
</header>
   {selected.length > 0 && (
  <div style={styles.bulkBar}>
    <span style={{ color: "#facc15" }}>
      {selected.length} selected
    </span>

    <div style={{ display: "flex", gap: 10 }}>
      <button onClick={bulkMarkAsPrayed} style={styles.actionBtn}>
        Mark as Prayed
      </button>

      <button onClick={bulkArchive} style={styles.secondaryBtn}>
        Archive
      </button>

      <button onClick={bulkDelete} style={styles.deleteBtn}>
        Delete
      </button>
    </div>
  </div>
)}




      {/* Requests */}
<section style={styles.list}>
  {requests.length === 0 && (
    <p style={{ color: "#94a3b8" }}>No prayer requests yet.</p>
  )}

  <AnimatePresence>
    {requests
      .filter((req) => req.status === filter)
      .map((req) => (
        <motion.div
          key={req._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: req.status === "prayed" ? 0.6 : 1,
            y: 0,
          }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          whileHover={{ scale: 1.01 }}
          style={styles.card}
        >
          <div style={styles.cardHeader}>
  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
    <input
      type="checkbox"
      checked={selected.includes(req._id)}
      onChange={() => toggleSelect(req._id)}
      style={styles.checkbox}
    />

    <h3>{req.name || "Anonymous"}</h3>
  </div>

  <span style={styles.date}>
    {new Date(req.createdAt).toLocaleDateString()}
  </span>
</div>


          <p style={styles.message}>{req.message}</p>

          <div style={styles.metadata}>
            {req.ageRange && (
              <p style={{ fontSize: "12px", color: "#cbd5e1" }}>Age: {req.ageRange}</p>
            )}
            {req.phoneNumber && (
              <p style={{ fontSize: "12px", color: "#cbd5e1" }}>Phone: {req.phoneNumber}</p>
            )}
            {req.location && (
              <p style={{ fontSize: "12px", color: "#cbd5e1" }}>Location: {req.location}</p>
            )}
          </div>

          <div style={styles.actions}>
            {req.status === "pending" ? (
              <button
                onClick={() => markAsPrayed(req._id)}
                style={styles.actionBtn}
              >
                Mark as Prayed
              </button>
            ) : (
              <span style={{ color: "#22c55e", fontWeight: 600 }}>
                ✓ Prayed
              </span>
            )}

            <button
              style={styles.secondaryBtn}
              onClick={() => archivePrayer(req._id)}
            >
              Archive
            </button>

            <button
              style={styles.deleteBtn}
              onClick={() => deletePrayer(req._id)}
            >
              Delete
            </button>
          </div>
        </motion.div>
      ))}
  </AnimatePresence>
</section>


      {/* Footer verse */}
      <footer style={styles.footer}>
        <p>
          “The prayer of a righteous person is powerful and effective.”
          <br />
          <b>— James 5:16</b>
        </p>
      </footer>
    </div>
  );
}
/* 🎨 STYLES */
const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    padding: 40,
    color: "#e5e7eb",
    background:
      "radial-gradient(circle at top, #020617 0%, #020617 40%, #000000 100%)",
  },

  /* Header */
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 40,
  },

  title: {
    color: "#facc15",
    letterSpacing: 1,
    marginBottom: 8,
  },

  headerActions: {
    display: "flex",
    gap: 12,
  },

  back: {
    padding: "8px 14px",
    background: "transparent",
    color: "#facc15",
    border: "1px solid #334155",
    borderRadius: 8,
    cursor: "pointer",
  },

  exportBtn: {
    padding: "8px 14px",
    background: "#16a34a",
    color: "#ecfdf5",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: 600,
  },

  /* Filters */
  filters: {
    display: "flex",
    gap: 12,
    marginTop: 6,
  },

  filterBtn: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "6px 14px",
    background: "transparent",
    color: "#facc15",
    border: "1px solid #334155",
    borderRadius: 20,
    cursor: "pointer",
    fontSize: 14,
    transition: "all 0.2s ease",
  },

  activeFilter: {
    background: "#facc15",
    color: "#020617",
    fontWeight: 600,
  },

  badge: {
    background: "#020617",
    color: "#facc15",
    borderRadius: 12,
    padding: "2px 8px",
    fontSize: 12,
    border: "1px solid #334155",
  },

  /* List & Cards */
  list: {
    display: "grid",
    gap: 24,
    maxWidth: 900,
  },

  card: {
    background: "rgba(2,6,23,0.9)",
    border: "1px solid #1e293b",
    padding: 24,
    borderRadius: 16,
    boxShadow: "0 0 25px rgba(250,204,21,0.04)",
  },

  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  date: {
    color: "#94a3b8",
    fontSize: 14,
  },

  metadata: {
    display: "flex",
    flexWrap: "wrap",
    gap: 16,
    marginBottom: 12,
    paddingBottom: 12,
    borderBottom: "1px solid #1e293b",
  },

  message: {
    lineHeight: 1.6,
    marginBottom: 16,
    color: "#e5e7eb",
  },

  actions: {
    display: "flex",
    gap: 12,
    alignItems: "center",
  },

  /* Buttons */
  actionBtn: {
    padding: "8px 14px",
    background: "#facc15",
    color: "#020617",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: 600,
  },

  secondaryBtn: {
    padding: "8px 14px",
    background: "transparent",
    color: "#facc15",
    border: "1px solid #334155",
    borderRadius: 8,
    cursor: "pointer",
  },

  deleteBtn: {
    padding: "8px 14px",
    background: "#dc2626",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: 600,
  },

  /* Footer */
  footer: {
    marginTop: 60,
    borderTop: "1px solid #1e293b",
    paddingTop: 30,
    textAlign: "center",
    fontStyle: "italic",
    color: "#cbd5f5",
  },

  checkbox: {
  width: 16,
  height: 16,
  cursor: "pointer",
  accentColor: "#facc15",
},

bulkBar: {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  background: "rgba(2,6,23,0.95)",
  border: "1px solid #334155",
  borderRadius: 12,
  padding: "12px 16px",
  marginBottom: 20,
},


};
