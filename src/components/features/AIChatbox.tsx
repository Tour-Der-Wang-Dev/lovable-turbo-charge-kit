
import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Send } from "lucide-react";
import { groqClient, GroqModel } from "@/integrations/groq/client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

const AIChatbox = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: "system", content: "You are a helpful assistant." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState<GroqModel>("llama3-70b-8192");

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user" as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const newMessages = [...messages, userMessage];
      const completion = await groqClient.createCompletion({
        model,
        messages: newMessages,
      });

      if (completion.choices && completion.choices.length > 0) {
        setMessages([...newMessages, completion.choices[0].message]);
      }
    } catch (error) {
      console.error("Error getting AI response:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>AI Chat</CardTitle>
          <Select value={model} onValueChange={(value) => setModel(value as GroqModel)}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select Model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="llama3-8b-8192">LLaMA 3 8B</SelectItem>
              <SelectItem value="llama3-70b-8192">LLaMA 3 70B</SelectItem>
              <SelectItem value="mixtral-8x7b-32768">Mixtral 8x7B</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="h-[400px] overflow-y-auto p-4 border rounded-lg bg-muted/20">
          {messages.filter(m => m.role !== "system").map((message, index) => (
            <div 
              key={index} 
              className={`mb-4 ${message.role === "user" ? "text-right" : "text-left"}`}
            >
              <div 
                className={`inline-block p-3 rounded-lg ${message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
              >
                {message.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-center mt-4">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-center space-x-2">
          <Textarea 
            placeholder="Type your message..." 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            className="flex-1"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <Button onClick={handleSend} disabled={loading || !input.trim()}>
            <Send className="h-4 w-4 mr-2" /> Send
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AIChatbox;
