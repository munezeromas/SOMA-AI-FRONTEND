import { createServerFn } from "@tanstack/react-start";

export const cohereSimplify = createServerFn({ method: "POST" })
  .handler(async ({ data }: any) => {
    const apiKey = process.env.VITE_COHERE_API_KEY || process.env.COHERE_API_KEY;
    const apiUrl = process.env.COHERE_API_URL || "https://api.cohere.com/v1/chat";
    if (!apiKey) {
      console.error("Cohere API Key missing in process.env");
      throw new Error("Missing Cohere API Key");
    }

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `Explain this text simply for a slow learner in Grade ${data.grade} (${data.subject}): "${data.text}"`,
        model: "command",
        preamble: "You are Soma AI, a patient and kind tutor for primary school students in Rwanda. Your goal is to explain things in the simplest possible way, using small words and clear examples. You prioritize the needs of slow learners, being very encouraging and gentle."
      })
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Cohere Server Error:", err);
      throw new Error("Failed to reach Cohere");
    }

    const json = await response.json();
    console.log("Cohere Server Reply:", json.text?.substring(0, 50) + "...");
    return json.text;
  });
