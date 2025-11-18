# Amazon S3

Sendbird AI agent supports an integration of Amazon S3 bucket as knowledge for your AI agent. This integration allows:

* Leverage objects in Amazon S3 bucket for instant answers: AI Agents can access all dat in the platform. This allows the AI Agent to retrieve relevant articles, FAQs, and documentation when handling user queries, instead of you building it from scratch.

***

## How to integrate

### Step 1: Provide your AWS credentials.

Go to **Workspace settings > Integrations** in Sendbird AI agent dashboard and click on the **Amazon S3** tile. Then fill out the following information:

* **AWS access key ID**
* **AWS secret access key**

{% hint style="info" %}
You can find the IAM user credentials in AWS' IAM console. For more information, see [AWS' guide on how to create new access keys](https://docs.aws.amazon.com/keyspaces/latest/devguide/create.keypair.html).
{% endhint %}

<figure><img src="../../.gitbook/assets/image (75) (1).png" alt=""><figcaption></figcaption></figure>

### Step 2: **Click Connect**

Once you've entered all the required credentials, click **Connect** at the top-right corner of the browser. You will then see a confirmation label on the **Amazon S3** tile indicating that the integration has been successfully established.

<figure><img src="../../.gitbook/assets/image (77).png" alt="" width="326"><figcaption></figcaption></figure>

***

## What's next

### Add Amazon S3 URI as knowledge.

If you have any guideline files in the bucket that your AI agent can reference, go to the [Shared assets > Knowledge](../shared-assets/knowledge.md) menu in the dashboard and add their URI to Sendbird AI agent.
