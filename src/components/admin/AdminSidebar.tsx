import { NavLink, useNavigate } from "react-router-dom";

const navItems = [
  { label: "Overview", path: "/admin-dashboard" },
  { label: "Prayer Requests", path: "/admin-prayer-requests" },
  { label: "Analytics", path: "/admin-dashboard" },
];

export default function AdminSidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/__kuyavan_admin");
  };

  return (
    <aside style={styles.sidebar}>
      <div>
        <h2 style={styles.logo}>TamilNadu</h2>

        <nav style={styles.nav}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              style={({ isActive }) => ({
                ...styles.link,
                ...(isActive ? styles.active : {}),
              })}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <button onClick={logout} style={styles.logout}>
        Logout
      </button>
    </aside>
  );
}

const styles: Record<string, React.CSSProperties> = {
  sidebar: {
    width: 260,
    background: "#020617",
    borderRight: "1px solid #1e293b",
    padding: "24px 16px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100vh",
    position: "fixed",
    left: 0,
    top: 0,
  },

  logo: {
    color: "#facc15",
    fontSize: 22,
    marginBottom: 32,
    textAlign: "center",
    letterSpacing: 1,
  },

  nav: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },

  link: {
    padding: "12px 16px",
    borderRadius: 10,
    textDecoration: "none",
    color: "#cbd5f5",
    fontWeight: 500,
  },

  active: {
    background: "rgba(250,204,21,0.12)",
    color: "#facc15",
  },

  logout: {
    background: "linear-gradient(135deg, #ef4444, #dc2626)",
    color: "#fff",
    border: "none",
    padding: "12px",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: 600,
  },
};
