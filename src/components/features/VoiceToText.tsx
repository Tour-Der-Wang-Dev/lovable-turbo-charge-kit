
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, Square, Loader2 } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";

const VoiceToText = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [processing, setProcessing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];
      
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        processAudio();
      };
      
      mediaRecorder.start();
      setIsRecording(true);
      
      toast({
        title: "Recording started",
        description: "Speak clearly into your microphone",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Permission Error",
        description: "Microphone access denied. Please allow microphone access to use this feature.",
      });
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      // Stop all audio tracks
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  const processAudio = () => {
    setProcessing(true);
    
    // In a real app, you'd send this audio to a speech recognition service
    // For demo purposes, we'll use the Web Speech API
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';
      
      recognition.onstart = () => {
        console.log('Voice recognition started');
      };
      
      recognition.onresult = (event) => {
        const result = event.results[0][0].transcript;
        setTranscript(result);
        setProcessing(false);
      };
      
      recognition.onerror = (event) => {
        console.error('Recognition error:', event.error);
        setProcessing(false);
        toast({
          variant: "destructive",
          title: "Recognition Error",
          description: "Failed to recognize speech. Please try again.",
        });
      };
      
      recognition.onend = () => {
        console.log('Recognition ended');
      };
      
      // Simulating processing delay
      setTimeout(() => {
        try {
          recognition.start();
        } catch (error) {
          setProcessing(false);
          toast({
            variant: "destructive",
            title: "Error",
            description: "Speech recognition failed. Please try again.",
          });
        }
      }, 1000);
    } else {
      setProcessing(false);
      toast({
        variant: "destructive",
        title: "Not Supported",
        description: "Speech recognition is not supported in this browser.",
      });
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Voice to Text</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="border rounded-lg p-4 min-h-[200px] bg-muted/20">
          {transcript ? transcript : "Transcribed text will appear here..."}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        {processing ? (
          <Button disabled className="w-full">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing audio...
          </Button>
        ) : isRecording ? (
          <Button variant="destructive" onClick={stopRecording} className="w-full">
            <Square className="mr-2 h-4 w-4" />
            Stop Recording
          </Button>
        ) : (
          <Button onClick={startRecording} className="w-full">
            <Mic className="mr-2 h-4 w-4" />
            Start Recording
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default VoiceToText;

