module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  const { userMessage } = req.body;

  if (!userMessage) {
    res.status(400).json({ error: 'Missing userMessage' });
    return;
  }

  try {
    const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `${userMessage}\n\nAnalyze this statement and return only 1 question that will help me process the feelings.`
              }
            ]
          }
        ]
      })
    });

    const data = await geminiRes.json();

    if (!geminiRes.ok) {
      throw new Error(data.error?.message || "Gemini API error");
    }

    res.status(200).json({
      reply: data?.candidates[0]?.content?.parts[0]?.text || "No response received"
    });
  } catch (error) {
    console.error("API error:", error);
    res.status(500).json({ error: error.message });
  }
};
