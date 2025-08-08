import { ReactNode } from 'react';

interface LayoutWrapperProps {
  leftPanel: ReactNode;
  rightPanel: ReactNode;
}

export function LayoutWrapper({ leftPanel, rightPanel }: LayoutWrapperProps) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[320px_1fr] gap-6">
      <div className="xl:w-80 xl:min-w-80">{leftPanel}</div>
      <div className="xl:flex-1 xl:min-w-0">{rightPanel}</div>
    </div>
  );
}
