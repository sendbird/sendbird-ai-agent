import { useMemo } from 'react';

import { useMessengerCore } from './useMessengerCore';
import { useUpdateStatus } from './useUpdateStatus';

export function useMessengerControls() {
  const messenger = useMessengerCore();

  // Create a unique key for each action to track its status
  const configStatus = useUpdateStatus({ key: 'config' });
  const sessionStatus = useUpdateStatus({ key: 'session' });
  const localeStatus = useUpdateStatus({ key: 'locale' });
  const contextStatus = useUpdateStatus({ key: 'context' });
  const deauthenticateStatus = useUpdateStatus({ key: 'deauthenticate' });
  const destroyStatus = useUpdateStatus({ key: 'destroy' });
  const customStringSetStatus = useUpdateStatus({ key: 'custom_stringset' });
  const unsupportedLanguageStatus = useUpdateStatus({ key: 'unsupported_language' });
  const switchLanguageBackStatus = useUpdateStatus({ key: 'switch_language_back' });

  return useMemo(
    () => ({
      open: {
        execute: messenger.open,
      },
      close: {
        execute: messenger.close,
      },
      config: {
        execute: configStatus.withUpdateStatus(messenger.updateConfig),
        getDisplayText: (text: string) => configStatus.getDisplayText(text),
      },
      session: {
        execute: sessionStatus.withUpdateStatus(messenger.updateSession),
        getDisplayText: (text: string) => sessionStatus.getDisplayText(text),
      },
      locale: {
        execute: localeStatus.withUpdateStatus(messenger.updateLocale),
        getDisplayText: (text: string) => localeStatus.getDisplayText(text),
      },
      context: {
        execute: contextStatus.withUpdateStatus(messenger.updateContext),
        getDisplayText: (text: string) => contextStatus.getDisplayText(text),
      },
      custom_stringset: {
        execute: customStringSetStatus.withUpdateStatus(messenger.customizeSpanishStringSet),
        getDisplayText: (text: string) => customStringSetStatus.getDisplayText(text, 'Spanish String Set Applied!'),
      },
      unsupported_language: {
        execute: unsupportedLanguageStatus.withUpdateStatus(messenger.switchToChineseLanguage),
        getDisplayText: (text: string) => unsupportedLanguageStatus.getDisplayText(text, 'Switched to Chinese!'),
      },
      switch_language_back: {
        execute: switchLanguageBackStatus.withUpdateStatus(messenger.customizeSpanishStringSet),
        getDisplayText: (text: string) => switchLanguageBackStatus.getDisplayText(text, 'Switched back to Spanish!'),
      },
      cleanup: {
        deauthenticate: {
          execute: deauthenticateStatus.withUpdateStatus(messenger.deauthenticate),
          getDisplayText: (text: string) => deauthenticateStatus.getDisplayText(text, 'Deauthenticated!'),
        },
        destroy: {
          execute: destroyStatus.withUpdateStatus(messenger.destroy),
          getDisplayText: (text: string) => destroyStatus.getDisplayText(text, 'Destroyed!'),
        },
      },
    }),
    [messenger],
  );
}
