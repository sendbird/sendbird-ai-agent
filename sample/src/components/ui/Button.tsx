import { ButtonHTMLAttributes } from 'react';

export function Button({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`inline-flex items-center rounded-md bg-primary px-3 py-2 text-sm text-white shadow-sm hover:bg-primary-hover ${props.className}`}
    >
      {children}
    </button>
  );
}
