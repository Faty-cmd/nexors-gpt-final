export default async function handler(req, res) {
  const prompt = req.body.prompt;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await response.json();
    const result = data?.choices?.[0]?.message?.content || "Keine Antwort von GPT.";
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ error: "Fehler bei der Verarbeitung." });
  }
}