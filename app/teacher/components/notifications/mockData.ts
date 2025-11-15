import { Notification } from './types';

export const mockNotifications: Notification[] = [
  {
    id: 'insight-tools-ready-001',
    title: '🔧 Insight Tools Ready',
    description: 'Explore powerful AI-powered teaching tools designed for Hong Kong\'s DSE curriculum. Access quiz builders, resource generators, and more.',
    scope: 'personal',
    module: 'tools',
    urgency: 'normal',
    status: 'inbox',
    timestamp: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
    isRead: false,
    badge: {
      type: 'ai',
      label: 'New Tools',
    },
    action: {
      type: 'view',
      label: 'Explore Tools',
      onClick: () => {
        window.open('https://insighaifrontend.vercel.app/teacher/toolkits', '_blank');
      }
    },
  },
  {
    id: 'ai-grading-001',
    title: '✨ AI Grading Completed',
    description: 'AI has finished grading "第二单元综合测试：文言文与古诗词" for 高一（3）班. 43 out of 45 students submitted. Average score: 78.5/100. Click to review results and weak points analysis.',
    scope: 'class',
    module: 'classes',
    urgency: 'important',
    status: 'inbox',
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    isRead: false,
    badge: {
      type: 'ai',
      label: 'AI Grading',
    },
    action: {
      type: 'view',
      label: 'View Results',
      onClick: () => {
        window.location.href = '/teacher/class/class-001/assignments/assignment-graded-001';
      }
    },
    metadata: {
      classId: 'class-001',
      className: '高一（3）班',
      assignmentId: 'assignment-graded-001',
    },
  },
  {
    id: 'assignment-published-001',
    title: '📢 Assignment Published Successfully',
    description: 'Your assignment "期中复习：现代文阅读理解" has been published to 高一（3）班. 28 out of 45 students have already submitted.',
    scope: 'class',
    module: 'classes',
    urgency: 'normal',
    status: 'inbox',
    timestamp: new Date(Date.now() - 90 * 60 * 1000), // 1.5 hours ago
    isRead: false,
    badge: {
      type: 'class',
      label: '高一（3）班',
    },
    action: {
      type: 'view',
      label: 'Monitor Progress',
      onClick: () => {
        window.location.href = '/teacher/class/class-001/assignments/assignment-published-001';
      }
    },
    metadata: {
      classId: 'class-001',
      className: '高一（3）班',
      assignmentId: 'assignment-published-001',
    },
  },
  {
    id: 'weak-points-alert-001',
    title: '📊 Weak Points Identified',
    description: 'AI analysis found 3 major weak points in your class: 65% of students struggle with 文言文翻译. Click to see detailed analysis and teaching suggestions.',
    scope: 'class',
    module: 'classes',
    urgency: 'important',
    status: 'inbox',
    timestamp: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
    isRead: false,
    badge: {
      type: 'ai',
      label: 'AI Analysis',
    },
    action: {
      type: 'view',
      label: 'View Analysis',
      onClick: () => {
        window.location.href = '/teacher/class/class-001/assignments/assignment-graded-001?tab=analysis';
      }
    },
    metadata: {
      classId: 'class-001',
      className: '高一（3）班',
      assignmentId: 'assignment-graded-001',
    },
  },
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

