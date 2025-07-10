//
//  AIAgentStarterKit+OptionalFeatures.swift
//  QuickStart
//
//  Created by Damon Park on 5/27/25.
//

import UIKit
import SendbirdAIAgentMessenger
import SendbirdChatSDK

// MARK: - Color scheme
extension AIAgentStarterKit {
    @discardableResult
    static func toggleColorScheme() -> SBAColorScheme  {
        switch AIAgentMessenger.currentColorScheme {
        case .light:
            self.updateAIAgentTheme(.dark)
            self.updateUIKitTheme(.dark)
        case .dark:
            self.updateAIAgentTheme(.light)
            self.updateUIKitTheme(.light)
        }
        
        return AIAgentMessenger.currentColorScheme
    }
}

// MARK: - Context objects
extension AIAgentStarterKit {
    static var contextObjects = ContextObjects()
    
    struct ContextObjects {
        var language: String? = nil
        var countryCode: String? = nil
        var context: [String: String] = [:]
    }
    
    static func updateContextObjects(
        language: String?,
        countryCode: String?,
        context: [String: String]
    ) {
        AIAgentStarterKit.contextObjects = .init(
            language: language,
            countryCode: countryCode,
            context: context
        )
    }
}

// MARK: - Push notification
extension AIAgentStarterKit {
    static var pendingNotificationPayload: [AnyHashable: Any]?
    
    /// Marks a Sendbird push notification as clicked.
    ///
    /// This method should be called when a user interacts with a push notification to inform
    /// Sendbird Chat SDK that the notification has been acknowledged.
    ///
    /// - Parameter userInfo: The payload dictionary received from the push notification.
    static func markPushNotificationAsClicked(userInfo: [AnyHashable: Any]) {
        SendbirdChat.markPushNotificationAsClicked(
            remoteNotificationPayload: userInfo
        )
    }
    
    /// Registers the device token for push notifications with Sendbird AI Agent Messenger.
    ///
    /// This method should be called after the app successfully registers for remote notifications
    /// and receives a device token from APNs.
    ///
    /// - Parameter deviceToken: The device token data received from APNs.
    static func registerPush(deviceToken: Data) {
        AIAgentMessenger.registerPush(
            deviceToken: deviceToken
        ) { success  in
            if !success {
                debugPrint("[Failed] APNs registration failed")
            }
        }
    }
    
    /// Unregisters the device token for push notifications from Sendbird AI Agent Messenger.
    ///
    /// This method should be called when the app no longer wants to receive push notifications,
    /// such as during logout or when disabling notifications.
    static func unregisterPush() {
        AIAgentMessenger.unregisterPushToken { success in
            if !success {
                debugPrint("[Failed] APNs unregistration failed")
            }
        }
    }
    
    /// Presents the conversation list screen triggered by a push notification.
    ///
    /// This method verifies that the notification payload is a valid Sendbird push notification,
    /// stores the payload for later handling, and attempts to present the conversation list
    /// on the provided top view controller or the current visible view controller.
    ///
    /// - Parameters:
    ///   - userInfo: The notification payload dictionary.
    ///   - topViewController: An optional view controller from which to present the conversation list.
    static func presentFromNotification(
        userInfo: [AnyHashable: Any]?,
        topViewController: UIViewController?
    ) {
        guard AIAgentStarterKit.isValidSendbirdPush(userInfo: userInfo) else { return }
        
        AIAgentStarterKit.pendingNotificationPayload = userInfo
        
        if let topViewController = topViewController {
            AIAgentStarterKit.handlePendingPush(parent: topViewController)
        }
        
        if let windowScene = UIApplication.shared.connectedScenes.first as? UIWindowScene,
           let window = windowScene.windows.first(where: { $0.isKeyWindow }),
           let rootViewController = window.rootViewController {
            
            var topController = rootViewController
            while let presentedVC = topController.presentedViewController {
                topController = presentedVC
            }
            
            if let nav = topController as? UINavigationController,
               let viewController = nav.viewControllers.last as? ViewController {
                AIAgentStarterKit.handlePendingPush(parent: viewController)
            }
        }
    }
    
    /// Handles any pending push notification by connecting and presenting the conversation list.
    ///
    /// This method checks if there is a pending notification payload, connects to the chat service,
    /// clears the pending notification, and presents the conversation list on the specified parent view controller.
    ///
    /// - Parameter parent: The view controller on which to present the conversation list.
    static func handlePendingPush(parent: UIViewController) {
        guard AIAgentStarterKit.pendingNotificationPayload != nil else { return }
        
        self.connect { _ in
            AIAgentStarterKit.pendingNotificationPayload = nil
            AIAgentStarterKit.present(parent: parent)
        }
    }
    
    /// Validates whether the given userInfo dictionary corresponds to a Sendbird push notification.
    ///
    /// - Parameter userInfo: The notification payload dictionary.
    /// - Returns: `true` if the payload contains Sendbird-specific keys indicating a valid Sendbird push notification; otherwise, `false`.
    static func isValidSendbirdPush(userInfo: [AnyHashable: Any]?) -> Bool {
        guard let _ = userInfo?["sendbird"] as? [AnyHashable: Any] else {
            return false
        }
        return true
    }
}
