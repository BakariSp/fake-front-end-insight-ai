'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './NotificationCenterSimplified.module.css';
import { Notification, NotificationStatus } from './types';

interface NotificationCenterSimplifiedProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onChangeStatus: (id: string, status: NotificationStatus) => void;
}

const NotificationCenterSimplified: React.FC<NotificationCenterSimplifiedProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onChangeStatus,
}) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'inbox' | 'archived'>('inbox');
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [swipedId, setSwipedId] = useState<string | null>(null);
  const touchStartX = useRef<number>(0);
  const touchCurrentX = useRef<number>(0);

  const filteredNotifications = useMemo(() => {
    return notifications.filter(n => {
      // Map old status to new logic
      const isArchived = n.status === 'done' || n.status === 'muted';
      const isInInbox = n.status === 'inbox';
      
      if (activeTab === 'inbox' && !isInInbox) return false;
      if (activeTab === 'archived' && !isArchived) return false;
      if (showUnreadOnly && n.isRead) return false;
      return true;
    });
  }, [notifications, activeTab, showUnreadOnly]);

  const unreadCount = useMemo(() => {
    return notifications.filter(n => n.status === 'inbox' && !n.isRead).length;
  }, [notifications]);

  // Get navigation path based on notification type
  const getNotificationPath = (notification: Notification): string => {
    switch (notification.module) {
      case 'classes':
        return '/teacher/classes';
      case 'communication':
        return '/teacher/communication';
      case 'resource':
        return '/teacher/resource-library';
      case 'tools':
        // Check if it's AI-related
        if (notification.title.toLowerCase().includes('ai') || 
            notification.title.toLowerCase().includes('quiz') ||
            notification.title.toLowerCase().includes('generated')) {
          return '/teacher/tasks';
        }
        return '/teacher/insight-tools';
      case 'system':
        return '/teacher/settings';
      default:
        return '/teacher';
    }
  };

  const handleNotificationClick = (notification: Notification) => {
    // Mark as read
    if (!notification.isRead) {
      onMarkAsRead(notification.id);
    }
    
    // If notification has custom onClick action, use that
    if (notification.action?.onClick) {
      notification.action.onClick();
      onClose();
      return;
    }
    
    // Otherwise, navigate to the appropriate page
    const path = getNotificationPath(notification);
    router.push(path);
    
    // Close notification center
    onClose();
  };

  const handleArchive = (e: React.MouseEvent, notificationId: string) => {
    e.stopPropagation();
    onChangeStatus(notificationId, 'done'); // Use 'done' as archived status
  };

  // Touch handlers for swipe gesture
  const handleTouchStart = (e: React.TouchEvent, notificationId: string) => {
    touchStartX.current = e.touches[0].clientX;
    touchCurrentX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent, notificationId: string) => {
    touchCurrentX.current = e.touches[0].clientX;
    const diff = touchCurrentX.current - touchStartX.current;
    
    // Only set swiping state if moved more than 10px (to avoid accidental swipes on clicks)
    if (Math.abs(diff) > 10) {
      setSwipedId(notificationId);
    }
  };

  const handleTouchEnd = (notificationId: string) => {
    const diff = touchCurrentX.current - touchStartX.current;
    
    // If swiped right more than 80px, archive
    if (diff > 80) {
      onChangeStatus(notificationId, 'done');
    }
    
    // Reset state
    setSwipedId(null);
    touchStartX.current = 0;
    touchCurrentX.current = 0;
  };

  const groupedNotifications = useMemo(() => {
    const groups: { [key: string]: Notification[] } = {
      today: [],
      yesterday: [],
      earlier: [],
    };

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    filteredNotifications.forEach(n => {
      const notifDate = new Date(n.timestamp);
      const notifDateOnly = new Date(notifDate.getFullYear(), notifDate.getMonth(), notifDate.getDate());

      if (notifDateOnly.getTime() === today.getTime()) {
        groups.today.push(n);
      } else if (notifDateOnly.getTime() === yesterday.getTime()) {
        groups.yesterday.push(n);
      } else {
        groups.earlier.push(n);
      }
    });

    return groups;
  }, [filteredNotifications]);

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));

    if (minutes < 1) {
      return 'Just now';
    } else if (minutes < 60) {
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const getModuleColor = (module: string) => {
    const colors: { [key: string]: string } = {
      tools: '#4F7FFF',
      communication: '#52C41A',
      resource: '#FF9800',
      classes: '#9C27B0',
      system: '#8C8C8C',
    };
    return colors[module] || '#8C8C8C';
  };

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.overlay} onClick={onClose}></div>
      <div className={styles.drawer}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <h2 className={styles.title}>Notifications</h2>
            {unreadCount > 0 && (
              <span className={styles.unreadBadge}>{unreadCount}</span>
            )}
          </div>
          <div className={styles.headerRight}>
            <button 
              className={styles.settingsButton} 
              onClick={() => {
                router.push('/teacher/settings/notifications');
                onClose();
              }}
              aria-label="Notification Settings"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.6758 14.6635L20.1406 13.351C20.2133 12.9057 20.2508 12.451 20.2508 11.9963C20.2508 11.5416 20.2133 11.0869 20.1406 10.6416L21.6758 9.3291C21.7916 9.22998 21.8745 9.09795 21.9134 8.95058C21.9523 8.80321 21.9455 8.64748 21.8938 8.5041L21.8727 8.44316C21.45 7.26198 20.8172 6.167 20.0047 5.21113L19.9625 5.16191C19.8639 5.04602 19.7326 4.96271 19.5857 4.92296C19.4389 4.88322 19.2834 4.8889 19.1398 4.93926L17.2344 5.6166C16.5313 5.04004 15.7461 4.58535 14.8977 4.2666L14.5297 2.27441C14.5019 2.12451 14.4292 1.98661 14.3212 1.87902C14.2132 1.77143 14.075 1.69925 13.925 1.67207L13.8617 1.66035C12.6406 1.44004 11.3563 1.44004 10.1352 1.66035L10.0719 1.67207C9.92187 1.69925 9.78368 1.77143 9.67568 1.87902C9.56767 1.98661 9.49495 2.12451 9.46719 2.27441L9.09688 4.27598C8.25521 4.59479 7.47141 5.04924 6.77657 5.62129L4.85704 4.93926C4.71352 4.8885 4.55795 4.88261 4.41101 4.92238C4.26407 4.96215 4.1327 5.0457 4.03438 5.16191L3.99219 5.21113C3.18066 6.16767 2.54792 7.26247 2.12422 8.44316L2.10313 8.5041C1.99766 8.79707 2.08438 9.1252 2.3211 9.3291L3.875 10.6557C3.80235 11.0963 3.76719 11.5463 3.76719 11.9939C3.76719 12.4439 3.80235 12.8939 3.875 13.3322L2.3211 14.6588C2.20531 14.7579 2.12243 14.8899 2.0835 15.0373C2.04456 15.1847 2.05141 15.3404 2.10313 15.4838L2.12422 15.5447C2.54844 16.726 3.17657 17.8158 3.99219 18.7768L4.03438 18.826C4.13294 18.9419 4.26431 19.0252 4.41117 19.0649C4.55802 19.1047 4.71347 19.099 4.85704 19.0486L6.77657 18.3666C7.47501 18.9408 8.25547 19.3955 9.09688 19.7119L9.46719 21.7135C9.49495 21.8634 9.56767 22.0013 9.67568 22.1089C9.78368 22.2165 9.92187 22.2886 10.0719 22.3158L10.1352 22.3275C11.3675 22.549 12.6294 22.549 13.8617 22.3275L13.925 22.3158C14.075 22.2886 14.2132 22.2165 14.3212 22.1089C14.4292 22.0013 14.5019 21.8634 14.5297 21.7135L14.8977 19.7213C15.7458 19.4034 16.5353 18.9472 17.2344 18.3713L19.1398 19.0486C19.2834 19.0994 19.4389 19.1053 19.5859 19.0655C19.7328 19.0257 19.8642 18.9422 19.9625 18.826L20.0047 18.7768C20.8203 17.8135 21.4484 16.726 21.8727 15.5447L21.8938 15.4838C21.9992 15.1955 21.9125 14.8674 21.6758 14.6635V14.6635ZM18.4766 10.9182C18.5352 11.2721 18.5656 11.6354 18.5656 11.9986C18.5656 12.3619 18.5352 12.7252 18.4766 13.0791L18.3219 14.0189L20.0727 15.5166C19.8072 16.1281 19.4722 16.7069 19.0742 17.2416L16.8992 16.4705L16.1633 17.0752C15.6031 17.5346 14.9797 17.8955 14.3047 18.1486L13.4117 18.4838L12.9922 20.7572C12.3302 20.8322 11.6619 20.8322 11 20.7572L10.5805 18.4791L9.69454 18.1393C9.02657 17.8861 8.40547 17.5252 7.85 17.0682L7.11407 16.4611L4.925 17.2393C4.52657 16.7025 4.19375 16.1236 3.92657 15.5143L5.6961 14.0025L5.54375 13.065C5.4875 12.7158 5.45704 12.3549 5.45704 11.9986C5.45704 11.64 5.48516 11.2814 5.54375 10.9322L5.6961 9.99473L3.92657 8.48301C4.19141 7.87129 4.52657 7.29473 4.925 6.75801L7.11407 7.53613L7.85 6.9291C8.40547 6.47207 9.02657 6.11113 9.69454 5.85801L10.5828 5.52285L11.0023 3.24473C11.6609 3.16973 12.3336 3.16973 12.9945 3.24473L13.4141 5.51816L14.307 5.85332C14.9797 6.10645 15.6055 6.46738 16.1656 6.92676L16.9016 7.53145L19.0766 6.76035C19.475 7.29707 19.8078 7.87598 20.075 8.48535L18.3242 9.98301L18.4766 10.9182ZM12.0008 7.63926C9.72266 7.63926 7.87579 9.48613 7.87579 11.7643C7.87579 14.0424 9.72266 15.8893 12.0008 15.8893C14.2789 15.8893 16.1258 14.0424 16.1258 11.7643C16.1258 9.48613 14.2789 7.63926 12.0008 7.63926ZM13.857 13.6205C13.6136 13.8647 13.3242 14.0583 13.0057 14.1902C12.6871 14.3222 12.3456 14.3898 12.0008 14.3893C11.3 14.3893 10.6414 14.115 10.1445 13.6205C9.90037 13.377 9.70676 13.0877 9.57482 12.7691C9.44289 12.4506 9.37525 12.1091 9.37579 11.7643C9.37579 11.0635 9.65 10.4049 10.1445 9.90801C10.6414 9.41113 11.3 9.13926 12.0008 9.13926C12.7016 9.13926 13.3602 9.41113 13.857 9.90801C14.1012 10.1515 14.2948 10.4408 14.4267 10.7594C14.5587 11.0779 14.6263 11.4195 14.6258 11.7643C14.6258 12.465 14.3516 13.1236 13.857 13.6205Z" fill="currentColor"/>
              </svg>
            </button>
            <button className={styles.closeButton} onClick={onClose} aria-label="Close">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === 'inbox' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('inbox')}
          >
            Inbox
            {unreadCount > 0 && activeTab !== 'inbox' && (
              <span className={styles.tabBadge}>{unreadCount}</span>
            )}
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'archived' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('archived')}
          >
            Archive
          </button>
        </div>

        {/* Quick Actions */}
        {activeTab === 'inbox' && (
          <div className={styles.quickActions}>
            <button
              className={`${styles.filterToggle} ${showUnreadOnly ? styles.filterToggleActive : ''}`}
              onClick={() => setShowUnreadOnly(!showUnreadOnly)}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="3" fill="currentColor" />
              </svg>
              Unread only
            </button>
            {unreadCount > 0 && (
              <button className={styles.markAllButton} onClick={onMarkAllAsRead}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M13 4L6 11L3 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                Mark all read
              </button>
            )}
          </div>
        )}

        {/* Notification List */}
        <div className={styles.list}>
          {Object.entries(groupedNotifications).map(([group, notifs]) => {
            if (notifs.length === 0) return null;
            return (
              <div key={group} className={styles.group}>
                <div className={styles.groupHeader}>
                  {group === 'today' ? 'Today' : group === 'yesterday' ? 'Yesterday' : 'Earlier'}
                </div>
                {notifs.map(notification => {
                  const isSwiped = swipedId === notification.id;
                  return (
                    <div
                      key={notification.id}
                      className={`${styles.cardWrapper} ${isSwiped ? styles.cardSwiping : ''}`}
                      onTouchStart={(e) => activeTab === 'inbox' && handleTouchStart(e, notification.id)}
                      onTouchMove={(e) => activeTab === 'inbox' && handleTouchMove(e, notification.id)}
                      onTouchEnd={() => activeTab === 'inbox' && handleTouchEnd(notification.id)}
                    >
                      {/* Archive background (shown when swiping) */}
                      {activeTab === 'inbox' && (
                        <div className={styles.archiveBackground}>
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M3 5h14M8 9v6M12 9v6M4 5l1 11a1 1 0 001 1h8a1 1 0 001-1l1-11" stroke="white" strokeWidth="2" strokeLinecap="round" />
                          </svg>
                          Archive
                        </div>
                      )}
                      
                      <div
                        className={`${styles.card} ${!notification.isRead ? styles.cardUnread : styles.cardRead}`}
                        onClick={() => handleNotificationClick(notification)}
                      >
                        <div className={styles.cardContent}>
                          <div className={styles.cardHeader}>
                            <h3 className={styles.cardTitle}>{notification.title}</h3>
                            <span className={styles.cardTime}>{formatTime(notification.timestamp)}</span>
                          </div>
                          
                          <p className={styles.cardDescription}>
                            {notification.description}
                          </p>
                          
                          <div className={styles.cardFooter}>
                            <div className={styles.cardMeta}>
                              <span 
                                className={styles.moduleTag}
                                style={{ backgroundColor: `${getModuleColor(notification.module)}15`, color: getModuleColor(notification.module) }}
                              >
                                {notification.module}
                              </span>
                              {notification.badge && (
                                <span className={styles.scopeTag}>
                                  {notification.badge.label}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Archive button (hover on desktop) */}
                        {activeTab === 'inbox' && (
                          <button
                            className={styles.archiveButton}
                            onClick={(e) => handleArchive(e, notification.id)}
                            aria-label="Archive"
                          >
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                              <path d="M2 4h14M7 8v5M11 8v5M3 4l1 10a1 1 0 001 1h8a1 1 0 001-1l1-10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}

          {filteredNotifications.length === 0 && (
            <div className={styles.empty}>
              <div className={styles.emptyIcon}>
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <circle cx="24" cy="24" r="20" stroke="#E8E8E8" strokeWidth="2" />
                  <path
                    d="M24 14C21.6131 14 19.3239 14.9482 17.636 16.636C15.9482 18.3239 15 20.6131 15 23C15 30 12 32 12 32H36C36 32 33 30 33 23C33 20.6131 32.0518 18.3239 30.364 16.636C28.6761 14.9482 26.3869 14 24 14Z"
                    stroke="#E8E8E8"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <p className={styles.emptyTitle}>
                {showUnreadOnly ? 'All caught up!' : 'No notifications'}
              </p>
              <p className={styles.emptyText}>
                {showUnreadOnly ? 'You have no unread notifications' : 'You have no notifications here'}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NotificationCenterSimplified;

