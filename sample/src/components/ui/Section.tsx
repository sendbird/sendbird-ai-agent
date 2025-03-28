import { ReactNode, useState } from 'react';

interface Props {
  title?: string;
  titleClassName?: string;
  description?: string;
  descriptionClassName?: string;
  children: ReactNode;
}

export function Section({ title, titleClassName, description, descriptionClassName, children }: Props) {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const sectionId = title?.toLowerCase().replace(/\s+/g, '-') ?? '';

  const handleAnchorClick = () => {
    // Add hash to the current URL
    window.history.pushState({}, '', `#${sectionId}`);
  };

  return (
    <div className="space-y-4" id={sectionId}>
      {title && (
        <div
          className={`flex items-center cursor-pointer ${titleClassName}`}
          onClick={handleAnchorClick}
          onMouseOver={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <h3 className="text-lg font-medium leading-6 text-gray-900">{title}</h3>
          {isHovered && (
            <a
              href={`#${sectionId}`}
              className="ml-2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label={`Move to ${title} section`}
            >
              <span className="text-md">#</span>
            </a>
          )}
        </div>
      )}
      {description && <p className={`mt-2 text-sm text-gray-500 ${descriptionClassName}`}>{description}</p>}
      {children}
    </div>
  );
}
