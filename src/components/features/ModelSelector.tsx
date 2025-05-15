
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ModelSelector = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Model Selection</CardTitle>
        <CardDescription>
          Choose from Groq's high-performance AI models
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <Select defaultValue="llama3-70b">
            <SelectTrigger>
              <SelectValue placeholder="Select a model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="deepseek-70b">DeepSeek Llama 70B</SelectItem>
              <SelectItem value="mixtral-8x7b">Mixtral 8x7B</SelectItem>
              <SelectItem value="gemma2-9b">Gemma2 9B</SelectItem>
              <SelectItem value="llama3-70b">LLaMA 3.3 70B</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-sm">
              <span>Speed</span>
              <span className="text-primary">Very Fast</span>
            </div>
            <div className="h-2 bg-muted rounded overflow-hidden">
              <div className="bg-primary h-full w-[90%]"></div>
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-sm">
              <span>Quality</span>
              <span className="text-primary">Excellent</span>
            </div>
            <div className="h-2 bg-muted rounded overflow-hidden">
              <div className="bg-primary h-full w-[85%]"></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ModelSelector;
