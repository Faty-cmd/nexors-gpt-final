export default async function handler(req, res) {
  const { type, data } = req.body;

  const response = await fetch(`${process.env.SUPABASE_URL}/rest/v1/events`, {
    method: "POST",
    headers: {
      apikey: process.env.SUPABASE_KEY,
      Authorization: `Bearer ${process.env.SUPABASE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify([
      {
        type,
        data,
        created_at: new Date().toISOString(),
      },
    ]),
  });

  if (response.ok) {
    res.status(200).json({ status: "ok" });
  } else {
    res.status(500).json({ error: "CORE Save Failed" });
  }
}
