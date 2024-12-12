import React from 'react';
import { usePhotos } from '../hooks/usePhotos';
import { PhotoCard } from './PhotoCard';
import { RefreshCw } from 'lucide-react';

export const PhotoGrid: React.FC = () => {
  const { photos, loading } = usePhotos();

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-gray-900">Your Photos</h2>
        {loading && (
          <RefreshCw className="w-5 h-5 text-blue-500 animate-spin" />
        )}
      </div>

      {photos.length === 0 && !loading ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No photos uploaded yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((photo) => (
            <PhotoCard key={photo.id} photo={photo} />
          ))}
        </div>
      )}
    </div>
  );
};