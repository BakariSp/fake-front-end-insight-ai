# Assignment Builder 改进文档

## 概述
本文档记录了对作业构建器（Assignment Builder）的5个主要改进。

## 改进列表

### 1. 修复选择题添加选项功能
**问题**: 在创建选择题时，"添加选项"按钮无法使用。

**原因**: `createDefaultTask`函数没有将`quizConfig`和`fillBlankConfig`复制到新创建的任务中。

**解决方案**:
- 修改了`mockData.ts`中的`createDefaultTask`函数
- 添加了`quizConfig`和`fillBlankConfig`的复制逻辑
- 确保新创建的选择题默认带有4个选项和完整配置

**修改文件**:
- `app/teacher/assignments/mockData.ts`

### 2. 修复填空题输入框功能
**问题**: 填空题的输入框无法输入内容。

**原因**: 与问题1相同，`fillBlankConfig`没有被正确初始化。

**解决方案**:
- 通过修复`createDefaultTask`函数，确保填空题创建时带有默认配置
- 填空题现在默认有提示文本和空白配置数组

**修改文件**:
- `app/teacher/assignments/mockData.ts`

### 3. 添加问答题长短答案选择功能
**问题**: 问答题（essay）需要能够选择使用长答案还是短答案。

**解决方案**:
- 在`types.ts`中添加了`EssayConfig`接口，包含答案类型、字数限制等配置
- 在`mockData.ts`中为essay类型添加了默认配置
- 在`Inspector`组件中添加了可视化的答案类型选择UI
  - 短答案：10-200字，3行输入框
  - 长答案：100-1000字，8行输入框
- 添加了字数限制配置功能
- 在`PreviewModal`中根据配置显示不同大小的输入框

**新增功能**:
- 答案类型选择（短答案/长答案）
- 最小字数配置
- 最大字数配置
- 自定义提示文字

**修改文件**:
- `app/teacher/assignments/types.ts`
- `app/teacher/assignments/mockData.ts`
- `app/teacher/assignments/components/Inspector.tsx`
- `app/teacher/assignments/components/Inspector.module.css`
- `app/teacher/assignments/components/PreviewModal.tsx`

### 4. 实现添加题型后自动滚动
**问题**: 添加新题型后，页面不会自动滚动到新添加的题型位置。

**解决方案**:
- 在`AssignmentBuilder`中添加了`scrollToTaskId`状态
- 在`addTask`函数中设置需要滚动到的任务ID
- 在`Canvas`组件中使用`useRef`和`useEffect`实现自动滚动
- 使用`scrollIntoView`API实现平滑滚动动画
- 滚动到中心位置（`block: 'center'`）以确保最佳可见性

**修改文件**:
- `app/teacher/assignments/components/AssignmentBuilder.tsx`
- `app/teacher/assignments/components/Canvas.tsx`

### 5. 完善Preview预览功能
**问题**: 预览模式需要正确显示quiz和fill-blank题型的内容。

**解决方案**:
- 在`PreviewModal`中添加了quiz题目的选项显示
  - 显示所有选项（A、B、C、D等）
  - 根据题型（单选/多选）显示不同的输入控件
  - 使用禁用状态展示预览效果
  
- 添加了fill-blank题目的空格显示
  - 解析`{{数字}}`格式的空格标记
  - 将空格渲染为输入框
  - 保持题目文本的完整性和可读性

- 改进了essay题目的预览
  - 根据`essayConfig`显示不同大小的输入框
  - 显示字数要求提示
  - 短答案显示3行，长答案显示8行

**新增CSS样式**:
- `.quizPreview` - quiz题目预览容器
- `.quizOptions` - 选项列表
- `.quizOption` - 单个选项样式
- `.optionLetter` - 选项字母标记（A、B、C等）
- `.optionText` - 选项文本
- `.fillBlankPreview` - 填空题预览容器
- `.fillBlankContent` - 填空题内容
- `.blankInput` - 空格输入框
- `.charCount` - 字数统计显示

**修改文件**:
- `app/teacher/assignments/components/PreviewModal.tsx`
- `app/teacher/assignments/components/PreviewModal.module.css`

## 技术细节

### 数据结构变化

#### 新增EssayConfig接口
```typescript
export interface EssayConfig {
  answerType: 'short' | 'long';  // 短答案或长答案
  minLength?: number;            // 最小字数
  maxLength?: number;            // 最大字数
  placeholder?: string;          // 提示文字
}
```

#### Task接口更新
```typescript
export interface Task {
  // ... 其他字段
  essayConfig?: EssayConfig;   // 写作题配置
}
```

### 用户体验改进

1. **添加题型流程优化**
   - 点击添加题型 → 自动滚动到新题型 → 自动打开右侧编辑面板
   - 平滑的滚动动画提供良好的视觉反馈

2. **预览功能增强**
   - 学生视角预览，所见即所得
   - 支持多种题型的正确渲染
   - 禁用交互元素，保持预览状态

3. **essay题型配置直观化**
   - 可视化的短答案/长答案选择卡片
   - 实时字数限制配置
   - 预览中直接显示字数要求

## 测试建议

1. **选择题测试**
   - 创建单选题，添加/删除选项
   - 创建多选题，选择多个正确答案
   - 创建判断题，验证只有两个选项

2. **填空题测试**
   - 输入包含`{{1}}`、`{{2}}`等标记的题目
   - 为每个空格设置答案和分值
   - 在预览中查看空格显示效果

3. **essay题测试**
   - 切换短答案和长答案类型
   - 修改字数限制
   - 在预览中验证输入框大小和字数提示

4. **自动滚动测试**
   - 在已有多个任务时添加新任务
   - 验证页面是否滚动到新任务位置
   - 检查滚动动画是否流畅

5. **预览功能测试**
   - 创建包含多种题型的作业
   - 点击预览按钮
   - 在预览模式中切换不同任务
   - 验证每种题型的显示效果

## 未来改进建议

1. **更多题型支持**
   - 匹配题
   - 排序题
   - 图形题

2. **预览功能增强**
   - 添加答题功能（模拟学生答题）
   - 导出预览为PDF
   - 分享预览链接

3. **性能优化**
   - 大量任务时的虚拟滚动
   - 预览模式的懒加载
   - 图片/视频的优化加载

4. **辅助功能**
   - 键盘快捷键支持
   - 屏幕阅读器支持
   - 高对比度模式

## 总结

本次改进主要集中在修复现有功能bug、增强用户体验和完善预览功能。所有改进都遵循了项目的静态页面和mock数据原则，没有涉及后端集成。代码保持了良好的可读性和可维护性，CSS样式遵循了项目的设计规范。

