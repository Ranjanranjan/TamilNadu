import { ReactNode } from "react";
import { NavLink, useNavigate } from "react-router-dom";

type Props = {
  children: ReactNode;
};

export default function AdminLayout({ children }: Props) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/__kuyavan_admin");
  };

  return (
    <div style={styles.wrapper}>
      {/* SIDEBAR */}
      <aside style={styles.sidebar}>
        <div>
          <h2 style={styles.logo}>TamilNadu</h2>

          <nav style={styles.nav}>
            <SidebarLink label="📊 Dashboard" to="/admin-dashboard" />
            <SidebarLink label="📨 Prayer Requests" to="/admin-prayer-requests" />
            <SidebarLink label="📈 Analytics" disabled />
            <SidebarLink label="📄 Reports" disabled />
          </nav>
        </div>

        <button onClick={logout} style={styles.logout}>
          Logout
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main style={styles.content}>{children}</main>
    </div>
  );
}

/* ================= SIDEBAR LINK ================= */

function SidebarLink({
  label,
  to,
  disabled,
}: {
  label: string;
  to?: string;
  disabled?: boolean;
}) {
  if (disabled) {
    return (
      <div style={{ ...styles.link, opacity: 0.4, cursor: "not-allowed" }}>
        {label}
      </div>
    );
  }

  return (
    <NavLink
      to={to!}
      style={({ isActive }) => ({
        ...styles.link,
        ...(isActive ? styles.active : {}),
      })}
    >
      {label}
    </NavLink>
  );
}

/* ================= STYLES ================= */

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    display: "flex",
    minHeight: "100vh",
    background: "#020617",
    color: "#e5e7eb",
  },

  sidebar: {
    width: 260,
    padding: "24px 18px",
    borderRight: "1px solid #1e293b",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    position: "fixed",
    top: 0,
    left: 0,
    height: "100vh",
    background: "#020617",
  },

  logo: {
    color: "#facc15",
    fontSize: 22,
    letterSpacing: 1,
    marginBottom: 32,
    textAlign: "center",
  },

  nav: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },

  link: {
    padding: "12px 16px",
    borderRadius: 10,
    color: "#cbd5f5",
    textDecoration: "none",
    fontWeight: 500,
    border: "1px solid transparent",
  },

  active: {
    background: "rgba(250,204,21,0.12)",
    border: "1px solid rgba(250,204,21,0.3)",
    color: "#facc15",
  },

  logout: {
    padding: "12px",
    borderRadius: 10,
    background: "linear-gradient(135deg, #ef4444, #dc2626)",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
  },

  content: {
    marginLeft: 260,
    padding: 40,
    width: "100%",
    background:
      "radial-gradient(circle at top, #020617 0%, #020617 40%, #000000 100%)",
  },
};
