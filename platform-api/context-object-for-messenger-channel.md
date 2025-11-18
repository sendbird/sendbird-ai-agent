# Context object for messenger channel

When creating a new in-app channel in [Messenger](../dashboard-guide/build/channels/messenger/), you can store contextual information about a user by specifying a `context object`. The object, contained in a channel resource, may include details such as the user’s order ID, preference settings, or even browser information. Passing such data to your AI agent enables it to offer more personalized customer service when addressing user inquiries.

This guide demonstrates how to create and manage a context for a messenger channel using RESTful APIs.

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

## Create a context object for a messenger channel

This endpoint allows you to create a messenger channel with a context object for the specified AI agent. If the `user_id` is specified and the AI agent already has a messenger channel with the user, this request updates the channel resource with the context object.

### **HTTP request**

```http
POST https://api-{application_id}.sendbird.com/v3/ai_agent/ai_agents/{bot_userid}/messenger
```

### **Parameter**

<table><thead><tr><th width="189.71484375">Required</th><th width="130.2109375">Type</th><th>Description</th></tr></thead><tbody><tr><td>bot_userid</td><td>string</td><td>Specifies the unique ID of the AI agent to create a channel for.</td></tr></tbody></table>

### **Request body**

The following snippet is an example request body and its optional fields:

```json
{
    "user_id": "fr_trial_user_123",
    "language": "fr-FR",
    "country": "FR",
    "context": {
        "user_segment": "drama"
    }
}
```

<table><thead><tr><th width="189.578125">Optional</th><th width="129.9140625">Type</th><th>Description</th></tr></thead><tbody><tr><td>user_id</td><td>string</td><td>Specifies the unique ID of the user.</td></tr><tr><td>language</td><td>string</td><td>Specifies the language in which the AI agent speaks, in <a href="https://en.wikipedia.org/wiki/IETF_language_tag">BCP-47</a> format.</td></tr><tr><td>country</td><td>string</td><td>Specifies the country of connection, in <a href="https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2">ISO 3166-1 alpha-2</a> format.</td></tr><tr><td>context</td><td>JSON object</td><td>Specifies the information to store as string key-value pairs.</td></tr></tbody></table>

### **Response**

If successful, this action returns a messenger channel resource in the response body like the following:

<pre class="language-json"><code class="lang-json">{
    "user": {
        "is_active": true
    },
    "auto_created_user": {
        "user_id": "fr_trial_user_123",
        "session_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlIjoxNTk4NjUxODE1LCJ1IjoxMjI0NzQ5ODEsInYiOjF9",
        "expired_at": 1544421551
    },
<strong>    "active_channel": {
</strong>        "channel_url": "sendbird_group_channel_6037267_600ddc81a5e23049c804193370d47217fa2ed5f9"
    },
    "bot": {
        "bot_userid": "agent_a456",
        "reply_to_file": false,		    // Optional
        "bot_profile_url": true,            // Optional
        "bot_nickname": "Help desk",
        "special_notice": "",
        "is_special_notice_enabled": false,
        "show_handoff_button": false
    },
    "language": "fr-FR",
    "country": "FR",
    "context": {
        "user_segment": "drama"
    }
}

</code></pre>

### **List of response properties**

<table><thead><tr><th width="190.140625">Property</th><th width="129.59765625">Type</th><th>Description</th></tr></thead><tbody><tr><td>auto_created_user</td><td>JSON object</td><td>If <code>user_id</code> isn’t set, a user is automatically created.</td></tr></tbody></table>

***

## Get the context object of a messenger channel

This endpoint retrieves a messenger channel’s context object.

### **HTTP request**

```http
GET https://api-{application_id}.sendbird.com/v3/ai_agent/ai_agents/{bot_userid}/channels/{channel_url}/ai_agent_context
```

### **Parameters**

<table><thead><tr><th width="191.1796875">Required</th><th width="129.875">Type</th><th>Description</th></tr></thead><tbody><tr><td>bot_userid</td><td>string</td><td>Specifies the unique ID of the AI agent.</td></tr><tr><td>channel_url</td><td>string</td><td>Specifies the channel URL in which the AI agent is having a conversation.</td></tr></tbody></table>

### **Response**

If successful, this action returns the messenger channel’s context object in the response body like the following:

```json
{
    "language": "fr-FR",
    "country": "FR",
    "context": {
        "user_segment": "drama"
    }
}

```

{% hint style="info" %}
The response body will only contain the fields that have been specified.
{% endhint %}

***

## Update the context object of a messenger channel

This endpoint allows you to overwrite the context object of a messenger channel.

### **HTTP request**

```http
PUT https://api-{application_id}.sendbird.com/v3/ai_agent/ai_agents/{bot_userid}/channels/{channel_url}/ai_agent_context
```

### **Parameters**

<table><thead><tr><th width="189.65234375">Required</th><th width="130.25">Type</th><th>Description</th></tr></thead><tbody><tr><td>bot_userid</td><td>string</td><td>Specifies the unique ID of the AI agent.</td></tr><tr><td>channel_url</td><td>string</td><td>Specifies the channel URL in which the AI agent is having a conversation.</td></tr></tbody></table>

### **Request body**

The following snippet is an example request body and its optional fields:

```json
{
	"language": "es-ES",
	"country": "ES",
	"context": {
		"user_segment": ""
	}
}
```

<table><thead><tr><th width="189.546875">Optional</th><th width="129.53515625">Type</th><th>Description</th></tr></thead><tbody><tr><td>language</td><td>string</td><td>Specifies the language in which the AI agent speaks, in <a href="https://en.wikipedia.org/wiki/IETF_language_tag">BCP-47</a> format.</td></tr><tr><td>country</td><td>string</td><td>Specifies the country of connection, in <a href="https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2">ISO 3166-1 alpha-2</a> format.</td></tr><tr><td>context</td><td>JSON object</td><td>Specifies the information to store as string key-value pairs.</td></tr></tbody></table>

### **Response**

If successful, this action returns the updated context object in the response body like the following:

```json
{
	"language": "es-ES",
	"country": "ES",
	"context": {
		"user_segment": ""
	}
}
```

{% hint style="info" %}
The response body will only contain the fields that have been updated.
{% endhint %}
