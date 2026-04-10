import React from 'react';
import { FileText, Download, ExternalLink } from 'lucide-react';
import { Button, Card } from '@/components/ui';

export interface CourseMaterial {
  id: string;
  courseId: string;
  title: string;
  description?: string;
  type: 'video' | 'document' | 'link' | 'assignment';
  url?: string;
  duration?: number; // in minutes
  completed: boolean;
  order: number;
}

interface MaterialItemProps {
  name: string;
  size: string;
  date: string;
  onDownload?: () => void;
  onPreview?: () => void;
}

export const MaterialItem = ({ name, size, date, onDownload, onPreview }: MaterialItemProps) => {
  return (
    <Card elevation="low" className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-brand-purple shadow-sm">
          <FileText size={24} />
        </div>
        <div>
          <h4 className="font-bold text-slate-800">{name}</h4>
          <p className="text-xs text-slate-500">{size} • Uploaded {date}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="small" onClick={onDownload}>
          <Download size={20} />
        </Button>
        <Button variant="ghost" size="small" onClick={onPreview}>
          <ExternalLink size={20} />
        </Button>
      </div>
    </Card>
  );
};