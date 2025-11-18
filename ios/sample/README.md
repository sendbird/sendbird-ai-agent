# Delight AI agent iOS Sample (QuickStart)

This is a quick start guide for using the Delight AI agent iOS SDK. This sample project demonstrates how to integrate AI Agent functionality into iOS applications.

## Development Approach Options

There are two ways to integrate AI Agent functionality into your iOS app:

### 1. Direct Use of SendbirdAIAgentMessenger
- Implement using the `SendbirdAIAgentMessenger` SDK directly
- More granular control and customization capabilities
- Direct access to all SDK features

### 2. Using AIAgentStarterKit
- Helper class that wraps `SendbirdAIAgentMessenger` for easier use
- Pre-implemented common usage patterns and convenience features
- Suitable for rapid prototyping and development

**💡 Recommendation**: We recommend studying the implementation code of AIAgentStarterKit to learn how `SendbirdAIAgentMessenger` is actually called and used, then choose the approach that best fits your project requirements.

## Project Structure

```
Sample/
├── QuickStart/
│   ├── AIAgentStarterKit/           # Core AI Agent functionality
│   │   ├── AIAgentStarterKit.swift          # Main controller
│   │   ├── AIAgentStarterKit+Concurrency.swift  # Async handling
│   │   ├── AIAgentStarterKit+Customize.swift    # Customization
│   │   ├── AIAgentStarterKit+OptionalFeatures.swift  # Optional features
│   │   ├── ExtendedSDK/                     # Extended SDK support
│   │   └── SampleTestInfo.swift             # Test information
│   ├── AppDelegate.swift                    # App initialization
│   ├── MainViews/                           # Main UI
│   │   ├── ViewController.swift             # Main view
│   │   └── ViewController.xib
│   ├── Customization/                       # UI customization
│   ├── Extension/                           # Extension features
│   └── Resources/                           # Resource files
└── NotificationService/                     # Push notification service
```

## AIAgentStarterKit Overview

`AIAgentStarterKit` is a helper class that provides feature-specific implementations to make `SendbirdAIAgentMessenger` easier to use.

### Purpose
- **Learning**: Reference material for understanding actual usage patterns of `SendbirdAIAgentMessenger`
- **Prototyping**: Convenience features for rapid development and testing
- **Implementation Guide**: Provides actual SDK call patterns and best practices

### Key Features

1. **SDK Initialization and Session Management**
2. **AI Agent Conversation Screen Display**
3. **Launcher Button Management**
4. **Theme and Customization**
5. **Push Notification Support**

## Quick Start

This section explains implementation methods using AIAgentStarterKit. Check how `SendbirdAIAgentMessenger` is called in each example code, and choose to implement directly or use AIAgentStarterKit as needed.

### 1. Project Setup

#### Dependencies
- `SendbirdAIAgentMessenger`
- `SendbirdChatSDK`
- `SendbirdUIKit` (optional)

#### Required Information
- App ID
- User ID
- Session Token
- AI Agent ID

### 2. App Initialization

#### Using AIAgentStarterKit
```swift
// AppDelegate.swift
func application(_ application: UIApplication, 
                 didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    // SDK initialization
    AIAgentStarterKit.initialize(appId: "YOUR_APP_ID") { error in
        if let error {
            debugPrint("SDK initialization failed: \(error)")
        }
    }
    
    return true
}
```

#### Direct Use of SendbirdAIAgentMessenger
```swift
// Reference implementation in AIAgentStarterKit+Concurrency.swift
func initializeSDK() {
    let params = AIAgentMessenger.InitializeParams(
        logLevel: .all,
        startHandler: {
            // UI update when initialization starts
        },
        migrationHandler: {
            // UI update during migration
        }
    )
    
    AIAgentMessenger.initialize(
        appId: "YOUR_APP_ID",
        params: params
    ) { result in
        switch result {
        case .success:
            print("SDK initialization successful")
        case .failure(let error):
            print("SDK initialization failed: \(error)")
        }
    }
}
```

### 3. User Session Setup

#### Using AIAgentStarterKit
```swift
// When user logs in
AIAgentStarterKit.updateSessionInfo(
    userId: "user_id",
    sessionToken: "session_token",
    sessionHandler: AIAgentStarterKit.shared
)

// Connect
AIAgentStarterKit.connect { error in
    if let error {
        debugPrint("Connection failed: \(error)")
        return
    }
    
    // Connection successful
    print("AI Agent connection successful")
}
```

#### Direct Use of SendbirdAIAgentMessenger
```swift
// Reference implementation in AIAgentStarterKit+Concurrency.swift
func updateSessionInfo() {
    let userSessionInfo = AIAgentMessenger.UserSessionInfo(
        userId: "user_id",
        sessionToken: "session_token",
        sessionDelegate: self // AIAgentSessionDelegate implementation required
    )
    
    AIAgentMessenger.updateSessionInfo(with: userSessionInfo)
}

// AIAgentSessionDelegate implementation example
extension YourClass: AIAgentSessionDelegate {
    func sessionTokenDidRequire(
        successCompletion success: @escaping (String?) -> Void,
        failCompletion fail: @escaping () -> Void
    ) {
        // Provide session token
        success("your_session_token")
    }
    
    func sessionWasClosed() {
        // Handle session closure
    }
    
    func sessionWasRefreshed() {
        // Handle session refresh
    }
}
```

### 4. Display AI Agent Conversation Screen

#### Method 1: Full Screen Display

**Using AIAgentStarterKit:**
```swift
AIAgentStarterKit.present(parent: self)
```

**Direct Use of SendbirdAIAgentMessenger:**
```swift
// Reference implementation in AIAgentStarterKit.swift
func presentConversation() {
    let params = ConversationSettingsParams(
        language: "en",
        countryCode: "US",
        context: nil,
        parent: self
    )
    
    AIAgentMessenger.presentConversation(
        aiAgentId: "YOUR_AI_AGENT_ID",
        params: params
    )
}
```

#### Method 2: Using Launcher Button

**Using AIAgentStarterKit:**
```swift
// Add launcher button
AIAgentStarterKit.attachLauncher(view: self.view)

// Remove launcher button
AIAgentStarterKit.detachLauncher()
```

**Direct Use of SendbirdAIAgentMessenger:**
```swift
// Reference implementation in AIAgentStarterKit.swift
func attachLauncher() {
    let params = LauncherSettingsParams(
        language: "en",
        countryCode: "US",
        context: nil
    )
    
    AIAgentMessenger.attachLauncher(
        aiAgentId: "YOUR_AI_AGENT_ID",
        params: params
    )
}

func detachLauncher() {
    AIAgentMessenger.detachLauncher(aiAgentId: "YOUR_AI_AGENT_ID")
}
```

### 5. Disconnect

**Using AIAgentStarterKit:**
```swift
AIAgentStarterKit.disconnect { error in
    if let error {
        debugPrint("Disconnection failed: \(error)")
    }
}
```

**Direct Use of SendbirdAIAgentMessenger:**
```swift
// Reference implementation in AIAgentStarterKit+Concurrency.swift
func disconnect() {
    AIAgentMessenger.deauthenticate {
        print("Disconnection complete")
    }
}
```

## Customization

### Theme Change
```swift
// Light/Dark theme change
AIAgentStarterKit.updateAIAgentTheme(.light)
AIAgentStarterKit.updateAIAgentTheme(.dark)

// UIKit theme change (when using UIKit)
AIAgentStarterKit.updateUIKitTheme(.light)
```

### Customization Settings
```swift
// Global configuration customization
AIAgentStarterKit.globalConfigCustomizationBuilder = {
    // Global configuration code
}

// Module customization
AIAgentStarterKit.moduleSetCustomizationBuilder = {
    // Module configuration code
}

// Context object customization
AIAgentStarterKit.contextObjectsBuilder = {
    // Context configuration code
}
```

## Push Notification Setup

### 1. Device Token Registration
```swift
func application(_ application: UIApplication, 
                 didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
    // Register device token
    AIAgentStarterKit.registerPush(deviceToken: deviceToken)
}
```

### 2. Push Notification Handling
```swift
func userNotificationCenter(_ center: UNUserNotificationCenter, 
                           didReceive response: UNNotificationResponse, 
                           withCompletionHandler completionHandler: @escaping () -> Swift.Void) {
    let userInfo = response.notification.request.content.userInfo
    
    // Check if it's a Sendbird push notification
    guard AIAgentStarterKit.isValidSendbirdPush(userInfo: userInfo) else { return }
    
    // Display AI Agent conversation screen
    AIAgentStarterKit.presentFromNotification(
        userInfo: userInfo,
        topViewController: nil
    )
}
```

## Key Classes and Methods

### AIAgentStarterKit
- `initialize(appId:completion:)` - SDK initialization
- `updateSessionInfo(userId:sessionToken:sessionHandler:)` - Session information update
- `connect(completion:)` - Connect to AI Agent service
- `disconnect(completion:)` - Disconnect from AI Agent service
- `present(parent:)` - Display full screen conversation
- `attachLauncher(view:)` - Add launcher button
- `detachLauncher()` - Remove launcher button

### Status Management
- `Status.uninitialized` - Not initialized
- `Status.initialized` - Initialized
- `Status.readyToUse` - Ready to use

## Development Tips

### 1. Implementation Method Selection Guide
- **Prototyping**: Use AIAgentStarterKit for rapid development
- **Customization**: Use SendbirdAIAgentMessenger directly for granular control
- **Learning**: Learn SDK usage through AIAgentStarterKit source code

### 2. AIAgentStarterKit Implementation Reference
- `AIAgentStarterKit.swift`: Basic initialization and session management
- `AIAgentStarterKit+Concurrency.swift`: Async processing patterns
- `AIAgentStarterKit+Customize.swift`: Theme and customization
- `AIAgentStarterKit+OptionalFeatures.swift`: Advanced features

### 3. Practical Application Tips
- **When using Extended SDK**: Integration through `ExtendedSDKBridge` when using UIKit, DeskSDK, etc.
- **Session Management**: Proper session updates required during user login/logout
- **Launcher Button**: Properly call `attachLauncher`/`detachLauncher` during screen transitions
- **Theme**: Configure AI Agent theme to match your app's theme

### Debugging
```swift
// Set log level
AIAgentStarterKit.shared.initParamsBuilder = { params in
    params?.logLevel = .debug
}
```

---

This QuickStart guide helps you quickly integrate Delight AI agent into your iOS app. If you have additional questions or need help, please contact the Delight AI support team.