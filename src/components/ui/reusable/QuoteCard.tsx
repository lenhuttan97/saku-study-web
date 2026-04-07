import React from 'react';
import { Quote } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuoteCardProps {
  quote: string;
  author: string;
  className?: string;
}

export const QuoteCard = ({ quote, author, className }: QuoteCardProps) => {
  return (
    <div className={cn("bg-brand-purple/5 rounded-3xl p-8 border border-brand-purple/10 card-shadow flex flex-col justify-center items-center text-center", className)}>
      <Quote size={32} className="text-brand-purple/20 mb-4" />
      <p className="text-lg font-medium italic text-slate-700 leading-relaxed">
        "{quote}"
      </p>
      <span className="mt-4 text-sm font-bold text-brand-purple">— {author}</span>
    </div>
  );
};