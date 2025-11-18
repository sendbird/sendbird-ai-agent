//
//  AIAgentStarterKit+Configuration.swift
//  QuickStart
//
//  Created by Claude on 1/10/25.
//

import UIKit
import SendbirdAIAgentMessenger
import SendbirdChatSDK

// MARK: - Type Aliases

extension AIAgentStarterKit {
    /// Completion handler that receives an optional error
    typealias ErrorHandler = (Error?) -> Void

    /// Simple closure with no parameters or return value
    typealias VoidHandler = () -> Void
}

// MARK: - Singleton

extension AIAgentStarterKit {
    /// Shared instance for SessionDelegate protocol conformance only.
    /// For all other operations, use static methods and properties.
    static let shared = AIAgentStarterKit()
}

// MARK: - Session Data

extension AIAgentStarterKit {
    /// Stores information required to manage a session with the AI Agent.
    class SessionData {
        /// The application ID used to identify the AI Agent service.
        var appId: String = ""

        /// The user ID associated with the current session.
        var userId: String?

        /// The session token used for authentication and session management.
        var sessionToken: String?

        /// The delegate handling session-related events.
        var sessionHandler: SessionDelegate?
    }

    /// Shared session data for the SDK.
    static var sessionData = SessionData()
}

// MARK: - Status

extension AIAgentStarterKit {
    /// Represents the different lifecycle stages of the AI Agent SDK.
    enum Status {
        /// SDK has not been initialized yet
        case uninitialized

        /// SDK initialization completed
        case initialized

        /// SDK is ready to use (session info has been set)
        case readyToUse
    }

    /// Current SDK status
    /// - Note: Automatically calls `onReadyToUse` callback when status changes to `.readyToUse`
    static var status: Status {
        get {
            return _statusStorage
        }
        set {
            guard _statusStorage != newValue else { return }
            _statusStorage = newValue
            if _statusStorage == .readyToUse {
                DispatchQueue.main.async {
                    onReadyToUse?()
                }
            }
        }
    }

    private static var _statusStorage: Status = .uninitialized
}

// MARK: - Connection State

extension AIAgentStarterKit {
    /// Indicates whether the SDK is currently connected to Sendbird services.
    static var isConnected: Bool = false
}

// MARK: - Callbacks

extension AIAgentStarterKit {
    /// Called when the SDK status changes to `.readyToUse`.
    static var onReadyToUse: VoidHandler?
}

// MARK: - Launcher Options

extension AIAgentStarterKit {
    /// Default launcher button options used when presenting the launcher.
    /// You can modify this before calling `attachLauncher()` to customize the launcher behavior.
    static var defaultLauncherOptions = SBALauncherOptions()
}
