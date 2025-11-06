Text
상대방이 보낸 메세지에 markdown 신택스 지원 추가. (모든 플랫폼 다 해당)
Image
JPEG, PNG만 지원하지만 handoff 이후에는 모든 이미지 타입을 지원. (모든 플랫폼 다 해당)
Text메세지와 함께 전송하는 스펙 추가.(모든 플랫폼 다 해당)
File
Text메세지와 함께 전송하는 스펙 추가.(모든 플랫폼 다 해당)
Call to Action (CTA) button
CTA는 메세지에 외부링크로 이동할 수 있는 버튼을 포함하며, 외부 브라우저로 이동하는것이 기본동작.
link는 지원하지 않으며 (UI는 버튼으로 통일됨)
Read receipt
표시하지 않는것이 기본값
Theme값 스타일 변경으로 color값을 변경할 수 있지만, feature guide에서는 theme 변경에 대한것을 가이드 하지 않습니다.


# Messages

Delight AI agent messenger provides various message types to enable rich and interactive conversations with AI Agents. The messenger supports diverse message formats including text, images, files, and rich template-based messages, allowing users to have comprehensive and engaging conversations with AI agents across different use cases.

---

## Types

Delight AI agent messenger supports various message types to provide comprehensive communication capabilities between users and AI agents. Each message type is designed for specific use cases and content formats.

// Make a 4-column table using the following information and add here. Describe the definition and characteristics of text message, image message, file message, rich message in the table.
// if the table seems to be inadequate format for the content, keep the current format.

### Text Message

**Text Message** represents regular text-based communication between users and AI agents. These messages support plain text content and are the foundation of conversational interactions.

- **Content**: Plain text messages.
- **Use case**: Basic conversational interactions.
- **Support**: Full text rendering with proper formatting.

### Image Message

**Image Message** enables sharing of image files within conversations. This message type supports common image formats for visual communication.

- **Supported formats**: `JPEG`, `PNG` only.
- **Use case**: Sharing visual content.
- **Display**: Optimized image rendering with proper scaling.

<img width="362" height="641" src="https://github.com/user-attachments/assets/27f77195-04c5-4591-b2a0-77f13b184de1" />

### File Message

**File Message** allows sharing of various file formats within conversations, enabling sharing document and resource between users and AI agents.

- **Supported formats**: `PDF` only.
- **Use case**: Document sharing and file-based communication.
- **Display**: File preview with download capabilities.

<img width="363" height="645" src="https://github.com/user-attachments/assets/ef96f422-be0b-4bcf-9fb2-dbf0adb663be" />

### Rich Message

**Rich Message** utilizes predefined templates to create interactive and visually appealing message experiences. These templates are configurable through the Delight AI dashboard settings and provide enhanced user interaction.

#### Call to Action (CTA) button

**CTA** messages contain buttons or links that enable users to take specific actions directly from the conversation interface.

- **Components**: Interactive buttons and clickable links.
- **Use case**: Action-oriented user interactions.
- **Configuration**: Available through dashboard template configuration.

<img width="363" height="641" src="https://github.com/user-attachments/assets/fc97f72b-3560-40c8-98a7-2533faddcb60" />

#### Carousel

**Carousel** messages present multiple items that can be horizontally scrolled. This allows users to browse through various options or content pieces in a compact format.

- **Layout**: Horizontal scrolling interface.
- **Content**: Multiple items with individual interactions.
- **Use case**: Product showcases, option selection, content browsing.

<img width="361" height="641" src="https://github.com/user-attachments/assets/0080282c-e0d1-466f-a984-9c4342027f7c" />

#### Suggested replies

**Suggested replies** provide predefined quick responses for users, enabling faster and more efficient conversation flow by offering common response options.

- **Functionality**: Quick response selection.
- **Use case**: Streamlined user interactions and faster response times.
- **Display**: Accessible quick reply buttons.

<img width="360" height="639" src="https://github.com/user-attachments/assets/9ce0e000-f3d4-4e4d-ba5a-17b30064d032" />

#### CSAT Message

**CSAT Message** is designed to collect user feedback for customer satisfaction (CSAT) survey within conversations.

- **Purpose**: Customer satisfaction measurement.
- **Components**: Rating systems and feedback collection.
- **Use case**: Service quality assessment and user experience evaluation.

<img width="361" height="642" src="https://github.com/user-attachments/assets/52e0028c-3b80-4c60-906e-2c9205be53cd" />

#### Product List

**Product List** messages display product information in a vertical scrolling format, different from Carousel with its vertical layout optimized for product browsing and selection.

- **Layout**: Vertical scrolling interface.
- **Content**: Product information and details.
- **Use case**: E-commerce integration, product showcases, inventory display.

<img width="360" height="639" alt="cascade" src="https://github.com/user-attachments/assets/e0c68cfd-bc40-4657-b770-7eafd0c5dd80" />

---

## Key Features

The core features supported for messages in Delight AI agent include:

- Read receipt[link to the internal section]
- Citation[link to the internal section]
- Special notice[link to the internal section]

### Read receipt

// tbd: can we customize the icon or its color? can our customers customize the code and allow users to hide it?

Messages within conversations can display read status to show when messages have been viewed. This feature can be enabled through **AIAgentMessenger.config** for read-receipt feature activation.

```kotlin
// Enable message receipt state
AIAgentMessenger.config.conversation.list.enableMessageReceiptState = true
```

### Citation

**Citation** feature displays source information of AI agent responses, allowing users to see the references and sources that the AI agent used to generate its responses. This feature provides transparency and credibility to the AI agent's answers.

- **Default**: Disabled by default.
- **Configuration**: Requires dashboard configuration to be displayed.
- **Activation settings**: Adjustable through dashboard configuration values.

<img width="359" height="643" src="https://github.com/user-attachments/assets/4da72edf-d181-427d-9bbe-003b68fa4dd6" />

### Special notice

**Special Notice** displays important information to users before conversation starts. This feature helps communicate important guidelines, terms, or instructions to users at the beginning of their interaction.

- **Display location**: Bottom of the screen.
- **Behavior**: Automatically disappears when a conversation starts.
- **Configuration**: Available through dashboard configuration.

<img width="359" height="799" alt="special_notice" src="https://github.com/user-attachments/assets/d2dfeff2-c0fb-47b4-9e8d-066517a39c77" />

---

## API reference
The following table provides comprehensive API reference information for message-related functionality:

### ConversationConfig

The `ConversationConfig` class provides configuration options for the conversation screen, organized into two sub-configurations: `header` and `list`.

#### ConversationConfig.Header

Configuration options for the conversation header component.

| Property Name | Description | Default Value |
|--------------|-------------|---------------|
| `shouldShowProfile` | A boolean flag indicating whether the profile should be shown in the conversation header | `true` |

**Example:**

```kotlin
// Hide profile in conversation header
AIAgentMessenger.config.conversation.header.shouldShowProfile = false

// Show profile in conversation header
AIAgentMessenger.config.conversation.header.shouldShowProfile = true
```

## Configuration Properties

| Property | Type | Default | Description |
|---|---|---|---|
| `enableMessageReceiptState` | Boolean | `true` | Whether to display message receipt status |
| `shouldShowSenderProfile` | Boolean | `true` | Whether to show sender's profile information |
| `shouldShowProfile` | Boolean | `true` | Whether profile should be shown in header |
