import CryptoJS from 'crypto-js';
import { ENCRYPTION_KEY } from '../utils/constants';
import { blobToBase64, base64ToBlob } from '../utils/fileUtils';

export const encryptImage = async (file: File): Promise<string> => {
  try {
    const base64 = await blobToBase64(file);
    const encrypted = CryptoJS.AES.encrypt(base64, ENCRYPTION_KEY).toString();
    return encrypted;
  } catch (error) {
    console.error('Encryption failed:', error);
    throw new Error('Failed to encrypt image');
  }
};

export const decryptImage = (encryptedData: string): string => {
  try {
    const decrypted = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
    const base64 = decrypted.toString(CryptoJS.enc.Utf8);
    return `data:image/jpeg;base64,${base64}`;
  } catch (error) {
    console.error('Decryption failed:', error);
    throw new Error('Failed to decrypt image');
  }
};