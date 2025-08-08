import { useEffect } from 'react';

interface UsePrismHighlightingProps {
  dependencies: any[];
}

export function usePrismHighlighting({ dependencies }: UsePrismHighlightingProps) {
  // Trigger syntax highlighting when dependencies change
  useEffect(() => {
    const loadPrism = async () => {
      if (typeof window !== 'undefined') {
        try {
          const Prism = (await import('prismjs')).default;
          await import('prismjs/components/prism-tsx' as any);
          Prism.highlightAll();
        } catch (error) {
          console.warn('Failed to load Prism.js:', error);
        }
      }
    };

    loadPrism();
  }, dependencies);

  // Initialize code examples when switching to code tab
  useEffect(() => {
    const activeTab = dependencies.find((dep) => dep === 'playground' || dep === 'code');

    if (activeTab === 'code') {
      // Small delay to ensure DOM is updated
      setTimeout(async () => {
        if (typeof window !== 'undefined') {
          try {
            const Prism = (await import('prismjs')).default;
            await import('prismjs/components/prism-tsx' as any);
            Prism.highlightAll();
          } catch (error) {
            console.warn('Failed to load Prism.js:', error);
          }
        }
      }, 100);
    }
  }, dependencies);
}
