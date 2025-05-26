import { CdnExample } from '@/components/sections/cdnExample/index';
import { ReactExample } from '@/components/sections/reactExample';
import { useState } from 'react';

const TABS = [
  { key: 'react', label: 'React (npm)' },
  { key: 'cdn', label: 'CDN' },
] as const;

type TabKey = (typeof TABS)[number]['key'];

export function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('react');

  return (
    <div className="min-h-full">
      <header className="bg-white shadow">
        <h1 className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 text-3xl font-bold tracking-tight text-gray-900">
          Sendbird AI Agent Messenger Live Example
        </h1>
      </header>

      <main className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {TABS.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === key
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content - Add key prop to ensure proper unmounting */}
        <div className="bg-white shadow sm:rounded-lg">
          {activeTab === 'react' && <ReactExample key="react-tab" />}
          {activeTab === 'cdn' && <CdnExample key="cdn-tab" />}
        </div>
      </main>
    </div>
  );
}
