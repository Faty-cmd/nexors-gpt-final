export default async function handler(req, res) {
  const { prompt, source } = req.body;

  let model = "gpt-4";
  let apiUrl = "https://api.openai.com/v1/chat/completions";
  let apiKey = process.env.OPENAI_API_KEY;

  if (source === "claude") {
    model = "claude-3-haiku-20240307";
    apiUrl = "https://api.together.xyz/v1/chat/completions";
    apiKey = process.env.TOGETHER_API_KEY;
  } else if (source === "mixtral") {
    model = "mixtral-8x7b-32768";
    apiUrl = "https://api.groq.com/openai/v1/chat/completions";
    apiKey = process.env.GROQ_API_KEY;
  }

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