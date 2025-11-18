# Zendesk

The Zendesk integration with Sendbird’s AI Agent enables seamless customer support experiences by combining ticket automation with human expertise. This integration allows you to:

* Hand off conversations to human agents: For complex queries or escalations, AI Agent can transfer conversations to human agents in Zendesk. The integration ensures that agents receive full conversation context, enabling faster and more personalized customer service.
* Automatically create tickets: When an AI Agent identifies issues that require a human agent's involvement, it can automatically generate tickets in Zendesk with all relevant conversation details. This ensures a smooth transition to your ticketing system for effective issue tracking and resolution.

***

## **How to integrate**

### **Step 1: Fill in your Zendesk information in Sendbird AI agent dashboard**

1. Log in to your Zendesk account to integrate.
2. Then come back to **Workspace settings > Integrations** in **Sendbird AI agent dashboard**.
3. Click on the **Zendesk** tile and fill out the fields in the page. The information of each field can be found in your **Zendesk** dashboard. For detailed information, see the table below the screenshot.

<figure><img src="../../.gitbook/assets/image (12) (1).png" alt=""><figcaption></figcaption></figure>

**Integration type**

Determine whether you would like to integrate Zendesk for both Knowledge and Handoff or just for Knowledge.

**Account information**

<table><thead><tr><th width="189.5390625">Field</th><th>Description</th></tr></thead><tbody><tr><td>Subdomain</td><td>The unique part of your Zendesk URL (e.g., .yourSubdomain.zendesk.com). This is also found in the account URL.</td></tr></tbody></table>

**Zendesk API credentials**

<table><thead><tr><th width="190.64453125">Credential</th><th>Description</th></tr></thead><tbody><tr><td>Account email</td><td>The email connected to your Zendesk account.</td></tr><tr><td>API token</td><td>The unique API token issued for your account. Sendbird AI agent will require this in order to authenticate its request to your Zendesk account. Create a new API token for your AI agent under <strong>Apps and Integration > APIs > Zendesk API</strong> on <strong>Zendesk Admin Center</strong>.</td></tr></tbody></table>

**Conversation API credentials**

<table><thead><tr><th width="189.5703125">Credentail</th><th>Description</th></tr></thead><tbody><tr><td>Key ID</td><td>Credentials required for authenticating API requests. Create a new Conversation API key for your AI agent under <strong>Admin Center > Apps and integrations > APIs > Conversations API</strong> on <strong>Zendesk Admin Center</strong>. This will generate a new <strong>Key ID</strong>, <strong>Secret Key</strong>, and <strong>APP ID</strong>. For more information, refer to <a href="https://support.zendesk.com/hc/en-us/articles/4576088682266-Using-the-Conversations-API-keys">Zendesk's Help page</a>.</td></tr><tr><td>Secret key</td><td>Credentials required for authenticating API requests. This will be provided along with your <strong>Key ID</strong>.</td></tr><tr><td>APP ID</td><td>The identifier for a specific app in your Zendesk account. This will be provided along with your <strong>Key ID</strong>.</td></tr></tbody></table>

### Step 2: Click Connect

Once you have finished retrieving the required information for the **Zendesk** integration, click **Connect** at the top of the browser to save and complete integration. You will then see a confirmation indicating that the **Zendesk** integration has been successfully established.

<figure><img src="../../.gitbook/assets/image (9) (1).png" alt="" width="326"><figcaption></figcaption></figure>

### **Step 3: Test the conversation handoff**

Once connected, you can try out a handoff on our AI agent widget.

1. Go to **Build > Conversation settings > Transfer to human agent** and select **Zendesk** for a handoff platform.
2. Turn your Zendesk agent to **Online** in Zendesk.
3. Start a conversation on the AI agent widget in Sendbird AI agent dahsboard.
4. Then click on the **Handoff** button to transfer the conversation to Zendesk.
5. Go back to Zendesk and accept the new ticket in Zendesk .
6. See the summary and transcript of the AI agent conversation successfully transferred to the Zendesk ticket.

***

## What's next

### Connect Zendesk subdomains as knowledge.

If you have any guidelines or articles in Zendesk that your AI agent can reference, go to the [Shared assets > Knowledge](../shared-assets/knowledge.md) menu in the dashboard and connect them to Sendbird AI agent.
