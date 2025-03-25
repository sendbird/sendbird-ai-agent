import { ReactNode } from 'react';

interface Props {
  title: string;
  titleClassName?: string;
  description?: string;
  descriptionClassName?: string;
  children: ReactNode;
}

export function Section({ title, titleClassName, description, descriptionClassName, children }: Props) {
  return (
    <div className="space-y-4">
      <h3 className={`text-lg font-medium leading-6 text-gray-900 ${titleClassName}`}>{title}</h3>
      {description && <p className={`mt-2 text-sm text-gray-500 ${descriptionClassName}`}>{description}</p>}
      {children}
    </div>
  );
}
