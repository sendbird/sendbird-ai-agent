# Quickstart guide (Messenger)

{% hint style="warning" %}
Release notes

* Version 1.0.0 released: Sendbird AI Agent SDK for iOS **v1.0.0** was released on **September 25, 2025**.
* Feature support: We recommend you install the latest version as any features introduced after this date will be supported only in the latest version.
* Deprecation notice: The previous version, v0.9, will be deprecated on **December 31, 2025**.
{% endhint %}

The **Sendbird AI Agent Messenger** allows seamless integration of chatbot features into your iOS application. Follow the steps below to initialize and utilize the SDK effectively.

### Requirements

The minimum requirements for AI Agent for iOS are the following.

* Xcode 16.0 or later
* Swift Package Manager (SPM) support

### Prerequisites

Before you start, you'll need your Sendbird **Application ID** and **AI Agent ID**.\
\
You can find it under the **Build > Channels** > **Messenger > Basic information** menu on the Sendbird Dashboard.

<figure><img src="../../.gitbook/assets/스크린샷 2025-09-09 오후 1.58.39.png" alt=""><figcaption></figcaption></figure>

***

### Getting Started

Quickly install and initialize the AI Agent SDK by following the steps below.

#### Step 1. Create a new project

1. Open Xcode.
2. Choose **File > New > Project**.
3. Select **iOS** as the platform and **App** as the template.

<figure><img src="../../.gitbook/assets/image (24).png" alt=""><figcaption></figcaption></figure>

<figure><img src="../../.gitbook/assets/image (28).png" alt=""><figcaption></figcaption></figure>

#### Step 2. Install AI Agent SDK

1. In **Xcode**, select **File > Add Package Dependencies**.
2.  Add **SendbirdAIAgentMessenger** into your package repository using the following URL:

    ```
    https://github.com/sendbird/sendbird-ai-agent-messenger-ios.git
    ```
3. Set the **Dependency Rule** to **Branch** and use the provided branch name.

#### Step 3. Initialize AI Agent SDK

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

***

### Running your application

Now that you have installed and initialized the AI Agent SDK, follow the steps below to run your application.

{% hint style="info" %}
Note: Make sure to perform the following steps after the SDK has been successfully initialized. Once complete, set up the user session, then launch the messenger.
{% endhint %}

#### Manage user sessions

To maintain security, user sessions need periodic token reissuance. Consequently, the following session management practices are essential.

**1. Updating session information**

Update the session information to ensure proper session management:

```swift
AIAgentMessenger.updateSessionInfo(
    with: .manual(
        userId: userId,
        sessionToken: sessionToken,
        sessionDelegate: self
    )
)
```

**2.Implementing session delegate**

Handle session-related events by implementing `AIAgentSessionDelegate`:

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

#### Launch the messenger

Once the authentication information has been successfully registered, you can launch the messenger to start a conversation with the AI agent.

There are two ways to display the chat view:

1. Using the launcher button
2. Opening the conversation channel in presentation mode

**1. Using the launcher button**

<figure><img src="../../.gitbook/assets/image (30).png" alt=""><figcaption></figcaption></figure>

Display a floating launcher button:

```swift
AIAgentMessenger.attachLauncher(
    aiAgentId: {AIAgentId}
)
```

To hide the launcher:

```swift
AIAgentMessenger.detachLauncher(aiAgentId: {AIAgentId})
```

**2. Opening the conversation channel in presentation mode**

<figure><img src="../../.gitbook/assets/image (35).png" alt=""><figcaption></figcaption></figure>

Present the chat view as a modal:

```swift
AIAgentMessenger.presentConversation(
    aiAgentId: {AIAgentId}
)
```

***

### Advanced features

The following are available advanced features.

#### Customize launcher mode

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

#### Update SDK Theme

You can customize the SDK’s color scheme to match your app's theme as shown below.

```swift
AIAgentMessenger.update(colorScheme: .light) // Options: .dark, .light
```

Since apps may allow users to switch themes manually or follow device settings, theme updates need to be explicitly called.

#### De-authenticate and clear session

When a user logs out, de-authenticate the SDK to clear session data and disconnect.

```swift
AIAgentMessenger.deauthenticate { [weak self] in
    // Perform post-deauthentication actions
}
```

***

### Passing context object to AI agent

You can predefine customer-specific information, such as country, language, or other custom context data to guide the AI Agent in providing faster and more accurate responses.

This allows for a more personalized and context-aware interaction experience.

```swift
// Case: Add a launcher to the UI
AIAgentMessenger.attachLauncher(
    aiAgentId: {AIAgentId}
) { params in
    params.language = "en" // (opt)default: Locale.preferredLanguages.first
    params.countryCode = "US" // (opt)default: Locale.current.regionCode
    params.context = ["key": "value"] // (opt)
}
```

```swift
// Case: Enter a full screen mode
AIAgentMessenger.presentConversation(
    aiAgentId: {AIAgentId}
) { params in
    params.language = "en" // (opt)default: Locale.preferredLanguages.first
    params.countryCode = "US" // (opt)default: Locale.current.regionCode
    params.context = ["key": "value"] // (opt)
}
```

> * `language` value should follow the **IETF BCP 47** format.
>   * For example, "ko-KR" for Korean in South Korea or "en-US" for English in the United States.
>   * See [List of common primary language subtags](https://en.wikipedia.org/wiki/IETF_language_tag#List_of_common_primary_language_subtags)
> * `countryCode` value should follow the **ISO 3166** format.
>   * For example, "KR" for South Korea and "US" for the United States.

{% hint style="info" %}
Note: You can also update or patch the context object after initialization using the `updateContext` or `patchContext` methods on the `conversationViewModel`. For details, see the [Context object](context-object.md) page.
{% endhint %}

***

Sendbird's AI Agent also supports multi-language feature. To learn more, see the[ Multi-language support](multi-language-support.md) page.
