# How to optimize your knowledge

Documents in Knowledge are key sources of information when Sendbird AI Agents handle customer inquiries. This guide explains the way the AI Agents digest the articles and offers tips to optimize your content for AI Agents. The tips below will ensure that your AI Agents properly understand your content, retrieve accurate information, and generate better responses, enhancing customer experience.

Here are some tips to refine your knowledge bases to optimize the AI agent's performance.

{% hint style="success" %}
See [our tutorial on actionbook](actionbook-best-practices.md) specifically dealing with ways to build an optimal workflow for your AI agent.
{% endhint %}

***

## Tip 1: Write Simple and Clear

### 1. Use Simple, Direct Language

Make your content direct and simple. To do so:

* Keep your paragraphs short and simple, focusing on one specific topic per paragraph.
* Use full sentences for clear information.
* Avoid a one-word answer that starts and ends only with “yes” or “no”. Provide detailed information or instructions to follow.
* Use plain language and skip technical jargons, slangs, and complex terms.

{% hint style="danger" %}
**Avoid**\
Question: Is the new software compatible with older operating systems?\
Answer: No.
{% endhint %}

{% hint style="success" %}
**Best practice**\
Question: Is the new software compatible with older operating systems?\
Answer: Yes, the new software is fully compatible with operating systems released in the last five years, including Windows 10 and macOS Ventura.
{% endhint %}

### 2. Define Key Terms and Spell Out Acronyms

Spell out acronyms and define technical terms the first time they appear. This prevents confusion and helps AI Agents understand the document better. To do so:

* On the first use, write the full term followed by the acronym in parentheses.
* Use the acronym consistently after it's been defined.
* Define uncommon or domain-specific terms in plain language.

{% hint style="danger" %}
**Avoid**\
The car's ECU is faulty.
{% endhint %}

{% hint style="success" %}
**Best practice**

The car's Electronic Control Unit (ECU) is faulty.
{% endhint %}

### 3. Provide Context

Always provide enough background and context so that any piece of information makes complete sense on its own. Write as if the reader hasn't seen any other part of the document.

{% hint style="danger" %}
**Avoid**\
The new feature, which we discussed last week, is now available.
{% endhint %}

{% hint style="success" %}
**Best practice**

The new 'Dark Mode' feature is available, starting today, August 1, 2025, for all users. To activate it, navigate to your profile settings and select 'Display Preferences'.
{% endhint %}

{% hint style="danger" %}
**Avoid**\
Please review the report from last month.
{% endhint %}

{% hint style="success" %}
**Best practice**\
To understand the financial performance for the last quarter, refer to the 'Q3 Earnings Report' which details revenue, expenses, and net profit margins for July, August, and September.
{% endhint %}

### 4. Explain Processes Thoroughly

Break down complex procedures, instructions, or concepts into small, easy steps. If calculations or technical details are involved, always include clear examples of how they are done.

{% hint style="danger" %}
**Avoid**\
To create a new user profile, click the 'Add User' button and fill in the details.
{% endhint %}

{% hint style="success" %}
**Best practice**\
\- To create a new user profile:

1. Navigate to the 'Admin Panel' from the main dashboard.
2. Click on the 'Users' tab in the left-hand navigation menu.
3. Locate and click the 'Add New User' button.
4. A form will appear. Fill in the required fields: 'Username', 'Email Address', and 'Password'.
5. Select the desired 'User Role' from the dropdown menu (e.g., Administrator, Editor, Viewer).
6. Click 'Save' to confirm the new user profile. A success message will confirm the creation."
{% endhint %}

### 5. Include Common Variants of Key Information

AI Agents may not recognize all possible ways of writing the same information. To ensure information is easily found, include common alternative formats for important details, especially for specific terms.

{% hint style="success" %}
**Best practice**

* For Terms: If using a specific product name, consider including common abbreviations or alternative spellings if they are widely used (e.g., "Artificial Intelligence" and "AI").
{% endhint %}

### 6. Use Consistent Terminology

Use the same words and phrases consistently for the same concepts, features, or processes throughout your document. Avoid using different terms when referring to the same concept or object.

{% hint style="danger" %}
**Avoid**\
Our platform uses 'client accounts' for individuals, but sometimes we refer to them as 'user profiles' or 'customer dashboards'.
{% endhint %}

{% hint style="success" %}
**Best practice**\
Always refer to individual user access points as 'client accounts' throughout all documentation.
{% endhint %}

### 7. Anticipate User Search Terms

Think about how users might search for your content. Include keywords and phrases they would naturally use when looking for information, incorporating them smoothly into your writing.

{% hint style="danger" %}
**Avoid**\
An article solely focusing on "device setup" when frequent search terms include "how to connect my new gadget."
{% endhint %}

{% hint style="success" %}
**Best practice**\
Include phrases like “connecting your new gadget” or “initial device configuration” to match common user queries when producing an article on device setup.
{% endhint %}

***

## Tip 2: Keep Content Relevant

Conduct a regular review and maintain your documents up to date to ensure all information stays accurate and current. Remove any outdated content instead of just striking through as AI Agents won’t notice such formatting. If the content update becomes frequent, add a note indicating the last updated date.

{% hint style="danger" %}
**Avoid**\
Our software supports Windows 7. (Even though Windows 7 is no longer supported).
{% endhint %}

{% hint style="success" %}
**Best practice**\
Before publishing, verify that all system requirements, feature descriptions, and procedural steps are up-to-date with the current version of the software or policy.\
Note: Last updated on August 1, 2025. This guide reflects the current features as of this date.
{% endhint %}

***

## Tip 3: Structure Your Content

### 1. Organize Content with Headings

Use headings to organize your document into clear sections and subsections. Follow a consistent hierarchy (e.g., main heading, then sub-heading). Make their title descriptive and brief, showing what's in the section. We recommend the following:

* Always put text right after a heading and don't stack headings.
* Avoid too many headings. A heading should cover a significant amount of content.

{% hint style="success" %}
**Best practice**

* Getting Started with Your Account
  * This section explains how to set up your new account and begin using our services, covering everything from initial registration to your first login.
* Creating Your Profile
  * Follow these steps to complete your user profile, ensuring all necessary information is accurately entered for a personalized experience.
* Updating Contact Information
  * You can easily modify your contact details within the profile settings at any time. This includes your email address, phone number, and mailing address.
{% endhint %}

### 2. Break Down Information into Lists and Bullet Points

Use bullet points when presenting features, requirements, or any unordered items. For step-by-step instructions, sequences, or ordered procedures, number each step for smooth flow. Make sure each list item is concise and focused on a single distinct topic.

{% hint style="danger" %}
**Avoid**\
Our product offers several benefits, such as improved battery life, a lighter design for portability, and enhanced processing speed for demanding tasks.
{% endhint %}

{% hint style="success" %}
**Best practice**

* Our product offers several key advantages:
  * Extended battery life for prolonged use.
  * Lightweight design for easy portability.
  * Faster processing speed for complex operations.
{% endhint %}

### 3. Provide Text Descriptions for Visuals

When AI Agents process documents, all visual formatting (like bolding, strike-through, or special layouts) is removed. AI Agents interpret documents in their plain text form, extracting information based on content and organization. Therefore, it's crucial to organize your information clearly and logically using characters, spaces, and line breaks. Design your documents with how AI Agents will process them in mind for optimal results.

Similarly, when documents are processed, the system prioritizes textual content, entirely disregarding visual elements such as images, videos, charts, and diagrams. This ensures the focus remains solely on the written information, optimizing for text-based analysis and data retrieval.

### 4. Define Document Scope

State what your document covers in the beginning. Also, specify what specific topics or areas it does not cover.

{% hint style="danger" %}
**Avoid**\
Starting a document without any introductory statement about its purpose or boundaries.
{% endhint %}

{% hint style="success" %}
**Best practice**\
“This guide provides instructions for setting up your new account and managing basic profile settings. It does not cover advanced features or troubleshooting for specific technical issues.”
{% endhint %}

***

## Tip 4: Create Effective Tables

### 1. Use Simple, Consistent Table Structures

Ensure data is organized into distinct rows and columns. Employ uniform spacing or delimiters (e.g., pipes |) to separate columns. Each row should represent a single entry, with each cell containing unique information. For data in the table, do the following:

* Keep the column headings of your table short and simple.
* Clearly label the data, including relevant units or symbols (e.g., %, $).
* Consider writing tables in markdown format for clarity and ease of use.

{% hint style="danger" %}
**Avoid (Inconsistent spacing, hard for AI Agents to process)**\
Product Price Availability\
Laptop $1200 In Stock\
Monitor $300 Low Stock\
Keyboard $75 Out of Stock
{% endhint %}

{% hint style="success" %}
**Best practice (in MarkDown)**\
|Product | Price | Availability|\
\|--------|------|-----------|\
\| Laptop | $1200 | In Stock |\
\| Monitor | $300 | Low Stock |\
\| Keyboard | $75 | Out of Stock |
{% endhint %}

### 2. Avoid Merged Cells

Never combine or merge cells across rows or columns in tables. Each cell must contain distinct information and clearly belong to one row and one column.

{% hint style="danger" %}
**Avoid (Visually Merged Cells)**\
Category | Item\
\-------------- | --------------\
Home Goods | Sofa\
\| Lamp\
Electronics. | TV\
\| Phone
{% endhint %}

{% hint style="success" %}
**Best practice (Clearly Structured Data)**\
Category | Item\
\------------|----------\
Home Goods | Sofa\
Home Goods | Lamp\
Electronics | TV\
Electronics | Phone
{% endhint %}

## Conclusion

For AI Agents to give accurate answers, your documents must be clear and well-structured.

By following these guidelines, you'll create documents that are easy for not only AI Agents but also humans to use, transforming them into powerful resources for precise and valuable information.

\\
