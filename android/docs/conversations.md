# Conversations

In Delight AI agent, a conversation refers to a channel where an AI Agent communicates with a user. Depending on your service requirements, you can allow users to maintain a single active conversation or multiple. Delight AI agent supports two different conversation modes: Single active conversation and Multiple active conversation mode, which is the default.

When the launcher is clicked, a user can be led to either their conversation list or a conversation depending on your choice of the conversation mode.

<table><thead><tr><th width="120.984375">Feature</th><th width="290.09375">Single active conversation</th><th>Multiple active conversations (Default)</th></tr></thead><tbody><tr><td>Number of active conversation</td><td>A user can have only one active conversation with your AI agent at a time.</td><td>A user can have multiple active conversations with your AI agent at the same time.</td></tr><tr><td>Starting a new conversation</td><td>A new conversation can't be created if there is an active conversation at the moment. The existing conversation must end first.</td><td>New conversations can be created anytime using <code>AIAgentMessenger.createConversation()</code>.</td></tr></tbody></table>

> **Note**: Whichever conversation mode you choose, if there is no active conversation, a new conversation is automatically created and the user can start a dialogue with your AI agent. This provides seamless user experience without requiring manual conversation setup.

This guide explains:

* [Conversations](conversations.md#conversations)
  * [Start a conversation](conversations.md#start-a-conversation)
    * [With `MessengerLauncher`](conversations.md#with-messengerlauncher)
    * [With `MessengerActivity`](conversations.md#with-messengeractivity)
  * [Advanced configuration](conversations.md#advanced-configuration)
    * [Context object for personalized conversation](conversations.md#context-object-for-personalized-conversation)
    * [Opening a specific conversation with channel URL](conversations.md#opening-a-specific-conversation-with-channel-url)
    * [Start a conversation in multiple conversation mode](conversations.md#start-a-conversation-in-multiple-conversation-mode)
  * [API Reference](conversations.md#api-reference)

***

## Start a conversation

Once you have determined which conversation mode to apply, you should also consider how the messenger will be launched. Delight AI agent SDK supports two launch methods: `MessengerLauncher` and `MessengerActivity`. The following table describes the characteristics of each class.

<table><thead><tr><th width="150.6171875">Feature</th><th>MessengerLauncher</th><th>MessengerActivity</th></tr></thead><tbody><tr><td>UI Presentation</td><td>A floating widget attached to the client app's screen.</td><td>A full-screen activity.</td></tr><tr><td>Context requirement</td><td>Requires a <code>FragmentActivity</code>.</td><td>Any <code>Context</code> can start the activity.</td></tr><tr><td>Lifecycle management</td><td>Requires calling <code>attach()</code> and <code>detach()</code> manually.</td><td>Standard Android activity lifecycle.</td></tr><tr><td>Entry point</td><td>Configured via <code>LauncherSettingsParams.entryPoint</code>.</td><td>Specified when creating an intent such as <code>newIntentForConversation</code> or <code>newIntentForConversationList</code>.</td></tr><tr><td>Customization</td><td>Extensive layout customization, such as position, size, and margins, via <code>LauncherLayoutParams</code>.</td><td>Standard activity appearance. It can be customized through themes.</td></tr><tr><td>Launcher appearance</td><td>Customizable appearance via dashboard.</td><td>N/A - no launcher icon needed.</td></tr></tbody></table>

### With `MessengerLauncher`

`MessengerLauncher` provides a floating UI approach for launching the messenger and starting a conversation. In the `MessengerLauncher`, you can lead the user to either a conversation view or a conversation list view. In the snippet below, simply calling `attach()` automatically starts a conversation when the launcher is clicked. If you wish to show a conversation list first, use `openConversationList()` method.

For detailed `MessengerLauncher` API reference and comprehensive integration guide, see [our Launcher guide](launcher.md).

```kotlin
// Basic launcher setup - automatically starts conversation when clicked
val messengerLauncher = MessengerLauncher(
    context = this, // Must be FragmentActivity
    aiAgentId = "your_ai_agent_id"
)
messengerLauncher.attach() // After attach(), clicking launcher automatically starts a conversation.
```

#### Launch a conversation

```kotlin
// Direct conversation launch through MessengerLauncher
messengerLauncher.openConversation()

// Launch specific conversation with channel URL
messengerLauncher.openConversation(channelUrl = "sendbird_group_channel_12345")
```

#### Launch a conversation list

```kotlin
// Launch conversation list through MessengerLauncher
messengerLauncher.openConversationList()
```

### With `MessengerActivity`

`MessengerActivity` provides a full-screen approach for launching the messenger and starting a conversation. Like `MessengerLauncher`, you can lead the user to either a conversation view or a conversation list view. What differentiates the two is the `conversationChannelUrl` parameter. When creating a new `intent` instance, if you don't use the parameter, it leads the user to their conversation list. If the `conversationChannelUrl` is `null`, it creates a new conversation. If the URL is specified, it opens the existing channel.

#### Launch a conversation

```kotlin
// Start a new conversation in full-screen mode.
val intent = MessengerActivity.newIntentForConversation(
    context = this,
    aiAgentId = "your_ai_agent_id",
    conversationChannelUrl = null, // Passing null as conversationChannelUrl creates a new conversation.
    conversationSettingsParams = ConversationSettingsParams()
)
startActivity(intent)

// Launch an existing conversation by specifying its channel URL.
val existingConversationIntent = MessengerActivity.newIntentForConversation(
    context = this,
    aiAgentId = "your_ai_agent_id",
    conversationChannelUrl = "sendbird_group_channel_12345",
    conversationSettingsParams = ConversationSettingsParams(
        language = "en-US",
        context = mapOf("user_type" to "premium")
    )
)
startActivity(existingConversationIntent)
```

#### Launch a conversation list

```kotlin
// Open the conversation list in full-screen mode
val intent = MessengerActivity.newIntentForConversationList(
    context = this,
    aiAgentId = "your_ai_agent_id",
    conversationSettingsParams = ConversationSettingsParams(
        language = Locale.getDefault().toLanguageTag(),
        country = Locale.getDefault().country
    )
)
startActivity(intent)
```

***

## Advanced configuration

Beside the conversation mode, you can further configure how the conversation channels are created and built.

When a new conversation begins, you can pass over user information to the channel so that AI agent can provide more personalized assistance to the user. This information is contained in a `context` object, which can be set at the creation of the conversation.

Also, you can open a specific conversation channel by passing its URL to either `MessengerLauncher` or `MessengerActivity`, or manually create a new one while in multiple conversation mode.

### Context object for personalized conversation

The `context` object allows you to provide user's information to AI agents for more personalized service, such as their country code and language preference. This context can be set when creating conversations to enhance the user experience. The following table lists configuration classes where you can initialize a `context` object.

<table><thead><tr><th>Class</th><th width="231.54296875">Purpose</th><th>Used With</th></tr></thead><tbody><tr><td><code>ConversationSettingsParams</code></td><td>Configures the conversation settings when launching via <code>MessengerActivity</code>.</td><td><code>MessengerActivity.newIntentForConversation()</code>, <code>MessengerActivity.newIntentForConversationList()</code></td></tr><tr><td><code>ConversationCreateParams</code></td><td>Manually creates a new conversation.</td><td><code>AIAgentMessenger.createConversation()</code></td></tr><tr><td><code>LauncherSettingsParams</code></td><td>Configures the floating launcher’s behavior and appearance.</td><td><code>MessengerLauncher</code> constructor</td></tr></tbody></table>

```kotlin
// Setting context through ConversationSettingsParams
val conversationSettings = ConversationSettingsParams(
    language = "en-US", // IETF BCP 47 format
    country = "US",     // ISO 3166 format
    context = mapOf(
        "customer_tier" to "premium",
        "previous_interaction" to "support_ticket_123",
        "user_preferences" to "technical_support"
    )
)

// Using context with MessengerActivity
val intent = MessengerActivity.newIntentForConversation(
    context = this,
    aiAgentId = "your_ai_agent_id",
    conversationChannelUrl = null,
    conversationSettingsParams = conversationSettings
)
startActivity(intent)

// Using context with manual conversation creation
val createParams = ConversationCreateParams(
    aiAgentId = "your_ai_agent_id",
    language = "en-US",
    country = "US",
    context = mapOf(
        "customer_tier" to "premium",
        "session_type" to "first_visit"
    )
)

AIAgentMessenger.createConversation(createParams) { channelUrl, error ->
    // Handle result
}
```

### Opening a specific conversation with channel URL

You can open a specific conversation by passing its channel URL to either `MessengerLauncher` or `MessengerActivity`:

#### With `MessengerLauncher`

```kotlin
// Using MessengerLauncher with specific channel URL
messengerLauncher.openConversation(channelUrl = "sendbird_group_channel_12345")
```

#### With `MessengerActivity`

```kotlin
// Using MessengerActivity with specific channel URL
val intent = MessengerActivity.newIntentForConversation(
    context = this,
    aiAgentId = "your_ai_agent_id",
    conversationChannelUrl = "sendbird_group_channel_12345"
)
startActivity(intent)
```

### Start a conversation in multiple conversation mode

Multiple active conversation mode allows users to simultaneously communicate with your AI agent in different channels. In this case, use `AIAgentMessenger.createConversation()` to create a new conversation whenever needed.

> **Note**: In single conversation mode, a new conversation can't be created if there is an active conversation.

```kotlin
// Create conversation manually
val params = ConversationCreateParams(
    aiAgentId = "your_ai_agent_id",
    language = "en-US",
    country = "US",
    context = mapOf(
        "user_type" to "premium",
        "session_id" to "session_123"
    )
)

AIAgentMessenger.createConversation(params) { channelUrl, error ->
    if (error == null && channelUrl != null) {
        // Use the returned channel URL to launch the conversation

        // Option 1: Launch via MessengerLauncher
        messengerLauncher.openConversation(channelUrl = channelUrl)

        // Option 2: Launch via MessengerActivity
        val intent = MessengerActivity.newIntentForConversation(
            context = this,
            aiAgentId = "your_ai_agent_id",
            conversationChannelUrl = channelUrl
        )
        startActivity(intent)

        Log.d("Conversation", "Successfully created conversation: $channelUrl")
    } else {
        // Handle error case
        Log.e("Conversation", "Failed to create conversation: ${error?.message}")
    }
}
```

***

## API Reference

### ConversationCreateParams

The following table lists the configuration options in `ConversationCreateParams`, which can be used when creating new conversations programmatically.

<table><thead><tr><th width="290.32421875">Property</th><th width="111.703125">Type</th><th width="96.03125">Default</th><th>Description</th></tr></thead><tbody><tr><td><code>aiAgentId</code></td><td>String</td><td>Required</td><td>AI agent identifier for conversation target</td></tr><tr><td><code>language</code></td><td>String</td><td>System locale</td><td>Language setting following IETF BCP 47 format</td></tr><tr><td><code>country</code></td><td>String?</td><td>null</td><td>Country code following ISO 3166 format</td></tr><tr><td><code>context</code></td><td>Map&#x3C;String, String></td><td>Empty map</td><td>Meta context map for additional AI agent information</td></tr><tr><td><code>shouldUseCurrentActiveChannelUrl</code></td><td>Boolean</td><td>true</td><td>Whether to use known channel URL if available</td></tr></tbody></table>

### ConversationSettingsParams

The following table lists the configuration options in `ConversationSettingsParams`, which can be used when configuring the conversation settings when launching via `MessengerActivity`.

<table><thead><tr><th width="289.95703125">Property</th><th width="113.6640625">Type</th><th width="99.01953125">Default</th><th>Description</th></tr></thead><tbody><tr><td><code>language</code></td><td>String</td><td>System locale</td><td>Language setting following IETF BCP 47 format</td></tr><tr><td><code>country</code></td><td>String?</td><td>null</td><td>Country code following ISO 3166 format</td></tr><tr><td><code>context</code></td><td>Map&#x3C;String, String></td><td>Empty map</td><td>Meta context map for additional AI agent information</td></tr><tr><td><code>shouldUseCurrentActiveChannelUrl</code></td><td>Boolean</td><td>true</td><td>Whether to use known channel URL if available</td></tr></tbody></table>

### ConversationCreateHandler

The following table lists the interface for handling conversation creation results.

| Method     | Parameters                                         | Description                                                 |
| ---------- | -------------------------------------------------- | ----------------------------------------------------------- |
| `onResult` | channelUrl: String?, exception: SendbirdException? | Callback method called when conversation creation completes |

### AIAgentMessenger Methods

The following table lists the core conversation management methods in `AIAgentMessenger` object.

| Method               | Parameters                                                            | Return Type | Description                                          |
| -------------------- | --------------------------------------------------------------------- | ----------- | ---------------------------------------------------- |
| `createConversation` | params: ConversationCreateParams, handler: ConversationCreateHandler? | Unit        | Creates a new conversation with specified parameters |

### MessengerActivity Methods

The following table lists the static methods for creating intents to launch `MessengerActivity`.

<table><thead><tr><th width="259.77734375">Method</th><th width="267.04296875">Parameters</th><th>Description</th></tr></thead><tbody><tr><td><code>newIntentForConversation</code></td><td>context: Context, aiAgentId: String, conversationChannelUrl: String?, conversationSettingsParams: ConversationSettingsParams</td><td>Creates intent for opening specific conversation or starting new one. Return type is <code>intent</code>.</td></tr><tr><td><code>newIntentForConversationList</code></td><td>context: Context, aiAgentId: String, conversationSettingsParams: ConversationSettingsParams</td><td>Creates intent for displaying conversation list.  Return type is <code>intent</code>.</td></tr></tbody></table>
