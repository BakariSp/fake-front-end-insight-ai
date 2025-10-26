# 🔒 安全的环境变量配置

## ⚠️ 重要：移除 NEXT_PUBLIC_ 前缀！

原来的配置方式会将API Key暴露到浏览器，**非常危险**！

## 📝 正确的配置方式

### 创建 `.env.local` 文件

在项目根目录创建 `.env.local`，添加以下内容：

```bash
# ==============================================
# 智谱AI TTS（普通话 & 英语）
# ==============================================
# ✅ 没有 NEXT_PUBLIC_ 前缀（只在服务器端使用）
ZHIPU_API_KEY=你的智谱APIKey

# ==============================================
# 阿里云TTS（粤语 - Kelly发音人）
# ==============================================
# ✅ 没有 NEXT_PUBLIC_ 前缀（安全）
ALIYUN_APPKEY=你的APPKEY
ALIYUN_TOKEN=你的Token

# 可选：自动Token刷新（推荐）
ALIYUN_ACCESS_KEY_ID=你的AccessKeyId
ALIYUN_ACCESS_KEY_SECRET=你的AccessKeySecret
```

## 🔄 从旧配置迁移

### 旧配置（删除这些）❌

```bash
# ❌ 删除或注释掉这些
NEXT_PUBLIC_ZHIPU_API_KEY=xxx
NEXT_PUBLIC_ALIYUN_CANTONESE_APPKEY=xxx
NEXT_PUBLIC_ALIYUN_TOKEN=xxx
```

### 新配置（使用这些）✅

```bash
# ✅ 使用这些新的
ZHIPU_API_KEY=xxx
ALIYUN_APPKEY=xxx
ALIYUN_TOKEN=xxx
```

## 🚀 配置后重启

```bash
# 停止服务器（Ctrl+C）
npm run dev
```

## ✅ 验证安全性

### 测试1：浏览器Console

```javascript
// 在浏览器开发者工具中输入
console.log(process.env.ZHIPU_API_KEY)
// 应该输出: undefined ✅

console.log(process.env.NEXT_PUBLIC_ZHIPU_API_KEY)  
// 应该输出: undefined ✅
```

### 测试2：功能测试

- 普通话/英语生成 → 应该正常工作 ✅
- 粤语生成 → 应该正常工作 ✅
- 但Key不会暴露 ✅

## 📊 架构改变

### 之前（不安全）

```
浏览器代码
  ↓
const KEY = process.env.NEXT_PUBLIC_API_KEY  ← 暴露
  ↓
fetch('https://third-party-api.com', {
  headers: { 'Authorization': KEY }  ← 可见
})
```

### 现在（安全）

```
浏览器代码
  ↓
fetch('/api/tts/zhipu', { ... })  ← 只调用自己的API
  ↓
Next.js API路由（服务器端）
  ↓
const KEY = process.env.ZHIPU_API_KEY  ← 不暴露
  ↓
fetch('https://third-party-api.com', {
  headers: { 'Authorization': KEY }  ← 不可见
})
```

## 🔍 Vercel警告解释

你看到的警告：

> "This key, which is prefixed with NEXT_PUBLIC_ and includes the term KEY, might expose sensitive information to the browser."

**意思**：
- 任何 `NEXT_PUBLIC_` 开头的变量会打包到前端JS中
- 如果变量名包含 "KEY"、"SECRET"、"TOKEN" 等，可能是敏感信息
- Vercel提醒你这不安全

**解决方法**：
移除 `NEXT_PUBLIC_` 前缀，通过API路由访问！

## 📂 文件修改汇总

### 创建的API路由

1. **`app/api/tts/zhipu/route.ts`** ✅
   - 服务器端调用智谱AI
   - 保护API Key

2. **`app/api/tts/aliyun/route.ts`** ✅（已存在）
   - 服务器端调用阿里云
   - 保护APPKEY和Token

### 修改的前端代码

1. **`app/teacher/magic-tools/text-to-speech/page.tsx`** ✅
   - 移除前端API Key引用
   - 改为调用后端API路由

## 🎉 配置示例

### 开发环境 `.env.local`

```bash
# 智谱AI
ZHIPU_API_KEY=325e5a96711540e5a5e35b2e361692c4.5mdsgQl5GTPtvpGm

# 阿里云
ALIYUN_APPKEY=tkMzj2qJ85lRdgzD
ALIYUN_TOKEN=93a92bec5e...（你的24小时token）

# 可选：自动token
ALIYUN_ACCESS_KEY_ID=LTAI5tKCFB...
ALIYUN_ACCESS_KEY_SECRET=pekCXcLp9Q...
```

### 生产环境（Vercel）

在Vercel Dashboard设置相同的变量（不带NEXT_PUBLIC_前缀）

## 总结

✅ **移除所有 NEXT_PUBLIC_ 前缀**  
✅ **通过API路由访问第三方服务**  
✅ **API Key只在服务器端**  
✅ **浏览器永远看不到Key**  

**这样就安全了！** 🔒

---

**立即行动**：更新 `.env.local`，移除 `NEXT_PUBLIC_` 前缀，重启服务器！

