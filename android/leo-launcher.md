# Launcher

`MessengerLauncher` is a core component of Delight AI agent messenger that enables you to start and manage conversations in your client app for Android. It can be attached to the application screens and only works with `FragmentActivity`. A click on the launcher automatically launches a conversation screen based on your configuration.

The launcher's appearance such as an icon, its color and size can be customized via the Delight AI agent dashboard as shown below.

<img width="441" height="737" src="https://github.com/user-attachments/assets/dc0ea3af-713e-452b-b907-cfe9db8a5d55" />

---

## Key features

The core features of `MessengerLauncher` are:

- [Automatic Attachment](#how-to-attach)
- [Start a conversation and customize the entry point](#start-a-conversation-and-customize-the-entry-point)
- [Set the launcher position](#set-the-launcher-position)
- [Customize the launcher appearance](#customize-the-launchers-appearance)

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
// Direct conversation entry
val directParams = LauncherSettingsParams(
    entryPoint = MessengerEntryPoint.CONVERSATION
)

// Conversation list entry
val listParams = LauncherSettingsParams(
    entryPoint = MessengerEntryPoint.CONVERSATION_LIST
)
```

### Set the launcher position

Set the launcher position on a screen using `LauncherLocation` as shown below.

```kotlin
val layoutParams = LauncherLayoutParams(
    location = LauncherLocation.BOTTOM_END,
    margin = LauncherMargin(16, 16, 16, 16)
)
val launcherParams = LauncherSettingsParams(layoutParams = layoutParams)
```

### Customize the launcher's appearance

Launcher appearance, such as its icon and color, can be configured through [Delight AI dashboard](https://dashboard.sendbird.com) - no code changes required.
Simply go to **[Build > Channels > Messenger](https://dashboard.sendbird.com/ai-agent/{application-id}/channels/messenger/?active_tab=Appearance)** in the dashboard and click on the **Appearance** tab to customize your launcher.

---

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

>__Note__: To see the full list of parameters, go to the [More configuration options](#more-configuration-options) section.

```kotlin
class MainActivity : AppCompatActivity() {
    private lateinit var launcher: MessengerLauncher

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // Custom launcher configuration
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

### Custom click handling

You can also customize the logic of the launcher click handler. The following snippet overrides the default `onMessengerLauncherClickListener()` to execute a custom behavior when the launcher is clicked, while still allowing manual control over conversation launch.

```kotlin
launcher.onMessengerLauncherClickListener = OnLauncherClickListener { view ->
    // Custom click handling
    Log.d("MessengerLauncher", "MessengerLauncher clicked!")

    // You can still open a conversation
    launcher.openConversation()
}
```

### More configuration options

This section describes how to configure the parameters and enums that control launcher behavior and appearance.

#### LauncherSettingsParams

The following table lists the configuration options in `LauncherSettingsParams`, which can be used when initializing the messenger launcher.

| Property | Type | Description | Default         |
|----------|------|-------------|-----------------|
| `entryPoint` | `MessengerEntryPoint` | Determines initial screen (conversation or list) | `CONVERSATION`  |
| `layoutParams` | `LauncherLayoutParams` | Layout configuration |                 |
| `language` | `String` | Language code in IETF BCP 47 format | Device language |
| `country` | `String?` | Country code in ISO 3166 format |             |
| `context` | `Map<String, String>` | Additional metadata for AI agent | empty map      |
| `shouldUseCurrentActiveChannelUrl` | `Boolean` | Whether to use known channel URL | true            |

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

| Value | Description |
|-------|-------------|
| `CONVERSATION` | Opens conversation directly |
| `CONVERSATION_LIST` | Shows conversation list first |

```kotlin
// Launch directly into conversation
MessengerEntryPoint.CONVERSATION

// Show conversation list first
MessengerEntryPoint.CONVERSATION_LIST
```

#### LauncherLayoutParams

The following table lists the configuration options in `LauncherLayoutParams`, which can be used when setting the visual layout and positioning of the launcher.

| Property | Type | Description |
|----------|------|-------------|
| `location` | `LauncherLocation` | Screen position |
| `margin` | `LauncherMargin` | Margins from edges |
| `launchMode` | `LaunchMode` | Launch behavior |

```kotlin
val layoutParams = LauncherLayoutParams(
    location = LauncherLocation.BOTTOM_END,
    margin = LauncherMargin(16, 16, 16, 16),
    launchMode = LaunchMode.ANCHORED
)
```

#### LauncherLocation

The following table lists the configuration options in `LauncherLocation`, which can be used when setting where the launcher appears on the screen.

| Value | Description |
|-------|-------------|
| `TOP_START` | Top-left corner of screen |
| `TOP_END` | Top-right corner of screen |
| `BOTTOM_START` | Bottom-left corner of screen |
| `BOTTOM_END` | Bottom-right corner of screen |

```kotlin
// Position at bottom-right corner
LauncherLocation.BOTTOM_END

// Position at top-left corner
LauncherLocation.TOP_START
```

## LaunchMode

The following table lists the configuration options in `LaunchMode`, which can be used when determining how the conversation screen appears.

| Value | Description |
|-------|-------------|
| `EXPANDED` | Opens as a full screen. |
| `ANCHORED` | Opens like a floating box near the launcher. |

```kotlin
// Full screen mode
LaunchMode.EXPANDED

// Anchored to launcher
LaunchMode.ANCHORED
```

#### LauncherMargin


The following table lists the configuration options in `LauncherMargin`, which can be used to set the spacing around the launcher.

| Property | Type | Description              |
|----------|------|--------------------------|
| `start` | `Int` | Start margin in dp units |
| `top` | `Int` | Top margin in dp units     |
| `end` | `Int` | End margin in dp units     |
| `bottom` | `Int` | Bottom margin in dp units  |

```kotlin
// 16dp margins on all sides
val margin = LauncherMargin(16, 16, 16, 16)

// Custom margins
val customMargin = LauncherMargin(
    start = 20,
    top = 10,
    end = 20,
    bottom = 30
)
```

---

## API References

// to Leo: 여기 걍 아래 테이블 하나로 퉁치면 안될지?... 설명 다 테이블 안에 넣구요

| Method Name | Parameters | Description | Return Type |
|-------------|------------|-------------|-------------|
| `attach` | None | Attaches launcher to **FragmentActivity** | `Unit` |
| `detach` | None | Removes launcher from current activity | `Unit` |
| `openConversation` | `channelUrl: String? = null` | Opens specific conversation by channel URL | `Unit` |
| `openConversationList` | None | Opens conversation list view | `Unit` |
| `closeMessenger` | None | Closes any open messenger screens | `Unit` |

### Method Details

#### attach()

Attaches the **MessengerLauncher** to the current **FragmentActivity**. Must be called from the main thread.

```kotlin
launcher.attach()
```

#### detach()

Removes the launcher from the current activity. Safe to call multiple times.

```kotlin
launcher.detach()
```

#### openConversation(channelUrl)

Opens a specific conversation by channel URL. If `channelUrl` is null, opens the default channel.

```kotlin
// Open default conversation
launcher.openConversation()

// Open specific conversation
launcher.openConversation("sendbird_group_channel_123_abc")
```

#### openConversationList()

Opens the conversation list view showing all user conversations.

```kotlin
launcher.openConversationList()
```

#### closeMessenger()

Closes any open messenger screens and returns user to the previous screen.

```kotlin
launcher.closeMessenger()
```