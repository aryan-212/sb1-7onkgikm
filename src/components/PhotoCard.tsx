import React, { useState } from 'react';
import { Download, X } from 'lucide-react';

interface PhotoCardProps {
  photo: {
    id: string;
    url: string;
    fileName: string;
    timestamp: number;
  };
}

export const PhotoCard: React.FC<PhotoCardProps> = ({ photo }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = photo.url;
    link.download = photo.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formattedDate = new Date(photo.timestamp).toLocaleDateString();

  return (
    <>
      <div className="relative group">
        <img
          src={photo.url}
          alt={photo.fileName}
          className="w-full h-48 object-cover rounded-lg cursor-pointer transition-transform hover:scale-[1.02]"
          loading="lazy"
          onClick={() => setIsFullscreen(true)}
        />
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex justify-between items-center">
            <span className="truncate">{photo.fileName}</span>
            <Download
              className="w-5 h-5 cursor-pointer hover:text-blue-300"
              onClick={handleDownload}
            />
          </div>
          <div className="text-xs text-gray-300 mt-1">{formattedDate}</div>
        </div>
      </div>

      {isFullscreen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300"
            onClick={() => setIsFullscreen(false)}
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={photo.url}
            alt={photo.fileName}
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />
        </div>
      )}
    </>
  );
};