import { useState } from 'react';

type StatusKey = string;
type Status = 'idle' | 'updated';

interface UpdateStatusOptions {
  key: StatusKey;
}

export function useUpdateStatus({ key }: UpdateStatusOptions) {
  const [status, setStatus] = useState<Record<StatusKey, Status>>({
    [key]: 'idle',
  });

  const withUpdateStatus = <T extends (...args: any[]) => any>(fn: T) => {
    return async (...args: Parameters<T>) => {
      try {
        await fn(...args);
        setStatus((prev) => ({ ...prev, [key]: 'updated' }));

        setTimeout(() => {
          setStatus((prev) => ({ ...prev, [key]: 'idle' }));
        }, 2000);
      } catch (error) {
        setStatus((prev) => ({ ...prev, [key]: 'idle' }));
        throw error;
      }
    };
  };

  const getDisplayText = (originalText: string, updateText = 'Updated!') =>
    status[key] === 'updated' ? updateText : originalText;

  return { withUpdateStatus, getDisplayText };
}
