import React from 'react';

export interface ProgressProps {
  percent: number;
  showText?: boolean;
  color?: string;
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

const Progress: React.FC<ProgressProps> = ({
  percent,
  showText = true,
  color,
  className = '',
  size = 'medium',
}) => {
  const sizeStyles = {
    small: 'h-1',
    medium: 'h-2',
    large: 'h-3',
  };

  const getColor = () => {
    if (color) return color;
    if (percent >= 80) return 'from-green-400 to-green-500';
    if (percent >= 60) return 'from-blue-400 to-blue-500';
    if (percent >= 40) return 'from-yellow-400 to-yellow-500';
    return 'from-red-400 to-red-500';
  };

  return (
    <div className={`w-full ${className}`}>
      <div className={`w-full bg-[var(--gray-100)] rounded-full overflow-hidden ${sizeStyles[size]}`}>
        <div
          className={`h-full bg-gradient-to-r ${getColor()} rounded-full transition-all duration-300`}
          style={{ width: `${Math.min(100, Math.max(0, percent))}%` }}
        />
      </div>
      {showText && (
        <div className="mt-1 text-xs text-[var(--gray-700)] text-right">
          {percent.toFixed(0)}%
        </div>
      )}
    </div>
  );
};

export default Progress;

