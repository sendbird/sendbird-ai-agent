export const TABS = {
  react: {
    label: 'React (npm)',
    path: '/react-example',
  },
  cdn: {
    label: 'CDN',
    path: '/cdn-example',
  },
} as const;

export type TabKey = keyof typeof TABS;
