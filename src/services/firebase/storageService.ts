import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  getMetadata
} from 'firebase/storage';
import { storage } from './config';
import type { CourseMaterial } from '@/types/course';

/**
 * Upload a file to Firebase Storage
 * @param file - File object to upload
 * @param courseId - Course ID to associate with the file
 * @param folder - Optional folder path (default: 'course-materials')
 * @returns CourseMaterial object with file information
 */
export async function uploadFile(
  file: File,
  courseId: string,
  folder: string = 'course-materials'
): Promise<CourseMaterial> {
  // Validate file type and size
  const maxSize = 50 * 1024 * 1024; // 50MB limit
  if (file.size > maxSize) {
    throw new Error('File size exceeds 50MB limit');
  }

  // Create a reference to the file in Firebase Storage
  const fileExtension = file.name.split('.').pop()?.toLowerCase() || '';
  const fileName = `${Date.now()}_${courseId}_${file.name}`;
  const storagePath = `${folder}/${courseId}/${fileName}`;
  const fileRef = ref(storage, storagePath);

  try {
    // Upload the file
    const snapshot = await uploadBytes(fileRef, file);

    // Get the download URL
    const downloadUrl = await getDownloadURL(snapshot.ref);

    // Get file metadata
    const metadata = await getMetadata(snapshot.ref);

    // Create and return CourseMaterial object
    const material: CourseMaterial = {
      id: snapshot.ref.name, // Use the file name as ID
      courseId,
      title: file.name,
      url: downloadUrl,
      fileName: file.name,
      fileType: file.type,
      uploadedAt: new Date(metadata.timeCreated),
      size: file.size,
    };

    return material;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}

/**
 * Delete a file from Firebase Storage
 * @param courseId - Course ID associated with the file
 * @param fileId - File ID (name) to delete
 * @param folder - Optional folder path (default: 'course-materials')
 */
export async function deleteFile(
  courseId: string,
  fileId: string,
  folder: string = 'course-materials'
): Promise<void> {
  try {
    const storagePath = `${folder}/${courseId}/${fileId}`;
    const fileRef = ref(storage, storagePath);

    await deleteObject(fileRef);
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
}

/**
 * Get download URL for a file
 * @param courseId - Course ID associated with the file
 * @param fileId - File ID (name) to get URL for
 * @param folder - Optional folder path (default: 'course-materials')
 * @returns Download URL for the file
 */
export async function getFileUrl(
  courseId: string,
  fileId: string,
  folder: string = 'course-materials'
): Promise<string> {
  try {
    const storagePath = `${folder}/${courseId}/${fileId}`;
    const fileRef = ref(storage, storagePath);

    const downloadUrl = await getDownloadURL(fileRef);
    return downloadUrl;
  } catch (error) {
    console.error('Error getting file URL:', error);
    throw error;
  }
}

/**
 * Validate file type and size
 * @param file - File object to validate
 * @returns Boolean indicating if file is valid
 */
export function validateFile(file: File): { isValid: boolean; error?: string } {
  // File type validation (allow common document types)
  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'text/plain',
    'text/csv',
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp'
  ];

  const maxSize = 50 * 1024 * 1024; // 50MB

  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: 'File type not supported. Allowed types: PDF, DOC, DOCX, PPT, PPTX, XLS, XLSX, TXT, CSV, JPEG, PNG, GIF, WEBP'
    };
  }

  if (file.size > maxSize) {
    return {
      isValid: false,
      error: 'File size exceeds 50MB limit'
    };
  }

  return { isValid: true };
}