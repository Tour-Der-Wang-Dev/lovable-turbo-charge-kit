
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, MicOff } from "lucide-react";

const VoiceInput = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");

  // Mock voice recording functionality
  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      // In a real implementation, we would stop the recording
    } else {
      setIsRecording(true);
      // In a real implementation, we would start recording
      // For demo purposes, let's simulate a transcript after a delay
      setTimeout(() => {
        setTranscript("This is a simulated voice transcript. In a real implementation, this would be your actual spoken words converted to text.");
        setIsRecording(false);
      }, 3000);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="relative">
            <Mic className="h-5 w-5 text-primary" />
            {isRecording && (
              <>
                <span className="absolute inset-0 rounded-full bg-primary/20 animate-pulse-ring"></span>
                <span className="absolute inset-0 rounded-full bg-primary/40 animate-pulse-ring" style={{ animationDelay: "0.4s" }}></span>
              </>
            )}
          </div>
          Voice Input
        </CardTitle>
        <CardDescription>
          Speak naturally and see your words convert to text in real-time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="min-h-24 p-4 bg-muted rounded-md">
            {transcript ? (
              <p>{transcript}</p>
            ) : (
              <p className="text-muted-foreground">
                {isRecording ? "Listening..." : "Click the microphone button to start speaking"}
              </p>
            )}
          </div>
          <div className="flex justify-center">
            <Button
              onClick={toggleRecording}
              variant={isRecording ? "destructive" : "default"}
              className="gap-2"
            >
              {isRecording ? (
                <>
                  <MicOff className="h-4 w-4" /> Stop Recording
                </>
              ) : (
                <>
                  <Mic className="h-4 w-4" /> Start Recording
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VoiceInput;
