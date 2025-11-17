Ben：注册，登录，dashboard，class，notification
Linghang：Insighttool，resource lib，settings，communication

# A - 注册

A[登录 / Login] -->|教师账号| B[教师主面板 / Teacher Dashboard]

[学生/教师端登录流程]

选择学校 -> 输入账户名（邮箱),密码 （接入Google account login）-> 进入学生/老师/dashboard

# A - 登录

A[登录 / Login] -->|教师账号| B[教师主面板 / Teacher Dashboard]

[学生/教师端登录流程]

选择学校 -> 输入账户名（邮箱),密码 （接入Google account login）-> 进入学生/老师/dashboard

---

# **B - 侧边栏**

A[登录 / Login] --> B[学生主面板 / Student Dashboard]

B --> C‘[所有班级 / Classes]

B --> D[沟通中心 / Communication]

B --> G[AI 工具 / Insight Tools]

B --> H[资源库 / Resource Library]

B --> I[个人设置 / Settings]

---

# C‘ → C [班级详情 / Class Detail]

C --> C0[班级概览 / Overview]
C --> C1[我的作业 / My Assignments]
C --> C2[我的成绩 / My Grades]
C --> C3[班级成员 / Class Members]

C1 --> C11[作业详情 / Assignment Detail]
C2 --> C21[成绩趋势 / Grade Trends]
C2 --> C22[薄弱环节分析 / Weakness Analysis]
C2 --> C23[学习建议 / Learning Suggestions]

---

学生查看自己加入的班级与作业表现的主要入口。

**页面结构**

- 班级名称与老师信息
- 课程进度 / 日历
- 近期通知（来自教师）
- 当前作业与成绩预览

**功能模块**

## C --> C0[班级概览 / Overview]

| 字段 | 描述 | 示例 |
| --- | --- | --- |
| 班级名称 | 班级唯一标识 | 六年级A班 |
| 班级教师 | 班级主要授课教师 | 陈老师 |
| 课程进度 | 当周进度或阶段任务 | 第3单元：分数加减 |
| 最近作业 | 最近布置的1-2个作业 | 作业#5 英语阅读理解 |
| 成绩趋势 | 最近三次成绩简要图表 | 折线图展示平均分趋势 |
| 班级公告 | 来自教师端同步 | “下周五小测验” |

## C --> C1[我的作业 / My Assignments]

学生可查看、提交与跟踪所有作业状态。

| 字段 | 描述 | 示例 |
| --- | --- | --- |
| 作业标题 | 作业名称，点击进入详情 | Unit 3 阅读理解 |
| 科目 | 课程类型 | 英语 |
| 截止日期 | 作业提交截止时间 | 2025/10/20 |
| 状态 | 未提交 / 已提交 / 已批改 | 已批改 |
| 提交时间 | 学生上次提交时间 | 2025/10/18 20:43 |
| AI评分 | 若教师启用AI批改则显示分数 | 92 / 100 |
| 教师反馈 | 教师文字评语摘要 | “阅读理解进步明显” |
| 操作 | 点击进入作业详情页 | [查看详情] |

**C1[我的作业 / My Assignments] -->[点击任意作业] -->C11[作业详情 / Assignment Detail]**

| 字段名 | 类型 | 描述 | 示例 |
| --- | --- | --- | --- |
| assignment_id | string | 作业唯一标识 | A20251012_ENG001 |
| title | string | 作业标题 | Unit 3 阅读理解 |
| subject | string | 科目 | 英语 |
| due_date | datetime | 截止时间 | 2025-10-20 23:59 |
| status | enum | 未提交 / 已提交 / 已批改 | 已批改 |
| submit_time | datetime | 提交时间 | 2025-10-18 20:43 |
| file_url | string[] | 上传文件地址 | [“/uploads/A2025_1.pdf”] |
| ai_score | float | AI评分（可选） | 92.5 |
| ai_feedback | text | AI生成反馈 | “阅读理解逻辑清晰” |
| teacher_feedback | text | 教师评语 | “注意细节题的理解” |
| ai_explain_link | link | 跳转到AI讲解界面 | /magic/ai_tutor?task=A2025 |
| retry_link | link | 跳转至错题复练 | /magic/review?task=A2025 |

---

## **C1 → C11[作业详情 / Assignment Detail]**

**页面内容**

| 模块 | 功能描述 |
| --- | --- |
| 文件预览区 | 显示已提交内容（PDF、图片等） |
| 状态提示 | 显示“等待教师批改 / AI评分中” |
| 编辑限制 | 不可重新上传或修改文件 |
| 撤回按钮（可选） | 若教师允许撤回，在截止日期前可撤回提交 |
| 提示文字 | “系统将在教师批改后更新结果” |

学生进入单个作业的详细页面。此页面根据作业状态（未提交 / 已提交 / 已批改）动态显示不同模块。

**内容结构：**

- 作业信息（标题、截止时间、状态、AI评分、反馈）
- 文件预览（支持图片 / PDF / 视频）
- AI批改结果区：
    - 总分
    - 各题得分
    - AI讲解摘要（如启用）
- 教师反馈（文本 / 音频）
- 「查看类似练习」按钮 → 跳转至 G1[AI 学习助手 / AI Learning Tutor]

**根据提交状态：**

1. **未提交：C11 -->C11a[提交作业]--> C1**
2. **已提交未批改：C11 -->C11b[重新提交/查看提交状态]--> C1**
3. **已批改：C11 -->C11c[查看批改内容] -->G1[AI 学习助手 / AI Learning Tutor]**
4. **进一步学习：C11 -->C11d[查看AI讲解]→ 跳转 Magic Tools → G1[AI 学习助手]**

---

### **C11 -->C11a[提交作业]**

**页面内容**

| 模块 | 功能描述 |
| --- | --- |
| 作业信息区 | 显示标题、说明、截止日期、上传要求（文件类型/数量限制） |
| 文件上传区 | 支持拖拽或选择上传 PDF / 图片 / 音频 / 视频 |
| 文本输入区（可选） | 可填写简短回答或说明性文字 |
| 预览区 | 显示已选文件，可删除/替换 |
| 提交按钮 | 「提交作业」→ 确认弹窗（确认后不可再编辑） |

**流程步骤**

1. 学生点击作业卡片 → 进入详情页
2. 查看作业要求（教师发布的内容）
3. 上传文件（或输入文字答案）
4. 点击【提交作业】
5. 弹出确认提示「提交后不可修改，是否确认？」
6. 确认提交 → 显示成功提示 + 时间戳
7. 状态变为「已提交」

---

### **C11 -->C11b[重新提交/查看提交状态]**

**页面内容**

| 模块 | 功能描述 |
| --- | --- |
| 文件预览区 | 显示已提交内容（PDF、图片等） |
| 状态提示 | 显示“等待教师批改 / AI评分中” |
| 编辑限制 | 不可重新上传或修改文件 |
| 撤回按钮（可选） | 若教师允许撤回，在截止日期前可撤回提交 |
| 提示文字 | “系统将在教师批改后更新结果” |

---

### **C11 -->C11c[查看批改内容]**

### 页面内容

| 模块 | 功能描述 |
| --- | --- |
| 文件预览区 | 显示学生提交文件 |
| AI评分结果区 | 总分、正确率、各题分析、AI讲解摘要 |
| 教师反馈区 | 教师评语（文字/语音） |
| 作业总览卡 | 显示分数、反馈、提交时间 |
| 操作区 | 「查看AI讲解」→ 跳转 G1[AI 学习助手] |
| 重新练习按钮 | 跳转至 G2[错题分析] |

**界面结构层级**

1. 顶部信息区：标题 + 状态 + 分数
2. 中间文件区：预览作业（PDF/图片）
3. 下方反馈区：AI评分 + 教师评语
4. 底部推荐区：查看AI讲解 / 重新练习

---

## C --> C2[我的成绩 / My Grades]

- 图表展示个人作业趋势（折线图）
- 各科平均分与班级平均比较
- 薄弱环节分析（AI生成）
- 学习建议（AI生成）

## C --> C3[班级成员 / Class Members]

- 查看班级老师与同学名单（仅查看权限）
- 可快速查看教师资料与联系入口（跳转沟通中心）

---

# D. 沟通中心 / Communication

**B --> D[沟通中心 / Communication]**
- **D --> D1[学校通知 / School Announcements]**
- **D --> D2[教师消息 / Teacher Messages]**
- **D --> D3[联系人 / Contacts]**

---

## **D --> D1[学校通知 / School Announcements]**

显示学校与班级层级公告。学生可查看内容详情、标记已读或确认收到。

| 字段 | 描述 | 示例 |
| --- | --- | --- |
| 通知标题 | 公告名称 | "校际英语比赛报名" |
| 发布对象 | 学校 / 班级 | 六年级A班 |
| 发布时间 | 通知发布日期 | 2025/10/12 |
| 状态 | 已读 / 未读 / 已确认 | 已确认 |
| 附件 | PDF / 图片等附件 | report.pdf |
| 操作 | 查看详情 / 标记已读 / 确认收到 | [查看] |

---

## **D --> D2[教师消息 / Teacher Messages]**

展示教师针对学生发布的消息或作业提醒。

| 字段 | 描述 | 示例 |
| --- | --- | --- |
| 消息标题 | 教师发送主题 | "本周阅读作业延后提交" |
| 教师姓名 | 消息来源 | 陈老师 |
| 发布时间 | 时间戳 | 2025/10/14 |
| 消息类型 | 通知 / 提醒 / 活动 | 作业提醒 |
| 状态 | 已读 / 未读 | 未读 |
| 关联作业 | 相关作业（可选） | A20251010_003 |
| 操作 | 查看详情 / 回复 | [打开] |

---

## **D --> D3[联系人 / Contacts]**

展示教师与学校管理人员联系信息，支持搜索与分组显示。

**分组显示：**

### **分组 1：已选班级教师**
- 显示学生已加入班级的所有任课教师
- 根据学生的班级（如：中五A班）自动筛选

### **分组 2：学校联系人**
- 年级主任
- 学务处职员
- 辅导老师
- 其他学校管理人员

**数据字段：**

| 字段 | 描述 | 示例 |
| --- | --- | --- |
| 姓名 | 联系人姓名 | Mr. Wong Chi Wai |
| 职位 | 职位标题 | 数学科主任 |
| 电话 | 联系电话 | 9123 4567 |
| 邮箱 | 电子邮箱 | wong.cw@school.edu.hk |
| 科目 | 任教科目（仅教师） | 数学 |
| 班级 | 所教班级（仅教师） | 中五A班, 中五B班 |

**功能：**
- 搜索联系人（姓名 / 职位 / 邮箱）
- 查看联系方式
- 发送消息

---

# B --> G[AI 工具 / Insight Tools]

为学生提供学习辅助与激励的模块。

**⚠️ 当前实施状态：**
- ✅ G1[AI 学习助手] 已上线
- 🔥 G4[学习统计分析] 优先开发中（为AI对话提供数据支持）
- ⏸️ G2、G3 第二期规划

**B --> G[AI 工具 / Insight Tools]**
- **G --> G1[AI 学习助手 / AI Learning Tutor]** ✅ 已上线
- **G --> G2[错题分析 / Mistake Analysis]** ⏸️ 待开发
- **G --> G3[学习成就系统 / Achievement System]** ⏸️ 待开发
- **G --> G4[学习统计分析 / Learning Analytics]** 🔥 优先级高

---

## **G --> G1[AI 学习助手 / AI Learning Tutor]** ✅ MVP版本

AI 对话式教学助手，提供简洁的学习问答功能。

### **核心功能**

#### **1. 对话功能**

| 功能 | 描述 |
| --- | --- |
| 文本输入 | 学生输入任何学习相关问题 |
| 文件上传 | 支持上传作业文件（PDF、DOC、图片等）协助讲解 |
| AI响应 | 实时生成教学内容，提供学习辅导 |
| 输入提示 | 显示"Ask AI Learning Tutor..." |
| **角色模板选择** 🎭 | **（可选功能）选择不同科目/情境的AI导师角色** |

#### **1.1 AI 角色模板（可选功能）** 🎭

学生可选择不同的AI导师角色，针对HKDSE不同科目和学习情境进行专业辅导。

**功能说明：**
- 通过System Prompt切换AI的专业角色和回答风格
- 开始新对话时可选择角色模板（可选，默认为通用导师）
- 每个历史会话记录使用的角色模板

**HKDSE 科目角色模板：**

| 角色名称 | 图标 | 科目领域 | System Prompt 定位 |
| --- | --- | --- | --- |
| 通用学习导师 | 🎓 | 全科 | 友善耐心的通用导师，适合任何科目问题 |
| 数学导师 | 🔢 | Mathematics / M1 / M2 | 擅长步骤式讲解，强调数学逻辑与解题方法 |
| 英语导师 | 📝 | English Language | 注重语法、写作技巧、阅读理解分析 |
| 中文导师 | 📖 | Chinese Language | 专注文言文、写作、阅读理解与修辞手法 |
| 科学导师 | 🧪 | Physics / Chemistry / Biology | 用实验与生活例子解释科学概念 |
| 文科导师 | 🏛️ | History / Geography / Economics | 强调概念理解、案例分析、答题结构 |
| 考试策略导师 | 🎯 | 应试技巧 | 专注HKDSE答题技巧、时间管理、考试策略 |

**数据结构扩展：**

```typescript
interface AIRole {
  id: string;                  // 角色ID
  name: string;                // 角色名称（中/英）
  icon: string;                // 角色图标
  subject: string;             // 适用科目
  systemPrompt: string;        // System Prompt内容
  description: string;         // 角色描述
}

interface ChatHistory {
  id: string;                  
  title: string;               
  timestamp: Date;             
  messages: Message[];
  roleId?: string;             // 使用的角色模板ID（新增）
}
```

**交互设计：**

1. **角色选择入口**
   - 方式1：点击"New Chat"时弹出角色选择面板
   - 方式2：在输入区域旁边添加角色切换下拉菜单
   - 方式3：历史记录显示所用角色的图标标识

2. **角色选择面板**
   - 网格布局展示所有角色卡片
   - 每个卡片显示：图标 + 角色名称 + 简短描述
   - 点击选择后开始新对话

3. **使用提示**
   - 对话页面顶部/输入框上方显示当前角色：
     - 例如："🔢 正在与数学导师对话"
   - 历史记录中显示角色图标标识

**System Prompt 示例：**

```
【数学导师】
你是一位专业的HKDSE数学导师，擅长用清晰的步骤讲解数学问题。
- 使用步骤式分解（Step 1, Step 2...）
- 强调数学概念和公式的应用
- 鼓励学生独立思考，提供引导式提问
- 使用中英双语术语（适应HKDSE考试语境）

【英语导师】
You are an experienced HKDSE English tutor specializing in language skills.
- Focus on grammar, vocabulary, and writing techniques
- Provide examples and explanations in clear English
- Help students understand reading comprehension strategies
- Offer constructive feedback on writing

【考试策略导师】
你是HKDSE应试专家，专注于帮助学生提升考试表现。
- 分析各科答题技巧与常见陷阱
- 提供时间管理和备考策略
- 分享Past Paper解题思路
- 强调考评局评分标准
```

#### **2. AI个性化能力（集成G4数据）** 🆕

**数据驱动的个性化对话：**
- AI可以调用G4[学习统计分析]接口获取学生的学习数据
- 根据学生的实际表现提供针对性建议
- 自动识别学生的薄弱环节和优势科目

**支持的个性化场景：**
- 学习表现查询："我最近表现怎么样？"
- 科目分析："我哪个科目需要加强？"
- 错误点分析："我经常在哪里犯错？"
- 学习习惯反馈："我的提交习惯好吗？"
- 复习计划建议："我应该重点复习什么？"

**技术实现：**
- 当检测到学生询问学习状态相关问题时，AI自动调用G4接口
- 将学生数据作为Context传递给AI模型
- AI基于真实数据生成可信、可执行的建议

*详见G4[学习统计分析]的"AI对话集成"部分*

#### **3. 对话历史记录** 🔥

**历史列表显示**
- 右侧边栏展示所有历史对话
- 按时间倒序排列（最新在最上方）
- 每个历史记录显示：
  - 对话标题（自动取首条用户消息内容）
  - 对话时间（相对时间显示）

**历史记录管理**
- 点击历史记录加载完整对话内容
- 每条记录右侧有删除按钮（🗑️）
- "New Chat" 按钮（蓝色）开始新对话
- 历史记录持久化存储（Mock数据）

**数据结构**

```typescript
interface Message {
  id: string;                  // 消息唯一ID
  role: 'user' | 'assistant';  // 消息角色
  content: string;             // 消息内容
  timestamp: Date;             // 消息时间戳
}

interface ChatHistory {
  id: string;                  // 会话唯一ID
  title: string;               // 会话标题
  timestamp: Date;             // 会话创建时间
  messages: Message[];         // 完整消息列表
}
```

**交互逻辑**
- 点击"New Chat"清空当前对话，开始新会话
- 点击历史记录，加载该会话的完整消息
- 点击删除按钮，移除该历史记录
- 删除当前会话时，自动跳转到欢迎页面

#### **4. 界面布局**

| 区域 | 位置 | 内容 |
| --- | --- | --- |
| 顶部导航 | 顶部 | 返回Insight Toolkits + 页面标题"AI Tutor" + 通知图标 + 语言切换 |
| 消息显示区 | 中部左侧主区域 | AI头像 + 欢迎语"AI Learning Tutor"<br>"How can I help you today?" |
| 输入区 | 底部 | 📎文件上传按钮 + 输入框 + ↑发送按钮 |
| 历史侧边栏 | 右侧 | "Chat History"标题 + "New Chat"按钮 + 历史列表 |

#### **5. 欢迎页面**

初始状态/新对话显示：
- 居中显示AI图标（蓝色渐变球体）
- 标题："AI Learning Tutor"
- 副标题："How can I help you today?"

#### **6. 路由与跳转**

| 来源页面 | 跳转场景 | 目标路径 |
| --- | --- | --- |
| Insight Toolkits | 点击"AI Tutor"卡片 | `/student/insight-tools/ai-tutor` |
| 任意页面 | 通过侧边栏导航 | `/student/insight-tools/ai-tutor` |

---

## **G --> G2[错题分析 / Mistake Analysis]** ⏸️ 第二期计划功能

**功能规划：**

- 自动收集学生的错题数据（来自AI评分或教师批改）
- 分类展示：科目 / 知识点 / 时间
- 支持"重新练习"按钮跳转到AI辅导区

**AI功能：**

- 自动总结高频错误类型
- 生成针对性练习集

---

## **G --> G3[学习成就系统 / Achievement System]** ⏸️ 第二期计划功能

**功能规划：**

- 根据学生学习行为与AI交互奖励勋章：
    - 💡 完成首个AI任务
    - 🔥 连续登录7天
    - 📈 成绩提升5%以上
    - 🎯 完成错题复习计划
- 显示个人成长档案（可视化进步曲线）
- 每个成就带有激励语（"继续努力！你正在成为更好的自己！"）

---

## **G --> G4[学习统计分析 / Learning Analytics]** 🔥 优先级高

为学生提供全面的学习数据统计与分析，并作为AI对话的数据源，帮助AI生成个性化学习建议。

### **核心功能**

#### **1. 学生学习档案接口（Student Learning Profile API）**

**用途：**
- 为学生提供可视化的学习统计页面
- 为G1[AI学习助手]提供数据接口，生成个性化对话内容
- 帮助学生了解自己的学习状态与进步趋势

**数据结构：**

```typescript
interface StudentLearningProfile {
  // 基本信息
  studentInfo: {
    studentId: string;          // 学号
    name: string;               // 姓名
    grade: string;              // 年级（如：中五 / S5）
    academicYear: string;       // 学年（如：2024-2025）
  };
  
  // 跨班级作业表现统计
  assignmentPerformance: {
    totalAssignments: number;        // 总作业数
    submittedAssignments: number;    // 已提交数
    gradedAssignments: number;       // 已批改数
    pendingAssignments: number;      // 待提交数
    submissionRate: number;          // 提交率（%）
    onTimeRate: number;              // 按时提交率（%）
    averageScore: number;            // 平均分
    scoreRange: {                    // 分数分布
      excellent: number;             // 90-100分作业数
      good: number;                  // 80-89分作业数
      fair: number;                  // 70-79分作业数
      needsImprovement: number;      // <70分作业数
    };
  };
  
  // 各班级详细表现
  classSummary: Array<{
    classId: string;              // 班级ID
    className: string;            // 班级名称（如：中五A班数学）
    subject: string;              // 科目
    teacher: string;              // 教师名称
    assignmentCount: number;      // 该班级作业数
    averageScore: number;         // 该班级平均分
    submissionRate: number;       // 该班级提交率
    recentTrend: 'improving' | 'stable' | 'declining';  // 趋势
    lastSubmission: Date;         // 最后提交时间
  }>;
  
  // 各科目表现分析
  subjectAnalysis: Array<{
    subject: string;              // 科目名称
    assignmentCount: number;      // 作业数量
    averageScore: number;         // 平均分
    highestScore: number;         // 最高分
    lowestScore: number;          // 最低分
    trend: 'improving' | 'stable' | 'declining';  // 趋势
    scoreHistory: Array<{         // 分数历史（用于绘制折线图）
      date: Date;
      score: number;
      assignmentTitle: string;
    }>;
  }>;
  
  // 常见错误点分析
  commonMistakes: Array<{
    subject: string;              // 科目
    topic: string;                // 知识点/主题
    mistakeCount: number;         // 错误次数
    lastOccurred: Date;           // 最后出现时间
    relatedAssignments: string[]; // 相关作业ID列表
    aiSuggestion: string;         // AI建议（可选）
  }>;
  
  // 学习趋势分析
  trendAnalysis: {
    overallTrend: 'improving' | 'stable' | 'declining';  // 整体趋势
    recentPerformance: {
      last7Days: {
        assignmentsCompleted: number;
        averageScore: number;
      };
      last30Days: {
        assignmentsCompleted: number;
        averageScore: number;
      };
    };
    strengthSubjects: string[];   // 优势科目列表
    weaknessSubjects: string[];   // 薄弱科目列表
    improvementRate: number;      // 进步率（%，相比上月）
  };
  
  // 学习习惯统计
  learningHabits: {
    averageSubmissionTime: string;      // 平均提交时间（如：22:30）
    preferredStudyDays: string[];       // 常用学习日（如：["Monday", "Wednesday"]）
    procrastinationRate: number;        // 拖延率（截止前24h内提交的比例）
    earlySubmissionRate: number;        // 提前提交率（截止前48h提交的比例）
  };
}
```

#### **2. 页面展示（学生端）**

**页面路径：** `/student/insight-tools/learning-analytics`

**界面布局：**

| 区域 | 位置 | 内容 |
| --- | --- | --- |
| 顶部概览卡片 | 顶部 | 4个关键指标卡片：总作业数、提交率、平均分、整体趋势 |
| 科目表现图表 | 中部左侧 | 各科目平均分对比（柱状图/雷达图） |
| 分数趋势图表 | 中部右侧 | 最近30天分数变化（折线图） |
| 班级详情表格 | 下方 | 各班级作业表现详细列表 |
| 常见错误分析 | 底部左侧 | 高频错误知识点展示 |
| AI学习建议 | 底部右侧 | 基于数据的AI个性化建议 |

**数据可视化元素：**

1. **关键指标卡片**
   - 📊 总作业数：42
   - ✅ 提交率：95.2%
   - 📈 平均分：84.5
   - 🔥 整体趋势：进步中 (+5.2%)

2. **科目表现雷达图**
   - 显示各科目相对表现
   - 突出优势科目与薄弱科目

3. **分数趋势折线图**
   - X轴：时间（最近30天）
   - Y轴：分数
   - 多条线：不同科目

4. **班级表现表格**
   - 支持排序（按平均分、提交率、科目）
   - 趋势图标（↗️ ↘️ ➡️）

#### **3. AI对话集成（G1调用接口）**

**使用场景：**

当学生在G1[AI学习助手]中询问以下类型问题时，AI会自动调用G4接口获取数据：

| 学生问题示例 | AI调用数据 | AI回复示例 |
| --- | --- | --- |
| "我最近学习表现怎么样？" | `trendAnalysis`, `assignmentPerformance` | "根据你最近30天的表现，你完成了12项作业，平均分84.5，相比上月进步了5.2%！继续保持！" |
| "我哪个科目最弱？" | `subjectAnalysis`, `weaknessSubjects` | "根据统计，你的数学平均分是72分，低于其他科目。建议重点复习代数部分。" |
| "我经常犯什么错误？" | `commonMistakes` | "你在物理科目的'力学分析'知识点上出现了5次错误，建议重新复习相关概念。" |
| "我的提交习惯好吗？" | `learningHabits` | "你的按时提交率是88%，但有35%的作业在截止前24小时内提交。建议提前规划时间。" |
| "我应该重点复习什么？" | `commonMistakes`, `weaknessSubjects` | "建议优先复习：1) 数学-二次方程 2) 物理-力学分析 3) 英语-写作结构" |

**API调用逻辑：**

```typescript
// AI对话系统调用示例
async function getPersonalizedResponse(userQuestion: string, studentId: string) {
  // 1. 分析用户问题意图
  const intent = analyzeIntent(userQuestion);
  
  // 2. 根据意图调用G4接口获取相关数据
  if (intent.needsLearningData) {
    const learningProfile = await fetchStudentLearningProfile(studentId);
    
    // 3. 将数据作为Context传递给AI
    const aiContext = {
      userQuestion,
      studentData: learningProfile,
      systemPrompt: "根据学生的学习数据，提供个性化建议..."
    };
    
    // 4. 生成个性化回复
    return await generateAIResponse(aiContext);
  }
}
```

**System Prompt 扩展（支持数据调用）：**

```
你是一位AI学习导师。当学生询问学习表现、进步情况或需要建议时，
你可以调用以下数据接口：

- studentInfo: 学生基本信息（年级、学年）
- assignmentPerformance: 作业整体表现统计
- classSummary: 各班级详细表现
- subjectAnalysis: 各科目分析
- commonMistakes: 常见错误点
- trendAnalysis: 学习趋势
- learningHabits: 学习习惯

根据这些数据，为学生提供：
1. 客观的数据分析
2. 具体的改进建议
3. 鼓励性的反馈
4. 可执行的学习计划
```

#### **4. Mock数据示例**

```typescript
const mockStudentProfile: StudentLearningProfile = {
  studentInfo: {
    studentId: "S2024001",
    name: "陈小明",
    grade: "中五 (S5)",
    academicYear: "2024-2025"
  },
  assignmentPerformance: {
    totalAssignments: 42,
    submittedAssignments: 40,
    gradedAssignments: 38,
    pendingAssignments: 2,
    submissionRate: 95.2,
    onTimeRate: 88.0,
    averageScore: 84.5,
    scoreRange: {
      excellent: 15,
      good: 18,
      fair: 4,
      needsImprovement: 1
    }
  },
  classSummary: [
    {
      classId: "C001",
      className: "中五A班数学",
      subject: "数学 (Mathematics)",
      teacher: "黄老师",
      assignmentCount: 12,
      averageScore: 78.5,
      submissionRate: 100,
      recentTrend: "improving",
      lastSubmission: new Date("2024-11-15")
    },
    {
      classId: "C002",
      className: "中五A班英语",
      subject: "英语 (English)",
      teacher: "Mrs. Wong",
      assignmentCount: 15,
      averageScore: 88.2,
      submissionRate: 93.3,
      recentTrend: "stable",
      lastSubmission: new Date("2024-11-14")
    }
    // ... 更多班级
  ],
  subjectAnalysis: [
    {
      subject: "数学 (Mathematics)",
      assignmentCount: 12,
      averageScore: 78.5,
      highestScore: 95,
      lowestScore: 65,
      trend: "improving",
      scoreHistory: [
        { date: new Date("2024-10-01"), score: 72, assignmentTitle: "代数练习1" },
        { date: new Date("2024-10-08"), score: 75, assignmentTitle: "代数练习2" },
        { date: new Date("2024-10-15"), score: 82, assignmentTitle: "函数图像" },
        // ... 更多记录
      ]
    }
    // ... 更多科目
  ],
  commonMistakes: [
    {
      subject: "数学",
      topic: "二次方程求解",
      mistakeCount: 5,
      lastOccurred: new Date("2024-11-10"),
      relatedAssignments: ["A001", "A005", "A012"],
      aiSuggestion: "建议复习配方法和求根公式的应用"
    },
    {
      subject: "物理",
      topic: "力学分析-自由体图",
      mistakeCount: 3,
      lastOccurred: new Date("2024-11-12"),
      relatedAssignments: ["A018", "A022"],
      aiSuggestion: "练习绘制自由体图，注意力的方向标注"
    }
    // ... 更多错误点
  ],
  trendAnalysis: {
    overallTrend: "improving",
    recentPerformance: {
      last7Days: {
        assignmentsCompleted: 3,
        averageScore: 87.3
      },
      last30Days: {
        assignmentsCompleted: 12,
        averageScore: 84.5
      }
    },
    strengthSubjects: ["英语", "化学", "经济"],
    weaknessSubjects: ["数学", "物理"],
    improvementRate: 5.2
  },
  learningHabits: {
    averageSubmissionTime: "22:30",
    preferredStudyDays: ["Monday", "Wednesday", "Saturday"],
    procrastinationRate: 35.0,
    earlySubmissionRate: 42.0
  }
};
```

#### **5. 路由与导航**

| 来源页面 | 跳转场景 | 目标路径 |
| --- | --- | --- |
| Insight Toolkits | 点击"Learning Analytics"卡片 | `/student/insight-tools/learning-analytics` |
| AI Tutor | AI建议"查看详细统计" | `/student/insight-tools/learning-analytics` |
| 侧边栏 | 通过导航菜单 | `/student/insight-tools/learning-analytics` |

#### **6. 与其他模块的关联**

- **G1[AI学习助手]**: 调用G4数据接口，生成个性化对话
- **G2[错题分析]**: 共享`commonMistakes`数据
- **G3[学习成就系统]**: 共享`trendAnalysis`数据用于成就判定
- **C2[我的成绩]**: 提供更详细的跨班级统计视角

---

## **G4 数据追踪需求与板块联动**

### **核心数据追踪清单**

为实现 G4[学习统计分析]功能，学生端需要持续追踪和存储以下数据：

#### **1. 学生基础数据（来源：系统注册）**

| 数据字段 | 类型 | 说明 | 存储位置 | 更新频率 |
| --- | --- | --- | --- | --- |
| studentId | string | 学号（唯一标识） | User Profile | 注册时设置，不变 |
| name | string | 学生姓名 | User Profile | 可修改 |
| grade | string | 年级（如：中五/S5） | User Profile | 每学年更新 |
| academicYear | string | 学年（如：2024-2025） | User Profile | 每学年更新 |
| email | string | 邮箱 | User Profile | 可修改 |
| enrolledClasses | string[] | 已加入班级ID列表 | User Profile | 加入/退出班级时更新 |

**数据来源模块：**
- A[注册/登录] → 初始化学生信息
- I[个人设置] → 更新个人资料
- C[班级] → 更新班级归属

---

#### **2. 作业提交记录（来源：C1[我的作业]）**

| 数据字段 | 类型 | 说明 | 存储位置 | 更新频率 |
| --- | --- | --- | --- | --- |
| assignmentId | string | 作业唯一ID | Assignment Submission | 每次作业创建 |
| classId | string | 所属班级ID | Assignment Submission | 每次作业创建 |
| subject | string | 科目名称 | Assignment Submission | 每次作业创建 |
| title | string | 作业标题 | Assignment Submission | 每次作业创建 |
| dueDate | datetime | 截止时间 | Assignment Submission | 每次作业创建 |
| submitTime | datetime | 实际提交时间 | Assignment Submission | 提交时记录 |
| status | enum | 状态（未提交/已提交/已批改） | Assignment Submission | 状态变化时更新 |
| fileUrls | string[] | 提交文件链接 | Assignment Submission | 提交时记录 |
| textAnswer | text | 文字答案（可选） | Assignment Submission | 提交时记录 |

**关键计算字段：**
- `isOnTime`: boolean → 判断是否按时提交（submitTime ≤ dueDate）
- `isProcrastination`: boolean → 判断是否拖延（dueDate - submitTime < 24h）
- `isEarly`: boolean → 判断是否提前（dueDate - submitTime ≥ 48h）
- `submissionDelay`: number → 提交延迟时间（小时）

**数据来源模块：**
- **C1[我的作业]** → 学生查看作业列表
- **C11a[提交作业]** → 记录提交时间和文件
- **C11b[查看提交状态]** → 更新作业状态

---

#### **3. 作业批改结果（来源：C11c[查看批改内容]）**

| 数据字段 | 类型 | 说明 | 存储位置 | 更新频率 |
| --- | --- | --- | --- | --- |
| assignmentId | string | 作业ID（关联） | Assignment Grade | 批改完成时 |
| aiScore | float | AI评分 | Assignment Grade | AI批改完成时 |
| teacherScore | float | 教师评分（最终分数） | Assignment Grade | 教师批改完成时 |
| aiFeedback | text | AI生成反馈 | Assignment Grade | AI批改完成时 |
| teacherFeedback | text | 教师评语 | Assignment Grade | 教师批改完成时 |
| correctRate | float | 正确率（%） | Assignment Grade | 批改完成时 |
| questionScores | json | 各题得分详情 | Assignment Grade | 批改完成时 |
| gradedTime | datetime | 批改完成时间 | Assignment Grade | 批改完成时 |

**数据来源模块：**
- **C11c[查看批改内容]** → 显示批改结果
- **教师端批改系统** → 生成评分和反馈
- **AI评分引擎** → 自动批改和反馈

---

#### **4. 错题记录（来源：AI批改/教师批改）**

| 数据字段 | 类型 | 说明 | 存储位置 | 更新频率 |
| --- | --- | --- | --- | --- |
| mistakeId | string | 错题唯一ID | Mistake Record | 每次发现错误时 |
| assignmentId | string | 所属作业ID | Mistake Record | 发现错误时 |
| subject | string | 科目 | Mistake Record | 发现错误时 |
| topic | string | 知识点/主题 | Mistake Record | AI/教师标注 |
| questionNumber | string | 题号 | Mistake Record | 发现错误时 |
| mistakeType | string | 错误类型 | Mistake Record | AI分类 |
| occuredDate | datetime | 发生时间 | Mistake Record | 批改完成时 |
| isFixed | boolean | 是否已改正 | Mistake Record | 重新练习后更新 |
| fixedDate | datetime | 改正时间 | Mistake Record | 改正后更新 |
| aiAnalysis | text | AI错误分析 | Mistake Record | AI生成 |
| aiSuggestion | text | AI改进建议 | Mistake Record | AI生成 |

**聚合计算：**
- 按 `subject` + `topic` 聚合 → 生成 `commonMistakes` 数据
- 统计 `mistakeCount` → 高频错误排序
- 追踪 `lastOccurred` → 最近错误时间

**数据来源模块：**
- **C11c[查看批改内容]** → AI/教师标注错题
- **G2[错题分析]** → 消费和管理错题数据
- **AI批改引擎** → 自动识别错误点

---

#### **5. AI 对话记录（来源：G1[AI学习助手]）**

| 数据字段 | 类型 | 说明 | 存储位置 | 更新频率 |
| --- | --- | --- | --- | --- |
| chatHistoryId | string | 对话会话ID | Chat History | 创建会话时 |
| studentId | string | 学生ID | Chat History | 创建会话时 |
| title | string | 对话标题（自动生成） | Chat History | 创建会话时 |
| createdAt | datetime | 会话创建时间 | Chat History | 创建会话时 |
| lastUpdated | datetime | 最后更新时间 | Chat History | 每次消息时 |
| roleId | string | 使用的AI角色ID（可选） | Chat History | 创建会话时 |
| messageCount | number | 消息总数 | Chat History | 每次消息时 |
| relatedAssignmentId | string | 关联作业ID（可选） | Chat History | 如从作业跳转 |

**消息记录：**

| 数据字段 | 类型 | 说明 | 存储位置 | 更新频率 |
| --- | --- | --- | --- | --- |
| messageId | string | 消息唯一ID | Chat Message | 每条消息 |
| chatHistoryId | string | 所属会话ID | Chat Message | 每条消息 |
| role | enum | 消息角色（user/assistant） | Chat Message | 每条消息 |
| content | text | 消息内容 | Chat Message | 每条消息 |
| timestamp | datetime | 消息时间戳 | Chat Message | 每条消息 |
| fileAttachments | string[] | 附件文件URL（可选） | Chat Message | 有上传时 |
| feedbackRating | enum | 学生反馈（👍👎，可选） | Chat Message | 学生评价时 |

**聚合统计（用于 G4 和学习分析）：**
- AI交互总次数：count(所有对话会话)
- 最常咨询的科目：从对话内容或角色分析
- AI使用频率：按时间段统计会话数
- 学习主题分布：基于对话内容的主题分类

**数据来源模块：**
- **G1[AI学习助手]** → 所有对话记录
- **C11c[查看批改内容]** → "查看AI讲解"跳转时记录关联

**与 G4 的关系：**
- 提供AI使用统计数据
- 分析学生求助的知识点（补充 commonMistakes）
- 评估AI辅导效果（结合成绩趋势）

**隐私说明：**
- 对话记录仅学生本人可见
- 用于个性化学习建议，不对外分享
- 学生可随时删除历史对话

---

#### **6. 班级和科目映射（来源：C[班级]）**

| 数据字段 | 类型 | 说明 | 存储位置 | 更新频率 |
| --- | --- | --- | --- | --- |
| classId | string | 班级ID | Class Enrollment | 加入班级时 |
| className | string | 班级名称（如：中五A班数学） | Class Enrollment | 加入班级时 |
| subject | string | 科目名称 | Class Enrollment | 加入班级时 |
| teacherId | string | 教师ID | Class Enrollment | 加入班级时 |
| teacherName | string | 教师姓名 | Class Enrollment | 加入班级时 |
| enrollDate | datetime | 加入时间 | Class Enrollment | 加入班级时 |
| isActive | boolean | 是否当前班级 | Class Enrollment | 退出时更新 |

**数据来源模块：**
- **C[所有班级]** → 学生加入的班级列表
- **C3[班级成员]** → 班级和教师信息

---

### **数据聚合与计算规则**

#### **1. assignmentPerformance（作业表现统计）**

**计算方法：**
```typescript
const assignmentPerformance = {
  totalAssignments: count(所有作业),
  submittedAssignments: count(status === '已提交' || '已批改'),
  gradedAssignments: count(status === '已批改'),
  pendingAssignments: count(status === '未提交'),
  submissionRate: (submittedAssignments / totalAssignments) * 100,
  onTimeRate: (count(isOnTime === true) / submittedAssignments) * 100,
  averageScore: avg(teacherScore || aiScore),
  scoreRange: {
    excellent: count(score >= 90),
    good: count(score >= 80 && score < 90),
    fair: count(score >= 70 && score < 80),
    needsImprovement: count(score < 70)
  }
};
```

**数据依赖：**
- Assignment Submission (所有字段)
- Assignment Grade (aiScore, teacherScore)

---

#### **2. classSummary（各班级详细表现）**

**计算方法：**
```typescript
classSummary = groupBy(assignments, 'classId').map(class => ({
  classId: class.id,
  className: class.name,
  subject: class.subject,
  teacher: class.teacherName,
  assignmentCount: count(class.assignments),
  averageScore: avg(class.assignments.map(a => a.score)),
  submissionRate: (count(submitted) / assignmentCount) * 100,
  recentTrend: calculateTrend(class.assignments.slice(-5)), // 最近5次作业趋势
  lastSubmission: max(class.assignments.map(a => a.submitTime))
}));
```

**趋势计算：**
```typescript
function calculateTrend(recentAssignments) {
  const scores = recentAssignments.map(a => a.score);
  const avgFirst = avg(scores.slice(0, 2));
  const avgLast = avg(scores.slice(-2));
  
  if (avgLast - avgFirst > 5) return 'improving';
  if (avgFirst - avgLast > 5) return 'declining';
  return 'stable';
}
```

**数据依赖：**
- Assignment Submission
- Assignment Grade
- Class Enrollment

---

#### **3. subjectAnalysis（各科目表现分析）**

**计算方法：**
```typescript
subjectAnalysis = groupBy(assignments, 'subject').map(subject => ({
  subject: subject.name,
  assignmentCount: count(subject.assignments),
  averageScore: avg(subject.assignments.map(a => a.score)),
  highestScore: max(subject.assignments.map(a => a.score)),
  lowestScore: min(subject.assignments.map(a => a.score)),
  trend: calculateTrend(subject.assignments),
  scoreHistory: subject.assignments.map(a => ({
    date: a.submitTime,
    score: a.score,
    assignmentTitle: a.title
  })).sort(by('date'))
}));
```

**数据依赖：**
- Assignment Submission
- Assignment Grade
- Class Enrollment (subject mapping)

---

#### **4. commonMistakes（常见错误点分析）**

**计算方法：**
```typescript
commonMistakes = groupBy(mistakeRecords, ['subject', 'topic'])
  .map(group => ({
    subject: group.subject,
    topic: group.topic,
    mistakeCount: count(group.mistakes),
    lastOccurred: max(group.mistakes.map(m => m.occuredDate)),
    relatedAssignments: unique(group.mistakes.map(m => m.assignmentId)),
    aiSuggestion: group.mistakes[0].aiSuggestion // 取最新的建议
  }))
  .sort((a, b) => b.mistakeCount - a.mistakeCount) // 按频率降序
  .slice(0, 10); // 取前10个高频错误
```

**数据依赖：**
- Mistake Record (所有字段)
- Assignment Submission (关联)

---

#### **5. trendAnalysis（学习趋势分析）**

**计算方法：**
```typescript
const now = new Date();
const last7Days = assignments.filter(a => a.submitTime >= now - 7天);
const last30Days = assignments.filter(a => a.submitTime >= now - 30天);
const lastMonth = assignments.filter(a => a.submitTime >= now - 60天 && a.submitTime < now - 30天);

trendAnalysis = {
  overallTrend: calculateOverallTrend(last30Days, lastMonth),
  recentPerformance: {
    last7Days: {
      assignmentsCompleted: count(last7Days),
      averageScore: avg(last7Days.map(a => a.score))
    },
    last30Days: {
      assignmentsCompleted: count(last30Days),
      averageScore: avg(last30Days.map(a => a.score))
    }
  },
  strengthSubjects: subjectAnalysis
    .filter(s => s.averageScore >= 85)
    .map(s => s.subject),
  weaknessSubjects: subjectAnalysis
    .filter(s => s.averageScore < 75)
    .map(s => s.subject),
  improvementRate: ((avg(last30Days.scores) - avg(lastMonth.scores)) / avg(lastMonth.scores)) * 100
};
```

**数据依赖：**
- Assignment Submission
- Assignment Grade
- subjectAnalysis（计算结果）

---

#### **6. learningHabits（学习习惯统计）**

**计算方法：**
```typescript
learningHabits = {
  averageSubmissionTime: calculateAvgTime(assignments.map(a => a.submitTime)),
  preferredStudyDays: [],  // 暂不实现，需要行为日志
  procrastinationRate: (count(assignments.filter(a => a.isProcrastination)) / submittedAssignments) * 100,
  earlySubmissionRate: (count(assignments.filter(a => a.isEarly)) / submittedAssignments) * 100
};

function calculateAvgTime(timestamps) {
  const times = timestamps.map(t => t.getHours() * 60 + t.getMinutes());
  const avgMinutes = avg(times);
  const hours = Math.floor(avgMinutes / 60);
  const minutes = avgMinutes % 60;
  return `${hours}:${minutes.toString().padStart(2, '0')}`;
}
```

**数据依赖：**
- Assignment Submission (submitTime, dueDate)

**注意：** `preferredStudyDays` 暂不实现，因需要系统行为日志追踪。

---

### **板块联动关系图**

```
┌──────────────────────────────────────────────────────────────┐
│                    G4 [学习统计分析]                          │
│              Learning Analytics Dashboard                     │
└────────────────┬──────────────────────────┬─────────────────┘
                 │                          │
        数据提供方 ↓                    数据消费方 ↑
                 │                          │
    ┌────────────┴───────────┐    ┌────────┴────────────┐
    │                        │    │                     │
    │  **数据来源模块**      │    │  **数据使用模块**   │
    │                        │    │                     │
    ├────────────────────────┤    ├─────────────────────┤
    │                        │    │                     │
    │ ✅ A[注册/登录]        │    │ 🔥 G1[AI学习助手]   │
    │    └→ 学生基础信息     │    │    ← 获取学习数据    │
    │                        │    │    ← 生成个性化建议  │
    │ ✅ C[所有班级]         │    │                     │
    │    └→ 班级归属信息     │    │ ⏸️ G2[错题分析]     │
    │                        │    │    ← 共享错误数据    │
    │ ✅ C1[我的作业]        │    │    ← 显示错题列表    │
    │    └→ 作业列表         │    │                     │
    │    └→ 作业状态         │    │ ⏸️ G3[学习成就系统] │
    │                        │    │    ← 共享趋势数据    │
    │ ✅ C11a[提交作业]      │    │    ← 判定成就达成    │
    │    └→ 提交时间记录     │    │                     │
    │    └→ 文件上传记录     │    │ 📊 C2[我的成绩]     │
    │                        │    │    ← 提供详细统计    │
    │ ✅ C11c[查看批改]      │    │    ← 补充跨班视角    │
    │    └→ AI/教师评分      │    │                     │
    │    └→ 批改反馈         │    │ 🏫 教师端仪表板      │
    │    └→ 错题标注         │    │    ← 查看学生表现    │
    │                        │    │                     │
    │ ✅ I[个人设置]         │    │                     │
    │    └→ 个人资料更新     │    │                     │
    │                        │    │                     │
    │ ✅ G1[AI学习助手]      │    │                     │
    │    └→ 对话历史记录     │    │                     │
    │    └→ AI交互统计       │    │                     │
    │                        │    │                     │
    └────────────────────────┘    └─────────────────────┘
```

---

### **数据更新触发点**

| 触发事件 | 更新的数据 | 影响的 G4 模块 | 实时性要求 |
| --- | --- | --- | --- |
| 学生提交作业 | Assignment Submission | assignmentPerformance, classSummary, learningHabits | 实时 |
| 教师/AI批改完成 | Assignment Grade | assignmentPerformance, subjectAnalysis, trendAnalysis | 实时 |
| 标注错题 | Mistake Record | commonMistakes | 实时 |
| 加入新班级 | Class Enrollment | classSummary | 实时 |
| 学年更新 | User Profile | studentInfo | 每学年 |
| AI对话交互 | Chat History, Chat Message | (AI使用统计) | 实时 |
| 删除对话历史 | Chat History | (AI使用统计) | 实时 |

---

### **数据存储建议**

#### **1. 数据库表设计**

**核心表：**
- `students` - 学生基础信息
- `classes` - 班级信息
- `class_enrollments` - 学生-班级关联
- `assignments` - 作业定义
- `assignment_submissions` - 作业提交记录
- `assignment_grades` - 作业评分记录
- `mistake_records` - 错题记录
- `chat_histories` - AI对话会话记录
- `chat_messages` - AI对话消息记录

**聚合表（优化查询性能）：**
- `student_performance_cache` - 缓存计算结果（每日更新）
- `subject_statistics` - 科目统计缓存（批改后更新）
- `ai_interaction_stats` - AI使用统计（每日更新）

#### **2. 数据保留策略**

| 数据类型 | 保留时长 | 原因 |
| --- | --- | --- |
| 作业提交记录 | 永久保留 | 学习档案，毕业后可导出 |
| 批改结果 | 永久保留 | 成绩证明，学业记录 |
| 错题记录 | 永久保留 | 学习轨迹，复习参考 |
| AI对话记录 | 1学年或学生删除 | 个性化学习，隐私保护 |
| 缓存数据 | 实时计算 | 可随时重建，性能优化用 |

#### **3. API 接口规范**

```typescript
// 获取学生学习档案（G4主要接口）
GET /api/student/{studentId}/learning-profile
Query Parameters:
  - timeframe: 'week' | 'month' | 'semester' | 'year'
  - includeHistory: boolean (是否包含历史数据)

Response: StudentLearningProfile

// 供AI Tutor调用的简化接口
GET /api/student/{studentId}/learning-summary
Response: {
  strengths: string[],
  weaknesses: string[],
  commonMistakes: CommonMistake[],
  recentTrend: string
}

// AI对话历史接口
GET /api/student/{studentId}/chat-histories
Response: ChatHistory[]

POST /api/student/{studentId}/chat-histories
Body: { roleId?: string, relatedAssignmentId?: string }
Response: ChatHistory

DELETE /api/student/{studentId}/chat-histories/{chatHistoryId}

// AI消息接口
GET /api/chat-histories/{chatHistoryId}/messages
Response: Message[]

POST /api/chat-histories/{chatHistoryId}/messages
Body: { role: 'user'|'assistant', content: string, fileAttachments?: string[] }
Response: Message

// 实时更新接口
POST /api/student/{studentId}/learning-profile/refresh
// 触发重新计算所有聚合数据
```

---

### **实施优先级**

#### **Phase 1: 核心数据追踪（必须）**
- ✅ 作业提交记录（submitTime, status）
- ✅ 作业评分记录（score, feedback）
- ✅ 学生-班级-科目映射

#### **Phase 2: 错题与趋势（高优先级）**
- 🔥 错题记录与标注
- 🔥 趋势计算（improving/stable/declining）
- 🔥 常见错误聚合

#### **Phase 3: 学习习惯与AI集成（中优先级）**
- ⏸️ 提交习惯统计（拖延率、提前率）
- 🔥 AI对话历史记录存储
- 🔥 AI对话与作业关联

#### **Phase 4: 高级分析（低优先级）**
- ⏸️ 预测性分析（基于历史数据预测成绩趋势）
- ⏸️ AI对话内容主题分析（NLP分析常见问题）
- ⏸️ 学生学习路径可视化

---

# H. 资源库 / Resource Library

**⚠️ MVP版本实施范围**
- ✅ H1[班级资源] - 核心功能已完成
- ✅ H2[个人资料库] - 核心功能已完成
- ⏸️ AI推荐资料 - 第二期规划

**设计理念：** 参考Google Drive，简洁、直观、高效

**B --> H[资源库 / Resource Library]**
- **H --> H1[班级资源 / Class Resources]** ✅ MVP已实现
- **H --> H2[个人资料库 / Personal Library]** ✅ MVP已实现
- **H --> H3[我的收藏 / Starred]** ✅ MVP已实现

学生可管理和查看班级共享资源与个人学习资料，支持文件夹组织、收藏标记、预览与下载。

---

## **核心功能总览**

### **页面路径**
- 主入口：`/student/resource-library`
- 默认显示班级资源Tab

### **三Tab结构**
1. **📚 Class Resources** - 查看班级共享资源
2. **📁 Personal Library** - 管理个人文件（500MB）
3. **⭐ Starred** - 快速访问收藏的资源

### **通用功能**
- ✅ 面包屑导航显示当前位置
- ✅ 列表/网格视图切换
- ✅ 搜索、排序、筛选
- ✅ 星标收藏
- ✅ 预览弹窗
- ✅ 文件下载
- ✅ 简洁线框SVG图标

---

## **H --> H1[班级资源 / Class Resources]** ✅ MVP已实现

展示教师分享的班级资源，按文件夹组织，支持收藏、预览与下载。

### **核心功能**

#### **1. 资源来源**
- 📄 教师上传的课堂资料（课件、讲义、练习题）
- 📋 作业附件和参考资料
- 📚 补充学习材料

**关键特性：**
- 学生只读（不可编辑或删除）
- 收藏状态仅学生本地可见
- 实时同步教师端更新

#### **2. 数据结构**

```typescript
// 班级资源数据结构
interface ClassResource {
  // 基本信息
  resourceId: string;              // 资源唯一ID
  fileName: string;                // 文件名
  fileType: string;                // 文件类型（pdf/doc/ppt/image/video等）
  fileSize: number;                // 文件大小（bytes）
  fileUrl: string;                 // 文件存储路径/URL
  thumbnailUrl?: string;           // 缩略图（可选）
  
  // 归属信息
  classId: string;                 // 所属班级ID
  className: string;               // 班级名称（如：中五A班数学）
  subject: string;                 // 科目
  folderId?: string;               // 所属文件夹ID（可选）
  folderPath: string;              // 文件夹路径（如：/单元测试/第三章）
  
  // 上传信息
  uploadedBy: string;              // 上传者ID（教师）
  uploaderName: string;            // 上传者姓名
  uploadTime: Date;                // 上传时间
  
  // 关联信息
  relatedAssignmentId?: string;    // 关联作业ID（可选）
  description?: string;            // 资源描述
  tags?: string[];                 // 标签（如：["重点", "考试相关"]）
  
  // 学生操作
  isStarred: boolean;              // 是否已收藏
  starredTime?: Date;              // 收藏时间
  downloadCount: number;           // 下载次数
  lastViewedTime?: Date;           // 最后查看时间
}

// 文件夹结构
interface ResourceFolder {
  folderId: string;                // 文件夹ID
  folderName: string;              // 文件夹名称
  parentFolderId?: string;         // 父文件夹ID（支持嵌套）
  classId: string;                 // 所属班级ID
  createdBy: string;               // 创建者ID（教师）
  createdTime: Date;               // 创建时间
  resourceCount: number;           // 包含资源数量
  subfolderCount: number;          // 子文件夹数量
}
```

#### **3. 界面布局（Google Drive风格）**

**三栏布局：**

```
┌─────────────────────────────────────────────────────────────┐
│ 📖 Resource Library    [Class] [Personal] [Starred]         │
├──────────┬──────────────────────────────────────────────────┤
│          │ Home / Class Resources / Lecture Notes           │
│ 📚       ├──────────────────────────────────────────────────┤
│Classes   │ [Search...] [Name▼] [All Types▼] [≣] [⊞] [↑Up]  │
│          ├──────────────────────────────────────────────────┤
│ All (3)  │ 📄 Chapter3_Introduction.pdf    ⭐ 👁 ⬇         │
│ ─────    │ Mr. Wong  11/10/2024  2.5 MB   [Important] [Exam]│
│ 📁       ├──────────────────────────────────────────────────┤
│Folders   │ 📄 DSE2023_Math_Paper1.pdf      ☆ 👁 ⬇          │
│          │ Mr. Wong  11/08/2024  5 MB      [Past Paper]     │
│Lecture(5)├──────────────────────────────────────────────────┤
│Practice  │ 📄 Unit3_Practice_Set_1.pdf     ⭐ 👁 ⬇         │
│ Papers(8)│ Mr. Wong  11/05/2024  1.5 MB   [Practice]        │
│ Past(4)  └──────────────────────────────────────────────────┘
└──────────┘
```

**关键区域：**
1. **左侧边栏**：文件夹树形结构（只显示文件夹，不显示文件）
2. **顶部工具栏**：面包屑 + 搜索 + 排序 + 筛选 + 视图切换
3. **主内容区**：文件列表（列表或网格视图）

#### **4. 左侧边栏**

**文件夹树结构：**
- 📚 All Classes (显示所有资源)
- 📁 Folders (教师创建的文件夹结构)
  - 📂 Lecture Notes (5)
  - 📂 Practice Papers (8)
    - 📁 Past Papers (4)

**交互逻辑：**
- 点击文件夹展开/折叠子文件夹
- 点击文件夹名称筛选对应文件
- 数字显示该文件夹内的文件数量（实时计算）
- 选中项高亮显示

#### **5. 工具栏功能**

**面包屑导航：**
```
Class Resources / Lecture Notes
```
- 显示当前位置
- 支持多层级路径

**操作按钮：**
- 🔍 **搜索框**：实时搜索文件名、描述、标签
- 📊 **排序**：Name / Date / Size
- 📋 **筛选**：All Types / PDF / DOC / PPT
- ≣ **列表视图**（默认）
- ⊞ **网格视图**

#### **6. 文件操作**

**每个文件的操作按钮：**

| 图标 | 功能 | 说明 |
| --- | --- | --- |
| ⭐ / ☆ | 收藏/取消收藏 | 实心星=已收藏，空心星=未收藏 |
| 👁️ | 预览 | 打开预览弹窗 |
| ⬇️ | 下载 | 下载文件到本地 |

**预览弹窗：**
```
┌──────────────────────────────────────┐
│ Chapter3_Introduction.pdf        ✕  │
├──────────────────────────────────────┤
│                                      │
│        📄                            │
│   File preview placeholder           │
│   2.5 MB • 11/10/2024                │
│                                      │
├──────────────────────────────────────┤
│              [⬇ Download] [Close]    │
└──────────────────────────────────────┘
```

- MVP版本显示文件信息（实际PDF预览在Phase 2实现）
- 支持下载和关闭操作
- 点击背景关闭弹窗

---

## **H --> H2[个人资料库 / Personal Library]** ✅ MVP已实现

学生自己管理的学习资料库，**像Google Drive一样简单**，支持上传、分组、收藏、重命名。

### **设计理念**
- 🎯 **极简主义**：上传即用，无需填写标签、备注等额外信息
- 📁 **灵活分组**：自定义文件夹，支持图标和颜色
- 💾 **500MB免费空间**：实时显示使用情况
- ✏️ **随时编辑**：重命名、移动文件夹简单快捷

### **核心功能**

#### **1. 资源来源**
- 📤 学生主动上传（笔记、资料、文档等）
- 📥 作业提交备份（可选）
- 🔗 外部导入（云盘、邮件附件）

#### **2. 数据结构**

```typescript
// 个人资料库数据结构
interface PersonalResource {
  // 基本信息
  resourceId: string;              // 资源唯一ID
  fileName: string;                // 文件名（可重命名）
  fileType: string;                // 文件类型
  fileSize: number;                // 文件大小
  fileUrl: string;                 // 文件存储路径
  thumbnailUrl?: string;           // 缩略图
  
  // 归属信息
  studentId: string;               // 学生ID（所有者）
  groupId?: string;                // 所属分组ID
  groupPath: string;               // 分组路径（如：/数学笔记/第三章）
  
  // 上传信息
  uploadTime: Date;                // 上传时间
  lastModified: Date;              // 最后修改时间（重命名或移动时更新）
  
  // 学生操作
  isStarred: boolean;              // 是否收藏
  starredTime?: Date;              // 收藏时间
  viewCount: number;               // 查看次数
  lastViewedTime?: Date;           // 最后查看时间
  
  // 来源信息（可选）
  sourceType?: 'upload' | 'assignment' | 'import';  // 来源类型
  relatedAssignmentId?: string;    // 关联作业ID（如果来自作业）
}

// 注：为了简化使用体验，个人资源不包含标签(tags)、备注(description)、科目(subject)等复杂字段
// 采用类似Google Drive的简洁设计，只保留最核心的文件管理功能

// 分组结构
interface ResourceGroup {
  groupId: string;                 // 分组ID
  groupName: string;               // 分组名称
  groupIcon?: string;              // 分组图标（emoji或图标名称）
  groupColor?: string;             // 分组颜色（用于UI区分）
  parentGroupId?: string;          // 父分组ID（支持嵌套）
  studentId: string;               // 学生ID（所有者）
  createdTime: Date;               // 创建时间
  resourceCount: number;           // 包含资源数量
  subgroupCount: number;           // 子分组数量
  sortOrder: number;               // 排序顺序（学生自定义）
}
```

#### **3. 界面布局（Google Drive风格）**

**三栏布局：**

```
┌─────────────────────────────────────────────────────────────┐
│ 📖 Resource Library    [Class] [Personal] [Starred]         │
├──────────┬──────────────────────────────────────────────────┤
│          │ Personal Library / Math Notes / Chapter 3        │
│ 📁       ├──────────────────────────────────────────────────┤
│My Groups │ [Search...] [Name▼] [All▼] [≣] [⊞] [↑Upload]    │
│   [+]    ├──────────────────────────────────────────────────┤
│ 📂 All(3)│ 📄 My_Chapter3_Notes.pdf        ⭐ 👁 ⬇ 🗑      │
│ ─────    │ 11/12/2024  1.5 MB                               │
│ 📚 Math  ├──────────────────────────────────────────────────┤
│  Notes   │ 📝 Grammar_Summary.docx         ⭐ 👁 ⬇ 🗑       │
│  (15)    │ 11/08/2024  512 KB                               │
│  📖Ch3(5)└──────────────────────────────────────────────────┘
│ 📝 Eng(12)
│ 📥 Assign
│  Backup(8)
│ ─────
│⭐Starred(2)
│
│ 💾Storage
│ ▓▓▓░░ 1%
│ 5/500 MB
└──────────┘
```

**左侧边栏结构：**
1. **My Groups** - 自定义分组（带+按钮创建新分组）
2. **Quick Access** - 快捷入口（Starred）
3. **Storage** - 💾 存储空间显示（**500MB**免费空间）

#### **4. 分组管理**

**创建分组：**
- 点击侧边栏"+"按钮
- 弹出简单对话框（MVP版本暂用alert）
- 输入分组名称即可创建

**分组特性：**
- 📚 自定义图标（emoji）
- 🎨 自定义颜色（用于区分）
- 📊 实时显示文件数量
- 🌳 支持嵌套子分组

**分组操作（Phase 2）：**
- ⏸️ 重命名分组
- ⏸️ 修改图标和颜色
- ⏸️ 拖拽移动分组
- ⏸️ 删除分组

#### **5. 文件上传（极简设计）**

**上传方式：**
1. 点击工具栏"Upload"按钮
2. 拖拽文件到上传区域（MVP Phase 2）

**上传对话框：**

```
┌──────────────────────────────────┐
│ Upload Files                 ✕  │
├──────────────────────────────────┤
│                                  │
│         📤                       │
│ Drag files here or click browse  │
│    [Choose Files]                │
│                                  │
├──────────────────────────────────┤
│ Max: 50 MB per file              │
│ Available: 495 MB                │
└──────────────────────────────────┘
```

**上传流程：**
1. 选择文件
2. 自动上传到当前分组（默认"All Files"）
3. 完成后关闭对话框
4. 列表自动刷新

**上传限制：**
- 📦 单文件最大：50 MB
- 💾 总空间：**500 MB**（每个学生免费空间）
- 📁 支持格式：PDF, DOC, DOCX, PPT, PPTX, JPG, PNG, MP4等

**超限提示：**
- 文件过大 → 提示"File too large"
- 空间不足 → 提示"Storage full"

#### **6. 文件操作**

**四个核心操作：**

| 图标 | 功能 | 说明 |
| --- | --- | --- |
| ⭐ / ☆ | 星标 | 点击切换收藏状态 |
| 👁️ | 预览 | 打开预览弹窗 |
| ⬇️ | 下载 | 下载到本地 |
| 🗑️ | 删除 | 删除文件（带确认） |

**操作逻辑：**
```typescript
// 星标切换
toggleStar(resourceId) → isStarred = !isStarred

// 预览文件
handlePreview(resource) → 打开预览弹窗

// 下载文件
handleDownload(resource) → 触发浏览器下载

// 删除文件
handleDelete(resourceId) → confirm() → 删除
```

**重命名文件（Phase 2）：**
- ⏸️ 双击文件名内联编辑
- ⏸️ 右键菜单 → Rename
- ⏸️ 快捷键 F2

#### **7. 视图模式**

**列表视图（默认）：**
- 显示详细信息：文件名、日期、大小
- 每行一个文件
- 操作按钮在右侧

**网格视图：**
- 卡片式布局
- 显示大图标和基本信息
- 适合预览文件类型

**切换方式：**
- 工具栏 ≣ (列表) / ⊞ (网格) 按钮

#### **8. 搜索与排序**

**搜索：**
- 实时搜索文件名
- 搜索范围：当前分组或所有文件

**排序：**
- Name (A-Z)
- Date (最新优先)
- Size (最大优先)

**筛选：**
- All Types / PDF / DOC / PPT等

#### **9. 存储空间**

**侧边栏显示：**
```
💾 Storage
 ▓▓▓░░ 1%
 5 MB / 500 MB
```

**功能：**
- 实时计算已用空间
- 进度条可视化显示
- 显示剩余可用空间

---

## **H --> H3[我的收藏 / Starred]** ✅ MVP已实现

统一展示所有已收藏的资源，包括班级资源和个人文件。

### **功能特性**

**显示内容：**
- 📚 Class Resources - 来自班级的收藏
- 📁 Personal Files - 个人文件的收藏
- 分类显示，清晰区分来源

**操作：**
- 点击星标取消收藏
- 预览、下载文件
- 跳转回原始位置

**左侧边栏统计：**
```
⭐ Starred Items
 📚 Class (2)
 📁 Personal (1)
```

---

## **通用功能模块**

### **1. 文件预览（MVP简化版）**

**预览弹窗：**
```
┌────────────────────────────────┐
│ Chapter3_Notes.pdf         ✕  │
├────────────────────────────────┤
│                                │
│          📄                    │
│  File preview: ...             │
│  2.5 MB • 11/10/2024           │
│                                │
├────────────────────────────────┤
│        [⬇ Download] [Close]    │
└────────────────────────────────┘
```

**MVP实现：**
- ✅ 显示文件信息（名称、大小、日期）
- ✅ 文件类型图标
- ✅ 下载按钮
- ⏸️ 实际PDF/图片预览（Phase 2）

### **2. 文件下载**

**下载逻辑：**
```typescript
handleDownload(resource) {
  // 触发浏览器下载
  alert(`Downloading: ${resource.fileName}`);
  // 实际实现: window.open(resource.fileUrl, '_blank');
}
```

### **3. 文件类型图标**

使用Emoji图标保持简洁：
- 📄 PDF
- 📝 DOC/DOCX  
- 📊 PPT/Excel
- 🖼️ 图片
- 🎬 视频
- 📦 压缩包

---

## **路由与导航**

### **页面路由**
- **主页面**：`/student/resource-library`
- 通过Tab切换：Class / Personal / Starred
- 使用state管理当前文件夹/分组（不改变URL）

### **侧边栏入口**

```
📚 Insight Tools
📖 Resource Library  ← 当前页面
⚙️ Settings
```

---

## **数据关联**

| 模块 | 关联方式 |
| --- | --- |
| C[班级] | 班级资源按学生加入的班级过滤 |
| C1[作业] | 作业附件同步到班级资源 |
| G1[AI Tutor] | 对话中的文件可保存到个人资料库（Phase 2） |

---

## **Mock数据示例**

详细Mock数据见代码：`app/student/resource-library/page.tsx`

**关键数据点：**
- 3个班级资源（不同文件夹）
- 3个个人资源（不同分组）
- 3个文件夹
- 4个分组（含嵌套）
- 总存储：500MB
- 已用：约5MB (1%)

---

## **技术实施**

### **前端技术栈**
- React + TypeScript
- CSS Modules（响应式布局）
- 线框SVG图标（自绘）
- 原生HTML5文件上传

### **后端API（简化版）**

```typescript
// 班级资源
GET    /api/student/{studentId}/class-resources
POST   /api/class-resources/{resourceId}/star

// 个人资料库
GET    /api/student/{studentId}/personal-resources
POST   /api/student/{studentId}/personal-resources/upload
DELETE /api/personal-resources/{resourceId}
POST   /api/personal-resources/{resourceId}/star

// 分组管理
GET    /api/student/{studentId}/resource-groups
POST   /api/student/{studentId}/resource-groups
```

---

## **实施优先级**

### **✅ Phase 1: MVP核心功能（已完成）**
- ✅ 三Tab结构（Class / Personal / Starred）
- ✅ 左侧边栏文件夹/分组树
- ✅ 面包屑导航
- ✅ 列表/网格视图切换
- ✅ 搜索、排序、筛选
- ✅ 星标收藏
- ✅ 预览弹窗（文件信息）
- ✅ 文件下载
- ✅ 文件删除（个人文件）
- ✅ 文件上传（个人文件）
- ✅ 存储空间显示（500MB）

### **🔥 Phase 2: 增强功能（高优先级）**
- 实际PDF/图片预览（react-pdf）
- 文件重命名（内联编辑）
- 拖拽上传文件
- 拖拽移动文件到分组
- 批量操作（多选、批量下载）
- 分组管理完善（编辑、删除）
- 上传进度显示

### **⏸️ Phase 3: 高级功能（后续规划）**
- Office文档预览
- 视频播放
- 作业提交自动备份
- AI推荐资料
- 文件分享
- 版本历史

---

# I. 个人设置 / Settings

**⚠️ MVP版本实施范围**
- ✅ I1[Account] - 账户信息与密码修改
- ✅ I2[Notifications] - 邮件通知设置
- ✅ I3[Preferences] - 语言与界面偏好
- ✅ I4[About] - 系统信息与帮助

**设计理念：** 简单高效，去繁就简

**B --> I[个人设置 / Settings]**
- **I --> I1[Account]** ✅ 账户信息
- **I --> I2[Notifications]** ✅ 通知设置
- **I --> I3[Preferences]** ✅ 偏好设置
- **I --> I4[About Insight AI]** ✅ 关于

---

## **页面结构**

### **页面路径**
`/student/settings`

### **布局设计**

```
┌─────────────────────────────────────────────────────────┐
│ ⚙️ Settings                                             │
├──────────┬──────────────────────────────────────────────┤
│          │                                              │
│ Account  │  [Account详细设置内容]                        │
│          │                                              │
│Notifica- │                                              │
│ tions    │                                              │
│          │                                              │
│Prefer-   │                                              │
│ ences    │                                              │
│          │                                              │
│ About    │                                              │
│          │                                              │
└──────────┴──────────────────────────────────────────────┘
```

**关键特点：**
- 左侧Tab导航（4个主标签）
- 右侧内容区（动态切换）
- 简洁的Toggle和Dropdown控件
- 弹窗用于修改密码

---

## **I --> I1[Account]** ✅ 账户信息

### **数据结构**

```typescript
interface StudentProfile {
  studentId: string;        // 学号（不可编辑）
  name: string;             // 姓名（可编辑）
  email: string;            // 邮箱（可编辑）
  school: string;           // 学校（不可编辑）
  grade: string;            // 年级（不可编辑）
  profilePhoto?: string;    // 头像URL
}
```

### **界面布局**

```
Account
──────────────────────────────────
👤 Profile Information

[圆形头像]  [Change Photo]

Name:           [Emma Wilson          ]
Email:          [emma.w@school.edu.hk ]
Student ID:     S2024001 (read-only)
School:         St. Mary's College (read-only)
Grade:          Form 5A (read-only)

                    [Save Changes]

🔒 Password

[Change Password]  ← 点击打开弹窗
```

### **修改密码弹窗**

```
┌─────────────────────────────┐
│ Change Password         ✕  │
├─────────────────────────────┤
│ Current Password:           │
│ [___________________]       │
│                             │
│ New Password:               │
│ [___________________]       │
│ Password strength: ▓▓▓░░   │
│                             │
│ Confirm New Password:       │
│ [___________________]       │
│                             │
│        [Cancel] [Update]    │
└─────────────────────────────┘
```

### **字段验证**
- Email格式验证
- 密码强度检测（最少8位，包含数字和字母）
- 确认密码匹配检查

---

## **I --> I2[Notifications]** ✅ 通知设置

### **数据结构**

```typescript
interface NotificationSettings {
  email: {
    assignmentUpdates: boolean;      // 作业更新
    gradingCompleted: boolean;       // 批改完成
    classAnnouncements: boolean;     // 班级公告
    systemNotifications: boolean;    // 系统通知
  };
}
```

### **界面布局**

```
Notifications
──────────────────────────────────
📧 Email Notifications

All email notifications sent to: emma.w@school.edu.hk

☑ Assignment Updates
   Notify me when new assignments are posted or deadlines 
   are approaching

☑ Grading Completed
   Notify me when my assignments have been graded

☑ Class Announcements
   Notify me about class announcements and important updates

☑ System Notifications
   Important system updates and maintenance notices

                    [Save Changes]
```

### **交互说明**
- Toggle开关切换开/关
- 所有更改自动保存或点击"Save Changes"
- 顶部显示当前邮箱地址

---

## **I --> I3[Preferences]** ✅ 偏好设置

### **数据结构**

```typescript
interface UserPreferences {
  language: 'en' | 'zh-CN' | 'zh-HK';
  dateFormat: 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'YYYY-MM-DD';
  timeZone: string;
  defaultView: 'list' | 'grid';
}
```

### **界面布局**

```
Preferences
──────────────────────────────────
🌐 Language & Display

Language:           [English              ▼]
                    Options: English, 简体中文, 繁體中文

Date Format:        [MM/DD/YYYY           ▼]
                    Options: MM/DD/YYYY, DD/MM/YYYY, YYYY-MM-DD

Time Zone:          [GMT+8 Hong Kong      ▼]

⚙️ Interface

Default Assignment View:
  ○ List View    ● Grid View

                    [Save Changes]
```

### **功能说明**
- 语言切换立即生效（i18n）
- 日期格式应用于所有日期显示
- 默认视图影响作业列表页

---

## **I --> I4[About Insight AI]** ✅ 关于

### **界面布局**

```
About Insight AI
──────────────────────────────────
ℹ️ System Information

Version:        v1.0.0 (MVP)
Last Updated:   November 2024
Platform:       Web Application

📚 Support & Help

• Help Center               [→]
• Report an Issue           [→]
• Send Feedback            [→]

📄 Legal & Privacy

• Privacy Policy           [→]
• Terms of Service         [→]

💡 About This Project

Insight AI is an educational platform designed to help 
students and teachers manage assignments and enhance 
learning with AI-powered tools.

Built with ❤️ for educators and learners.
```

### **链接跳转**
- Help Center → 打开帮助文档页面
- Report Issue → 打开问题反馈表单
- Privacy Policy / Terms → 打开法律文档页面

---

## **技术实施**

### **数据存储**
- 用户设置存储在浏览器LocalStorage + 后端数据库
- 修改后自动同步到服务器
- 多设备登录共享设置

### **API接口**

```typescript
// 获取用户设置
GET /api/student/{studentId}/settings
Response: {
  profile: StudentProfile,
  notifications: NotificationSettings,
  preferences: UserPreferences
}

// 更新账户信息
PUT /api/student/{studentId}/profile
Body: { name, email, profilePhoto }

// 修改密码
POST /api/student/{studentId}/change-password
Body: { currentPassword, newPassword }

// 更新通知设置
PUT /api/student/{studentId}/notifications
Body: NotificationSettings

// 更新偏好设置
PUT /api/student/{studentId}/preferences
Body: UserPreferences
```

---

## **实施优先级**

### **✅ Phase 1: MVP核心功能（已完成）**
- ✅ Account - 基本信息展示和编辑
- ✅ Account - 修改密码功能
- ✅ Notifications - Email通知设置
- ✅ Preferences - 语言和界面偏好
- ✅ About - 系统信息和帮助链接

### **🔥 Phase 2: 增强功能**
- 头像上传和裁剪
- 邮箱验证功能
- 更多语言选项
- 通知历史记录
- 偏好设置预览

### **⏸️ Phase 3: 高级功能（后续规划）**
- Privacy & Security独立页
- Two-Factor Authentication (2FA)
- Profile Visibility设置
- Account删除/停用功能
- Push通知和In-App通知
- Quiet Hours设置
- Dark Mode主题
- Accessibility无障碍设置

---

## **学生端与教师端差异**

**设置页面结构完全相同，只在以下地方有细微差异：**

| 模块 | 学生端 | 教师端 |
| --- | --- | --- |
| **Account** | Student ID / Grade | Teacher ID / Department |
| **Notifications** | 有"Grading Completed"通知 | 无"Grading Completed" |
| **其他** | 完全相同 | 完全相同 |

**实现方式：**
- 共用同一套UI组件
- 通过`role`参数控制显示内容
- 只需维护一套代码

**详细设计文档：** 见 `doc/Teacher_student_setting.md`

---