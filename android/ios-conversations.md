# Conversations

In Delight AI agent, **conversation** refers to a channel where an **AI Agent** communicates with a user. Delight AI agent supports both **Single active conversation** and **Multiple active conversations** modes, with multiple active conversations being the default setting.

When a launcher is clicked, a user can be led to either their conversation list or a conversation depending on your choice of the conversation mode.

**Conversation Mode Comparison:**
- **Single Active Conversation**: One ongoing conversation per AI agent.
- **Multiple Active Conversations** (Default): Users can have multiple concurrent conversations with the same AI agent. Each conversation maintains its own context and history. Best for complex use cases where users need to maintain separate conversation threads.

---

## Start a conversation

Once you determined which conversation mode to opt for, conversations can begin through both **Launcher** and **Direct Presentation** methods.

**Method Comparison:**
- **Launcher**: Provides a persistent floating button UI. Best for applications where AI agent should be accessible from any screen. The launcher automatically handles conversation creation and presentation.
- **Direct Presentation**: Programmatically presents conversation or conversation list screens. Best for custom UI flows, button-triggered interactions, or when you need fine-grained control over when conversations are shown.

If there is no ongoing conversation, a new conversation is automatically created to start the dialogue. This provides seamless user experience without requiring manual conversation setup.

### With Launcher

The **Launcher** provides a floating button UI approach for starting conversations. Simply calling `attachLauncher(aiAgentId:)` enables automatic conversation start when the launcher is clicked.

For detailed **Launcher** API reference and comprehensive integration guide, see [Launcher Documentation](launcher.md).

```swift
import SendbirdAIAgentMessenger

// Basic launcher setup - automatically starts conversation when clicked
AIAgentMessenger.attachLauncher(
    aiAgentId: "your_ai_agent_id"
)
```

#### Configure launcher to open conversation directly

By default, the launcher opens a conversation when clicked. You can explicitly configure this behavior:

```swift
// Configure launcher to open conversation directly
let launcherOptions = SBALauncherOptions(
    parentView: nil,
    entryPoint: .conversation,
    layout: .default,
    displayStyle: .default
)

AIAgentMessenger.attachLauncher(
    aiAgentId: "your_ai_agent_id"
) { params in
    params.options = launcherOptions
}

// Configure launcher to open specific conversation with channel URL
let specificConversationOptions = SBALauncherOptions(
    parentView: nil,
    entryPoint: .conversation,
    layout: .default,
    displayStyle: .default
)

AIAgentMessenger.attachLauncher(
    aiAgentId: "your_ai_agent_id",
    channelURL: "sendbird_group_channel_12345"
) { params in
    params.options = specificConversationOptions
}
```

#### Configure launcher to open conversation list

You can configure the launcher to show the conversation list first:

```swift
// Configure launcher to open conversation list
let listOptions = SBALauncherOptions(
    parentView: nil,
    entryPoint: .conversationList,
    layout: .default,
    displayStyle: .default
)

AIAgentMessenger.attachLauncher(
    aiAgentId: "your_ai_agent_id"
) { params in
    params.options = listOptions
}
```

### With Direct Presentation

**Direct Presentation** provides a programmatic approach for starting conversations without the launcher button.

#### Launch conversations

```swift
// Start new conversation directly
AIAgentMessenger.presentConversation(
    aiAgentId: "your_ai_agent_id"
) { params in
    params.language = "en-US"
    params.countryCode = "US"
    params.context = [
        "user_type": "premium"
    ]
    params.presentationStyle = .fullScreen
}

// Start specific existing conversation
AIAgentMessenger.presentConversation(
    aiAgentId: "your_ai_agent_id",
    channelURL: "sendbird_group_channel_12345"
) { params in
    params.language = "en-US"
    params.context = [
        "user_type": "premium"
    ]
}
```

#### Launch conversation list

```swift
// Open conversation list directly
AIAgentMessenger.presentConversationList(
    aiAgentId: "your_ai_agent_id"
) { params in
    params.language = Locale.current.languageCode
    params.countryCode = Locale.current.regionCode
    params.presentationStyle = .fullScreen
}
```

---

## Advanced configuration

Beside the conversation mode, you can further configure how the conversation channels are created and built.

When a conversation begins, you can pass over user information to the channel so that AI agent can provide more personalized assistance to the user. This information is contained in a `context` object, which can be set at the creation of the conversation.

Also, you can open a specific conversation channel by passing its URL to either the launcher or direct presentation methods, or manually create a new one while in multiple conversation mode.

### Context object for personalized conversation

The **Context Object** allows you to provide personalized information to AI agents, including customer details like country code and language settings. This context can be set when creating conversations to enhance the conversational experience.

// turn the below info into a table with a list of params, their data type and description.

Context objects can be configured through:
- **ConversationSettingsParams** for direct presentation
- **ConversationCreateParams** for manual conversation creation
- **LauncherSettingsParams** for launcher configuration

```swift
// Setting context through ConversationSettingsParams
AIAgentMessenger.presentConversation(
    aiAgentId: "your_ai_agent_id"
) { params in
    params.language = "en-US"  // IETF BCP 47 format
    params.countryCode = "US"  // ISO 3166 format
    params.context = [
        "customer_tier": "premium",
        "previous_interaction": "support_ticket_123",
        "user_preferences": "technical_support"
    ]
}

// Using context with manual conversation creation
AIAgentMessenger.createConversation(
    aiAgentId: "your_ai_agent_id"
) { params in
    params.language = "en-US"
    params.countryCode = "US"
    params.context = [
        "customer_tier": "premium",
        "session_type": "first_visit"
    ]
} completionHandler: { result in
    switch result {
    case .success(let channelURL):
        print("Conversation created: \(channelURL)")
    case .failure(let error):
        print("Failed to create: \(error.localizedDescription)")
    }
}
```

### Opening a specific conversation with channel URL

You can open a specific conversation by passing its channel URL to either the launcher or direct presentation methods:

#### With Launcher

```swift
// Configure launcher to open specific conversation
AIAgentMessenger.attachLauncher(
    aiAgentId: "your_ai_agent_id",
    channelURL: "sendbird_group_channel_12345"
)

// Or present specific conversation directly
AIAgentMessenger.presentConversation(
    aiAgentId: "your_ai_agent_id",
    channelURL: "sendbird_group_channel_12345"
)
```

#### With Direct Presentation

```swift
// Open specific conversation with channel URL
AIAgentMessenger.presentConversation(
    aiAgentId: "your_ai_agent_id",
    channelURL: "sendbird_group_channel_12345"
) { params in
    params.presentationStyle = .fullScreen
}
```

### Start a conversation in multiple conversation mode

Only in **Multiple active conversation** mode, you can manually create a conversation using `AIAgentMessenger.createConversation(aiAgentId:paramsBuilder:completionHandler:)`.

>__Note__: In **Single active conversation** mode, a new conversation can't be created as long as there is an active conversation.

```swift
// Create conversation manually
AIAgentMessenger.createConversation(
    aiAgentId: "your_ai_agent_id"
) { params in
    params.language = "en-US"
    params.countryCode = "US"
    params.context = [
        "user_type": "premium",
        "session_id": "session_123"
    ]
} completionHandler: { result in
    switch result {
    case .success(let channelURL):
        // Use the returned channel URL to launch the conversation

        // Option 1: Present via direct method
        AIAgentMessenger.presentConversation(
            aiAgentId: "your_ai_agent_id",
            channelURL: channelURL
        )

        // Option 2: Attach launcher with specific channel
        AIAgentMessenger.attachLauncher(
            aiAgentId: "your_ai_agent_id",
            channelURL: channelURL
        )

        print("Successfully created conversation: \(channelURL)")

    case .failure(let error):
        // Handle error case
        print("Failed to create conversation: \(error.localizedDescription)")
    }
}
```

### Presentation Methods

**AIAgentMessenger** provides the following public methods for conversation management:

| Method | Parameters | Description | Usage Scenario |
|--------|------------|-------------|----------------|
| `presentConversation` | aiAgentId, channelURL?, paramsBuilder? | Presents a conversation screen | Use when you want to show a specific or new conversation |
| `presentConversationList` | aiAgentId, paramsBuilder? | Presents the conversation list screen | Use when you want to show all conversations to let user choose |
| `attachLauncher` | aiAgentId, channelURL?, paramsBuilder? | Attaches launcher button to screen | Use when you want a persistent floating button |

#### Complete integration example

The following example demonstrates how to integrate all conversation launch methods in a single view controller. It shows the launcher setup, direct conversation creation, conversation list presentation, and fullscreen conversation presentation.

```swift
import UIKit
import SendbirdAIAgentMessenger

class MainViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        setupConversationIntegration()
    }

    private func setupConversationIntegration() {
        // Setup launcher for floating UI
        AIAgentMessenger.attachLauncher(
            aiAgentId: "your_ai_agent_id"
        )

        // Setup buttons for different conversation launch methods
        setupButtons()
    }

    private func setupButtons() {
        // Button actions would be connected in storyboard or programmatically
    }

    @IBAction func newConversationButtonTapped(_ sender: Any) {
        createNewConversation()
    }

    @IBAction func conversationListButtonTapped(_ sender: Any) {
        openConversationList()
    }

    @IBAction func fullscreenConversationButtonTapped(_ sender: Any) {
        openFullScreenConversation()
    }

    private func createNewConversation() {
        AIAgentMessenger.createConversation(
            aiAgentId: "your_ai_agent_id"
        ) { params in
            params.language = Locale.current.languageCode
            params.context = ["source": "main_view_controller"]
        } completionHandler: { result in
            switch result {
            case .success(let channelURL):
                // Launch the created conversation
                AIAgentMessenger.presentConversation(
                    aiAgentId: "your_ai_agent_id",
                    channelURL: channelURL
                )
            case .failure(let error):
                self.showError("Failed to create conversation: \(error.localizedDescription)")
            }
        }
    }

    private func openConversationList() {
        AIAgentMessenger.presentConversationList(
            aiAgentId: "your_ai_agent_id"
        ) { params in
            params.presentationStyle = .fullScreen
        }
    }

    private func openFullScreenConversation() {
        AIAgentMessenger.presentConversation(
            aiAgentId: "your_ai_agent_id"
        ) { params in
            params.language = "en-US"
            params.context = ["launch_source": "fullscreen_button"]
            params.presentationStyle = .fullScreen
        }
    }

    deinit {
        AIAgentMessenger.detachLauncher(aiAgentId: "your_ai_agent_id")
    }

    private func showError(_ message: String) {
        // Display error to user using your app's error handling
        // Example: show alert, toast, or custom error view
        print("Error: \(message)")
    }
}
```

---

## API Reference

### AIAgentMessenger Conversation Methods

Core methods for managing conversations in the AI Agent Messenger SDK.

#### presentConversation

Presents a conversation screen in full-screen or modal mode.

```swift
static func presentConversation(
    aiAgentId: String,
    channelURL: String? = nil,
    paramsBuilder: ConversationSettingsParamsBuilder? = nil
)
```

**Parameters:**
- `aiAgentId`: The ID of the AI agent
- `channelURL`: Optional channel URL. If nil, creates new conversation
- `paramsBuilder`: Optional closure to configure conversation settings

**Example:**
```swift
AIAgentMessenger.presentConversation(
    aiAgentId: "your_ai_agent_id",
    channelURL: "sendbird_group_channel_123"
) { params in
    params.language = "en-US"
    params.presentationStyle = .fullScreen
}
```

#### presentConversationList

Presents the conversation list screen.

```swift
static func presentConversationList(
    aiAgentId: String,
    paramsBuilder: ConversationSettingsParamsBuilder? = nil
)
```

**Parameters:**
- `aiAgentId`: The ID of the AI agent
- `paramsBuilder`: Optional closure to configure list settings

**Example:**
```swift
AIAgentMessenger.presentConversationList(
    aiAgentId: "your_ai_agent_id"
) { params in
    params.language = "ko-KR"
    params.presentationStyle = .pageSheet
}
```

#### createConversation

Creates a new conversation with an AI agent.

```swift
static func createConversation(
    aiAgentId: String,
    paramsBuilder: ConversationCreateParamsBuilder? = nil,
    completionHandler: @escaping ChannelURLResponseHandler
)
```

**Parameters:**
- `aiAgentId`: The ID of the AI agent
- `paramsBuilder`: Optional closure to configure conversation creation
- `completionHandler`: Closure that receives created channel URL or error

**Example:**
```swift
AIAgentMessenger.createConversation(
    aiAgentId: "your_ai_agent_id"
) { params in
    params.language = "en-US"
    params.context = ["user_type": "premium"]
} completionHandler: { result in
    switch result {
    case .success(let channelURL):
        print("Created: \(channelURL)")
    case .failure(let error):
        print("Error: \(error)")
    }
}
```

### ConversationSettingsParams

Configuration parameters for conversation and conversation list screens.

| Property | Type | Description | Default |
|----------|------|-------------|---------|
| `parent` | UIViewController? | Parent view controller for presentation | nil |
| `presentationStyle` | UIModalPresentationStyle | Modal presentation style | .fullScreen |
| `language` | String? | Language code (IETF BCP 47) | nil |
| `countryCode` | String? | Country code (ISO 3166) | nil |
| `context` | [String: String] | Additional metadata for AI agent | [:] |

**Example:**
```swift
let params = ConversationSettingsParams()
params.parent = self
params.presentationStyle = .pageSheet
params.language = "en-US"
params.countryCode = "US"
params.context = ["user_tier": "premium"]
```

### ConversationCreateParams

Parameters for creating new conversations with AI agents.

| Property | Type | Description | Default |
|----------|------|-------------|---------|
| `language` | String? | Language code (IETF BCP 47) | nil |
| `countryCode` | String? | Country code (ISO 3166) | nil |
| `context` | [String: String] | Additional metadata for AI agent | [:] |

**Example:**
```swift
let params = ConversationCreateParams()
params.language = "ko-KR"
params.countryCode = "KR"
params.context = [
    "customer_tier": "premium",
    "session_type": "support"
]
```

### LauncherSettingsParams

Configuration parameters for the launcher button.

| Property | Type | Description | Default |
|----------|------|-------------|---------|
| `options` | SBALauncherOptions | Launcher layout and display options | .default |
| `language` | String? | Language code (IETF BCP 47) | nil |
| `countryCode` | String? | Country code (ISO 3166) | nil |
| `context` | [String: String] | Additional metadata for AI agent | [:] |

**Example:**
```swift
let params = LauncherSettingsParams()
params.options.layout.position = .trailingBottom
params.options.displayStyle = .overlay()
params.language = "en-US"
params.context = ["source": "launcher"]
```

### ChannelURLResponseHandler

Type alias for conversation creation completion handler.

```swift
typealias ChannelURLResponseHandler = (Result<String, Error>) -> Void
```

**Usage:**
```swift
AIAgentMessenger.createConversation(
    aiAgentId: "agent_id"
) { result in
    switch result {
    case .success(let channelURL):
        // Handle success with channel URL
        print("Channel created: \(channelURL)")
    case .failure(let error):
        // Handle error
        print("Error: \(error.localizedDescription)")
    }
}
```

### UIModalPresentationStyle

Standard UIKit presentation styles supported by the SDK.

| Style | Description |
|-------|-------------|
| `.fullScreen` | Full screen modal presentation |
| `.pageSheet` | Sheet that covers most of the screen |
| `.formSheet` | Form-style centered modal |
| `.currentContext` | Presents over current context |
| `.overFullScreen` | Presents over full screen with transparency |

**Example:**
```swift
AIAgentMessenger.presentConversation(
    aiAgentId: "agent_id"
) { params in
    params.presentationStyle = .pageSheet
}
```
