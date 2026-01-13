import { useState } from "react";
import { API_BASE } from "@/config/api";

export default function KuyavanAdmin() {
  const [secretKey, setSecretKey] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const loginAdmin = async () => {
    setError("");

    try {
      const res = await fetch(`${API_BASE}/api/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          secretKey,
          username,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      // ✅ Save token
      localStorage.setItem("adminToken", data.token);

      // 🔁 Redirect (dashboard comes next)
      window.location.href = "/admin-dashboard";
    } catch {
      setError("Server error");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.box}>
        <h2 style={{ color: "#facc15" }}>TamilNadu Admin</h2>

        <input
          placeholder="Secret Key"
          type="password"
          value={secretKey}
          onChange={(e) => setSecretKey(e.target.value)}
          style={styles.input}
        />

        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />

        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <button onClick={loginAdmin} style={styles.button}>
          Login
        </button>

        {error && <p style={styles.error}>{error}</p>}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    background: "#0f172a",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    background: "#020617",
    padding: 30,
    width: 320,
    borderRadius: 10,
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 12,
    borderRadius: 6,
    border: "none",
  },
  button: {
    width: "100%",
    padding: 10,
    background: "#facc15",
    border: "none",
    borderRadius: 6,
    fontWeight: "bold",
    cursor: "pointer",
  },
  error: {
    color: "#ef4444",
    marginTop: 10,
  },
};
