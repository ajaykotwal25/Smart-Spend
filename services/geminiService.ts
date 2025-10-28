
import { GoogleGenAI } from "@google/genai";
import { SmartSpendData } from "../types";

export const generateInsights = async (data: SmartSpendData): Promise<string> => {
  const { user, currentMonthExpense, expenseByCategory } = data;

  if (currentMonthExpense === 0) {
    return "No spending data for this month to analyze.";
  }

  const prompt = `
    You are a friendly financial advisor for an app called SmartSpend.
    A user named ${user.name} is asking for insights on their spending for the current month.
    Their currency is Indian Rupees (₹).
    
    Here is their financial summary:
    - Monthly Budget: ₹${user.monthlyBudget.toLocaleString('en-IN')}
    - Total Expenses this month: ₹${currentMonthExpense.toLocaleString('en-IN')}
    - Expense breakdown by category: ${JSON.stringify(expenseByCategory)}

    Based on this data, provide 2-3 short, actionable, and encouraging saving tips.
    The tips should be personalized to their spending habits. For example, if their 'Food' spending is high, suggest meal prepping.
    Do not repeat the summary data in your response. Focus only on the tips.
    Format your response as a single block of text, using markdown for bullet points if needed (e.g., * Tip 1...).
  `;

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating insights from Gemini API:", error);
    return "Sorry, I couldn't generate insights at this moment. Please try again later.";
  }
};
