# 环境变量完整配置指南

## 📝 需要配置的环境变量

创建 `.env.local` 文件在项目根目录，添加以下内容：

### 1. ZhipuAI配置（普通话 & 英语）

```bash
# ZhipuAI API Key
NEXT_PUBLIC_ZHIPU_API_KEY=你的智谱APIKey
```

**获取方式**：
1. 访问 [智谱AI开放平台](https://open.bigmodel.cn)
2. 登录账号
3. 进入"API密钥"页面
4. 创建或复制API Key

### 2. Aliyun配置（粤语）

```bash
# Aliyun APPKEY
ALIYUN_APPKEY=你的阿里云APPKEY

# Aliyun Token（24小时有效）
NEXT_PUBLIC_ALIYUN_TOKEN=你的阿里云Token
```

**获取方式**：
1. 访问 [阿里云智能语音控制台](https://nls-portal.console.aliyun.com/applist)
2. 找到你的应用（Insight AI Cantonese）
3. 复制APPKEY
4. 获取Token（点击"获取Token"按钮）

### 3. 可选：自动Token刷新（生产环境推荐）

```bash
# 阿里云AccessKey（用于自动获取Token）
ALIYUN_ACCESS_KEY_ID=LTAI5t开头的ID
ALIYUN_ACCESS_KEY_SECRET=你的Secret
```

**获取方式**：
访问 [阿里云RAM控制台](https://ram.console.aliyun.com/manage/ak)

## 📄 完整的 .env.local 示例

```bash
# ==============================================
# ZhipuAI TTS - 普通话 & 英语
# ==============================================
NEXT_PUBLIC_ZHIPU_API_KEY=325e5a96711540e5a5e35b2e361692c4.5mdsgQl5GTPtvpGm

# ==============================================
# Aliyun TTS - 粤语（Kelly发音人）
# ==============================================
ALIYUN_APPKEY=tkMzj2qJ85lRdgzD
NEXT_PUBLIC_ALIYUN_TOKEN=your_24hour_token_here

# ==============================================
# 可选：自动Token刷新
# ==============================================
# ALIYUN_ACCESS_KEY_ID=LTAI5t...
# ALIYUN_ACCESS_KEY_SECRET=abc123...
```

## 🔄 配置后重启

```bash
# 停止开发服务器（Ctrl+C）
# 然后重新启动
npm run dev
```

## ✅ 验证配置

### 检查智谱AI配置

1. 访问应用
2. 选择 "Mandarin / English"
3. 输入文本生成
4. 成功 = 配置正确 ✅

### 检查阿里云配置

1. 选择 "Cantonese 粤语"
2. 应该看到 "Kelly (凯莉)" 发音人卡片
3. 输入粤语文本生成
4. 成功 = 配置正确 ✅

## 🎨 UI更新说明

### 新特性

1. **智能音色选择**
   - 普通话/英语：显示7个音色选择
   - 粤语：自动使用Kelly，不显示选择器

2. **视觉升级**
   - 渐变色标题栏
   - 动画效果
   - 更好的卡片设计
   - 专属的粤语发音人卡片

3. **安全性提升**
   - 所有API Key移到环境变量
   - 不再硬编码在代码中

## 📚 相关文档

- `ALIYUN_SIMPLE_SETUP.md` - 阿里云简单配置
- `ALIYUN_TOKEN_SETUP.md` - 自动Token配置
- `DUAL_API_IMPLEMENTATION.md` - 技术实现

## ⚠️ 重要提醒

1. **永远不要提交 `.env.local` 到Git**
2. **Token会在24小时后过期**（除非配置自动刷新）
3. **重启服务器后环境变量才会生效**

---

**配置完成后，TTS工具就能完美工作了！** 🎉

