import { useState } from "react";
import { trackEvent } from "../lib/core/trackEvent";

export default function Home() {
  const [antwort, setAntwort] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRequest = async (model) => {
    setLoading(true);
    trackEvent("model_clicked", { model });

    const res = await fetch("/api/completion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: "Was ist künstliche Intelligenz?",
        source: model,
      }),
    });

    const data = await res.json();
    setAntwort(data.result || data.error || "Keine Antwort.");
    setLoading(false);
  };

  return (
    <div style={{
      fontFamily: "Arial",
      padding: "2rem",
      maxWidth: "700px",
      margin: "auto",
      background: "#f9f9f9",
      borderRadius: "10px",
      boxShadow: "0 0 20px rgba(0,0,0,0.1)"
    }}>
      <h1 style={{ fontSize: "2.2rem", color: "#2A4D9B", marginBottom: "1rem" }}>
        Willkommen bei <span style={{ color: "#FF8C00" }}>NEXORS</span>
      </h1>
      <p style={{ marginBottom: "1rem" }}>Wähle dein Modell und teste die Power deiner KI:</p>

      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <button onClick={() => handleRequest("gpt")} style={buttonStyle}>GPT-4</button>
        <button onClick={() => handleRequest("claude")} style={buttonStyle}>Claude 3</button>
        <button onClick={() => handleRequest("mixtral")} style={buttonStyle}>Mixtral</button>
      </div>

      {loading && <p>⏳ Lade Antwort...</p>}
      {antwort && (
        <div style={{
          background: "#fff",
          padding: "1rem",
          borderRadius: "8px",
          border: "1px solid #ccc",
          marginTop: "1rem"
        }}>
          <strong>Antwort:</strong>
          <pre>{antwort}</pre>
        </div>
      )}
    </div>
  );
}

const buttonStyle = {
  padding: "0.5rem 1rem",
  backgroundColor: "#2A4D9B",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
};
