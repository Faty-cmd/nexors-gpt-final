export async function trackEvent(type, data = {}) {
  try {
    await fetch("/api/core", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, data }),
    });
  } catch (e) {
    console.warn("CORE Fehler:", e);
  }
}
