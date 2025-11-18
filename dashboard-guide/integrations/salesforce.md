# Salesforce

Connect your AI agent to Salesforce for advanced customer support. The Salesforce integration with Sendbird’s AI Agent combines intelligent automation with human assistance, utilizing existing knowledge base content for improved AI responses. This integration allows you to:

* Automatically create tickets: When an AI Agent detects issues that require human intervention, it can automatically generate tickets in Salesforce, carrying over relevant conversation details. This ensures a seamless handoff for efficient issue resolution.
* Hand off conversations to human agents: For complex inquiries or escalations, an AI Agent can smoothly transfer conversations to human agents in Salesforce. The integration preserves the full conversation history, enabling human agents to provide faster, more personalized support.

{% hint style="info" %}
Sendbird AI agent supports a conversation handoff through [Sendbird Salesforce Connector](https://sendbird.com/docs/support-chat/guide/v1/overview). If you haven't implemented the connector yet, [visit our docs](https://sendbird.com/docs/support-chat/guide/v1/salesforce-connector/integrate-with-salesforce-service-cloud) and integrate Sendbird Chat with Salesforce Service Cloud.
{% endhint %}

* Leverage Salesforce Knowledge for instant answers: By integrating with Salesforce Knowledge, AI Agents can access all knowledge base content in Salesforce. This allows the AI Agent to retrieve relevant articles, FAQs, and documentation to provide accurate, self-serve responses before escalating to human support. For the initial integration, real-time or periodic sync is not supported for Knowledge.

***

## **How to integrate**

### **Step 1: Fill in your Salesforce credentials in Sendbird**

First, log in to your Salesforce account and find **OAuth and OpenID Connect Settings** in the **Setup** console. Then enable **Allow OAuth Username-Password Flows**. This will allow your AI agent to communicate with Salesforce without interruption.

In Sendbird dashboard, you will need to enter the following credentials under **Workspace settings > Integrations > Salesforce** on **Sendbird AI agent dashboard:**

<table><thead><tr><th width="191.484375">Credential</th><th>Description</th></tr></thead><tbody><tr><td>Domain</td><td>Enter the Salesforce domain that you are currently using. (e.g., yourDomain.my.salesforce.com).</td></tr><tr><td>Username</td><td>Enter the user email of your Salesforce account that has an access to <strong>Salesforce's Developer console</strong>.</td></tr><tr><td>Security token</td><td><p>Enter an authentication code required for communication with Salesforce through the API. It's your user password followed by Salesforce-issued security token, with no space in between.</p><p>Format: <code>[Password][SecurityToken]</code></p><blockquote><p>e.g., if your user password is <code>Sendbird123</code> and Salesforce security token is <code>ABC456</code> , enter <code>Sendbird123ABC456</code>.</p></blockquote><p>If you need a fresh Salesforce security token for your AI agent, go to <strong>Settings > Personal > Reset My Security Token</strong> in <strong>Salesforce</strong>. Once you click the <strong>Reset My Security Token</strong> button, the new security token will be emailed to the username’s email.</p></td></tr><tr><td>Consumer key</td><td>Generate a new Consumer key under <strong>App Manager > Connected App > View > Consumer Key and Secret > Manage Consumer Details</strong> on your <strong>Salesforce Setup</strong>. Expand the <strong>How-to</strong> instructions below for more information.</td></tr><tr><td>Consumer secret</td><td>Generate a new Consumer secret under <strong>App Manager > Connected App > View > Consumer Key and Secret > Manage Consumer Details</strong> on your <strong>Salesforce Setup</strong>. Expand the <strong>How-to</strong> instructions below for more information.</td></tr></tbody></table>

<details>

<summary>How to generate a new Consumer key and a Consumer secret</summary>

For smooth communication between Sendbird AI agent and Salesforce, add a new Connected App dedicated to your AI agent and issue a new Consumer key and secret for it. Follow the instructions below.

1. Go to **Setup > Apps > App Manager** in Salesforce with the system admin credential.
2. Click **New Connected App** in the top-right corner of the browser.
3. Select **Create a Connected App** and click **Continue**.

<figure><img src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXemxK-C6N607DnCTCNXQdSnTMMmrV8h8O_r1AXSryt4shogSO7IVYofQN1dZf_LfKtH3mD_uW3HN1KAqQKQckDPjCyYeBY9iTaSXoIwJSRt6Blltr9jPDjN-MKzwDMSOSdOlofy?key=xS65XOd58rPJOYVnOh8lJEX0" alt=""><figcaption></figcaption></figure>

4. Enter **Connected App Name**, **API Name**, and **Contact Email** you will use for Sendbird AI agent.

<figure><img src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXfqPshFJXpTB4g2o0S1B2wwyKXvFf70t5iNo-ay97sJwtZSlxJJ1Cp9LlQL-PW0_yXKJJFyeAKZGUFTMMtlWYvHIhzF1MkWPud2IKsbkSQI__2GyfldApfFizh_XNKJVxhNQEDH?key=xS65XOd58rPJOYVnOh8lJEX0" alt=""><figcaption></figcaption></figure>

**Basic information**

<table><thead><tr><th width="190.13671875">Field</th><th>Description</th></tr></thead><tbody><tr><td>Connected App Name</td><td>Enter your service name.</td></tr><tr><td>API Name</td><td>(This name is auto-generated when you initially fill in the Connected App Name.)</td></tr><tr><td>Contact Email</td><td>Enter the Salesforce system admin's email address.</td></tr></tbody></table>

5.  In the **API(Enable OAuth Settings)** section, enable the **Enable OAuth Settings** and fill in the **Callback URL** as [https://login.salesforce.com/services/oauth2/callback](https://login.salesforce.com/services/oauth2/callback).

    <figure><img src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXenG_vn109kCCatq3ILAc16CXJXolbst1TkMD4HZnD1D4-2p_STrvmND8c6la6LKwUkAaO6PffY9OlNNFNGGOkGqF8U70qRdVL-M2utp850tsvvkAlfKgTwMS4IJudTjks3g2Tl?key=xS65XOd58rPJOYVnOh8lJEX0" alt=""><figcaption></figcaption></figure>
6. Then go to **Selected OAuth Scopes** and enable the following items:

* **Access Interaction API resources (interaction\_api)**
* **Access Lightning applications (lightening)**
* **Access content resources (content)**
* **Access the Salesforce API Platform (sfap\_api)**
* **Manage user data via APIs (api)**
* **Manage user data via Web browsers (web)**
* **Perform requests at any time (refresh\_token, offline\_access)**

7. In the same section, disable below three items:

* **Require Proof Key for Code Exchange (PKCE) Extension for Supported Authorization Flows**
* **Require Secret for Web Server Flow**
* **Require Secret for Refresh Token Flow**

<figure><img src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXeROo37wpY5NrG-mwMnW_XKNVkXmMdr_zrNBDmNbH0AorrHkusEo63JVnffjIL7Cig9GC9CKpi9IUIQtkX_aD4T7IbTGqgH3veQTbz-UPBJKcS5BNzecn5Vwh1zN6hcw3f7qx8CJg?key=xS65XOd58rPJOYVnOh8lJEX0" alt=""><figcaption></figcaption></figure>

8.  After saving the changes, go to the detail page of the Apps you created and click the **Manage Consumer Details**.

    <figure><img src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXea7hH6kNVRJMqqtjfjhrC3cHXVrnIV52QdBfmS4PojvaoGwcrohBFk3xjKNtD0RFQ4yEWbQT9e9f9cm3vbqEb5zpSsmvIoWwhav_FchwZrvOdVCTQBVLvC5bWSSek86IWQkHU4vw?key=xS65XOd58rPJOYVnOh8lJEX0" alt=""><figcaption></figcaption></figure>
9. You will find the **Consumer Details** such as **Consumer Key** and **Consumer Secret**. Copy and paste them into the **Salesforce** **Integration** page in the AI agent.

{% hint style="info" %}
The Consumer Details appear only once initially, so save the information somewhere safe.
{% endhint %}

<figure><img src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXffhPEwd1g84bFO-RlQY70VnLgFEDGYAiueDKlml2PEbZvADb_xiYp-AmfR-HcbvAUGCHzuS5Gqn66MvZ6WuwQzrNCRxZXaOU7o0xEQx135TyEW0gYd-eiAgx0PVBlFji3RmhSGTw?key=xS65XOd58rPJOYVnOh8lJEX0" alt=""><figcaption></figcaption></figure>

</details>

<figure><img src="../../.gitbook/assets/Screenshot 2025-04-16 at 3.30.28 PM.png" alt=""><figcaption></figcaption></figure>

### Step 2. Click **Connect**

Once you've entered all the required credentials, click **Connect** at the top-right corner of the browser. You will then see a confirmation label on the **Salesforce** tile indicating that the integration has been successfully established.

<figure><img src="../../.gitbook/assets/image (66).png" alt="" width="326"><figcaption></figcaption></figure>

### Step 3. Register a remote site

To send an HTTP request from Salesforce to the Sendbird server, your Sendbird API request URL must be registerd as a Remote Site in Salesforce. See [our guide on Salesforce connector](https://sendbird.com/docs/support-chat/guide/v1/salesforce-connector/integrate-with-salesforce-service-cloud#2-step-3-configure-the-salesforce-service-cloud-settings-3-register-a-remote-site) or expand the instructions below.

{% hint style="info" %}
For Sendbird AI agent, register the following two URLs as a remote site. Your Sendbird Application ID can be found under **Workspace settings > General** in the dashboard.

* `https://api-{YOUR_SENDBIRD_APPLICATION_ID}.sendbird.com`
* `https://genai-{YOUR_REGION}-llm-api.chat.sendbird.com`
{% endhint %}

<details>

<summary>How to register a remote site in Salesforce</summary>

1. On Salesforce's **Setup** page, search **Remote Site Settings** in the **Quick Find** search bar. Or go to **Setup > Security > Remote Site Settings** in the left menu bar.
2. Click **New Remote Site** at the top of the Remote Site table.

<figure><img src="https://static.sendbird.com/docs/support-chat/support-chat-v1-sf-sc-new-remote-site.png" alt=""><figcaption></figcaption></figure>

3. Fill in each field according to the following instructions.

* **Remote Site Name**: Enter any value of your choice. Only alphanumeric characters and underscores are allowed in **Remote Site Name**. Don't use spaces.
* **Remote Site URL**: Add the following two URLs:
  * `https://api-{YOUR_SENDBIRD_APPLICATION_ID}.sendbird.com`. Replace `{YOUR_SENDBIRD_APPLICATION_ID}` in the URL with your Sendbird application ID.
  * `https://genai-{YOUR_REGION}-llm-api.chat.sendbird.com` . You can find your Sendbird Webhook URL under **Workspace settings > Integrations > Salesforce**.

<figure><img src="https://static.sendbird.com/docs/support-chat/support-chat-v1-sf-sc-edit-remote-site.png" alt=""><figcaption></figcaption></figure>

4. Check the box next to **Active** and **Save**.

</details>

### **Step 4: Test the conversation handoff**

Once connected, you can try out a handoff on our AI agent widget.

1. Go to **Build > Conversation settings > Transfer to human agent** and click Edit at the top right corner of your browser.
2. Select **Salesforce** for a handoff platform.
3. Start a conversation on the AI agent widget in Sendbird AI agent dahsboard.
4. Then click on the **Handoff** button to transfer the conversation to Salesforce Connector in Salesforce Service Cloud.
5. See the summary of the AI agent conversation successfully transferred to the Connector.

***

## What's next

### Connect Salesforce account as knowledge.

If you have any guidelines or articles that your AI agent can reference, go to the [Shared assets > Knowledge](../shared-assets/knowledge.md) menu in the dashboard and connect them to Sendbird AI agent.
