export async function speakWithVoice(text) {
  const response = await fetch("https://api.elevenlabs.io/v1/text-to-speech/TxGEqnHWrfWFTfGW9XjX", {
    method: "POST",
    headers: {
      "xi-api-key": process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      text,
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.5
      }
    })
  });

  const audioBlob = await response.blob();
  const audioUrl = URL.createObjectURL(audioBlob);
  const audio = new Audio(audioUrl);
  audio.play();
}
