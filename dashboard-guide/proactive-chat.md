# Proactive chat

With Proactive chat, AI agents can send a message to users and initiate a conversation. You can utilize this feature to send marketing or announcement messages to a target user. When a customer replies to the message, the proactive chat automatically changes to a general conversation and starts counting its resolution time.

{% hint style="info" %}
Currently, this feature is supported for SMS and messenger channels in web apps only.
{% endhint %}

<figure><img src="../.gitbook/assets/image (84).png" alt=""><figcaption></figcaption></figure>

***

## **Behavior**

* If the user responds, the conversation is handled first by Sendbird AI agent. The AI agent can escalate and hand over the inquiry to a human agent upon request.
* If the user does not respond, the proactive chat is automatically closed based on the auto-close setting. This will trigger a customer satisfaction (CSAT) survey.

***

## How to send a proactive chat

1. Go to **Proactive chat** in Sendbird AI agent dashboard.
2. Click the **Send message** button in the top-right corner of the screen.
3. When a new message popup appears, specify the following information:
   1. **Channel**: choose a channel type between messenger and SMS.
   2. **Recipient**: search a target user by their ID or nickname.
   3. **Message**: enter the message content.
   4. [**Suggested reply**](shared-assets/message-templates.md#suggested-replies): add predefined response options that can lead the target user to a specific web page or prompt a follow-up action.

<figure><img src="../.gitbook/assets/image (85).png" alt=""><figcaption></figcaption></figure>

4. Once specified, **Send**.

***

## Metrics

Proactive chat also offers metrics that allows you to track user engagement of the messages.

* Status: the response status of the message. Its value can be
  * **Responsed:** the target user replied back or showed a reaction to the proactive chat.
  * **Not responsed**: the proactive chat was sent but received no response.
* Resolution time: the total time it took from the target user's first response to conversation closure.
