# Aliyun 简单配置指南（使用固定Token）

## 快速配置

如果你已经有阿里云Token，这是最简单的配置方法！

### 1. 在 `.env.local` 中添加

```bash
# Aliyun APPKEY (从控制台获取)
ALIYUN_APPKEY=你的appkey

# Aliyun Token (从控制台或API获取)
NEXT_PUBLIC_ALIYUN_TOKEN=你的token
```

或者使用旧的变量名（兼容）：
```bash
NEXT_PUBLIC_ALIYUN_CANTONESE_APPKEY=你的appkey
NEXT_PUBLIC_ALIYUN_TOKEN=你的token
```

### 2. 重启开发服务器

```bash
# Ctrl+C 停止，然后
npm run dev
```

### 3. 测试

选择"Cantonese 粤语"，输入文本，生成语音！

## 获取Token和APPKEY

### 方法1：阿里云控制台

1. 登录 [智能语音交互控制台](https://nls-portal.console.aliyun.com/applist)
2. 选择你的应用
3. 复制 **APPKEY**
4. 点击"获取Token"或"Token管理"
5. 复制 **Token**

### 方法2：通过API获取

如果控制台没有直接获取Token的选项，可以用AccessKey获取：

```bash
curl -X GET \
  'http://nls-meta.cn-shanghai.aliyuncs.com/?Action=CreateToken&AccessKeyId=YOUR_ACCESS_KEY_ID&...'
```

或使用我们提供的自动Token API（如果你有AccessKey）。

## 注意事项

### Token会过期！⚠️

阿里云Token有效期约 **24小时**。

**Token过期后会看到错误**：
```
POST /api/tts/aliyun 500
Aliyun TTS failed: Token expired
```

**解决方法**：
1. 重新获取Token
2. 更新 `.env.local`
3. 重启服务器

### 自动Token刷新（高级）

如果不想每天更新Token，可以配置自动Token获取。

在 `.env.local` 添加（**除了**APPKEY和TOKEN）：

```bash
# 自动Token获取（可选）
ALIYUN_ACCESS_KEY_ID=你的AccessKeyId
ALIYUN_ACCESS_KEY_SECRET=你的AccessKeySecret
```

系统会自动获取和刷新Token，无需手动管理。

详见：`doc/ALIYUN_TOKEN_SETUP.md`

## 环境变量优先级

系统会按以下顺序查找配置：

1. **ALIYUN_APPKEY** 或 **NEXT_PUBLIC_ALIYUN_CANTONESE_APPKEY**
2. **NEXT_PUBLIC_ALIYUN_TOKEN** （如果设置，直接使用）
3. 自动获取Token（如果配置了AccessKey）

## 完整示例

`.env.local` 文件内容：

```bash
# ========================================
# Aliyun 粤语TTS配置
# ========================================

# APPKEY（必需）
ALIYUN_APPKEY=4xkL9H3mS6gQ2pN8

# Token（必需，24小时有效）
NEXT_PUBLIC_ALIYUN_TOKEN=abc123def456ghi789jkl...

# ========================================
# 可选：自动Token获取（推荐用于生产环境）
# ========================================
# ALIYUN_ACCESS_KEY_ID=LTAI5t...
# ALIYUN_ACCESS_KEY_SECRET=abc123...
```

## 测试配置

### 1. 检查环境变量

创建测试页面或直接在浏览器开发者工具：

```javascript
// 在浏览器控制台无法直接访问环境变量
// 但可以通过API测试
fetch('/api/tts/aliyun', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    text: '你好',
    voice: 'siyue',
    speed: 1.0,
    volume: 1.0,
    format: 'wav'
  })
})
```

### 2. 查看服务器日志

终端应该显示：

```
[Aliyun TTS] Credentials check: {
  hasAppkey: true,
  hasToken: true,
  appkeyFromEnv: true,
  tokenFromEnv: true
}
[Aliyun TTS] Using provided token
[Aliyun TTS] Creating SpeechSynthesizer...
[Aliyun TTS] SpeechSynthesizer created successfully
```

### 3. 测试粤语生成

1. 打开应用
2. 进入 Text-to-Speech 工具
3. 选择 "Cantonese 粤语"
4. 输入：`你好，今日天氣好唔好呀？`
5. 点击 "Generate Speech"
6. 应该生成完美的粤语音频！

## 常见问题

### Q: Token从哪里获取？

**A**: 
1. [阿里云控制台](https://nls-portal.console.aliyun.com/applist)
2. 或通过Token API获取
3. 或让系统自动获取（配置AccessKey）

### Q: Token多久过期？

**A**: 约24小时。过期后需要重新获取。

### Q: 可以使用永久Token吗？

**A**: 不可以。阿里云Token都有有效期。

**解决方案**：配置AccessKey实现自动刷新。

### Q: 配置后还是500错误？

**A**: 检查：
1. Token是否过期（24小时）
2. APPKEY是否正确
3. 服务器是否重启
4. 查看终端日志具体错误

### Q: 网络连接超时？

**A**: 
- 检查是否能访问 `nls-gateway-cn-shanghai.aliyuncs.com`
- 可能是防火墙或网络问题
- WebSocket连接需要特定端口（443）

## 快速故障排除

| 错误信息 | 原因 | 解决方法 |
|---------|------|---------|
| Missing APPKEY | 未配置APPKEY | 检查 `.env.local` |
| No token available | 未配置Token | 添加 `NEXT_PUBLIC_ALIYUN_TOKEN` |
| Token expired | Token过期 | 重新获取Token |
| Invalid appkey | APPKEY错误 | 检查控制台中的APPKEY |
| Connect timeout | 网络问题 | 检查网络连接 |

## 生产环境建议

### 推荐配置

**开发环境**：使用固定Token（简单）
```bash
NEXT_PUBLIC_ALIYUN_TOKEN=...
```

**生产环境**：使用自动Token（稳定）
```bash
ALIYUN_ACCESS_KEY_ID=...
ALIYUN_ACCESS_KEY_SECRET=...
```

### 为什么？

- 开发：手动更新Token可以接受
- 生产：自动刷新，服务永不中断

## 完整配置示例

### 最简配置（开发环境）✅

```bash
ALIYUN_APPKEY=你的appkey
NEXT_PUBLIC_ALIYUN_TOKEN=你的token
```

### 推荐配置（生产环境）✅✅

```bash
ALIYUN_APPKEY=你的appkey
ALIYUN_ACCESS_KEY_ID=你的access_key_id
ALIYUN_ACCESS_KEY_SECRET=你的access_key_secret
```

## 相关文档

- `ALIYUN_TOKEN_SETUP.md` - 自动Token配置（推荐生产环境）
- `ALIYUN_TROUBLESHOOTING.md` - 问题排查指南
- `DUAL_API_IMPLEMENTATION.md` - 技术实现文档

---

**配置完成后，粤语TTS就能完美工作了！** 🎉

**Last Updated**: October 26, 2025

