# Webhook

Sendbird AI agent supports a webhook API so that you can be notified whenever a new event takes a place during AI-user interaction. From a start of a conversation to human handoff to AI hallucination, choose a set of events to subscribe to in the Sendbird AI agent dashbaord and use them for your custom implementation.

{% hint style="warning" %}
As of August 27, 2025, the webhook configuration should be set by Sendbird. Contact your Sendbird representative for further assistance.
{% endhint %}

This guide presents the list of the Sendbird AI agent events you can listen to and sample payloads for each of them.

***

## Events

A lot can happen during a conversation with a user and Sendbird notifies you such event through webhook. Here are a list of events that you can subscribe to.

* `conversation:started` - A conversation started.
* `conversation:closed` - A conversation has been closed.
* `handoff` - Handoff to a human agent takes place.
* `message:user_sent` - A user sends a message to AI agent.
* `message:ai_agent_sent` - Your AI agent sends a message to the user.
* `message:human_agent_sent` - A human agent sends a message to the user after handoff.
* `flagged_message:hallucination_detected` - Your AI agent hallucinated and the message has been detected.

These event types are categorized and specified in the `category` field of the webhook payload.

***

## Payload

The payload can vary, depending on the event `category` . However, it can be largely divided into two groups: [common fields](webhook.md#common-fields) and [event-specific fields](webhook.md#event-specific-fields).

### Common fields

Any event triggered within Sendbird AI agent shares the following fields in its payload:

#### Envelope

<table><thead><tr><th width="165.69921875">Parameter</th><th width="160.2265625">Type</th><th>Description</th></tr></thead><tbody><tr><td>id</td><td>string</td><td>Specifies the unique ID of the event.</td></tr><tr><td>app_id</td><td>string</td><td>Specifies the unique ID of the Sendbird AI agent.</td></tr><tr><td>category</td><td>string</td><td>Specifies the type of the event. Valid values are: <code>conversation:started</code>, <code>conversation:closed</code>, <code>message:user_sent</code>, <code>message:ai_agent_sent</code>, <code>message:human_agent_sent</code>, <code>flagged_message:hallucination_detected</code> , and <code>handoff</code>.</td></tr><tr><td>created_at</td><td>string</td><td>Specifies the time when the event happened, in ISO 8601 format.</td></tr><tr><td>data</td><td>object</td><td>A JSON object that contains event-related information.</td></tr></tbody></table>

#### `data` object

<table><thead><tr><th width="166.921875">Parameter</th><th width="157.10546875">Type</th><th>Description</th></tr></thead><tbody><tr><td>ai_agent_id</td><td>string</td><td>Specifies the unique ID of the AI agent involved in the conversation.</td></tr><tr><td>conversation</td><td>object</td><td>A JSON object that contains information about the conversation.</td></tr></tbody></table>

#### `data.conversation` object

A JSON object that contains information about the conversation.

<table><thead><tr><th width="164.60546875">Parameter</th><th width="148.28515625">Type</th><th>Description</th></tr></thead><tbody><tr><td>id</td><td>int</td><td>Specifies the unique ID of the conversation.</td></tr><tr><td>user_id</td><td>string</td><td>Specifies the unique ID of the user in the conversation.</td></tr><tr><td>channel_url</td><td>string</td><td>Specifies the channel URL where the conversation is taking place.</td></tr><tr><td>channel_type</td><td>string</td><td>Specifies the channel type. Valid values are: <code>messenger</code>, <code>voice</code>, <code>sms</code>, <code>email</code> and <code>whatsapp</code>.</td></tr><tr><td>started_at</td><td>string</td><td>Specifies the time when the conversation started, in ISO 8601 format.</td></tr><tr><td>ai_agent_context</td><td>object</td><td>A JSON object that contains information about the context object. This object can store user-specific data, such as their language preference or location.</td></tr><tr><td>status</td><td>string</td><td>Specifies the current status of the conversation. Valid values are:<br>- <code>open</code>: the conversation is ongoing.<br>- <code>closed</code>: the conversation has been resolved.</td></tr></tbody></table>

#### `data.conversation.ai_agent_context` object

A [`context` object](../platform-api/context-object-for-messenger-channel.md) in Sendbird AI agent can contain user-specific data, such as their language preference or location.

<table><thead><tr><th width="164.7734375">Parameter</th><th width="147.703125">Type</th><th>Description</th></tr></thead><tbody><tr><td>language</td><td>string</td><td>Specifies the language preference set by the user. The user and AI agent will speak in this language.</td></tr><tr><td>country</td><td>string</td><td>Specifies the country of user connection.</td></tr><tr><td>context</td><td>object</td><td>A JSON object that contains extra custom user data.</td></tr></tbody></table>

***

### Event-specific fields

Sendbird AI agent webhook currently supports the following seven events:

* `conversation:started`
* `conversation:closed`
* `message:user_sent`
* `message:ai_agent_sent`
* `message:human_agent_sent`
* `flagged_message:hallucination_detected`
* `handoff`

Each event will have extra fields and objects in its payload to provide event-relevant information, such `message` or `external_case`.

#### Conversation starts

When a conversation starts and `conversation:started` occurs, its payload contains the common fields describing the conversation and its channel.

```json
{
  "id": "d123r98kl2293s4dl3254df008",
  "app_id": "app_123456",
  "created_at": "2025-07-30T08:30:25Z",
  "category": "conversation:started",
  "data": {
    "ai_agent_id": "agent_abc123",
    "conversation": {
      "id": 2647,
      "user_id": "user_xyz789",
      "channel_url": "sendbird_group_channel_113498_600ddafdvijlk9439809890cf9",
      "channel_type": "messenger",
      "started_at": "2025-07-30T08:30:25Z",
      "status": "open",
      "ai_agent_context": {
        "language": "en",
        "country": "kr",
        "context": {
          "arbitray_key": "value",
          "phone_number": "12-345-7890"
        }
      }
    }
  }
}
```

#### Message events

Message-related events, `message:user_sent`, `message:ai_agent_sent`, `message:human_agent_sent`, send a payload that also contains a `message` object along with the common fields listed above.

#### When a user sends a message to AI agent.

```json
{
  "id": "d123r98kl2293s4dl3254df008",
  "app_id": "app_123456",
  "category": "message:user_sent",
  "created_at": "2025-07-30T08:30:32.d25Z",
  "data": {
    "ai_agent_id": "agent_abc123",
    "conversation": {
      "id": 2647,
      "user_id": "user_xyz789",
      "channel_url": "sendbird_group_channel_113578_277dafdvijlk9439809890cf9",
      "channel_type": "whatsapp",
      "started_at": "2025-08-19T10:49:24.018Z",
      "status": "open",
      "ai_agent_context": {
        "language": "en",
        "country": "kr",
        "context": {
          "arbitray_key": "value",
          "phone_number": "12-345-7890"
        }
      }
    },
    "message": {
      "message_id": 52736290,
      "content": "just do it"
    },
    "sent_at": "2025-08-19T11:02:36.645Z"
  }
}
```

#### When your AI agent sends a message to the user.

```json
{
  "id": "a333e444jl32a0393s4dl3254308",
  "app_id": "app_123456",
  "category": "message:ai_agent_sent",
  "created_at": "2025-07-30T08:30:32.d25Z",
  "data": {
    "ai_agent_id": "agent_abc123",
    "conversation": {
      "id": 2647,
      "user_id": "user_xyz789",
      "channel_url": "sendbird_group_channel_113578_277dafdvijlk9439809890cf9",
      "channel_type": "whatsapp",
      "started_at": "2025-08-19T10:49:24.018Z",
      "status": "open",
      "ai_agent_context": {
        "language": "en",
        "country": "kr",
        "context": {
          "arbitray_key": "value",
          "phone_number": "12-345-7890"
        }
      }
    },
    "message": {
      "message_id": 52736290,
      "content": "Did you mean the sport show Just do it?",
      "external_service_user_id": "49873039755417"
    },
    "sent_at": "2025-08-19T11:02:36.645Z"
  }
}
```

#### When a human agent sends a message to the user after handoff.

Even after the handoff, you can get the information about a human agent's message in a `JSON` payload.

```json
{
  "id": "d11e444jl32a0393s4dl3254308",
  "app_id": "app_123456",
  "category": "message:human_agent_sent",
  "created_at": "2025-07-30T08:30:32.d25Z",
  "data": {
    "ai_agent_id": "agent_abc123",
    "conversation": {
      "id": 2647,
      "user_id": "user_xyz789",
      "channel_url": "sendbird_group_channel_113498_600ddafdvijlk9439809890cf9",
      "channel_type": "messenger",
      "started_at": "2025-08-19T10:49:24.018Z",
      "status": "open",
      "ai_agent_context": {
        "language": "en",
        "country": "kr",
        "context": {
          "arbitray_key": "value",
          "phone_number": "12-345-7890"
        }
      }
    },
    "message": {
      "message_id": 52736290,
      "content": "On it!"
    },
    "sent_at": "2025-08-19T11:02:36.645Z"
  }
}
```

<table><thead><tr><th width="249.8828125">Parameter</th><th width="110.97265625">Type</th><th>Description</th></tr></thead><tbody><tr><td>message</td><td>object</td><td>A JSON object that contains message information.</td></tr><tr><td>message.message_id</td><td>int</td><td>Specifies the unique ID of the message.</td></tr><tr><td>message.content</td><td>string</td><td>Specifies the text content of the message.</td></tr><tr><td>sent_at</td><td>string</td><td>Specifies the time when the message was sent, in ISO 8601 format.</td></tr></tbody></table>

#### [AI hallucination](evaluate/flagged-messages.md#hallucination)

When the AI agent generates a hallucination and `flagged_message:hallucination_detected` event occurs, the payload contains a `message` object, along with the common fields listed above.

```json
{
  "id": "w9938jl3239kj3i34dl3254359",
  "app_id": "app_123456",
  "category": "flagged_message:hallucination_detected",
  "created_at": "2025-07-30T08:30:32.d25Z",
  "data": {
    "ai_agent_id": "agent_abc123",
    "conversation": {
      "id": 2647,
      "user_id": "user_xyz789",
      "channel_url": "sendbird_group_channel_113498_600ddafdvijlk9439809890cf9",
      "channel_type": "messenger",
      "started_at": "2025-08-19T10:49:24.018Z",
      "status": "open",
      "ai_agent_context": {
        "language": "en",
        "country": "kr",
        "context": {
          "arbitray_key": "value",
          "phone_number": "12-345-7890"
        }
      }
    },
    "message": {
      "message_id": 52736290,
      "content": "Our solar system revolves around the center of the Milky Way galaxy, with all the planets orbiting the Sun."
    }
  }
}
```

<table><thead><tr><th width="249.59765625">Parameter</th><th width="109.890625">Type</th><th>Description</th></tr></thead><tbody><tr><td>message</td><td>object</td><td>A JSON object that contains message information.</td></tr><tr><td>message.message_id</td><td>int</td><td>Specifies the unique ID of the message.</td></tr><tr><td>message.content</td><td>string</td><td>Specifies the text content of the message.</td></tr></tbody></table>

#### Conversation closed

When a conversation is closed and `conversation:closed` occurs, the payload contains information about its closure time and reason, along with the common fields listed above.

```json
{
  "id": "ts444jl3239kj3i34dl3254359",
  "app_id": "app_123456",
  "category": "conversation:closed",
  "created_at": "2025-07-30T08:30:32.d25Z",
  "data": {
    "ai_agent_id": "agent_abc123",
    "conversation": {
      "id": 2647,
      "user_id": "user_789",
      "channel_url": "sendbird_group_channel_113498_600ddafdvijlk9439809890cf9",
      "channel_type": "messenger",
      "started_at": "2025-07-30T08:30:32.d25Z",
      "status": "closed",
      "closed_at": "2025-07-30T08:35:32.d48s",
      "closed_reason": "user_resolved",
      "ai_agent_context": {
        "language": "en",
        "country": "kr",
        "context": {
          "arbitray_key": "value",
          "phone_number": "12-345-7890"
        }
      }
    },
    "external_case": {
      "case_id": "sprinklr_123",
      "type": "sprinklr"
    }
  }
}
```

<table><thead><tr><th width="250.109375">Parameter</th><th width="110.60546875">Type</th><th>Description</th></tr></thead><tbody><tr><td>conversation.closed_at</td><td>string</td><td>Specifies the time when the conversation was closed, in ISO 8601 format.</td></tr><tr><td>conversation.closed_reason</td><td>string</td><td><p>Specifies how the conversation was closed. Valid values are:</p><ul><li><code>auto</code>: The conversation was automatically closed according to auto-close time set to the system.</li><li><code>user_resolved</code>: The conversation was closed as the user confirmed that their issue's been resolved after the actionbook flow ended.</li><li><code>user_unresolved</code>: The conversation was closed as the user confirmed that their issue's not been resolved even after the actionbook flow ended.</li><li><code>force_closed</code>: The conversation was force-closed by a Sendbird AI agent dashboard user.</li><li><code>by_human_agent</code>: The conversation was closed by a human agent after handoff.</li></ul></td></tr><tr><td>external_case</td><td>object</td><td>A JSON object that contains information about the conversation or ticket handed over to a 3rd-party CRM platform.</td></tr><tr><td>external_case.case_id</td><td>string</td><td>Specifies the unique ID of the ticket or the case generated by the 3rd-party platform.</td></tr><tr><td>external_case.type</td><td>string</td><td>Specifies the name of the 3rd-party platform.</td></tr></tbody></table>

#### Handoff

When the conversation was handed off to a human agent and `handoff` occurs, the payload contains the information about when it happened and which platform took over the case. with the common fields listed above.

```json
{
  "id": "d4444jl3239kjlkjfsdl3254359",
  "app_id": "app_123456",
  "category": "handoff",
  "created_at": "2025-07-30T08:30:32.d25Z",
  "data": {
    "ai_agent_id": "agent_abc123",
    "conversation": {
      "id": 2647,
      "user_id": "user_xyz789",
      "channel_url": "sendbird_group_channel_113498_600ddafdvijlk9439809890cf9",
      "channel_type": "messenger",
      "started_at": "2025-07-30T08:30:25Z",
      "status": "open",
      "ai_agent_context": {
        "language": "en",
        "country": "kr",
        "context": {
          "arbitray_key": "value",
          "phone_number": "12-345-7890"
        }
      }
    },
    "external_case": {
      "case_id": "sprinklr_123",
      "type": "sprinklr"
    },
    "handoff_at": "2025-07-30T08:35:25Z"
  }
}
```

<table><thead><tr><th width="250.078125">Parameter</th><th width="109.8515625">Type</th><th>Description</th></tr></thead><tbody><tr><td>handoff_at</td><td>string</td><td>Specifies the time when the conversation was handed off to a human agent, in ISO 8601 format.</td></tr><tr><td>external_case</td><td>object</td><td>A JSON object that contains information about the conversation or ticket handed over to a 3rd-party CRM platform.</td></tr><tr><td>external_case.case_id</td><td>string</td><td>Specifies the unique ID of the ticket or the case generated by the 3rd-party platform.</td></tr><tr><td>external_case.type</td><td>string</td><td>Specifies the name of the 3rd-party platform.</td></tr></tbody></table>
