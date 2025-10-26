# 🔄 安全迁移指南 - 5分钟完成

## 快速步骤

### 1️⃣ 更新 `.env.local` 文件（2分钟）

打开 `.env.local`，**修改变量名**：

```bash
# ======================================
# 旧配置（删除这些行）❌
# ======================================
# NEXT_PUBLIC_ZHIPU_API_KEY=325e5a96...
# NEXT_PUBLIC_ALIYUN_CANTONESE_APPKEY=tkMzj2qJ85...
# NEXT_PUBLIC_ALIYUN_TOKEN=93a92bec5e...

# ======================================
# 新配置（使用这些）✅
# ======================================

# 智谱AI（去掉NEXT_PUBLIC_前缀）
ZHIPU_API_KEY=325e5a96711540e5a5e35b2e361692c4.5mdsgQl5GTPtvpGm

# 阿里云（去掉NEXT_PUBLIC_前缀）
ALIYUN_APPKEY=tkMzj2qJ85lRdgzD
ALIYUN_TOKEN=93a92bec5e...你的token

# 可选：自动token刷新
ALIYUN_ACCESS_KEY_ID=LTAI5tKCFB...
ALIYUN_ACCESS_KEY_SECRET=pekCXcLp9Q...
```

### 2️⃣ 重启开发服务器（1分钟）

```bash
# 在终端按 Ctrl+C 停止
# 然后重新启动
npm run dev
```

### 3️⃣ 测试功能（2分钟）

1. 打开应用：`http://localhost:3000/teacher/magic-tools/text-to-speech`
2. 测试普通话：选择"Mandarin/English" → 输入中文 → 生成 ✅
3. 测试粤语：选择"Cantonese" → 输入粤语 → 生成 ✅

## ✅ 完成！

现在：
- 🔒 **API Key安全**（不会暴露到浏览器）
- 🎨 **视觉升级**（紫色渐变标题，动画效果）
- 🎤 **智能音色**（粤语自动用Kelly，普通话可选）
- ⚡ **功能完整**（所有功能正常工作）

## 🔍 验证安全性

打开浏览器开发者工具（F12），在Console输入：

```javascript
// 应该都是 undefined
console.log(process.env.ZHIPU_API_KEY)  // undefined ✅
console.log(process.env.ALIYUN_TOKEN)   // undefined ✅
```

## 📋 环境变量对照表

| 旧变量名 | 新变量名 | 说明 |
|---------|---------|------|
| `NEXT_PUBLIC_ZHIPU_API_KEY` | `ZHIPU_API_KEY` | 移除前缀 |
| `NEXT_PUBLIC_ALIYUN_CANTONESE_APPKEY` | `ALIYUN_APPKEY` | 简化名称 |
| `NEXT_PUBLIC_ALIYUN_TOKEN` | `ALIYUN_TOKEN` | 移除前缀 |

## 🎯 为什么要改？

### 安全风险

**之前**：
```javascript
// 任何人在浏览器都能看到
fetch('https://api.third-party.com', {
  headers: { 
    'Authorization': 'Bearer 325e5a96...'  // ← 暴露！
  }
})
```

**现在**：
```javascript
// 只调用自己的API，第三方看不到Key
fetch('/api/tts/zhipu', {
  body: JSON.stringify({ text: '你好' })  // ← 安全！
})
```

### Vercel警告

Vercel检测到你的环境变量：
- ✅ 名称包含 "KEY" 或 "TOKEN"
- ✅ 使用了 NEXT_PUBLIC_ 前缀
- ⚠️ 会暴露到浏览器 = **危险**

## 🚀 部署到Vercel

更新Vercel环境变量：

1. 进入Vercel Dashboard
2. 选择项目 → Settings → Environment Variables
3. **删除旧的**：
   - `NEXT_PUBLIC_ZHIPU_API_KEY`
   - `NEXT_PUBLIC_ALIYUN_CANTONESE_APPKEY`
   - `NEXT_PUBLIC_ALIYUN_TOKEN`

4. **添加新的**：
   - `ZHIPU_API_KEY` = 你的值
   - `ALIYUN_APPKEY` = 你的值
   - `ALIYUN_TOKEN` = 你的值

5. 重新部署

## 📁 代码更改

### 创建的文件 ✅

1. `app/api/tts/zhipu/route.ts` - 智谱AI后端代理
2. `app/api/tts/aliyun/route.ts` - 阿里云后端代理（已存在，已优化）

### 修改的文件 ✅

1. `app/teacher/magic-tools/text-to-speech/page.tsx`
   - 移除前端API Key引用
   - 改为调用后端API

2. `app/teacher/magic-tools/text-to-speech/textToSpeech.module.css`
   - 视觉升级（渐变、动画、3D效果）

## 🎨 视觉优化总结

### 新增视觉效果

1. **紫色渐变标题栏**
   - 白色文字，阴影效果
   - 图标动画（pulse效果）

2. **3D音色卡片**
   - 悬浮效果（hover时上升）
   - 渐变激活状态
   - 流畅过渡动画

3. **粤语专属卡片**
   - 金黄色渐变背景
   - 大号麦克风图标
   - "Exclusive Voice"徽章

4. **超强生成按钮**
   - 光泽扫过动画
   - 更大更明显
   - 点击反馈效果

## ⏱️ 迁移时间表

- **步骤1**：更新 `.env.local`（2分钟）
- **步骤2**：重启服务器（1分钟）
- **步骤3**：测试功能（2分钟）
- **总计**：5分钟 ✅

## 🎉 完成后你会得到

✅ **安全性**：API Key不再暴露  
✅ **美观性**：全新视觉设计  
✅ **智能性**：粤语自动用Kelly  
✅ **功能性**：一切正常工作  
✅ **无警告**：Vercel不再警告  

---

**立即开始迁移，5分钟后享受安全美观的TTS工具！** 🚀

