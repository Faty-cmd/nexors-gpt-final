import { useState } from "react";

export default function Home() {
  const [antwort, setAntwort] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRequest = async (model) => {
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
    <div style={{ fontFamily: 'Arial', padding: '2rem', maxWidth: '720px', margin: 'auto' }}>
      <h1 style={{ fontSize: '2rem', color: '#2A4D9B' }}>Willkommen bei NEXORS</h1>
      <p>Teste die modernsten KI-Modelle der Welt:</p>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <button onClick={() => handleRequest("gpt")}>GPT-4</button>
        <button onClick={() => handleRequest("claude")}>Claude 3</button>
        <button onClick={() => handleRequest("mixtral")}>Mixtral</button>
      </div>
      {loading && <p>Lade...</p>}
      {antwort && (
        <div style={{ background: '#f4f4f4', padding: '1rem', borderRadius: '8px' }}>
          <strong>Antwort:</strong>
          <pre>{antwort}</pre>
        </div>
      )}
    </div>
  );
}