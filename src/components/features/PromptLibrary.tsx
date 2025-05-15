
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface Prompt {
  id: number;
  title: string;
  content: string;
  category: string;
}

const initialPrompts: Prompt[] = [
  {
    id: 1,
    title: "Creative Blog Introduction",
    content: "Write an engaging introduction for a blog post about [topic] that captures the reader's attention and clearly states the main points that will be covered.",
    category: "Content Writing",
  },
  {
    id: 2,
    title: "SEO Optimization",
    content: "Analyze the following content and suggest improvements to make it more SEO-friendly while maintaining readability and user engagement.",
    category: "SEO",
  },
  {
    id: 3,
    title: "Product Description Template",
    content: "Create a compelling product description for [product] highlighting its key features, benefits, and why customers should purchase it.",
    category: "E-commerce",
  },
];

const PromptLibrary = () => {
  const [prompts, setPrompts] = useState<Prompt[]>(initialPrompts);
  const [searchTerm, setSearchTerm] = useState("");
  const [newPrompt, setNewPrompt] = useState({
    title: "",
    content: "",
    category: "",
  });

  const handleAddPrompt = () => {
    const prompt: Prompt = {
      id: Date.now(),
      title: newPrompt.title,
      content: newPrompt.content,
      category: newPrompt.category,
    };
    
    setPrompts([...prompts, prompt]);
    setNewPrompt({ title: "", content: "", category: "" });
  };

  const filteredPrompts = prompts.filter(
    (prompt) =>
      prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prompt.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prompt.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Prompt Library</CardTitle>
        <CardDescription>
          Store and organize your favorite prompts for quick access
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search prompts..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Prompt
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Prompt</DialogTitle>
                <DialogDescription>
                  Create a new prompt template for your library.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="E.g., SEO Article Outline"
                    value={newPrompt.title}
                    onChange={(e) =>
                      setNewPrompt({ ...newPrompt, title: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    placeholder="E.g., Content Writing"
                    value={newPrompt.category}
                    onChange={(e) =>
                      setNewPrompt({ ...newPrompt, category: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="prompt">Prompt Template</Label>
                  <Textarea
                    id="prompt"
                    rows={5}
                    placeholder="Enter your prompt template here..."
                    value={newPrompt.content}
                    onChange={(e) =>
                      setNewPrompt({ ...newPrompt, content: e.target.value })
                    }
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleAddPrompt}>
                  Save Prompt
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
          {filteredPrompts.map((prompt) => (
            <div
              key={prompt.id}
              className="p-3 border rounded-md hover:bg-accent/10 cursor-pointer"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{prompt.title}</h4>
                  <p className="text-xs text-muted-foreground">{prompt.category}</p>
                </div>
              </div>
              <p className="text-sm mt-2 line-clamp-2">{prompt.content}</p>
            </div>
          ))}
          {filteredPrompts.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              No prompts found. Try a different search term or add a new prompt.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PromptLibrary;
