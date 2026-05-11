import { useEffect, useState } from "react";

export default function Dashboard() {
  const [leads, setLeads] = useState([]);
  const [status, setStatus] = useState("Loading leads...");

  useEffect(() => {
    async function loadLeads() {
      const response = await fetch("/api/leads");
      const data = await response.json();

      if (!response.ok) {
        setStatus(data.error || "Unable to load leads");
        return;
      }

      setLeads(data.leads);
      setStatus("");
    }

    loadLeads();
  }, []);

  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: 40, fontFamily: "sans-serif" }}>
      <h1>Dashboard</h1>
      <p>Yahan Supabase me save hua data dikhega.</p>

      {status ? <p>{status}</p> : null}

      <ul style={{ padding: 0, listStyle: "none", marginTop: 24 }}>
        {leads.map((lead) => (
          <li
            key={lead.id}
            style={{ border: "1px solid #ddd", padding: 16, borderRadius: 8, marginBottom: 12 }}
          >
            <strong>{lead.name}</strong>
            <p style={{ margin: "8px 0 0" }}>{lead.email}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
