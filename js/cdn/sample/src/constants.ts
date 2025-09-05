export { APP_CONFIG } from './config/appConfig';

export const LANGUAGES = [
  { code: 'en-US', label: 'English', countryCode: 'US' },
  { code: 'ko-KR', label: '한국어', countryCode: 'KR' },
  { code: 'ja-JP', label: '日본語', countryCode: 'JP' },
  { code: 'es-ES', label: 'Español', countryCode: 'ES' },
  { code: 'fr-FR', label: 'Français', countryCode: 'FR' },
];

export const CONTEXT_PRESETS = [
  { label: 'No Context', value: null },
  {
    label: 'Technical User',
    value: { userPreference: 'technical', customerTier: 'premium' } as Record<string, string>,
  },
  {
    label: 'Business User',
    value: { userPreference: 'business', customerTier: 'enterprise' } as Record<string, string>,
  },
  {
    label: 'Support Request',
    value: { userType: 'customer', issueType: 'technical_support', priority: 'high' } as Record<string, string>,
  },
];

export { CODE_EXAMPLES, generateCode } from './constants/codeSnippets';
