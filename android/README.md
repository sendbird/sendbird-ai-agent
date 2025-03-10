iOS / Android / JS

# Sendbird AI Agent Quick Start Guide (Android)

The **Sendbird AI Agent** allows seamless integration of chatbot features into your Android application. Follow the steps below to initialize and utilize the SDK effectively.

- [Sendbird AI Agent Quick Start Guide (Android)](#sendbird-ai-agent-quick-start-guide-android)
  - [Prerequisites](#prerequisites)
  - [Getting Started](#getting-started)
  - [Running Your Application](#running-your-application)
  - [Advanced Features](#advanced-features)

## Prerequisites

The minimum requirements for AI Agent for Android are the following.

- Android 5.0 (API level 21) or higher
- Java 11 or higher
- Android Gradle plugin 8.0.0 or higher
- Android ViewBinding enabled

## Getting Started

- ### Project Setup

  - #### Configuring the repository and adding dependency
    1. Add the following to your `settings.gradle.kts` (Project Settings) file:

       ```kotlin
       dependencyResolutionManagement {
           repositories {
               maven { setUrl("https://jitpack.io") }
               maven { setUrl("https://repo.sendbird.com/public/maven") }
           }
       }
       ```
           >       **Note:** You should be using Gradle 6.8 or higher. You can check the `gradle-wrapper.properties` file in your project to see the version of Gradle you are using.

    2. Add the dependency to your `build.gradle.kts` (Module) file:

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
           implementation("com.sendbird.sdk:ai-agent:1.+")
       }
       ```

    3. Then, click **'Sync Now'** in the Gradle toolbar to apply all changes.

- ### Initialization
    To properly integrate and initialize Sendbird AI-Agent in your Android project, add the following code to your `Application` class file:
    ```kotlin
    internal const val APP_ID = "YOUR_APP_ID"

    class AgentApplication : Application(), InitResultHandler {
        override fun onCreate() {
            ...

            SendbirdAIAgent.initialize(AIAgentInitParams(
                context = applicationContext,
                appId = APP_ID,
                theme = AIAgentThemeMode.Light,
                initForeground = false,
                initResultHandler = this
            ))
        }

        override fun onInitSuccess() {
            // SDK initialized successfully
        }

        override fun onInitFailure(e: SendbirdException) {
            // Handle initialization error
        }

        override fun onMigrationStarted() {
            // Migration started
        }
    }
    ```

## Running Your Application

- ### Session Management
    To use the SDK, **session information is required**.  
    Before using `AIAgent`, you must set the session information for the **application user issued by Sendbird**.

  - #### When to Set the Session Information:
    1. **Upon Initial Login:**  
    Since there is no session information for the user at the first login, it should be set **immediately after app login**.
    2. **For Already Logged-in Users:**  
    If the user is already logged in, the session should be registered **immediately after SDK initialization**.
        ```kotlin
        val userSessionInfo = UserSessionInfo(userId, authToken, AbstractSessionHandler())
        SendbirdAIAgent.updateSessionInfo(userSessionInfo)
        ```
   - #### Handling Session Expiration
        When registering a session information, the provided **session handler** must handle the case where the session information expires.  
        Follow the code below to **refresh and provide a new session token** in the session handler callback.

   - #### How to Handle Session Expiration:
     1. Detect session expiration in the **session handler callback**.
     2. Request a **new session token** from the server.
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

- ### Launching Messenger
    Once the authentication information has been successfully registered, you can start a conversation with the ai agent.  

    There are two ways to initiate a conversation:
    1. Using the **Launcher**
    2. Opening the ai agent conversation channel in **full-screen mode**

    To start a conversation, a **AI Agent ID issued from the dashboard is required**.

1. #### Using the Launcher
    ![Image](https://github.com/user-attachments/assets/74eea8d0-a984-4fb9-9c35-299b6b35b283)
    The SDK provides an `AIAgentLauncher` view, which can be added to any application screen via XML or programmatically.
    - When the screen containing the **Launcher** is launched, call the `init()` function of `AIAgentLauncher` to specify which ai agent to communicate with.
        ```xml
        <com.sendbird.sdk.aiagent.ui.widget.AIAgentLauncher
            android:id="@+id/aiAgentLauncher"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"/>
        ```
        ```kotlin
        aiAgentLauncher.init(aiAgentId = "your_ai_agent_id")
        ```

3. #### Opening the AI Agent Conversation Channel in Full-Screen Mode
    ![Image](https://github.com/user-attachments/assets/348ccad1-ec9a-4851-9324-084eaf569e34)
    You can open a **full-screen conversation** by starting an `Activity`.  
    When launching the activity, provide the **AI Agent ID** to specify which ai agent to communicate with.
    ```kotlin
    startActivity(ConversationActivity.newIntent(this@MainActivity, "your_ai_agent_id"))
    ```

## Advanced Features

- ### Updating SDK Theme

    You can update the SDK's color scheme to match your app's theme:
    ```kotlin
    SendbirdAIAgent.setTheme(theme) // Options: AIAgentThemeMode.Dark, AIAgentThemeMode.Light
    ```

    Since apps may allow users to switch themes manually or follow the device's settings, theme updates need to be explicitly called.

- ### Deauthentication

    When the user logs out of your app, deauthenticate the SDK to clear session data and disconnect:

    ```kotlin
    SendbirdAIAgent.deauthenticate()
    ```
    
