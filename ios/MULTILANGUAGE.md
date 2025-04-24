# Custom Localization Guide (Multi-language Support)

This guide walks you through adding a `Localizable.strings` file to your Xcode project and configuring it to support multiple languages such as English and Bangla.

---

## 1. Add `Localizable.strings` File

1. In the **Project Navigator**, right-click on your target group or folder.
2. Select **New File from Template…**
3. Choose **Strings File(Legacy)** under the **Resource** section.
4. Name the file exactly: `Localizable.strings`
5. Click **Create**

> Note: Do this process when you don't have a `Localizable.strings` file.

---

## 2. Enable Localization

1. In the **Project Navigator**, click on your project (blue icon) to open the project editor.
2. Select the **Project** (not the target) in the left sidebar of the project editor.
3. Open the **Info** tab at the top.
4. Scroll down to the **Localizations** section.
5. Click the **+** button to add a new language (e.g., **Korean**).
6. A dialog will appear asking which files to localize — make sure to select `Localizable.strings`.
7. Xcode will generate a separate `Localizable.strings` file for the newly added language.

> This step ensures your app is properly configured to support multiple languages and allows Xcode to manage localized resources.

---

## 3. Add Translations

Edit the `Localizable.strings` files per language:

### `Localizable.strings` (English)
```swift
"SBA_Common_cancel" = "Cancel";
"SBA_Common_retry" = "Retry";
...
```

> If you set the key-value of `Localizable.string` for each language you need, it will use the internally customized string first.

Refer to the English-based table below to set the language-specific strings to use for the keys you need.

### Table of language set

| category                       | Key                                                      | Value(en)                                              |
|:-------------------------------|:---------------------------------------------------------|:-----------------------------------------------------------|
| Common                         | `SBA_Common_cancel`                                        | `Cancel`                                                     |
| Common                         | `SBA_Common_retry`                                         | `Retry`                                                      |
| Common                         | `SBA_Common_save`                                          | `Save`                                                       |
| Common                         | `SBA_Common_delete`                                        | `Delete`                                                     |
| Common                         | `SBA_Common_settings`                                      | `Settings`                                                   |
| Common                         | `SBA_Common_submit`                                        | `Submit`                                                     |
| Common photo                   | `SBA_Common_Photo_camera`                                  | `Camera`                                                     |
| Common photo                   | `SBA_Common_Photo_photoLibrary`                            | `Photo library`                                              |
| Common photo                   | `SBA_Common_Photo_document`                                | `Files`                                                      |
| Common photo                   | `SBA_Common_Photo_viewLibrary`                             | `View library`                                               |
| Common toast                   | `SBA_Common_Toast_successDownloadFile`                     | `File saved.`                                                |
| Common toast                   | `SBA_Common_Toast_failureDownloadFile`                     | `Couldn’t download file.`                                    |
| Common toast                   | `SBA_Common_Toast_failureOpenFile`                         | `Couldn’t open file.`                                        |
| Common empty                   | `SBA_Common_Empty_conversation`                            | `No conversation yet`                                        |
| Common empty                   | `SBA_Common_Empty_messages`                                | `No messages`                                                |
| Common empty                   | `SBA_Common_Empty_error`                                   | `Something went wrong`                                       |
| Common alert                   | `SBA_Common_Alert_delete`                                  | `Are you sure you want to delete?`                           |
| Common alert                   | `SBA_Common_Alert_allowCameraAccess`                       | `Please allow camera usage from settings`                    |
| Common alert                   | `SBA_Common_Alert_allowPhotoLibraryAccess`                 | `Please Allow PhotoLibrary Access`                           |
| Common alert                   | `SBA_Common_Alert_allowPhotoLibraryAccessMessage`          | `PhotoLibrary access required to get your photos and videos` |
| Common alert                   | `SBA_Common_Alert_allowMicrophoneAccess`                   | `Please allow microphone usage from settings`                |
| Common alert                   | `SBA_Common_Error_exceededSizeLimit`                       | `The maximum size per file is %dMB.`                         |
| Common date format             | `SBA_Common_DateFormat_yesterday`                          | `Yesterday`                                                  |
| Conversation header            | `SBA_Conversation_Header_noMembers`                        | `(No members)`                                               |
| Conversation input placeholder | `SBA_Conversation_Input_Placeholder_normal`                | `Ask a question`                                             |
| Conversation input placeholder | `SBA_Conversation_Input_Placeholder_streaming`             | `Waiting for the agent's reply...`                           |
| Conversation input placeholder | `SBA_Conversation_Input_Placeholder_closeConversation`     | `Chat is unavailable in this channel`                        |
| Conversation list              | `SBA_Conversation_List_UnknownMessage_title`               | `(Unknown message type)`                                     |
| Conversation list              | `SBA_Conversation_List_UnknownMessage_description`         | `Can't read this message.`                                   |
| Conversation list              | `SBA_Conversation_List_WelcomeMessage_title`               | `Powered by Sendbird`                                        |
| Message template               | `SBA_Conversation_List_MessageTemplate_errorTitle`         | `(Template error)`                                           |
| Message template               | `SBA_Conversation_List_MessageTemplate_errorSubtitle`      | `Can't read this message template.`                          |
| Message template               | `SBA_Conversation_List_NewMessageInfo_countFormatTitle`    | `%d new message`                                             |
| Message template               | `SBA_Conversation_List_NewMessageInfo_maxCountFormatTitle` | `%d+ new message`                                            |
| User                           | `SBA_Conversation_List_User_me`                            | `(You)`                                                      |
| User                           | `SBA_Conversation_List_User_noName`                        | `(No name)`                                                  |
| User                           | `SBA_Conversation_List_User_operator`                      | `Operator`                                                   |
| Form                           | `SBA_Conversation_List_Form_optional`                      | `(optional)`                                                 |
| Form                           | `SBA_Conversation_List_Form_errorDefault`                  | `Please check the value`                                     |
| Form                           | `SBA_Conversation_List_Form_errorRequired`                 | `This field is required`                                     |
| Form                           | `SBA_Conversation_List_Form_fallbackMessage`               | `Form type messages are not available in this version.`      |
| Form                           | `SBA_Conversation_List_Form_submitDone`                    | `Submitted successfully`                                     |
| Form                           | `SBA_Conversation_List_Form_noResponse`                    | `No response`                                                |
| Feedback                       | `SBA_Conversation_List_Feedback_commentTitle`              | `Provide additional feedback (optional)`                     |
| Feedback                       | `SBA_Conversation_List_Feedback_commentPlaceholder`        | `Leave a comment`                                            |
| Feedback                       | `SBA_Conversation_List_Feedback_editComment`               | `Edit comment`                                               |
| Feedback                       | `SBA_Conversation_List_Feedback_remove`                    | `Remove feedback`                                            |
| Feedback                       | `SBA_Conversation_List_Feedback_updateDone`                | `Successfully changed`                                       |
| Conversation closed            | `SBA_Conversation_List_Closed_title`                       | `Your conversation has ended.`                               |
| Conversation closed            | `SBA_Conversation_List_Closed_actionTitle`                 | `💬 Start a new conversation`                                |
| Conversation closed            | `SBA_Conversation_List_Closed_actionInactiveTitle`         | `💬 Return to conversation`                                  |
| CSAT                           | `SBA_Conversation_List_CSAT_topTitleNormal`                | `Your feedback matters to us`                                |
| CSAT                           | `SBA_Conversation_List_CSAT_topTitleSubmitted`             | `✔️ Successfully submitted.`                                 |
| CSAT                           | `SBA_Conversation_List_CSAT_resolutionTitle`               | `Was your issue resolved?`                                   |
| CSAT                           | `SBA_Conversation_List_CSAT_resolutionYes`                 | `Yes, thank you! 👍`                                         |
| CSAT                           | `SBA_Conversation_List_CSAT_resolutionNo`                  | `No, that didn’t help.`                                      |
| CSAT                           | `SBA_Conversation_List_CSAT_satisfactionTitle`             | `How would you rate your experience?`                        |
| CSAT                           | `SBA_Conversation_List_CSAT_satisfactionInputPlaceholder`  | `Share your feedback`                                        |
| CSAT                           | `SBA_Conversation_List_CSAT_expiredTitle`                  | `We're sorry, the survey period has ended.`                  |
| Conversation list              | `SBA_ConversationList_Header_headerTitle`                  | `Conversation history`                                       |
| Conversation list              | `SBA_ConversationList_List_defaultTopic`                   | `No category`                                                |
| Conversation list              | `SBA_ConversationList_Footer_actionTitle`                  | `💬 Return to conversation`                                  |

---

## Tips

### Test Different Languages in Simulator

1. Run your app in the **iOS Simulator**
2. Open **Settings > General > Language & Region**
3. Change the language to your desired option (e.g., Bangla)
4. Relaunch your app — localized strings should appear accordingly

---
