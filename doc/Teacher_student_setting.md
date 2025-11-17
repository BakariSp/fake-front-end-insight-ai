# Settings - MVP 版本（学生端/教师端通用）

## 一、MVP简化结构

**⚠️ MVP设计原则：**
- 简单高效，只保留必要功能
- 网页版限制，去除复杂通知渠道
- 学生/教师共用相同结构

**→ 左侧导航栏（4个主标签）：**

```
Settings
 ├── Account
 ├── Notifications
 ├── Preferences
 └── About Insight AI
```

**移除项（MVP不包含）：**
- ❌ Privacy & Security独立页（合并到Account）
- ❌ 2FA双因素认证
- ❌ Account删除/停用功能
- ❌ Push通知和In-App通知（只保留Email）
- ❌ 站内私信通知（Parents、教师留言等）
- ❌ Learning Content Preference

---

## 二、教师/学生共通框架（MVP版本）

### ① Account（账户信息）

**包含字段：**

| 字段 | 说明 | 可编辑 |
| --- | --- | --- |
| Profile Photo | 头像（圆形） | ✅ 可上传 |
| Name | 姓名 | ✅ 可修改 |
| Email | 邮箱 | ✅ 可修改 |
| Student ID / Teacher ID | 学号/工号 | ❌ 只读 |
| School | 学校名称 | ❌ 只读 |
| Grade / Department | 年级/科组 | ❌ 只读 |
| **Change Password** | 修改密码 | ✅ 弹窗表单 |

**修改密码弹窗：**
```
┌─────────────────────────────┐
│ Change Password         ✕  │
├─────────────────────────────┤
│ Current Password:           │
│ [___________________]       │
│                             │
│ New Password:               │
│ [___________________]       │
│                             │
│ Confirm Password:           │
│ [___________________]       │
│                             │
│        [Cancel] [Update]    │
└─────────────────────────────┘
```

---

### ② Notifications（通知设置）

**MVP简化版：只保留Email通知**

**通知类别（Toggle开关）：**

| 通知类型 | 学生端 | 教师端 | 说明 |
| --- | --- | --- | --- |
| Assignment Updates | ✅ | ✅ | 新作业发布、截止提醒 |
| Grading Completed | ✅ | ❌ | 作业批改完成通知 |
| Class Announcements | ✅ | ✅ | 班级公告 |
| System Notifications | ✅ | ✅ | 系统更新、维护通知 |

**界面布局：**

```
Notifications
─────────────────────────
📧 Email Notifications

☑ Assignment Updates
   Notify me when new assignments are posted or due soon

☑ Grading Completed
   Notify me when my assignments are graded

☑ Class Announcements
   Notify me about class announcements and updates

☑ System Notifications
   Important system updates and maintenance notices
```

**移除项：**
- ❌ Push通知（移动端功能）
- ❌ In-App通知（暂未实现）
- ❌ Quiet Hours（复杂度高）
- ❌ 站内私信通知（未实现）

---

### ③ Preferences（偏好设置）

**MVP简化版：**

**包含内容：**

| 设置项 | 说明 | 类型 |
| --- | --- | --- |
| Language | 界面语言（中文/English） | Dropdown |
| Date Format | 日期格式（MM/DD/YYYY 或 DD/MM/YYYY） | Dropdown |
| Time Zone | 时区设置 | Dropdown |
| Default View | 默认作业视图（List/Grid） | Toggle |

**界面布局：**

```
Preferences
─────────────────────────
🌐 Language & Display

Language:           [English        ▼]
Date Format:        [MM/DD/YYYY     ▼]
Time Zone:          [GMT+8 HK       ▼]

⚙️ Interface

Default Assignment View:  ○ List  ● Grid
```

**移除项（MVP）：**
- ❌ Layout Density（界面密度）
- ❌ Content Preferences（学习内容偏好）
- ❌ Accessibility（无障碍设置）
- ❌ Theme（深色/浅色模式）

---

### ④ About Insight AI（关于）

**包含内容：**

| 项目 | 说明 |
| --- | --- |
| Version | 当前版本号（如 v1.0.0 MVP） |
| Help Center | 链接到帮助文档 |
| Report Issue | 问题反馈表单 |
| Privacy Policy | 隐私政策 |
| Terms of Service | 服务条款 |

**界面布局：**

```
About Insight AI
─────────────────────────
ℹ️ System Information

Version: v1.0.0 (MVP)
Last Updated: Nov 2024

📚 Support

• Help Center
• Report an Issue
• Send Feedback

📄 Legal

• Privacy Policy
• Terms of Service
```

---

## 三、MVP完整结构

```
Settings (学生端/教师端共用)
│
├── ① Account
│     ✅ Profile photo
│     ✅ Name / Email
│     ✅ Student ID / School / Grade (只读)
│     ✅ Change Password (弹窗)
│
├── ② Notifications
│     ✅ Email Notifications Only
│     ✅ Assignment Updates
│     ✅ Grading Completed (学生端)
│     ✅ Class Announcements
│     ✅ System Notifications
│
├── ③ Preferences
│     ✅ Language (中文/English)
│     ✅ Date Format
│     ✅ Time Zone
│     ✅ Default View (List/Grid)
│
└── ④ About Insight AI
      ✅ Version info
      ✅ Help Center
      ✅ Report Issue
      ✅ Privacy Policy
```

**移除功能清单（MVP不包含）：**
- ❌ Privacy & Security 独立页
- ❌ Two-Factor Authentication (2FA)
- ❌ Profile Visibility设置
- ❌ Deactivate Account
- ❌ Delete Account
- ❌ Push / In-App通知
- ❌ Quiet Hours
- ❌ Learning Content Preference
- ❌ Layout Density
- ❌ Accessibility Settings
- ❌ Theme (Dark Mode)

---

## 四、教师端与学生端差异

**唯一差异：Notifications模块**

| 通知类型 | 学生端 | 教师端 |
| --- | --- | --- |
| Assignment Updates | ✅ 新作业、截止提醒 | ✅ 学生提交通知 |
| Grading Completed | ✅ 批改完成通知 | ❌ 无此项 |
| Class Announcements | ✅ | ✅ |
| System Notifications | ✅ | ✅ |

**其他模块完全相同，通过role控制文字描述即可。**

---

## 五、MVP实施要点

### **简化原则**
1. **网页版限制** → 只保留Email通知
2. **去除复杂功能** → 无2FA、无账户删除、无隐私设置页
3. **保留核心功能** → 账户信息、通知开关、语言设置
4. **统一体验** → 学生/教师共用UI，只改文字

### **UI设计规范**
- 左侧Tab导航（固定4个）
- 右侧内容区（表单样式统一）
- Toggle开关（统一样式）
- Dropdown选择器（统一样式）
- 弹窗（用于修改密码）

### **数据持久化**
- LocalStorage + 后端API
- 实时保存或点击"Save Changes"
- 多设备同步

---