//
//  AsyncHelpers.swift
//  QuickStart
//
//  Created by Tez Park on 6/18/25.
//

import Foundation

/// Provides utility functions for converting callback-based APIs to async/await.
extension ExtendedSDKBridge {

    /// Converts a callback-based operation with error handling to async/await.
    ///
    /// This helper eliminates the boilerplate code of manually wrapping continuation logic.
    ///
    /// - Parameter operation: A closure that performs the async operation and calls the completion handler.
    ///   The completion handler takes an optional `Error`.
    /// - Throws: The error passed to the completion handler, if any.
    ///
    /// # Example Usage
    /// ```swift
    /// func initialize() async throws {
    ///     try await asyncify { completion in
    ///         SomeSDK.initialize { error in
    ///             completion(error)
    ///         }
    ///     }
    /// }
    /// ```
    static func asyncify(
        _ operation: @escaping (@escaping (Error?) -> Void) -> Void
    ) async throws {
        try await withCheckedThrowingContinuation { (continuation: CheckedContinuation<Void, Error>) in
            operation { error in
                if let error = error {
                    continuation.resume(throwing: error)
                } else {
                    continuation.resume()
                }
            }
        }
    }

    /// Converts a callback-based operation with Result to async/await.
    ///
    /// - Parameter operation: A closure that performs the async operation and calls the completion handler.
    ///   The completion handler takes a `Result<T, Error>`.
    /// - Returns: The success value of type `T`.
    /// - Throws: The error from the Result's failure case.
    ///
    /// # Example Usage
    /// ```swift
    /// func fetchData() async throws -> String {
    ///     try await asyncifyResult { completion in
    ///         SomeSDK.fetchData { result in
    ///             completion(result)
    ///         }
    ///     }
    /// }
    /// ```
    static func asyncifyResult<T>(
        _ operation: @escaping (@escaping (Result<T, Error>) -> Void) -> Void
    ) async throws -> T {
        try await withCheckedThrowingContinuation { (continuation: CheckedContinuation<T, Error>) in
            operation { result in
                continuation.resume(with: result)
            }
        }
    }
}
