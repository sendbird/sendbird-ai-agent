import { PlaygroundState } from './usePlaygroundState';

interface RuntimeUpdatesLogProps {
  runtimeUpdates: PlaygroundState['runtimeUpdates'];
}

export function RuntimeUpdatesLog({ runtimeUpdates }: RuntimeUpdatesLogProps) {
  if (runtimeUpdates.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">Runtime Context Updates Log</h3>
      <div className="space-y-2 max-h-48 overflow-y-auto">
        {runtimeUpdates.map((update, index) => (
          <div key={index} className="text-xs">
            <div className="text-gray-600">{new Date(update.time).toLocaleTimeString()}</div>
            <pre className="bg-gray-50 p-2 rounded mt-1 overflow-x-auto">{JSON.stringify(update.context, null, 2)}</pre>
          </div>
        ))}
      </div>
    </div>
  );
}
