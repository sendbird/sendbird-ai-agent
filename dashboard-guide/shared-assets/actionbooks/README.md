# Actionbooks

**Actionbooks** are structured playbooks that provide AI agents with detailed guidance for handling specific user scenarios. They contain step-by-step instructions that help agents deliver consistent and accurate responses across common support situations like subscription cancellations, order updates, or account inquiries.

Each actionbook can reference other shared assets such as tools, message templates, or even other actionbooks. You can also escalate to a human agent or highlight important steps using feature like handoff and pin.

***

## Where actionbooks live

Actionbooks are a shared asset created and managed at the **workspace level,** but it can be selectively enabled or disabled per AI agent. This two-level setup allows you to centrally manage actionbooks while still tailoring usage per agent without duplicating content.

#### 1. Workspace-level (Shared asset)

* Found in **Workspace settings > Shared assets > Actionbooks.**
* They are shared across all agents in a workspace.
* Add, edit, delete all actionbooks.
* Assign country tags.
* Acts as the central repository for the entire workspace.

<figure><img src="../../../.gitbook/assets/CleanShot 2025-05-16 at 15.42.30@2x.png" alt=""><figcaption></figcaption></figure>

#### 2. Agent-level (per AI agent)

* Found in **AI agent (Development) > Build > Actionbooks**.
* Enable or disable each actionbook for individual AI agents.
* Useful when AI agents need different scopes of actionbooks to follow.
* Changes will only be saved in the Development environment until it is deployed to Production.

***

## Creating an actionbook

Follow the instsructions below to create a workflow that Sendbird AI agent can follow when handling customer inquiries.

{% hint style="success" %}
[Our tutorial ](../../../tutorials/actionbook-best-practices.md)offers the best practices you can refer to when building your own actionbooks.
{% endhint %}

<figure><img src="../../../.gitbook/assets/스크린샷 2025-09-09 오후 2.40.31.png" alt=""><figcaption></figcaption></figure>

1. Go to **Workspace settings > Shared assets > Actionbooks**.
2. Click **Add actionbook +**.
3. Name the actionbook. This name will be used for referencing in other actionbooks.
4. Choose a **Target channel** to apply the new instructions to. Note that you can select only one channel per actionbook. If you wish to apply to multiple channel types, we recommend you create another actionbook dedicated to each channel and copy and paste the rules.
5. Describe **When to use** this actionbook. This helps the system understand when to trigger this actionbook during a conversation.
6. Set country availability:

* **All countries**: This actionbook is applied to users in all countries. The content will be used regardless of the user's country setting.
* **Specific countries:** This actionbook is only applied to users in the countries you specify.

4. Write your **step-by-step instructions**.

***

## Writing actionbook instructions

In the editor, define the step-by-step instructions the AI agent should follow when handling the selected use case. Instructions can be free text or enhanced using slash commands to reference shared assets and insert other functionalities.

Available slash commands (`/`):

* `/Actionbooks` — Link to another actionbook
* `/Tools` — Use a configured tool (e.g., API call)
* `/Message templates` — Insert a predefined message template
* `/Handoff` — Escalate to a human agent
* `/Pin` — Create an anchor by clicking on **Pin,** then use the slash command to jump to that point.

Referencing other shared assets helps you avoid repeating the same logic in multiple places. You can update the asset once, and it will apply wherever it’s used. For more detailed information on actionbook best practices, see the [Actionbook best practices](../../../tutorials/actionbook-best-practices.md) page.

***

## Testing actionbooks

You can simulate how your Actionbook works using the built-in **tester** on the right panel:

1.  Select test **agent**, **user**, **country**, **language,** and **context objects.**

    These are information used to simulate user-specific conditions and evaluate how the AI agent responds in realistic, production-like scenarios.

{% include "../../../.gitbook/includes/tester-fields.md" %}

2. **Save** your configuration.
3. Test your AI agent to see how it responds using the existing actionbooks.

{% hint style="info" %}
If testing is unavailable, make sure the Actionbook is enabled for the selected agent under **AI agent (Dev) > Build > Actionbooks**.
{% endhint %}

***
