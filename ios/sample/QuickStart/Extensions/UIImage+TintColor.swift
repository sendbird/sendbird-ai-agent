//
//  UIImage+TintColor.swift
//  QuickStart
//
//  Created by Claude on 1/10/25.
//

import UIKit

// MARK: - UIImage Tint Color Extension
extension UIImage {
    /// Returns a new image with the specified tint color applied
    /// - Parameter tintColor: The color to apply as a tint
    /// - Returns: A new tinted image, or the original if tintColor is nil
    func withTintColor(_ tintColor: UIColor?) -> UIImage {
        guard let tintColor = tintColor else { return self }

        if #available(iOS 13.0, *) {
            return withTintColor(tintColor)
        } else {
            return legacyTintedImage(with: tintColor)
        }
    }

    // iOS 12 and below fallback implementation
    private func legacyTintedImage(with tintColor: UIColor) -> UIImage {
        UIGraphicsBeginImageContextWithOptions(size, false, scale)
        defer { UIGraphicsEndImageContext() }

        tintColor.setFill()

        guard let context = UIGraphicsGetCurrentContext(),
              let cgImage = cgImage else {
            return self
        }

        context.translateBy(x: 0, y: size.height)
        context.scaleBy(x: 1.0, y: -1.0)
        context.setBlendMode(.normal)

        let rect = CGRect(origin: .zero, size: size)
        context.clip(to: rect, mask: cgImage)
        context.fill(rect)

        return UIGraphicsGetImageFromCurrentImageContext() ?? self
    }
}
