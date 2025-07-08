export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  const { context, goal, tone } = req.body;

  if (!context || !goal || !tone) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },

      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are an expert outreach email assistant. Write professional, clear, and effective emails.`,
          },
          {
            role: "user",
            content: `Context: ${context}\nGoal: ${goal}\nTone: ${tone}\n\nWrite the email.`,
          },
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    const data = await response.json();
    console.log("OpenAI response:", JSON.stringify(data, null, 2));
    const email = data.choices?.[0]?.message?.content;

    res.status(200).json({ email });
  } catch (error) {
    console.error("OpenAI API error:", error);
    res.status(500).json({ error: "Failed to generate email" });
  }
}
