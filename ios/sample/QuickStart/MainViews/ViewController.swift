//
//  ViewController.swift
//  QuickStart
//

import UIKit
import SendbirdChatSDK
import SendbirdAIAgentMessenger

class ViewController: UIViewController {
    @IBOutlet weak var chatBotItemView: UIButton!
    @IBOutlet weak var toggleColorSchemeButton: UIButton!
    @IBOutlet weak var loginOutButton: UIButton!
    
    @IBOutlet weak var versionLabel: UILabel!
    
    static let lightThemeString = "Change theme (Light)"
    static let darkThemeString = "Change theme (Dark)"
    
    override func viewDidLoad() {
        super.viewDidLoad()

        self.chatBotItemView.setTitle("Talk to an AI Agent", for: .normal)
        self.chatBotItemView.layer.cornerRadius = 24.0
        
        [toggleColorSchemeButton, loginOutButton].forEach { $0.layer.cornerRadius = 24.0 }
        [toggleColorSchemeButton, loginOutButton].forEach { $0.layer.borderWidth = 1.0 }
        [toggleColorSchemeButton, loginOutButton].forEach { $0.layer.borderColor = UIColor.white.cgColor }
        
        self.setupVersion()
        
        self.updateConnectedStatus()
        
        AIAgentMessenger.authenticate(
            aiAgentId: SampleTestInfo.aiAgentId
        ) { params in
            params.language = "en"
        } completionHandler: { result in
            print(result)
        }

        
        #if INTERNAL_TEST
        InternalTestManager.createAppInfoSettingButton(self)
        #endif
    }
    
    override func viewWillAppear(_ animated:Bool) {
        super.viewWillAppear(animated)
        
        if AIAgentStarterKit.isConnected {
            AIAgentStarterKit.attachLauncher(view: self.view)
        }
    }
    
    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)
        AIAgentStarterKit.detachLauncher()
    }
    
    @IBAction func onTapChatBotItemViewButton(_ sender: UIButton) {
        AIAgentStarterKit.present(parent: self)
    }
    
    @IBAction func onTapToggleColorScheme(_ sender: UIButton) {
        AIAgentStarterKit.toggleColorScheme()
        
        let schemeTitle = (AIAgentMessenger.currentColorScheme == .light) ? Self.lightThemeString : Self.darkThemeString
        self.toggleColorSchemeButton.setTitle(schemeTitle, for: .normal)
    }
    
    @IBAction func onTapLoginOut(_ sender: UIButton) {
        if AIAgentStarterKit.isConnected {
            self.logout()
        } else {
            self.login()
        }
    }
    
    func setupVersion() {
        versionLabel.text = self.versionString()
    }
    
    func login() {
        #warning("Session info update first")
        switch SampleTestInfo.sessionInfoType {
        case .manual:
            AIAgentStarterKit.updateSessionInfo(
                userId: SampleTestInfo.userId,
                sessionToken: SampleTestInfo.sessionToken,
                sessionHandler: AIAgentStarterKit.shared
            )
            
        case .anonymous:
            AIAgentStarterKit.updateAnonymousSessionInfo()
        }
        
        AIAgentStarterKit.connect { [weak self] error in
            if let error {
                debugPrint("[AIAgentStarterKit][Connect] error: \(error)")
                return
            }
            
            AIAgentStarterKit.attachLauncher(view: self?.view)
            self?.updateConnectedStatus()
        }
    }
    
    func logout() {
        AIAgentStarterKit.detachLauncher()
        AIAgentStarterKit.disconnect { [weak self] error in
            if let error { debugPrint("[AIAgentStarterKit][Disconnect] handle error: \(error)")}
            self?.updateConnectedStatus()
        }
    }
    
    func updateConnectedStatus() {
        let isConnected = AIAgentStarterKit.isConnected
        self.chatBotItemView.isEnabled = isConnected
        self.toggleColorSchemeButton.isEnabled = isConnected
        self.loginOutButton.setTitle(isConnected ? "Logout" : "Login", for: .normal)
    }
}
