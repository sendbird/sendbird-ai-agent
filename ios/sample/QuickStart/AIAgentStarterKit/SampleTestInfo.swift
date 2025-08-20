//
//  SampleTestInfo.swift
//  QuickStart
//
//  Created by Tez Park on 6/18/25.
//


import Foundation
#if canImport(SendBirdDesk)
import SendBirdDesk
#endif
#if canImport(SendbirdUIKit)
import SendbirdUIKit
#endif

/// Provides sample configuration data for testing Sendbird SDK integrations.
struct SampleTestInfo {
    /// Represents the supported Sendbird SDKs integrated in the project.
    enum ExtendedSDKType {
        case UIKit
        case DeskSDK
    }
    
    enum SessionInfoType {
        case manual
        case anonymous
    }
    
    static var sessionInfoType: SessionInfoType = .manual
    
    /* Sendbird Product Server Test Environment */
    /// The production server URL for Sendbird services. `nil` if not set.
    static var productionServer: String? = nil
    /// The Sendbird application ID.
    static var appId = "10306808-B7F3-436F-9F5C-29F431B47B73"
    /// The AI agent ID used for AI-driven features.
    static var aiAgentId = "e4c57465-4773-432e-9740-f0284a951494"
    /// The user ID, typically obtained from the service server API.
    static var userId = "client-user" // from service server api.
    
    /// The session token paired with the user ID, obtained from the service server API.
    static var sessionToken = "deb776838a0dca710fffd9c38b06ed133e2d088f" // from service server api. (pair with user-id)
    
    /// Returns the list of integrated SDKs based on the current imports.
    /// - NOTE: Please do not modify it yourself.
    static var extendedSDKs: [ExtendedSDKType] {
        var sdkTypes: [ExtendedSDKType] = []
        #if canImport(SendBirdDesk)
            sdkTypes.append(.DeskSDK)
        #endif
        #if canImport(SendbirdUIKit)
            sdkTypes.append(.UIKit)
        #endif
        return sdkTypes
    }
}
