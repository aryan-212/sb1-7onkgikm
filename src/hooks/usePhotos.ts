import { useEffect, useRef } from 'react';
import { usePhotoStore } from '../store/photoStore';

const POLLING_INTERVAL = 10000; // Poll every 10 seconds

export const usePhotos = () => {
  const { photos, loading, fetchPhotos } = usePhotoStore();
  const pollingRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    // Initial fetch
    fetchPhotos();

    // Set up polling
    pollingRef.current = setInterval(() => {
      fetchPhotos();
    }, POLLING_INTERVAL);

    // Cleanup
    return () => {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
      }
    };
  }, []);

  return { photos, loading };
};