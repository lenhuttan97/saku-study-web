import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Paper,
  Stack
} from '@mui/material';
import { Course } from '@/types';

interface CourseCreateFormData {
  name: string;
  code: string;
  credits: number;
  instructor: string;
  teacher?: string;
  description?: string;
  location?: string;
  color?: string;
}

interface CourseCreateFormProps {
  onSubmit: (data: CourseCreateFormData) => void;
  onCancel?: () => void;
  initialData?: Course; // Optional: if provided, form is in edit mode
}

const CourseCreateForm: React.FC<CourseCreateFormProps> = ({ onSubmit, onCancel, initialData }) => {
  const [formData, setFormData] = useState<CourseCreateFormData>({
    name: initialData?.name || initialData?.title || '',
    code: initialData?.code || '',
    credits: initialData?.credits || 3,
    instructor: initialData?.instructor || initialData?.teacher || '',
    description: initialData?.description || '',
    location: initialData?.location || '',
    color: initialData?.color || 'primary',
  });

  // Update form data when initialData changes (for edit mode)
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || initialData.title || '',
        code: initialData.code || '',
        credits: initialData.credits || 3,
        instructor: initialData.instructor || initialData.teacher || '',
        description: initialData.description || '',
        location: initialData.location || '',
        color: initialData.color || 'primary',
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'credits' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const isEditMode = !!initialData;

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h5" component="h2" gutterBottom>
        {isEditMode ? 'Update Course' : 'Create New Course'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            label="Course Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            variant="outlined"
          />

          <TextField
            fullWidth
            label="Course Code"
            name="code"
            value={formData.code}
            onChange={handleChange}
            required
            variant="outlined"
          />

          <TextField
            fullWidth
            label="Instructor"
            name="instructor"
            value={formData.instructor}
            onChange={handleChange}
            variant="outlined"
          />

          <TextField
            fullWidth
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            variant="outlined"
          />

          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            multiline
            rows={3}
            variant="outlined"
          />

          <FormControl fullWidth variant="outlined">
            <InputLabel>Credits</InputLabel>
            <Select
              name="credits"
              value={formData.credits}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                credits: typeof e.target.value === 'string' ? Number(e.target.value) : e.target.value
              }))}
              label="Credits"
            >
              {[1, 2, 3, 4, 5, 6].map(num => (
                <MenuItem key={num} value={num}>
                  {num} Credit{num > 1 ? 's' : ''}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth variant="outlined">
            <InputLabel>Color</InputLabel>
            <Select
              name="color"
              value={formData.color}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                color: e.target.value as string
              }))}
              label="Color"
            >
              <MenuItem value="primary">Purple</MenuItem>
              <MenuItem value="secondary">Pink</MenuItem>
              <MenuItem value="success">Green</MenuItem>
              <MenuItem value="warning">Orange</MenuItem>
              <MenuItem value="error">Red</MenuItem>
              <MenuItem value="info">Blue</MenuItem>
            </Select>
          </FormControl>

          <Stack direction="row" spacing={2} justifyContent="flex-end">
            {onCancel && (
              <Button onClick={onCancel} variant="outlined">
                Cancel
              </Button>
            )}
            <Button type="submit" variant="contained" color="primary">
              {isEditMode ? 'Update Course' : 'Create Course'}
            </Button>
          </Stack>
        </Stack>
      </form>
    </Paper>
  );
};

export default CourseCreateForm;