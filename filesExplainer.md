
# Project Files Explanation

This document provides an overview of all files and directories in the project, with a brief description of each file's purpose and an indicator of its complexity/importance:

- 🟢 Simple file with few dependencies
- 💛 Moderately complex file with several imports
- 🔴 Complex file with many dependencies or critical functionality

## Root Directory

- `index.html` 🟢 - Entry HTML file containing the root element and metadata
- `README.md` 🟢 - Project documentation with setup instructions and overview
- `tailwind.config.ts` 💛 - Tailwind CSS configuration file with custom theme settings
- `vite.config.ts` 💛 - Vite configuration with plugins and aliases
- `package.json` 🟢 - Project dependencies and scripts configuration
- `tsconfig.json` 🟢 - TypeScript configuration file
- `filesExplainer.md` 🟢 - This file, explaining the project structure
- `scripts.md` 🟢 - Documentation of available npm scripts with usage examples

## src/

- `main.tsx` 💛 - Application entry point that renders the root App component
- `App.tsx` 🔴 - Main application component with routing and provider setup
- `vite-env.d.ts` 🟢 - Type declarations for Vite environment variables

### src/components/

#### src/components/features/
- `FeatureHighlight.tsx` 💛 - Component showcasing key application features with icons
- `ModelSelector.tsx` 💛 - Component for selecting AI models with performance indicators
- `PromptLibrary.tsx` 🔴 - Component for managing and using saved prompts
- `ProjectManagement.tsx` 🔴 - Component for managing projects and folders
- `SeoTools.tsx` 🔴 - Component with SEO analysis and meta tag generation tools
- `VoiceInput.tsx` 💛 - Component for voice recording and text transcription

#### src/components/layout/
- `Navbar.tsx` 🔴 - Top navigation bar with app controls and user options
- `Sidebar.tsx` 🔴 - Application sidebar with navigation links and controls
- `ThemeToggle.tsx` 💛 - Component for switching between light and dark themes

#### src/components/ui/
- Multiple shadcn/ui components 🟢 - Reusable UI components like buttons, cards, etc.
- `use-toast.ts` 💛 - Utility for displaying toast notifications

### src/hooks/
- `use-mobile.tsx` 💛 - Hook for detecting mobile devices and responsiveness
- `use-toast.ts` 🔴 - Hook for managing toast notifications

### src/integrations/
- `supabase/client.ts` 🔴 - Supabase client configuration and initialization
- `supabase/types.ts` 💛 - TypeScript type definitions for Supabase database

### src/lib/
- `utils.ts` 💛 - Utility functions used throughout the application

### src/pages/
- `Index.tsx` 🔴 - Main landing page with feature tabs and components
- `NotFound.tsx` 🟢 - 404 page shown when routes don't match

## supabase/
- `config.toml` 🟢 - Configuration file for Supabase project
