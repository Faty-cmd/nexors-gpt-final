export function speakWithVoice(text) {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "de-DE"; // Alternativ: "en-US", "tr-TR"
    utterance.rate = 1;
    utterance.pitch = 1;
    speechSynthesis.speak(utterance);
  } else {
    console.warn("Sprache nicht unterstützt oder Umgebung blockiert Sprache.");
  }
}
