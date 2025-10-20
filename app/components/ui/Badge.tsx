import React from 'react';
import styles from './Badge.module.css';

export type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'primary' | 'secondary';
export type BadgeSize = 'small' | 'medium' | 'large';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  className = '' 
}) => {
  const classNames = [
    styles.badge,
    styles[variant],
    size !== 'medium' && styles[size],
    className
  ].filter(Boolean).join(' ');
  
  return (
    <span className={classNames}>
      {children}
    </span>
  );
};

export default Badge;

