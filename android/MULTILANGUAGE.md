# Delight AI agent SDK Localization Guide
## sagan - testestest!!!
This guide explains how to localize the UI strings used in the Delight AI agent SDK for Android to support multiple languages in your application.

---

## Table of Contents

- [Overview](#overview)
- [Default Strings Used by the SDK](#default-strings-used-by-the-sdk)
- [How to Add Translations](#how-to-add-translations)
- [Overriding SDK Strings in Your App](#overriding-sdk-strings-in-your-app)

---

## Overview

Delight AI agent SDK includes a default set of user-facing string resources such as button labels, error messages, input hints, and system texts.
To support internationalization, you can translate these strings into multiple languages using standard Android localization patterns with `strings.xml`.

> **Built-in languages:**  
> The SDK currently provides built-in localization for the following languages:
>
> - English (`en`)
> - German (`de`)
> - Spanish (`es`)
> - French (`fr`)
> - Hindi (`hi`)
> - Italian (`it`)
> - Japanese (`ja`)
> - Korean (`ko`)
> - Portuguese (`pt`)
> - Turkish (`tr`)
>
> If you need support for a language that is not listed above, you can customize the SDK strings by following this guide.

---

## Default Strings Used by the SDK

The Delight AI agent SDK uses a predefined set of string keys for user-facing texts such as messages, errors, and labels.

You can download or view the full list of default strings here:

📄 [aiagent_sdk_strings.xml](./res/strings.xml)

Use this file as a reference when creating translations for additional languages.

---

## How to Add Translations

You can add translations for different languages in your Android project using Android Studio’s **Translations Editor**. This tool makes it easy to manage multilingual string resources without manually editing XML files.

### Open Translations Editor
1. In Android Studio, go to `res/values/strings.xml`.
2. Right-click and choose `Open Translations Editor`, or click the 🌐 icon on the file tab.

### Add a New Language
- Click **Globe ➕ Add Locale**
- Choose a language (e.g., Russian `ru`, Japanese `ja`, etc.)
- Click **OK**
- Android Studio will create a folder like `res/values-ru/strings.xml`

---

## Overriding SDK Strings in Your App

If you want to **customize** the SDK's text, override it by redefining the string with the same key in your app's `strings.xml`.

```xml
<!-- res/values-ru/strings.xml -->
<string name="aa_text_dialog_permission_title">Разрешить доступ</string>
<string name="aa_text_go_to_settings">Настройки</string>
<string name="aa_text_need_to_allow_permission_camera">%s
нужен доступ к камере. Перейдите в настройки, чтобы разрешить доступ.</string>
<string name="aa_text_need_to_allow_permission_storage">%s
нужен доступ к памяти устройства. Перейдите в настройки, чтобы разрешить доступ.</string>
<string name="aa_text_need_to_allow_permission_record_audio">%s
нужен доступ к микрофону. Перейдите в настройки, чтобы разрешить доступ.</string>
...
```

> The SDK will prioritize the string from your app over its internal default.

---
