import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("Saving...");

    const response = await fetch("/api/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email })
    });

    const data = await response.json();

    if (!response.ok) {
      setStatus(data.error || "Something went wrong");
      return;
    }

    setName("");
    setEmail("");
    setStatus("Lead saved successfully");
  }

  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: 40, fontFamily: "sans-serif" }}>
      <h1>NeuralFlow SaaS</h1>
      <p>GitHub par code rakho. Database ke liye Supabase use karo.</p>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12, marginTop: 24 }}>
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Name"
          required
          style={{ padding: 12 }}
        />
        <input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email"
          type="email"
          required
          style={{ padding: 12 }}
        />
        <button type="submit" style={{ padding: 12, cursor: "pointer" }}>
          Save Lead
        </button>
      </form>

      {status ? <p style={{ marginTop: 16 }}>{status}</p> : null}

      <p style={{ marginTop: 24 }}>
        <a href="/dashboard">Open Dashboard</a>
      </p>
    </main>
  );
}
