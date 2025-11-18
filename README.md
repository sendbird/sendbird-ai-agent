# Delight AI agent

**Delight AI agent** is an enterprise-grade, omnichannel AI solution designed to revolutionize customer service.
Unlike traditional chatbots, Delight AI agents understand intent, maintain context, take action, and adapt over time, delivering natural, human-like conversations that resolve complex issues and escalate seamlessly when needed. ([sendbird.com](https://sendbird.com/ai-agent?utm_source=chatgpt.com))

## Features

- **Omnichannel Support**: Integrates with SMS, email, WhatsApp, in-app chat, web, and social messaging platforms, ensuring your AI agent is always available where your customers are. ([sendbird.com](https://sendbird.com/ai-agent?utm_source=chatgpt.com))

- **Contextual Understanding**: Maintains conversation context across channels, allowing the AI agent to pick up the conversation exactly where the customer left off.

- **Proactive Engagement**: Anticipates customer needs and initiates conversations on preferred channels before issues arise.

- **Unified Customer Insights**: Transforms omnichannel conversations into unified customer insights to inform smarter business decisions. ([sendbird.com](https://sendbird.com/?utm_source=chatgpt.com))

- **Seamless Integrations**: Connects with customer support software like Salesforce, Zendesk, Notion, and Google Drive, allowing the AI agent to be trained using your existing content. ([sendbird.com](https://sendbird.com/ai-agent/builder?utm_source=chatgpt.com))

## Getting Started

To integrate Delight AI agent into your application, follow these steps:

1. **Log in to your dedicated Delight AI dashboard**.

2. **Check the identifiers**: In the dashboard, go to **Channels → Messenger → Basic information** to check the Application ID and AI Agent ID.

3. **Integrate SDK**: Depending on your platform (iOS, Android, Web), integrate the appropriate Delight AI agent SDK into your application.

4. **Initialize AI Agent**: Use the Application ID and Agent ID to initialize the AI agent within your application.

## Repository Structure

This repository contains platform-specific implementations and customer guides for the Delight AI agent:

- **JavaScript**: Located in the `js` directory, includes:
  - Documentation guides for React and CDN integration  
  - Interactive live examples
  - Downloadable sample projects for local development

- **iOS**: Located in the `ios` directory, includes Swift integration guides and sample applications.

- **Android**: Located in the `android` directory, includes Android integration documentation.

### JavaScript Sample Projects

Each JavaScript platform directory contains a ready-to-run sample project:

- **`js/react/sample/`**: Vite + TypeScript + React sample with full AI Agent integration
- **`js/cdn/sample/`**: Vite + Vanilla JavaScript sample using CDN integration

Both samples demonstrate:
- Basic AI Agent Messenger integration
- User authentication and session handling
- Context configuration
- Manual messenger controls

To run the samples locally:
```bash
cd js/react/sample    # or js/cdn/sample
npm install
npm run dev
```

Each platform-specific directory contains its own README with detailed integration instructions.

## Documentation

For comprehensive documentation, including API references and advanced configuration options, visit the [Sendbird Documentation](https://sendbird.com/docs).

## Support

If you encounter any issues or have questions, please open an issue in this repository or contact [Sendbird Support](https://sendbird.com/contact).

## License

This project is licensed under the [MIT License](LICENSE).

---

For more information on Sendbird's AI Agent platform and its capabilities, visit the [official website](https://sendbird.com/ai-agent).
