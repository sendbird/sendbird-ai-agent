import { TABS, type TabKey } from '@/constants/tabs';
import { useEffect, useState } from 'react';

const DEFAULT_TAB: TabKey = 'react';

const TAB_PATHS: Record<string, TabKey> = Object.fromEntries(
  Object.entries(TABS).map(([key, { path }]) => [path, key as TabKey]),
);

export function useTabNavigation() {
  const [activeTab, setActiveTab] = useState<TabKey>(DEFAULT_TAB);

  // Initialize tab from URL pathname
  useEffect(() => {
    const pathname = window.location.pathname;
    const matchingTabKey = TAB_PATHS[pathname];

    if (matchingTabKey) {
      setActiveTab(matchingTabKey);
    } else {
      // Default to defaultTab and set path if not present
      setActiveTab(DEFAULT_TAB);
      if (pathname === '/' || pathname === '') {
        window.history.replaceState(null, '', TABS[DEFAULT_TAB].path);
      }
    }
  }, []);

  // Listen for popstate events (back/forward navigation)
  useEffect(() => {
    const handlePopState = () => {
      const pathname = window.location.pathname;
      const tabKey = TAB_PATHS[pathname] || DEFAULT_TAB;
      setActiveTab(tabKey);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleTabChange = (tabKey: TabKey) => {
    setActiveTab(tabKey);
    window.history.pushState(null, '', TABS[tabKey].path);
  };

  return {
    activeTab,
    handleTabChange,
  };
}
