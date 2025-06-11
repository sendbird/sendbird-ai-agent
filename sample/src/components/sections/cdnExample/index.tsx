import { AdvancedFeatures } from './AdvancedFeatures';
import { GettingStarted } from './GettingStarted';

export const CdnExample = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="border-b border-gray-200 pb-6">
        <h2 className="text-2xl font-bold leading-6 text-gray-900">CDN Integration</h2>
        <p className="mb-6 mt-3 text-base text-gray-500">
          This example demonstrates how to integrate the AI Agent Messenger into your web application using the CDN
          script. This method requires no build process and works directly in any browser environment.
        </p>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <p className="text-sm text-amber-800">
            <strong>Note:</strong> CDN integration offers quick setup but has limited customization options compared to
            the React npm package. For advanced UI customization, component-level control, and TypeScript support,
            consider using the React integration method.
          </p>
        </div>
      </div>

      <GettingStarted />
      <AdvancedFeatures />
    </div>
  );
};
