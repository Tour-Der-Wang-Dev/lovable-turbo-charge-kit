
# Lovable Studio - Productivity Platform

![Lovable Studio](https://lovable.dev/opengraph-image-p98pqg.png)

An AI-powered productivity platform featuring voice input, project management, and SEO tools built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Voice Input**: Real-time voice-to-text transcription
- **AI Model Integration**: Support for Groq's high-performance models like LLaMA 3.3 70B
- **Prompt Library**: Store and organize your favorite prompts
- **Project Management**: Create and organize projects with folders
- **SEO Tools**: Generate and validate meta tags

## 🛠️ Tech Stack

- **Frontend**: React with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **Routing**: React Router
- **State Management**: React Query
- **Backend**: Supabase (authentication, database, storage)
- **Build Tool**: Vite

## 🏁 Getting Started

### Prerequisites

- Node.js & npm (recommended to install with [nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
- Supabase account (for backend features)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd lovable-studio
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   
Create a `.env` file in the project root with the following variables:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server:

```bash
npm run dev
```

5. Open [http://localhost:8080](http://localhost:8080) in your browser.

## 🧪 Testing

Run tests with:

```bash
npm test
```

## 📦 Build

Create a production build with:

```bash
npm run build
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests and linting to ensure quality
5. Commit your changes (`git commit -m 'Add some amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Code Style Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add JSDoc comments to functions
- Keep components small and focused

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Project Structure

The project follows a feature-based organization:

- `src/components/features/`: Feature-specific components
- `src/components/ui/`: Reusable UI components (shadcn/ui)
- `src/components/layout/`: Layout components (Navbar, Sidebar)
- `src/pages/`: Application pages
- `src/hooks/`: Custom React hooks
- `src/integrations/`: External service integrations (Supabase)

See `filesExplainer.md` for a detailed breakdown of all project files.

## 📊 System Architecture

Refer to the system diagram in the `architecture.md` file for a visual representation of how different components interact.

## 🙏 Acknowledgements

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Supabase](https://supabase.io/)
- [Vite](https://vitejs.dev/)
