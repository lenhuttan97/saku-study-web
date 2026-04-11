import { useState, useRef, ChangeEvent, DragEvent } from 'react';
import { Box, Typography, Button, List, ListItem, ListItemText, IconButton, LinearProgress, Alert, Chip } from '@mui/material';
import { Upload as UploadIcon, Download as DownloadIcon, Delete as DeleteIcon, Link as LinkIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { uploadFile, deleteFile as deleteFirebaseFile, validateFile } from '@/services/firebase/storageService';
import { useCourses } from '@/hooks/useCourses';
import type { Course, CourseMaterial } from '@/types/course';

interface MaterialsTabProps {
  course: Course;
  onMaterialsUpdate?: (materials: CourseMaterial[]) => void;
}

export function MaterialsTab({ course, onMaterialsUpdate }: MaterialsTabProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { updateCourse } = useCourses();

  const handleFileSelect = async (file: File) => {
    if (!file) return;

    // Validate file
    const validation = validateFile(file);
    if (!validation.isValid) {
      setError(validation.error || 'Invalid file');
      return;
    }

    setError(null);
    setUploading(true);
    setUploadProgress(0);

    try {
      // Upload the file to Firebase Storage
      const newMaterial = await uploadFile(file, course.id);

      // Update course with the new material
      const updatedMaterials = [...course.materials, newMaterial];
      await updateCourse(course.id, { materials: updatedMaterials });

      // Call the callback if provided
      if (onMaterialsUpdate) {
        onMaterialsUpdate(updatedMaterials);
      }

      // Reset upload state after a delay
      setTimeout(() => {
        setUploading(false);
        setUploadProgress(null);
      }, 500);
    } catch (err) {
      console.error('Error uploading file:', err);
      setError(err instanceof Error ? err.message : 'Failed to upload file');
      setUploading(false);
      setUploadProgress(null);
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      handleFileSelect(files[0]);
    }
  };

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleDeleteFile = async (materialId: string) => {
    try {
      // Find the material to delete
      const materialToDelete = course.materials.find(m => m.id === materialId);
      if (!materialToDelete) return;

      // Extract the file name from the material ID
      // Since we use the file name as the ID in the storage service, we can use it directly
      await deleteFirebaseFile(course.id, materialId);

      // Remove from materials list
      const updatedMaterials = course.materials.filter(m => m.id !== materialId);
      await updateCourse(course.id, { materials: updatedMaterials });

      // Call the callback if provided
      if (onMaterialsUpdate) {
        onMaterialsUpdate(updatedMaterials);
      }
    } catch (err) {
      console.error('Error deleting file:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete file');
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" gutterBottom>
          Course Materials
        </Typography>

        {/* Upload Section */}
        <Box
          sx={{
            border: '2px dashed',
            borderColor: dragActive ? 'primary.main' : 'divider',
            borderRadius: 2,
            p: 4,
            textAlign: 'center',
            mb: 3,
            backgroundColor: dragActive ? 'action.hover' : 'background.paper',
            transition: 'all 0.3s ease',
          }}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: 'none' }}
            accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt,.csv,.jpg,.jpeg,.png,.gif,.webp"
          />

          <UploadIcon sx={{ fontSize: 48, mb: 2, color: 'action.active' }} />

          <Typography variant="body1" gutterBottom>
            Drag & drop files here, or{' '}
            <Button
              variant="text"
              color="primary"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
            >
              browse files
            </Button>
          </Typography>

          <Typography variant="caption" color="text.secondary">
            Supported formats: PDF, DOC, DOCX, PPT, PPTX, XLS, XLSX, TXT, CSV, JPEG, PNG, GIF, WEBP
            <br />
            Max file size: 50MB
          </Typography>

          {uploading && uploadProgress !== null && (
            <Box sx={{ width: '100%', mt: 2 }}>
              <LinearProgress variant="determinate" value={uploadProgress} />
              <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
                Uploading... {Math.round(uploadProgress)}%
              </Typography>
            </Box>
          )}

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
        </Box>

        {/* Materials List */}
        {course.materials.length > 0 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Uploaded Materials ({course.materials.length})
            </Typography>
            <List>
              {course.materials.map((material) => (
                <ListItem
                  key={material.id}
                  sx={{
                    border: 1,
                    borderColor: 'divider',
                    borderRadius: 1,
                    mb: 1,
                    alignItems: 'center',
                  }}
                >
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LinkIcon sx={{ fontSize: 20, mr: 1, color: 'primary.main' }} />
                        {material.fileName}
                      </Box>
                    }
                    secondary={
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                        <span>Type: {material.fileType || 'Unknown'}</span>
                        <span>Size: {formatFileSize(material.size || 0)}</span>
                        <span>Uploaded: {new Date(material.uploadedAt).toLocaleDateString()}</span>
                      </Box>
                    }
                  />
                  <Chip
                    label={material.fileType?.split('/')[0]?.toUpperCase() || 'FILE'}
                    size="small"
                    sx={{ mr: 2 }}
                  />
                  <IconButton
                    edge="end"
                    aria-label="download"
                    href={material.url}
                    target="_blank"
                    download
                  >
                    <DownloadIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDeleteFile(material.id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          </Box>
        )}

        {course.materials.length === 0 && !uploading && (
          <Typography variant="body2" color="text.secondary" align="center" sx={{ py: 4 }}>
            No materials uploaded yet. Drag and drop files or click the button above to upload.
          </Typography>
        )}
      </Box>
    </motion.div>
  );
}