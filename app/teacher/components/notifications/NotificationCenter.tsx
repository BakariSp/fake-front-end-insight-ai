'use client';

import React, { useState, useMemo } from 'react';
import styles from './NotificationCenter.module.css';
import { Notification, NotificationScope, NotificationModule, NotificationUrgency, NotificationStatus } from './types';

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onMuteCategory: (module: NotificationModule) => void;
  onChangeStatus: (id: string, status: NotificationStatus) => void;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onMuteCategory,
  onChangeStatus,
}) => {
  const [activeTab, setActiveTab] = useState<NotificationStatus>('inbox');
  const [scopeFilter, setScopeFilter] = useState<NotificationScope | 'all'>('all');
  const [moduleFilter, setModuleFilter] = useState<NotificationModule | 'all'>('all');
  const [urgencyFilter, setUrgencyFilter] = useState<NotificationUrgency | 'all'>('all');

  const filteredNotifications = useMemo(() => {
    return notifications.filter(n => {
      if (n.status !== activeTab) return false;
      if (scopeFilter !== 'all' && n.scope !== scopeFilter) return false;
      if (moduleFilter !== 'all' && n.module !== moduleFilter) return false;
      if (urgencyFilter !== 'all' && n.urgency !== urgencyFilter) return false;
      return true;
    });
  }, [notifications, activeTab, scopeFilter, moduleFilter, urgencyFilter]);

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

    if (minutes < 60) {
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const getBadgeClass = (type: string) => {
    switch (type) {
      case 'class':
        return styles.badgeClass;
      case 'school':
        return styles.badgeSchool;
      case 'ai':
        return styles.badgeAi;
      default:
        return '';
    }
  };

  const getUrgencyClass = (urgency: NotificationUrgency) => {
    switch (urgency) {
      case 'critical':
        return styles.urgencyCritical;
      case 'important':
        return styles.urgencyImportant;
      default:
        return '';
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.overlay} onClick={onClose}></div>
      <div className={styles.drawer}>
        <div className={styles.header}>
          <h2 className={styles.title}>Notification Center</h2>
          <button className={styles.closeButton} onClick={onClose} aria-label="Close">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Filters */}
        <div className={styles.filters}>
          <div className={styles.filterRow}>
            <select
              className={styles.filterSelect}
              value={scopeFilter}
              onChange={(e) => setScopeFilter(e.target.value as NotificationScope | 'all')}
            >
              <option value="all">All Scope</option>
              <option value="personal">Personal</option>
              <option value="class">Class</option>
              <option value="school">School</option>
            </select>

            <select
              className={styles.filterSelect}
              value={moduleFilter}
              onChange={(e) => setModuleFilter(e.target.value as NotificationModule | 'all')}
            >
              <option value="all">All Modules</option>
              <option value="tools">Tools</option>
              <option value="communication">Communication</option>
              <option value="resource">Resource</option>
              <option value="classes">Classes</option>
              <option value="system">System</option>
            </select>

            <select
              className={styles.filterSelect}
              value={urgencyFilter}
              onChange={(e) => setUrgencyFilter(e.target.value as NotificationUrgency | 'all')}
            >
              <option value="all">All Urgency</option>
              <option value="critical">Critical</option>
              <option value="important">Important</option>
              <option value="normal">Normal</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === 'inbox' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('inbox')}
          >
            Inbox
            {notifications.filter(n => n.status === 'inbox' && !n.isRead).length > 0 && (
              <span className={styles.tabBadge}>
                {notifications.filter(n => n.status === 'inbox' && !n.isRead).length}
              </span>
            )}
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'done' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('done')}
          >
            Done
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'muted' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('muted')}
          >
            Muted
          </button>
        </div>

        {/* Actions */}
        {activeTab === 'inbox' && (
          <div className={styles.actions}>
            <button className={styles.actionButton} onClick={onMarkAllAsRead}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M13 4L6 11L3 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              Mark All as Read
            </button>
            <button className={styles.actionButton}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              Preferences
            </button>
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
                {notifs.map(notification => (
                  <div
                    key={notification.id}
                    className={`${styles.card} ${!notification.isRead ? styles.cardUnread : ''} ${getUrgencyClass(notification.urgency)}`}
                    onClick={() => !notification.isRead && onMarkAsRead(notification.id)}
                  >
                    <div className={styles.cardHeader}>
                      <h3 className={styles.cardTitle}>{notification.title}</h3>
                      <span className={styles.cardTime}>{formatTime(notification.timestamp)}</span>
                    </div>
                    <p className={styles.cardDescription}>{notification.description}</p>
                    <div className={styles.cardFooter}>
                      <div className={styles.cardBadges}>
                        {notification.badge && (
                          <span className={`${styles.badge} ${getBadgeClass(notification.badge.type)}`}>
                            {notification.badge.label}
                          </span>
                        )}
                        <span className={styles.moduleTag}>{notification.module}</span>
                      </div>
                      {notification.action && (
                        <button 
                          className={styles.cardAction}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (notification.action?.onClick) {
                              notification.action.onClick();
                            }
                          }}
                        >
                          {notification.action.label}
                        </button>
                      )}
                    </div>
                    {activeTab === 'inbox' && (
                      <div className={styles.cardMenu}>
                        <button
                          className={styles.menuButton}
                          onClick={(e) => {
                            e.stopPropagation();
                            onChangeStatus(notification.id, 'done');
                          }}
                        >
                          Done
                        </button>
                        <button
                          className={styles.menuButton}
                          onClick={(e) => {
                            e.stopPropagation();
                            onChangeStatus(notification.id, 'muted');
                          }}
                        >
                          Mute
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            );
          })}

          {filteredNotifications.length === 0 && (
            <div className={styles.empty}>
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                <circle cx="32" cy="32" r="32" fill="#F5F7FA" />
                <path
                  d="M32 20C28.8174 20 25.7652 21.2643 23.5147 23.5147C21.2643 25.7652 20 28.8174 20 32C20 42 16 44 16 44H48C48 44 44 42 44 32C44 28.8174 42.7357 25.7652 40.4853 23.5147C38.2348 21.2643 35.1826 20 32 20Z"
                  fill="#D9D9D9"
                />
              </svg>
              <p className={styles.emptyText}>No notifications</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NotificationCenter;

