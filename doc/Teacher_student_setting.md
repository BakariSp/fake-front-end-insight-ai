## 一、结构

| 层级 | 名称 | 用户心智 | 是否常用 |
| --- | --- | --- | --- |
| **基础层** | 账户与通知 | 用户身份、联系方式、通知方式 | ✅ 必须 |
| **学习层（或教学层）** | 学习/教学偏好、语言显示 | 个性化体验相关 | ⚙️ 常用但非每天用 |
| **安全层** | 安全、隐私、账户管理 | 安全保障与退出 | ⚠️ 低频但重要 |

**→ 左侧导航栏分为 3~4 个主标签：**

```
Settings
 ├── Account
 ├── Notifications
 ├── Preferences
 ├── Privacy & Security
 └── About Insight AI

```

> 学生端和教师端共用相同结构，只是内容不同。
> 

---

## 二、教师 / 学生共通框架

### ① Account（账户信息）

保留必要字段，隐藏冗余统计。

| 保留项 | 说明 |
| --- | --- |
| Profile photo | 上传头像 |
| Name / Username | 用户名或姓名 |
| Email | 可修改或验证 |
| Role / School | 自动显示（不可编辑） |
| Password reset | 简化为“Change Password”弹窗 |
| → 其余统计信息（登录时间、课程数等）建议移到 Dashboard 个人卡片显示 |  |

---

### ② Notifications（通知设置）

重点在「层级化」和「渠道聚合」：

- 先选通知渠道（Email / In-App / Push）
- 再选类别（Class、Assignment、System）
- 折叠非关键项（如 quiet hours、reminder 细节）

示例结构：

```
Notifications
 ├── Channels
 │    ├── Email / Push / In-app
 ├── Categories
 │    ├── Class Updates
 │    ├── Assignments
 │    ├── System Alerts
 └── Advanced (可折叠)
      ├── Quiet hours
      ├── Reminder timing

```

> 可统一样式，例如各项右侧 toggle switch，简洁清晰。
> 
> 
> 学生端与教师端唯一不同在「通知类型」上（如学生没有 grading completed）。
> 

---

### ③ Preferences（学习或教学偏好）

这是当前版本最杂的部分，要合并同类项：

| 模块 | 含义 | 策略 |
| --- | --- | --- |
| Layout Density / View | 视觉布局偏好 | 保留（低频但实用） |
| Default View / Sort | 默认作业视图 | 保留为 dropdown |
| Content Preferences | 视频/文本/互动 | 保留（与AI推荐相关） |
| Accessibility | 无障碍设置 | 折叠在“Advanced” |
| Language & Display | 语言、时区、日期格式 | 独立 section 保留 |

---

### ④ Privacy & Security（隐私与账户安全）

只保留三个功能：

1. Change password
2. Two-factor authentication
3. Profile visibility (Public / School / Class)

将 **Deactivate / Delete Account** 独立放在最底部（Danger Zone）。

---

## 🧱 三、层级与展示结构（推荐UI信息架构）

```
Settings
│
├── Account
│     • Profile picture
│     • Name / Email
│     • School / Role
│     • Change password
│
├── Notifications
│     • Channels (Email, Push, In-App)
│     • Categories (Assignments, Class, System)
│     • Quiet Hours / Reminders (collapsible)
│
├── Preferences
│     • Layout & View
│     • Learning/Teaching formats (Video, Reading, Interactive)
│     • Accessibility (Advanced)
│     • Language & Display
│
├── Privacy & Security
│     • Password & 2FA
│     • Profile visibility
│     • Account deactivation / deletion
│
└── About Insight AI
      • Version information
      • Help center & documentation
      • Report issues & send feedback
      • Privacy policy & terms of service
      • Open source attribution

```

---

## 🧩 四、后续可扩展设计

| 功能模块 | 未来可以补充 |
| --- | --- |
| Notifications | 自定义规则（如“只通知重要更新”） |
| Preferences | AI个性化推荐控制（数据开关） |
| Privacy | 数据导出 / 下载日志 |
| Account | 绑定第三方（Google / Microsoft / Apple） |

---

## ✅ 教师端与学生端差异最小化建议

| 模块 | 教师端独有 | 学生端独有 |
| --- | --- | --- |
| Notifications | Grading completed | Assignment feedback |
| Preferences | Teaching formats | Learning formats |
| Privacy | Class visibility | Study group visibility |

两端共享统一 UI，只隐藏不同的行项（同一代码结构可通过 role 控制渲染）。

---