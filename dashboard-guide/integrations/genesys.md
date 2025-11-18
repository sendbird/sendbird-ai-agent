# Genesys

Enhance customer support through advanced AI communication tools - Sendbird AI agent's [Voice channel](../build/channels/voice.md). Integrating the AI agent with your Genesys account can significantly improve your voice chat capabilities, offering a seamless and efficient customer communication experience.

This page demonstrates a step-by-step guide for Genesys integration for Voice conversations.

***

## Prerequisites

* Sendbird AI agent account.
* Active Voice channel for the AI agent.
* A phone number for human agent escalation.
* Phone call routing settings on Genesys .
  * Go to **Admin > Routing > Call routing** and add a phone number to redirect the AI calls to human agents through Genesys.

***

## How to integrate

This guide presumes that you have already registered a phone number in Genesys via which Sendbird AI agent to hand over its calls to human agents. Follow the instructions below for seamless integration for the **Voice** channel.

1. In Sendbird AI agent dashboard, go to **Build > Channels** and click on the **Voice** channel tile.
2. In the page, connect a phone number at which users can reach your AI agent. Then [set up the channel's basic configurations](../build/channels/voice.md) such as language to speak, a voice tone to use, and a handoff platform in case of ticket escalation. Select **Genesys** for handoff.
3. Save the settings and navigate to **Workspace settings > Integration.** Click on the **Genesys** tile.
4. Here, enter the phone number you registered in Genesys.

<figure><img src="../../.gitbook/assets/스크린샷 2025-09-16 오전 11.15.43.png" alt=""><figcaption></figcaption></figure>
