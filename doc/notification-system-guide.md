# Notification System Guide

## Overview

The notification system provides a comprehensive solution for managing and displaying notifications throughout the teacher interface. It includes multiple notification types and a centralized notification center.

## Components

### 1. Notification Center (Bell Icon)

Located in the top navigation bar, the bell icon shows:
- **Red dot** when there are unread notifications
- **Count badge** showing the number of unread notifications (max display: 9+)
- Clicking opens the Notification Center drawer

**Features:**
- **Filtering**: By scope (All/Personal/Class/School), module (Tools/Communication/Resource/Classes/System), urgency, and date
- **Tabs**: Inbox / Done / Muted
- **Batch Actions**: Mark all as read, mute categories, access preferences
- **Card Details**: Each notification shows title, description, timestamp, badges, and action buttons
- **Grouping**: Notifications are grouped by date (Today/Yesterday/Earlier) and type

### 2. Notification Banner (Blocking/Important Messages)

Use for critical or important messages that need immediate attention at the page level.

**Types:**
- `critical` - Red background, for urgent issues
- `important` - Orange background, for high-priority items
- `info` - Blue background, for informational messages
- `success` - Green background, for positive confirmations

**Example Usage:**
```tsx
import { NotificationBanner } from '@/app/teacher/components/notifications';

<NotificationBanner
  type="critical"
  title="Assignment Deadline Tonight!"
  message="Math homework is due tonight at 23:59."
  action={{
    label: 'View Assignment',
    onClick: () => {
      // Navigate to assignment
    },
  }}
  onClose={() => setShowBanner(false)}
/>
```

### 3. Notification Toast (Auto-dismiss Messages)

Use for quick feedback messages that auto-dismiss after 3-5 seconds.

**Types:**
- `success` - Green, for successful operations
- `error` - Red, for errors
- `info` - Blue, for information
- `warning` - Orange, for warnings

**Example Usage:**
```tsx
import { useNotifications } from '@/app/teacher/components/notifications';

const { showToast } = useNotifications();

// Show toast
showToast('success', 'Assignment saved successfully!');
showToast('error', 'Failed to upload file. Please try again.');
showToast('info', 'AI task added to queue');
showToast('warning', 'Some students have not viewed the material yet');
```

### 4. Notification Badge (Row-level Indicators)

Use in lists to indicate new, updated, or urgent items.

**Types:**
- `new` - Blue, with pulse animation
- `updated` - Orange
- `invited` - Light blue
- `urgent` - Red, with pulse animation
- `count` - Red badge with number

**Example Usage:**
```tsx
import { NotificationBadge } from '@/app/teacher/components/notifications';

// In a list item
<div className={styles.listItem}>
  <span>New Assignment Posted</span>
  <NotificationBadge type="new" />
</div>

// Count badge
<NotificationBadge type="count" count={5} />
```

### 5. Sidebar Navigation Badges

Sidebar navigation items can show unread indicators:
- **Blue dot** - Indicates new content in that section
- **Count badge** - Shows number of unread items

**Example Usage:**
```tsx
import { BlueDotBadge, CountBadge } from '@/app/teacher/components/notifications';

// Blue dot
<BlueDotBadge />

// Count badge
<CountBadge count={3} />
```

## API Reference

### `useNotifications()` Hook

The main hook for interacting with the notification system.

```tsx
const {
  notifications,              // All notifications
  toasts,                     // Active toast messages
  isNotificationCenterOpen,   // Notification center state
  unreadCount,                // Total unread count
  openNotificationCenter,     // Open the center
  closeNotificationCenter,    // Close the center
  markAsRead,                 // Mark one notification as read
  markAllAsRead,              // Mark all as read
  changeNotificationStatus,   // Change notification status
  muteCategory,               // Mute a category
  showToast,                  // Show a toast message
  addNotification,            // Add a new notification
} = useNotifications();
```

### Adding Notifications Programmatically

```tsx
addNotification({
  title: 'New Message',
  description: 'You have a new message from a parent.',
  scope: 'personal',           // 'personal' | 'class' | 'school' | 'all'
  module: 'communication',     // 'tools' | 'communication' | 'resource' | 'classes' | 'system'
  urgency: 'normal',           // 'critical' | 'important' | 'normal' | 'low'
  action: {
    type: 'view',              // 'view' | 'accept' | 'decline' | 'custom'
    label: 'View Message',
  },
  badge: {
    type: 'class',             // 'class' | 'school' | 'ai'
    label: 'Grade 10-A',
  },
  metadata: {
    classId: '10a',
    className: 'Grade 10-A',
  },
});
```

## Best Practices

### When to Use Each Component

1. **Notification Banner**
   - Assignment deadlines approaching
   - Critical system messages
   - Important reminders that require action
   - Should be dismissible but persistent until closed

2. **Notification Toast**
   - Save/update confirmations
   - File upload success/failure
   - Quick status updates
   - Non-critical informational messages

3. **Notification Badge**
   - New items in lists
   - Updated content
   - Urgent items requiring attention
   - Unread counts

4. **Notification Center**
   - All notifications that need to be tracked
   - Messages that users might need to refer back to
   - Notifications with actions (Accept/Decline/View)
   - Historical notification record

### UI/UX Guidelines

1. **Don't Overwhelm Users**
   - Use toasts sparingly (max 3-4 visible at once)
   - Auto-dismiss toasts after 3-5 seconds
   - Group similar notifications when possible

2. **Priority System**
   - Critical: Red - Requires immediate attention
   - Important: Orange - Should be addressed soon
   - Normal: Blue/Default - Standard priority
   - Low: Gray - Can be addressed later

3. **Clear Actions**
   - Always provide clear action labels (View, Accept, Decline)
   - Make primary actions obvious
   - Allow users to dismiss or mute notifications

4. **Mobile Responsiveness**
   - All components are responsive
   - Notification center becomes full-screen on mobile
   - Toasts stack vertically on narrow screens

## Demo Page

Visit `/teacher/notification-demo` to see all notification components in action with interactive examples.

## Architecture

```
app/teacher/components/notifications/
├── types.ts                    # TypeScript types
├── mockData.ts                 # Mock notification data
├── NotificationBell.tsx        # Bell icon component
├── NotificationCenter.tsx      # Notification center drawer
├── NotificationBanner.tsx      # Banner component
├── NotificationToast.tsx       # Toast component
├── NotificationBadge.tsx       # Badge components
├── NotificationProvider.tsx    # Context provider
├── ToastContainer.tsx          # Toast container
└── index.ts                    # Exports
```

## Future Enhancements (Optional)

- Web Push Notifications (browser notifications)
- Email/SMS digest settings
- Quiet hours configuration
- Advanced filtering and search
- Notification sound settings
- Bulk actions (archive, delete)
- Notification templates
- Analytics and insights

