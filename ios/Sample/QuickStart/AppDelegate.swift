//
//  AppDelegate.swift
//  QuickStart
//

import UIKit
import SendbirdChatSDK
import SendbirdAIAgentMessenger

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate, UNUserNotificationCenterDelegate {
    var window: UIWindow?
    
    func application(_ application: UIApplication,
                     didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        #if INTERNAL_TEST
        // Internal - Load Sample Test Info
        InternalTestManager.loadTestAppInfo()
        #endif

        let mainVC = ViewController(nibName: "ViewController", bundle: nil)
        let navigationController = UINavigationController(rootViewController: mainVC)
        window?.rootViewController = navigationController
        window?.makeKeyAndVisible()
        
        /// INFO: This method could cause the 800100 error.
        /// However, it's not a problem because the device push token will be kept by the ChatSDK and the token will be registered after the connection is established.
        self.initializeRemoteNotification()
        
        // SDK Initialize.
        AIAgentStarterKit.initialize(appId: SampleTestInfo.appId) { error in
            if let error {
                debugPrint("[AIAgentStarterKit][initialize] error: \(error)")
            }
        }

        return true
    }
    
    func applicationDidBecomeActive(_ application: UIApplication) {
        application.applicationIconBadgeNumber = 0
    }
    
    func initializeRemoteNotification() {
        let center = UNUserNotificationCenter.current()
        center.delegate = self
        center.requestAuthorization(options: [.sound, .alert]) { granted, error in
            DispatchQueue.main.async {
                UIApplication.shared.registerForRemoteNotifications()
            }
        }
    }
    
    func application(
        _ application: UIApplication,
        didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data
    ) {
        debugPrint("[xxx] APNs Device Token: \(deviceToken.map { String(format: "%02.2hhx", $0) }.joined())")
        // Register a device token to SendBird server.
        AIAgentStarterKit.registerPush(deviceToken: deviceToken)
    }
    
    
    func userNotificationCenter(
        _ center: UNUserNotificationCenter,
        willPresent notification: UNNotification,
        withCompletionHandler completionHandler: @escaping (UNNotificationPresentationOptions) -> Swift.Void
    ) {
        // Foreground setting
//        completionHandler([.alert, .badge, .sound])
    }
    
    func userNotificationCenter(
        _ center: UNUserNotificationCenter,
        didReceive response: UNNotificationResponse,
        withCompletionHandler completionHandler: @escaping () -> Swift.Void
    ) {
        let userInfo = response.notification.request.content.userInfo
        guard AIAgentStarterKit.isValidSendbirdPush(userInfo: userInfo) else { return }
        
        AIAgentStarterKit.presentFromNotification(
            userInfo: userInfo,
            topViewController: nil // If you have a view controller to show the conversation list, set it here
        )
    }
}

fileprivate extension UIImage {
    func ext_with(tintColor: UIColor?) -> UIImage {
        guard let tintColor = tintColor else { return self }
        if #available(iOS 13.0, *) {
            return withTintColor(tintColor)
        } else {
            let image = self
            UIGraphicsBeginImageContextWithOptions(image.size, false, image.scale)
            tintColor.setFill()
            let context = UIGraphicsGetCurrentContext()
            context?.translateBy(x: 0, y: image.size.height)
            context?.scaleBy(x: 1.0, y: -1.0)
            context?.setBlendMode(CGBlendMode.normal)
            let rect = CGRect(
                origin: .zero,
                size: CGSize(width: image.size.width, height: image.size.height)
            )
            context?.clip(to: rect, mask: image.cgImage!)
            context?.fill(rect)
            
            guard let newImage = UIGraphicsGetImageFromCurrentImageContext() else {
                return self
            }
            
            UIGraphicsEndImageContext()
            
            return newImage
        }
    }
}
