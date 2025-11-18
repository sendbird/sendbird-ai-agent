# Conversation settings

The **Conversation settings** tab lets you define when and how conversations start, end, and flow between your customers and AI agents. This includes configuring welcome messages, guiding users through suggested replies, handing off to human agents, and defining when to close conversations automatically.

You can find this page in:\
**AI agent (Development) > Build > Channel > Messenger > Conversation settings**.

You can edit in the **Development** environment and deploy them to apply changes to **Production**.

***

### **Start a conversation**

This is where you configure how the AI agent initiates a customer conversation.

<figure><img src="../../../../.gitbook/assets/스크린샷 2025-09-09 오후 1.53.30.png" alt=""><figcaption></figcaption></figure>

<table><thead><tr><th width="226.078125">Fields</th><th>Description</th></tr></thead><tbody><tr><td>Welcome message</td><td><p>Craft a friendly and inviting message that users will see when they interact with your AI agent. This is the chance to make a good first impression, so consider what message will make users feel welcomed and eager to engage.<br></p><p><strong>Example:</strong></p><ul><li>“Hi there! I’m here to help. How can I assist you today?”</li><li>“Welcome! Looking for help or have a question?”</li></ul></td></tr><tr><td>Suggested replies</td><td><p>Propose pre-defined replies that users can choose from when responding to your AI agent. This helps streamline the conversation and makes it easier for users to interact, especially if they are unsure of what to say.</p><p><strong>Example:</strong></p><ul><li>“What’s the status of my order?”</li><li>“Can I speak to a representative?”</li></ul></td></tr></tbody></table>

***

### Special notice

Provide information that customers should be aware of before starting a conversation (e.g., Terms of Service, Privacy Policy).

<figure><img src="../../../../.gitbook/assets/스크린샷 2025-09-09 오후 1.53.54.png" alt=""><figcaption></figcaption></figure>

***

### **Transfer to human agent**

Enable human-agent handoff and select the support platform—set platform credentials first to activate this feature. 3rd-party platforms that we currently support for handoff include:

* Zendesk
* Freshworks
* Salesforce
* Sendbird Desk
* Sprinklr

<figure><img src="../../../../.gitbook/assets/스크린샷 2025-09-09 오후 2.16.00.png" alt=""><figcaption></figcaption></figure>

***

### **Check resolution & satisfaction**

Configure how to respond to customers when their conversation went well or bad.

<figure><img src="../../../../.gitbook/assets/image (18).png" alt=""><figcaption></figcaption></figure>

<table><thead><tr><th width="245.5546875">Field</th><th>Description</th></tr></thead><tbody><tr><td>Ask if issue was resolved</td><td>Set a message to ask the customer for confirmation when the AI agent detects that their issue may be resolved.</td></tr><tr><td>Positive 👍</td><td><p>Define how the AI agent should handle positive feedback from customers.</p><ul><li>Feedback: Set the label for the button that customers can select to indicate their issue has been resolved.</li><li>Action: The conversation will automatically close when the customer selects this button. Provide a message to confirm the conversation’s closure.</li><li>Conversation status: Once positive feedback is received, the conversation status will always be marked as <code>Resolved</code>.</li></ul></td></tr><tr><td>Negative 👎</td><td><p>Define how the AI agent should handle negative feedback from customers.</p><ul><li>Feedback: Set the label for the button that customers can select to indicate their issue hasn’t been resolved.</li><li>Action: The conversation will automatically close when the customer selects this button. Provide a message to confirm the conversation’s closure.</li><li>Conversation status: Once positive feedback is received, the conversation status will always be marked as <code>Unresolved</code>.</li></ul></td></tr></tbody></table>

***

### **Close inactive conversations**

Define how to manage conversations with no response from customers.

<figure><img src="../../../../.gitbook/assets/image (21).png" alt=""><figcaption></figcaption></figure>

<table><thead><tr><th width="258.94140625">Field</th><th>Description</th></tr></thead><tbody><tr><td>Timeout period</td><td><p>Define the duration of inactivity after which the conversation is considered ended. The AI agent automatically closes the conversation if the customer does not respond within the specified timeframe.</p><p>Default timeout period: 10 minutes</p></td></tr><tr><td>Closing message</td><td>Enter a message that informs the customer when the conversation is closing due to inactivity.</td></tr></tbody></table>

\\
