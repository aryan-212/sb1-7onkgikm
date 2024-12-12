import create from 'zustand';
import { TelegramService } from '../lib/telegram';
import { encryptImage, decryptImage } from '../lib/encryption';
import axios from 'axios';

interface Photo {
  id: string;
  url: string;
  fileName: string;
  timestamp: number;
}

interface PhotoStore {
  photos: Photo[];
  loading: boolean;
  lastUpdate: number;
  uploadPhoto: (file: File) => Promise<void>;
  fetchPhotos: () => Promise<void>;
}

const telegram = new TelegramService();

export const usePhotoStore = create<PhotoStore>((set, get) => ({
  photos: [],
  loading: false,
  lastUpdate: 0,

  uploadPhoto: async (file) => {
    set({ loading: true });
    try {
      const encryptedData = await encryptImage(file);
      await telegram.uploadPhoto(encryptedData, file.name);
      await get().fetchPhotos();
    } catch (error) {
      console.error('Upload failed:', error);
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  fetchPhotos: async () => {
    const currentState = get();
    
    try {
      const telegramPhotos = await telegram.getPhotos();
      
      // Only process new or updated photos
      const newPhotos = telegramPhotos.filter(photo => 
        !currentState.photos.find(p => p.id === photo.id)
      );

      if (newPhotos.length === 0) {
        return; // No new photos to process
      }

      set({ loading: true });

      const processedPhotos = await Promise.all(
        newPhotos.map(async (photo) => {
          const fileUrl = await telegram.getFileUrl(photo.fileId);
          const response = await axios.get(fileUrl, { responseType: 'text' });
          const decryptedUrl = decryptImage(response.data);
          
          return {
            id: photo.id,
            url: decryptedUrl,
            fileName: photo.fileName,
            timestamp: Date.now()
          };
        })
      );

      set(state => ({
        photos: [...processedPhotos, ...state.photos].sort((a, b) => b.timestamp - a.timestamp),
        lastUpdate: Date.now()
      }));
    } catch (error) {
      console.error('Fetch failed:', error);
      throw error;
    } finally {
      set({ loading: false });
    }
  },
}));