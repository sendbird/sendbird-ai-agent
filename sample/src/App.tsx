import { AdvancedFeatures } from '@/components/sections/AdvancedFeatures';
import { GettingStarted } from '@/components/sections/GettingStarted';

export function App() {
  return (
    <div className="min-h-full">
      <header className="bg-white shadow">
        <h1 className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 text-3xl font-bold tracking-tight text-gray-900">
          AI Agent Messenger Quick Start
        </h1>
      </header>

      <main className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <div className="w-2/3 bg-white shadow sm:rounded-lg p-6 space-y-6">
          <GettingStarted />
          <AdvancedFeatures />
        </div>
      </main>
    </div>
  );
}
