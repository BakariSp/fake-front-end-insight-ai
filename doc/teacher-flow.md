# 教师面板 - 需求文档

> **文档更新日期：** 2025-10-22  
> **更新内容：** 基于前端实际实现，优化了 D（沟通中心）和 H（资源库）模块的逻辑描述

---

## 📋 文档更新说明

本次更新重点优化了以下模块，使其与前端实际实现保持一致：

### ✅ D [沟通中心 / Communication Center]
- **更新内容：** 详细描述了四个标签页的数据展示逻辑和交互流程
- **核心变化：**
  - 明确了表格和卡片的展示结构
  - 详细说明了创建家长通知的表单字段和验证逻辑
  - 阐述了教师协作与资源库的数据共享关系
  - 规范了所有数据字段的定义和格式

### ✅ H [资源库 / Resource Library]
- **更新内容：** 重写了四个标签页的功能逻辑和文件夹导航机制
- **核心变化：**
  - 统一了文件数据结构（scope 字段）
  - 详细说明了文件夹导航的交互逻辑
  - 明确了不同 scope 的权限控制规则
  - 规范了筛选、搜索、收藏等功能的实现逻辑
  - 说明了与 Communication Center 的数据关系

### 🎯 后端开发指引

文档现已包含：
1. **清晰的数据字段定义**（JavaScript 格式，易于理解）
2. **明确的业务逻辑描述**（筛选条件、排序规则、权限控制）
3. **详细的交互流程说明**（用户操作 → 系统响应）
4. **数据关系说明**（模块间如何共享数据）

后端团队可根据文档中的逻辑描述自行设计 API 接口。

---

## A-登录

A[登录 / Login] -->|教师账号| B[教师主面板 / Teacher Dashboard]

[学生/教师端登录流程]

选择学校 -> 输入账户名（邮箱),密码 （接入Google account login）-> 进入学生/老师/dashboard

---

## **B-侧边栏**

B --> C‘[所有班级 / Classes] –-> C[班级管理详情]

B --> D[沟通中心 / Communication]

B --> G[AI 工具 / Magic Tools]

B --> H[资源库 / Resource Library]

B --> I[个人设置 / Settings]

B --> X[数据中心 / Data Overview]

---

## **C-班级管理详情界面**

C --> C0[班级概览 / Overview]

C --> C1[作业管理 / Assignments]

C --> C2[成绩管理 / Grades]

C --> C3[查看成员 / View Members]

C --> C4[文件管理 / Files]

---

[细节描述]

### C --> C0[班级概览 / Overview]

进入班级后看到的首页，包括如下信息：

1. 班级通知
2. 日历，关键事件节点
3. 课程相关信息:
    1. 最近上传作业情况 -> C1[作业管理 / Assignments]
    2. 以列表形式排列，包括：
        1. 作业名称，上传日期，截止日期
            1. 学生名字，上传日期，是否完成，AI评分（如启用了AI评分）
4. AI工具快速入口
    1. 发布新作业 --> E1[创建作业 / Create Assignment]
    2. 学生表现分析 --> C21[成绩总览 / Grade Overview]
        1. 预览内容包括：平均正确率/平均分， 可以用图标形式呈现

---

### C --> C1[作业管理 / Assignments]

C1 --> E1[创建作业 / Create Assignment]

C1 --> E2[查看作业列表 / Assignment List]

C1 --> E3[AI 批改结果 / AI Grading]

[细节描述]

**C1 --> E1[创建作业 / Create Assignment]**

创建作业步骤：

（可能需要有一个入口：老师选择 “AI生成作业”，是->AI生成环节步骤， 否->直接上传文件）

E1.a 上传文件流程：

1. 输入：作业标题，作业内容。
2. 上传：上传文件/从资源库内拉取文件（URL,PDF,图片,音频），设置截止日期。
3. Review,通过界面内提供的框选工具完成作业框选。
4. 完成上传，自动发布到现有班级。

E1.b AI生成步骤：

1. 输入：作业标题，作业内容。
2. 上传文件/从资源库内拉取文件（URL,PDF,图片），设置截止日期。
3. Review, 修改与调整生成的内容。(生成的作业主要以文字版，可能包括数学公式，语言为繁体中文/英语/简体中文）
4. 完成上传，自动发布到现有班级。

**C1 --> E2[查看作业列表 / Assignment List]**

信息层级：

1. 以列表的方式呈现，按照作业的名字进行归类（内容：学生名字，完成情况，上传日期，AI评分（如有）），首先展示最近一次的作业情况。
2. 点击某一学生的列表后：
3. 大列表向左收起，只展示关键信息：名字，完成情况，评分
4. 右边大屏展示学生作业的具体提交内容：
    1. 学生上传的作业内容：文本，图片
    2. AI评分的结果，分为总结和每题分析
    3. 老师操作：
        1. 修改评分
        2. 填写反馈（整体反馈）
        3. 从展示页面下方的“向前”，“向后”按钮切换不同的学生实现快速批阅

**C1 --> E3[AI 批改结果 / AI Grading]**

内容：

1. 总体的错误题目分布
2. 总体的完成度，得分/正确率
3. 教学建议

### C --> C2[成绩管理 / Grades]

C2 --> C21[成绩总览 / Grade Overview]

C4 --> C41[学习表现总结 / Learning Summary]

C4 --> C42[薄弱环节分析 / Weakness Analysis]

C4 --> C43[改进建议 / Improvement Suggestions]

[细节描述]

成绩管理是一个包括各个功能模块的集成页面，页面内所有的内容以卡片方式呈现，关注点在于对于班级成绩的宏观把控。

**C2 --> C21[成绩总览 / Grade Overview]**

成绩总览以图表形式存在，包括：学生平均成绩，平均提交率，可以按月/周进行查看。

**C2 --> C22[学习表现总结 / Learning Summary]**

**C4 --> C23[薄弱环节分析 / Weakness Analysis]**

**C4 --> C24[改进建议 / Improvement Suggestions]**

学习情况作为成绩的补充信息，包括：学生表现优/良好的知识点，学生表现薄弱的知识点。并且提供相应的改进建议。在信息不足的情况下可以使用占位符/或者缺省页面的设计，提示可以进行AI分析

![image.png](attachment:822391c7-2cad-4692-9c01-d586f6191885:image.png)

---

### C --> C3[查看成员 / View Members]

[细节描述]

进入「查看成员」页面后，教师可查看、管理本班学生与家长信息，并可快速执行与成员相关的操作。

---

1️⃣ **页面结构**

**顶部栏（班级概览与操作）**

- 显示班级名称与当前成员数量（学生人数 / 家长人数 / 教师人数）
- 搜索框：支持按学生姓名、家长姓名、教师姓名、邮箱、学号等关键词搜索
- 操作按钮：
    - **「生成邀请码」**：创建一个临时邀请码（可设置有效期和使用次数），供学生自主加入班级
    - **「批量导入成员」**：上传 Excel / CSV 文件（需包含学生姓名、邮箱、家长姓名、联系方式、学号等字段）
    - **「添加教师」**：为本班添加授课教师或助教（支持邮箱邀请或系统内选择）
    - **「导出名单」**：导出当前班级成员信息表

---

2️⃣**学生列表**

| 字段 | 描述 | 示例 |
| --- | --- | --- |
| 学生姓名 | 点击进入详情页 | 李明 |
| 学号 | 班级唯一标识 | S001 |
| 年级 / 分组 | 年级与分班信息 | 6A |
| 注册邮箱 | 绑定系统账户 | [liming@example.com](mailto:liming@example.com) |
| 家长姓名 | 可点击查看家长信息 | 王女士 |
| 家长联系方式 | 电话或邮箱 | 98765432 |
| 最近活跃时间 | 学生最近登录或作业提交时间 | 2025/10/12 |
| 状态 | 正常 / 待激活 / 已退出 | 正常 |

---

3️⃣ **教师列表**

**（新增模块：班级教师管理）**

| 字段 | 描述 | 示例 |
| --- | --- | --- |
| 教师姓名 | 点击查看教师资料 | 陈老师 |
| 邮箱 | 登录邮箱 | chen@example.com |
| 角色 | 主课教师 /  | 主课教师 |
| 授课科目 | 与班级对应学科 | 数学 |
| 加入日期 | 加入班级日期 | 2025/09/01 |
| 状态 | 活跃 / 已移除 | 活跃 |

**添加教师流程：**

1. 点击「添加教师」按钮
2. 弹出添加窗口，支持两种方式：
    - **系统邀请**：搜索并选择已注册教师账号（下拉搜索教师邮箱/姓名）
    - **邮箱邀请**：输入邮箱 → 系统发送邀请邮件（含注册或加入链接）
3. 设置角色：主课教师 / 助教 / AI课程教师
4. 点击确认后，系统自动更新班级教师列表

**移除教师：**

- 仅班级主教师或管理员可执行
- 需确认操作（弹窗提示“该教师将失去此班级访问权限”）

---

**4️⃣  快捷功能**

**筛选器**：按年级、完成状态、活跃度、作业提交率等筛选学生

**批量导入导出：**

- 导入模板字段：`姓名`、`邮箱`、`家长姓名`、`联系方式`、`学号`
- 系统自动识别重复账号并提示冲突解决选项

**生成邀请码：**

- 可设定有效期（例如7天）
- 可限制使用次数（默认30人）
- 支持“复制链接”或“下载二维码”形式分享给学生

---

**C3 → C31 [学生详情 / Student Profile]**

点击学生姓名后进入学生详情页，教师可查看单个学生的基本信息与作业表现概况。

**内容包括：**

1. **基本资料**
    - 学生姓名、学号、邮箱、加入班级日期
    - 家长姓名、联系方式
    - 学生状态（正常 / 待激活 / 已退出）
2. **作业与成绩汇总**
    - 最近5次作业的完成情况、得分、提交时间
    - 平均成绩、作业提交率
    - 作业趋势折线图（可视化最近成绩变化）
3. **教师备注**
    - 教师可以添加评语、记录课堂表现
    - 备注支持多条记录，按时间排序
4. **家长沟通记录**
    - 关联「通信中心 / Communication」模块（D）
    - 可快速查看近期消息往来与交流内容摘要

---

### C → C4 [文件管理 / Files]

教师可在「文件管理」页面上传、管理教学文件，或从资源库中选择已有文件。

此模块为所有教学内容（课程资料、作业附件、AI生成内容等）的统一文件入口。

---

**1️⃣页面结构**

- 班级名称与文件总数
- 搜索框（可按名称、类型、上传者、标签筛选）
- 操作按钮：
    - 「新建文件」（唯一主入口）
    - 「批量删除」
    - 「导出列表」

---

**2️⃣ 文件列表**

以列表形式展示所有文件，支持按类型、日期、上传者排序。

| 字段 | 描述 | 示例 |
| --- | --- | --- |
| 文件名称 | 可点击进入详情 | Lesson_Week1.pdf |
| 来源 | 本地上传 / 资源库导入 | 资源库导入 |
| 文件类型 | PDF / DOCX / 图片 / 视频 / 音频 | PDF |
| 上传者 | 上传教师姓名 | 陈老师 |
| 上传日期 | 2025/10/12 |  |
| 文件大小 | 自动显示 | 2.4MB |
| 关联对象 | 作业 / 课程 | 作业：Unit 2 |
| 操作 | 预览 / 下载 / 删除 |  |

---

**3️⃣ 新建文件流程**

**C4 → F1 [新建文件 / Create File]**

点击「新建文件」后弹出表单式界面，教师可从两种方式导入文件：

---

**F1.a 从资源库选择**

1. 打开资源库文件选择器（弹窗）
2. 可按标签（学科 / 年级 / 文件类型）筛选
3. 支持多选与预览
4. 点击「添加到本班级」后完成导入
5. 系统自动标记来源为「资源库导入」

---

**F1.b 上传本地文件**

1. 拖拽文件或点击上传区域选择文件
2. 支持多文件批量上传
3. 填写基础信息：
    - 文件名称（自动生成可编辑）
    - 标签分类（如“教材资料”、“作业附件”、“AI生成”）
    - 可选：关联课程或作业
4. 点击「上传」后文件将自动出现在文件列表中
5. 系统标记来源为「本地上传」

---

**4️⃣ 文件详情页**

**C4 → F2 [文件详情 / File Detail]**

显示单个文件的详细信息与引用情况。

**包含内容：**

- 文件预览（PDF/图片/视频）
- 文件元数据（名称、类型、大小、来源、上传时间、上传者）
- 关联对象（作业/课程）
- 操作：
    - 下载
    - 复制链接
    - 替换文件（保留引用关系）
    - 删除文件

---

**5️⃣ 数据与通信逻辑**

| 模块 | 读写方向 | 描述 |
| --- | --- | --- |
| 文件数据库（File DB） | 读取/写入 | 存储文件元数据 |
| 云存储（Storage Service） | 上传/下载 | 文件本体存储（如 AWS / Supabase） |
| 资源库数据库（Resource DB） | 读取 | 供导入文件选择 |
| 班级数据库（Class DB） | 读取/写入 | 建立文件与班级/课程/作业的关联关系 |

---

**6️⃣ 权限逻辑**

| 用户角色 | 权限 | 说明 |
| --- | --- | --- |
| 教师 | 上传 / 导入 / 删除 / 关联 | 完整权限 |
| 助教 | 上传 / 导入 / 编辑标签 | 无删除权限 |
| 学生 | 查看 / 下载 | 无上传权限 |

---

## D [沟通中心 / Communication Center]

沟通中心是教师、家长、学校管理层之间的主要信息交流枢纽，整合 **学校通知、家长沟通、教师协作、通讯录** 四大功能区。

核心目标：统一消息流通渠道，提高沟通效率与透明度。

**D → D1 [学校通知 / School Announcements]**

**D → D2 [家长通知 / Parent Notices]**

**D → D3 [教师协作 / Teacher Collaboration]**

**D → D4 [通讯录 / Contacts]**

---

### 页面整体结构与交互逻辑

**1️⃣ 顶部导航栏**

- 面包屑导航：Communication / [当前标签页名称]
- 语言切换器：支持 English / 中文 / 繁體中文

**2️⃣ 工具栏（Toolbar）**

- **搜索框**：搜索通知标题、内容、联系人等
- **日期筛选器**：支持选择日期范围（如 2025.10.01-2025.11.01）
- **操作按钮**：
  - Export（导出当前列表数据）
  - Create new notification（创建新通知，仅在家长通知标签显示）
  - Delete（删除选中项）

**3️⃣ 标签导航（Tab Navigation）**

四个标签页，点击切换内容区域：
- School Announcements（学校通知）
- Parent Notices（家长通知）
- Teacher Collaboration（教师协作）
- Contacts（通讯录）

**4️⃣ 内容区域**

根据当前标签页显示不同内容（详见各模块说明）

**5️⃣ 分页控制**

在 School Announcements 和 Parent Notices 标签页底部显示分页器

---

### D → D1 [学校通知 / School Announcements]

学校管理者或授权教师发送的全校性通知，教师端为只读查看模式。

**数据展示逻辑**

以表格形式展示学校通知列表：

| 列名 | 字段说明 | 数据逻辑 |
|------|----------|----------|
| ☑️ 选择框 | 支持全选和单选 | 用于批量导出或删除操作 |
| Title | 通知标题 + 状态标签 | 标题以粗体显示，旁边显示状态 Badge（unread/read/confirmed） |
| Sender | 发送人 | 从 target 字段提取第一个词显示 |
| Time | 发布时间 | 格式：YYYY.MM.DD HH:mm:ss |
| Audience | 受众范围 | 如 "All Teachers", "Grade 6 Teachers", "Math Department" |
| Details | 操作链接 | View（查看详情）、Edit（编辑，需权限）、Status（查看阅读状态） |

**数据字段定义**

```javascript
{
  id: string,
  title: string,
  content: string,
  publishDate: string,
  target: string, // 受众范围描述
  status: 'unread' | 'read' | 'confirmed',
  requireConfirmation: boolean, // 是否需要确认
  // 其他可选字段
  attachments: [],
  priority: 'low' | 'normal' | 'high',
}
```

**交互逻辑**

1. 点击 View → 弹出通知详情模态框，显示完整内容
2. 点击 Edit → 跳转编辑页面（需管理员权限）
3. 点击 Status → 查看已读/确认统计（readCount / totalRecipients）
4. 勾选通知 → 启用 Export / Delete 按钮

**权限控制**

- 普通教师：只读，可查看、导出
- 管理员/授权教师：可创建、编辑、删除学校通知

---

### D → D2 [家长通知 / Parent Notices]

教师向家长发送的班级通知，支持创建、查看统计。

**数据展示逻辑**

以表格形式展示家长通知列表：

| 列名 | 字段说明 | 数据逻辑 |
|------|----------|----------|
| ☑️ 选择框 | 支持全选和单选 | 用于批量导出或删除操作 |
| Title | 通知标题 | 可点击查看详情 |
| Type | 通知类型 | Badge 显示：general/homework/event/urgent/reminder |
| Send Date | 发送日期 | 格式：YYYY.MM.DD HH:mm:ss |
| Status | 已读状态 | 显示 "readCount/totalRecipients read"，如 "85/100 read" |
| Details | 操作链接 | View（查看详情）、Export（导出已读记录） |

**数据字段定义**

```javascript
{
  id: string,
  title: string,
  type: 'general' | 'homework' | 'event' | 'urgent' | 'reminder',
  content: string,
  sendDate: string,
  readCount: number, // 已读家长数
  totalRecipients: number, // 总接收家长数
  recipientType: 'class' | 'all', // 发送范围
  selectedClasses: [classId], // 选中的班级列表
  priority: 'low' | 'normal' | 'high',
  requireConfirmation: boolean,
}
```

**创建通知流程（模态框）**

点击 "Create new notification" 按钮，弹出表单模态框：

**表单字段：**

1. **Notification Title** * （必填）
   - 文本输入框
   
2. **Type** * （必填）
   - 下拉选择：General / Homework / Event / Urgent / Reminder
   
3. **Priority**
   - 下拉选择：Low / Normal / High
   
4. **Send To** * （必填）
   - 单选框组：
     - Specific Classes（选择特定班级）
     - All My Classes（所有我的班级）
   
5. **Select Classes** *（当选择 Specific Classes 时显示）
   - 复选框列表，显示教师的所有班级
   - 每个班级显示：班级名称、学生数、家长数
   - 示例：Math 101 - Section A (28 students • 52 parents)
   
6. **接收人数统计提示框**
   - 动态计算并显示："This notification will be sent to **104** parents"
   
7. **Message Content** * （必填）
   - 多行文本框（至少 6 行）
   - 支持换行
   
8. **Require parent confirmation**
   - 复选框：是否需要家长确认收到

**表单验证逻辑：**

- Title、Content、至少选择一个班级为必填
- 未满足条件时，"Send Notification" 按钮禁用

**发送流程：**

1. 点击 "Send Notification" → 按钮显示加载状态（Sending...）
2. 模拟 API 请求（1.5秒）
3. 成功后显示成功页面：
   - 绿色勾选图标
   - 标题："Notification Sent Successfully!"
   - 内容："Your notification has been sent to X parents across Y classes."
4. 2秒后自动关闭模态框

**交互逻辑**

1. 点击 View → 查看通知详情及已读统计
2. 点击 Export → 导出该通知的家长已读记录（CSV/Excel）
3. 接收人数动态计算 → 根据选中班级实时计算总家长数

---

### D → D3 [教师协作 / Teacher Collaboration]

教师协作模块展示教师组内共享的文件资源，数据来源于资源库（Resource Library），通过 `scope: group` 区分。

**重要说明：** 此标签页为展示型页面，实际文件管理操作在 Resource Library 中进行。教师协作模块与资源库共用同一文件数据库。

**数据展示逻辑**

以卡片列表形式展示教师组共享文件：

**卡片结构：**

```
┌─────────────────────────────────────────────────────┐
│ [文件图标]  文件名称                          [Download] │
│            文件描述                                    │
│            [组名Badge] By 上传者 • 上传日期            │
└─────────────────────────────────────────────────────┘
```

**数据字段定义**

```javascript
{
  id: string,
  fileName: string,
  description: string,
  groupName: string, // 教师组名称，如 "Math Department", "Grade 6 Team"
  groupId: string,
  uploadedBy: string, // 上传教师姓名
  uploadDate: string, // 格式：YYYY.MM.DD
  fileUrl: string, // 文件下载链接
  fileType: string, // pdf, doc, ppt, etc.
  fileSize: string, // 如 "2.4 MB"
  scope: 'group', // 必须为 group
}
```

**交互逻辑**

1. 卡片悬浮 → 显示阴影提升效果
2. 点击 Download 按钮 → 下载文件
3. 点击卡片任意处 → 预览文件（可选功能）

**数据来源逻辑**

- 后端筛选条件：`scope === 'group' AND groupId IN [教师所属的组ID列表]`
- 只显示教师有权限访问的组文件
- 按上传时间倒序排列（最新的在前）

**文件上传/管理**

- 上传新文件 → 跳转到 Resource Library（H → H2 School Resources）
- 组织文件结构 → 在 Resource Library 中操作
- 此处仅作为快捷查看入口

**教师组权限逻辑**

| 角色 | 查看 | 下载 | 上传 | 编辑 | 删除 |
|------|------|------|------|------|------|
| 组长 | ✅ | ✅ | ✅ | ✅ | ✅ |
| 组员 | ✅ | ✅ | ✅ | ❌ | ❌（仅自己上传的） |
| 非组员 | ❌ | ❌ | ❌ | ❌ | ❌ |

**与 Resource Library 的关系**

- Communication Center → Teacher Collaboration：快速查看组内最新文件
- Resource Library → School Resources：完整的文件管理功能
- 两者数据同步，共享同一数据源

---

### D → D4 [通讯录 / Contacts]

通讯录以卡片网格形式展示教师可联系的人员，包括教师、家长、管理员。

**数据展示逻辑**

以网格布局展示联系人卡片（每行 3-4 个卡片，响应式调整）：

**卡片结构：**

```
┌─────────────────────────┐
│ [头像]         [Role Badge] │
│ 姓名                        │
│ 关联信息（如学生名）         │
│ 📧 邮箱                    │
│ 📱 电话（可选）             │
│ [Send Message 按钮]        │
└─────────────────────────┘
```

**数据字段定义**

```javascript
{
  id: string,
  name: string,
  role: 'parent' | 'teacher' | 'admin',
  email: string,
  phone: string, // 可选
  relatedStudent: string, // 如果是家长，显示关联学生
  avatar: string, // 头像 URL，如无则显示首字母
  department: string, // 如果是教师，所在部门（可选）
}
```

**卡片样式逻辑**

1. **头像显示：**
   - 有头像 → 显示头像图片
   - 无头像 → 显示首字母圆形徽章（渐变背景色）

2. **角色徽章颜色：**
   - Parent → 蓝色（info）
   - Teacher → 绿色（success）
   - Admin → 橙色（warning）

3. **关联信息：**
   - 家长 → 显示 "Parent of [学生名]"
   - 教师 → 显示部门或科目（可选）
   - 管理员 → 不显示

**搜索过滤逻辑**

- 搜索框输入 → 实时过滤卡片
- 搜索范围：姓名、邮箱
- 不区分大小写
- 空搜索 → 显示全部联系人

**交互逻辑**

1. 卡片悬浮 → 显示阴影提升效果
2. 点击 "Send Message" → 打开发送消息功能（跳转或弹窗）
3. 点击邮箱/电话 → 复制到剪贴板（可选）

**数据来源逻辑**

教师可查看的联系人范围：
- 所有教师和管理员
- 所教班级的学生家长
- 合作教师组成员

后端应返回经过权限过滤的联系人列表。

---

## H [资源库 / Resource Library]

资源库是教学文件的统一管理中心，包含**教师个人上传、学校共享资源、AI推荐内容、收藏夹**四大分类。

**核心特点：** 统一的文件数据库，通过 `scope` 字段区分文件归属和权限。

---

### 页面整体结构与交互逻辑

**1️⃣ 顶部操作栏（Action Bar）**

- 左侧：页面标题 "Resource Library" 或 面包屑导航（进入文件夹时显示）
- 右侧操作按钮：
  - "Import from Library"（从库中导入）
  - "Upload New File"（上传新文件）

**2️⃣ 标签导航（Tabs）**

四个标签页，点击切换内容：
- 📁 My Uploads（我的上传）
- 🏫 School Resources（学校资源）
- ✨ AI Recommended（AI 推荐）
- ⭐ Favorites（收藏夹）

每个标签显示文件数量，如 "My Uploads (12)"

**3️⃣ 筛选栏（Filters Bar）**

- **搜索框**：搜索文件名、描述、标签
- **学科筛选**：All Subjects / Mathematics / English / Science / General
- **类型筛选**：All Types / PDF / Video / Presentation / Document / Link

**4️⃣ 快速统计卡片（仅在主视图显示，文件夹内不显示）**

四个统计卡片横排显示：
- Total Resources（总资源数）
- AI Recommendations（AI 推荐数）
- Total Downloads（总下载次数）
- Favorites（收藏数）

**5️⃣ 内容区域**

资源卡片网格布局（每行 2-3 个卡片，响应式调整）

---

### 统一文件数据结构

所有标签页共用的资源数据字段：

```javascript
{
  id: string,
  title: string,
  description: string,
  type: 'folder' | 'pdf' | 'video' | 'ppt' | 'doc' | 'link',
  subject: string, // 学科分类
  uploadedBy: string, // 上传者姓名
  uploadDate: string, // 格式：YYYY.MM.DD
  fileSize: string, // 如 "2.4 MB"（文件夹无此字段）
  downloads: number, // 下载次数（可选）
  tags: string[], // 标签数组
  scope: 'personal' | 'school' | 'group' | 'class',
  isFavorite: boolean, // 是否已收藏
  
  // AI 推荐专用字段
  isAIRecommended: boolean,
  recommendationReason: string, // 如 "Similar to your recent uploads"
  
  // 文件夹专用字段
  folder: string, // 所属文件夹名称（可选）
  itemCount: number, // 文件夹内文件数（type === 'folder' 时）
}
```

---

### H → H1 [我的上传 / My Uploads]

教师个人上传的文件资源。

**数据来源逻辑**

- 后端筛选条件：`scope === 'personal' AND uploadedById === 当前教师ID`
- 显示教师自己上传的所有文件
- 按上传时间倒序排列

**资源卡片展示**

每个文件以卡片形式展示，包含：

```
┌────────────────────────────────────────┐
│ [文件类型图标]    [学科Badge][类型Badge]   │
│                   [scope Badge]         │
│ 文件标题（粗体）                          │
│ 文件描述                                 │
│ [标签1] [标签2] [标签3]                  │
│ ─────────────────────────────────────  │
│ 👤 上传者 • 📅 日期 • 📄 大小 • ⬇️ 下载数  │
│ [View] [Download] [⭐]                  │
└────────────────────────────────────────┘
```

**文件类型图标颜色**

- PDF → 红色 (#E53E3E)
- Video → 紫色 (#9B51E0)
- PPT → 橙色 (#D97706)
- Doc → 蓝色 (#2563EB)
- Link → 绿色 (#059669)

**操作按钮**

- View（查看/预览文件）
- Download（下载文件）
- ⭐（收藏/取消收藏，填充状态表示已收藏）

**权限逻辑**

- 教师可查看、编辑、删除自己上传的文件
- 可设置文件为 "仅自己" 或 "共享给组/学校"

---

### H → H2 [学校资源 / School Resources]

学校层级的共享资源，支持文件夹导航。

**数据来源逻辑**

- 后端筛选条件：`scope IN ['school', 'group'] AND 教师有权限访问`
- 包含两类资源：
  - 全校共享文件（`scope: 'school'`）
  - 教师组文件（`scope: 'group'`，组员可见）

**文件夹导航逻辑**

1. **根目录视图**
   - 显示所有文件夹（`type === 'folder'`）
   - 显示根目录下的文件（`folder 字段为空`）

2. **进入文件夹**
   - 点击文件夹卡片 → 进入该文件夹
   - 顶部显示面包屑：`[← Back] / [文件夹图标] 文件夹名称`
   - 只显示该文件夹内的文件（`folder === 文件夹名称`）

3. **返回**
   - 点击 "Back" 按钮 → 返回根目录
   - 隐藏快速统计卡片（仅根目录显示）

**文件夹卡片特殊样式**

- 渐变背景：浅黄色渐变 (#FFFBF0 → #FFF7E6)
- 边框：金黄色 (#FFE7BA)
- 悬浮效果：更强的阴影和位移
- 显示文件数量 Badge："12 items"

**文件夹结构示例**

```
School Resources
├─ [📁] School Templates (校级模板) - scope: school
│   ├─ Lesson_Plan_Template.doc
│   ├─ Assessment_Template.xlsx
│
├─ [📁] Math Department (数学组) - scope: group
│   ├─ Week3_Exercises.pdf
│   ├─ Unit_Test.doc
│
├─ [📁] Grade 6 Team (六年级组) - scope: group
    ├─ Field_Trip_Plan.pdf
```

**与 Communication Center 的关系**

- Communication → Teacher Collaboration 显示的文件来自这里的 `scope: 'group'` 文件
- 在此上传的组文件会自动显示在 Teacher Collaboration
- 数据同步，单一数据源

**权限逻辑**

| 角色 | School 文件 | Group 文件 |
|------|-------------|-----------|
| 管理员 | 上传/编辑/删除 | 上传/编辑/删除 |
| 组长 | 查看/下载 | 上传/编辑/删除 |
| 组员 | 查看/下载 | 查看/下载/上传 |
| 非组员 | 查看/下载 | 无权限 |

---

### H → H3 [AI 推荐 / AI Recommended]

AI 根据教师教学行为推荐的相关资源。

**数据来源逻辑**

- 后端筛选条件：`isAIRecommended === true AND 为当前教师推荐`
- AI 推荐算法考虑因素：
  - 教师上传的文件类型和主题
  - 教师所教班级的年级和学科
  - 同组教师常用资源
  - 全校热门资源

**AI 推荐理由卡片**

在标签页顶部显示蓝色提示卡片：
```
✨ AI Recommended for You
Personalized teaching materials based on your class 
performance and teaching patterns
```

**资源卡片增强**

每个推荐资源显示推荐理由：
```
┌─ AI 推荐理由框 ─────────────────┐
│ ⭐ Similar to your recent uploads │
└────────────────────────────────┘
```

推荐理由示例：
- "Similar to your recent uploads"
- "Popular in Math Department"
- "Frequently used by Grade 6 teachers"
- "Matches your class performance data"

**交互逻辑**

- 点击收藏 → 自动添加到 Favorites
- 点击下载 → 记录教师偏好，优化后续推荐

---

### H → H4 [收藏夹 / Favorites]

教师收藏的重要资源快速访问区。

**数据来源逻辑**

- 后端筛选条件：`isFavorite === true AND userId === 当前教师ID`
- 包含教师从任何标签页收藏的文件
- 按收藏时间倒序排列（最近收藏的在前）

**资源来源标识**

每个收藏资源显示原始 scope Badge：
- Personal（个人）
- School（学校）
- Group（教师组）

**交互逻辑**

- 点击 ⭐ → 取消收藏，卡片从列表移除
- 点击 View/Download → 与原文件操作一致
- 空状态 → 显示提示："No resources found. Try adding some favorites!"

---

### 筛选与搜索逻辑（全局适用）

**搜索逻辑**

实时搜索，过滤以下字段：
- `title`（文件标题）
- `description`（文件描述）
- `tags`（标签数组）

不区分大小写，支持部分匹配。

**学科筛选逻辑**

- 选择特定学科 → 只显示 `subject === 选中学科` 的资源
- All Subjects → 显示所有

**类型筛选逻辑**

- 选择特定类型 → 只显示 `type === 选中类型` 的资源
- All Types → 显示所有
- 文件夹不受类型筛选影响（始终显示）

**多重筛选组合**

搜索 + 学科 + 类型 = AND 逻辑（同时满足所有条件）

---

### 空状态处理

当筛选后无结果时，显示：
```
[空文档图标]
No resources found
Try adjusting your filters or upload new resources
```

---

### 后端数据需求总结

**必需数据表：**

1. **Files 表**（文件元数据）
   - 存储所有文件信息
   - 包含 scope 字段区分归属

2. **TeacherGroups 表**（教师组关系）
   - 教师与组的多对多关系
   - 组长/组员角色标识

3. **Favorites 表**（收藏关系）
   - 教师与文件的收藏关系
   - 收藏时间戳

4. **AIRecommendations 表**（AI 推荐）
   - 为特定教师生成的推荐
   - 推荐理由和分数

**关键查询逻辑：**

- 根据 scope 和用户权限过滤文件
- 支持文件夹层级查询
- 统计下载次数、收藏数
- AI 推荐算法生成

## G [AI工具 / Magic Tools] (UI完成）

AI 工具用于辅助教师快速生成、改写、上传与组织教学材料，

所有生成的内容自动保存到 **资源库（H）** 中（scope = personal 或 group），

并可一键分发至班级或课程。

**G --> G1[AI 教学材料生成 / Lesson Plan Generator]**

**G --> G2[AI 作业生成 / Assignment Generator]**

**G --> G5[AI 辅导对话 / AI Tutoring Chat]**

**G --> G8[题目上传 / AI Material Upload]**

---

### G - 总体功能逻辑

| 模块 | 功能 | 输出 | 存储位置 |
| --- | --- | --- | --- |
| G1 | AI 教学材料生成 | 教案 / 活动策划文档 | Resource Library（personal / group） |
| G2 | AI 作业生成 | 练习题 / 作业文件 | Resource Library（class） |
| G5 | AI 辅导对话 | 交互式辅导对话记录 / 题目推荐 | 临时（可导出至 Resource Library） |
| G8 | 题目上传（AI理解） | 手动上传题目，AI自动识别结构 | Resource Library（class） |

---

### G → G1 [AI 教学材料生成 / Lesson Plan Generator]

教师可基于现有教案、课程文件或教学目标生成新的课程方案。

---

**功能流程**

1️⃣ **输入来源**

- 上传文件（PDF / DOCX / PPT）
- 从 Resource Library 选择参考资料
- 或输入文字主题（例：“六年级英语 Unit 3 活动策划”）

2️⃣ **AI 生成设置**

- 班级选择（生成内容可适配班级层级）
- 语言选择（繁中 / 简中 / 英文）
- 生成方向选项：
    - 教学目标（Learning Objectives）
    - 活动流程（Activity Design）
    - 知识点讲解（Concept Breakdown）
    - 课后练习（Optional）

3️⃣ **生成结果展示**

- 分区显示（目标 / 内容 / 方法 / 材料）
- 可编辑（内嵌富文本编辑器）
- 可导出为 DOCX / PDF

4️⃣ **保存与导出**

- 自动保存至 Resource Library：
    
    ```
    scope: personal
    tags: ["lesson_plan", "AI_generated"]
    ```
    
- 可选择共享至教师组（scope → group）
- 一键“添加到班级文件”

---

**输出格式示例**

```
标题：Unit 3 - Food & Culture 教学计划
目标：学生能描述食物种类并表达喜好
活动：
  - 活动1：图片配对（5分钟）
  - 活动2：食物介绍对话（10分钟）
AI生成建议：为低年级学生简化词汇表

```

---

### G → G2 [AI 作业生成 / Assignment Generator]

教师可使用 AI 自动生成练习题、阅读理解或简答题集。

---

**功能流程**

1️⃣ **输入设置**

- 上传材料（文本 / PDF / 图片）
- 选择题目类型：
    - 选择题 / 填空题 / 阅读理解 / 开放题
- 指定年级与学科
- 可勾选「AI生成答案与评分标准」

2️⃣ **生成预览**

- 以题目卡片形式展示：题干 + 答案 + 解析（可编辑）
- 支持手动调整难度 / 修改题干

3️⃣ **导出与保存**

- 可直接生成作业文件（Word / PDF）
- 自动保存至：
    
    ```
    scope: class
    tags: ["assignment", "AI_generated"]
    related_class: class_id
    ```
    
- 可选择 “发布到班级作业管理（C1）”

---

**输出示例**

```
题目1：Which of the following is NOT a fruit?
A. Apple  B. Banana  C. Carrot  D. Orange
答案：C
解析：Carrot 是蔬菜。

```

---

### G → G5 [AI 辅导对话 / AI Tutoring Chat]

一个面向教师与学生的 AI 对话功能，用于生成个性化学习支持与反馈。

教师端主要用于生成 AI 建议或模拟辅导策略。

---

**功能流程**

1️⃣ **输入模式选择**

- 教师模式（教学支持 / 问题讲解）
- 学生模式（练习辅导 / 作业问答）

2️⃣ **对话窗口**

- 用户输入教学问题或作业主题
- AI 进行多轮辅导与建议生成
- 支持“导出为教学提示 / 题目列表 / 对话记录”

3️⃣ **导出内容**

- 可保存至 Resource Library：
    
    ```
    scope: personal
    tags: ["tutoring_session", "AI_chat"]
    
    ```
    
- 或转为作业（调用 G2 作业生成接口）

---

**示例**

> 教师输入：“请帮我为六年级英语课设计口语练习环节。”
> 
> 
> AI 回复：
> 
> - 任务：两人一组模拟点餐
> - 支持文件：Food Menu.pdf
> - 时长：8分钟
> - 可配合视频素材推荐

---

### G → G8 [题目上传 / AI Material Upload]

用于将教师已有题目资料数字化，让 AI 自动识别结构、题型与答案。

---

**功能流程**

1️⃣ **上传文件**

- 支持格式：PDF / Word / 图片
- 支持批量上传

2️⃣ **AI解析**

- 自动识别题目结构与答案区域
- 输出 JSON 结构：
    
    ```json
    {
      "type": "multiple_choice",
      "question": "What is 2+2?",
      "options": ["1","2","3","4"],
      "answer": "4"
    }
    
    ```
    

3️⃣ **编辑与校对**

- 教师可在线编辑识别结果
- 批量导出或生成题库文件

4️⃣ **保存**

- 自动归档至 Resource Library：
    
    ```
    scope: class
    tags: ["uploaded_material", "AI_parsed"]
    
    ```
    

---

 **数据与通信逻辑**

| 模块 | 读写方向 | 描述 |
| --- | --- | --- |
| AI Engine | 读/写 | 调用模型生成或解析内容 |
| 文件数据库（File DB） | 写 | 保存生成内容的元信息 |
| 资源库（Resource DB） | 写 | 文件归档与索引 |
| 班级数据库（Class DB） | 读/写 | 对应班级作业绑定 |
| 用户数据库（User DB） | 读 | 教师身份信息与权限 |

---

**权限逻辑**

| 角色 | 权限 |
| --- | --- |
| 教师 | 使用全部 AI 工具，生成/保存内容 |
| 助教 | 使用 AI 生成与上传，但不可发布班级作业 |
| 学生 | 仅可访问 AI 辅导对话（学生模式） |
| 管理员 | 管理模型接口与使用日志 |

---

**可视化建议**

- 左侧栏：AI 工具菜单（Lesson Plan / Assignment / Tutoring / Upload）
- 中间区域：生成内容编辑区（富文本或卡片）
- 右侧栏：参数设置 + 导出选项
- 顶部：
    - 「保存到资源库」
    - 「发布到班级」
    - 「导出文件」

---

## I [个人设置 / Personal Settings]

个人设置模块提供教师、管理员等用户对账号信息、通知方式、安全选项、语言及订阅状态的自主管理。

目标：提升账户安全性、信息可控性与使用体验个性化。

---

**模块结构**

| 模块编号 | 名称 | 功能概要 |
| --- | --- | --- |
| I1 | 账号信息 / Account Info | 个人资料与登录信息管理 |
| I2 | 通知偏好 / Notification Settings | 控制系统通知、邮件与站内消息偏好 |
| I3 | 权限与安全 / Privacy & Security | 登录设备、密码、安全验证管理 |
| I4 | 语言设置 / Language | 系统界面语言切换 |
| I5 | 支付与订阅 / Billing | 账户套餐与账单管理 |

---

### I → I1 [账号信息 / Account Info]

用户可查看与修改个人基本资料。

**显示信息**

| 字段 | 描述 | 示例 |
| --- | --- | --- |
| 姓名 | 用户注册姓名 | 陈老师 |
| 角色 | 教师 / 管理员 / 学生 | 教师 |
| 邮箱 | 系统登录邮箱 | chen@example.com |
| 手机号码 | 可选绑定 | +852 9123 4567 |
| 所属机构 | 学校名称 / 组织 | 圣提摩亚中学 |
| 教师编号 | 系统自动生成 | T-00125 |

**功能**

- 编辑姓名 / 手机号
- 更换头像（支持 JPG / PNG）
- 查看账号注册时间、最近登录时间
- 连接第三方账户（Google / Microsoft）
- 可选展示字段（隐藏邮箱、隐藏手机号）

---

### I → I2 [通知偏好 / Notification Settings]

控制系统内外的消息发送方式与接收范围。

**通知类型**

| 类型 | 内容 | 默认状态 |
| --- | --- | --- |
| 系统通知 | 平台更新、账号变动提示 | 开启 |
| 班级活动通知 | 学校/班级层级的活动提醒 | 开启 |
| 家长消息 | 家长端回复或确认提醒 | 开启 |
| 教师协作更新 | 教师组文件更新、公告 | 开启 |
| AI 工具生成结果 | AI生成完成通知 | 开启 |

**通知渠道**

- 站内消息（默认）
- 邮件通知（可选）
- 手机推送（可选）

**功能**

- 单独开关每类通知
- 设置「请勿打扰」时间段
- 设置邮件汇总频率（实时 / 每日 / 每周）

---

### I → I3 [权限与安全 / Privacy & Security]

管理账号登录安全性与隐私设置。

**安全设置**

| 项目 | 功能 | 示例 |
| --- | --- | --- |
| 登录密码 | 修改 / 重置密码 | ****** |
| 双重验证（2FA） | 开启后需输入验证码 | 开启 |
| 登录设备记录 | 显示最近登录设备与时间 | MacBook / 2025-10-12 |
| 登出所有设备 | 一键退出所有设备 | 按钮操作 |

**权限控制**

- 显示账号所属角色与层级权限（教师 / 管理员）
- 支持申请权限提升（例如成为班级管理员）
- 隐私选项：
    - 是否公开邮箱给其他教师查看
    - 是否接收家长私信

---

### I → I4 [语言设置 / Language]

用户可在多语言间自由切换，适配香港与国际学校的教学环境。

**可选语言**

- 繁体中文
- 简体中文
- English

**功能**

- 即时切换，无需刷新
- 语言偏好同步到数据库（下次登录自动应用）
- AI生成内容默认语言可独立设置

---

### I → I5 [支付与订阅 / Billing]

适用于学校或个人账户的订阅管理与账单查询。

**显示信息**

| 字段 | 描述 |
| --- | --- |
| 当前套餐 | 免费版 / 专业版 / 学校版 |
| 到期时间 | 2026/10/12 |
| 使用人数 | 当前已分配教师数 |
| 账单历史 | 按月显示发票记录 |

**功能**

- 升级套餐（跳转到支付页面）
- 下载发票（PDF）
- 管理支付方式（信用卡 / 学校账户）
- 设置自动续费开关

---

**通信与数据逻辑**

| 模块 | 读写方向 | 描述 |
| --- | --- | --- |
| 用户数据库（User DB） | 读/写 | 账号与基础信息 |
| 通知数据库（Comm DB） | 读/写 | 通知偏好与状态 |
| 权限数据库（Auth DB） | 读 | 角色与安全设置 |
| 语言配置（Locale Service） | 读/写 | 多语言状态 |
| 支付服务（Billing API） | 读/写 | 套餐与账单信息 |

---

**可视化建议**

- 左侧：设置菜单（账号 / 通知 / 安全 / 语言 / 支付）
- 右侧：表单内容区
- 顶部：保存修改按钮 + 成功反馈提示
- 安全部分可单独以卡片区块形式展示

---