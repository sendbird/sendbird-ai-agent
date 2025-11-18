//
//  AIAgentStarterKit+SessionDelegate.swift
//  QuickStart
//
//  Created by Claude on 1/10/25.
//

import UIKit
import SendbirdAIAgentMessenger
import SendbirdChatSDK

// MARK: - Session Delegate

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
        #warning("Replace this with your backend API call to refresh the session token.")
        MockServer.refreshSessionToken(
            for: AIAgentStarterKit.sessionData.userId
        ) { result in
            switch result {
            case .success(let token):
                // Persist the refreshed token and notify the SDK via successCompletion
                // When success completion is called, updateSessionInfo is called internally, which causes the SDK to update the token.
                AIAgentStarterKit.sessionData.sessionToken = token
                DispatchQueue.main.async {
                    success(token)
                }
            case .failure(let error):
                debugPrint("[SessionDelegate] ❌ Token refresh failed - \(error.localizedDescription)")
                DispatchQueue.main.async {
                    fail()
                }
            }
        }
    }

    /// Called when the session has been closed.
    func sessionWasClosed() {
        // Session closed callback
    }

    /// Called when the session has been refreshed.
    func sessionWasRefreshed() {
        // Session refreshed callback
    }

    /// Handles common session errors.
    /// - Parameter error: The error encountered.
    func commonErrorHandle(_ error: Error) {
        debugPrint("[SessionDelegate] ❌ Session error - \(error.localizedDescription)")
    }

    /// Called when the session encounters an SBError.
    /// - Parameter error: The SBError encountered.
    func sessionDidHaveError(_ error: SBError) {
        self.commonErrorHandle(error)
    }
}
