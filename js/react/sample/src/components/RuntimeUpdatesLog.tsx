interface RuntimeUpdate {
  time: string;
  context: any;
}

interface RuntimeUpdatesLogProps {
  updates: RuntimeUpdate[];
}

export default function RuntimeUpdatesLog({ updates }: RuntimeUpdatesLogProps) {
  if (updates.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">Runtime Updates Log</h3>
      <div className="space-y-2 max-h-48 overflow-y-auto">
        {updates.map((update, idx) => (
          <div key={idx} className="p-2 bg-gray-50 rounded text-xs">
            <div className="text-gray-500 mb-1">{new Date(update.time).toLocaleTimeString()}</div>
            <pre className="text-gray-700 overflow-x-auto">{JSON.stringify(update.context, null, 2)}</pre>
          </div>
        ))}
      </div>
    </div>
  );
}
