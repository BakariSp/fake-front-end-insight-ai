import React from 'react';
import Image from 'next/image';
import styles from './Avatar.module.css';

export interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'small' | 'medium' | 'large';
  name?: string;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ 
  src, 
  alt = 'Avatar', 
  size = 'medium',
  name,
  className = '' 
}) => {
  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };
  
  const classNames = [
    styles.avatar,
    styles[size],
    className
  ].filter(Boolean).join(' ');
  
  return (
    <div className={classNames}>
      {src ? (
        <Image 
          src={src} 
          alt={alt}
          width={size === 'small' ? 32 : size === 'medium' ? 40 : 64}
          height={size === 'small' ? 32 : size === 'medium' ? 40 : 64}
          className={styles.image}
        />
      ) : name ? (
        <span>{getInitials(name)}</span>
      ) : (
        <svg className={styles.icon} fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
        </svg>
      )}
    </div>
  );
};

export default Avatar;

