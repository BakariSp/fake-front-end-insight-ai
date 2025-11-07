# 手写输入功能文档 (Handwriting Input Feature)

## 概述 (Overview)

为了优化学生作业提交体验，特别是为使用 iPad 和 Apple Pencil 的学生提供更便捷的答题方式，我们在开放式问题（Open-Ended Questions）中新增了三种输入模式：

1. **Type In（打字输入）** - 传统的文本框输入
2. **Write（手写输入）** - Canvas 手写画板，支持触控笔
3. **Upload（上传扫描）** - 拍照或上传图片

## 功能特点 (Features)

### 1. 输入模式切换 (Input Mode Switcher)

在每个开放式问题上方，学生可以看到三个模式切换按钮：

- **Type In** - 键盘打字输入（默认模式）
- **Write** - 在画布上手写答案
- **Upload** - 上传手写作业的照片

### 2. 手写画板功能 (Canvas Drawing Features)

#### 画笔工具 (Brush Tools)
- **画笔大小**: 4 种尺寸选项（1px, 2px, 4px, 6px）
- **颜色选择**: 黑色、红色、蓝色、绿色
- 可视化的画笔预览

#### 操作按钮 (Action Buttons)
- **Undo（撤销）**: 撤销上一步绘画操作
- **Clear（清除）**: 清空整个画布
- **Save Drawing（保存绘图）**: 将画布内容保存为图片

#### 触控支持 (Touch Support)
- ✅ 支持鼠标绘图
- ✅ 支持触摸屏绘图
- ✅ 完美支持 Apple Pencil 和其他触控笔
- ✅ 防止意外滚动（`touch-action: none`）

### 3. 响应式设计 (Responsive Design)

#### 桌面端 (Desktop)
- 工具栏横向排列
- 画布高度 400px
- 完整的工具选项显示

#### 平板端 (Tablet - 768px)
- 模式切换按钮纵向排列
- 工具栏纵向布局
- 画布高度 300px
- 更大的按钮和触控区域

#### 手机端 (Mobile - 480px)
- 全宽按钮布局
- 工具选项自适应宽度
- 优化的触控体验

## 技术实现 (Technical Implementation)

### 文件位置 (File Locations)

```
app/student/class/[classId]/assignments/[assignmentId]/
├── OnlineQuizView.tsx           # 主要组件逻辑
└── assignmentDetail.module.css  # 样式文件
```

### 核心功能 (Core Functions)

#### Canvas 初始化
```typescript
const initCanvas = () => {
  // 设置画布尺寸和白色背景
  // 保存初始状态用于撤销功能
}
```

#### 绘画逻辑
```typescript
const startDrawing = (e) => { /* 开始绘画 */ }
const draw = (e) => { /* 持续绘画 */ }
const stopDrawing = () => { /* 停止绘画 */ }
```

#### 画布操作
```typescript
const clearCanvas = () => { /* 清除画布 */ }
const undoCanvas = () => { /* 撤销操作 */ }
const saveCanvasAsImage = () => { /* 保存为图片 */ }
```

### 状态管理 (State Management)

```typescript
const [inputMode, setInputMode] = useState<'type' | 'write' | 'upload'>('type');
const [isDrawing, setIsDrawing] = useState(false);
const [brushSize, setBrushSize] = useState(2);
const [brushColor, setBrushColor] = useState('#000000');
const [canvasHistory, setCanvasHistory] = useState<ImageData[]>([]);
```

## 使用场景 (Use Cases)

### 适合使用手写模式的场景

1. **数学题** - 需要写公式和计算过程
2. **图形题** - 需要画图表、几何图形
3. **物理化学** - 需要画分子结构、力学图
4. **语文作文** - 手写练习
5. **草稿演算** - 展示思考过程

### 适合使用上传模式的场景

1. 纸质作业的拍照上传
2. 已经完成的手写作业
3. 多页答卷的上传

### 适合使用打字模式的场景

1. 纯文字答案
2. 需要编辑修改的长文本
3. 方便复制粘贴的内容

## iPad 优化 (iPad Optimization)

### Apple Pencil 支持

- ✅ **压感识别**: 虽然基础实现不支持压感，但可以流畅书写
- ✅ **精确定位**: 支持精确的笔尖定位
- ✅ **防掌误触**: 使用 `touch-action: none` 防止手掌误触
- ✅ **低延迟**: 使用 Canvas API 实现低延迟绘图

### 用户体验优化

1. **大触控区域**: 按钮尺寸至少 36x36px
2. **清晰反馈**: 活动状态有明确的视觉反馈
3. **流畅动画**: 使用 CSS transitions 提供流畅过渡
4. **友好提示**: "✏️ Draw your answer above. Perfect for iPad with Apple Pencil!"

## 未来改进 (Future Enhancements)

### 可能的功能扩展

1. **橡皮擦工具** - 添加橡皮擦功能
2. **更多颜色** - 颜色选择器
3. **图形工具** - 直线、圆形、矩形等几何工具
4. **文本工具** - 在画布上添加文字
5. **图层支持** - 多图层绘图
6. **导出格式** - 支持 PDF、SVG 等格式
7. **压感支持** - 利用 Pointer Events API 支持压感
8. **手势识别** - 识别常见的几何图形

### 性能优化

1. **Canvas 渲染优化** - 使用离屏 Canvas 提升性能
2. **历史记录限制** - 限制撤销步骤数量，避免内存溢出
3. **图片压缩** - 保存时自动压缩图片大小

## 测试建议 (Testing Recommendations)

### 设备测试

- [ ] Windows PC + 鼠标
- [ ] MacBook + 触控板
- [ ] iPad + Apple Pencil
- [ ] iPad + 手指触控
- [ ] Android 平板 + 触控笔
- [ ] iPhone / Android 手机

### 功能测试

- [ ] 模式切换是否流畅
- [ ] 绘画功能是否正常
- [ ] 撤销功能是否准确
- [ ] 保存图片是否成功
- [ ] 多个问题之间状态是否独立
- [ ] 提交后数据是否保存

## 注意事项 (Notes)

1. **浏览器兼容性**: 需要现代浏览器支持 Canvas API
2. **内存管理**: 长时间绘图可能占用较多内存
3. **图片大小**: 保存的 PNG 图片可能较大，建议添加压缩
4. **数据持久化**: 切换问题时，当前画布内容会丢失（除非先保存）

## 结论 (Conclusion)

这个手写输入功能为学生提供了更灵活、更符合自然学习习惯的答题方式，特别适合使用 iPad 的学生。通过三种输入模式的自由切换，学生可以根据题目类型选择最合适的答题方式。

---

**最后更新**: 2024-11-07  
**版本**: 1.0.0  
**作者**: InsightAI Education Platform Team

