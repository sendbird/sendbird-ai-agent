# Voice

Sendbird's Voice agent enables your AI agent to speak with users over the phone—handling calls naturally, just like a human would. Whether it’s answering support questions, routing users to the right department, or providing information 24/7, the voice agent offers a seamless conversational experience that sounds human and helpful.

You can set up your Voice agent under **AI agent > Build > Channels > Voice** on Sendbird Dashboard.

<figure><img src="../../../.gitbook/assets/CleanShot 2025-09-02 at 11.12.19@2x (1).png" alt=""><figcaption></figcaption></figure>

This guide walks you through how to configure and customize your Voice agent inside Sendbird Dashboard. From setting the default language and phone number to choosing a realistic voice and defining automated call behaviors, you’ll learn how to fine-tune the way your AI agent handles inbound and outbound calls.

By the end of this guide, you’ll be able to:

* Set up a language-appropriate voice agent with localized speech
* Choose a natural-sounding voice and adjust the speaking speed
* Define welcome and closing messages
* Automatically end inactive calls
* Transfer callers to live support agents when needed

***

### 1. Set language and phone number

Define the default language your AI agent will speak and link it to a phone number for live or test calls.

* **Language**: Select the spoken language for your voice agent. This ensures natural-sounding and localized responses.\
  → _Example: English_
*   **Phone number**: Choose a phone number to connect the agent to.

    > **Note**: You can test the voice agent directly in the dashboard without assigning a phone number.

***

### 2. Choose a voice

Customize the voice persona your AI agent will use on calls.

* **Voice**: Pick from a list of available voices that match the selected language.
  * Each voice includes attributes like tone, gender, age, and style.
  * → _Example: Rachel (American, casual, young, female, English, conversational)_
* **Speaking speed**: Adjust the agent’s speaking rate on a scale from 0.7x (slow) to 1.2x (fast).
  * Default: `1x (normal)`

> ⚠️ **Tip**: Match the language, voice, and message language for the most natural experience.

***

### 3. Start a conversation

Set the first message your voice agent will say when a call begins.

*   **Welcome message**: Write a short greeting that introduces the AI agent to the caller.\
    → _Example (English)_:

    > _Hello, welcome to Disney+, where magic happens. I’m your voice AI agent. How can I help you today?_

***

### 4. End calls automatically

Configure when and how the call should end if there's no interaction from the caller.

* **Time to wait**: Set how many seconds the agent should wait after its last message before ending the call.\
  → _Example: 30 seconds_
*   **Closing message**: This will be spoken before the call is disconnected.\
    → _Example (English)_:

    > _Since I haven't heard anything, I’ll end the call now. Thank you for calling._

***

### 5. Transfer to human agent

Configure when and how to escalate the call to a human agent via a third-party support platform.

* **Platform**: Choose the platform your human agents use (e.g., Zendesk).
*   **Transfer message**: Message played while the caller is being routed to a live agent.\
    → _Example (English)_:

    > _Transferring you to a support agent. Please stay on the line._

> 💡 **Note**: The transfer message should match the agent’s language and tone.

***

### Preview your configuration

You can test your voice agent setup using the built-in **Tester** view on the right side of the dashboard. This lets you simulate calls and hear your AI agent's voice and responses.
