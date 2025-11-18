//
//  AIAgentStarterKit+Customize.swift
//  QuickStart
//
//  Created by Tez Park on 5/17/25.
//

import SendbirdAIAgentMessenger
import UIKit
#if canImport(SendbirdUIKit)
import SendbirdUIKit
#endif

// MARK: - CustomSet
extension AIAgentStarterKit {
    /// Closure to customize global configuration settings.
    public static var globalConfigCustomizationBuilder: (() -> Void)?
    /// Closure to customize module-specific settings.
    public static var moduleSetCustomizationBuilder: (() -> Void)?
    /// Closure to customize context objects used throughout the agent.
    public static var contextObjectsBuilder: (() -> Void)?

    /// Applies all custom configurations including global settings, module customizations, and context objects.
    ///
    /// This method should be called before presenting UI to ensure all customizations are applied.
    /// It executes the following builders in order:
    /// - `globalConfigCustomizationBuilder`: Global configuration settings
    /// - `moduleSetCustomizationBuilder`: Module-specific customizations
    /// - `contextObjectsBuilder`: Context object configurations
    static func applyCustomizations() {
        Self.globalConfigCustomizationBuilder?()
        Self.moduleSetCustomizationBuilder?()
        Self.contextObjectsBuilder?()
    }
    
    // MARK: - Theme
    /// Updates the theme of the Delight AI Agent Messenger with the specified color scheme.
    /// - Parameter colorScheme: The color scheme to apply to the AI Agent Messenger.
    static func updateAIAgentTheme(_ colorScheme: SBAColorScheme) {
        AIAgentMessenger.update(colorScheme: colorScheme)
    }
    
    /// Updates the theme of the Sendbird UIKit components with the specified color scheme.
    /// This method only applies if SendbirdUIKit is available.
    /// - Parameter colorScheme: The color scheme to apply to the UIKit components. Defaults to `.light`.
    static func updateUIKitTheme(_ colorScheme: SBAColorScheme = .light) {
        #if canImport(SendbirdUIKit)
        switch colorScheme {
        case .light: SBUTheme.set(colorScheme: .light)
        case .dark: SBUTheme.set(colorScheme: .dark)
        }
    
        SBUTheme.channelTheme.leftBarButtonTintColor = colorScheme == .light ? .black : .white
        #endif
    }
}
