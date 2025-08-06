# Sendbird AI Agent CDN Sample

This is a basic HTML/TypeScript application demonstrating how to integrate the Sendbird AI Agent Messenger using the CDN script.

## Features

- TypeScript + Vite setup (compiled to JavaScript)
- CDN-based AI Agent Messenger integration
- User authentication example
- Context configuration example
- Manual messenger controls
- Unit tests with Vitest
- Environment variable best practices

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to http://localhost:5174

## Usage

- The messenger will initialize automatically when the page loads
- Click "Open Messenger" to open the AI agent chat
- Enable "Use authenticated session" to test with user authentication
- Enable "Include context" to provide additional context to the AI agent

## Environment Variables (Best Practice)

For production use, create a `.env` file with:
```
VITE_APP_ID=your_app_id
VITE_AI_AGENT_ID=your_ai_agent_id
```

Then update `src/main.ts` to use:
```typescript
const APP_ID = import.meta.env.VITE_APP_ID
const AI_AGENT_ID = import.meta.env.VITE_AI_AGENT_ID
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

## Key Differences from React Integration

- Uses CDN script loading instead of npm packages
- TypeScript compiled to JavaScript (no runtime dependencies)
- Direct DOM manipulation approach
- Can be embedded in any HTML page
- Smaller bundle size compared to React approach