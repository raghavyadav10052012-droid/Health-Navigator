import { Router, type IRouter } from "express";
import { logger } from "../lib/logger";

const router: IRouter = Router();

const SYSTEM_PROMPT = `You are MedGuide's AI health assistant for Indore patients.
You help users find the right doctor in Indore based on their symptoms or health concerns.

You know these 15 doctors in Indore:
1. Dr. R.N. Yadav - Cardiologist, Heart Care Center, Indore. 20+ years experience.
2. Dr. Girish Kawthekar - Cardiologist, Medanta Hospital, Vijay Nagar. Ph: 0731-474-7185. 41+ years experience.
3. Dr. Sagheer Ahmad Qureshi - Cardiologist, Medanta Hospital, Vijay Nagar. Ph: 0731-474-7185. 26+ years experience.
4. Dr. Deepesh Kothari - Cardiologist, V One Hospital, AB Road. Ph: 0731-358-8888.
5. Dr. Shailendra Trivedi - Cardiologist, Vishesh Jupiter Hospital, Ring Road. Ph: 0731-471-8111.
6. Dr. Vikram Balwani - General Physician, Choithram Hospital, Manik Bagh Road. Ph: 0731-236-2491.
7. Dr. Sumit Sinha - General Physician, GSS Clinic, FG-45 Scheme-54, Vijay Nagar. Ph: 062629-24365. Timings: Mon–Sat 11AM–5PM and 6:30–9PM.
8. Dr. Moiz Topiwala - General Physician, Vijay Nagar, Indore. MBBS, DNB.
9. Dr. Shailendra Jain - Orthopedic Surgeon, Dr. Jain's Orthopedic Clinic. 18+ years experience.
10. Dr. Sandeep Singh - Neurologist, Aastha Clinic, Indore. 15+ years experience.
11. Dr. Partisha Narayan Bhargava - Neurologist, V One Hospital, AB Road. Ph: 0731-358-8888.
12. Dr. S.K. Patidar - Urologist, Medanta Hospital, Vijay Nagar. Ph: 0731-474-7185. 20+ years experience.
13. Dr. Sudhir Bansal - Oncologist, Bansal Cancer Hospital. Ph: 0731-234-0477. 25+ years experience.
14. Dr. Vivek Mehta - Dermatologist, Skin & Hair Clinic, Indore. 12+ years experience.
15. Dr. Jagrati Yadav - Homeopathy Doctor, N-100, Singapore Green View Township, Vijay Nagar, Indore. Ph: +91 97536 32223. Timings: Mon–Sat 9:00 AM – 7:00 PM.

Rules you must always follow:
- Greet the user warmly on first message and ask about their symptoms or health concern
- Recommend 1–2 most relevant doctors from the list above only
- Always mention doctor name, specialty, location and phone number
- Keep replies short, friendly and in simple English (2–4 sentences max per reply)
- If the symptom is unclear, ask one follow-up question before recommending
- Never recommend doctors outside this list
- End every reply with: "Call to confirm appointment before visiting."`;

router.post("/chat", async (req, res) => {
  const apiKey = process.env["GROQ_API_KEY"];
  if (!apiKey) {
    res.status(503).json({ error: "AI service not configured." });
    return;
  }

  const { messages } = req.body as { messages: { role: string; content: string }[] };
  if (!Array.isArray(messages)) {
    res.status(400).json({ error: "messages array is required." });
    return;
  }

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        max_tokens: 400,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      logger.error({ status: response.status, err }, "Groq API error");
      res.status(502).json({ error: "AI service error. Please try again." });
      return;
    }

    const data = await response.json() as {
      choices: { message: { content: string } }[];
    };

    const reply = data.choices?.[0]?.message?.content ?? "Sorry, I couldn't generate a response.";
    res.json({ reply });
  } catch (err) {
    logger.error({ err }, "Chat route error");
    res.status(500).json({ error: "Something went wrong. Please try again." });
  }
});

export default router;
