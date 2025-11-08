'use client';

import React, { useEffect } from 'react';
import styles from './NotificationToast.module.css';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface NotificationToastProps {
  id: string;
  type: ToastType;
  message: string;
  duration?: number; // in milliseconds
  onClose: (id: string) => void;
}

const NotificationToast: React.FC<NotificationToastProps> = ({
  id,
  type,
  message,
  duration = 3000,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  const icons = {
    success: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm-2 15l-5-5 1.41-1.41L8 12.17l7.59-7.59L17 6l-9 9z"
          fill="currentColor"
        />
      </svg>
    ),
    error: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm1 15H9v-2h2v2zm0-4H9V5h2v6z"
          fill="currentColor"
        />
      </svg>
    ),
    info: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm1 15H9v-6h2v6zm0-8H9V5h2v2z"
          fill="currentColor"
        />
      </svg>
    ),
    warning: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M1 17h18L10 1 1 17zm10-2H9v-2h2v2zm0-4H9V7h2v4z"
          fill="currentColor"
        />
      </svg>
    ),
  };

  return (
    <div className={`${styles.toast} ${styles[type]}`}>
      <div className={styles.icon}>{icons[type]}</div>
      <p className={styles.message}>{message}</p>
      <button className={styles.closeButton} onClick={() => onClose(id)} aria-label="Close">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
};

export default NotificationToast;

