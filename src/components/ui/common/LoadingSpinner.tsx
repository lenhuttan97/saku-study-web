import { cn } from '@/lib/utils';
import { Button } from '../mui/Button';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
}

interface LoadingErrorProps {
  title?: string;
  message?: string;
  retryText?: string;
  onRetry?: () => void;
  className?: string;
}

const sizeClasses = {
  sm: 'h-6 w-6',
  md: 'h-10 w-10',
  lg: 'h-12 w-12',
};

export function LoadingSpinner({ size = 'md', text, className }: LoadingSpinnerProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center text-center', className)}>
      <div
        className={cn('animate-spin rounded-full border-b-2 border-brand-purple', sizeClasses[size])}
      />
      {text && <p className="mt-4 text-slate-500">{text}</p>}
    </div>
  );
}

export function LoadingError({
  title = 'Failed to load',
  message,
  retryText = 'Retry',
  onRetry,
  className,
}: LoadingErrorProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center text-center', className)}>
      <h2 className="text-2xl font-bold text-slate-900 mb-2">{title}</h2>
      {message && <p className="text-slate-500 mb-6">{message}</p>}
      {onRetry && <Button onClick={onRetry}>{retryText}</Button>}
    </div>
  );
}
