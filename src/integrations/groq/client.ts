
import { toast } from "@/components/ui/use-toast";

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY || "";
const API_URL = "https://api.groq.com/openai/v1/chat/completions";

export type GroqModel = "llama3-8b-8192" | "llama3-70b-8192" | "mixtral-8x7b-32768";

interface GroqMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface GroqRequestOptions {
  model: GroqModel;
  messages: GroqMessage[];
  temperature?: number;
  max_tokens?: number;
  stream?: boolean;
}

export interface GroqCompletionChoice {
  index: number;
  message: GroqMessage;
  finish_reason: string;
}

export interface GroqCompletion {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: GroqCompletionChoice[];
}

export const groqClient = {
  createCompletion: async ({
    model = "llama3-70b-8192",
    messages,
    temperature = 0.7,
    max_tokens = 2048,
    stream = false,
  }: GroqRequestOptions): Promise<GroqCompletion> => {
    if (!GROQ_API_KEY) {
      const errorMessage = "Groq API key not found. Please add VITE_GROQ_API_KEY to your environment variables.";
      toast({
        variant: "destructive",
        title: "API Key Missing",
        description: errorMessage
      });
      throw new Error(errorMessage);
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model,
          messages,
          temperature,
          max_tokens,
          stream
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || "Failed to get response from Groq API");
      }

      return await response.json();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "API Error",
        description: error.message || "An error occurred while contacting Groq API"
      });
      throw error;
    }
  }
};
