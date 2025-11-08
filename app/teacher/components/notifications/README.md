# Teacher Notification System

A comprehensive notification system for the teacher interface with multiple notification types and a centralized notification center.

## 🎯 Features

- ✅ **Notification Center**: Bell icon with unread count and red dot indicator
- ✅ **Notification Drawer**: Full-featured drawer with filtering, tabs, and batch actions
- ✅ **Banner Notifications**: Blocking/important messages at page level
- ✅ **Toast Notifications**: Auto-dismiss messages (3-5 seconds)
- ✅ **Badge Indicators**: Row-level badges for lists (NEW, UPDATED, URGENT, etc.)
- ✅ **Sidebar Badges**: Blue dots and count badges for navigation items
- ✅ **Global State Management**: React Context API with useNotifications hook
- ✅ **Mock Data**: 10 sample notifications covering various scenarios
- ✅ **Responsive Design**: Works seamlessly on desktop and mobile

## 📁 File Structure

```
notifications/
├── types.ts                      # TypeScript type definitions
├── mockData.ts                   # Mock notification data
├── NotificationBell.tsx          # Bell icon component
├── NotificationBell.module.css
├── NotificationCenter.tsx        # Notification center drawer
├── NotificationCenter.module.css
├── NotificationBanner.tsx        # Banner component
├── NotificationBanner.module.css
├── NotificationToast.tsx         # Toast component
├── NotificationToast.module.css
├── NotificationBadge.tsx         # Badge components
├── NotificationBadge.module.css
├── NotificationProvider.tsx      # Context provider & state management
├── ToastContainer.tsx            # Toast container
├── ToastContainer.module.css
├── index.ts                      # Barrel exports
└── README.md                     # This file
```

## 🚀 Quick Start

### 1. Import the hook

```tsx
import { useNotifications } from '@/app/teacher/components/notifications';
```

### 2. Use in your component

```tsx
export default function YourPage() {
  const { showToast, addNotification } = useNotifications();
  
  // Show a toast
  const handleSave = () => {
    showToast('success', 'Saved successfully!');
  };
  
  // Add a notification
  const handleNewMessage = () => {
    addNotification({
      title: 'New Message',
      description: 'You have a new message',
      scope: 'personal',
      module: 'communication',
      urgency: 'normal',
    });
  };
  
  return (
    <div>
      <button onClick={handleSave}>Save</button>
      <button onClick={handleNewMessage}>New Message</button>
    </div>
  );
}
```

## 📦 Components

### NotificationBell

Bell icon with unread count badge.

```tsx
<NotificationBell count={5} onClick={openCenter} />
```

### NotificationCenter

Full-featured notification center drawer.

```tsx
<NotificationCenter
  isOpen={isOpen}
  onClose={onClose}
  notifications={notifications}
  onMarkAsRead={markAsRead}
  onMarkAllAsRead={markAllAsRead}
  onMuteCategory={muteCategory}
  onChangeStatus={changeStatus}
/>
```

### NotificationBanner

Page-level banner for important messages.

```tsx
<NotificationBanner
  type="critical"
  title="Deadline Tonight!"
  message="Assignment due at 23:59"
  action={{ label: 'View', onClick: () => {} }}
  onClose={() => {}}
/>
```

### NotificationToast

Auto-dismiss toast messages.

```tsx
// Use via hook
showToast('success', 'Saved successfully!');
```

### NotificationBadge

Row-level badges for lists.

```tsx
<NotificationBadge type="new" />
<NotificationBadge type="count" count={5} />
```

### Sidebar Badges

```tsx
<BlueDotBadge />
<CountBadge count={3} />
```

## 🎨 Notification Types

### Toast Types
- `success` - Green (successful operations)
- `error` - Red (errors)
- `info` - Blue (information)
- `warning` - Orange (warnings)

### Banner Types
- `critical` - Red (urgent/blocking)
- `important` - Orange (high priority)
- `info` - Blue (general info)
- `success` - Green (confirmations)

### Badge Types
- `new` - Blue with pulse
- `updated` - Orange
- `invited` - Light blue
- `urgent` - Red with pulse
- `count` - Red number badge

### Notification Scopes
- `personal` - Personal notifications
- `class` - Class-specific
- `school` - School-wide
- `all` - All scopes

### Notification Modules
- `tools` - From Insight Tools
- `communication` - Messages & announcements
- `resource` - Resource library
- `classes` - Class management
- `system` - System notifications

### Urgency Levels
- `critical` - Requires immediate attention
- `important` - Should be addressed soon
- `normal` - Standard priority
- `low` - Can be addressed later

## 🔧 Hook API

```tsx
const {
  notifications,              // All notifications
  toasts,                     // Active toasts
  isNotificationCenterOpen,   // Center state
  unreadCount,                // Unread count
  openNotificationCenter,     // Open center
  closeNotificationCenter,    // Close center
  markAsRead,                 // Mark one as read
  markAllAsRead,              // Mark all as read
  changeNotificationStatus,   // Change status
  muteCategory,               // Mute category
  showToast,                  // Show toast
  addNotification,            // Add notification
} = useNotifications();
```

## 📚 Documentation

- **Usage Guide**: `/doc/notification-system-guide.md`
- **Implementation Details**: `/doc/notification-system-implementation.md`
- **Quick Reference**: `/doc/notification-quick-reference.md`

## 🎭 Demo

Visit `/teacher/notification-demo` to see all components in action.

## 💡 Best Practices

1. **Toasts** - Use for quick feedback (saved, loaded, error)
2. **Banners** - Use for important page-level messages
3. **Badges** - Use for list items to indicate new/updated content
4. **Notification Center** - Use for all trackable notifications

## 🎯 Example Scenarios

### Scenario 1: Save Confirmation

```tsx
const handleSave = async () => {
  try {
    await saveData();
    showToast('success', 'Changes saved successfully!');
  } catch (error) {
    showToast('error', 'Failed to save. Please try again.');
  }
};
```

### Scenario 2: Assignment Deadline Warning

```tsx
<NotificationBanner
  type="critical"
  title="Assignment Deadline Approaching"
  message="Math homework is due tonight at 23:59"
  action={{
    label: 'View Assignment',
    onClick: () => router.push('/teacher/assignments/123'),
  }}
/>
```

### Scenario 3: New Parent Message

```tsx
addNotification({
  title: 'New Parent Message',
  description: "Sarah Johnson's parent sent you a message",
  scope: 'personal',
  module: 'communication',
  urgency: 'important',
  action: {
    type: 'view',
    label: 'Read Message',
  },
});
```

## 🔄 Integration

The notification system is already integrated into:

- ✅ `TeacherLayout` - Wrapped with NotificationProvider
- ✅ `TeacherTopNav` - Bell icon and notification center
- ✅ Sidebar Navigation - Communication badge showing unread count
- ✅ Teacher Dashboard - Demo banner with link to notification demo

## 🛠️ Tech Stack

- React 18
- TypeScript
- CSS Modules
- Context API
- Next.js 14

## 📝 License

This is a mock/static project for learning and demonstration purposes.

---

**Need Help?** Check out the demo page at `/teacher/notification-demo` or refer to the documentation in `/doc/`.

