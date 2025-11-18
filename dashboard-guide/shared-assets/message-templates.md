# Message templates

**Message templates** let you predefine structured messages— such as text, CTA buttons, images, or carousels— that your AI agent can send during a conversation. They are used when you need responses that follow specific wording, formatting, or interaction patterns.

Templates can be created in advance and referenced in **Actionbooks** using slash command (`/`), allowing your agent to deliver consistent, controlled messages across different workflows.

Template types include:

* Text
* Suggested replies
* Images
* CTA buttons
* Carousels

<figure><img src="../../.gitbook/assets/image (86).png" alt="A message template with carousels" width="360"><figcaption><p>A message with carousels</p></figcaption></figure>

***

## Creating a message template

1. Go to **Workspace settings > Shared assets > Message templates**.
2. Click **Add message template +.**
3. Fill in the following fields:

* **Name**: A clear, concise name that describes the purpose of the message template. This name will appear when selecting a message template in an Actionbook using the slash command.
* **Type**: Select the message template type (e.g., text, suggested replies, image, CTA button, or carousel).

{% hint style="info" %}
Once saved, the type cannot be changed.
{% endhint %}

<figure><img src="../../.gitbook/assets/스크린샷 2025-09-09 오후 2.51.32.png" alt=""><figcaption></figcaption></figure>

4. Provide the content specific to the type you selected.

{% hint style="info" %}
For detailed guidance on how to structure each type, see the Template types section below.
{% endhint %}

5. Click **Save**.

Once created, the message template will appear in the message template list.

***

## Template types

Sendbird AI agent supports five template types, each designed for a different message format and use case.

### Text

A simple plain-text message, sometimes referred to as a canned response. Use this when you want the AI agent to send a fixed, predefined message with no buttons or interactive elements.

### Suggested replies

Predefined response options that users can tap or click on to continue the conversation. Useful for narrowing user input and guiding the flow.

<figure><img src="../../.gitbook/assets/image (87).png" alt="" width="360"><figcaption><p>A message with suggested replies</p></figcaption></figure>

The following code snippet demonstrates a sample payload for a message with suggested replies.

#### Sample JSON response

```json
{
    "message_id": 273778850,
    "type": "MESG",
    "custom_type": "subscriptionPlan",
    "channel_type": "group",
    "channel_url": "sendbird_group_channel_6037267_600ddc81a5e23049c804193370d47217fa2ed8ef",
    "extended_message_payload": {
        "suggested_replies": ["Monthly", "Yearly", "Lifetime"]
    },
    ... // more fields...
}
```

### Image

Displays an image in the conversation, typically used for showing product visuals, plan previews, or banners. The image is retrieved dynamically through an external `GET` endpoint.\
When the AI agent calls your image endpoint, it sends the following data in the HTTP request body:

#### **HTTP request**

| Properties                  | Type          | Description          |
| --------------------------- | ------------- | -------------------- |
| `user`                      | nested object | Sendbird user object |
| `user.user_id`              | string        | Sendbird user ID     |
| `ai_agent_context`          | nested object | AI agent context     |
| `ai_agent_context.language` | string        | The language code    |
| `ai_agent_context.country`  | string        | The country code     |
| `ai_agent_context.context`  | nested object | The context objects  |

Your endpoint must return a JSON response in the following format:

#### **HTTP response**

| Properties  | Type   | Description                              |
| ----------- | ------ | ---------------------------------------- |
| `image_url` | string | The image URL to display in the template |

#### **Sample response**

```json
{
    "image_url": "https://yourdomain.com/images/example.png"
}
```

Use the values provided in the **HTTP request body** — such as `user_id`, `language`, `country`, and `context object` — to dynamically determine which image to return. This allows the response to be tailored based on the specific user or scenario.

### CTA button

Displays a Call-to-Action button with custom text that opens a specified URL when clicked or tapped. This is useful for directing users to external pages such as help articles, account settings, or subscription flows.

<figure><img src="../../.gitbook/assets/image (88).png" alt="" width="360"><figcaption><p>A message with a CTA button to a website</p></figcaption></figure>

The following code snippet demonstrates a sample payload for a message with CTA.

#### Sample JSON response

```json
{
    "message_id": 273778828,
    "type": "MESG",
    "custom_type": "subscriptionPlan",
    "channel_type": "group",
    "channel_url": "sendbird_group_channel_6037267_600ddc81a5e23049c804193370d47217fa2ed8ef",
    "extended_message_payload": {
        "cta_button": {
        "label": "Sendbird Pricing",
        "url": "https://company.com/product/pricing"
        }
    },
    ... // more fields...
}
```

### Carousel

Displays a horizontal scrollable set of cards. Each card includes an image, title, description, and a call-to-action button. This is useful for showcasing multiple plans, products, or help topics in a visually rich format.

<figure><img src="../../.gitbook/assets/image (86).png" alt="" width="360"><figcaption><p>A message with carousels</p></figcaption></figure>

When the AI agent calls your carousel endpoint, it sends the following data in the HTTP request body:

#### **HTTP request**

| Properties                  | Type          | Description          |
| --------------------------- | ------------- | -------------------- |
| `user`                      | nested object | Sendbird user object |
| `user.user_id`              | string        | Sendbird user ID     |
| `ai_agent_context`          | nested object | AI agent context     |
| `ai_agent_context.language` | string        | The language code    |
| `ai_agent_context.country`  | string        | The country code     |
| `ai_agent_context.context`  | nested object | The context objects  |

Your endpoint must return a JSON object containing a `carousel_items` array with up to 7 structured cards.

#### **HTTP response**

| Properties                      | Type          | Description                                    |
| ------------------------------- | ------------- | ---------------------------------------------- |
| `carousel_items`                | nested object | An array of carousel card objects              |
| `carousel_items[*].image_url`   | string        | Image shown in each card                       |
| `carousel_items[*].title`       | string        | Title text for each card                       |
| `carousel_items[*].description` | string        | Description text for each card                 |
| `carousel_items[*].cta_label`   | string        | Text shown on the call-to-action button        |
| `carousel_items[*].cta_url`     | string        | URL the button links to when clicked or tapped |

#### **Sample JSON response**

```json
{
  "carousel_items": [
    {
      "image_url": "https://yourdomain.com/images/plans/basic.png",
      "title": "Basic Plan",
      "description": "Watch on 1 screen in SD. Includes limited content access.",
      "cta_label": "Select Basic",
      "cta_url": "https://yourdomain.com/subscribe/basic"
    },
    {
      "image_url": "https://yourdomain.com/images/plans/standard.png",
      "title": "Standard Plan",
      "description": "Watch on 2 screens in HD. Download and watch offline.",
      "cta_label": "Choose Standard",
      "cta_url": "https://yourdomain.com/subscribe/standard"
    },
    {
      "image_url": "https://yourdomain.com/images/plans/premium.png",
      "title": "Premium Plan",
      "description": "4K UHD. Up to 4 devices. No ads. Best for families.",
      "cta_label": "Upgrade to Premium",
      "cta_url": "https://yourdomain.com/subscribe/premium"
    }
  ]
}
```

Use the request data (`user_id`, `language`, `context object`, etc.) to tailor which cards are shown to which users. Support for authentication headers is available if needed.

***

## Managing languages

Each message template can support multiple languages. Adding language variants ensures that users receive responses in their preferred language, without relying on AI translation.

* You can add one or more language versions for each template.
* The AI agent will use the version that matches the user's language setting (based on `language` in the request).
* If no match is found:
  * The default language version will be used as the reference, and
  * The system will apply AI-based translation to generate a localized response.
* At least one language version must always be present.

This setup allows for full control over how your message is delivered in each supported language.

***

## Using templates in Actionbooks

To use a message template in an Actionbook:

1. Open the Actionbook editor.
2. In the step editor, type `/` and select **Message templates**.
3. Choose the template by name.

***

## Editing or deleting templates

* **Edit**: Use the `...` menu next to a template in the list.
* **Delete**: Only available if the template is not currently referenced in any Actionbooks.
