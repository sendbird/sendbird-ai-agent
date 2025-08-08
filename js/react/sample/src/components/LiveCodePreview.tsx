interface LiveCodePreviewProps {
  code: string;
  copyFeedback: boolean;
  onCopy: () => void;
}

export default function LiveCodePreview({ code, copyFeedback, onCopy }: LiveCodePreviewProps) {
  return (
    <div>
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-900">Live Preview</h3>
      </div>

      <div className="bg-gray-900 rounded-lg shadow mb-4 overflow-hidden">
        <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
          <span className="text-xs text-gray-400">App.tsx - Live code based on your configuration</span>
          <button onClick={onCopy} className="text-xs text-gray-400 hover:text-white transition-colors">
            {copyFeedback ? 'Copied!' : 'Copy Code'}
          </button>
        </div>
        <pre className="p-4 text-xs text-gray-300 overflow-x-auto">
          <code className="language-tsx">{code}</code>
        </pre>
      </div>

      {/* Info Panel */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
        <h4 className="text-sm font-semibold text-blue-900 mb-2">How to Use</h4>
        <ul className="space-y-1 text-xs text-blue-800">
          <li>• Toggle settings on the left to see how props affect the component</li>
          <li>• The code above updates in real-time based on your configuration</li>
          <li>• Click the messenger launcher (bottom-right) to interact with the AI agent</li>
          <li>• Enable Runtime Updates to test patchContext API without resetting</li>
        </ul>
      </div>
    </div>
  );
}
