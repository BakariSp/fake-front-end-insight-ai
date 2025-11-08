'use client';

import React from 'react';
import NotificationToast, { ToastType } from './NotificationToast';
import styles from './ToastContainer.module.css';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

interface ToastContainerProps {
  toasts: Toast[];
  onRemove: (id: string) => void;
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onRemove }) => {
  return (
    <div className={styles.container}>
      {toasts.map((toast) => (
        <NotificationToast
          key={toast.id}
          id={toast.id}
          type={toast.type}
          message={toast.message}
          duration={toast.duration}
          onClose={onRemove}
        />
      ))}
    </div>
  );
};

export default ToastContainer;

