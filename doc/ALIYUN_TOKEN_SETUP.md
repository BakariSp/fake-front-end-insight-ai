# Aliyun Token自动获取配置指南

## 问题说明

阿里云的Token会过期！每个Token有效期约24小时。如果使用固定的Token，很快就会失效导致500错误。

## 解决方案：自动Token获取

我们实现了自动Token获取和缓存机制，参考[阿里云官方文档](https://help.aliyun.com/zh/isi/getting-started/use-http-or-https-to-obtain-an-access-token)。

## 配置步骤

### 1. 获取阿里云AccessKey

**重要**：不是Token，是AccessKey！用它可以自动生成Token。

#### 获取方法：

1. 登录[阿里云RAM控制台](https://ram.console.aliyun.com/manage/ak)
2. 点击"创建AccessKey"
3. 记下：
   - **AccessKey ID** (类似: LTAI5t...)
   - **AccessKey Secret** (类似: abc123...)
   - ⚠️ **立即保存！关闭后无法再查看Secret！**

### 2. 获取APPKEY

1. 登录[智能语音交互控制台](https://nls-portal.console.aliyun.com/applist)
2. 找到你的应用
3. 复制APPKEY（如果是粤语应用，使用粤语专用的APPKEY）

### 3. 配置环境变量

在项目根目录创建或编辑 `.env.local` 文件：

```bash
# Aliyun APPKEY (应用标识)
ALIYUN_APPKEY=your_appkey_here

# Aliyun AccessKey (用于自动获取Token)
ALIYUN_ACCESS_KEY_ID=LTAI5t...
ALIYUN_ACCESS_KEY_SECRET=abc123...
```

**示例**（请替换为你的真实值）：
```bash
ALIYUN_APPKEY=4xkL9H3mS6gQ2pN8
ALIYUN_ACCESS_KEY_ID=LTAI5tFmK8qR3nP7
ALIYUN_ACCESS_KEY_SECRET=abc123def456ghi789jkl
```

### 4. 重启开发服务器

```bash
# 按 Ctrl+C 停止，然后重新启动
npm run dev
```

## 工作原理

### 自动Token刷新流程

```
用户选择粤语并生成语音
    ↓
检查是否有Token
    ↓
如果没有或已过期
    ↓
调用 /api/tts/aliyun-token
    ↓
使用AccessKey生成新Token
    ↓
缓存Token（有效期内复用）
    ↓
使用Token调用TTS API
```

### Token缓存机制

- ✅ Token获取后会缓存
- ✅ 有效期内复用（不重复请求）
- ✅ 过期前5分钟自动刷新
- ✅ 多个请求共享同一Token

## 测试Token获取

### 方法1：直接访问API

浏览器访问：
```
http://localhost:3000/api/tts/aliyun-token
```

**成功响应**：
```json
{
  "token": "a1b2c3d4e5f6...",
  "expireTime": 1730012345,
  "expireDate": "2025-10-26 18:30:00",
  "cached": false,
  "success": true
}
```

**失败响应**：
```json
{
  "error": "Missing Aliyun credentials",
  "details": "Please set ALIYUN_ACCESS_KEY_ID..."
}
```

### 方法2：查看控制台日志

生成粤语语音时，查看终端应该看到：

```
[Aliyun Token] Fetching new token from Aliyun...
[Aliyun Token] Canonicalized query: AccessKeyId=...
[Aliyun Token] New token obtained, expires at: 2025-10-27 18:30:00
[Aliyun TTS] Token obtained successfully
```

## 常见问题

### Q1: "Missing Aliyun credentials" 错误

**原因**：环境变量未配置或名称错误

**检查**：
```bash
# 在 .env.local 中确认有这三行
ALIYUN_APPKEY=...
ALIYUN_ACCESS_KEY_ID=...
ALIYUN_ACCESS_KEY_SECRET=...
```

**注意**：
- ❌ 不要用引号：`ALIYUN_APPKEY="xxx"` 
- ✅ 直接写值：`ALIYUN_APPKEY=xxx`

### Q2: "Failed to get token: 401" 错误

**原因**：AccessKey或Secret错误

**解决**：
1. 重新检查AccessKey ID和Secret是否正确
2. 确认AccessKey没有被删除或禁用
3. 登录[RAM控制台](https://ram.console.aliyun.com/manage/ak)验证

### Q3: "Failed to get token: 403" 错误

**原因**：权限不足

**解决**：
1. 确保AccessKey有智能语音服务权限
2. 检查账户是否欠费
3. 确认服务已开通

### Q4: Token获取很慢

**原因**：网络问题或首次获取

**正常情况**：
- 首次获取：1-2秒
- 缓存命中：<100ms

**如果超过5秒**：
- 检查网络连接
- 尝试访问 `http://nls-meta.cn-shanghai.aliyuncs.com/` 测试连通性

### Q5: 每次都重新获取Token

**原因**：缓存机制未生效

**检查**：
```javascript
// 应该看到 cached: true
{
  "token": "...",
  "cached": true  // ← 这里
}
```

**如果总是false**：
- 服务器可能在每次请求后重启（开发模式正常）
- 生产环境检查进程是否稳定运行

## 安全建议

### ⚠️ 重要提示

1. **永远不要提交 `.env.local` 到Git**
   ```bash
   # .gitignore 已包含
   .env*
   ```

2. **不要在前端代码使用AccessKey**
   - ✅ 后端API路由使用
   - ❌ 前端页面使用

3. **定期更换AccessKey**
   - 建议每3-6个月更换
   - 如果泄露立即删除并重新生成

4. **使用RAM子账号**
   - 不要用主账号AccessKey
   - 创建RAM子账号，只授予必要权限

### 最小权限配置

给RAM子账号只授予语音服务权限：

```json
{
  "Version": "1",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "nls:CreateToken"
      ],
      "Resource": "*"
    }
  ]
}
```

## 验证配置

### 完整测试清单

- [ ] `.env.local` 文件已创建
- [ ] 三个环境变量都已配置
- [ ] 开发服务器已重启
- [ ] 访问 `/api/tts/aliyun-token` 返回成功
- [ ] 选择粤语能生成语音
- [ ] 控制台无错误日志

### 测试命令

```bash
# 1. 检查环境变量是否加载
echo $ALIYUN_APPKEY  # 应该为空（环境变量仅Node.js可见）

# 2. 测试Token API
curl http://localhost:3000/api/tts/aliyun-token

# 3. 查看开发服务器日志
# 应该看到 [Aliyun Token] 相关日志
```

## 对比：旧方法 vs 新方法

### 旧方法（手动Token）❌

```bash
# .env.local
NEXT_PUBLIC_ALIYUN_TOKEN=abc123...  # 24小时后过期！
```

**问题**：
- ❌ Token会过期
- ❌ 需要手动更新
- ❌ 容易忘记
- ❌ 每天都要更新

### 新方法（自动Token）✅

```bash
# .env.local
ALIYUN_ACCESS_KEY_ID=LTAI5t...
ALIYUN_ACCESS_KEY_SECRET=abc123...
```

**优势**：
- ✅ 永不过期（除非更换AccessKey）
- ✅ 自动获取Token
- ✅ 自动刷新
- ✅ 一次配置，长期使用

## 相关文档

- [阿里云Token获取文档](https://help.aliyun.com/zh/isi/getting-started/use-http-or-https-to-obtain-an-access-token)
- [阿里云RAM AccessKey管理](https://ram.console.aliyun.com/manage/ak)
- [智能语音服务控制台](https://nls-portal.console.aliyun.com/applist)
- `ALIYUN_TROUBLESHOOTING.md` - 问题排查指南

## 总结

配置完成后，系统会：
1. ✅ 自动获取Token
2. ✅ 自动缓存Token
3. ✅ 自动刷新Token
4. ✅ 无需手动管理

**只需配置一次AccessKey，永久使用！** 🎉

---

**Last Updated**: October 26, 2025  
**Status**: 生产就绪 ✅

