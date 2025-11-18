---
hidden: true
---

# New Sprinklr (WIP)

The Sprinklr integration with Sendbird’s AI Agent facilitates seamless customer experience by blending intelligent automation with human assistance. This integration allows AI agent to:

* Access articles in your Sprinklr and use them as a knowledge base: If you already have multiple customer support articles in Sprinklr, AI agents can easily reference them when handling user queries, instead of you building it from scratch.
* Hand off conversations to human agents in Sprinklr: For complex queries or escalations, AI Agent can transfer conversations to human agents in Sprinklr. The integration ensures that agents receive full conversation context, enabling faster and more personalized customer service.

{% hint style="info" %}
Self-serve integration is currently not supported. Contact a Sendbird representative to connect Sprinklr with Sendbird AI agent.
{% endhint %}

***

## How to integrate

Sendbird will need your Sprinklr account information for integration as follows:

* Sprinklr Dev portal application's API key and API secret:
  * Log in to your account at dev.sprinklr.com and create an app.
  * Click your email address on the right top corner of the browser and go to Apps to view API credentials of your app.
  * In the app's Overview, you'll find API key and secret.
* Live chat app ID:
  * settings → livechat → embed code에서 app Id 추출
* Live chat API secret:
  * Log in to your account at [lite.sprinklr.com](http://lite.sprinklr.com/).
  * Go to Settings → sprinklr service → live chat. Then select an app.
  * Go to Edit → Dev Tools and you'll find API Key for Live Chat.
* Environment:
  * Log in to the Sprinklr UI platform.
  * Right click anywhere on the homepage.
  * Select `"View Page Source"` from the drop-down menu.
  * Ctrl+F or Cmd+F `"sentry-environment"` to find where your Sprinklr instance is hosted.

{% hint style="info" %}
For more information, refer to [Sprinklr's guide on API key generation](https://dev.sprinklr.com/api-key-and-secret-generation).
{% endhint %}

## How to integrate

### Step 1: Enter your Sprinklr API credentials.

Go to Workspace settings > Integration > Sprinklr on Sendbird AI agent's dashboard and fill out the API credentials.

<figure><img src="../../.gitbook/assets/image (52).png" alt=""><figcaption></figcaption></figure>

Once we connect your account, these details can be found under **Regional settings > Integration > Sprinklr**. Also, you will see a `CONNECTED` label on the Sprinklr tile on both **Integration** and **Resource center > Knowledge sources** under **Regional settings**.

<figure><img src="../../.gitbook/assets/image (53).png" alt="" width="326"><figcaption></figcaption></figure>
