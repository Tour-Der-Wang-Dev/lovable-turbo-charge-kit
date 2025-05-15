
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import FeatureHighlight from "@/components/features/FeatureHighlight";
import VoiceInput from "@/components/features/VoiceInput";
import ModelSelector from "@/components/features/ModelSelector";
import PromptLibrary from "@/components/features/PromptLibrary";
import ProjectManagement from "@/components/features/ProjectManagement";
import SeoTools from "@/components/features/SeoTools";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={sidebarOpen} />
      
      <div className="flex flex-col flex-1 overflow-hidden ml-0 md:ml-64">
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Welcome to Lovable Studio</h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Enhance your workflow with powerful features designed to streamline your productivity and boost creativity.
              </p>
            </div>
            
            <FeatureHighlight />
            
            <Tabs defaultValue="voice" className="w-full">
              <TabsList className="grid grid-cols-5 mb-6">
                <TabsTrigger value="voice">Voice Input</TabsTrigger>
                <TabsTrigger value="ai">AI Models</TabsTrigger>
                <TabsTrigger value="prompts">Prompt Library</TabsTrigger>
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="seo">SEO Tools</TabsTrigger>
              </TabsList>
              <TabsContent value="voice" className="mt-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <VoiceInput />
                  <ModelSelector />
                </div>
              </TabsContent>
              <TabsContent value="ai" className="mt-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <ModelSelector />
                </div>
              </TabsContent>
              <TabsContent value="prompts" className="mt-0">
                <div className="grid grid-cols-1 gap-6">
                  <PromptLibrary />
                </div>
              </TabsContent>
              <TabsContent value="projects" className="mt-0">
                <div className="grid grid-cols-1 gap-6">
                  <ProjectManagement />
                </div>
              </TabsContent>
              <TabsContent value="seo" className="mt-0">
                <div className="grid grid-cols-1 gap-6">
                  <SeoTools />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
