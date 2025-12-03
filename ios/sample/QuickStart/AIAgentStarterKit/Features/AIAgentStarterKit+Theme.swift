//
//  AIAgentStarterKit+Theme.swift
//  QuickStart
//
//  Created by Damon Park on 5/27/25.
//

import UIKit
import SendbirdAIAgentMessenger

// MARK: - Theme Management

/// Extension providing theme and color scheme management capabilities.
///
/// This extension handles switching between light and dark color schemes
/// for both the AI Agent SDK and optionally the UIKit SDK.
extension AIAgentStarterKit {

    /// Toggles the current color scheme between light and dark modes.
    ///
    /// This method switches the theme for:
    /// - Delight AI Agent SDK
    /// - Sendbird UIKit SDK (if integrated)
    ///
    /// - Returns: The newly applied `SBAColorScheme` after the toggle
    ///
    /// # Example Usage
    /// ```swift
    /// let newScheme = AIAgentStarterKit.toggleColorScheme()
    /// print("Current scheme: \(newScheme)")  // .light or .dark
    /// ```
    @discardableResult
    public static func toggleColorScheme() -> SBAColorScheme {
        switch AIAgentMessenger.currentColorScheme {
        case .light:
            self.applyColorScheme(.dark)
        case .dark:
            self.applyColorScheme(.light)
        @unknown default:
            break
        }

        return AIAgentMessenger.currentColorScheme
    }

    /// Applies a specific color scheme to the AI Agent SDK and UIKit SDK.
    ///
    /// Use this method when you want to explicitly set a color scheme rather than toggling.
    ///
    /// - Parameter scheme: The `SBAColorScheme` to apply (`.light` or `.dark`)
    ///
    /// # Example Usage
    /// ```swift
    /// // Always use dark mode
    /// AIAgentStarterKit.applyColorScheme(.dark)
    /// ```
    public static func applyColorScheme(_ scheme: SBAColorScheme) {
        self.updateAIAgentTheme(scheme)
        self.updateUIKitTheme(scheme)
    }
}
