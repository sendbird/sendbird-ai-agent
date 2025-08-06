# Sendbird AI Agent CDN Sample

This is a basic HTML/JavaScript application demonstrating how to integrate the Sendbird AI Agent Messenger using the CDN script.

## Features

- Vanilla JavaScript + Vite setup
- CDN-based AI Agent Messenger integration
- User authentication example
- Context configuration example
- Manual messenger controls

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to the provided URL (usually http://localhost:5173)

## Usage

- The messenger will initialize automatically when the page loads
- Click "Open Messenger" to open the AI agent chat
- Enable "Use authenticated session" to test with user authentication
- Enable "Include context" to provide additional context to the AI agent

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
- No build-time dependencies on React or TypeScript
- Pure JavaScript implementation
- Can be embedded in any HTML page without a build process