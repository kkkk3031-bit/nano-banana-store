
import { GoogleGenAI, Type } from "@google/genai";
import { StoreItem } from "../types";

export const getPersonalizedRecommendation = async (playstyle: string, items: StoreItem[]): Promise<{ itemId: string; reason: string }> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const itemSummary = items.map(i => `${i.id}: ${i.name} - ${i.description}`).join('\n');

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are the 'Banana Intelligence' system for Nano Banana Minecraft Store.
      Based on the player's playstyle description: "${playstyle}", recommend ONE item from this list:
      ${itemSummary}
      
      Return your response in JSON format.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            itemId: { type: Type.STRING, description: "The ID of the recommended item" },
            reason: { type: Type.STRING, description: "A catchy 1-sentence reason why this fits them" }
          },
          required: ["itemId", "reason"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("AI Recommendation Error:", error);
    return { itemId: items[0].id, reason: "We think you'll love our most popular rank!" };
  }
};
