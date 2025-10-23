# 教师端后端开发快速参考

> 本文档基于 `teacher-flow.md` 提取关键信息，供后端开发快速查阅

---

## 📊 核心数据模型总览

### 1. Communication Center 相关

#### SchoolAnnouncement（学校通知）
```javascript
{
  id: string,
  title: string,
  content: string,
  publishDate: string,
  target: string,              // "All Teachers", "Grade 6", etc.
  status: 'unread' | 'read' | 'confirmed',
  requireConfirmation: boolean,
  priority: 'low' | 'normal' | 'high',
}
```

#### ParentNotice（家长通知）
```javascript
{
  id: string,
  title: string,
  type: 'general' | 'homework' | 'event' | 'urgent' | 'reminder',
  content: string,
  sendDate: string,
  readCount: number,
  totalRecipients: number,
  recipientType: 'class' | 'all',
  selectedClasses: [classId],
  priority: 'low' | 'normal' | 'high',
  requireConfirmation: boolean,
}
```

#### TeacherCollaboration（教师协作文件）
```javascript
{
  id: string,
  fileName: string,
  description: string,
  groupName: string,
  groupId: string,
  uploadedBy: string,
  uploadDate: string,
  fileUrl: string,
  fileType: string,
  fileSize: string,
  scope: 'group',              // 固定为 group
}
```

#### Contact（联系人）
```javascript
{
  id: string,
  name: string,
  role: 'parent' | 'teacher' | 'admin',
  email: string,
  phone: string,               // 可选
  relatedStudent: string,      // 家长关联的学生名
  avatar: string,
  department: string,          // 教师的部门
}
```

---

### 2. Resource Library 相关

#### Resource（资源文件）- 统一数据模型
```javascript
{
  id: string,
  title: string,
  description: string,
  type: 'folder' | 'pdf' | 'video' | 'ppt' | 'doc' | 'link',
  subject: string,             // 学科
  uploadedBy: string,
  uploadDate: string,
  fileSize: string,
  downloads: number,
  tags: string[],
  scope: 'personal' | 'school' | 'group' | 'class',  // 🔑 关键字段
  isFavorite: boolean,
  
  // AI 推荐字段
  isAIRecommended: boolean,
  recommendationReason: string,
  
  // 文件夹字段
  folder: string,              // 所属文件夹
  itemCount: number,           // 文件夹内文件数
}
```

---

## 🔐 权限控制矩阵

### Communication Center

| 功能 | 普通教师 | 组长 | 管理员 |
|------|----------|------|--------|
| 查看学校通知 | ✅ | ✅ | ✅ |
| 创建学校通知 | ❌ | ❌ | ✅ |
| 创建家长通知 | ✅（自己班级） | ✅ | ✅ |
| 查看组文件 | ✅（所属组） | ✅ | ✅ |
| 上传组文件 | ✅ | ✅ | ✅ |
| 删除组文件 | ❌ | ✅ | ✅ |

### Resource Library

| Scope | 普通教师 | 组长 | 管理员 |
|-------|----------|------|--------|
| personal | 完全控制（自己的） | - | - |
| school | 查看/下载 | 查看/下载 | 完全控制 |
| group | 查看/下载/上传（所属组） | 完全控制 | 完全控制 |
| class | 完全控制（自己的班级） | - | 完全控制 |

---

## 🎯 关键查询逻辑

### Communication Center

#### D1 - 学校通知列表
```sql
-- 筛选条件示例
WHERE teacherId = :currentTeacherId
  AND (status = :filterStatus OR :filterStatus IS NULL)
  AND publishDate BETWEEN :dateFrom AND :dateTo
  AND (title LIKE :search OR content LIKE :search)
ORDER BY publishDate DESC
```

#### D2 - 家长通知列表
```sql
-- 只显示教师自己创建的通知
WHERE createdBy = :currentTeacherId
  AND (type = :filterType OR :filterType IS NULL)
  AND sendDate BETWEEN :dateFrom AND :dateTo
ORDER BY sendDate DESC
```

#### D3 - 教师协作文件
```sql
-- 显示教师所属组的所有文件
WHERE scope = 'group'
  AND groupId IN (SELECT groupId FROM TeacherGroups WHERE teacherId = :currentTeacherId)
ORDER BY uploadDate DESC
```

#### D4 - 通讯录
```sql
-- 教师可查看的联系人
WHERE (role IN ('teacher', 'admin'))
   OR (role = 'parent' AND relatedStudentId IN (
       SELECT studentId FROM ClassStudents 
       WHERE classId IN (SELECT classId FROM TeacherClasses WHERE teacherId = :currentTeacherId)
   ))
```

---

### Resource Library

#### H1 - 我的上传
```sql
WHERE scope = 'personal' 
  AND uploadedById = :currentTeacherId
  AND (subject = :filterSubject OR :filterSubject = 'all')
  AND (type = :filterType OR :filterType = 'all')
  AND (title LIKE :search OR description LIKE :search OR :tagId IN tags)
ORDER BY uploadDate DESC
```

#### H2 - 学校资源（根目录）
```sql
-- 显示文件夹和根目录文件
WHERE scope IN ('school', 'group')
  AND (scope = 'school' OR groupId IN (教师所属组))
  AND (type = 'folder' OR folder IS NULL)
ORDER BY type DESC, title ASC  -- 文件夹在前
```

#### H2 - 学校资源（文件夹内）
```sql
-- 显示特定文件夹内的文件
WHERE scope IN ('school', 'group')
  AND folder = :folderName
ORDER BY uploadDate DESC
```

#### H3 - AI 推荐
```sql
WHERE isAIRecommended = true
  AND recommendedForTeacherId = :currentTeacherId
ORDER BY recommendationScore DESC
```

#### H4 - 收藏夹
```sql
-- 从 Favorites 表关联查询
SELECT r.* FROM Resources r
JOIN Favorites f ON r.id = f.resourceId
WHERE f.teacherId = :currentTeacherId
ORDER BY f.createdAt DESC
```

---

## 📦 重要业务逻辑

### 1. Communication Center

**创建家长通知流程：**
1. 验证必填字段：title, content, selectedClasses 至少一个
2. 计算 totalRecipients：
   - 如果 recipientType = 'all'：所有班级的家长总数
   - 如果 recipientType = 'class'：selectedClasses 中的家长总数
3. 创建通知记录
4. 为每个家长创建通知接收记录
5. 返回成功状态和接收人数

**已读统计逻辑：**
- readCount = 已标记为已读的家长数
- totalRecipients = 总接收家长数
- readRate = readCount / totalRecipients

---

### 2. Resource Library

**文件夹导航逻辑：**
- **根目录**：`folder IS NULL AND type = 'folder'` → 显示所有文件夹
- **进入文件夹**：`folder = '文件夹名'` → 显示该文件夹内的文件
- **返回**：重置 folder 筛选

**Scope 权限过滤：**
```javascript
// 伪代码
function filterByScope(scope, resourceOwnerId, teacherId, teacherGroups) {
  if (scope === 'personal') {
    return resourceOwnerId === teacherId;
  }
  if (scope === 'school') {
    return true;  // 所有教师可见
  }
  if (scope === 'group') {
    return teacherGroups.includes(resource.groupId);
  }
  if (scope === 'class') {
    return teacherClasses.includes(resource.classId);
  }
}
```

**收藏操作：**
- 添加收藏：INSERT INTO Favorites (teacherId, resourceId, createdAt)
- 取消收藏：DELETE FROM Favorites WHERE teacherId = ? AND resourceId = ?
- 查询是否已收藏：SELECT COUNT(*) FROM Favorites WHERE ...

---

## 🔄 模块间数据关系

### Communication Center ↔ Resource Library

**共享数据：** Teacher Collaboration 文件

```
┌─────────────────────────────┐
│  Communication Center       │
│  D3: Teacher Collaboration  │ ─┐
└─────────────────────────────┘  │
                                 │  共享数据
┌─────────────────────────────┐  │  scope = 'group'
│  Resource Library           │  │
│  H2: School Resources       │ ─┘
└─────────────────────────────┘
```

**实现逻辑：**
- 两个模块查询同一张 Resources 表
- Communication Center 筛选：`scope = 'group'`
- Resource Library 筛选：`scope IN ('school', 'group')`
- 更新操作在 Resource Library，Communication Center 自动同步

---

## 📝 数据格式规范

### 日期时间格式
- 存储：ISO 8601 格式（`2025-10-22T10:30:00Z`）
- 显示：`YYYY.MM.DD HH:mm:ss` 或 `YYYY.MM.DD`

### 文件大小格式
- 小于 1KB：显示字节数 "512 B"
- 小于 1MB：显示 KB "256 KB"
- 大于 1MB：显示 MB "2.4 MB"

### Badge 颜色映射
```javascript
// Status
'unread' → warning (黄色)
'read' → info (蓝色)
'confirmed' → success (绿色)

// Role
'parent' → info (蓝色)
'teacher' → success (绿色)
'admin' → warning (橙色)

// Priority
'low' → secondary (灰色)
'normal' → primary (蓝色)
'high' → danger (红色)
```

---

## 🚀 性能优化建议

### 1. 索引建议
```sql
-- Resources 表
CREATE INDEX idx_resources_scope ON Resources(scope);
CREATE INDEX idx_resources_uploader ON Resources(uploadedById);
CREATE INDEX idx_resources_folder ON Resources(folder);
CREATE INDEX idx_resources_date ON Resources(uploadDate DESC);

-- Favorites 表
CREATE INDEX idx_favorites_teacher ON Favorites(teacherId, createdAt DESC);

-- TeacherGroups 表
CREATE INDEX idx_teacher_groups ON TeacherGroups(teacherId, groupId);
```

### 2. 分页建议
- 默认每页 20 条记录
- 最大每页 100 条记录
- 使用 OFFSET/LIMIT 或游标分页

### 3. 缓存策略
- 教师所属组列表：缓存 1 小时
- 班级列表：缓存 30 分钟
- 文件列表：缓存 5 分钟
- 统计数据：缓存 10 分钟

---

## ❓ 常见问题

**Q: 如何区分 Communication Center 和 Resource Library 中的组文件？**  
A: 两者显示相同的数据（scope = 'group'），但 Communication Center 是展示型页面，Resource Library 是完整管理页面。

**Q: 文件夹导航需要支持多层级吗？**  
A: 当前前端实现仅支持一层文件夹（folder 字段为字符串），如需多层级，建议改为 folderPath 或使用文件夹 ID 树结构。

**Q: AI 推荐如何生成？**  
A: 后端可定期运行 AI 推荐任务，根据教师的上传历史、教授学科、组内热门文件等生成推荐，存入 AIRecommendations 表。

**Q: 家长通知的多渠道发送如何实现？**  
A: 创建通知时记录发送渠道偏好，然后异步调用邮件/SMS 服务。站内通知为主，其他渠道为辅助。

---

## 📚 相关文档

- **完整需求文档：** `doc/teacher-flow.md`
- **前端实现代码：**
  - Communication: `app/teacher/communication/page.tsx`
  - Resource Library: `app/teacher/resource-library/page.tsx`
- **Mock 数据参考：** `app/data/mockData.ts`

