# Sendbird AI Agent React Sample

This is a basic React application demonstrating how to integrate the Sendbird AI Agent Messenger using the React npm package.

## Features

- React + TypeScript + Vite + Tailwind CSS setup
- Latest version of AI Agent Messenger React package
- Basic AI Agent Messenger integration
- User authentication example
- Context configuration example
- Manual messenger controls
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

- Click "Open Messenger" to open the AI agent chat
- Enable "Use authenticated session" to test with user authentication
- Enable "Include context" to provide additional context to the AI agent

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
