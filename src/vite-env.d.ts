
/// <reference types="vite/client" />

// Add TypeScript definitions for Web Speech API
interface Window {
  SpeechRecognition: any;
  webkitSpeechRecognition: any;
}
