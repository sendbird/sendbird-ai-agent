# How to use Platform API

Sendbird AI agent's Platform API allows you to directly work with data resources related to your Sendbird agent's conversation activities. The APIs use standard `HTTP` protocols where `JSON` payloads are returned in response to the `HTTP` requests. It is internally implemented based on the `RESTful` principles. These APIs allow for more flexibility and adds additional functionalities to your service from the server side.

***

## Authentication

A typical HTTP request to the Chat API includes the following headers for authentication:

### Headers

* `app_id` and `ai_agent_id`: Can be found in Sendbird AI agent dashboard or its URL
* Content-Type: Every request must include a `Content-Type` header.
* Api-Token: Either the master API token or a secondary API token is required for Sendbird server to [authenticate](https://sendbird.com/docs/chat/platform-api/v3/prepare-to-use-api) your API requests.

The following snippet demonstrates a sample request body in shell.

```sh
curl -X POST "https://api-{your_app_id}.sendbird.com/v3/embeddings" \
  -H "Api-Token: {your_api_token}" \
  -H "Content-Type: application/json; charset=utf8" \
  -d '{
    "source_type": "snippet",
    "question": "How do I reset my password?",
    "answer": "Go to the login page and click 'Forgot Password'.",
    "language": "en",
    "countries": ["US", "KR"],
    "attachment_urls": [
       "https://file_url.com/reset_password.docx",
       "https://file_url.com/user-id_and_password.pptx"
    ],
    "content_url": "https://internal_board_url.com/path/23",
    "snippet_source_key": "https://for_citation.com/citation/23"
  }'
```

### Base URL

The base URL used for the AI agent APIs is formatted as shown below:

```
https://api-{app_id}.sendbird.com/v3
```
