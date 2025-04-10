**iOS** / [Android](https://github.com/sendbird/sendbird-ai-agent/blob/main/android/README.md) / [JS](https://github.com/sendbird/sendbird-ai-agent/blob/main/js/README.md)

# Sendbird AI Agent Quickstart guide (iOS)

The **Sendbird AI Agent Messenger** allows seamless integration of chatbot features into your iOS application. Follow the steps below to initialize and utilize the SDK effectively.

- [Sendbird AI Agent Quickstart guide (iOS)](#sendbird-ai-agent-quickstart-guide-ios)
  - [Requirements](#requirements)
  - [Prerequisites](#prerequisites)
  - [Getting started](#getting-started)
    - [Step 1. Create a new project](#step-1-create-a-new-project)
    - [Step 2. Install AI Agent SDK](#step-2-install-ai-agent-sdk)
    - [Step 3. Initialize AI Agent SDK](#step-3-initialize-ai-agent-sdk)
  - [Running your application](#running-your-application)
    - [Manage user sessions](#manage-user-sessions)
    - [Launch the messenger](#launch-the-messenger)
  - [Advanced features](#advanced-features)
    - [Update SDK theme](#update-sdk-theme)
    - [Deauthenticate and clear session](#deauthenticate-and-clear-session)
    - [Passing context object to Agent](#passing-context-object-to-agent)

## Requirements

The minimum requirements for AI Agent for iOS are the following.

- Xcode 16.0 or later
- Swift Package Manager (SPM) support

## Prerequisites

Before you start, you'll need your Sendbird **Application ID** and **AI Agent ID**. 
<br><br/>
You can find it under the **Channels** > **Messenger** menu on the Sendbird Dashboard.

![ai-agent-app-id-agent-id](https://github.com/user-attachments/assets/37d2873e-f35d-45dd-97cc-3d7c7e638a0c)

---

## Getting Started

Quickly install and initialize the AI Agent SDK by following the steps below.

### Step 1. Create a new project

1. Open Xcode.
2. Choose **File > New > Projec**.
3. Select **iOS** as the platform and **App** as the template.

![ai-agent-swiftui-tutorial-create-project](https://github.com/user-attachments/assets/d864fcf1-ddf2-4f42-9913-447ff8ab874f)

![aiagent-ios-project-options](https://github.com/user-attachments/assets/13f7b8c9-396b-4cc1-ba49-0339db2ddfc9)


### Step 2. Install AI Agent SDK

1. In **Xcode**, select **File > Add Package Dependencies**.
2. Add **SendbirdAIAgentMessenger** into your package repository using the following URL:
    
     ```
     https://github.com/sendbird/sendbird-ai-agent-messenger-ios.git
     ```
    
3. Set the **Dependency Rule** to **Branch** and use the provided branch name.

### Step 3. Initialize AI Agent SDK

  Initialize the SDK by providing the **appId** (generated via Dashboard) and configuration parameters:


```swift
// Import the SDK
import SendbirdAIAgentMessenger

// Initialize the SDK
let params = AIAgentMessenger.InitializeParams()

AIAgentMessenger.initialize(
    appId: appId,
    params: params
) { [weak self] result in
    guard let self = self else { return }

    switch result {
    case .success:
        // SDK initialized successfully
        break
    case .failure(let error):
        // Handle initialization error
        break
    }
}
```

---

## Running your application

Now that you have installed and initialized the AI Agent SDK, follow the steps below to run your application.

### Manage user sessions

User sessions require periodic token reissuance for security purposes, so the following session management is necessary.

#### 1. Updating session information

Update the session information to ensure proper session management:
    
```swift
AIAgentMessenger.updateSessionInfo(
    with: AIAgentMessenger.UserSessionInfo(
        userId: userId,
        sessionToken: sessionToken,
        sessionDelegate: self
    )
)
```
    
#### 2.Implementing session delegate

Handle session-related events by implementing `AIAgentSessionDelegate`:
    
```swift
public protocol AIAgentSessionDelegate: AnyObject {
    func sessionTokenDidRequire(
        successCompletion success: @escaping (String?) -> Void,
        failCompletion fail: @escaping () -> Void
    )
    
    func sessionWasClosed()
    func sessionWasRefreshed()
    func sessionDidHaveError(_ error: Error)
}
```
    
### Launch the messenger

Once the authentication information has been successfully registered, you can launch the messenger to start a conversation with the ai agent.

There are two ways to display the chat view:

1. Using the launcher button
2. Opening the conversation channel in presentation mode

#### 1. Using the launcher button

![Image](https://github.com/user-attachments/assets/74eea8d0-a984-4fb9-9c35-299b6b35b283)

Display a floating launcher button:

```swift
AIAgentMessenger.attachLauncher(
    aiAgentId: self.aiAgentId,
    options: SBALauncherLayoutOptions()
)
```

To hide the launcher:

```swift
AIAgentMessenger.detachLauncher(botId: self.botId)
```

#### 2. Opening the conversation channel in presentation mode

![Image](https://github.com/user-attachments/assets/348ccad1-ec9a-4851-9324-084eaf569e34)
    
Present the chat view as a modal:

```swift
AIAgentMessenger.presentConversation(botId: self.botId3)
```

---

## Advanced features

The following are available advanced features.

### Customize launcher mode

You can modify the floating launcher button’s behavior and appearance as shown below.

```swift
let options = LauncherLayoutOptions(
    parentView: nil, // Attaches to the window if nil
    position: .trailingBottom,
    margin: .default,
    spacing: 12,
    overlayLauncher: false,
    useSafeArea: true
)

AIAgentMessenger.attachLauncher(
    botId: self.botId,
    options: options
)
```

### Update SDK Theme

You can customize the SDK’s color scheme to match your app's theme as shown below.

```swift
AIAgentMessenger.update(colorScheme: .light) // Options: .dark, .light
```
Since apps may allow users to switch themes manually or follow device settings, theme updates need to be explicitly called.

### Deauthenticate and clear session

When a user logs out, de-authenticate the SDK to clear session data and disconnect.

```swift
AIAgentMessenger.deauthenticate { [weak self] in
    // Perform post-deauthentication actions
}
```

### Passing context object to Agent

You can predefine customer-specific information such as country, language, or other custom context data to guide the AI Agent in providing faster and more accurate responses. 

This allows for a more personalized and context-aware interaction experience.

> Once the contexts are set, they will be used throughout the conversation to provide personalized and context-aware responses.

```swift
AIAgentMessenger.metadata.language = "en-US" // default: Locale.preferredLanguages.first
AIAgentMessenger.metadata.countryCode = "US" // default: Locale.current.regionCode
```

[def]: #prerequisites
