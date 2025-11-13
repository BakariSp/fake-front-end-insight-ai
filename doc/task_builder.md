路线A｜短期“嵌入/导入 Google Form”方案（2–5天起飞）
用法

老师在 Insight 里新建作业包 → 选择 “导入自 Google Form”/“内嵌 Form”。

学生端直接在我们的作业页面内 iFrame 填答（不跳走），或跳转后回填。

我们要做的事

表单→Task 映射（自动建 Task）

单选/多选/判断/网格 → Quiz Task

简答/段落 → Essay/Short Answer Task

文件上传题（需 GSuite 权限）→ File Upload Task

其它题型保留为“文本题”（可后续手动修正）。

回填与对齐

用 Google Forms 的 webhook / App Script / Sheets API 拉取响应；

生成我们平台的 submission 记录，按题映射到 Task。

AI 批改接入

对客观题直接评分；

主观题拉取文本/文件，走我们 Rubric 引擎（Assist）；

产出分数与反馈写回我们 grading。

限制与提示

口语/视频在 Google Form 里比较别扭（依赖文件上传），建议在我们侧建 Audio/Video Task；

某些题（公式/数学步骤）在 GForm 体验不佳 → 提示“建议使用本地 Task 模板”。

优点 / 风险

优点：几天上线、老师迁移成本低（已有题可直接用）；

风险：体验不统一、权限与隐私链路复杂、口语/手写/计时等高级能力受限。

路线B｜中期“原生 Task Builder（表单引擎化）”（2–6周迭代）
核心设计

把 Builder 做成 Schema-驱动的表单引擎：
AssignmentPackage{ tasks[] }；task.schema 描述题干、选项、验证、提交形态、计时、可见性等。

题型组件库：SingleChoice, MultiChoice, FillBlank, ShortText, LongText, ScanUpload, AudioRecord, VideoRecord, FileUpload, CodeEditor, Group …

评分装配：gradingMode（auto/assist/manual）+ rubricId + anchors（锚点样例）。

运行时引擎：根据 task.schema 渲染学生端；提交生成标准化 submission.payload；把可机评的流转进 AI。

关键差异化（相对 Google Form）

提交形态原生支持：手写扫描（OCR 清晰化）、音/视频录制（断点续传）、代码沙箱。

计时与反作弊：Task 级计时、全屏监测、粘贴检测、AI 生成提示。

差异化布置：Task 的 audience 支持班级/小组/个别学生。

学习洞察闭环：Task 绑定 topics[]，评分出 next_exercise_tag，喂给二次布置。

# 1) 路由与页面框架

* 路由：`/teacher/assignments/new`（新建） `/teacher/assignments/:id/edit`（编辑）
* 布局：顶部工具栏 + 三栏主体（左库 / 中画布 / 右侧 Inspector）

```
┌ TopBar: [Back]  Title  Subject  Topics  Due  TotalPoints  [Preview] [Save Draft] [Publish]
├ LeftPane (Task Library)
├ Canvas (Assignment Package)
└ RightPane (Inspector for selected Task)
```

# 2) 组件树（React 结构建议）

```
TaskBuilderPage
├─ TopBar
│  ├─ TitleInput  SubjectSelect  TopicMultiSelect  DuePicker  TotalPointsBadge
│  └─ Buttons: Preview / SaveDraft / Publish / More(...)
├─ Main
│  ├─ TaskLibrary
│  │   ├─ LibraryItem type=quiz
│  │   ├─ LibraryItem type=essay
│  │   ├─ LibraryItem type=scan
│  │   ├─ LibraryItem type=audio
│  │   └─ LibraryItem type=file
│  ├─ Canvas
│  │   ├─ CanvasHeader (ConflictsBadge, LowConfidenceBadge, ImportButtons)
│  │   └─ TaskCardList (DragDrop)
│  │       ├─ TaskCard (condensed / expanded)
│  │       │   ├─ Title, TypeChip, Points, VisibilityChip, SubmissionMethodChips
│  │       │   ├─ ExpandButton / Duplicate / Delete / DragHandle
│  │       │   └─ InlineQuickActions (grading mode, resubmit toggle)
│  └─ Inspector (shows when a Task selected)
│      ├─ Tabs: [Basics] [Submission] [Grading] [Advanced]
│      ├─ Basics: Title, Instructions (rich), Points, Topic tags
│      ├─ Submission: SubmissionMethods (multi)
│      │      • typein / handwriting / image / audio / video / file
│      │      • per-method settings (max length, file type, duration …)
│      ├─ Grading: gradingMode (auto/assist/manual), rubricSelect, weight editor
│      └─ Advanced: allowResubmit, resubmitLimit, latePolicy, audience selector
└─ Drawers/Modals
   ├─ ImportDrawer (OCR / Resource / AI / Google Form)
   ├─ ConflictDrawer (grouped: type mismatch / submission mismatch / missing answer)
   └─ PreviewModal (Student preview switch by task)
```

# 3) 关键交互规范

* **拖拽**：从左库拖到画布创建 Task；画布内可排序。
* **选择**：点击 TaskCard 选中，高亮并开启右侧 Inspector。
* **快捷操作**（卡片右上角）：Duplicate / Delete / Collapse / Drag。
* **批量**：CanvasHeader 勾选多卡片 → 批量设置（gradingMode、submissionMethods、visibility）。
* **导入**：ImportDrawer 支持 PDF/图片（异步OCR）、资源库、AI 生成、Google Form 导入；导入后自动生成若干 Task。
* **冲突修正**：ConflictDrawer

  * 顶部摘要：低置信X、题型冲突Y、提交方式冲突Z、缺答案W
  * 按组批量：[按识别修正] / [按预设覆盖] / [逐条处理]
* **总分**：TotalPoints = 所有 Task.points 的求和，实时更新。
* **预览**：PreviewModal 显示学生端 Task 提交形态（Tab：TypeIn/Write/Upload/Record）

# 4) 数据模型（TypeScript 接口）

```ts
export type Subject = 'chinese'|'english'|'math'|'physics'|'chem'|'bio'|'ls'|'other';
export type TaskType = 'quiz'|'essay'|'scan'|'audio'|'video'|'file'|'group';
export type SubmissionMethod = 'typein'|'handwriting'|'image'|'audio'|'video'|'file';
export type GradingMode = 'auto'|'assist'|'manual';

export interface AssignmentPackage {
  id: string;
  title: string;
  subject: Subject;
  topics: string[];
  classIds: string[];          // 分发时再填
  dueAt: string;               // ISO
  totalPoints: number;
  taskIds: string[];
  state: 'draft'|'published'|'archived';
  ocrStatus?: 'idle'|'queued'|'processing'|'done'|'error';
}

export interface Task {
  id: string;
  type: TaskType;
  title: string;
  instructions?: string;       // rich text
  points: number;
  topics?: string[];
  submissionMethods: SubmissionMethod[];     // 多选
  submissionConfig?: { maxFiles?: number; maxDurationSec?: number; accept?: string[] };
  gradingMode: GradingMode;
  rubricId?: string;           // 语/数/英模板库
  rubricWeights?: Record<string, number>; // 维度权重
  allowResubmit?: boolean;
  resubmitLimit?: number;
  latePolicy?: 'none'|'penalty_10'|'penalty_20';
  audience?: { type:'class'|'group'|'students'; ids?: string[] };
  meta?: { detectedType?: TaskType; confidence?: number; conflict?: boolean };
}

// Quiz 子结构（用于 quiz 题内编辑，MVP可后做）
export interface QuizItem {
  id: string;
  stem: string;
  options: string[];
  correct?: number[];   // 支持单/多选
  score: number;
}
```

# 5) 事件流与状态机

* **创建**：用户输入基本信息 → 拖 Task → 自动 `totalPoints` 更新 → [Save Draft]
* **导入（OCR 异步）**

  1. POST `/imports` 返回 importId；
  2. 立即在 Canvas 生成「占位 Task」；
  3. 后台分片识别→逐个回填 Task，低置信/冲突标红；
  4. 通知角标或 Queue 显示进度；点击进入 ConflictDrawer。
* **发布**：POST `/assignments/:id/publish`

  * 生成 per-class 实例；发送通知。
* **版本化**：发布后修改 → `version`++，已提交学生维持旧版。

# 6) API（最小集）

```
GET    /api/subjects
GET    /api/rubrics?subject=math
POST   /api/assignments            // 新建包
GET    /api/assignments/:id
PATCH  /api/assignments/:id        // 更新包头信息
POST   /api/assignments/:id/tasks  // 批量新增任务
PATCH  /api/tasks/:id
DELETE /api/tasks/:id
POST   /api/imports                 // 上传文件，开始OCR
GET    /api/imports/:id/status      // 进度与低置信列表
POST   /api/assignments/:id/publish
```

# 7) 画面细节（UI要点）

* **TopBar**

  * Title（必填，空则红边）；Subject（单选）；Topics（多选 chips）；Due（日期时间选择器）
  * TotalPoints（只读）；按钮区：Preview（ghost）/ SaveDraft（secondary）/ Publish（primary）
* **TaskLibrary**

  * 卡片：图标 + 名称 + 简介；支持拖拽；也可点击快速插入
* **TaskCard（expanded）**

  * Header：TypeChip、Points、Visibility、Confidence（低于0.7显示黄点）
  * Body：短说明预览；Submission chips；Grading chip；冲突条（如“缺答案”“题型冲突”）
* **Inspector**

  * 分组表单 + 即时校验；Rubric 下拉 + 维度权重滑条；Submission 方法为多选开关
* **ConflictDrawer**

  * Tabs：Low Confidence / Type Mismatch / Submission Mismatch / Missing Answer
  * 列表项：题/任务摘要 + 推荐修正；组操作按钮：[按识别修正] [按预设覆盖]

# 8) 空/错/加载状态

* 空画布：插画 + 提示“拖拽左侧任务类型，或从文件/资源库导入” + [Import]按钮
* 导入中：CanvasHeader 显示“解析中…”进度条；任务占位骨架屏
* 右侧无选中：显示“选择一个任务以编辑设置”
* 错误：Toast + 顶部错误条；导入失败可重试

# 9) 验收标准（MVP）

1. 左库拖拽建 Task；卡片可排序、复制、删除、折叠
2. 右侧 Inspector 可编辑：标题、说明、分值、提交方式（多选）、gradingMode、rubric、重交与迟交
3. ImportDrawer 能上传 PDF/图片 → 立即生成占位任务 → 后台回填 → 低置信显示并可在 ConflictDrawer 一键修正
4. TotalPoints 实时准确；Preview 可查看学生端不同提交形态
5. 保存草稿成功（刷新后还原）；发布成功（生成 per-class 实例）

# 10) 设计建议（样式）

* 卡片圆角 `xl`、阴影 `sm`、间距 16px 网格
* Chips：type 色系区分（quiz=blue, essay=purple, scan=teal, audio=orange, file=gray）
* 关键操作固定底部/顶部，避免长页滚动丢失按钮
* 支持快捷键：`Del` 删除、`D` 复制、`↑/↓` 移动、`Cmd+S` 保存草稿


