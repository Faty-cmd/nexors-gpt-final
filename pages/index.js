import { useState } from "react";

export default function Home() {
  const [antwort, setAntwort] = useState("");
  const [loading, setLoading] = useState(false);
  const [auswahl, setAuswahl] = useState("");

  const handleRequest = async (model) => {
    setAntwort("");
    setAuswahl(model);
    setLoading(true);
    const res = await fetch("/api/completion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: "Was ist künstliche Intelligenz?", source: model }),
    });
    const data = await res.json();
    setAntwort(data.result || data.error || "Keine Antwort.");
    setLoading(false);
  };

  return (
    <div style={{
      fontFamily: "Arial",
      padding: "2rem",
      maxWidth: "720px",
      margin: "auto",
      textAlign: "center"
    }}>
      <h1 style={{ fontSize: "2.4rem", color: "#2A4D9B" }}>
        Willkommen bei <span style={{ color: "#E63946" }}>NEXORS</span>
      </h1>

      <p style={{ margin: "1rem 0" }}>
        Wähle dein Modell und teste die Power deiner KI:
      </p>

      <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginBottom: "1rem", flexWrap: "wrap" }}>
        <button onClick={() => handleRequest("gpt")} style={{ padding: "0.5rem 1rem" }}>
          GPT-4
        </button>
        <button onClick={() => handleRequest("claude")} style={{ padding: "0.5rem 1rem" }}>
          Claude 3
        </button>
        <button onClick={() => handleRequest("mixtral")} style={{ padding: "0.5rem 1rem" }}>
          Mixtral
        </button>
      </div>

      {loading && <p>⏳ Lade Antwort...</p>}

      {antwort && (
        <div style={{ marginTop: "1rem", background: "#f9f9f9", padding: "1rem", borderRadius: "8px", textAlign: "left" }}>
          <strong>Antwort:</strong>
          <pre style={{ whiteSpace: "pre-wrap" }}>{antwort}</pre>
        </div>
      )}
    </div>
  );
}
