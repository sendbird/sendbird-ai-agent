//
//  ExtendedSDKBridge+ExtendedSDK.swift
//  QuickStart
//
//  Created by Tez Park on 6/17/25.
//

/// This file defines conditional lifecycle operations for extended SDKs such as DeskSDK and UIKit,
/// enabling initialization, session updates, connection, and disconnection based on SDK availability.

/// Extension on `ExtendedSDKBridge` to manage SDK-specific lifecycle behaviors
/// depending on the presence of DeskSDK and UIKit in the environment.
extension ExtendedSDKBridge {
    static var deskTask = ExtendedSDKBridge.DeskTask(sessionData: AIAgentStarterKit.sessionData)
    static var uikitTask = ExtendedSDKBridge.SBUTask(sessionData: AIAgentStarterKit.sessionData)
    
    /// Initializes the DeskSDK and UIKit SDKs if they are available.
    /// This should be called during app startup to prepare the SDKs for use.
    static func initializeIfNeeded() async throws {
        if self.hasDeskSDK() { try await self.deskTask.initialize() }
        if self.hasUIKit() { try await self.uikitTask.initialize() }
    }
    
    /// Updates the session information for DeskSDK and UIKit SDKs if they are present.
    /// This is useful when session data changes and needs to be propagated to the SDKs.
    static func updateSessionInfoIfNeeded() async throws {
        if self.hasDeskSDK() { try await self.deskTask.updateSessionInfo() }
        if self.hasUIKit() { try await self.uikitTask.updateSessionInfo() }
    }
    
    /// Connects the DeskSDK and UIKit SDKs if they are available.
    /// Note: The DeskSDK connection is commented out here for production environment usage.
    /// This should be called when establishing active communication with the SDK services.
    static func connectIfNeeded() async throws {
        // >>>> HERE <<<< //
        // NOTE: Use this with production environment.
//                if self.hasDeskSDK() { try await self.deskTask.connect() }
        // >>>> HERE <<<< //
        if self.hasUIKit() { try await self.uikitTask.connect() }
    }
    
    /// Disconnects the DeskSDK and UIKit SDKs if they are present.
    /// This should be called during cleanup or app shutdown to properly release resources.
    static func disconnectIfNeeded() async throws {
        if self.hasDeskSDK() { try await self.deskTask.disconnect() }
        if self.hasUIKit() { try await self.uikitTask.disconnect() }
    }
    
    /// Utility method to check if DeskSDK is included in the extended SDKs.
    /// Returns true if DeskSDK is available, false otherwise.
    static func hasDeskSDK() -> Bool {
        return SampleTestInfo.extendedSDKs.contains { $0 == .DeskSDK }
    }
    
    /// Utility method to check if UIKit SDK is included in the extended SDKs.
    /// Returns true if UIKit is available, false otherwise.
    static func hasUIKit() -> Bool {
        return SampleTestInfo.extendedSDKs.contains { $0 == .UIKit }
    }
}
