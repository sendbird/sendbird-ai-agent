# Proactive chat

This endpoint allows you to send a message to a target user before they submit an inquiry. This message is called a [proactive chat](../dashboard-guide/proactive-chat.md) and it can be sent to either a `messenger` or `sms` channel. When the user replies, it will initiate a conversation with your AI agent.

{% hint style="info" %}
To learn more about the proactive chat, see [our guide ](../dashboard-guide/proactive-chat.md)on the feature.
{% endhint %}

## API specification <a href="#api-specification" id="api-specification"></a>

### **HTTP request**

```
POST https://api-{application_id}.sendbird.com/v3/ai_agent/ai_agents/{bot_userid}/conversations/start
```

### **Request body** <a href="#request-body" id="request-body"></a>

#### **Required**

<table><thead><tr><th width="200.41015625">Parameter</th><th width="130.3046875">Type</th><th>Description</th></tr></thead><tbody><tr><td>message</td><td>string</td><td>Specifies the content of the proactive chat.</td></tr><tr><td>channel_type</td><td>string</td><td>Specifies the type of the channel to send the message. Acceptable values are <code>messenger</code> and <code>sms</code>.</td></tr><tr><td>phone_number</td><td>string</td><td>Specifies the phone number of the user when the <code>channel_type</code> is set to <code>sms</code>.</td></tr><tr><td>user_id</td><td>string</td><td>Specifies the unique ID of the target user when the <code>chnnel_type</code> is set to <code>messenger</code>.</td></tr></tbody></table>

#### **Optional**

<table><thead><tr><th width="199.80859375">Parameter</th><th width="131.51953125">Type</th><th>Description</th></tr></thead><tbody><tr><td>channel_id</td><td>string</td><td>Specifies the unique ID of the channel to send the proactive chat to.</td></tr><tr><td>suggested_replies</td><td>Array of strings</td><td>Specifies the suggested reply options. Suggested replies are predefined response options that users can tap or click on to continue the conversation. To learn more, see our guide on <a href="../dashboard-guide/shared-assets/message-templates.md#suggested-replies">message templates</a>.</td></tr></tbody></table>

### Response

If successful, this action returns a conversation resource in the response body.

```json
{
    "id": "81218",
    "app_id": "118FB44D-F325-4896-98FC-EE958988DFCD",
    "channel_url": "proactive_ai_agent_118FB44D-F325-4896-98FC-EE958988DFCD_2f82a4d3bb534329cc27896a2eed7c06896004d5",
    "bot_userid": "2e164533-12b9-4bb1-a215-8c8513fd3aa5",
    "user_id": "sms_ephemeral_user_ecf8821c9c9c409db56e22a610b09568",
    "started_at": 1758046818260,
    "conversation_type": "proactive",
    "responded": false,
    "proactive_message": "Don't miss our semi-annual sale! Ends this weekend!",
    "resolution_time": null,
    "auto_close_at": 1758047118259,
    "channel": {
        "channel_url": "proactive_ai_agent_118FB44D-F325-4896-98FC-EE958988DFCD_2f82a4d3bb534329cc27896a2eed7c06896004d5",
        "last_message_ts": 1758046818395,
        "custom_type": "SB_@I_@GENT"
    },
    "topics": [],
    "category": null,
    "sub_category": null,
    "manuals": [],
    "closed_at": null,
    "handed_over_at": null,
    "status": "open",
    "analytics_status": "not_ready",
    "user_message_count": 0,
    "agent_message_count": 0,
    "thinking_message_count": 0,
    "message_counts": {
        "agent_hallucination": 0,
        "safeguard_harmful_content": 0,
        "safeguard_adversarial_attack": 0,
        "safeguard_banned_phrases": 0,
        "safeguard_context_injection": 0,
        "safeguard_harmful_user": 0
    },
    "is_resolved_by_bot": null,
    "resolution_node": null,
    "user_resolution_feedback": null,
    "ai_resolution_feedback": null,
    "resolution": null,
    "csat": null,
    "csat_type": null,
    "csat_reason": null,
    "csat_expire_at": null,
    "helpdesk_csat": null,
    "helpdesk_csat_type": null,
    "helpdesk_csat_reason": null,
    "sentiment": null,
    "sentiment_reason": null,
    "abandoned": null,
    "repeated": false,
    "ai_handle_time": null,
    "summary": null,
    "suggestion": null,
    "bridge_channel_type": "sms",
    "bridge_channel": {
        "id": "EwGmTKleBa",
        "app_id": "118FB44D-F325-4896-98FC-EE958988DFCD",
        "ai_agent_id": "2e164533-12b9-4bb1-a215-8c8513fd3aa5",
        "channel_type": "sms",
        "provider": "omega",
        "provider_reference_id": null,
        "is_enabled": true,
        "auto_close_timeout": 300,
        "omega_binding_key": "97a72467f9a74faaa3457321bd4b8c95c",
        "omega_channel_id": "sms:3jfn5j67w-3a52-4983-ab83-a1989b7ff8ef",
        "attributes": {
            "messages": {
                "csat": "We'd love to hear your thoughts! How satisfied were you with our Agent's support?\n\nPlease reply with a number from 1 to 5, where 1 means \"not satisfied\" and 5 means \"very satisfied.\"\n\nThank you!",
                "auto_close": null,
                "consent": "By continuing this conversation, you agree that it may be monitored and stored for business purposes, in accordance with our Privacy Policy and Terms of Use. Standard data rates may apply.",
                "resolution_feedback": {
                    "opening": "Was this what you were looking for? Let us know if you need anything else.\n\nSend YES if we answered your question.\nSend NO if you still need help.\n\nSend YES if we answered your question.\n\nSend NO if you still need help.",
                    "positive_user_reply": "YES",
                    "negative_user_reply": "NO"
                },
                "multi_language_auto_close": [
                    {
                        "language": "en",
                        "value": "Looks like you have been away. This conversation is now closed. Feel free to start a new conversation anytime\u2014we\u2019re happy to help!"
                    }
                ],
                "multi_language_opening": null,
                "multi_language_positive_user_reply": null,
                "multi_language_negative_user_reply": null
            },
            "handoff": null
        },
        "created_at": "2025-09-08T04:21:53.140645+00:00",
        "updated_at": "2025-09-10T04:52:27.090769+00:00"
    },
    "handoff": null,
    "scorecard": null,
    "prompt": null,
    "ai_agent_context": {
        "language": "en-US",
        "country": null,
        "context": {
            "phone_number": "+18055559284"
        }
    },
    "closed_reason": null,
    "is_copilot": false,
    "metadata": {}
}

```

***
