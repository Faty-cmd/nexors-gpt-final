import { useState } from "react";

export default function Home() {
  const [antwort, setAntwort] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTask = async (prompt, source) => {
    setLoading(true);
    const res = await fetch("/api/completion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, source }),
    });
    const data = await res.json();
    setAntwort(data.result || data.error || "Keine Antwort.");
    setLoading(false);
  };

  return (
    <div style={{ fontFamily: "Arial", padding: "2rem" }}>
      <h1>NEXORS GPT-Routing System</h1>
      <p>Wähle ein Modell & stelle deine Frage:</p>

      <div style={{ marginBottom: "1rem" }}>
        <button onClick={() => handleTask("Was ist künstliche Intelligenz?", "gpt4")}>
          GPT-4
        </button>{" "}
        <button onClick={() => handleTask("Was ist künstliche Intelligenz?", "claude")}>
          Claude 3
        </button>{" "}
        <button onClick={() => handleTask("Was ist künstliche Intelligenz?", "mixtral")}>
          Mixtral
        </button>
      </div>

      {loading && <p>Lade Antwort...</p>}
      {antwort && (
        <div>
          <h3>Antwort:</h3>
          <pre>{antwort}</pre>
        </div>
      )}
    </div>
  );
}
