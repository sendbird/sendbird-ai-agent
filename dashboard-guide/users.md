# Users

To enable the AI agent to deliver a fully personalized experience, create user accounts on the Sendbird server in advance. This allows you to store relevant user data, helping the AI agent provide more tailored support.

## Create a user in Sendbird AI agent dashboard

You can create users directly in the dashboard for testing.

1. Go to **Workspace settings > Users** and click the **Create user +** button at the top right corner of your browser.
2. When a popup appears, specify a user's unique **ID** and **Nickname** and **Create**.

{% hint style="info" %}
For testing purposes, you can manually create a user in the dashboard and allow access without an access or session token. However, for production, we strongly recommend creating users through the Platform API and authenticating them with a token.
{% endhint %}

<figure><img src="../.gitbook/assets/Screenshot 2025-05-22 at 2.46.33 PM.png" alt=""><figcaption></figcaption></figure>

###

## Create a user through Platform API

For your production system, we would generally recommend creating Sendbird users when a user is onboarded into your application, rather than determining on the fly whether a Sendbird user already exists for your application user.

This RESTful API call allows you to create a user in the Sendbird server.

### API specification

#### **HTTP request**

```http
POST https://api-{application_id}.sendbird.com/v3/users
```

### **Request body**

The following code snippet demonstrates what to include in a request body. To see the full list of properties, see our docs guide on how to [create a user through Platform API](https://sendbird.com/docs/chat/platform-api/v3/user/creating-users/create-a-user).

```
{
    "user_id": "Jacob",
    "nickname": "Asty",
    "profile_url": "https://sendbird.com/main/img/profiles/profile_05_512px.png"
}
```

<table><thead><tr><th width="190.23828125">Required</th><th width="129.72265625">Type</th><th>Description</th></tr></thead><tbody><tr><td>user_id</td><td>string</td><td>Specifies a user's unique ID. Maximum length is 80 characters.<br><br><strong>*</strong> Do not use PII (Personally Identifiable Information) such as user email address, legal name, or phone number as it could jeopardize data security and privacy.</td></tr><tr><td>nickname</td><td>string</td><td>Specifies the display name of the user. Maximum length is 80 characters.</td></tr><tr><td>profile_url</td><td>string</td><td>Specifies the URL of the user's profile image. If left empty, no profile image is set for the user. Maximum length is 2,048 characters. If the <code>profile_url</code> property is specified, the <code>profile_file</code> property is not required.</td></tr><tr><td>profile_file</td><td>string</td><td>Specifies the file of the user's profile image. An acceptable image is limited to a JPG, JPEG, or PNG file of up to 5 MB. When passing a file, you should send a <a href="https://sendbird.com/docs/chat/platform-api/v3/prepare-to-use-api#2-headers-3-multipart-requests">multipart request</a>. If the <code>profile_file</code> property is specified, the <code>profile_url</code> property is not required.</td></tr></tbody></table>

## **Issue an access token**

For simplicity, you can forgo Access or Session Tokens during your initial testing. However, a secure authentication process using tokens is strongly recommended for production environments, unless there are specific reasons you don’t want or need to secure access. It essentially extends your own authentication in your application to Sendbird. A few things to note:

* Session tokens are generally recommended, but you can read the comparison in the documentation link.
* Tokens are issued via a Platform API call made server side, not from your client application.
* You can issue a session token as described in the [session token documentation](https://sendbird.com/docs/chat/platform-api/v3/user/managing-session-tokens/issue-a-session-token#1-issue-a-session-token).

## Pass a context object to AI agents

To provide more personalized responses, you can predefine customer-specific information such as country, language, or custom context data in a `context object`. By using context objects, users no longer need to explicitly provide detailed information during the conversation. For instance, you can include an order or transaction ID, providing the agent the context around why the user initiated the conversation. This allows for a more tailored and context-aware interaction experience.

The code snippet below demonstrates how to create a context object during init, in JavaScript.

```javascript
const messenger = await loadMessenger();
messenger.initialize({
    appId: 'YOUR_APP_ID',
    aiAgentId: 'YOUR_BOT_ID',
    // Language setting (IETF BCP 47 format)
    // default: navigator.language
    language: 'en-US',
    // Country code setting (ISO 3166 format)
    countryCode: 'US',
    // Context object for the AI Agent
    context: {
        userPreference: 'technical',
        customerTier: 'premium',
        login: 'true' // Login setting must be specified in String.
    }
});
```

{% hint style="info" %}
These settings can only be configured during initialization and applicable to messenger only. To create and manage a context object through Platform API, see our [Platform API guide on the context object](../platform-api/context-object-for-messenger-channel.md).
{% endhint %}

\\
