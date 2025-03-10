**iOS** / [Android](https://github.com/sendbird/sendbird-ai-agent/blob/main/android/README.md) / [JS](https://github.com/sendbird/sendbird-ai-agent/blob/main/js/README.md)

# Sendbird AI Agent Quick Start Guide (iOS)

The **Sendbird AI Agent** allows seamless integration of chatbot features into your iOS application. Follow the steps below to initialize and utilize the SDK effectively.

- [Sendbird AI Agent Quick Start Guide (iOS)](#sendbird-ai-agent-quick-start-guide-ios)
  - [Prerequisites](#prerequisites)
  - [Getting Started](#getting-started)
  - [Running Your Application](#running-your-application)
  - [Advanced Features](#advanced-features)

## Prerequisites

Before integrating the SDK, ensure you meet all prerequisites:

- Xcode 15.0 or later
- Swift Package Manager (SPM) support
- A valid Sendbird AI Agent App ID (available from the Sendbird Dashboard)

## Getting Started

- ### Project Setup

  1. In **Xcode**, select `File > Add Packages`.
  2. Add **SendbirdAIAgent** into your package repository using the following URL:
    
     ```
     https://github.com/sendbird/sendbird-ai-agent-ios.git
     ```
  3. Set the **Dependency Rule** to **Branch** and use the provided branch name.

- ### Initialization

  Initialize the SDK by providing the **appId** (generated via Dashboard) and configuration parameters:

    ```swift
    let params = SendbirdAIAgent.InitializeParams(
        locale: Locale.current
    )

    SendbirdAIAgent.initialize(
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

## Running Your Application

- ### Setup User Session
  User sessions **require** periodic token reissuance for security purposes, so the following session management is necessary.
    #### 1. Updating Session Information
    Update the session information to ensure proper session management:
    ```swift
    SendbirdAIAgent.updateSessionInfo(
        with: SendbirdAIAgent.UserSessionInfo(
            userId: userId,
            sessionToken: sessionToken,
            sessionDelegate: self
        )
    )
    ```
    #### 2.Implementing Session Delegate
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
- ### Launching Messenger

    The SDK provides two ways to display the chat view:

    #### 1. Launcher Mode (Floating Button)
    ![Image](https://github.com/user-attachments/assets/74eea8d0-a984-4fb9-9c35-299b6b35b283)
    Display a floating launcher button:

    ```swift
    SendbirdAIAgent.startLauncher(
        aiAgentId: self.aiAgentId,
        options: SBALauncherLayoutOptions()
    )
    ```

    To hide the launcher:

    ```swift
    SendbirdAIAgent.stopLauncher(botId: self.botId)
    ```

    #### 2. ViewController Presentation Mode
    ![Image](https://github.com/user-attachments/assets/348ccad1-ec9a-4851-9324-084eaf569e34)
    Present the chat view as a modal:

    ```swift
    SendbirdAIAgent.startConversation(botId: self.botId3)
    ```

## Advanced Features

- ### Customizing Launcher Mode

    Modify the floating launcher button’s behavior and appearance:

    ```swift
    let options = LauncherLayoutOptions(
        parentView: nil, // Attaches to the window if nil
        position: .trailingBottom,
        margin: .default,
        spacing: 12,
        overlayLauncher: false,
        useSafeArea: true
    )

    SendbirdAIAgent.startLauncher(
        botId: self.botId,
        options: options
    )
    ```

- ### Updating SDK Theme

    You can customize the SDK’s color scheme:

    ```swift
    SendbirdAIAgent.update(colorScheme: .light) // Options: .dark, .light
    ```

    Since apps may allow users to switch themes manually or follow device settings, explicitly call this function when needed.

- ### Deauthentication

    When a user logs out, deauthenticate the SDK to clear session data:

    ```swift
    SendbirdAIAgent.deauthenticate { [weak self] in
        // Perform post-deauthentication actions
    }
    ```


[def]: #prerequisites
