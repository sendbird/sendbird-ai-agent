# Knowledge

**Knowledge** lets you build and manage a centralized knowledge base to power your AI agents. It acts as a **shared asset** at the workspace level, meaning all agents in the same workspace can access the same knowledge content. However, each agent can individually enable or disable specific knowledge sources to suit their use case.

***

## What is knowledge?

Knowledge consists of various content sources your AI agent uses to generate accurate and relevant responses. You can upload content manually or sync from external platforms.

### Supported knowledge types

* Files — Upload text-based files.
  * Supported file format: `json`, `txt`, `md`, `pdf`, `xlsx`, `xls`, `docx`, `doc`, `pptx`, `ppt`
* Snippets — Manually add quick facts or guidance.
* Websites — Import subpages from a main URL.
* Integrations — Sync from Salesforce, Confluence, Sprinklr, Zendesk
* _(Coming soon: Notion, Google Drive)_

{% hint style="info" %}
Integrations must first be configured under **Workspace settings > Integrations**.
{% endhint %}

***

## Where knowledge lives

Knowledge is a shared asset created and managed at the **workspace level**, but it can be selectively enabled or disabled per AI agent. This two-level setup allows you to centrally manage knowledge while still tailoring usage per agent without duplicating content.

#### 1. Workspace-level (Shared asset)

* Found in **Workspace settings > Shared assets > Knowledge**.
* Add, edit, sync, delete all contents.
* Assign country and language tags for each knowledge.
* Acts as the central repository for the entire workspace.

<figure><img src="../../.gitbook/assets/image (10) (1).png" alt=""><figcaption></figcaption></figure>

#### 2. Agent-level (per AI agent)

* Found in **AI agent (Development) > Build > Knowledge**.
* Enable or disable knowledge items for each AI agent.
* Useful when AI agents need different scopes of knowledge.

***

## Why use a shared knowledge base?

* Easier maintenance — One update applies to all agents.
* Consistency - Everyone references the same information.
* Reduced duplication — No need to create content repeatedly.
* Unified experience — End-users receive consistent answers across channels and AI agents.

***

## Adding a new knowledge

<figure><img src="../../.gitbook/assets/CleanShot 2025-05-16 at 13.19.09 (1).gif" alt=""><figcaption><p>How to add a snippet in Knowledge</p></figcaption></figure>

1. Go to **Workspace settings > Knowledge.**
2. The Knowledge tiles are divided in to two sections: **In use** and **Not in use**. If you wish to add more data types, go to [Workspace settings > Integration](../integrations/) and enable the feature.
3. Among **In use** content types, choose a content type: File, Snippet, Website, or 3rd-party Integration.
4. Set **Availability**:
   * **All countries**: The content is available to users in all countries.
   * **Specific countries**: Limit content based on user location.
5. Set the **language**: Define the primary language of the content.
6. Save the knowledge entry.

Once saved, go to **AI agent > Build > Knowledge** to enable or disable the entry for each specific agent.

{% hint style="info" %}
Any changes must be **deployed** to apply in the Production environment.
{% endhint %}

***

## Managing knowledge updates

Edits to knowledge content follow shared asset rules and apply at the workspace level, but with agent-level usage restrictions:

### **Save**

* Changes to a knowledge item are immediately saved and applied to all agents in the **Development environment**.
* You must **deploy** changes for them to affect the **Production** environment.

### **Sync**

* Syncing fetches the latest version of an external knowledge source (e.g., website or integration).
* This updates the content across all agents in the **Development environment** and may take a few minutes to complete.

### **Delete**

*   **If the knowledge is enabled by any agent**, it **cannot be deleted**. You’ll need to disable it in each agent first by going to:

    > `AI agent > Build > Knowledge`
* **If no agents are using the knowledge**, it can be deleted, and it will no longer be available in the **Development environment**.

***

## Testing knowledge

You can simulate how your Knowledge works using the built-in **tester** on the right panel:

1.  Select test **agent**, **user**, **country**, **language,** and **context objects.**

    These are information used to simulate user-specific conditions and evaluate how the AI agent responds in realistic, production-like scenarios.

{% include "../../.gitbook/includes/tester-fields.md" %}

2. **Save** your configuration.
3. Test to see how your AI agent responds using the current knowledge.
