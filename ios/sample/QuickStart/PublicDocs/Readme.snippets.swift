//
//  Readme.snippets.swift
//  QuickStart
//
//  Created by Tez Park on 8/18/25.
//

import UIKit
import SendbirdAIAgentMessenger
import SendbirdChatSDK

// MARK: - Test Configuration
struct TestConfig {
    static let appId = "YOUR_APP_ID_HERE"  // Replace with your actual App ID from Dashboard
    static let aiAgentId = "YOUR_AI_AGENT_ID_HERE"  // Replace with your actual AI Agent ID from Dashboard
    static let userId = "test_user_123"
    static let sessionToken = "YOUR_SESSION_TOKEN_HERE"  // Replace with actual token from your server
}

// MARK: - Delight AI Agent Quickstart guide (iOS)

// MARK: - Getting Started

// MARK: - Getting Started - Step 3. Initialize AI Agent SDK
class SDKInitializer {
    
    /// Initialize the SDK with appId and configuration parameters
    static func initializeSDK(completion: @escaping (Bool, Error?) -> Void) {
        // Import the SDK
        // import SendbirdAIAgentMessenger (already imported at top)
        
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
    }
}

// MARK: - Manage user sessions

// MARK: - Manage user sessions - 1. Updating session information

// MARK: - Manage user sessions - 1. Updating session information - Manual session (authenticated users)
class ManualSessionManager {
    
    /// Authenticate users by providing a user ID and a session token
    static func authenticateWithManualSession(delegate: SessionDelegate) {
        AIAgentMessenger.updateSessionInfo(
            with: .manual(
                userId: TestConfig.userId,
                sessionToken: TestConfig.sessionToken,
                sessionDelegate: delegate
            )
        )
    }
}

// MARK: - Manage user sessions - 1. Updating session information - Anonymous session (guest users)
class AnonymousSessionManager {
    
    /// Connect a user without requiring login credentials (anonymous access)
    static func authenticateWithAnonymousSession() {
        AIAgentMessenger.updateSessionInfo(with: .anonymous())
    }
}

// MARK: - Manage user sessions - 2. Implementing session delegate
class SessionDelegateImplementation: NSObject, SessionDelegate {
    
    func sessionTokenDidRequire(
        successCompletion success: @escaping (String?) -> Void,
        failCompletion fail: @escaping () -> Void
    ) {
        // Refresh token from your server
        AuthService.refreshToken { newToken in
            if let token = newToken {
                success(token)
            } else {
                fail()
            }
        }
    }
    
    func sessionWasClosed() {
        // Handle session closure
        print("Session was closed")
    }
    
    func sessionDidHaveError(_ error: SBError) {
        // Handle session errors
        print("Session error: \(error.localizedDescription)")
    }
}

// Mock AuthService for token refresh
class AuthService {
    static func refreshToken(completion: @escaping (String?) -> Void) {
        // In production, this would call your backend API
        DispatchQueue.main.asyncAfter(deadline: .now() + 1.0) {
            let newToken = "refreshed_token_\(Date().timeIntervalSince1970)"
            completion(newToken)
        }
    }
}

// MARK: - Manage user sessions - Launch the messenger

// MARK: - Manage user sessions - Launch the messenger - 1. Using the launcher button
class LauncherButtonManager {
    
    /// Display a floating launcher button
    static func attachLauncher() {
        AIAgentMessenger.attachLauncher(
            aiAgentId: TestConfig.aiAgentId
        )
    }
    
    /// Hide the launcher
    static func detachLauncher() {
        AIAgentMessenger.detachLauncher(aiAgentId: TestConfig.aiAgentId)
    }
}

// MARK: - Manage user sessions - Launch the messenger - 2. Opening the conversation channel in presentation mode
class ConversationPresentationManager {
    
    /// Present the chat view as a modal
    static func presentConversation() {
        AIAgentMessenger.presentConversation(
            aiAgentId: TestConfig.aiAgentId
        )
    }
}

// MARK: - Push Notifications

// MARK: - Push Notifications - Register for push notifications
class PushNotificationRegistrationManager {
    
    /// Register device token for push notifications through AppDelegate
    static func registerForPushNotifications(deviceToken: Data) {
        AIAgentMessenger.registerPush(deviceToken: deviceToken) { (success) in
            if success {
                print("Push token registered successfully")
            }
        }
    }
}

// AppDelegate extension for push notification registration
extension AppDelegate {
    func application2(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
        PushNotificationRegistrationManager.registerForPushNotifications(deviceToken: deviceToken)
    }
}

// MARK: - Push Notifications - Unregister for push notifications
class PushNotificationUnregistrationManager {
    
    /// Unregister the current device only
    static func unregisterCurrentDevice() {
        // If you want to unregister the current device only, call this method.
        AIAgentMessenger.unregisterPushToken { (success) in
            if success {
                print("Current device unregistered")
            }
        }
    }
    
    /// Unregister all devices of the user
    static func unregisterAllDevices() {
        // If you want to unregister all devices of the user, call this method.
        AIAgentMessenger.unregisterAllPushToken { (success) in
            if success {
                print("All devices unregistered")
            }
        }
    }
}

// MARK: - Advanced features

// MARK: - Advanced features - Customize launcher mode
class CustomLauncherManager {
    
    /// Modify the floating launcher button's behavior and appearance
    static func attachCustomLauncher() {
        let options = SBALauncherOptions(
            parentView: nil,
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
    }
}

// MARK: - Advanced features - Update SDK Theme
class ThemeManager {
    
    /// Customize the SDK's color scheme to match your app's theme
    static func updateToLightTheme() {
        AIAgentMessenger.update(colorScheme: .light) // Options: .dark, .light
    }
    
    static func updateToDarkTheme() {
        AIAgentMessenger.update(colorScheme: .dark)
    }
}

// MARK: - Advanced features - Deauthenticate and clear session
class DeauthenticationManager {
    
    /// When a user logs out, de-authenticate the SDK to clear session data and disconnect
    static func deauthenticate(completion: @escaping () -> Void) {
        AIAgentMessenger.deauthenticate {
            // Perform post-deauthentication actions
            completion()
        }
    }
}

// MARK: - Advanced features - Passing context object to Agent
class ContextManager {
    
    /// Pass context with launcher
    static func attachLauncherWithContext() {
        // Case: Attach launcher
        AIAgentMessenger.attachLauncher(
            aiAgentId: TestConfig.aiAgentId
        ) { params in
            params.language = "en" // (opt)default: Locale.preferredLanguages.first
            params.countryCode = "US" // (opt)default: Locale.current.regionCode
            params.context = ["key": "value"] // (opt)
        }
    }
    
    /// Pass context with conversation presentation
    static func presentConversationWithContext() {
        // Case: Present conversation
        AIAgentMessenger.presentConversation(
            aiAgentId: TestConfig.aiAgentId
        ) { params in
            params.language = "en" // (opt)default: Locale.preferredLanguages.first
            params.countryCode = "US" // (opt)default: Locale.current.regionCode
            params.context = ["key": "value"] // (opt)
        }
    }
}
