
# System Architecture

This document provides a high-level overview of the application's architecture, highlighting the main components and their interactions.

## System Overview Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        Client Browser                           │
└───────────────────────────────┬─────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                    React Frontend Application                   │
│                                                                 │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────────────┐  │
│  │             │    │             │    │                     │  │
│  │    Pages    │◄──►│  Components │◄──►│     React Hooks     │  │
│  │             │    │             │    │                     │  │
│  └─────┬───────┘    └──────┬──────┘    └─────────┬───────────┘  │
│        │                   │                     │              │
│        │                   │                     │              │
│  ┌─────▼───────────────────▼─────────────────────▼───────────┐  │
│  │                                                           │  │
│  │                    State Management                       │  │
│  │               (React Context, TanStack Query)             │  │
│  │                                                           │  │
│  └─────────────────────────────┬─────────────────────────────┘  │
│                                │                                │
└────────────────────────────────┼────────────────────────────────┘
                                 │
                                 ▼
┌────────────────────────────────┴────────────────────────────────┐
│                      Supabase Integration                       │
│                                                                 │
│   ┌─────────────┐    ┌─────────────┐    ┌─────────────────┐     │
│   │             │    │             │    │                 │     │
│   │ Auth & User │    │  Database   │    │     Storage     │     │
│   │ Management  │    │   Tables    │    │                 │     │
│   │             │    │             │    │                 │     │
│   └─────────────┘    └─────────────┘    └─────────────────┘     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌────────────────────────────────┴────────────────────────────────┐
│                      External Services                          │
│                                                                 │
│   ┌─────────────┐    ┌─────────────┐    ┌─────────────────┐     │
│   │             │    │             │    │                 │     │
│   │  Groq API   │    │  Web Speech │    │     Other       │     │
│   │             │    │     API     │    │     APIs        │     │
│   │             │    │             │    │                 │     │
│   └─────────────┘    └─────────────┘    └─────────────────┘     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Key Components

### Frontend Layer

1. **Pages**
   - `Index.tsx`: Main landing page with feature tabs
   - `NotFound.tsx`: 404 error page
   - (Future pages: Authentication, Settings, etc.)

2. **Components**
   - **Feature Components**: Voice Input, Prompt Library, SEO Tools, etc.
   - **Layout Components**: Navbar, Sidebar, etc.
   - **UI Components**: Button, Card, Dialog, etc.

3. **State Management**
   - React Context for local state
   - TanStack Query for server state and data fetching

4. **Custom Hooks**
   - `use-mobile`: Responsive design detection
   - `use-toast`: Toast notification system

### Backend Layer (Supabase)

1. **Authentication**
   - User registration and login
   - Session management
   - Role-based access control

2. **Database**
   - User profiles and settings
   - Prompts storage
   - Projects and folders data
   - SEO analysis data

3. **Storage**
   - User files and assets
   - Project resources

### External Services

1. **Groq AI API**
   - Integration with AI models:
     - LLaMA 3.3 70B
     - DeepSeek Llama 70B
     - Mixtral 8x7B
     - Gemma2 9B

2. **Web Speech API**
   - Voice recognition for voice input feature
   - Speech synthesis (potential future feature)

## Data Flow

1. **User Interaction**
   - User interacts with the UI components
   - Component state changes are managed locally with React state/context

2. **Data Fetching/Mutation**
   - React Query handles API calls to Supabase
   - Data is cached and synchronized with the server

3. **Authentication Flow**
   - User credentials are sent to Supabase Auth
   - JWT tokens are stored and managed for authenticated requests

4. **External API Integration**
   - Secured API calls to external services (Groq AI, etc.)
   - Results processed and displayed in the UI

## Deployment Architecture

The application follows a JAMstack architecture:

- Static assets hosted on CDN
- API calls to Supabase Backend-as-a-Service
- Serverless functions for custom backend logic

## Folder Structure Recommendations

Based on the current structure, here are recommendations for improvement:

1. **Group by Feature**: Consider reorganizing components/features into domain-specific folders
2. **Shared Components**: Move reusable components to a shared directory
3. **API Layer**: Add a dedicated API layer to centralize Supabase calls
4. **Type Definitions**: Create a dedicated types folder for shared TypeScript interfaces

The proposed structure would be:

```
src/
├── features/            # Feature-specific components and logic
│   ├── voice-input/
│   ├── prompt-library/
│   ├── project-management/
│   └── seo-tools/
├── shared/             # Shared components and utilities
│   ├── components/     # Common UI components
│   ├── hooks/          # Custom React hooks
│   └── utils/          # Helper functions
├── api/                # API integration layer
│   ├── supabase/       # Supabase client and API functions
│   └── external/       # External API integrations
├── types/              # TypeScript type definitions
├── pages/              # Application pages
└── layouts/            # Layout components
```

This structure would improve:
- Discoverability (easier to find related code)
- Encapsulation (features are self-contained)
- Reusability (shared code is clearly separated)
- Scalability (new features can be added without modifying existing code)
