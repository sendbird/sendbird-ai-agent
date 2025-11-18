//
//  ViewController.swift
//  QuickStart
//

import UIKit
import SendbirdChatSDK
import SendbirdAIAgentMessenger

/// Main view controller demonstrating AIAgentStarterKit integration
class ViewController: UIViewController {
    // MARK: - UI Constants
    // Constants for button styling and text labels
    private enum UIConstants {
        static let buttonCornerRadius: CGFloat = 24.0
        static let buttonBorderWidth: CGFloat = 1.0
        static let lightThemeTitle = "Change theme (Light)"
        static let darkThemeTitle = "Change theme (Dark)"
        static let chatButtonTitle = "Talk to an AI Agent"
    }

    // MARK: - Outlets
    @IBOutlet weak var chatBotItemView: UIButton!
    @IBOutlet weak var toggleColorSchemeButton: UIButton!
    @IBOutlet weak var loginOutButton: UIButton!
    @IBOutlet weak var versionLabel: UILabel!

    // MARK: - Lifecycle
    // Configure UI and update button states on load
    override func viewDidLoad() {
        super.viewDidLoad()
        setupUI()
        updateAllButtonStates()

        #if INTERNAL_TEST
        InternalTestManager.createAppInfoSettingButton(self)
        #endif
    }

    // Attach launcher when returning to this screen if connected
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        attachLauncherIfNeeded()
    }

    // Remove launcher when leaving this screen
    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)
        AIAgentStarterKit.detachLauncher()
    }

    // MARK: - UI Setup
    // Configure all UI components
    private func setupUI() {
        setupChatButton()
        setupActionButtons()
        setupVersionLabel()
    }

    private func setupChatButton() {
        chatBotItemView.setTitle(UIConstants.chatButtonTitle, for: .normal)
        chatBotItemView.layer.cornerRadius = UIConstants.buttonCornerRadius
    }

    private func setupActionButtons() {
        let buttons = [toggleColorSchemeButton, loginOutButton]
        buttons.forEach { button in
            button?.layer.cornerRadius = UIConstants.buttonCornerRadius
            button?.layer.borderWidth = UIConstants.buttonBorderWidth
            button?.layer.borderColor = UIColor.white.cgColor
        }
    }

    private func setupVersionLabel() {
        versionLabel.text = versionString()
    }

    // MARK: - Actions
    @IBAction func onTapChatBotItemViewButton(_ sender: UIButton) {
        AIAgentStarterKit.present(parent: self)
    }

    @IBAction func onTapToggleColorScheme(_ sender: UIButton) {
        AIAgentStarterKit.toggleColorScheme()
        updateThemeButtonTitle()
    }

    @IBAction func onTapLoginOut(_ sender: UIButton) {
        self.checkConnectIfNeeded() ? logout() : login()
    }

    // MARK: - Authentication
    // Connect to Sendbird with configured session info
    private func login() {
        updateSessionInfo()
        
        if ExtendedSDKBridge.hasUIKit() || ExtendedSDKBridge.hasDeskSDK() {
            // If you use UIKit or Desk SDK along with AIAgent, you need to connect first before using AIAgent feature.
                AIAgentStarterKit.connect { [weak self] error in
                guard let self = self else { return }

                if let error = error {
                    debugPrint("[ViewController] ❌ Connect failed - \(error.localizedDescription)")
                    return
                }

                self.attachLauncherIfNeeded()
                self.updateAllButtonStates()
            }
        } else {
            // If you only use AIAgent, there is no need to use this function because connect is handled internally when necessary.
            self.attachLauncherIfNeeded()
            self.updateAllButtonStates()
        }
    }

    // Disconnect from Sendbird and detach launcher
    private func logout() {
        AIAgentStarterKit.detachLauncher()

        AIAgentStarterKit.disconnect { [weak self] error in
            if let error = error {
                debugPrint("[ViewController] ❌ Disconnect failed - \(error.localizedDescription)")
            }
            self?.updateAllButtonStates()
        }
    }

    // Configure session info based on manual or anonymous mode
    private func updateSessionInfo() {
        switch SampleConfiguration.sessionInfoType {
        case .manual:
            AIAgentStarterKit.updateSessionInfo(
                userId: SampleConfiguration.userId,
                sessionToken: SampleConfiguration.sessionToken,
                sessionHandler: AIAgentStarterKit.shared
            )
        case .anonymous:
            AIAgentStarterKit.updateAnonymousSessionInfo()
        }
    }

    // MARK: - UI Updates
    // Update all UI elements to reflect current connection state
    private func updateAllButtonStates() {
        updateConnectedStatus()
        updateThemeButtonTitle()
    }

    // Enable/disable buttons based on connection status
    private func updateConnectedStatus() {
        let isConnected = self.checkConnectIfNeeded()
        chatBotItemView.isEnabled = isConnected
        toggleColorSchemeButton.isEnabled = isConnected
        loginOutButton.setTitle(isConnected ? "Logout" : "Login", for: .normal)
    }

    // Update theme button title to show current color scheme
    private func updateThemeButtonTitle() {
        let title = AIAgentMessenger.currentColorScheme == .light
            ? UIConstants.lightThemeTitle
            : UIConstants.darkThemeTitle
        toggleColorSchemeButton.setTitle(title, for: .normal)
    }

    // MARK: - Helpers
    // Attach floating launcher button if connected
    private func attachLauncherIfNeeded() {
        guard self.checkConnectIfNeeded() else { return }

        AIAgentStarterKit.attachLauncher(view: view)
    }
    
    private func checkConnectIfNeeded() -> Bool {
        let needsConnection = ExtendedSDKBridge.hasUIKit() || ExtendedSDKBridge.hasDeskSDK()
        if needsConnection && AIAgentStarterKit.isConnected == false { return false }
        
        return true
    }
}
