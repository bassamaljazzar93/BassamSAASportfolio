import { GoogleGenAI } from "@google/genai";

const SYSTEM_PROMPT = `
You are the AI Assistant for Bassam Walid Aljazzar, a world-class Mechatronics Engineer based in Abu Dhabi, UAE.
Your goal is to answer questions about Bassam's career, projects, and expertise in a professional, technical, yet friendly tone.

Key Facts:
- 8+ years of experience.
- US Patent 11573635 (Face mask with EMG sensors).
- Creator of "Bu Saif" humanoid robot (presented at GITEX 2019).
- Currently working at Tatweer MEA, leading innovation at MOI Innovation Lab.
- Expert in SolidWorks, Python, Embedded Systems, and Robotics.

If asked about something unrelated to Bassam, politely steer the conversation back to his engineering profile.
Always highlight his achievements in innovation and automation.
`;

export const chatWithAssistant = async (message: string) => {
  try {
    /**
     * Always create a new GoogleGenAI instance right before making an API call 
     * to ensure it uses the most up-to-date API key environment configuration.
     */
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: message,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.7,
      },
    });
    
    // Accessing the .text property directly as defined in the Google GenAI SDK.
    return response.text || "I'm sorry, I couldn't process that. How can I help you with Bassam's portfolio?";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error connecting to AI. Please check Bassam's experience sections for details.";
  }
};
