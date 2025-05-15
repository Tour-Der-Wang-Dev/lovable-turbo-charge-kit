
import React from "react";
import { Mic, FolderPlus, MessageSquare, Search, Activity } from "lucide-react";

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Feature = ({ icon, title, description }: FeatureProps) => {
  return (
    <div className="feature-card">
      <div className="feature-icon mb-4">{icon}</div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

const FeatureHighlight = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Feature
        icon={<Mic className="h-5 w-5" />}
        title="Voice Input"
        description="Speak naturally and see your words convert to text in real-time with advanced voice recognition."
      />
      <Feature
        icon={<Activity className="h-5 w-5" />}
        title="Groq Integration"
        description="Access high-performance AI models like LLaMA 3.3 70B for faster processing and better results."
      />
      <Feature
        icon={<MessageSquare className="h-5 w-5" />}
        title="Prompt Library"
        description="Store and organize your favorite prompts for quick access and improved workflow."
      />
      <Feature
        icon={<FolderPlus className="h-5 w-5" />}
        title="Project Management"
        description="Create custom folders to organize your projects with drag-and-drop functionality."
      />
    </div>
  );
};

export default FeatureHighlight;
