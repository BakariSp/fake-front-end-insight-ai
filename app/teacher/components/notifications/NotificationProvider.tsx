'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Notification, NotificationStatus, NotificationModule } from './types';
import { mockNotifications } from './mockData';
import ToastContainer, { Toast } from './ToastContainer';
import { ToastType } from './NotificationToast';

interface NotificationContextType {
  notifications: Notification[];
  toasts: Toast[];
  isNotificationCenterOpen: boolean;
  unreadCount: number;
  openNotificationCenter: () => void;
  closeNotificationCenter: () => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  changeNotificationStatus: (id: string, status: NotificationStatus) => void;
  muteCategory: (module: NotificationModule) => void;
  showToast: (type: ToastType, message: string, duration?: number) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'isRead' | 'status'>) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [isNotificationCenterOpen, setIsNotificationCenterOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.isRead && n.status === 'inbox').length;

  const openNotificationCenter = useCallback(() => {
    setIsNotificationCenterOpen(true);
  }, []);

  const closeNotificationCenter = useCallback(() => {
    setIsNotificationCenterOpen(false);
  }, []);

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, isRead: true } : n))
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev =>
      prev.map(n => (n.status === 'inbox' ? { ...n, isRead: true } : n))
    );
  }, []);

  const changeNotificationStatus = useCallback((id: string, status: NotificationStatus) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, status, isRead: true } : n))
    );
  }, []);

  const muteCategory = useCallback((module: NotificationModule) => {
    setNotifications(prev =>
      prev.map(n => (n.module === module ? { ...n, status: 'muted' as NotificationStatus } : n))
    );
    showToast('success', `All ${module} notifications have been muted.`);
  }, []);

  const showToast = useCallback((type: ToastType, message: string, duration = 3000) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: Toast = { id, type, message, duration };
    setToasts(prev => [...prev, newToast]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const addNotification = useCallback(
    (notificationData: Omit<Notification, 'id' | 'timestamp' | 'isRead' | 'status'>) => {
      const newNotification: Notification = {
        ...notificationData,
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date(),
        isRead: false,
        status: 'inbox',
      };
      setNotifications(prev => [newNotification, ...prev]);
    },
    []
  );

  const value: NotificationContextType = {
    notifications,
    toasts,
    isNotificationCenterOpen,
    unreadCount,
    openNotificationCenter,
    closeNotificationCenter,
    markAsRead,
    markAllAsRead,
    changeNotificationStatus,
    muteCategory,
    showToast,
    addNotification,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </NotificationContext.Provider>
  );
};

