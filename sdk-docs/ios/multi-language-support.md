# Multi-language support

This guide walks you through adding a `Localizable.strings` file to your Xcode project and configuring it to support multiple languages.

***

{% stepper %}
{% step %}
#### Add `Localizable.strings` Fil

1. In the **Project Navigator**, right-click on your target group or folder.
2. Select **New File from Template…**
3. Choose **Strings File(Legacy)** under the **Resource** section.
4. Name the file exactly: `Localizable.strings`
5. Click **Create.**

{% hint style="info" %}
Note: Follow the steps above when you don't have a `Localizable.strings` file.
{% endhint %}
{% endstep %}

{% step %}
Enable Localization
{% endstep %}

{% step %}
#### Add Translations

Edit the `Localizable.strings` files per language:

**`Localizable.strings` (English)**

```
"SBA_Common_cancel" = "Cancel";
"SBA_Common_retry" = "Retry";
...
```

Refer to the [English-based `Localizable.string` file](https://github.com/sendbird/sendbird-ai-agent/blob/main/ios/en.lproj/Localizable.strings) to set the language-specific strings to use for the keys you need.

> If you set the key-value of `Localizable.string` for each language you need, it will use the internally customized string first.
{% endstep %}
{% endstepper %}

***

### Tips on testing different languages in simulator

1. Run your app in the **iOS Simulator**
2. Open **Settings > General > Language & Region**
3. Change the language to your desired option (e.g., Bangla)
4. Relaunch your app — localized strings should appear accordingly
