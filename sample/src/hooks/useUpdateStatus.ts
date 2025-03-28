import { useCallback, useState } from 'react';

export function useUpdateStatus() {
  const [isUpdated, setIsUpdated] = useState(false);

  const withUpdateStatus = useCallback((handler: () => void | Promise<void>) => {
    return async () => {
      try {
        await handler();
        setIsUpdated(true);
        setTimeout(() => {
          setIsUpdated(false);
        }, 2000);
      } catch (error) {
        console.error('Update failed:', error);
      }
    };
  }, []);

  return { isUpdated, withUpdateStatus };
}
