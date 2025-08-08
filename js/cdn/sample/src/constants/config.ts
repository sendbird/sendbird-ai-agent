export const APP_ID = import.meta.env.VITE_NEW_APP_ID;
export const AI_AGENT_ID = import.meta.env.VITE_NEW_AI_AGENT_ID;
export const USER_ID = import.meta.env.VITE_NEW_USER_ID;
export const AUTH_TOKEN = import.meta.env.VITE_NEW_USER_AUTH_TOKEN;

// Language options
export const LANGUAGES = [
  { code: 'en-US', label: 'English', countryCode: 'US' },
  { code: 'ko-KR', label: '한국어', countryCode: 'KR' },
  { code: 'ja-JP', label: '日本語', countryCode: 'JP' },
  { code: 'es-ES', label: 'Español', countryCode: 'ES' },
  { code: 'fr-FR', label: 'Français', countryCode: 'FR' },
];

// Context presets
export const CONTEXT_PRESETS = {
  none: null,
  technical: { userPreference: 'technical', customerTier: 'premium' },
  business: { userPreference: 'business', customerTier: 'enterprise' },
  support: { userType: 'customer', issueType: 'technical_support', priority: 'high' },
};
