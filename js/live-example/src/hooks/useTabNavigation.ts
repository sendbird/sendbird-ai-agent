import { TABS, type TabKey } from '@/constants/tabs';
import { useEffect, useState } from 'react';

const DEFAULT_TAB: TabKey = 'react';

export function useTabNavigation() {
  const [activeTab, setActiveTab] = useState<TabKey>(DEFAULT_TAB);

  // Initialize tab from URL pathname
  useEffect(() => {
    const pathname = window.location.pathname;
    const matchingTabKey = Object.keys(TABS).find((key) => TABS[key as TabKey].path === pathname) as TabKey | undefined;

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
      const matchingTabKey = Object.keys(TABS).find((key) => TABS[key as TabKey].path === pathname) as
        | TabKey
        | undefined;

      if (matchingTabKey) {
        setActiveTab(matchingTabKey);
      } else {
        setActiveTab(DEFAULT_TAB);
      }
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
