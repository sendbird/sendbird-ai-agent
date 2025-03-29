[iOS](https://github.com/sendbird/sendbird-ai-agent/blob/main/ios/README.md) / **Android** / [JS](https://github.com/sendbird/sendbird-ai-agent/blob/main/js/README.md)

# Sendbird AI Agent Quickstart guide (Android)

The **Sendbird AI Agent Messenger** allows seamless integration of chatbot features into your Android application. Follow the steps below to initialize and utilize the SDK effectively.

- [Sendbird AI Agent Quickstart guide (Android)](#sendbird-ai-agent-quickstart-guide-android)
  - [Requirements](#requirements)
  - [Prerequisites](#prerequisites)
  - [Getting started](#getting-started)
    - [Step 1. Create a new project](#step-1-create-a-new-project)
    - [Step 2. Install AI Agent SDK](#step-2-install-ai-agent-sdk)
    - [Step 3. Initialize AI Agent SDK](#step-3-initialize-ai-agent-sdk)
  - [Running your application](#running-your-application)
    - [Manage user sessions](#manage-user-sessions)
    - [Handle session expiration](#handle-session-expiration)
    - [Launch the messenger](#launch-the-messenger)
  - [Advanced features](#advanced-features)
    - [Update SDK theme](#update-sdk-theme)
    - [Deauthenticate and clear session](#deauthenticate-and-clear-session)
    - [Passing context object to Agent](#passing-context-object-to-agent)

## Requirements

The minimum requirements for AI Agent for Android are the following.

- Android 5.0 (API level 21) or higher
- Java 11 or higher
- Android Gradle plugin 8.0.0 or higher
- Android ViewBinding enabled

## Prerequisites

Before you start, you'll need your Sendbird **Application ID** and **AI Agent ID**. 
<br><br/>
You can find it under the **Channels** > **Messenger** menu on the Sendbird Dashboard.

![ai-agent-app-id-agent-id](https://github.com/user-attachments/assets/37d2873e-f35d-45dd-97cc-3d7c7e638a0c)

---

## Getting started

Quickly install and initalize the AI Agent SDK by following the steps below.

### Step 1. Create a new project

1. In Android Studio, create a new project (**File > New > New Project...**).
2. Select **Empty Views Activity** and click **Next**.

![ai-agent-android-empty-activity](https://github.com/user-attachments/assets/d34eee4c-36e4-441b-8b72-3a7c3592bece)

3. Give your project a name. Accept all other defaults, including the language as `Kotlin` and the minimum SDK as `API 21: Android 5.0 (Lollipop)` and click **Finish**.

![ai-agent-android-new-project](https://github.com/user-attachments/assets/630ceccf-d2db-4edb-bb93-109770965a13)

### Step 2. Install AI Agent SDK

Install AI Agent SDK for Android using Gradle by following the steps below.

#### Configuring repository

Add the following to your `settings.gradle.kts` (Project Settings) file:

```kotlin
dependencyResolutionManagement {
    repositories {
        maven { setUrl("https://repo.sendbird.com/public/maven") }
    }
}
```
**Note:** You should be using Gradle 8.0 or higher. You can check the `gradle-wrapper.properties` file in your project to see the version of Gradle you are using.

#### Adding dependency

Add the dependency to your `build.gradle.kts` (Module) file:

```kotlin
plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
}

android {
    buildFeatures {
        viewBinding = true
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_11
        targetCompatibility = JavaVersion.VERSION_11
    }
    kotlinOptions {
        jvmTarget = "11"
    }
}

dependencies {
    implementation("com.sendbird.sdk:ai-agent-messenger:1.+")
}
```

Then, click **'Sync Now'** in the Gradle toolbar to apply all changes.

### Step 3. Initialize AI Agent SDK

To properly integrate and initialize Sendbird AI Agent in your Android project, [create](#how-to-create-the-application-file) and add the following code to your `Application` class file.

```kotlin
import android.app.Application
import com.sendbird.android.exception.SendbirdException
import com.sendbird.sdk.aiagent.messenger.AIAgentMessenger
import com.sendbird.sdk.aiagent.messenger.consts.MessengerThemeMode
import com.sendbird.sdk.aiagent.messenger.interfaces.MessengerInitResultHandler
import com.sendbird.sdk.aiagent.messenger.model.MessengerInitParams

internal const val APP_ID = "YOUR_APP_ID"

class AgentApplication : Application(), MessengerInitResultHandler {
    override fun onCreate() {
        super.onCreate()
        AIAgentMessenger.initialize(MessengerInitParams(
            context = applicationContext,
            appId = APP_ID,
            theme = MessengerThemeMode.Light,
            initForeground = false,
            initResultHandler = this
        ))
    }

    override fun onInitSuccess() {
        // SDK initialized successfully
        // You need to call `AIAgentMessenger.updateSessionInfo()` here if user session info already exists.
    }

    override fun onInitFailure(e: SendbirdException) {
        // Handle initialization error
    }

    override fun onMigrationStarted() {
        // Migration started
    }
}
```

To ensure that your `AgentApplication` class is used as the application class, you need to register it in the AndroidManifest.xml file.
```xml
<application
    android:name=".AgentApplication"
>
</application>
```

#### How to create the Application file

1. Open Android Studio and navigate to your project.
2. In the left side bar, locate the **app** module.
3. Right-click on the java or kotlin folder (depending on the language of your project).
4. Select **New > Kotlin File/Class**.
5. In the dialog that appears, select **Class** and name it `AgentApplication`.
6. Then, add the code above to your `AgentApplication.kt` file.
   
---

## Running your application

Now that you have installed and initialized the AI Agent SDK, follow the steps below to run your application.

### Manage user sessions
    
To use the SDK, session information is required.  
Before using `AIAgentMessenger`, you must set the session information for the application user issued by Sendbird.

#### When to set the session information:
  
1. **Upon initial login:**  
Since there is no session information for the user at the first login, it should be set immediately after app login.

2. **For already logged-in users:**  
If the user is already logged in, the session should be registered immediately after SDK initialization.

    ```kotlin
    val userSessionInfo = UserSessionInfo(userId, authToken, AbstractSessionHandler())
    AIAgentMessenger.updateSessionInfo(userSessionInfo)
    ```
    > SessionHandler is the handler used when a session expires or needs to be renewed. See [next guide](#handle-session-expiration) for instructions on how to use it.
     
### Handle session expiration

When registering a session information, the provided session handler must handle the case where the session information expires.  
Follow the code below to refresh and provide a new session token in the session handler callback.

#### How to handle session expiration:
     
1. Detect session expiration in the session handler callback.
2. Request a new session token from the server.
3. Update the SDK with the new session token.
   
    ```kotlin
    class AbstractSessionHandler : AIAgentSessionHandler() {
        override fun onSessionClosed() {
            // go to login page
        }

        override fun onSessionTokenRequired(sessionTokenRequester: SessionTokenRequester) {
            // Request a new session token from the server
            fetchNewSessionToken { newToken ->
                // Update the SDK with the new session token
                sessionTokenRequester.onSuccess(newToken)
            }
        }
    }
    ```

### Launch the messenger

#### Before You Start
- Was `onInitSuccess` received via MessengerInitResultHandler after invoking `AIAgentMessenger.initialize()`?
- `AIAgentMessenger.updateSessionInfo()` been called with the user session information

Once the authentication information has been successfully registered, you can launch the messenger to start a conversation with the ai agent.

There are two ways to display the messenger:
    
1. Using the launcher button
2. Opening the conversation channel in full-screen mode

>__Note__: Replace `your_ai_agent_id` with your AI agent ID which you can obtain from the Sendbird Dashboard. To learn how do to so, refer to the [prerequisites](#prerequisites) section.

#### 1. Using the launcher button

![Image](https://github.com/user-attachments/assets/74eea8d0-a984-4fb9-9c35-299b6b35b283)

The SDK provides the MessengerLauncher view, which can be easily attached to your application’s root view programmatically without directly adding it to XML layouts.

Since the SDK utilizes Fragments, make sure the context you pass to the MessengerLauncher is an instance of FragmentActivity. If you’re using standard Android components such as AppCompatActivity, there’s no need to worry, as it already inherits from FragmentActivity.
However, if you’re using a custom or legacy activity, verify that it inherits from FragmentActivity to avoid runtime issues.

To add the MessengerLauncher to your screen, simply call the `attach()` function of `MessengerLauncher`, specifying the AI agent ID and configuration parameters:

```kotlin
val params = LauncherLayoutParams(
    LaunchMode.ANCHORED,
    LauncherMargin(12, 12, 12, 12),
    LauncherLocation.BOTTOM_END
)

MessengerLauncher(this, it, params).attach()
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

#### 2. Opening the conversation channel in full-screen mode

![Image](https://github.com/user-attachments/assets/348ccad1-ec9a-4851-9324-084eaf569e34)
    
You can open a full-screen conversation by starting an `Activity`.  
    
```kotlin
startActivity(ConversationActivity.newIntent(context, "your_ai_agent_id"))
```

---

## Advanced features

The following are available advanced features.

### Update SDK theme

You can update the SDK's color scheme to match your app's theme as shown below.
    
```kotlin
AIAgentMessenger.setThemeMode(themeMode) // Options: MessengerThemeMode.Dark, MessengerThemeMode.Light
```

Since apps may allow users to switch themes manually or follow the device's settings, theme updates need to be explicitly called.


### Deauthenticate and clear session

When the user logs out of your app, de-authenticate the SDK to clear session data and disconnect.

```kotlin
AIAgentMessenger.deauthenticate()
```


### Passing context object to Agent

You can predefine customer-specific information such as country, language, or other custom context data to guide the AI Agent in providing faster and more accurate responses. 

This allows for a more personalized and context-aware interaction experience.

> Once the contexts are set, they will be used throughout the conversation to provide personalized and context-aware responses.

```kotlin
AIAgentMessenger.metadata.language = "en-US" // default: Locale.getDefault().toLanguageTag()
AIAgentMessenger.metadata.countryCode = "US" // default: Locale.getDefault().country

AIAgentMessenger.metadata.message.contextObject.put("key1", "value1")
AIAgentMessenger.metadata.message.contextObject.putAll(
    mapOf(
        "key1" to "value1",
        "key2" to "value2"
    )
)
AIAgentMessenger.metadata.message.contextObject.remove("key1")
AIAgentMessenger.metadata.message.contextObject.clear()
```
