
import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, Square, Loader2, RefreshCw } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Predefined list of common languages with their codes
const languageOptions = [
  { code: 'en-US', name: 'English (US)' },
  { code: 'en-GB', name: 'English (UK)' },
  { code: 'es-ES', name: 'Spanish' },
  { code: 'fr-FR', name: 'French' },
  { code: 'de-DE', name: 'German' },
  { code: 'it-IT', name: 'Italian' },
  { code: 'pt-BR', name: 'Portuguese' },
  { code: 'ja-JP', name: 'Japanese' },
  { code: 'ko-KR', name: 'Korean' },
  { code: 'zh-CN', name: 'Chinese (Simplified)' },
  { code: 'zh-TW', name: 'Chinese (Traditional)' },
  { code: 'ar-SA', name: 'Arabic' },
  { code: 'ru-RU', name: 'Russian' },
  { code: 'hi-IN', name: 'Hindi' }
];

const EnhancedVoiceToText = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [processing, setProcessing] = useState(false);
  const [confidence, setConfidence] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState('en-US');
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Initialize the Speech Recognition API
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = selectedLanguage;
      
      recognitionRef.current.onresult = (event: any) => {
        const result = event.results[0][0];
        setTranscript(result.transcript);
        setConfidence(Math.round(result.confidence * 100));
        setProcessing(false);
      };
      
      recognitionRef.current.onerror = (event: any) => {
        console.error('Recognition error:', event.error);
        setProcessing(false);
        toast({
          variant: "destructive",
          title: "Recognition Error",
          description: `Failed to recognize speech: ${event.error}. Please try again.`,
        });
      };
    }
    
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (error) {
          console.log('Error stopping recognition on unmount:', error);
        }
      }
    };
  }, [selectedLanguage]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm',
      });
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
      
      // Reset transcript when starting a new recording
      setTranscript('');
      setConfidence(0);
      
      mediaRecorder.start();
      setIsRecording(true);
      
      toast({
        title: "Recording started",
        description: "Speak clearly into your microphone",
      });
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast({
        variant: "destructive",
        title: "Permission Error",
        description: "Microphone access denied. Please allow microphone access to use this feature.",
      });
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
    
    if (recognitionRef.current) {
      // Update language before starting recognition
      recognitionRef.current.lang = selectedLanguage;
      
      // Small delay to ensure everything is set up correctly
      setTimeout(() => {
        try {
          recognitionRef.current.start();
        } catch (error) {
          console.error('Recognition start error:', error);
          setProcessing(false);
          toast({
            variant: "destructive",
            title: "Error",
            description: "Speech recognition failed to start. Please try again.",
          });
        }
      }, 500);
    } else {
      setProcessing(false);
      toast({
        variant: "destructive",
        title: "Not Supported",
        description: "Speech recognition is not supported in this browser.",
      });
    }
  };

  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value);
    if (recognitionRef.current) {
      recognitionRef.current.lang = value;
    }
  };

  const retryRecognition = () => {
    if (chunksRef.current.length > 0) {
      processAudio();
    } else {
      toast({
        variant: "destructive",
        title: "No Audio",
        description: "No recorded audio found to retry recognition.",
      });
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Enhanced Voice to Text</CardTitle>
        <div className="flex items-center gap-2">
          <span className="text-sm">Language:</span>
          <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent>
              {languageOptions.map((language) => (
                <SelectItem key={language.code} value={language.code}>
                  {language.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="border rounded-lg p-4 min-h-[200px] bg-muted/20">
          {transcript ? (
            <div>
              <p>{transcript}</p>
              {confidence > 0 && (
                <div className="mt-2 text-sm text-muted-foreground">
                  Confidence: {confidence}%
                </div>
              )}
            </div>
          ) : (
            "Transcribed text will appear here..."
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between gap-2">
        {processing ? (
          <Button disabled className="flex-1">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing audio...
          </Button>
        ) : isRecording ? (
          <Button variant="destructive" onClick={stopRecording} className="flex-1">
            <Square className="mr-2 h-4 w-4" />
            Stop Recording
          </Button>
        ) : (
          <>
            <Button onClick={startRecording} className="flex-1">
              <Mic className="mr-2 h-4 w-4" />
              Start Recording
            </Button>
            {transcript && (
              <Button variant="outline" onClick={retryRecognition}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Retry
              </Button>
            )}
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default EnhancedVoiceToText;
