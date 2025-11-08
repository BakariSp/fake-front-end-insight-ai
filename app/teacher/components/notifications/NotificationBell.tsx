'use client';

import React from 'react';
import styles from './NotificationBell.module.css';

interface NotificationBellProps {
  count: number;
  onClick: () => void;
}

const NotificationBell: React.FC<NotificationBellProps> = ({ count, onClick }) => {
  const hasUnread = count > 0;
  const displayCount = count > 9 ? '9+' : count.toString();

  return (
    <button className={styles.bellButton} onClick={onClick} aria-label="Notifications">
      <div className={styles.bellIcon}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {hasUnread && (
          <>
            <span className={styles.redDot}></span>
            <span className={styles.count}>{displayCount}</span>
          </>
        )}
      </div>
    </button>
  );
};

export default NotificationBell;

