# How to evaluate AI agent responses

The purpose of this guide is to establish clear standards for how human evaluators should assess conversations between an AI Agent and end users. These evaluations help ensure the AI Agent consistently represents the brand, provides accurate and clear information, and follows an appropriate reasoning path when handling customer inquiries.

***

## Roles

Based on your role in the dashboard, admins and evaluators can perform the following:

* Admin: Assign members an evaluator role, set their language preference, review the evaluation results, redo the evaluation
* Evaluator: view a list of conversations to evaluate, evaluate AI agent responses, view evaluation results, redo the evaluation

***

## Guide for admin

### How to assign evaluators by language

Admins can grant an evaluator role to dashboard users and set their conversation languages to determine which conversations they need to evaluate. Follow the instructions below to grant the role and assign conversations by their language.

1. Log in to the [**Sendbird AI agent dashboard**](https://dashboard.sendbird.com/auth/signin?next=/).
2. On the dashboard home, review the list of **AI agents** created under your account.
3. Click the **Development** AI agent card to open. The **Development** agent is where you will review all test conversations and provide feedback for changes prior to production deployment.

<figure><img src="../../../.gitbook/assets/스크린샷 2025-09-23 오후 4.50.31.png" alt=""><figcaption></figcaption></figure>

4. In the AI agent view, go to **Workspace settings > General**. Unlike general agents, users with an **Admin** role can access all menus in the dashboard.
5. In the left menu, navigate to **Evaluators**.
6. Click **Add evaluator +** in the top-right corner of the screen. When a pop-up appears, you can assign an Evaluator role to other dashboard users with the following settings:
   1. Select **Evaluator**.
   2. Choose **Conversation language**.
      1. To limit an evaluator to a specific language, pick a set of languages.
      2. To allow evaluation of all conversations, choose **All languages**.

<figure><img src="../../../.gitbook/assets/스크린샷 2025-09-23 오후 4.51.45.png" alt=""><figcaption></figcaption></figure>

7. Click **OK** to return to the evaluator list.

### Manage evaluation results

Once evaluators completed their rating, you can see the results in the **Conversations** page. Navigate to **Evaluate > Conversations** to see the results summary or click one of the conversations to see the details. If needed, you can also edit the evaluation scores.

<figure><img src="../../../.gitbook/assets/image (98).png" alt=""><figcaption></figcaption></figure>

1. In the left menu bar, go to **Evaluate > Conversations**. The page will show you the list of all conversations that AI agent has conducted.
2. You can reorganize and sort the conversation list using the filters at the top of the screen. The filters below can be handful in terms of AI agent evaluation:
   1. **Evaluators**
   2. **Evaluation result**
   3. **Language**
   4. **Category**
3. If you wish to edit the evaluation result of a conversation, navigate to the conversation view. You will see the **Edit** button at the top-right corner of the screen in the conversation view. Click it and make changes needed. Then **Submit**.

<figure><img src="../../../.gitbook/assets/image (3).png" alt="" width="563"><figcaption></figcaption></figure>

***

## Guide for evaluator

Evaluators will be assigned to conversations by the languages set for them. Go to Evaluate > Conversations and see the list of conversations assigned to you. Once clicking on a conversation, you can submit your evaluation or update the ratings of the evaluation you've submitted before.

1. Log in to the [**Sendbird AI agent dashboard**](https://dashboard.sendbird.com/auth/signin?next=/).
2. On the dashboard home, review the list of **AI agents** created under your account
3. Click the **Development AI agent** card to open. Evaluators will be able to see the list of AI agents they can review.
4. In the **Conversations** view, evaluators can see a list of conversation available.
5. Turn on the **View my evaluations** toggle to see conversations assigned to or evaluated by you. The screenshot below shows a list of conversations assigned to the evaluator **Paul Rogers**.

<figure><img src="../../../.gitbook/assets/image (7).png" alt=""><figcaption></figcaption></figure>

6. Select one of the conversations in the list to evaluate AI agent's responses.

<details>

<summary>What's in the Conversation view</summary>

<figure><img src="../../../.gitbook/assets/image (8).png" alt=""><figcaption></figcaption></figure>

<table data-header-hidden><thead><tr><th width="147.07421875"></th><th></th></tr></thead><tbody><tr><td><strong>Layout</strong></td><td><strong>Description</strong></td></tr><tr><td>Left panel</td><td>A list of conversations assigned to the evaluator.</td></tr><tr><td>Center panel</td><td><p>A conversation view that displays all the messages exchanged between AI agent and the user.</p><ul><li>Grey bubble: AI agent's message. <strong>AI agent activity log</strong> will appear at the bottom of the bubble. This section logs the Knowledge sources used when generating the response.</li><li>Purple bubble: the user's message</li><li><strong>Show all logs</strong> toggle: expands the <strong>AI agent activity log</strong> that lists the <strong>Knowledge</strong> sources referenced by AI agent.</li></ul></td></tr><tr><td>Right panel</td><td><p>This panel is divided in to two sections:</p><ul><li>Top: the <strong>Evaluation</strong> section. Evaluators can rate each criterion with either <strong>Good</strong> or <strong>Bad</strong> and leave a comment in regard to the AI responses.</li><li>Bottom: the detailed information about the conversation. It contains the conversation summary, user sentiment, language settings, category, and more.</li></ul></td></tr></tbody></table>

</details>

7. Start rating the AI messages by criterion in the **Evaluation** section in the top-right area of the screen.
8. In the **Evaluation** section, rate each item by clicking **Good** or **Poor**, then submit your evaluation by clicking **Submit** or pressing a keyboard shortcut (Command/Ctrl + Enter). Assigned evaluators can edit scores after submission.

<figure><img src="../../../.gitbook/assets/image (9).png" alt="" width="563"><figcaption></figcaption></figure>

***

### Keyboard shortcuts

Sendbird AI agent dashboard also offers keyboard shortcuts. Hover over your cursor onto the tool tip on the top right of the screen to see what's available.

* MacBook users:

<figure><img src="../../../.gitbook/assets/image (96).png" alt="" width="302"><figcaption></figcaption></figure>

* Other OS users:

<figure><img src="../../../.gitbook/assets/image (97).png" alt="" width="312"><figcaption></figcaption></figure>

{% hint style="info" %}
The **O** in the shortcut is an alphabet letter.
{% endhint %}

\\
