# Messages

Delight AI agent messenger provides various message types to enable rich and interactive conversations with AI Agents. The messenger supports diverse message formats including text, images, files, and rich template-based messages, allowing users to have comprehensive and engaging conversations with AI agents across different use cases.

---

## Types

Delight AI agent messenger supports various message types to provide comprehensive communication capabilities between users and AI agents. Each message type is designed for specific use cases and content formats.

|  Type | Description | Content format | Use cases |
|-------------|------------|----------------|-----------|
| [Text message](#text-message) | Regular text-based communication | Plain text | Basic conversational interactions, Q&A, general dialogue |
| [Image message](#image-message) | Visual file sharing | Image files in `PNG` and `JPG` only | Visual communication, screenshots, diagrams |
| [File message](#file-message) | Document and file sharing | Various file formats | Document sharing, attachments, downloadable resources |
| [Rich message](#rich-message)| Template-based interactive UI | Structured JSON templates | Product displays, carousels, forms, interactive elements |

### Text Message

**Text Message** represents regular text-based communication between users and AI agents. These messages support plain text content and are the foundation of conversational interactions.

- Content: Plain text messages. Markdown supported.
- Use case: Basic conversational interactions.
- Support: Full text rendering with proper formatting.

### Image Message

**Image Message** enables sharing of image files within conversations. This message type supports common image formats for visual communication.

- Supported formats: `JPEG`, `PNG` only. Can be sent with text.
- Use case: Sharing visual content.
- Display: Optimized image rendering with proper scaling.

<img width="362" height="641" src="https://github.com/user-attachments/assets/27f77195-04c5-4591-b2a0-77f13b184de1" />

>__Note__: However, once handed off to a human agent, users can send image files in any format.

### File Message

**File Message** allows sharing of various file formats within conversations, enabling sharing document and resource between users and AI agents.

- Supported formats: `PDF` only. Can be sent with text.
- Use case: Document sharing and file-based communication.
- Display: File preview with download capabilities.

<img width="363" height="645" src="https://github.com/user-attachments/assets/ef96f422-be0b-4bcf-9fb2-dbf0adb663be" />

### Rich Message

**Rich Message** utilizes predefined templates to create interactive and visually appealing message experiences. These templates are configurable through the Delight AI dashboard settings and provide enhanced user interaction.

#### Call to Action (CTA) button

**CTA** messages contain a button that allows users to take specific actions directly from the conversation interface. In the Delight AI messenger, the button opens the specified external URL in a web browser.

- Components: A single button that links to an external webpage. Custom link formats are not supported.
- Use case: Action-oriented user interactions.
- Configuration: Available through dashboard template configuration.

<img width="363" height="641" src="https://github.com/user-attachments/assets/fc97f72b-3560-40c8-98a7-2533faddcb60" />

#### Carousel

**Carousel** messages present multiple items that can be horizontally scrolled. This allows users to browse through various options or content pieces in a compact format.

- Layout: Horizontal scrolling interface.
- Content: Multiple items with individual interactions.
- Use case: Product showcases, option selection, content browsing.

<img width="361" height="641" src="https://github.com/user-attachments/assets/0080282c-e0d1-466f-a984-9c4342027f7c" />

#### Suggested replies

**Suggested replies** provide predefined quick responses for users, enabling faster and more efficient conversation flow by offering common response options.

- Functionality: Quick response selection.
- Use case: Streamlined user interactions and faster response times.
- Display: Accessible quick reply buttons.

<img width="360" height="639" src="https://github.com/user-attachments/assets/9ce0e000-f3d4-4e4d-ba5a-17b30064d032" />

#### CSAT Message

**CSAT Message** is designed to collect user feedback for customer satisfaction (CSAT) survey within conversations.

- Purpose: Customer satisfaction measurement.
- Components: Rating systems and feedback collection.
- Use case: Service quality assessment and user experience evaluation.

<img width="361" height="642" src="https://github.com/user-attachments/assets/52e0028c-3b80-4c60-906e-2c9205be53cd" />

#### Product List

**Product List** messages display product information in a vertical scrolling format, different from Carousel with its vertical layout optimized for product browsing and selection.

- Layout: Vertical scrolling interface.
- Content: Product information and details.
- Use case: E-commerce integration, product showcases, inventory display.

---

## Key Features

The core features supported for messages in Delight AI agent include:

- [Read receipt](#read-receipt)
- [Citation](#citation)
- [Special notice](#special-notice)

### Read receipt

Messages in a conversation can display their read status, indicating when they have been viewed by participants. By default, read status isn't displayed, but it can be enabled through `AIAgentMessenger.config`.

```swift
import SendbirdAIAgentMessenger

// Enable message receipt state
AIAgentMessenger.config.conversation.list.isMessageReceiptStateEnabled = true
```

#### SDK configuration

The read receipt feature can also be controlled through the SDK configuration:

```swift
// Access conversation list configuration
let listConfig = AIAgentMessenger.config.conversation.list

// Enable or disable read receipts
listConfig.isMessageReceiptStateEnabled = true  // Show read receipts
listConfig.isMessageReceiptStateEnabled = false // Hide read receipts
```

// to Tez: 이거는 sdk config에서 따로 또 enabled가 가능하시다는 걸까요?... read receipt만 키면 아래도 다 되는 거예요?

Visual Indicators:

When enabled, messages display visual indicators showing:

- Sent status
- Delivered status
- Read status with timestamp

### Citation

**Citation** feature displays source information of AI agent responses, allowing users to see the references and sources that the AI agent used to generate its responses. This feature provides transparency and credibility to the AI agent's answers.

- Default: Disabled by default.
- Configuration: Requires dashboard configuration to be displayed.
- Activation settings: Adjustable through dashboard configuration values.

#### Implementation

Citations are automatically rendered by the SDK when provided by the AI agent. No additional code is required in your iOS application - the feature is configured entirely through Delight AI dashboard.

When enabled, citations appear as:

- Source links or references
- Document titles
- URL references
- Knowledge base articles

Citations appear inline within the message content, providing users with source references and additional context for the AI agent's responses. They display as clickable elements that can expand and collapse, with more details about the source.

### Special notice

**Special Notice** displays important information to users before conversation starts. This feature helps communicate important guidelines, terms, or instructions to users at the beginning of their interaction.

- Display location: Bottom of the screen.
- Behavior: Automatically disappears when a conversation starts.
- Configuration: Available through dashboard configuration.

<img width="359" height="643" src="https://github.com/user-attachments/assets/4da72edf-d181-427d-9bbe-003b68fa4dd6" />

#### Usage

Special notices are configured through Delight AI dashboard and automatically displayed by the SDK. The notice appears:

- When conversation screen is first opened
- Before any messages are sent
- At the bottom of the conversation view
- Dismisses automatically when user sends first message

---

## API reference

### SBAConfig.Conversation.List

The following table lists the configuration options for conversation list and message display.

| Property | Type | Description | Default |
|----------|------|-------------|---------|
| `isMessageReceiptStateEnabled` | Bool | Enable/disable message read receipts | false |

```swift
import SendbirdAIAgentMessenger

// Configure message receipt state
AIAgentMessenger.config.conversation.list.isMessageReceiptStateEnabled = true
```


// To Tez: 여기서부터는 API ref가 아닌 것 같아서... 뭐를 적어주신 걸까요?...

### Message Types

The SDK automatically handles different message types without requiring explicit type checking in most cases. Messages are rendered according to their type:

| Type | Class | Description |
|------|-------|-------------|
| Text | UserMessage | Plain text messages |
| Image | FileMessage | Image files (JPEG, PNG) |
| File | FileMessage | Document files (PDF) |
| Rich | UserMessage with template | Template-based interactive messages |

### Message Display Configuration

Text Message Configuration:

Text messages are automatically formatted and displayed. The SDK handles:
- Text wrapping
- URL detection and linking
- Markdown rendering (if enabled)
- Font and color theming

Image Message Configuration:

Image messages are displayed with:
- Automatic thumbnail generation
- Full-size image preview on tap
- Loading indicators
- Error handling for failed downloads

File Message Configuration:

File messages show:
- File name and size
- File type icon
- Download button
- Preview capability (for PDFs)

Rich Message Configuration:

Rich messages using templates include:
- Interactive buttons (CTA)
- Horizontal carousels
- Suggested reply chips
- CSAT rating interfaces
- Product list layouts

All rich message templates are configured through the Sendbird dashboard and automatically rendered by the SDK.

### Advanced Message Features

#### Message Receipt State

Control message read receipt display:

```swift
import SendbirdAIAgentMessenger

class ConversationViewController: UIViewController {
    override func viewDidLoad() {
        super.viewDidLoad()

        // Enable read receipts
        AIAgentMessenger.config.conversation.list.isMessageReceiptStateEnabled = true
    }
}
```

#### Message Rendering Customization

The SDK provides theming options for message appearance:

```swift
// Access current color scheme
let currentScheme = AIAgentMessenger.currentColorScheme
let currentColors = AIAgentMessenger.currentColorSet

// Update color scheme (light or dark mode)
AIAgentMessenger.update(colorScheme: .dark)

// Message colors are automatically applied to all message types
```

### Configuration Best Practices

#### Enabling Read Receipts

Enable read receipts early in your application lifecycle:

```swift
import UIKit
import SendbirdAIAgentMessenger

@main
class AppDelegate: UIResponder, UIApplicationDelegate {
    func application(
        _ application: UIApplication,
        didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?
    ) -> Bool {
        // Initialize SDK first
        AIAgentMessenger.initialize(appId: "YOUR_APP_ID") { result in
            if case .success = result {
                // Configure message features
                AIAgentMessenger.config.conversation.list.isMessageReceiptStateEnabled = true
            }
        }
        return true
    }
}
```

#### Runtime Configuration Changes

You can change message configuration at runtime:

```swift
class SettingsViewController: UIViewController {
    @IBAction func toggleReadReceipts(_ sender: UISwitch) {
        // Update configuration
        AIAgentMessenger.config.conversation.list.isMessageReceiptStateEnabled = sender.isOn

        // Configuration takes effect immediately for new messages
        // Existing conversation views may need to be refreshed
    }
}
```

### Message Template Handling

Rich messages use templates configured in the dashboard. The SDK automatically:
- Fetches template definitions
- Renders template components
- Handles user interactions
- Sends action events back to the AI agent

>__Note__: No additional code is required for template rendering - just ensure templates are properly configured in the Sendbird dashboard.

### Special Notice Configuration

Special notices are configured through the dashboard and automatically displayed by the SDK. To customize the behavior:

Display Timing:
- Appears on conversation screen load
- Before first message is sent
- Automatically dismissed after user interaction

Customization:
- Content and styling configured in dashboard
- Dismissal behavior is automatic
- No code changes needed in iOS app

### Error Handling

Handle message-related errors gracefully:

```swift
import SendbirdChatSDK

func handleMessageError(_ error: SBError) {
    print("Message error: \(error.localizedDescription)")
}
```
