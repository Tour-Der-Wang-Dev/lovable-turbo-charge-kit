
# Folder Structure Audit

This document provides an assessment of the current project structure and recommendations for improving its organization for better scalability and maintainability.

## Current Structure

```
project-root/
├── supabase/
│   └── config.toml
├── src/
│   ├── components/
│   │   ├── features/
│   │   │   ├── FeatureHighlight.tsx
│   │   │   ├── ModelSelector.tsx
│   │   │   ├── PromptLibrary.tsx
│   │   │   ├── ProjectManagement.tsx
│   │   │   ├── SeoTools.tsx
│   │   │   └── VoiceInput.tsx
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── ThemeToggle.tsx
│   │   └── ui/
│   │       └── (shadcn components)
│   ├── hooks/
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   ├── integrations/
│   │   └── supabase/
│   │       ├── client.ts
│   │       └── types.ts
│   ├── lib/
│   │   └── utils.ts
│   ├── pages/
│   │   ├── Index.tsx
│   │   └── NotFound.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
├── index.html
├── README.md
├── tailwind.config.ts
└── vite.config.ts
```

## Issues & Recommendations

### 1. Flat Features Structure

**Issue:** The `features/` directory contains all feature components at the same level, which can become unwieldy as the application grows.

**Recommendation:** Reorganize features into subdirectories that each contain all the files related to that specific feature:

```
src/features/
├── voice-input/
│   ├── VoiceInput.tsx
│   ├── VoiceInputControls.tsx
│   ├── useVoiceRecognition.ts
│   └── types.ts
├── prompt-library/
│   ├── PromptLibrary.tsx
│   ├── PromptItem.tsx
│   ├── AddPromptDialog.tsx
│   └── hooks/
│       └── usePrompts.ts
└── ...
```

### 2. Missing API Layer

**Issue:** API calls to Supabase and external services are likely scattered throughout components.

**Recommendation:** Create a dedicated API layer:

```
src/api/
├── supabase/
│   ├── auth.ts
│   ├── prompts.ts
│   ├── projects.ts
│   └── seo.ts
└── external/
    ├── groq.ts
    └── speech-recognition.ts
```

### 3. Types Scattered Across Files

**Issue:** Type definitions are likely defined in the files where they're used, making it harder to maintain consistent types.

**Recommendation:** Create a dedicated types directory:

```
src/types/
├── api.ts
├── features/
│   ├── voice-input.ts
│   ├── prompt-library.ts
│   └── ...
└── common.ts
```

### 4. Too Many Direct Component Imports

**Issue:** Components might be directly importing from many other files, creating tight coupling.

**Recommendation:** Use barrel exports to simplify imports:

```
// src/features/voice-input/index.ts
export { default as VoiceInput } from './VoiceInput';
export { useVoiceRecognition } from './useVoiceRecognition';
export type * from './types';
```

### 5. Lack of Context Providers

**Issue:** State management might be mixed with component logic.

**Recommendation:** Extract state management into dedicated context providers:

```
src/contexts/
├── AuthContext.tsx
├── PromptLibraryContext.tsx
└── ThemeContext.tsx
```

### 6. Configuration Management

**Issue:** Configuration values might be hardcoded in components.

**Recommendation:** Centralize configuration:

```
src/config/
├── api.ts
├── features.ts
└── theme.ts
```

## Proposed Structure

```
project-root/
├── supabase/
│   └── config.toml
├── src/
│   ├── api/
│   │   ├── supabase/
│   │   └── external/
│   ├── assets/
│   │   ├── images/
│   │   └── icons/
│   ├── components/
│   │   └── ui/
│   ├── config/
│   ├── contexts/
│   ├── features/
│   │   ├── voice-input/
│   │   ├── prompt-library/
│   │   ├── project-management/
│   │   └── seo-tools/
│   ├── hooks/
│   ├── layouts/
│   ├── lib/
│   │   └── utils.ts
│   ├── pages/
│   ├── styles/
│   ├── types/
│   ├── App.tsx
│   └── main.tsx
└── ...
```

## Benefits of the New Structure

1. **Feature Encapsulation**: Each feature is self-contained with its components, hooks, and types.

2. **Improved Discoverability**: Developers can easily find related code for a specific feature.

3. **Reduced Coupling**: Clear separation between API, UI components, and business logic.

4. **Better Scalability**: New features can be added without modifying existing code.

5. **Enhanced Maintainability**: Changes to one feature are less likely to affect others.

6. **Simplified Testing**: Components and functionality can be tested in isolation.

## Implementation Approach

1. **Incremental Migration**: Move one feature at a time to the new structure.

2. **Introduce Barrels**: Add index.ts files for cleaner imports.

3. **Extract API Logic**: Create API service files for each data domain.

4. **Document Changes**: Update documentation to reflect the new structure.

5. **Review and Refactor**: Continuously review and refine the structure as the application evolves.
