import axios from 'axios';
import { blobToBase64 } from '../utils/fileUtils';
import { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } from '../utils/constants';

const API_BASE = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;

export class TelegramService {
  async uploadPhoto(encryptedData: string, fileName: string) {
    try {
      const formData = new FormData();
      const blob = new Blob([encryptedData], { type: 'application/octet-stream' });
      formData.append('document', blob, fileName);
      formData.append('chat_id', TELEGRAM_CHAT_ID);
      
      await axios.post(`${API_BASE}/sendDocument`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (error) {
      console.error('Failed to upload file:', error);
      throw new Error('Failed to upload file to Telegram');
    }
  }

  async getPhotos() {
    try {
      const response = await axios.get(`${API_BASE}/getUpdates`, {
        params: {
          chat_id: TELEGRAM_CHAT_ID,
          limit: 100,
        },
      });

      return response.data.result
        .filter((update: any) => update.message?.document)
        .map((update: any) => ({
          id: update.message.message_id.toString(),
          fileId: update.message.document.file_id,
          fileName: update.message.document.file_name,
        }));
    } catch (error) {
      console.error('Failed to fetch photos:', error);
      throw new Error('Failed to fetch photos from Telegram');
    }
  }

  async getFileUrl(fileId: string): Promise<string> {
    try {
      const response = await axios.get(`${API_BASE}/getFile`, {
        params: { file_id: fileId },
      });
      
      const filePath = response.data.result.file_path;
      return `https://api.telegram.org/file/bot${TELEGRAM_BOT_TOKEN}/${filePath}`;
    } catch (error) {
      console.error('Failed to get file URL:', error);
      throw new Error('Failed to get file URL from Telegram');
    }
  }
}