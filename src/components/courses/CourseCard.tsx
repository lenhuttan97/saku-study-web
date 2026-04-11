import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { BookOpen, MapPin, User, MoreVertical, Edit3, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui';
import { useTheme } from '@mui/material/styles';
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';

import type { Course } from '@/types';

interface CourseCardProps {
  course: Course;
  idx?: number;
  onEditClick?: (course: Course) => void; // New prop for edit functionality
  onDeleteClick?: (course: Course) => void; // New prop for delete functionality
}

export const CourseCard = ({ course, idx = 0, onEditClick, onDeleteClick }: CourseCardProps) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handleClose();
    if (onEditClick) {
      onEditClick(course);
    }
  };

  const handleDelete = () => {
    handleClose();
    if (onDeleteClick) {
      onDeleteClick(course);
    }
  };

  // Map color identifier to actual hex color from theme
  const getColorFromTheme = (colorIdentifier: string) => {
    switch (colorIdentifier) {
      case 'primary':
        return theme.palette.primary.main;
      case 'secondary':
        return theme.palette.secondary.main;
      case 'success':
        return theme.palette.success.main;
      case 'warning':
        return theme.palette.warning.main;
      case 'error':
        return theme.palette.error.main;
      case 'info':
        return theme.palette.info.main;
      default:
        // If it's already a hex value, return as is
        if (colorIdentifier.startsWith('#')) {
          return colorIdentifier;
        }
        // Default to primary if unknown identifier
        return theme.palette.primary.main;
    }
  };

  const actualColor = getColorFromTheme(course.color);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: idx * 0.1 }}
    >
      <Card hoverable elevation="medium" className="p-6">
        <Link to={`/courses/${course.id}`} className="block space-y-4">
          <div className="flex items-start justify-between">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg"
              style={{ backgroundColor: actualColor }}
            >
              <BookOpen size={24} />
            </div>
            <IconButton
              onClick={handleClick}
              className="p-2 text-slate-300 hover:text-slate-600 transition-colors"
              aria-label="course options"
              aria-controls={open ? 'course-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <MoreVertical size={20} />
            </IconButton>
          </div>

          <div>
            <h3 className="text-xl font-bold text-slate-800 group-hover:text-brand-purple transition-colors">{course.name || course.title}</h3>
            <p className="text-slate-500 text-sm mt-1 line-clamp-2">{course.description || `${course.code} course`}</p>
          </div>

          <div className="pt-4 border-t border-slate-50 space-y-3">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <User size={16} className="text-slate-400" />
              <span>{course.teacher || course.instructor}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <MapPin size={16} className="text-slate-400" />
              <span>{course.location || 'TBD'}</span>
            </div>
          </div>

          <div className="pt-4">
            <div className="flex justify-between text-xs font-bold text-slate-500 mb-2">
              <span>Progress</span>
              <span>{course.progress ?? 0}%</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${course.progress ?? 0}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full rounded-full"
                style={{ backgroundColor: actualColor }}
              ></motion.div>
            </div>
          </div>
        </Link>

        {/* Options Menu */}
        <Menu
          id="course-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          onClick={(e) => e.stopPropagation()}
          PaperProps={{
            elevation: 3,
            style: {
              transform: 'translateY(10px)',
            },
          }}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
          disableScrollLock
        >
          <MenuItem onClick={handleEdit}>
            <ListItemIcon>
              <Edit3 fontSize="small" />
            </ListItemIcon>
            <ListItemText>Edit Course</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleDelete}>
            <ListItemIcon>
              <Trash2 fontSize="small" />
            </ListItemIcon>
            <ListItemText>Delete Course</ListItemText>
          </MenuItem>
        </Menu>
      </Card>
    </motion.div>
  );
};