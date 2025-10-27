//
//  AIAgentStarterKit.swift
//  QuickStart
//
//  Created by Tez Park on 5/12/25.
//

import UIKit
import SendbirdAIAgentMessenger
import SendbirdChatSDK

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
    
    /// Represents the different lifecycle stages of the AI Agent.
    enum Status {
        case uninitialized
        case initialized
        case readyToUse
    }
}

/// Singleton controller for initializing and managing AI Agent SDK operations.
class AIAgentStarterKit: NSObject {
    typealias ErrorHandler = (Error?) -> Void
    
    static let shared = AIAgentStarterKit()
    
    static var isConnected: Bool = false
    static var sessionData = SessionData()
    
    var onReadyToUse: (() -> Void)?
    var initParamsBuilder: ((_ params: SendbirdChatSDK.InitParams?) -> Void)?
    var status: Status = .uninitialized {
        didSet {
            if self.status == oldValue { return }
            if self.status != .readyToUse { return }
            DispatchQueue.main.async { [weak self] in
                self?.onReadyToUse?()
            }
        }
    }
}

// MARK: - Initialize
extension AIAgentStarterKit {
    /// Initializes the AI Agent SDK with the given application ID.
    /// - Parameters:
    ///   - appId: The application ID to initialize the SDK.
    ///   - completion: Optional completion handler called with an error if initialization fails.
    static func initialize(
        appId: String,
        completion: ErrorHandler? = nil
    ) {
        Self.sessionData.appId = appId
        
        // (Optional) for log level setting.
        AIAgentStarterKit.shared.initParamsBuilder = { params in
            params?.logLevel = .verbose
        }
        
        Task {
            do {
                // initialize priority: UIKit, Desk, AIAgent
                
                // INFO: This is only necessary when using extended SDKs(e,g,. UIKit, DeskSDK).
                try await ExtendedSDKBridge.initializeIfNeeded()
                
                try await self.initialize()

                AIAgentStarterKit.shared.status = .initialized
                
                #if INTERNAL_TEST
                if let target = SampleTestInfo.productionServer {
                    try await ExtendedSDKBridge.updateHost(target)
                }
                #endif
                
                DispatchQueue.main.async {
                    completion?(nil)
                }
            } catch {
                debugPrint("[sdk-initialize] error: \(error)")
                DispatchQueue.main.async {
                    completion?(error)
                }
            }
        }
    }
}

// MARK: - Session Management
extension AIAgentStarterKit {
    /// Updates the current session information with user ID, session token, and session handler.
    /// - Parameters:
    ///   - userId: The user ID for the session.
    ///   - sessionToken: The session token for authentication.
    ///   - sessionHandler: The delegate to handle session events.
    static func updateSessionInfo(
        userId: String,
        sessionToken: String?,
        sessionHandler: SessionDelegate?
    ) {
        // Set the session data.
        AIAgentStarterKit.sessionData.userId = userId
        AIAgentStarterKit.sessionData.sessionToken = sessionToken
        AIAgentStarterKit.sessionData.sessionHandler = sessionHandler
        
        Task {
            do {
                // INFO: This is only necessary when using extended SDKs(e,g,. UIKit, DeskSDK).
                try await ExtendedSDKBridge.updateSessionInfoIfNeeded()
                
                try await self.updateManualSessionInfo()
                
                AIAgentStarterKit.shared.status = .readyToUse
            } catch {
                debugPrint("[session-info] error: \(error)")
            }
        }
    }
    
    static func updateAnonymousSessionInfo(
    ) {
        Task {
            do {
                try await self.updateAnonymousSessionInfo()
                
                AIAgentStarterKit.shared.status = .readyToUse
            } catch {
                debugPrint("[session-info] error: \(error)")
            }
        }
    }
}

// MARK: Session Delegate
// TODO: This session handler is for example code only, and should be updated via the service's API.
extension AIAgentStarterKit: SessionDelegate {
    /// Called when a session token is required for authentication.
    /// - Parameters:
    ///   - successCompletion: Closure to call with the session token on success.
    ///   - failCompletion: Closure to call on failure.
    func sessionTokenDidRequire(
        successCompletion success: @escaping (String?) -> Void,
        failCompletion fail: @escaping () -> Void
    ) {
        // Call the your server to refresh the session token and forward the result.
        // MockServer is simulating a backend API that refreshes a session token.
        MockServer.refreshSessionToken(
            for: AIAgentStarterKit.sessionData.userId
        ) { result in
            switch result {
            case .success(let token):
                // Persist the refreshed token and notify the SDK via successCompletion
                // When success completion is called, updateSessionInfo is called internally, which causes the SDK to update the token.
                debugPrint("[xxx] aiagent session handler - \(#function)")
                AIAgentStarterKit.sessionData.sessionToken = token
                DispatchQueue.main.async {
                    success(token)
                }
            case .failure(let error):
                debugPrint("[xxx] token refresh failed: \(error)")
                DispatchQueue.main.async {
                    fail()
                }
            }
        }
    }
    
    /// Called when the session has been closed.
    func sessionWasClosed() {
        debugPrint("[xxx] aiagent session handler - \(#function)")
    }
    
    /// Called when the session has been refreshed.
    func sessionWasRefreshed() {
        debugPrint("[xxx] aiagent session handler - \(#function)")
    }
    
    /// Handles common session errors.
    /// - Parameter error: The error encountered.
    func commonErrorHandle(_ error: Error) {
        debugPrint("[xxx] common session error handler - \(#function)- error: \(error)")
    }
    
    /// Called when the session encounters an SBError.
    /// - Parameter error: The SBError encountered.
    func sessionDidHaveError(_ error: SBError) {
        self.commonErrorHandle(error)
    }
}


// MARK: - Connect/Disconnect
extension AIAgentStarterKit {
    /// Connects to the AI Agent service.
    /// - Parameter completion: Optional completion handler called with an error if connection fails.
    static func connect(completion: ErrorHandler? = nil) {
        Task {
            do {
                self.isConnected = true
                
                // Connection priority: UIKit, AIAgent
                
                // INFO: This is only necessary when using extended SDKs(e,g,. UIKit, DeskSDK).
                try await ExtendedSDKBridge.connectIfNeeded()
                
                // If you only use AIAgent, there is no need to use this function because connect is handled internally when necessary.
                try await self.connect()
                
                DispatchQueue.main.async {
                    completion?(nil)
                }
            } catch {
                DispatchQueue.main.async {
                    completion?(error)
                }
            }
        }
    }
    
    /// Disconnects from the AI Agent service.
    /// - Parameter completion: Optional completion handler called with an error if disconnection fails.
    static func disconnect(completion: ErrorHandler? = nil) {
        Task {
            do {
                self.isConnected = false
                
                // INFO: This is only necessary when using extended SDKs(e,g,. UIKit, DeskSDK).
                try await ExtendedSDKBridge.disconnectIfNeeded()
                
                try await self.disconnect()
                
                DispatchQueue.main.async {
                    completion?(nil)
                }
            } catch {
                DispatchQueue.main.async {
                    completion?(error)
                }
            }
        }
    }
}

// MARK: - Present Conversation & Attach Launcher
extension AIAgentStarterKit {
    /// Use this when you want to display in full screen.
    /// - Parameter parent: The ViewController to parent and integrate with.
    static func present(parent: UIViewController) {
        AIAgentStarterKit.loadCustomSets()
        
        AIAgentMessenger.presentConversation(
            aiAgentId: SampleTestInfo.aiAgentId
        ) { params in
            params.language = self.contextObjects.language
            params.countryCode = self.contextObjects.countryCode
            params.context = self.contextObjects.context
            params.parent = parent
        }
        
        // - NOTE: Use this logic if you want to present it as a conversation list.
//        AIAgentMessenger.presentConversationList(
//            aiAgentId: SampleTestInfo.aiAgentId
//        ) { params in
//            params.language = self.contextObjects.language
//            params.countryCode = self.contextObjects.countryCode
//            params.context = self.contextObjects.context
//            params.parent = parent
//        }
}
    
    /// Use this when you want to show and use the launcher button from the Sendbird Dashboard.
    /// - Parameter view: The view to parent.
    static func attachLauncher(view: UIView? = nil) {
        AIAgentStarterKit.loadCustomSets()
        
        var options = AIAgentStarterKit.defaultLauncherOptions
        
        // INFO: Sample
//      options = SBALauncherOptions(
//            parentView: nil, // the view that will be the launcher's parent view, if not, attach to window.
//            entryPoint: .conversationList,
//
//            // options to set the layout of the laucnher button
//            layout: .init(
//                position: .trailingTop,
//                margin: .default,
//                useSafeArea: true
//            ),
//
//            // Options to set how the conversation screen is displayed
//            displayStyle: .fullscreen(
//                .init(
//                    presentationStyle: .fullScreen,
//                    parentController: nil
//                )
//            )
//        )
        
        // The point at which the context object is assigned is when the launcher is exposed.
        let startLauncher: (() -> Void) = {
            AIAgentMessenger.attachLauncher(
                aiAgentId: SampleTestInfo.aiAgentId
            ) { params in
                params.language = self.contextObjects.language
                params.countryCode = self.contextObjects.countryCode
                params.context = self.contextObjects.context
                params.options = options
            }
        }
        
        AIAgentStarterKit.shared.onReadyToUse = startLauncher
        
        startLauncher()
    }

    /// Call this if you attach a launcher to the window.
    static func detachLauncher() {
        AIAgentMessenger.detachLauncher(
            aiAgentId: SampleTestInfo.aiAgentId
        )
    }
}

// MARK: - Mock Server (for token refresh simulation)
private enum MockServerError: Error { case refreshFailed }

private final class MockServer {
    /// Simulates a backend API that refreshes a session token.
    /// In production, replace this with a real network call.
    static func refreshSessionToken(
        for userId: String?,
        completion: @escaping (Result<String, Error>) -> Void
    ) {
        // Simulate latency
        DispatchQueue.global().asyncAfter(deadline: .now() + 0.2) {
            guard let userId, userId.isEmpty == false else {
                completion(.failure(MockServerError.refreshFailed))
                return
            }
            let newToken = "mock_" + UUID().uuidString
            completion(.success(newToken))
        }
    }
}
