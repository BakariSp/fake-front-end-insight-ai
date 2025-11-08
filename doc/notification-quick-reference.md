# Notification System - Quick Reference

## 快速导入

```tsx
import { 
  useNotifications,
  NotificationBanner,
  NotificationBadge,
  // ... other components
} from '@/app/teacher/components/notifications';
```

## 常用场景

### 1. 显示成功消息（Toast）

```tsx
const { showToast } = useNotifications();
showToast('success', 'Saved successfully!');
```

### 2. 显示错误消息

```tsx
showToast('error', 'Failed to save. Please try again.');
```

### 3. 页面顶部重要提醒（Banner）

```tsx
<NotificationBanner
  type="critical"
  title="Deadline Tonight!"
  message="Assignment due at 23:59"
  action={{ label: 'View', onClick: () => {} }}
/>
```

### 4. 列表项新标签

```tsx
<div>
  Assignment Title
  <NotificationBadge type="new" />
</div>
```

### 5. 添加通知到通知中心

```tsx
const { addNotification } = useNotifications();
addNotification({
  title: 'New Message',
  description: 'Parent sent you a message',
  scope: 'personal',
  module: 'communication',
  urgency: 'normal',
});
```

## 组件类型

### Toast Types
- `success` - 绿色，成功操作
- `error` - 红色，错误提示
- `info` - 蓝色，信息提示
- `warning` - 橙色，警告提示

### Banner Types
- `critical` - 红色，紧急/阻断
- `important` - 橙色，重要提醒
- `info` - 蓝色，一般信息
- `success` - 绿色，成功确认

### Badge Types
- `new` - 新内容
- `updated` - 已更新
- `invited` - 邀请
- `urgent` - 紧急
- `count` - 数字计数

## Hook API

```tsx
const {
  showToast,              // 显示 Toast
  addNotification,        // 添加通知
  notifications,          // 所有通知
  unreadCount,           // 未读数量
  markAsRead,            // 标记已读
  markAllAsRead,         // 全部已读
} = useNotifications();
```

## 演示页面

📍 `/teacher/notification-demo` - 查看所有组件的交互演示

## 完整文档

📚 参见 `/doc/notification-system-guide.md` 了解详细使用指南

