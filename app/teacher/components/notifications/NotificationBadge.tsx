'use client';

import React from 'react';
import styles from './NotificationBadge.module.css';

export type BadgeType = 'new' | 'updated' | 'invited' | 'urgent' | 'count';

interface NotificationBadgeProps {
  type: BadgeType;
  label?: string;
  count?: number;
  size?: 'small' | 'medium';
}

const NotificationBadge: React.FC<NotificationBadgeProps> = ({
  type,
  label,
  count,
  size = 'small',
}) => {
  const getLabel = () => {
    if (label) return label;
    if (type === 'count' && count !== undefined) {
      return count > 99 ? '99+' : count.toString();
    }
    switch (type) {
      case 'new':
        return 'NEW';
      case 'updated':
        return 'UPDATED';
      case 'invited':
        return 'INVITED';
      case 'urgent':
        return 'URGENT';
      default:
        return '';
    }
  };

  return (
    <span className={`${styles.badge} ${styles[type]} ${styles[size]}`}>
      {getLabel()}
    </span>
  );
};

// Blue Dot Badge - for sidebar navigation
export const BlueDotBadge: React.FC = () => {
  return <span className={styles.blueDot}></span>;
};

// Count Badge - for sidebar navigation
export const CountBadge: React.FC<{ count: number }> = ({ count }) => {
  const displayCount = count > 99 ? '99+' : count.toString();
  return <span className={styles.countBadge}>{displayCount}</span>;
};

export default NotificationBadge;

