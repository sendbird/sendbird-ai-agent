**iOS** / [Android](https://github.com/sendbird/sendbird-ai-agent/blob/main/android/README.md) / [JS](https://github.com/sendbird/sendbird-ai-agent/blob/main/js/)

# Sendbird AI Agent Quickstart guide (iOS)

The **Sendbird AI Agent Messenger** allows seamless integration of chatbot features into your iOS application. Follow the steps below to initialize and utilize the SDK effectively.

- [Sendbird AI Agent Quickstart guide (iOS)](#sendbird-ai-agent-quickstart-guide-ios)
  - [Requirements](#requirements)
  - [Prerequisites](#prerequisites)
  - [Getting Started](#getting-started)
    - [Step 1. Create a new project](#step-1-create-a-new-project)
    - [Step 2. Install AI Agent SDK](#step-2-install-ai-agent-sdk)
    - [Step 3. Initialize AI Agent SDK](#step-3-initialize-ai-agent-sdk)
  - [Running your application](#running-your-application)
  - [Manage user sessions](#manage-user-sessions)
    - [1. Updating session information](#1-updating-session-information)
      - [Manual session (authenticated users)](#manual-session-authenticated-users)
      - [Anonymous session (guest users)](#anonymous-session-guest-users)
    - [2. Implementing session delegate](#2-implementing-session-delegate)
    - [Launch the messenger](#launch-the-messenger)
      - [1. Using the launcher button](#1-using-the-launcher-button)
      - [2. Opening the conversation channel in presentation mode](#2-opening-the-conversation-channel-in-presentation-mode)
  - [Push Notifications](#push-notifications)
    - [Register for push notifications](#register-for-push-notifications)
    - [Unregister for push notifications](#unregister-for-push-notifications)
  - [Advanced features](#advanced-features)
    - [Customize launcher mode](#customize-launcher-mode)
    - [Update SDK Theme](#update-sdk-theme)
    - [Deauthenticate and clear session](#deauthenticate-and-clear-session)
    - [Passing context object to Agent](#passing-context-object-to-agent)
    - [Custom Localization (Multi-language Support)](#custom-localization-multi-language-support)

## Requirements

The minimum requirements for AI Agent for iOS are the following.

- Xcode 16.3 or later
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
AIAgentMessenger.initialize(
    appId: TestConfig.appId,
    paramsBuilder: { params in
        // Set optional parameters if needed
    }
) { result in
    switch result {
    case .success:
        // SDK initialized successfully
        completion(true, nil)
    case .failure(let error):
        // Handle initialization error
        completion(false, error)
    }
}
```

---

## Running your application

Now that you have installed and initialized the AI Agent SDK, follow the steps below to run your application.

> Note: Make sure to perform the following steps after the SDK has been successfully initialized. Once initialization is complete, set up the user session and launch the messenger.

## Manage user sessions

User sessions require periodic token reissuance for security purposes, so the following session management is necessary.

### 1. Updating session information

To ensure proper session management, you need to update the session information:

#### Manual session (authenticated users)

Use this method to authenticate users by providing a user ID and a session token.  
The session token must be obtained from your server via the Sendbird Platform API. It is used to securely authenticate the user.  
This method is typically used in apps with their own authentication systems.

```swift
AIAgentMessenger.updateSessionInfo(
    with: .manual(
        userId: userId,
        sessionToken: sessionToken,
        sessionDelegate: self
    )
)
```

#### Anonymous session (guest users)

Use this method to connect a user without requiring login credentials (anonymous access):

```swift
AIAgentMessenger.updateSessionInfo(with: .anonymous())
```

> **Note:** Anonymous sessions can only be used if the corresponding setting is enabled in the Sendbird Dashboard under your app’s attributes.

### 2. Implementing session delegate

Implement this protocol to handle session-related events:

```swift
import SendbirdChatSDK

extension MyViewController: SessionDelegate {
    func sessionTokenDidRequire(
        successCompletion success: @escaping (String?) -> Void,
        failCompletion fail: @escaping () -> Void
    ) {
        // Refresh token from your server
        AuthService.refreshToken { newToken in
            if let token = newToken {
                // When success completion is called, updateSessionInfo is called internally, 
                // which causes the SDK to update the token.
                success(token)
            } else {
                fail()
            }
        }
    }

    func sessionWasClosed() {
        // Handle session closure
    }

    func sessionDidHaveError(_ error: SBError) {
        // Handle session errors
    }
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
    aiAgentId: self.aiAgentId
)
```

To hide the launcher:

```swift
AIAgentMessenger.detachLauncher(aiAgentId: {AIAgentId})
```

#### 2. Opening the conversation channel in presentation mode

![Image](https://github.com/user-attachments/assets/348ccad1-ec9a-4851-9324-084eaf569e34)

Present the chat view as a modal:

```swift
AIAgentMessenger.presentConversation(
    aiAgentId: {AIAgentId}
)
```

---

## Push Notifications

### Register for push notifications

[Push notifications](https://sendbird.com/docs/chat/sdk/v4/ios/push-notifications/overview-push-notifications) are a type of notification sent to your user's device when a client app is running in the background. Push notifications for the client app will contain a payload created by Sendbird and be delivered through APNs. Sendbird server will communicate with APNs whenever needed and APNs will send a push notification to the client app on iOS devices. In order to use this feature, you need to register the user's device token to Sendbird server through the AppDelegate.

> Note : APNs should be set up in advance in order to send push notifications.

```swift
func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
    AIAgentMessenger.registerPush(deviceToken: deviceToken) { (success) in

    }
}
```

### Unregister for push notifications

You should unregister a user's device token from Sendbird server if you don’t want to send [push notifications](https://sendbird.com/docs/chat/sdk/v4/ios/push-notifications/overview-push-notifications) to the user.

```swift
// If you want to unregister the current device only, call this method.
AIAgentMessenger.unregisterPushToken { (success) in

}

// If you want to unregister all devices of the user, call this method.
AIAgentMessenger.unregisterAllPushToken { (success) in

}
```

---

## Advanced features

The following are available advanced features.

### Customize launcher mode

You can modify the floating launcher button’s behavior and appearance as shown below.

```swift
let options = SBALauncherOptions(
    parentView: nil, // Attaches to the window if nil
    entryPoint: .conversation,
    layout: .init(
        position: .trailingBottom,
        margin: .default,
        useSafeArea: true
    ),
    displayStyle: .overlay(.init(spacing: 12))
)

AIAgentMessenger.attachLauncher(
    aiAgentId: TestConfig.aiAgentId
) { params in
    params.options = options
}
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

You can predefine customer-specific information, such as country, language, or other custom context data, to guide the AI Agent in providing faster and more accurate responses.

This allows for a more personalized and context-aware interaction experience.

> Once the contexts are set, they will be used throughout the conversation to provide personalized and context-aware responses.

```swift
// Case: Attach launcher
AIAgentMessenger.attachLauncher(
    aiAgentId: TestConfig.aiAgentId
) { params in
    params.language = "en" // (opt)default: Locale.preferredLanguages.first
    params.countryCode = "US" // (opt)default: Locale.current.regionCode
    params.context = ["key": "value"] // (opt)
}
```

```swift
// Case:
AIAgentMessenger.presentConversation(
    aiAgentId: TestConfig.aiAgentId
) { params in
    params.language = "en" // (opt)default: Locale.preferredLanguages.first
    params.countryCode = "US" // (opt)default: Locale.current.regionCode
    params.context = ["key": "value"] // (opt)
}
```

> - `language` value should follow the **IETF BCP 47** format.
>   - For example, it might be "ko-KR" for Korean in South Korea or "en-US" for English in the United States.
>   - See also: [List of common primary language subtags](https://en.wikipedia.org/wiki/IETF_language_tag#List_of_common_primary_language_subtags)
> - `countryCode` value should follow the **ISO 3166** format.
>   - For example, it might be "KR" for South Korea or "US" for the United States.

### Custom Localization (Multi-language Support)

AIAgent supports adding and customizing multi languages. For more information, see [this detail page](MULTILANGUAGE.md).

[def]: #prerequisites
