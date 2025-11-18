# Changelog

## v1.3.0 (Nov 6, 2025) with Chat SDK `v4.32.0`

### Features

- Added the ability to send feedback on AI agent messages
  - Added `fun createMessageFeedback(params: AIAgentMessageFeedbackCreateParams, handler: AIAgentMessageFeedbackCreateHandler?)` in `ConversationViewModel`
  - Added `fun updateMessageFeedback(params: AIAgentMessageFeedbackUpdateParams, handler: AIAgentMessageFeedbackUpdateHandler?)` in `ConversationViewModel`
  - Added `fun deleteMessageFeedback(params: AIAgentMessageFeedbackDeleteParams, handler: AIAgentMessageFeedbackDeleteHandler?)` in `ConversationViewModel`
  - Added `suspend fun awaitCreateMessageFeedback(params: AIAgentMessageFeedbackCreateParams)` in `ConversationRepository`
  - Added `suspend fun awaitUpdateMessageFeedback(params: AIAgentMessageFeedbackUpdateParams)` in `ConversationRepository`
  - Added `suspend fun awaitDeleteMessageFeedback(params: AIAgentMessageFeedbackDeleteParams)` in `ConversationRepository`
  - Added `OnMessageFeedbackClickListener` interface for handling feedback clicks
  - Added `MessageFeedbackView` widget for displaying message feedback UI
  - Added `MessageFeedbackStyle` and `MessageFeedbackDialogStyle` for theme customization

### Improvements

- Improved CSAT to support optional Custom Response Elements (CRE)
  - Added `creOptionalLabelTextAppearance` property in theme styles
  - Added `csatOptionalLabelTextAppearance` property in theme styles

- Updated Sendbird Chat SDK to 4.32.0

---

## v1.2.2 (Nov 3, 2025) with Chat SDK `v4.31.1`

### Improvements

- Updated Sendbird Chat SDK to 4.31.1
  - Fixed a possible binary compatibility issue when using Chat SDK in multiple products

---

## v1.2.1 (Oct 30, 2025) with Chat SDK `v4.31.0`

### Improvements

- Enforced AppCompat theme for consistent UI across different app themes
  - Applied fixed `Theme.AppCompat.DayNight.NoActionBar` theme to `MessengerLauncher` using `ContextThemeWrapper`
  - Added explicit theme declarations in `AndroidManifest.xml` for `MessengerActivity` and `PhotoViewActivity`
  - Ensures consistent UI rendering regardless of host app's theme (Material3, Material2, or AppCompat)

- Updated CSAT string resources

- Optimized CSAT message update logic in `MessageDiffCallback`

---

## v1.2.0 (Oct 29, 2025) with Chat SDK `v4.31.0`

### Features

- Implemented failed message retry with better UX and disabled retry during AI response
  - Added `fun resendUserMessage(message: UserMessage, handler: UserMessageHandler?)` and `fun resendFileMessage(message: FileMessage, handler: FileMessageHandler?)` in `ConversationViewModel`
  - Added `fun resendUserMessage(message: UserMessage, handler: UserMessageHandler?)` and `fun resendFileMessage(message: FileMessage, handler: FileMessageHandler?)` in `ConversationRepository`

- Implemented support for closing conversation manually
  - Added `fun closeConversation(handler: CompletionHandler?)` in `ConversationViewModel`
  - Added `suspend fun awaitCloseConversation()` in `ConversationRepository`

- An interface has been added to `ConversationHeaderView` that allows you to add and remove a custom view
  - Added `fun addToRightSlot(view: View)`
  - Added `fun addToLeftSlot(view: View)`
  - Added `fun addToCenterSlot(view: View)`
  - Added `fun removeFromRightSlot(view: View)`
  - Added `fun removeFromLeftSlot(view: View)`
  - Added `fun removeFromCenterSlot(view: View)`
---

## v1.1.0 (Oct 2, 2025) with Chat SDK `v4.29.0`

### Features
- Custom CSAT support: Dashboard-driven CSAT UI customization with follow-up questions

---

## v1.0.0 (Sep 25, 2025) with Chat SDK `v4.29.0`

### Highlights

- **AI Agent Chat**: Engage in natural, context-aware conversations with an AI agent, including real-time messaging and conversation list.
- **Messenger Launcher Widget**: Easily add a floating launcher button to your app’s interface.
- **Full-Screen Messenger**: Instantly launch a full-screen chat with the AI agent via a dedicated activity.
- **Easy Integration**: Initialize and launch the AI agent messenger with just a few lines of code.
- **Customizable UI**: Configure launcher position, margin, and other appearance options.
- **Handoff & CSAT Support**: Future support for agent handoff and customer satisfaction surveys.

---

### Requirements
The minimum requirements for AI Agent for Android are the following.

- Android 5.0 (API level 21) or higher
- Java 11 or higher
- Android Gradle plugin 8.0.0 or higher
- Android ViewBinding enabled
- Sendbird Chat SDK 4.23.1 or higher
- Sendbird UIKit 3.22.1 or higher

---

### Features

**Delight AI Agent Messenger SDK has been officially released!**
This SDK enables you to seamlessly integrate an enterprise-grade AI-powered chat agent into your Android applications.

#### 1. Attaching the MessengerLauncher into the Screen
The SDK provides the MessengerLauncher view, which can be easily attached to your application’s root view programmatically without directly adding it to XML layouts.

> Since the SDK utilizes Fragments, make sure the context you pass to the MessengerLauncher is an instance of FragmentActivity. If you’re using standard Android components such as AppCompatActivity, there’s no need to worry, as it already inherits from FragmentActivity.
However, if you’re using a custom or legacy activity, verify that it inherits from FragmentActivity to avoid runtime issues.

To add the MessengerLauncher to your screen, simply call the `attach()` function of `MessengerLauncher`, specifying the AI agent ID and configuration parameters:

```kotlin
MessengerLauncher(context, "your_ai_agent_id").attach()
```

- `LauncherLayoutParams` allows you to configure the MessengerLauncher’s behavior and appearance:
  - **`launchMode`**:
    - `EXPANDED`: Opens the messenger in full-screen mode with predefined margins.
    - `ANCHORED`: Opens the messenger anchored near the launcher button, with adjustable positioning.

  - **`margin`**: Defines the margin around the launcher button itself (does not affect the messenger window).

  - **`location`**: Determines which corner of the screen the launcher will appear in. Available options are:
    - `TOP_START`
    - `TOP_END`
    - `BOTTOM_START`
    - `BOTTOM_END`

> Attach the launcher in your activity or view to create a floating entry point for AI chat.

---

#### 2. Launching the Full-Screen Messenger
You can open a full-screen conversation by starting an `Activity`.

```kotlin
startActivity(MessengerActivity.newIntentForConversation(context, "your_ai_agent_id"))
or
startActivity(MessengerActivity.newIntentForConversationList(context, "your_ai_agent_id"))
```
---
