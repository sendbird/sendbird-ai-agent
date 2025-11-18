//
//  MockServer.swift
//  QuickStart
//
//  Created by Claude on 1/10/25.
//

import Foundation

// MARK: - Mock Server (Development Only)

/// Error types for mock server operations
enum MockServerError: Error {
    case refreshFailed
}

/// Mock server for simulating backend API calls during development and testing.
///
/// **⚠️ Warning**: This is for demonstration purposes only.
/// In production, replace this with actual API calls to your backend server.
///
/// **Note**: This file is located in the `Development/` folder and should be
/// excluded from production builds.
final class MockServer {
    /// Network latency simulation delay in seconds
    private static let simulatedNetworkDelay: TimeInterval = 0.2

    /// Token prefix for mock tokens
    private static let mockTokenPrefix = "mock_"

    /// Simulates a backend API that refreshes a session token.
    ///
    /// This method simulates network latency and generates a mock token.
    /// In production, replace this with a real network call to your authentication server.
    ///
    /// - Parameters:
    ///   - userId: The user ID to refresh the token for
    ///   - completion: Result handler with new token on success or error on failure
    ///
    /// # Example
    /// ```swift
    /// MockServer.refreshSessionToken(for: "user123") { result in
    ///     switch result {
    ///     case .success(let token):
    ///         print("New token: \(token)")
    ///     case .failure(let error):
    ///         print("Failed: \(error)")
    ///     }
    /// }
    /// ```
    ///
    /// - Note: This is for testing purposes only. Replace with actual API calls in production.
    static func refreshSessionToken(
        for userId: String?,
        completion: @escaping (Result<String, Error>) -> Void
    ) {
        // Simulate network latency
        DispatchQueue.global().asyncAfter(deadline: .now() + simulatedNetworkDelay) {
            guard let userId, userId.isEmpty == false else {
                completion(.failure(MockServerError.refreshFailed))
                return
            }
            let newToken = mockTokenPrefix + UUID().uuidString
            completion(.success(newToken))
        }
    }
}
