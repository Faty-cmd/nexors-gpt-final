export default async function handler(req, res) {
  const { prompt, source } = req.body;

  const model = source === "claude"
    ? "openrouter/anthropic/claude-3-haiku"
    : source === "mixtral"
    ? "openrouter/mistralai/mixtral-8x7b"
    : "gpt-4";

  const apiUrl = model.startsWith("openrouter")
    ? "https://openrouter.ai/api/v1/chat/completions"
    : "https://api.openai.com/v1/chat/completions";

  const apiKey = model.startsWith("openrouter")
    ? process.env.OPENROUTER_API_KEY
    : process.env.OPENAI_API_KEY;

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model,
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await response.json();
    const result = data?.choices?.[0]?.message?.content || "Keine Antwort.";
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ error: "API Fehler bei " + model });
  }
}
