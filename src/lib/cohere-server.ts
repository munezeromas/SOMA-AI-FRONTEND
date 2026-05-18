import { createServerFn } from "@tanstack/react-start";

const SOMA_AI_SYSTEM = `You are Soma AI, a friendly AI tutor for primary school students in Rwanda (P1-P6). Your job is to explain words and sentences from books in simple language, create quizzes, and give encouraging feedback. Always be warm, simple, and concise.`;

export const cohereSimplify: any = createServerFn({ method: "POST" })
  .handler(async ({ data }: any) => {
    const apiKey = process.env.VITE_COHERE_API_KEY || process.env.COHERE_API_KEY;

    if (!apiKey) {
      throw new Error("Missing Cohere API Key");
    }

    // Build the user message
    let userMessage = "";
    if (data.promptType === "quiz-start") {
      userMessage = `Create question 1 of a 3-question quiz about "${data.text}" for a Grade ${data.grade} student. Only ask the question, nothing else.`;
    } else if (data.promptType === "quiz-answer") {
      userMessage = data.text;
    } else if (data.promptType === "language-practice") {
      userMessage = `Generate a single short, fun, and completely new sentence (max 10 words) for a Grade ${data.grade} student to practice ${data.skill} in English. The student is dyslexic, so use simple, highly decodable words and clear structure. Be very creative and avoid repeating previous sentences. Only output the sentence itself without quotes or extra text.`;
    } else {
      userMessage = `A Grade ${data.grade} student highlighted this from their ${data.subject} book: "${data.text}". Explain what it means simply.`;
    }

    // Use Cohere v2 chat API (more reliable)
    const response = await fetch("https://api.cohere.com/v2/chat", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "X-Client-Name": "soma-ai",
      },
      body: JSON.stringify({
        model: "command-r-plus-08-2024",
        messages: [
          { role: "system", content: SOMA_AI_SYSTEM },
          { role: "user", content: userMessage },
        ],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error(`Cohere v2 error (${response.status}):`, errText);

      // Fallback to v1 API with simpler model
      const v1Response = await fetch("https://api.cohere.com/v1/chat", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          model: "command",
          preamble: SOMA_AI_SYSTEM,
        }),
      });

      if (!v1Response.ok) {
        const v1Err = await v1Response.text();
        console.error(`Cohere v1 error (${v1Response.status}):`, v1Err);
        throw new Error(`Cohere error: ${v1Response.status}`);
      }

      const v1Json = await v1Response.json();
      return v1Json.text as string;
    }

    const json = await response.json();
    // v2 API returns content in a different structure
    const content = json?.message?.content;
    if (Array.isArray(content)) {
      return content.map((c: any) => c.text ?? "").join("") as string;
    }
    return (json.text ?? json.message ?? "") as string;
  });
