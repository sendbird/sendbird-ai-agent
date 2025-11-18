# Freshworks

The Freshworks integration with Sendbird AI Agent enhances customer support by blending intelligent automation with human assistance. This integration allows you to:

* Automatically create tickets: When an AI Agent detects issues that require human intervention, it can automatically generate tickets in Freshworks, carrying over relevant conversation details. This ensures a seamless handoff for efficient issue resolution.
* Hand off conversations to human agents: For complex inquiries or escalations, an AI Agent can smoothly transfer conversations to human agents in Freshworks. The integration preserves full conversation history, enabling human agents to provide faster, more personalized support.

***

## **Prerequisite**

To establish a connection between Freshworks and Sendbird AI agent, you must meet the following requirements:

* Subscription to at least Freshworks’ Pro plan to enable its Integration feature.
* A channel dedicated to Sendbird Integration in your Freshworks account. Follow the instructions below to create one:

1. Go to **Admin Settings > Configuration and Workflows > Web Chat Topics** on **Freshworks**.

<figure><img src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXf9CjR5tKN-jTy4AYPF_KtAwT5ScpJFn4-4xXBLQqQYjGviAOqYVVd1NRmamMwW1drGHr_6PgzmUB9KI87EYMVdMuI5OaxCnklFEu7ciPGNngk1s8qRqDKvtpwy7D6e2JwOslf70w?key=xS65XOd58rPJOYVnOh8lJEX0" alt=""><figcaption></figcaption></figure>

2. Click the **+Topic** button and create a channel with the name “**Sendbird Integration**”. As the integration system is case-sensitive, make sure you enter the name correctly.

<figure><img src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXe7oG5Ei8h14X5FyhanDsGLCZyPGLuBd7sr56M-UDTMj92GCNnQeXf-ZC5_8EBmHDHeTP5woKGoWwIGIUVmsahuJmCTKH8lQv5DPjRVtglG8yve8vpQhMNF6EOtFUNB6uiYyQJ-2Q?key=xS65XOd58rPJOYVnOh8lJEX0" alt=""><figcaption></figcaption></figure>

***

## **How to integrate**

### **Step 1: Fill in your Freshworks information in Sendbird**

Now, open your Sendbird AI agent's dashboard and go to **Workspace settings > Integration > Freshworks**.

1. Fill out the credentials fields on the page. Information required for each field can be found in your **Freshworks dashboard**.

<figure><img src="../../.gitbook/assets/Screenshot 2025-04-16 at 3.41.42 PM.png" alt=""><figcaption></figcaption></figure>

**API details**

<table><thead><tr><th width="189.88671875">Field</th><th>Description</th></tr></thead><tbody><tr><td>API Key</td><td>Credentials for authenticating API requests. Go to <strong>Admin Settings > Marketplace and Integrations > API > API Settings</strong> in Freshworks dashboard.</td></tr><tr><td>Chat URL</td><td>The specific endpoint used to access Freshworks resources via API requests. This can be found right below the <strong>API Key</strong> in Freshworks dashboard.</td></tr></tbody></table>

<figure><img src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXfd8-NKKRAfVEHLixzldHtMw7kv1h9bz4Fp_QTSNkXPDx7ZzhlUiLNC5in9pt44Q_ZYqOeMsI5BYMx4ZIQpCKEs4yDZa_AXb-I3te8KKTH0N_TdkLo9DctrTHtcDZ9Z_di_57g-1A?key=xS65XOd58rPJOYVnOh8lJEX0" alt=""><figcaption><p>API key and chat URL in Freshworks' Personal settings</p></figcaption></figure>

#### **Webhooks**

<table><thead><tr><th width="190.19140625">Field</th><th>Description</th></tr></thead><tbody><tr><td>Webhook URL</td><td>The webhook URL to listen to events happening in Freshworks. Copy this URL and paste it into the Webhook field under Admin Settings > Marketplace and Integrations > Webhooks on Freshworks dashboard.</td></tr><tr><td>Authentication</td><td>To authenticate AI agent’s calls to your Freshworks account, copy the header of your Freshworks account and paste it into Sendbird dashboard.</td></tr></tbody></table>

<figure><img src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXeYtexm0EgQP0ZSGr385MjKGDtElCMSgRkop2BXJyd8wBRtWM_qUB77c_j2gYI6k6wXUg2WZJiEtFwgz_lO4b53uXJrJ2gxVGbptKRU53LNHBk9AznVN5S-TEc08UY9HuyC0iaWkQ?key=xS65XOd58rPJOYVnOh8lJEX0" alt=""><figcaption><p>Webhook in Freshworks' Admin settings</p></figcaption></figure>

### Step 2: Click Connect

Once you have finished retrieving the required information for the Freshworks integration, click **Connect** at the top of the browser.

You will then see a confirmation label on the **Freshworks** tile indicating that the integration has been successfully established.

<figure><img src="../../.gitbook/assets/image (58).png" alt="" width="326"><figcaption></figcaption></figure>

### **Step 3: Test the conversation handoff**

Once connected, you can try out a handoff on our AI agent widget.

1. Go to **Build > Conversation settings > Transfer to human agent** and select **Freshworks** for a handoff platform.
2. Start a conversation on the AI agent widget in Sendbird AI agent dahsboard.
3. Then click on the **Handoff** button to transfer the conversation to Freshworks.
4. See the summary of the AI agent conversation successfully transferred to the Freshworks ticket.
