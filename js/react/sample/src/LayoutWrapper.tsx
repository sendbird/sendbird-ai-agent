import { ReactNode } from 'react';

interface LayoutWrapperProps {
  leftPanel: ReactNode;
  rightPanel: ReactNode;
}

export function LayoutWrapper({ leftPanel, rightPanel }: LayoutWrapperProps) {
  return (
    <div className="h-full grid grid-cols-1 xl:grid-cols-[400px_1fr] gap-6 p-6">
      <div className="xl:w-[400px] xl:min-w-[400px] overflow-y-auto">{leftPanel}</div>
      <div className="xl:flex-1 xl:min-w-0 overflow-y-auto">{rightPanel}</div>
    </div>
  );
}
