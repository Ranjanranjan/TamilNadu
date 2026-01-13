type LiveUser = {
  sessionId: string;
  page: string;
  device?: string;
  lastSeen?: number;
};


export default function LivePageFeed({ users }: { users: LiveUser[] }) {

  return (
    <section style={{ marginBottom: 40 }}>
      <h2 style={{ color: "#facc15", marginBottom: 16 }}>
        🟢 Live Visitors ({users.length})
      </h2>

      <div style={cardStyle}>
        {users.length === 0 && (
          <p style={{ color: "#94a3b8" }}>No active visitors</p>
        )}

        {users.map((u) => (
  <div key={u.sessionId} style={rowStyle}>

            <span>📱 {u.device}</span>
            <span>{u.page}</span>
          </div>
        ))}
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

const rowStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  padding: "8px 0",
  borderBottom: "1px solid #1e293b",
};