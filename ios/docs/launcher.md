# Launcher

`Launcher` is a core component of Delight AI agent messenger that enables you to start and manage conversations in your client app for iOS. It can be attached to any `UIView` and provides a floating button interface. When the launcher is tapped, it automatically launches a conversation screen based on your configuration.

The launcher's appearance such as an icon, its color and size can be customized via the Delight AI dashboard as shown below.

<figure>
  <img src="https://sendbird-files.s3.ap-northeast-1.amazonaws.com/docs/da-mobile-launcher2.png" alt="" width="375">
  <figcaption></figcaption>
</figure>

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

The core features of the Launcher are:

* [Automatic attachment](launcher.md#how-to-attach)
* [Start a conversation and customize the entry point](launcher.md#start-a-conversation-and-customize-the-entry-point)
* [Set the launcher position](launcher.md#set-the-launcher-position)
* [Customize the launcher appearance](launcher.md#customize-the-launchers-appearance)

### How to attach

You can easily attach the launcher to any screen with simple codes as shown below:

```swift
import SendbirdAIAgentMessenger

AIAgentMessenger.attachLauncher(
    aiAgentId: "your-ai-agent-id"
)
```

### Start a conversation and customize the entry point

`SBALauncherOptions.entryPoint` allows you to customize the entry point from the launcher. The code snippet below demonstrates a `.conversation` entry point: a conversation automatically opens when the launcher is tapped.

```swift
let options = SBALauncherOptions(
    parentView: nil,
    entryPoint: .conversation,
    layout: .default,
    displayStyle: .default
)

AIAgentMessenger.attachLauncher(
    aiAgentId: "your-ai-agent-id"
) { params in
    params.options = options
}
```

If you wish to display a conversation list first when the user taps on the launcher, set the `entryPoint` to `.conversationList`.

```swift
// Direct conversation entry.
let conversationOptions = SBALauncherOptions(
    parentView: nil,
    entryPoint: .conversation,
    layout: .default,
    displayStyle: .default
)

AIAgentMessenger.attachLauncher(
    aiAgentId: "your-ai-agent-id"
) { params in
    params.options = conversationOptions
}

// Conversation list entry.
let listOptions = SBALauncherOptions(
    parentView: nil,
    entryPoint: .conversationList,
    layout: .default,
    displayStyle: .default
)

AIAgentMessenger.attachLauncher(
    aiAgentId: "your-ai-agent-id"
) { params in
    params.options = listOptions
}
```

### Set the launcher position

Set the launcher position on a screen using `layout.init()` in `SBALauncherOptions` as shown below.

```swift
let options = SBALauncherOptions(
    parentView: nil,
    entryPoint: .default,
    layout: .init(
        position: .trailingBottom,
        margin: LauncherAreaMargin(
            leading: 16,
            trailing: 16,
            top: 16,
            bottom: 16
        ),
        useSafeArea: true
    ),
    displayStyle: .default
)

AIAgentMessenger.attachLauncher(
    aiAgentId: "your-ai-agent-id"
) { params in
    params.options = options
}
```

### Customize the launcher appearance

Launcher appearance, such as its icon and color, can be configured through [Delight AI dashboard](https://dashboard.delight.ai) - no code changes required. Simply go to [**Build > Channels > Messenger**](https://dashboard.delight.ai/ai-agent/%7Bapplication-id%7D/channels/messenger/?active_tab=Appearance) in the dashboard and click on the **Appearance** tab to customize your launcher.

<figure>
  <img src="https://sendbird-files.s3.ap-northeast-1.amazonaws.com/docs/da-messenger-appearance.png" alt="" width="375">
  <figcaption></figcaption>
</figure>

***

## Usage

This section demonstrates how to integrate the Launcher to your iOS app in different scenarios.

### Basic

First, use the following snippet with the default settings for a seamless launcher attachment. It demonstrates the minimal setup required to initialize and attach the launcher to your main screen.

```swift
import UIKit
import SendbirdAIAgentMessenger

class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()

        // Initialize and attach launcher.
        AIAgentMessenger.attachLauncher(
            aiAgentId: "your-ai-agent-id"
        )
    }

    deinit {
        AIAgentMessenger.detachLauncher(
            aiAgentId: "your-ai-agent-id"
        )
    }
}
```

### Advanced

Once the basic setup is complete, you can move onto customizing the launcher position and entry point.

The following snippet demonstrates how to customize your launcher using all the configuration options together, including its position, entry mode, language, and context metadata.

> **Note**: To see the full list of parameters, go to the [More configuration options](launcher.md#more-configuration-options) section.

```swift
import UIKit
import SendbirdAIAgentMessenger

class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()

        // Custom launcher configuration.
        let options = SBALauncherOptions(
            parentView: nil,
            entryPoint: .conversationList,
            layout: .init(
                position: .leadingTop,
                margin: LauncherAreaMargin(
                    leading: 20,
                    trailing: 20,
                    top: 50,
                    bottom: 20
                ),
                useSafeArea: true
            ),
            displayStyle: .overlay(.init(
                spacing: 12,
                overlayLauncher: false
            ))
        )

        AIAgentMessenger.attachLauncher(
            aiAgentId: "your-ai-agent-id"
        ) { params in
            params.options = options
            params.language = "ko-KR"
            params.countryCode = "KR"
            params.context = [
                "user_id": "12345",
                "plan": "premium"
            ]
        }
    }

    deinit {
        AIAgentMessenger.detachLauncher(
            aiAgentId: "your-ai-agent-id"
        )
    }
}
```

### Remove the launcher

When you need to remove the launcher from the screen, use the snippet below.

```swift
// Detach launcher when view disappears or is no longer needed.
AIAgentMessenger.detachLauncher(
    aiAgentId: "your-ai-agent-id"
)
```

### More configuration options

This section describes how to configure the parameters and enums that control launcher behavior and appearance.

#### LauncherSettingsParams

The following table lists the configuration options in `LauncherSettingsParams`, which can be used when initializing the messenger launcher.

<table><thead><tr><th width="126.765625">Property</th><th width="148.9453125">Type</th><th width="340.32421875">Description</th><th>Default</th></tr></thead><tbody><tr><td><code>options</code></td><td>SBALauncherOptions</td><td>Configures the launcher layout and display options, such as its entry point, position, and display style.</td><td>.default</td></tr><tr><td><code>language</code></td><td>String?</td><td>Sets the language code in IETF BCP 47 format.</td><td>nil</td></tr><tr><td><code>countryCode</code></td><td>String?</td><td>Sets the country code in ISO 3166 format.</td><td>nil</td></tr><tr><td><code>context</code></td><td>[String: String]</td><td>Contains additional metadata on the user for more personalized support by AI agent.</td><td>[:]</td></tr></tbody></table>

```swift
// LauncherSettingsParams is used within the builder closure.
AIAgentMessenger.attachLauncher(
    aiAgentId: "your-ai-agent-id"
) { params in
    params.options = SBALauncherOptions(
        parentView: nil,
        entryPoint: .conversation,
        layout: .init(
            position: .trailingBottom,
            margin: LauncherAreaMargin(
                leading: 16,
                trailing: 16,
                top: 16,
                bottom: 16
            ),
            useSafeArea: true
        ),
        displayStyle: .default
    )
    params.language = "en-US"
    params.context = ["user_type": "premium"]
}
```

#### SBALauncherOptions

The following table lists the configuration options in `SBALauncherOptions`, which can be used when setting the visual layout and behavior of the launcher.

<table><thead><tr><th width="142.8046875">Property</th><th width="133.76953125">Type</th><th width="341.51171875">Description</th><th>Default</th></tr></thead><tbody><tr><td><code>parentView</code></td><td>UIView?</td><td>Sets the parent view to attach the launcher.</td><td>nil</td></tr><tr><td><code>entryPoint</code></td><td><a href="launcher.md#sbaentrypoint"><code>SBAEntryPoint</code></a></td><td>Determines which screen to show first when the launcher is tapped. Acceptable values are <code>.conversation</code> and <code>.conversationList</code>.</td><td>.conversation</td></tr><tr><td><code>layout</code></td><td><a href="launcher.md#layout"><code>Layout</code></a></td><td>Configures the layout of the launcher, such as its position and margins.</td><td>.default</td></tr><tr><td><code>displayStyle</code></td><td><a href="launcher.md#displaystyle"><code>DisplayStyle</code></a></td><td>Sets how the conversation screen appears. Acceptable values are <code>.fullscreen</code> and <code>.overlay</code>.</td><td>.overlay()</td></tr></tbody></table>

```swift
let options = SBALauncherOptions(
    parentView: nil,
    entryPoint: .conversation,
    layout: .init(
        position: .trailingBottom,
        margin: .default,
        useSafeArea: true
    ),
    displayStyle: .overlay()
)
```

#### SBAEntryPoint

The following table lists the configuration options in `SBAEntryPoint`, which can be used when launching the messenger.

<table><thead><tr><th width="228.27734375">Value</th><th>Description</th></tr></thead><tbody><tr><td><code>.conversation</code></td><td>Opens a conversation directly after a tap on the launcher.</td></tr><tr><td><code>.conversationList</code></td><td>Shows the user's conversation list first after a tap on the launcher.</td></tr></tbody></table>

```swift
// Launch directly into conversation.
let conversationOptions = SBALauncherOptions(
    parentView: nil,
    entryPoint: .conversation,
    layout: .default,
    displayStyle: .default
)

// Show conversation list first.
let listOptions = SBALauncherOptions(
    parentView: nil,
    entryPoint: .conversationList,
    layout: .default,
    displayStyle: .default
)
```

#### Layout

The following table lists the configuration options in `Layout`, which can be used when setting the positioning and margins of the launcher.

<table><thead><tr><th width="134.6796875">Property</th><th width="181.03515625">Type</th><th width="283.7890625">Description</th><th>Default</th></tr></thead><tbody><tr><td><code>position</code></td><td><a href="launcher.md#launcherposition"><code>LauncherPosition</code></a></td><td>Sets the position of the launcher on a screen.</td><td>.trailingBottom</td></tr><tr><td><code>margin</code></td><td><a href="launcher.md#launcherareamargin"><code>LauncherAreaMargin</code></a></td><td>Sets its margins from edges.</td><td>.default</td></tr><tr><td><code>useSafeArea</code></td><td>Bool</td><td>Determines whether to respect safe area insets.</td><td>true</td></tr></tbody></table>

```swift
let layout = SBALauncherOptions.Layout(
    position: .trailingBottom,
    margin: LauncherAreaMargin(
        leading: 16,
        trailing: 16,
        top: 16,
        bottom: 16
    ),
    useSafeArea: true
)
```

#### LauncherPosition

The following table lists the configuration options in `LauncherPosition`, which can be used when setting where the launcher appears on the screen.

<table><thead><tr><th width="229.8515625">Value</th><th>Description</th></tr></thead><tbody><tr><td><code>.leadingTop</code></td><td>Top-left corner of screen.</td></tr><tr><td><code>.trailingTop</code></td><td>Top-right corner of screen.</td></tr><tr><td><code>.leadingBottom</code></td><td>Bottom-left corner of screen.</td></tr><tr><td><code>.trailingBottom</code></td><td>Bottom-right corner of screen.</td></tr></tbody></table>

```swift
// Position at bottom-right corner.
let trailingBottomOptions = SBALauncherOptions(
    parentView: nil,
    entryPoint: .default,
    layout: .init(
        position: .trailingBottom,
        margin: .default,
        useSafeArea: true
    ),
    displayStyle: .default
)

// Position at top-left corner.
let leadingTopOptions = SBALauncherOptions(
    parentView: nil,
    entryPoint: .default,
    layout: .init(
        position: .leadingTop,
        margin: .default,
        useSafeArea: true
    ),
    displayStyle: .default
)
```

#### DisplayStyle

The following table lists the configuration options in `DisplayStyle`, which can be used when determining how the conversation screen appears.

<table><thead><tr><th width="270.11328125">Value</th><th>Description</th></tr></thead><tbody><tr><td><code>.fullscreen(FullscreenStyle)</code></td><td>The conversation opens as a full screen.</td></tr><tr><td><code>.overlay(OverlayStyle)</code></td><td>The conversation opens like an anchored box near the launcher.</td></tr></tbody></table>

```swift
// Full screen mode.
let fullscreenOptions = SBALauncherOptions(
    parentView: nil,
    entryPoint: .default,
    layout: .default,
    displayStyle: .fullscreen(.init(
        presentationStyle: .fullScreen,
        parentController: nil
    ))
)

// Overlay mode.
let overlayOptions = SBALauncherOptions(
    parentView: nil,
    entryPoint: .default,
    layout: .default,
    displayStyle: .overlay(.init(
        spacing: 12,
        overlayLauncher: false
    ))
)
```

* `FullscreenStyle`

Configuration for full-screen display mode.

<table><thead><tr><th width="178.01171875">Property</th><th width="222.56640625">Type</th><th width="228.0078125">Description</th><th>Default</th></tr></thead><tbody><tr><td><code>presentationStyle</code></td><td>UIModalPresentationStyle</td><td>Modal presentation style</td><td>.fullScreen</td></tr><tr><td><code>parentController</code></td><td>UIViewController?</td><td>Parent view controller</td><td>nil</td></tr></tbody></table>

```swift
let fullscreenStyle = SBALauncherOptions.DisplayStyle.FullscreenStyle(
    presentationStyle: .pageSheet,
    parentController: self
)
```

* `OverlayStyle`

Configuration for overlay display mode.

<table><thead><tr><th width="170.37890625">Property</th><th width="111.30078125">Type</th><th width="336.34765625">Description</th><th>Default</th></tr></thead><tbody><tr><td><code>spacing</code></td><td>CGFloat</td><td>Spacing between launcher and conversation</td><td>12</td></tr><tr><td><code>overlayLauncher</code></td><td>Bool</td><td>Whether to overlay the launcher</td><td>false</td></tr></tbody></table>

```swift
let overlayStyle = SBALauncherOptions.DisplayStyle.OverlayStyle(
    spacing: 12,
    overlayLauncher: false
)
```

#### LauncherAreaMargin

The following table lists the configuration options in `LauncherAreaMargin`, which can be used to set the spacing around the launcher.

<table><thead><tr><th width="162.125">Property</th><th width="155.1328125">Type</th><th>Description</th></tr></thead><tbody><tr><td><code>leading</code></td><td>CGFloat</td><td>Leading margin in points.</td></tr><tr><td><code>trailing</code></td><td>CGFloat</td><td>Trailing margin in points.</td></tr><tr><td><code>top</code></td><td>CGFloat</td><td>Top margin in points.</td></tr><tr><td><code>bottom</code></td><td>CGFloat</td><td>Bottom margin in points.</td></tr></tbody></table>

```swift
// 16pt margins on all sides.
let margin = LauncherAreaMargin(
    leading: 16,
    trailing: 16,
    top: 16,
    bottom: 16
)

// Custom margins.
let customMargin = LauncherAreaMargin(
    leading: 20,
    trailing: 20,
    top: 50,
    bottom: 30
)

// Update specific margins.
let updatedMargin = margin.update(
    top: 50,
    bottom: 30
)
```

***

## API References

### AIAgentMessenger Launcher Methods

Core methods for managing the launcher in the AI Agent Messenger SDK.

#### attachLauncher

Attaches the launcher button to the screen.

```swift
static func attachLauncher(
    aiAgentId: String,
    channelURL: String? = nil,
    paramsBuilder: LauncherSettingsParamsBuilder? = nil
)
```

<table><thead><tr><th width="173.56640625">Parameter</th><th width="278.703125">Type</th><th>Description</th></tr></thead><tbody><tr><td><code>aiAgentId</code></td><td><code>String</code></td><td>The unique identifier of the AI agent.</td></tr><tr><td><code>channelURL</code></td><td><code>String?</code></td><td>(Optional) The channel URL to open a specific conversation. If <code>nil</code>, a new conversation will be created.</td></tr><tr><td><code>paramsBuilder</code></td><td><code>LauncherSettingsParamsBuilder?</code></td><td>(Optional) A closure used to configure launcher settings such as layout and appearance.</td></tr></tbody></table>

#### detachLauncher

Removes the launcher button from the screen.

```swift
static func detachLauncher(
    aiAgentId: String
)
```

<table><thead><tr><th width="201.546875">Parameter</th><th width="200.2890625">Type</th><th>Description</th></tr></thead><tbody><tr><td><code>aiAgentId</code></td><td><code>String</code></td><td>The unique identifier of the AI agent.</td></tr></tbody></table>

### LauncherSettingsParams

Configuration parameters for the launcher button. Inherits from `BaseMessengerParams`.

<table><thead><tr><th>Property</th><th width="185.2421875">Type</th><th width="305.7578125">Description</th><th>Default</th></tr></thead><tbody><tr><td><code>options</code></td><td>SBALauncherOptions</td><td>Launcher layout and display options.</td><td>.default</td></tr><tr><td><code>language</code></td><td>String?</td><td>Language code (IETF BCP 47).</td><td>nil</td></tr><tr><td><code>countryCode</code></td><td>String?</td><td>Country code (ISO 3166).</td><td>nil</td></tr><tr><td><code>context</code></td><td>[String: String]</td><td>Additional metadata for AI agent.</td><td>[:]</td></tr></tbody></table>

### SBALauncherOptions

Comprehensive configuration options for launcher appearance and behavior.

| Property       | Type          | Description                        | Default       |
| -------------- | ------------- | ---------------------------------- | ------------- |
| `parentView`   | UIView?       | Parent view to attach launcher.    | nil           |
| `entryPoint`   | SBAEntryPoint | Initial screen to show.            | .conversation |
| `layout`       | Layout        | Position and margin configuration. | .default      |
| `displayStyle` | DisplayStyle  | How conversation appears.          | .overlay()    |

### LauncherSettingsParamsBuilder

Type alias for launcher settings parameter builder closure.

```swift
typealias LauncherSettingsParamsBuilder = (LauncherSettingsParams) -> Void
```
