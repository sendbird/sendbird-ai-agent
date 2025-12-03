# Launcher

`MessengerLauncher` is a core component of Delight AI agent messenger that enables you to start and manage conversations in your client app for Android. It can be attached to the application screens and only works with `FragmentActivity`. A click on the launcher automatically launches a conversation screen based on your configuration.

The launcher's appearance such as an icon, its color and size can be customized via the Delight AI dashboard as shown below.

<div align="center"><img src="https://sendbird-files.s3.ap-northeast-1.amazonaws.com/docs/da-mobile-launcher2.png" alt="" width="375"></div>

This guide explains the following features of the launcher:

* [Key features](launcher.md#key-features)
  * [How to attach](launcher.md#how-to-attach)
  * [Start a conversation and customize the entry point](launcher.md#start-a-conversation-and-customize-the-entry-point)
  * [Set the launcher position](launcher.md#set-the-launcher-position)
  * [Customize the launcher appearance](launcher.md#customize-the-launchers-appearance)
* [Usage](launcher.md#usage)
  * [Basic](launcher.md#basic)
  * [Advanced](launcher.md#advanced)
  * [Custom click handler](launcher.md#custom-click-handler)
  * [More configuration options](launcher.md#more-configuration-options)
* [API reference](launcher.md#api-references)

***

## Key features

The core features of `MessengerLauncher` are:

* [Automatic Attachment](launcher.md#how-to-attach)
* [Start a conversation and customize the entry point](launcher.md#start-a-conversation-and-customize-the-entry-point)
* [Set the launcher position](launcher.md#set-the-launcher-position)
* [Customize the launcher appearance](launcher.md#customize-the-launchers-appearance)

### How to attach

You can easily attach the launcher to any `FragmentActivity` screen with simple codes as shown below:

```kotlin
val launcher = MessengerLauncher(this, "your-ai-agent-id")
launcher.attach()
```

### Start a conversation and customize the entry point

`LauncherSettingsParams.entryPoint` allows you to customize the entry point from the launcher. The code snippet below demonstrates a `CONVERSATION` entry point: a conversation automatically opens when the launcher is clicked.

```kotlin
val launcherParams = LauncherSettingsParams(
    entryPoint = MessengerEntryPoint.CONVERSATION
)
val launcher = MessengerLauncher(this, "your-ai-agent-id", launcherParams)
launcher.attach()
```

If you wish to display a conversation list first when the user clicks on the launcher, set the `entryPoint` to `CONVERSATION_LIST`.

```kotlin
// Direct conversation entry.
val directParams = LauncherSettingsParams(
    entryPoint = MessengerEntryPoint.CONVERSATION
)

// Conversation list entry.
val listParams = LauncherSettingsParams(
    entryPoint = MessengerEntryPoint.CONVERSATION_LIST
)
```

### Set the launcher position

Set the launcher position on a screen using `LauncherLocation` in `LauncherLayoutParams` as shown below.

```kotlin
val layoutParams = LauncherLayoutParams(
    location = LauncherLocation.BOTTOM_END,
    margin = LauncherMargin(16, 16, 16, 16)
)
val launcherParams = LauncherSettingsParams(layoutParams = layoutParams)
```

### Customize the launcher's appearance

Launcher appearance, such as its icon and color, can be configured through [Delight AI dashboard](https://dashboard.delight.ai) - no code changes required. Simply go to [**Build > Channels > Messenger**](https://dashboard.delight.ai/ai-agent/%7Bapplication-id%7D/channels/messenger/?active_tab=Appearance) in the dashboard and click on the **Appearance** tab to customize your launcher.

<figure><img src="https://sendbird-files.s3.ap-northeast-1.amazonaws.com/docs/da-messenger-appearance.png" alt=""><figcaption></figcaption></figure>

***

## Usage

This section demonstrates how to integrate `MessengerLauncher` to your client app in different scenarios.

### Basic

First, use the following snippet with the default settings for a seamless launcher attachment. It demonstrates the minimal setup required to initialize and attach the launcher to your main screen. A `FragmentActivity` is required for compatibility.

```kotlin
class MainActivity : AppCompatActivity() {
    private lateinit var launcher: MessengerLauncher

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // Initialize and attach launcher.
        launcher = MessengerLauncher(this, "your-ai-agent-id")
        launcher.attach()
    }

    override fun onDestroy() {
        launcher.detach()
        super.onDestroy()
    }
}
```

### Advanced

Once the basic setup is complete, you can move onto customizing the launcher position and entry point.

The following snippet demonstrates how to customize your launcher using all the configuration options together, including its position, entry mode, language, and context metadata.

> **Note**: To see the full list of parameters, go to the [More configuration options](launcher.md#more-configuration-options) section.

```kotlin
class MainActivity : AppCompatActivity() {
    private lateinit var launcher: MessengerLauncher

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // Custom launcher configuration.
        val layoutParams = LauncherLayoutParams(
            location = LauncherLocation.TOP_END,
            margin = LauncherMargin(20, 50, 20, 20),
            launchMode = LaunchMode.EXPANDED
        )

        val launcherParams = LauncherSettingsParams(
            entryPoint = MessengerEntryPoint.CONVERSATION_LIST,
            layoutParams = layoutParams,
            language = "ko-KR",
            context = mapOf(
                "user_id" to "12345",
                "plan" to "premium"
            )
        )

        launcher = MessengerLauncher(this, "your-ai-agent-id", launcherParams)
        launcher.attach()
    }

    override fun onDestroy() {
        launcher.detach()
        super.onDestroy()
    }
}
```

### Custom click handler

You can also customize the logic of the launcher click handler. The following snippet overrides the default `onMessengerLauncherClickListener()` to execute a custom behavior when the launcher is clicked, while still allowing manual control over conversation launch.

```kotlin
launcher.onMessengerLauncherClickListener = OnLauncherClickListener { view ->
    // Custom click handling.
    Log.d("MessengerLauncher", "MessengerLauncher clicked!")

    // You can still open a conversation.
    launcher.openConversation()
}
```

### More configuration options

This section describes how to configure the parameters and enums that control launcher behavior and appearance.

#### LauncherSettingsParams

The following table lists the configuration options in `LauncherSettingsParams`, which can be used when initializing the messenger launcher.

<table><thead><tr><th width="291.671875">Property</th><th width="191.10546875">Type</th><th>Description</th></tr></thead><tbody><tr><td><code>entryPoint</code></td><td><code>MessengerEntryPoint</code></td><td>Determines which screen to show first when the launcher is clicked. Acceptable values are <code>CONVERSATION</code> and <code>CONVERSATION_LIST</code>. (Default: <code>CONVERSATION</code>)</td></tr><tr><td><code>layoutParams</code></td><td><code>LauncherLayoutParams</code></td><td>Configures the layout of the launcher, such as its margin and mode.</td></tr><tr><td><code>language</code></td><td><code>String</code></td><td>Sets the language spoken by the user in conversations, in IETF BCP 47 format. (Default: Device language)</td></tr><tr><td><code>country</code></td><td><code>String?</code></td><td>Sets the user's country code in ISO 3166 format.</td></tr><tr><td><code>context</code></td><td><code>Map&#x3C;String, String></code></td><td>Contains an additional metadata on the user for more personalized support by AI agent. (Default: empty)</td></tr><tr><td><code>shouldUseCurrentActiveChannelUrl</code></td><td><code>Boolean</code></td><td>Determines whether to use a known channel URL when opening a conversation. (Default: <code>true</code>)</td></tr></tbody></table>

```kotlin
val params = LauncherSettingsParams(
    entryPoint = MessengerEntryPoint.CONVERSATION,
    layoutParams = LauncherLayoutParams(
        location = LauncherLocation.BOTTOM_END,
        margin = LauncherMargin(16, 16, 16, 16),
        launchMode = LaunchMode.ANCHORED
    ),
    language = "en-US",
    country = "US",
    context = mapOf("user_type" to "premium")
)
```

#### MessengerEntryPoint

The following table lists the configuration options in `MessengerEntryPoint`, which can be used when launching the messenger.

<table><thead><tr><th width="231.1484375">Value</th><th>Description</th></tr></thead><tbody><tr><td><code>CONVERSATION</code></td><td>Opens a conversation directly after a click on the launcher.</td></tr><tr><td><code>CONVERSATION_LIST</code></td><td>Shows the user's conversation list first after a click on the launcher.</td></tr></tbody></table>

```kotlin
// Launch directly into conversation.
MessengerEntryPoint.CONVERSATION

// Show conversation list first.
MessengerEntryPoint.CONVERSATION_LIST
```

#### LauncherLayoutParams

The following table lists the configuration options in `LauncherLayoutParams`, which can be used when setting the visual layout and positioning of the launcher.

| Property     | Type                                               | Description                                                                                                |
| ------------ | -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `location`   | [`LauncherLocation`](launcher.md#launcherlocation) | Sets the position of the launcher in a screen.                                                             |
| `margin`     | [`LauncherMargin`](launcher.md#launchermargin)     | Sets its margins from edges.                                                                               |
| `launchMode` | [`LaunchMode`](launcher.md#launchmode)             | Sets the messenger behavior following the launcher click. Acceptable values are `EXPANDED` and `ANCHORED`. |

```kotlin
val layoutParams = LauncherLayoutParams(
    location = LauncherLocation.BOTTOM_END,
    margin = LauncherMargin(16, 16, 16, 16),
    launchMode = LaunchMode.ANCHORED
)
```

#### LauncherLocation

The following table lists the configuration options in `LauncherLocation`, which can be used when setting where the launcher appears on the screen.

<table><thead><tr><th width="229.80078125">Value</th><th>Description</th></tr></thead><tbody><tr><td><code>TOP_START</code></td><td>Top-left corner of screen.</td></tr><tr><td><code>TOP_END</code></td><td>Top-right corner of screen.</td></tr><tr><td><code>BOTTOM_START</code></td><td>Bottom-left corner of screen.</td></tr><tr><td><code>BOTTOM_END</code></td><td>Bottom-right corner of screen.</td></tr></tbody></table>

```kotlin
// Position at bottom-right corner
LauncherLocation.BOTTOM_END

// Position at top-left corner
LauncherLocation.TOP_START
```

## LaunchMode

The following table lists the configuration options in `LaunchMode`, which can be used when determining how the conversation screen appears.

<table><thead><tr><th width="229.68359375">Value</th><th>Description</th></tr></thead><tbody><tr><td><code>EXPANDED</code></td><td>The messenger opens full-screen.</td></tr><tr><td><code>ANCHORED</code></td><td>The messenger opens like an anchored box near the launcher.</td></tr></tbody></table>

```kotlin
// Full screen mode
LaunchMode.EXPANDED

// Anchored to launcher
LaunchMode.ANCHORED
```

#### LauncherMargin

The following table lists the configuration options in `LauncherMargin`, which can be used to set the spacing around the launcher.

| Property | Type  | Description                  |
| -------- | ----- | ---------------------------- |
| `start`  | `Int` | Start margin in `dp` units.  |
| `top`    | `Int` | Top margin in `dp` units.    |
| `end`    | `Int` | End margin in `dp` units.    |
| `bottom` | `Int` | Bottom margin in `dp` units. |

```kotlin
// 16dp margins on all sides.
val margin = LauncherMargin(16, 16, 16, 16)

// Custom margins.
val customMargin = LauncherMargin(
    start = 20,
    top = 10,
    end = 20,
    bottom = 30
)
```

***

## API References

<table><thead><tr><th width="192.90234375">Method Name</th><th width="241.80859375">Parameters</th><th width="316.47265625">Description</th><th>Return Type</th></tr></thead><tbody><tr><td><code>attach</code></td><td>None</td><td>Attaches the <code>MessengerLauncher</code> to the current <code>FragmentActivity</code>. This must be called from the main thread.</td><td><code>Unit</code></td></tr><tr><td><code>detach</code></td><td>None</td><td>Removes the launcher from the current activity. This can be called multiple times.</td><td><code>Unit</code></td></tr><tr><td><code>openConversation</code></td><td><code>channelUrl: String? = null</code></td><td>Opens a specific conversation with its channel URL. If <code>channelUrl</code> is null, it opens the default channel.</td><td><code>Unit</code></td></tr><tr><td><code>openConversationList</code></td><td>None</td><td>Opens the conversation list view, showing all user conversations.</td><td><code>Unit</code></td></tr><tr><td><code>closeMessenger</code></td><td>None</td><td>Closes any open messenger screens and returns to the previous screen.</td><td><code>Unit</code></td></tr></tbody></table>
