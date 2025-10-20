import React from 'react';
import styles from './Card.module.css';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'small' | 'medium' | 'large';
  hover?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  padding = 'medium',
  hover = false,
  onClick,
  style
}) => {
  const classNames = [
    styles.card,
    styles[`padding-${padding}`],
    hover && styles.hover,
    onClick && styles.clickable,
    className
  ].filter(Boolean).join(' ');
  
  return (
    <div 
      className={classNames}
      onClick={onClick}
      style={style}
    >
      {children}
    </div>
  );
};

export default Card;

