
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AIChatbox from "@/components/features/AIChatbox";
import VoiceToText from "@/components/features/VoiceToText";
import { useAuth } from "@/contexts/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Welcome, {user?.email}</h1>
        <p className="text-muted-foreground">
          Access powerful AI features and voice tools from your dashboard
        </p>
      </div>

      <Tabs defaultValue="ai" className="w-full">
        <TabsList className="grid grid-cols-2 mb-8">
          <TabsTrigger value="ai">AI Chat</TabsTrigger>
          <TabsTrigger value="voice">Voice to Text</TabsTrigger>
        </TabsList>

        <TabsContent value="ai" className="mt-0">
          <AIChatbox />
        </TabsContent>

        <TabsContent value="voice" className="mt-0">
          <VoiceToText />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
