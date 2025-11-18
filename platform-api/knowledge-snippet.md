# Knowledge - Snippet

Add and manage [Knowledge snippets](../dashboard-guide/shared-assets/knowledge.md#supported-knowledge-types) through Sendbird Platform API. Snippets in Knowledge are a set of simple question-and-answer pairs you can easily add to your AI agent's data base. AI agents can then access the information and offer users a precise and clear answer in regard to their inquiry.

Snippets can be useful when it comes to:

* Product FAQs
* Company policy
* Dynamic knowledge management
* Exclusive, internal information

You can upload up to 15 files, each 25MB max.

***

## Platform API Authentication

A typical HTTP request to the Chat API includes the following headers for authentication:

### Headers

* `app_id` and `ai_agent_id`: Can be found in Sendbird AI agent dashboard or its URL
* Content-Type: Every request must include a `Content-Type` header.
* Api-Token: Either the master API token or a secondary API token is required for Sendbird server to [authenticate](https://sendbird.com/docs/chat/platform-api/v3/prepare-to-use-api) your API requests.

### Base URL

The base URL used for the Chat API is formatted as shown below:

```
https://api-{app_id}.sendbird.com/v3
```

{% hint style="info" %}
To learn more about how to use Sendbird Platform APIs, see [our guide](how-to-use-platform-api.md).
{% endhint %}

***

## Add a snippet to AI agent's Knowledge

Adds a content snippet to your AI agent's [Knowledge](../dashboard-guide/shared-assets/knowledge.md).

### HTTP request

```
POST https://api-{application_id}.sendbird.com/v3/embeddings
```

### Request body

```json
{
  "source_type": "snippet",
  "question": "How do I reset my password for the internal portal?",
  "answer": "To reset your internal portal password, go to the login page and click the 'Forgot Password' link. Follow the instructions sent to your company email address.",
  "language": "ko",
  "countries": ["US", "KR"],
  "attachment_urls": [
     "https://file_url.com/reset_password.docx",
     "https://file_url.com/user-id_and_password.pptx"
  ],
  "content_url": "https://internal_board_url.com/path/23",
  "snippet_source_key": "https://for_citation.com/citation/23"
}

```

#### Required parameters

<table><thead><tr><th width="220.25390625">Parameter</th><th width="131.3046875">Type</th><th>Description</th></tr></thead><tbody><tr><td>source_type</td><td>string</td><td>Specifies the type of knowledge content format. Valid values are <code>snippet</code>, <code>file</code>, and <code>external</code>. Here, use <code>snippet</code>.</td></tr><tr><td>question</td><td>string</td><td>Specifies the possible question by a user.</td></tr><tr><td>answer</td><td>string</td><td>Specifies the answer that your AI agent must provide to the specified question.</td></tr></tbody></table>

#### Optional parameters

<table><thead><tr><th width="200.16796875">Parameter</th><th width="130.703125">Type</th><th>Description</th></tr></thead><tbody><tr><td>language</td><td>string</td><td>Specifies the language code of the knowledge content in ISO <a href="https://en.wikipedia.org/wiki/IETF_language_tag">BCP-47</a> format, like <code>"en"</code></td></tr><tr><td>countries</td><td>array</td><td>Specifies the countries in which this snippet will be used.</td></tr><tr><td>attachment_urls</td><td>array</td><td>Specifies the public web URL of the file attachment, if any.</td></tr><tr><td>content_url</td><td>string</td><td>Specifies the URL of the snippet if this was from an internal platform. This will be displayed in the Embedding details view in Sendbird AI agent dashboard.</td></tr><tr><td>snippet_source_key</td><td>string</td><td>Specifies the citation link or key of the reference used for this content. AI agent will log this as their source.</td></tr></tbody></table>

### **Response**

**If successful, it returns a snippet resource in the response body.**

```json
{
  "source_type": "snippet",
  "question": "How do I reset my password for the internal portal?",
  "answer": "To reset your internal portal password, go to the login page and click the 'Forgot Password' link. Follow the instructions sent to your company email address.",
  "language": "ko",
  "countries": ["US", "KR"],
  "attachment_urls": [
     "https://file_url.com/reset_password.docx",
     "https://file_url.com/user-id_and_password.pptx"
  ],
  "content_url": "https://internal_board_url.com/path/23",
  "snippet_source_key": "https://for_citation.com/citation/23"
}
```

***

## **Update a snippet**

Updates the content of the snippet.

### HTTP request

```
PUT https://api-{application_id}.sendbird.com/v3/embeddings/{embedding_key}
```

### Request body

```json
{
  "question": "What is the updated process for password resets on the portal?",
  "answer": "The updated process requires using the 'Forgot Password' link on the login page and verifying your identity via MFA (Multi-Factor Authentication) before receiving the reset email.",
  "language": "ko",
  "countries": ["US", "KR"],
  "attachment_urls": [
     "https://file_url.com/reset_user-information.docx"
  ],
  "content_url": "https://internal_board_url.com/path/23",
  "snippet_source_key": "https://for_citation.com/citation/23"
}

```

#### Required parameters

<table><thead><tr><th width="220.25390625">Parameter</th><th width="131.3046875">Type</th><th>Description</th></tr></thead><tbody><tr><td>question</td><td>string</td><td>Specifies the revised question for the snippet.</td></tr><tr><td>answer</td><td>string</td><td>Specifies the answer that your AI agent must provide to the specified question.</td></tr></tbody></table>

#### Optional parameters

<table><thead><tr><th width="200.16796875">Parameter</th><th width="130.703125">Type</th><th>Description</th></tr></thead><tbody><tr><td>language</td><td>string</td><td>Specifies the language code of the knowledge content in ISO <a href="https://en.wikipedia.org/wiki/IETF_language_tag">BCP-47</a> format, like <code>"en"</code></td></tr><tr><td>countries</td><td>array</td><td>Specifies the countries in which this snippet will be used.</td></tr><tr><td>attachment_urls</td><td>array</td><td>Specifies the public web URL of the file attachment, if any.</td></tr><tr><td>content_url</td><td>string</td><td>Specifies the URL of the snippet if this was from an internal platform. This will be displayed in the Embedding details view in Sendbird AI agent dashboard.</td></tr><tr><td>snippet_source_key</td><td>string</td><td>Specifies the citation link or key of the reference used for this content. AI agent will log this as their source.</td></tr></tbody></table>

### **Response**

**If successful, it returns a snippet resource in the response body.**

```json
{
  "id": 12345,
  "key": "05c4260c38c446908c736b704bd683ba",
  "source_type": "snippet",
  "snippet": {
        "snippet_question": "What is the updated process for password resets on the portal?",
        "snippet_answer": "The updated process requires using the 'Forgot Password' link on the login page and verifying your identity via MFA (Multi-Factor Authentication) before receiving the reset email."
  },
  "language": "ko",
  "countries": ["US", "KR"],
  ...,
  "is_readonly_for_dashboard": true,
  "attached_files": [
        {
            "origin_url": "https://sendbird.s3.ap-southeast-1.amazonaws.com/example.docx",
            "file_info_id": 1694027,
            "file_name": "02.PII_protection_policy_v1.3.docx",
            "error_message": null,
            "content_url": "https://s3.ap-northeast-2.amazonaws.com/no1/3545/upload/l/5b14a7e7a2bf4413830579eda5c21d50.json?",
            "indexed_file_info_id": 1694029
        },
        {
            "origin_url": "https://sendbird.s3.ap-southeast-1.amazonaws.com/example.pptx",
            "file_info_id": 1694028,
            "file_name": "SI_general_regulation-24-01.pptx",
            "error_message": null,
            "content_url": "https://s3.ap-northeast-2.amazonaws.com/no1/3545/upload/l/8d449daf91a14395b8c5ea81a541af65.json?",
            "indexed_file_info_id": 1694030
        }
    ],
    "content_url": "https://internal_board_url.com/path/23",
}
```

***

## Delete a snippet from AI agent's Knowledge

Deletes the snippet from AI agent's knowledge. Once deleted, the agent can't refer to the content any longer.

### HTTP request

<pre><code><strong>DELETE https://api-{application_id}.sendbird.com/v3/embeddings/{embedding_key}
</strong></code></pre>

#### Required parameters

<table><thead><tr><th width="154.08984375">Parameter</th><th width="124.84765625">Type</th><th>Description</th></tr></thead><tbody><tr><td>embedding_key</td><td>string</td><td>Specifies the unique key of the snippet to delete.</td></tr></tbody></table>

### Response

If successful, this action returns an empty body.
