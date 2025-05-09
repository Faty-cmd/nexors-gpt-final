import { useState } from "react";

export default function TaskDemo() {
  const [antwort, setAntwort] = useState("");

  const handleTask = async (prompt) => {
    const res = await fetch("/api/completion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();
    setAntwort(data.result || data.error || "Keine Antwort.");
  };

  return (
    <div>
      <h2>Starte deine GPT-Demo:</h2>
      <button onClick={() => handleTask("Erstelle einen kreativen KI-Slogan.")}>Slogan</button>
      <button onClick={() => handleTask("Erstelle eine Beispielrechnung als PDF.")}>Rechnung</button>
      <button onClick={() => handleTask("Erkläre den Dreisatz für Schüler in einfacher Sprache.")}>Erklärung</button>
      <div style={{ marginTop: "1rem" }}>
        <strong>Antwort:</strong>
        <pre>{antwort}</pre>
      </div>
    </div>
  );
}