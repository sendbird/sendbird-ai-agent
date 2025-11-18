//
//  Logger.swift
//  QuickStart
//
//  Created by Claude on 1/10/25.
//

import Foundation

/// Simple logging utility for AIAgentStarterKit with consistent formatting
enum Logger {
    // MARK: - Log Categories
    enum Category: String {
        case initialization = "Init"
        case connection = "Connect"
        case disconnection = "Disconnect"
        case session = "Session"
        case push = "Push"
        case ui = "UI"
        case extended = "Extended"
        case general = "General"
    }

    // MARK: - Log Levels
    enum Level: String {
        case info = "ℹ️"
        case success = "✅"
        case warning = "⚠️"
        case error = "❌"
    }

    // MARK: - Logging Methods
    /// Log informational message
    static func info(_ message: String, category: Category = .general) {
        log(message, level: .info, category: category)
    }

    /// Log success message
    static func success(_ message: String, category: Category = .general) {
        log(message, level: .success, category: category)
    }

    /// Log warning message
    static func warning(_ message: String, category: Category = .general) {
        log(message, level: .warning, category: category)
    }

    /// Log error with optional Error object
    static func error(_ message: String, error: Error? = nil, category: Category = .general) {
        var fullMessage = message
        if let error = error {
            fullMessage += " - \(error.localizedDescription)"
        }
        log(fullMessage, level: .error, category: category)
    }

    // MARK: - Private Methods
    private static func log(_ message: String, level: Level, category: Category) {
        let timestamp = dateFormatter.string(from: Date())
        let formatted = "[\(timestamp)] \(level.rawValue) [\(category.rawValue)] \(message)"
        debugPrint(formatted)
    }

    private static let dateFormatter: DateFormatter = {
        let formatter = DateFormatter()
        formatter.dateFormat = "HH:mm:ss.SSS"
        return formatter
    }()
}
