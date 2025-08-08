interface HeaderProps {
  activeTab: 'playground' | 'code';
  onTabChange: (tab: 'playground' | 'code') => void;
}

export default function Header({ activeTab, onTabChange }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">React SDK Interactive Playground</h1>
            <p className="text-sm text-gray-600 mt-1">Learn how to integrate Sendbird AI Agent Messenger with React</p>
          </div>

          {/* Tab Switcher */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => onTabChange('playground')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'playground' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Interactive Playground
            </button>
            <button
              onClick={() => onTabChange('code')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'code' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Code Examples
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
