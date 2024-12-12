import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import { usePhotoStore } from '../store/photoStore';
import { SUPPORTED_IMAGE_TYPES } from '../utils/constants';

export const PhotoUploader: React.FC = () => {
  const { uploadPhoto, loading } = usePhotoStore();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    for (const file of acceptedFiles) {
      await uploadPhoto(file);
    }
  }, [uploadPhoto]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: SUPPORTED_IMAGE_TYPES,
    maxSize: 5 * 1024 * 1024, // 5MB limit
  });

  return (
    <div
      {...getRootProps()}
      className={`p-8 border-2 border-dashed rounded-lg text-center cursor-pointer
        ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
    >
      <input {...getInputProps()} />
      <Upload className="mx-auto h-12 w-12 text-gray-400" />
      <p className="mt-2 text-sm text-gray-600">
        {loading ? 'Uploading...' : 'Drop photos here or click to select'}
      </p>
      <p className="mt-1 text-xs text-gray-500">
        Maximum file size: 5MB
      </p>
    </div>
  );
};