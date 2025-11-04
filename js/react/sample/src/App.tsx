// import 'prismjs/themes/prism-tomorrow.css';
import { useState } from 'react';

import '@sendbird/ai-agent-messenger-react/index.css';

import { CodeExamples } from './CodeExamples';
import { PlaygroundConfig } from './PlaygroundConfig';

function App() {
  const [activeTab, setActiveTab] = useState<'playground' | 'code'>('playground');

  // TODO: Highlight for ts|tsx doesn't work for now
  // useEffect(() => {
  //   const loadPrism = async () => {
  //     if (typeof window !== 'undefined') {
  //       try {
  //         const Prism = (await import('prismjs')).default;
  //         // @ts-ignore - Prism.js components don't have TypeScript declarations
  //         await import('prismjs/components/prism-tsx');
  //         // @ts-ignore - Prism.js components don't have TypeScript declarations
  //         await import('prismjs/components/prism-typescript');
  //         // @ts-ignore - Prism.js components don't have TypeScript declarations
  //         await import('prismjs/components/prism-javascript');
  //         // @ts-ignore - Prism.js components don't have TypeScript declarations
  //         await import('prismjs/components/prism-jsx');

  //         // Small delay to ensure DOM elements are ready
  //         setTimeout(() => {
  //           if (Prism && Prism.highlightAll) {
  //             Prism.highlightAll();
  //           }
  //         }, 100);
  //       } catch (error) {
  //         console.warn('Failed to load Prism.js:', error);
  //       }
  //     }
  //   };
  //   loadPrism();
  // }, [activeTab]);

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow-sm border-b flex-shrink-0">
        <div className="px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">React SDK Interactive Playground</h1>
              <p className="text-sm text-gray-600 mt-1">
                Learn how to integrate Delight AI Agent Messenger with React
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('playground')}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === 'playground' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Interactive Playground
              </button>
              <button
                onClick={() => setActiveTab('code')}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === 'code' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Code Examples
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-hidden">
        {activeTab === 'playground' ? <PlaygroundConfig /> : <CodeExamples />}
      </main>
    </div>
  );
}

export default App;
