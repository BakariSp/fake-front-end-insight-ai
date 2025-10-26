# 安全优化 - API Key保护方案

## ⚠️ 安全问题

### 问题：NEXT_PUBLIC_ 前缀暴露敏感信息

Vercel（以及Next.js）会将所有 `NEXT_PUBLIC_` 前缀的环境变量**打包到浏览器端代码中**。

**危险示例**：
```bash
# ❌ 这些会暴露到浏览器！
NEXT_PUBLIC_ZHIPU_API_KEY=325e5a96711540e5a5...
NEXT_PUBLIC_ALIYUN_TOKEN=93a92bec5e...
```

任何人都可以在浏览器中查看：
1. 打开开发者工具
2. 查看Network请求
3. 或直接在Console输入：`process.env.NEXT_PUBLIC_ZHIPU_API_KEY`

## ✅ 优化方案

### 架构改变

**之前（不安全）**：
```
浏览器 → 直接调用第三方API（暴露Key）
```

**现在（安全）**：
```
浏览器 → Next.js API路由 → 第三方API（Key在服务器）
```

### 1. 移除 NEXT_PUBLIC_ 前缀

**新的 `.env.local` 配置**：

```bash
# ==============================================
# 智谱AI TTS（服务器端专用）
# ==============================================
# ✅ 没有 NEXT_PUBLIC_ 前缀 = 只在服务器端可用
ZHIPU_API_KEY=你的智谱APIKey

# ==============================================
# 阿里云TTS（服务器端专用）
# ==============================================
# ✅ 没有 NEXT_PUBLIC_ 前缀 = 安全
ALIYUN_APPKEY=你的APPKEY
ALIYUN_TOKEN=你的Token

# 或使用自动Token刷新
ALIYUN_ACCESS_KEY_ID=你的AccessKeyId
ALIYUN_ACCESS_KEY_SECRET=你的Secret
```

### 2. 创建后端API路由

#### ZhipuAI API路由
**文件**：`app/api/tts/zhipu/route.ts`

```typescript
// ✅ 在服务器端读取环境变量
const ZHIPU_API_KEY = process.env.ZHIPU_API_KEY;

// ✅ 服务器端调用第三方API
const response = await fetch('https://open.bigmodel.cn/...', {
  headers: {
    'Authorization': `Bearer ${ZHIPU_API_KEY}`
  }
});
```

#### Aliyun API路由
**文件**：`app/api/tts/aliyun/route.ts`

```typescript
// ✅ 从服务器环境变量读取
const APPKEY = process.env.ALIYUN_APPKEY;
const TOKEN = process.env.ALIYUN_TOKEN;
```

### 3. 前端调用自己的API

**文件**：`app/teacher/magic-tools/text-to-speech/page.tsx`

```typescript
// ✅ 调用自己的API（没有暴露任何Key）
const response = await fetch('/api/tts/zhipu', {
  method: 'POST',
  body: JSON.stringify({ text, voice, speed, volume, format })
});
```

## 🔐 安全级别对比

| 配置方式 | 安全性 | 说明 |
|---------|--------|------|
| `NEXT_PUBLIC_API_KEY=xxx` | ❌ 危险 | 任何人都能看到 |
| `API_KEY=xxx`（前端使用） | ❌ 不可用 | 前端读不到 |
| `API_KEY=xxx`（后端API使用） | ✅ 安全 | 只在服务器端 |

## 📝 迁移步骤

### 步骤1：更新环境变量

编辑 `.env.local`：

```bash
# 旧的（删除或注释掉）
# NEXT_PUBLIC_ZHIPU_API_KEY=xxx
# NEXT_PUBLIC_ALIYUN_TOKEN=xxx

# 新的（移除NEXT_PUBLIC_前缀）
ZHIPU_API_KEY=xxx
ALIYUN_APPKEY=xxx
ALIYUN_TOKEN=xxx
```

### 步骤2：重启服务器

```bash
# 环境变量更改后必须重启
npm run dev
```

### 步骤3：验证

1. **打开浏览器开发者工具**
2. **Console输入**：
   ```javascript
   console.log(process.env)
   ```
3. **确认**：不应该看到任何API Key

## ✅ 优化后的好处

### 1. 安全性 🔒
- ✅ API Key永不暴露到浏览器
- ✅ 用户无法窃取你的Key
- ✅ 符合安全最佳实践

### 2. 成本控制 💰
- ✅ 防止API Key被盗用
- ✅ 避免意外的高额费用
- ✅ 可以添加速率限制

### 3. 可维护性 🛠️
- ✅ 更容易更换API Key
- ✅ 可以添加日志记录
- ✅ 可以实现缓存策略

### 4. 功能扩展 🚀
- ✅ 可以添加权限验证
- ✅ 可以记录使用统计
- ✅ 可以实现配额管理

## 🚨 注意事项

### Vercel部署

在Vercel部署时，需要在Vercel Dashboard配置环境变量：

1. 进入项目 Settings
2. 找到 Environment Variables
3. 添加**不带NEXT_PUBLIC_前缀**的变量：
   - `ZHIPU_API_KEY`
   - `ALIYUN_APPKEY`
   - `ALIYUN_TOKEN`

### 本地开发

确保 `.env.local` 不要提交到Git：

```bash
# .gitignore 已包含
.env*
!.env.example
```

## 📊 性能影响

### 延迟增加？
**几乎没有**：
- 本地API路由处理：< 1ms
- 与直接调用第三方API相比：可忽略不计

### 服务器负载？
**最小化**：
- 只是简单的请求转发
- 不做复杂处理
- 可以添加缓存优化

## 🎯 最佳实践总结

### ✅ DO（推荐做法）

1. **敏感信息只在服务器端**
   ```bash
   API_KEY=xxx  # ✅ 服务器专用
   ```

2. **通过API路由访问**
   ```typescript
   fetch('/api/tts/zhipu', { ... })  // ✅ 安全
   ```

3. **添加错误处理和日志**
   ```typescript
   console.log('[API] Request from:', req.headers.get('user-agent'));
   ```

### ❌ DON'T（避免做法）

1. **不要使用NEXT_PUBLIC_前缀存储敏感信息**
   ```bash
   NEXT_PUBLIC_API_KEY=xxx  # ❌ 危险！
   ```

2. **不要在前端直接调用第三方API**
   ```typescript
   fetch('https://api.third-party.com', {
     headers: { 'API-Key': key }  // ❌ 暴露Key
   })
   ```

3. **不要在代码中硬编码Key**
   ```typescript
   const API_KEY = 'sk-xxx';  // ❌ 绝对不要这样！
   ```

## 📚 相关资源

- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [API Routes Security](https://nextjs.org/docs/api-routes/introduction)

---

**记住**：任何带 `NEXT_PUBLIC_` 的变量都会被打包到浏览器！
**原则**：敏感信息永远只在服务器端！🔒

