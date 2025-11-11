# 教师端班级作业管理系统

## 快速开始

### 访问路径

1. **作业列表页**: `/teacher/class/[classId]/assignments`
2. **作业详情页**: `/teacher/class/[classId]/assignments/[assignmentId]`
3. **审阅页面**: `/teacher/class/[classId]/assignments/[assignmentId]/review`

### 示例路径

使用Mock数据测试：
- 列表页: `/teacher/class/class-001/assignments`
- 详情页: `/teacher/class/class-001/assignments/assignment-graded-001`
- 审阅页: `/teacher/class/class-001/assignments/assignment-graded-001/review`

## 功能概览

### 1. 作业列表
- 查看班级所有作业
- 三种状态：Draft / Published / Graded
- 搜索和筛选
- 显示提交进度和平均分

### 2. AI评分分析（重点功能）

#### 成绩分析
- 📊 分数分布图表
- 📈 整体统计（平均分、最高分、最低分）
- ⭐ 优秀表现总结

#### 题目分析
- 每道题的正确率和平均分
- 难度等级（Easy/Medium/Hard）
- 常见错误列表

#### 薄弱点分析（核心亮点）
AI自动识别班级薄弱知识点：
- 影响学生数量和百分比
- 问题描述
- 具体改进建议（4-5条）
- 相关题目链接

### 3. 逐题审阅
- 逐个学生、逐道题目审阅
- 查看AI评分和评语
- 修改分数
- 添加教师评语
- 实时进度跟踪

## 数据结构

### Mock数据
- `mockData.ts`: 包含完整的示例数据
  - 3个作业（不同状态）
  - 5个学生提交
  - 完整的班级分析数据

### 类型定义
- `types.ts`: 所有TypeScript类型定义

## 技术特点

- ✅ 完全静态/Mock数据
- ✅ 响应式设计
- ✅ 清晰的视觉层级
- ✅ 流畅的用户体验
- ✅ 教育性代码示例

## 文件结构

```
assignments/
├── README.md                    # 本文件
├── types.ts                     # 类型定义
├── mockData.ts                  # Mock数据
├── page.tsx                     # 列表页
├── assignments.module.css       # 列表页样式
├── [assignmentId]/
│   ├── page.tsx                 # 详情页
│   ├── assignmentDetail.module.css
│   └── review/
│       ├── page.tsx             # 审阅页
│       └── review.module.css
```

## 设计亮点

### 1. 语文作业示例
选择了语文科目的作业作为示例：
- 选择题：文言文虚词用法
- 填空题：古诗词默写
- 问答题：诗歌鉴赏、文言文翻译、作文

### 2. 真实的薄弱点分析
提供了三个典型的语文学习薄弱点：
1. 文言文翻译
2. 诗歌鉴赏表现手法分析
3. 论述题的深度与广度

每个薄弱点都包含详细的建议。

### 3. AI评语质量
AI评语非常详细和有建设性：
- 指出优点
- 说明不足
- 给出改进方向
- 语言专业且友好

## 使用建议

### 教师工作流程

1. **查看整体情况**
   - 进入作业列表，查看已评分作业
   - 点击"View Results"进入详情

2. **分析班级表现**
   - 查看Overview了解分数分布
   - 查看Analysis了解薄弱点
   - 记录教学改进点

3. **审阅学生作业**
   - 点击"Start Review"
   - 浏览AI评分和评语
   - 根据需要调整分数
   - 添加个性化反馈
   - 保存并继续下一个学生

4. **后续教学调整**
   - 根据薄弱点分析设计针对性练习
   - 在课堂上讲解常见错误
   - 跟踪后续作业的改进情况

## 扩展方向

未来可以实现：
- 连接真实的AI评分API
- 批量操作功能
- 导出成绩报告
- 学生端查看反馈界面
- 历史数据对比

## 相关文档

详细的功能说明和设计理念，请查看：
`doc/teacher_class_assignments_flow.md`

