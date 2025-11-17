# Delight AI Agent React Interactive Playground

This is an interactive React playground demonstrating how to integrate the Delight AI Agent Messenger using the React npm package.

## Features

- React + TypeScript + Vite + Tailwind CSS setup
- Interactive playground with live code generation
- Latest version of AI Agent Messenger React package
- Real-time configuration controls
- Context configuration with custom JSON input
- Runtime context updates via patchContext API
- Multi-language support
- Authentication examples
- Code examples with syntax highlighting (Prism.js)
- Modular component architecture
- Unit tests with Vitest
- Environment variable support

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open your browser and navigate to http://localhost:5173

## Usage

### Interactive Playground Tab

- Configure messenger settings using the controls on the left:
  - **Authentication**: Toggle user session authentication
  - **Language**: Select from multiple supported languages
  - **Context**: Choose from presets or create custom JSON context
  - **Runtime Updates**: Enable real-time context patching without resetting
- View dynamically generated React JSX code based on your configuration
- Click the messenger launcher (bottom-right) to interact with the AI agent
- Monitor runtime context updates in real-time

### Code Examples Tab

- Browse various integration examples:
  - Basic React setup
  - Authenticated sessions
  - Context configuration
  - Runtime updates with useRef
  - Multi-language support
- Copy code snippets for use in your own projects

## Environment Variables

Create a `.env` file for your own credentials:

```
VITE_APP_ID=your_app_id
VITE_AI_AGENT_ID=your_ai_agent_id
```

## Testing

Run unit tests:

```bash
npm run test
```

## Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Preview Production Build

```bash
npm run preview
```
