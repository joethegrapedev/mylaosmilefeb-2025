// Image upload helpers for the admin CMS. Generalizes the mission-report
// upload pattern to arbitrary section images stored under `site-content/`.

import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from './config';

export const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];

export interface UploadedImage {
  url: string; // public download URL
  storagePath: string; // full path for later deletion
}

function sanitizeFileName(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]/g, '_');
}

/**
 * Upload an image file to Firebase Storage under `site-content/{section}/`.
 * Validates type and size before uploading.
 */
export async function uploadSiteImage(file: File, section: string): Promise<UploadedImage> {
  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    throw new Error('Unsupported image type. Use JPG, PNG, WEBP, GIF or SVG.');
  }
  if (file.size > MAX_IMAGE_BYTES) {
    throw new Error('Image is too large. Maximum size is 5MB.');
  }

  const storagePath = `site-content/${section}/${Date.now()}-${sanitizeFileName(file.name)}`;
  const storageRef = ref(storage, storagePath);
  const snapshot = await uploadBytes(storageRef, file);
  const url = await getDownloadURL(snapshot.ref);
  return { url, storagePath };
}

/** Delete a previously uploaded image by its storage path. Best-effort. */
export async function deleteSiteImage(storagePath: string): Promise<void> {
  try {
    await deleteObject(ref(storage, storagePath));
  } catch (error) {
    // Non-fatal: the image may already be gone or be an external URL.
    console.warn('[media] deleteSiteImage failed:', error);
  }
}
