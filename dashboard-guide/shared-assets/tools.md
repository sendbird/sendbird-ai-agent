# Tools

Tools let you connect external APIs to your AI agent, enabling it to retrieve or send data dynamically during a conversation. For example, you can validate a credit card, check membership status, or pause a subscription using tools. These tools are shared assets managed at the workspace level and can be used within Actionbooks to automate workflows.

<figure><img src="../../.gitbook/assets/CleanShot 2025-05-16 at 17.50.35@2x.png" alt=""><figcaption></figcaption></figure>

***

## Creating a tool

1. Go to **Workspace settings > Shared assets > Tools**.
2. Click **Add tool** + in the top-right corner.
3. Fill out the following fields:

<figure><img src="../../.gitbook/assets/스크린샷 2025-09-09 오후 2.46.06.png" alt=""><figcaption></figcaption></figure>

### **Basic information**

<table><thead><tr><th width="240.8203125">Field</th><th>Description</th></tr></thead><tbody><tr><td>Tool name</td><td>Name your tool using only letters and underscores (e.g., <code>cancel_membership</code>).</td></tr><tr><td>Backup response</td><td>(Optional) Enter a backup response for when the tool fails to work, helping keep the conversation smooth.</td></tr><tr><td>Loading message</td><td>(Optional) A message displayed while the request is being processed (e.g., Retrieving your data...)</td></tr><tr><td>Use mock response</td><td>(Optional) Enable this for testing. The tool will return a predefined response, regardless of the actual request.</td></tr></tbody></table>

### **Header**

Add custom headers if your API requires authentication or specific content types.

<figure><img src="../../.gitbook/assets/스크린샷 2025-09-09 오후 2.46.20.png" alt=""><figcaption></figcaption></figure>

### **Method & URL**

* HTTP method: Choose `POST`, `GET`, `PUT`, `PATCH`, `DELETE`
* URL: Add your endpoint URL.

<figure><img src="../../.gitbook/assets/스크린샷 2025-09-09 오후 2.47.59.png" alt=""><figcaption></figcaption></figure>

### Request body

You can pass additional information to your API endpoint using **parameters** in the URL or request body. Follow the steps below to add and configure them.

The AI agent automatically uses the tool’s response to generate the most relevant answer based on context and instruction.

* **Add parameter**: Click the **Add +** icon to insert parameters into the URL.

<figure><img src="../../.gitbook/assets/스크린샷 2025-09-09 오후 2.46.36.png" alt=""><figcaption></figcaption></figure>

#### **Types of parameters you can insert**

<table><thead><tr><th width="197.35546875">Type</th><th>Description</th><th>Example usage</th></tr></thead><tbody><tr><td><strong>Static value</strong></td><td>Extracted from the user’s message using AI prompts</td><td><code>{city}</code>, <code>{orderNumber}</code>, <code>{trackingId}</code></td></tr><tr><td><strong>Conversation ID</strong></td><td>The unique ID of the current Sendbird conversation</td><td>Useful for logging or reference in CRM</td></tr><tr><td><strong>User ID</strong></td><td>Sendbird's internal user ID</td><td>For user-specific API lookups</td></tr><tr><td><strong>User email</strong></td><td>The user’s registered email</td><td>Lookup orders, accounts, or subscriptions</td></tr><tr><td><strong>User phone number</strong></td><td>Pulled from Sendbird’s user profile</td><td>Identity verification or record search</td></tr><tr><td><strong>Context object</strong></td><td>Custom key-value pairs of additional user-specific or session-specific data.</td><td>E.g., <code>{savedAddress}</code>, <code>{selectedProduct}</code></td></tr></tbody></table>

***

## Testing the tool

<figure><img src="../../.gitbook/assets/CleanShot 2025-05-16 at 17.58.58@2x.png" alt=""><figcaption></figcaption></figure>

You can test your tool directly on the dashboard:

1. Provide test values for dynamic parameters.
2. Click **Send request** to check if the tool works properly.
3. Once confirmed, click **Save** to finalize.

***

## Using tools in actionbooks

After saving, you can [insert the tool in any actionbook](actionbooks/#writing-actionbook-instructions).

1. Inside an Actionbook, click `/Tool` .
2. Select the tool you created.
3. The tool will be called when the AI agent reaches that step of the actionbook.
