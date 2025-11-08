// 通知系统类型定义

export type NotificationScope = 'personal' | 'class' | 'school' | 'all';
export type NotificationModule = 'tools' | 'communication' | 'resource' | 'classes' | 'system';
export type NotificationUrgency = 'critical' | 'important' | 'normal' | 'low';
export type NotificationStatus = 'inbox' | 'done' | 'muted';

export interface Notification {
  id: string;
  title: string;
  description: string;
  scope: NotificationScope;
  module: NotificationModule;
  urgency: NotificationUrgency;
  status: NotificationStatus;
  timestamp: Date;
  isRead: boolean;
  badge?: {
    type: 'class' | 'school' | 'ai';
    label: string;
  };
  action?: {
    type: 'view' | 'accept' | 'decline' | 'custom';
    label: string;
    onClick?: () => void;
  };
  metadata?: {
    classId?: string;
    className?: string;
    assignmentId?: string;
    resourceId?: string;
  };
}

export interface NotificationFilter {
  scope: NotificationScope;
  module: NotificationModule | 'all';
  urgency: NotificationUrgency | 'all';
  dateRange?: {
    start: Date;
    end: Date;
  };
}

export interface NotificationPreferences {
  enableWebPush: boolean;
  enableEmail: boolean;
  enableSMS: boolean;
  emailDigest: 'instant' | 'daily' | 'weekly';
  mutedCategories: NotificationModule[];
  quietHours?: {
    enabled: boolean;
    start: string; // HH:mm
    end: string; // HH:mm
  };
}

