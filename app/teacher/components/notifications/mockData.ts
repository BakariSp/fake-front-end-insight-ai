import { Notification } from './types';

export const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Assignment Deadline Approaching',
    description: 'Math homework "Algebra Chapter 5" is due tonight at 23:59. 8 students haven\'t submitted yet.',
    scope: 'class',
    module: 'classes',
    urgency: 'critical',
    status: 'inbox',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    isRead: false,
    badge: {
      type: 'class',
      label: 'Grade 10-A',
    },
    action: {
      type: 'view',
      label: 'View Assignment',
    },
    metadata: {
      classId: '10a',
      className: 'Grade 10-A',
      assignmentId: 'hw-algebra-5',
    },
  },
  {
    id: '2',
    title: 'New Parent Message',
    description: 'Sarah Johnson\'s parent sent you a message regarding her recent test performance.',
    scope: 'personal',
    module: 'communication',
    urgency: 'important',
    status: 'inbox',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    isRead: false,
    action: {
      type: 'view',
      label: 'Read Message',
    },
  },
  {
    id: '3',
    title: 'School-Wide Meeting Tomorrow',
    description: 'Mandatory staff meeting scheduled for tomorrow at 9:00 AM in the main auditorium.',
    scope: 'school',
    module: 'communication',
    urgency: 'important',
    status: 'inbox',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    isRead: false,
    badge: {
      type: 'school',
      label: 'School Admin',
    },
    action: {
      type: 'accept',
      label: 'Confirm',
    },
  },
  {
    id: '4',
    title: 'AI Generated Quiz Ready',
    description: 'Your AI-generated quiz for "Geometry - Triangles" is ready for review.',
    scope: 'personal',
    module: 'tools',
    urgency: 'normal',
    status: 'inbox',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    isRead: false,
    badge: {
      type: 'ai',
      label: 'AI Generated',
    },
    action: {
      type: 'view',
      label: 'Review Quiz',
    },
  },
  {
    id: '5',
    title: 'New Resource Shared',
    description: 'David Chen shared "Advanced Calculus Notes" with the Math department.',
    scope: 'school',
    module: 'resource',
    urgency: 'low',
    status: 'inbox',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    isRead: true,
    action: {
      type: 'view',
      label: 'View Resource',
    },
    metadata: {
      resourceId: 'res-calculus-notes',
    },
  },
  {
    id: '6',
    title: 'Grade Submission Reminder',
    description: 'Final grades for Grade 11-B need to be submitted by this Friday.',
    scope: 'class',
    module: 'classes',
    urgency: 'important',
    status: 'inbox',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    isRead: true,
    badge: {
      type: 'class',
      label: 'Grade 11-B',
    },
    action: {
      type: 'view',
      label: 'Submit Grades',
    },
    metadata: {
      classId: '11b',
      className: 'Grade 11-B',
    },
  },
  {
    id: '7',
    title: 'Student Absence Report',
    description: 'Tom Wilson was absent from your Math class today.',
    scope: 'class',
    module: 'classes',
    urgency: 'low',
    status: 'inbox',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    isRead: true,
    badge: {
      type: 'class',
      label: 'Grade 10-A',
    },
  },
  {
    id: '8',
    title: 'Colleague Request',
    description: 'Emma Davis wants to collaborate on the upcoming Science Fair project.',
    scope: 'personal',
    module: 'communication',
    urgency: 'normal',
    status: 'inbox',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    isRead: true,
    action: {
      type: 'accept',
      label: 'Accept',
    },
  },
  {
    id: '9',
    title: 'System Maintenance',
    description: 'The platform will undergo scheduled maintenance this Sunday from 2 AM to 6 AM.',
    scope: 'school',
    module: 'system',
    urgency: 'normal',
    status: 'inbox',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    isRead: true,
    badge: {
      type: 'school',
      label: 'System',
    },
  },
  {
    id: '10',
    title: 'Professional Development',
    description: 'New online course "Modern Teaching Techniques" is now available.',
    scope: 'school',
    module: 'resource',
    urgency: 'low',
    status: 'done',
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
    isRead: true,
  },
];

export const getUnreadCount = (notifications: Notification[]): number => {
  return notifications.filter(n => !n.isRead && n.status === 'inbox').length;
};

export const getModuleUnreadCount = (notifications: Notification[], module: string): number => {
  return notifications.filter(n => !n.isRead && n.status === 'inbox' && n.module === module).length;
};

