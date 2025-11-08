# Settings 模块产品需求文档 (PRD)

## 文档信息
- **版本**: v1.0
- **最后更新**: 2025-11-08
- **适用对象**: 教师端和学生端
- **模块类型**: 静态页面/Mock数据

---

## 一、产品概述

### 1.1 模块定位
Settings（设置）模块是用户管理个人账户、个性化偏好和隐私安全的统一入口，为教师和学生提供完整的配置管理能力。

### 1.2 设计原则
- **层级清晰**: 按照用户心智模型，分为基础层、学习/教学层、安全层
- **统一体验**: 教师端和学生端共享相同UI结构，仅内容差异
- **渐进展示**: 低频高级选项折叠隐藏，减少认知负担
- **即时反馈**: 操作结果实时展示，状态变化清晰可见

---

## 二、功能架构

### 2.1 模块结构

```
Settings
├── Account                  (账户信息)
├── Notifications           (通知设置)
├── Preferences            (偏好设置)
├── Privacy & Security     (隐私与安全)
└── About Insight AI       (关于)
```

### 2.2 导航设计
- **左侧侧边栏**: 5个主模块入口，带图标和描述
- **右侧内容区**: 展示当前选中模块的详细设置
- **默认页面**: 访问 `/settings` 自动重定向至 `/settings/account`

---

## 三、功能详细需求

### 3.1 Account（账户信息）

#### 功能描述
管理用户个人资料、身份信息和密码。

#### 核心功能

| 模块 | 功能点 | 说明 | 交互方式 |
|------|--------|------|----------|
| **头像管理** | 上传头像 | 支持 JPG/PNG/GIF，最大5MB | 按钮触发 |
|  | 删除头像 | 恢复默认头像 | 按钮确认 |
| **基本信息** | 姓名 | 可编辑 | 文本输入框 |
|  | 用户名 | 可编辑 | 文本输入框 |
|  | 邮箱 | 带验证状态标识 | 输入框+徽章 |
|  | 手机号 | 可选填写 | 文本输入框 |
| **学校角色** | 学校名称 | 只读，系统管理 | 信息展示 |
|  | 角色/职位 | 只读，系统管理 | 信息展示 |
|  | 部门 | 只读，系统管理 | 信息展示 |
|  | 工号/学号 | 只读，系统管理 | 信息展示 |
| **密码修改** | 修改密码 | 展开表单：当前密码、新密码、确认密码 | 按钮切换状态 |

#### Mock数据示例
```javascript
{
  name: "Dr. Sarah Johnson",
  username: "sarah.johnson",
  email: "sarah.johnson@school.edu",
  emailVerified: true,
  phone: "+1 (555) 123-4567",
  school: "Lincoln High School",
  role: "Mathematics Teacher",
  department: "Mathematics",
  employeeId: "T-2024-089",
  passwordLastChanged: "3 months ago"
}
```

---

### 3.2 Notifications（通知设置）

#### 功能描述
分层管理通知渠道和类别，支持高级自定义。

#### 核心功能

**1. 通知渠道** (Notification Channels)

| 渠道 | 说明 | 控件 |
|------|------|------|
| Email | 邮件通知 | Toggle开关 |
| Push | 推送通知 | Toggle开关 |
| In-App | 应用内通知 | Toggle开关 |

**2. 通知类别** (Notification Categories)

| 类别 | 教师端 | 学生端 | 控件 |
|------|--------|--------|------|
| Class Updates | ✅ 课程更新 | ✅ 课程更新 | Toggle开关 |
| Assignment Submissions | ✅ 作业提交 | ❌ | Toggle开关 |
| Assignment Feedback | ❌ | ✅ 作业反馈 | Toggle开关 |
| Grading Completed | ✅ 批改完成 | ❌ | Toggle开关 |
| Student Messages | ✅ 学生消息 | ❌ | Toggle开关 |
| Parent Messages | ✅ 家长消息 | ❌ | Toggle开关 |
| System Alerts | ✅ 系统提醒 | ✅ 系统提醒 | Toggle开关 |

**3. 高级设置** (Advanced Settings - 可折叠)

| 功能 | 说明 | 控件 |
|------|------|------|
| Quiet Hours | 免打扰时段，设置起止时间 | Toggle + 时间选择器 |
| Reminder Timing | 提醒时机（30分钟前/1小时前/1天前） | 单选按钮组 |

#### 交互逻辑
- 所有Toggle开关支持即时切换
- 高级设置默认折叠，点击展开
- Quiet Hours开启后显示时间选择器

---

### 3.3 Preferences（偏好设置）

#### 功能描述
个性化界面布局、内容格式和语言显示。

#### 核心功能

**1. Layout & View（布局与视图）**

| 设置项 | 选项 | 说明 |
|--------|------|------|
| 布局密度 | Compact / Comfortable / Spacious | 卡片式选择 |
| 默认作业视图 | List / Grid / Kanban | 下拉选择 |
| 默认排序 | Due Date / Created / Title / Status | 下拉选择 |

**2. Teaching/Learning Formats（教学/学习格式偏好）**

| 内容类型 | 教师端 | 学生端 | 控件 |
|----------|--------|--------|------|
| Video Content | ✅ | ✅ | 复选框卡片 |
| Reading Materials | ✅ | ✅ | 复选框卡片 |
| Interactive Content | ✅ | ✅ | 复选框卡片 |

**3. Language & Display（语言与显示）**

| 设置项 | 选项 | 控件 |
|--------|------|------|
| 语言 | English / 中文 / Español / Français / Deutsch | 下拉选择 |
| 时区 | 主要时区列表 | 下拉选择 |
| 日期格式 | MM/DD/YYYY / DD/MM/YYYY / YYYY-MM-DD | 下拉选择 |

**4. Accessibility（无障碍 - 可折叠）**

| 功能 | 说明 |
|------|------|
| High Contrast Mode | 高对比度模式 |
| Larger Text | 大字体 |
| Reduce Motion | 减少动画 |
| Screen Reader Optimizations | 屏幕阅读器优化 |

---

### 3.4 Privacy & Security（隐私与安全）

#### 功能描述
管理账户安全、隐私控制和危险操作。

#### 核心功能

**1. 密码安全**

| 信息 | 内容 |
|------|------|
| 最后修改时间 | 显示距今时间 |
| 密码强度 | Strong / Medium / Weak（徽章展示） |
| 修改密码 | 按钮触发修改流程 |

**2. 双因素认证**

| 功能 | 说明 |
|------|------|
| 启用/关闭 | Toggle开关 |
| 认证方式 | Authenticator App / SMS（单选） |
| 设置流程 | 按钮触发配置向导 |

**3. 档案可见性**

| 级别 | 说明 |
|------|------|
| Public | 所有人可见 |
| School Only | 仅本校成员可见 |
| Class Only | 仅本班级学生可见（教师端）/ 仅同班同学可见（学生端） |

**4. 危险区域 (Danger Zone)**

| 操作 | 说明 | 确认方式 |
|------|------|----------|
| Deactivate Account | 临时停用，可恢复 | 弹窗二次确认 |
| Delete Account | 永久删除，不可恢复 | 输入"DELETE"确认 |

---

### 3.5 About Insight AI（关于）

#### 功能描述
展示产品信息、帮助资源和法律声明。

#### 核心功能

| 模块 | 内容 |
|------|------|
| 产品标识 | Logo + 名称 |
| 版本信息 | 版本号 + 更新状态徽章 |
| 帮助链接 | Get help / Report issue / Send feedback |
| 法律条款 | Privacy Policy / Terms of Service |
| 开源声明 | 使用的开源技术列表 |

---

## 四、UI/UX 规范

### 4.1 布局规范
- **侧边栏宽度**: 280px
- **内容区最大宽度**: 800px
- **Section间距**: 32px
- **卡片圆角**: 8px
- **边框颜色**: `#E5E7EB`

### 4.2 交互组件

| 组件 | 使用场景 | 状态 |
|------|----------|------|
| Toggle Switch | 开关类设置 | On/Off |
| Radio Button | 单选项 | Selected/Default |
| Checkbox | 多选项 | Checked/Unchecked |
| Dropdown Select | 列表选择 | Expanded/Collapsed |
| Button | 主要操作 | Default/Hover/Disabled |
| Card | 选项组 | Active/Inactive |

### 4.3 颜色规范

| 用途 | 颜色值 | 说明 |
|------|--------|------|
| 主色调 | `#4F7FFF` | 按钮、激活状态 |
| 成功 | `#52C41A` | 成功提示、验证徽章 |
| 警告 | `#FF9800` | 警告信息 |
| 危险 | `#F5222D` | 删除、危险操作 |
| 文本主色 | `#1A1A1A` | 标题、正文 |
| 文本次要 | `#8C8C8C` | 描述、提示 |
| 背景 | `#FAFAFA` | 页面背景 |

---

## 五、教师端与学生端差异

### 5.1 功能差异

| 模块 | 差异点 | 教师端 | 学生端 |
|------|--------|--------|--------|
| **Account** | 角色显示 | Mathematics Teacher | Grade 10 Student |
| **Notifications** | 作业通知 | Assignment Submissions | Assignment Feedback |
|  | 批改通知 | Grading Completed | ❌ |
|  | 消息类型 | Student/Parent Messages | Teacher Messages |
| **Preferences** | 内容偏好 | Teaching Formats | Learning Formats |
| **Privacy** | 可见性 | Class visibility | Study group visibility |

### 5.2 共享内容
- UI布局和导航结构完全一致
- 所有CSS样式共用
- 交互逻辑和组件完全相同
- 通过 `role` 参数控制内容差异

---

## 六、技术实现要点

### 6.1 路由结构
```
/teacher/settings (或 /student/settings)
├── /account
├── /notifications
├── /preferences
├── /privacy
└── /about
```

### 6.2 关键组件
- `SettingsLayout`: 布局容器，包含侧边栏导航
- `ToggleSwitch`: 通用开关组件
- `Modal`: 危险操作确认弹窗

### 6.3 状态管理
- 使用 React `useState` 管理表单状态
- Mock数据硬编码在组件中
- 按钮点击无实际保存逻辑（仅UI反馈）

### 6.4 响应式设计
- 桌面端：侧边栏固定 + 内容区滚动
- 移动端：待实现（建议底部Tab切换）

---

## 七、未来扩展方向

### 7.1 功能增强
- [ ] Notifications: 自定义通知规则（如"只通知重要更新"）
- [ ] Preferences: AI个性化推荐控制开关
- [ ] Privacy: 数据导出/下载日志
- [ ] Account: 第三方账号绑定（Google/Microsoft/Apple）

### 7.2 性能优化
- [ ] 表单数据防抖保存
- [ ] 头像上传裁剪功能
- [ ] 多语言国际化 (i18n)

### 7.3 体验优化
- [ ] 表单验证错误提示
- [ ] 修改后离开页面提示（未保存提醒）
- [ ] 操作成功Toast提示

---

## 八、验收标准

### 8.1 功能完整性
- ✅ 5个主模块页面全部可访问
- ✅ 所有表单控件可交互（Toggle/Checkbox/Radio/Select）
- ✅ Modal弹窗正常显示和关闭
- ✅ 页面切换路由正确

### 8.2 UI一致性
- ✅ 设计符合整体风格规范
- ✅ 布局在常见分辨率下正常显示
- ✅ 字体、颜色、间距符合设计稿

### 8.3 代码质量
- ✅ 组件化合理，可复用性强
- ✅ CSS模块化，无全局污染
- ✅ Mock数据结构清晰
- ✅ 无Console报错

---

## 九、附录

### 9.1 相关文档
- `doc/Teacher_student_setting.md` - 原始需求分析
- `app/teacher/settings/` - 代码实现目录

### 9.2 参考设计
- Notion Settings
- GitHub Settings
- Linear Settings

### 9.3 Mock数据来源
所有数据均为静态Mock，不涉及真实API调用。

---

**文档结束**

