# CSAT

Customer satisfaction (CSAT) survey helps you improve the overall user experience with Sendbird AI agent by monitoring and managing the agent's performance and interaction with users. At the end of every conversation, you can send out a resolution feedback (CRE) and CSAT survey to users and collect in-depth feedback using follow-up questions. The CSAT page under Build enables you to customize the survey to your service needs.

Go to **Build > CSAT** in Sendbird AI agent dashboard to get started with a customizable CSAT survey.

{% hint style="warning" %}
Such customization can be applied to [Messenger](channels/messenger/) and [Email](channels/email.md) channels only. If you wish to update the survey question for other channels such as [SMS](channels/sms.md) and [WhatsApp](channels/whatsapp.md), go to **Build >** **Channels** and configure the settings for each channel type. CSAT survey isn't supported in Voice channels.
{% endhint %}

<figure><img src="../../.gitbook/assets/image (104).png" alt=""><figcaption></figcaption></figure>

***

## Prerequisites

For seamless customer experience for your users, you must have the following:

* The latest version of Sendbird AI agent SDK in your client app.

***

## How to customize

This guide walks you through the customization process for a CSAT survey.

1. Log in to [Sendbird AI agent dashboard](https://dashboard.sendbird.com).
2. Select a **Development** agent from the AI agent list.
3. After choosing an AI agent to set a CSAT survey for, navigate to **Build > CSAT** in the left menu bar.
4. Then, activate the feature.

<figure><img src="../../.gitbook/assets/image (102).png" alt=""><figcaption></figcaption></figure>

{% hint style="info" %}
Once this feature is enabled:

* A new customizable CSAT survey will replace the current survey.
* Data already collected from the current survey will remain and continue to be reflected in your metrics.
{% endhint %}

5. Once the feature is enabled, you can start customizing the survey as follows:

### Language

You can select a language in which the survey will be sent. The language used for this survey should match the language set to the test widget. Otherwise, the tester won't work properly.

### Survey type

There are two types of feedback survey for AI agent: customer **customer resolution evaluation (CRE)** and **customer satisfaction (CSAT)** **survey**. You can choose whether you want to ask both or just CSAT once the conversation is closed.

* CRE and CSAT
* CSAT only

#### Resolution feedback (CRE) survey

The CRE is a survey asking users whether their inquiries have been resolved by AI agent. In this survey, you can customize:

* Question
* Positive feedback text
* Negative feedback text

<figure><img src="../../.gitbook/assets/image (99).png" alt="" width="563"><figcaption></figcaption></figure>

#### CSAT survey

The CSAT survey asks users to rate the service provided by AI agent on a scale of one to five, where one is the worst and five the best. Here, you can customize:

* Question
* Rating icon
* Rating description text
* Follow-up questions by rating

<details>

<summary>What is a follow-up question?</summary>

A follow-up question is a conditional query that can be asked when the user selects a certain response option for the CSAT survey. Here's how to create a follow-up.

1. Select the rating conditions for **If ranting is**. Then, add your question to the box next to **ask**.
   1. Take the screenshot below as an example. If a user rates their satisfaction with one of **1**, **2**, and **3**, they will be asked "What were you dissatisfied with?"
2. Select response type and add response options. The response type can be either a single answer or a paragraph. For single-answer questions, up to five options are allowed.
3. Determine whether the follow-up question will be required or optional. If required, check the **Required** box in the top-right corner of the section.

<figure><img src="../../.gitbook/assets/image (106).png" alt="" width="563"><figcaption></figcaption></figure>

{% hint style="info" %}
The default CSAT survey includes one open-ended follow-up question for all rating options.\
Each rating can have only one follow-up question. To customize follow-ups per rating, change the question conditions.
{% endhint %}

</details>

<figure><img src="../../.gitbook/assets/image (105).png" alt="" width="563"><figcaption></figcaption></figure>

### Others

Besides the survey's language and content, you can also customize:

* Submit button label: the text for the **Submit** button.
* Confirmation message after submission: the text that will appear after the user clicks **Submit**.

<figure><img src="../../.gitbook/assets/image (101).png" alt="" width="563"><figcaption></figcaption></figure>

***

## Tester preview

On the right side of the survey section, there is **Tester** that shows a preview of the survey. Have a short conversation with AI agent on the tester and close it by clicking the stroke-through bubble button in the top-right corner. Then the CSAT survey you've set on the left panel will appear.

{% hint style="warning" %}
Make sure that the language set to the tester widget matches with the language used for the survey. Otherwise, the tester won't work properly.
{% endhint %}

<figure><img src="../../.gitbook/assets/image (13).png" alt="" width="563"><figcaption></figcaption></figure>

***

## Permission

In Sendbird AI agent dashboard, only the users with a permission can access and manage the CSAT survey settings. If you need to grant the access to certain roles, go to **Organization settings > Roles** and create a new permission set or update an existing set. [See our guide on Roles and permissions](../roles-and-permissions.md) to learn more.

<figure><img src="../../.gitbook/assets/image (90).png" alt="" width="563"><figcaption></figcaption></figure>
