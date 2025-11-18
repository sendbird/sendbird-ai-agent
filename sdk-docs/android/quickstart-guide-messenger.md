# Quickstart guide (Messenger)

{% hint style="warning" %}
Release notes

* Version 1.0.0 released: Sendbird AI Agent SDK for Android **v1.0.0** was released on **September 25, 2025**.
* Feature support: We recommend you install the latest version as any features introduced after this date will be supported only in the latest version.
* Deprecation notice: The previous version, v0.9, will be deprecated on **December 31, 2025**.
{% endhint %}

The **Sendbird AI Agent Messenger** allows seamless integration of chatbot features into your Android application. Follow the steps below to initialize and utilize the SDK effectively.

### Requirements

The minimum requirements for AI Agent for Android are the following.

* Android 5.0 (API level 21) or higher
* Java 11 or higher
* Android Gradle plugin 8.0.0 or higher
* Android ViewBinding enabled
* Sendbird Chat SDK 4.23.1 or higher
* Sendbird UIKit 3.22.1 or higher

### Prerequisites

Before you start, you'll need your Sendbird **Application ID** and **AI Agent ID**.\
\
You can find it under the **Build > Channels** > **Messenger > Basic information** menu on the Sendbird Dashboard.

<figure><img src="../../.gitbook/assets/스크린샷 2025-09-09 오후 1.58.39.png" alt=""><figcaption></figcaption></figure>

***

### Getting started

Quickly install and initialize the AI Agent SDK by following the steps below.

#### Step 1. Create a new project

1. In Android Studio, create a new project (**File > New > New Project...**).
2. Select **Empty Views Activity** and click **Next**.

<figure><img src="../../.gitbook/assets/image (74) (1).png" alt=""><figcaption></figcaption></figure>

3. Give your project a name. Accept all other defaults, including the language as `Kotlin` and the minimum SDK as `API 21: Android 5.0 (Lollipop)` and click **Finish**.

<figure><img src="../../.gitbook/assets/image (72).png" alt=""><figcaption></figcaption></figure>

#### Step 2. Install AI Agent SDK

Install AI Agent SDK for Android using Gradle by following the steps below.

**Configuring repository**

Add the following to your `settings.gradle.kts` (Project Settings) file:

```
dependencyResolutionManagement {
    repositories {
        maven { setUrl("https://repo.sendbird.com/public/maven") }
    }
}
```

**Note:** You should be using Gradle 8.0 or higher. You can check the `gradle-wrapper.properties` file in your project to see the version of Gradle you are using.

**Adding dependency**

Add the dependency to your `build.gradle.kts` (Module) file:

```
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

Then, click **Sync Now** in the Gradle toolbar to apply all changes.

#### Step 3. Initialize AI Agent SDK

To properly integrate and initialize Sendbird AI Agent in your Android project, create and add the following code to your `Application` class file.

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

```kotlin
<application
    android:name=".AgentApplication"
>
</application>
```

**How to create the Application file**

1. Open Android Studio and navigate to your project.
2. In the left side bar, locate the **app** module.
3. Right-click on the java or kotlin folder (depending on the language of your project).
4. Select **New > Kotlin File/Class**.
5. In the dialog that appears, select **Class** and name it `AgentApplication`.
6. Then, add the code above to your `AgentApplication.kt` file.

***

### Running your application

Now that you have installed and initialized the AI Agent SDK, follow the steps below to run your application.

{% hint style="info" %}
Make sure to perform the following steps after the SDK has been successfully initialized. Once complete, set up the user session, then launch the messenger.
{% endhint %}

#### Manage user sessions

To use the SDK, session information is required.\
Before using `AIAgentMessenger`, you must set the session information for the application user issued by Sendbird.

**When to set the session information:**

1. **Upon initial login:**\
   Since there is no session information for the user at the first login, it should be set immediately after app login.
2.  **For already logged-in users:**\
    If the user is already logged in, the session should be registered immediately after SDK initialization. `sessionHandler` is the hanlder used when a session expires or needs to be renewed.

    ```kotlin
    val manualSessionInfo = ManualSessionInfo(
        userId = "your_user_id",
        sessionToken = "your_session_token", 
        sessionHandler = YourSessionHandler()
    )
    AIAgentMessenger.updateSessionInfo(manualSessionInfo)
    ```

#### Handle session expiration

When registering a session information, the provided session handler must handle the case where the session information expires.\
Follow the code below to refresh and provide a new session token in the session handler callback.

**How to handle session expiration:**

1. Detect session expiration in the session handler callback.
2. Request a new session token from the server.
3.  Update the SDK with the new session token.

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

#### Launch the messenger

**Before You Start**

* Was `onInitSuccess` received via MessengerInitResultHandler after invoking `AIAgentMessenger.initialize()`?
* `AIAgentMessenger.updateSessionInfo()` been called with the user session information

Once the authentication information has been successfully registered, you can launch the messenger to start a conversation with the ai agent.

There are two ways to display the messenger:

1. Using the launcher button
2. Opening the conversation channel in full-screen mode

> **Note**: Replace `your_ai_agent_id` with your AI agent ID which you can obtain from the Sendbird Dashboard. To learn how do to so, refer to the [prerequisites](quickstart-guide-messenger.md#prerequisites) section.

**1. Using the launcher button**

<figure><img src="../../.gitbook/assets/image (74).png" alt=""><figcaption></figcaption></figure>

The SDK provides a `MessengerLauncher` view that can be programmatically attached to your application's root view. This eliminates the need to modify your XML layouts directly.

> **Note**: The SDK relies on **Fragments**. Ensure the context passed to `MessengerLauncher` is an instance of `FragmentActivity`.

If you're using standard Android components such as `AppCompatActivity`, no additional action is needed — it inherits from `FragmentActivity`. If you're using a custom or legacy `Activity`, confirm that it extends `FragmentActivity` to prevent runtime errors.

**Attach the MessengerLauncher**

To attach the launcher, call the `attach()` function on a `MessengerLauncher` instance, passing your AI agent ID:

```kotlin
MessengerLauncher(context, "your_ai_agent_id").attach()
```

**Customize with `LauncherLayoutParams`**

Use `LauncherLayoutParams` to control the launcher's behavior and position.

* **launchMode**
  * `EXPANDED`: Opens the messenger in full-screen mode with preset margins.
  * `ANCHORED`: Opens the messenger near the launcher button, with customizable placement.
* **margin**\
  Sets the margin around the launcher button. Does not affect the messenger window.
* **location**\
  Defines the corner of the screen where the launcher appears. Options:
  * `TOP_START`
  * `TOP_END`
  * `BOTTOM_START`
  * `BOTTOM_END`

**2. Opening the conversation channel in full-screen mode**

<figure><img src="../../.gitbook/assets/image (75).png" alt=""><figcaption></figcaption></figure>

You can open a full-screen conversation by starting an `Activity`.

```kotlin
startActivity(ConversationActivity.newIntent(context, "your_ai_agent_id"))
```

***

### Advanced features

The following are available advanced features.

#### Update SDK theme

You can update the SDK's color scheme to match your app's theme as shown below.

```kotlin
AIAgentMessenger.setThemeMode(themeMode) // Options: MessengerThemeMode.Dark, MessengerThemeMode.Light
```

Since apps may allow users to switch themes manually or follow the device's settings, theme updates need to be explicitly called.

#### De-authenticate and clear session

When the user logs out of your app, de-authenticate the SDK to clear session data and disconnect.

```
AIAgentMessenger.deauthenticate()
```

***

### Passing context object to AI agent

You can predefine customer-specific data such as language, country, or any custom key-value context to help the AI agent deliver faster and more accurate responses.

This enables more personalized, context-aware interactions throughout the conversation.

Once the context is configured, it will be applied when the conversation begins. To update the context dynamically during a conversation, use the Platform API to modify it.

**1. Set Context via `MessengerLauncher`**

```kotlin
MessengerLauncher(this, aiAgentId, LauncherSettingsParams(
    language = "en",
    countryCode = "US",
    context = mapOf(
        "key1" to "value1",
        "key2" to "value2"
    )
)).attach()
```

**2. Set Context via Full-Screen Conversation**

```kotlin
startActivity(
    MessengerActivity.newIntentForConversation(
        context = context,
        aiAgentId = aiAgentId,
        conversationSettingsParams = ConversationSettingsParams(
            language = "en",
            countryCode = "US",
            context = mapOf(
                "key1" to "value1",
                "key2" to "value2"
            )
        )
    )
)
```

{% hint style="info" %}
Note: You can also update or patch the context object after initialization using the `updateContext` or `patchContext` methods on the messenger object. For details, see the [Context object ](context-object.md)page.
{% endhint %}

***

Sendbird's AI Agent also supports multi-language feature. To learn more, see the[ Multi-language support](multi-language-support.md) page.
