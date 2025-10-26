# Aliyun TTS API Troubleshooting Guide

## Error: POST /api/tts/aliyun 500

### Common Causes & Solutions

#### 1. Missing Environment Variables ⚠️

**Problem**: API credentials not configured

**Check**:
```bash
# In .env.local, you should have:
NEXT_PUBLIC_ALIYUN_CANTONESE_APPKEY=your_appkey_here
NEXT_PUBLIC_ALIYUN_TOKEN=your_token_here
```

**Solution**:
1. Make sure `.env.local` exists in project root
2. Verify the variables are correctly named (no typos)
3. Restart the dev server after adding env vars: `npm run dev`

#### 2. Invalid or Expired Token 🔑

**Problem**: Aliyun token has expired

**Aliyun tokens expire!** You need to refresh them periodically.

**Get a new token**:
```bash
# Use Aliyun's token API
curl -X POST \
  https://nls-meta.cn-shanghai.aliyuncs.com/pop/2018-05-18/tokens \
  -H 'Content-Type: application/json' \
  -d '{
    "AccessKeyId": "your_access_key_id",
    "AccessKeySecret": "your_access_key_secret"
  }'
```

Or use the [Aliyun Console](https://nls-portal.console.aliyun.com/applist)

**Then update** `.env.local` with the new token.

#### 3. WebSocket Connection Issues 🔌

**Problem**: Cannot connect to Aliyun WebSocket

**Possible causes**:
- Network firewall blocking WebSocket
- Invalid appkey
- Wrong region (using cn-shanghai, but your appkey is for another region)

**Check console logs** for:
```
[Aliyun TTS] Creating SpeechSynthesizer...
[Aliyun TTS] SpeechSynthesizer created successfully
```

If you don't see these, the SDK failed to initialize.

#### 4. Voice Name Issues 🎤

**Problem**: Invalid voice parameter

**Default voice**: `siyue` (Cantonese female)

**Other Cantonese voices**:
- `siyue` - 思悦 (Female)
- `xiaomei` - 小美 (Female)
- Check [Aliyun voice list](https://help.aliyun.com/document_detail/84435.html) for more

**Solution**: Make sure the voice name matches Aliyun's exact voice IDs.

#### 5. SDK Not Installed Properly 📦

**Problem**: `alibabacloud-nls` module not found

**Solution**:
```bash
npm install alibabacloud-nls ws @types/ws
```

Then restart the dev server.

## Debugging Steps

### Step 1: Check Console Logs

When you try to generate Cantonese speech, you should see:

```
[Aliyun TTS] Request received: { textLength: 12, voice: 'cantonese', ... }
[Aliyun TTS] Credentials check: { hasAppkey: true, hasToken: true, ... }
[Aliyun TTS] Creating SpeechSynthesizer...
[Aliyun TTS] SpeechSynthesizer created successfully
[Aliyun TTS] Starting synthesis with params: { voice: 'siyue', ... }
[Aliyun TTS] Synthesis started successfully
```

**Where logs stop** = **where problem is**.

### Step 2: Verify Environment Variables

Create a test API route:

**Create**: `app/api/test-env/route.ts`
```typescript
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    hasAppkey: !!process.env.NEXT_PUBLIC_ALIYUN_CANTONESE_APPKEY,
    hasToken: !!process.env.NEXT_PUBLIC_ALIYUN_TOKEN,
    // Don't log actual values for security!
  });
}
```

Visit: `http://localhost:3000/api/test-env`

Should show:
```json
{
  "hasAppkey": true,
  "hasToken": true
}
```

### Step 3: Test Aliyun Directly

Create a simple test script:

**Create**: `test-aliyun.js` (in project root)
```javascript
const Nls = require('alibabacloud-nls');

const URL = 'wss://nls-gateway-cn-shanghai.aliyuncs.com/ws/v1';
const APPKEY = 'your_appkey_here'; // Replace!
const TOKEN = 'your_token_here'; // Replace!

const tts = new Nls.SpeechSynthesizer({
  url: URL,
  appkey: APPKEY,
  token: TOKEN,
});

tts.on('completed', () => {
  console.log('✅ SUCCESS! Aliyun TTS is working!');
  process.exit(0);
});

tts.on('failed', (error) => {
  console.error('❌ FAILED:', error);
  process.exit(1);
});

const param = tts.defaultStartParams();
param.text = '你好';
param.voice = 'siyue';
param.format = 'wav';

console.log('Testing Aliyun TTS...');
tts.start(param, true, 6000);

setTimeout(() => {
  console.error('⏱️ TIMEOUT');
  process.exit(1);
}, 10000);
```

Run:
```bash
node test-aliyun.js
```

### Step 4: Check Browser Network Tab

1. Open DevTools (F12)
2. Go to Network tab
3. Try generating Cantonese speech
4. Look for `/api/tts/aliyun` request
5. Click on it → Response tab
6. Check the error message

## Common Error Messages

### "Aliyun credentials not configured"
```json
{
  "error": "Aliyun credentials not configured",
  "details": "Please set NEXT_PUBLIC_ALIYUN_CANTONESE_APPKEY..."
}
```

**Fix**: Add environment variables to `.env.local`

### "Failed to create SpeechSynthesizer"
```
[Aliyun TTS] Failed to create SpeechSynthesizer: [error details]
```

**Possible causes**:
- Invalid appkey format
- Invalid token format
- SDK initialization error

**Fix**: Check your credentials format

### "Aliyun TTS failed: 40000000"
```
Aliyun TTS failed: {"status_code":40000000,"status_text":"..."}
```

**Status codes**:
- `40000000` - Invalid parameter
- `40000001` - Invalid appkey
- `40000002` - Invalid token
- `40400002` - Token expired
- `50000000` - Server error

**Fix**: Check [Aliyun error codes documentation](https://help.aliyun.com/document_detail/90727.html)

### "Aliyun TTS timeout"
```
Error: Aliyun TTS timeout
```

**Causes**:
- Slow network
- Server not responding
- WebSocket connection blocked

**Fix**: 
- Check internet connection
- Try different network
- Check firewall settings

## Quick Fixes

### Fix 1: Restart Dev Server
```bash
# Ctrl+C to stop, then:
npm run dev
```

### Fix 2: Clear Next.js Cache
```bash
rm -rf .next
npm run dev
```

### Fix 3: Reinstall Dependencies
```bash
npm install
npm run dev
```

### Fix 4: Check .env.local Format
```bash
# NO quotes needed!
NEXT_PUBLIC_ALIYUN_CANTONESE_APPKEY=your_appkey
NEXT_PUBLIC_ALIYUN_TOKEN=your_token

# NOT this:
# NEXT_PUBLIC_ALIYUN_CANTONESE_APPKEY="your_appkey"
```

### Fix 5: Update Token
Tokens expire! Get a new one from Aliyun Console.

## Still Not Working?

### Fallback Option: Use ZhipuAI Only

If Aliyun continues to have issues, you can temporarily disable Cantonese or fall back to ZhipuAI:

**In**: `app/teacher/magic-tools/text-to-speech/page.tsx`

Comment out Aliyun logic:
```typescript
const handleGenerate = async () => {
  // if (selectedLanguage === 'cantonese') {
  //   audioBlob = await generateWithAliyun();
  // } else {
  //   audioBlob = await generateWithZhipu();
  // }
  
  // Temporary: Always use ZhipuAI
  audioBlob = await generateWithZhipu();
};
```

This falls back to the previous romanization workaround.

## Aliyun Resources

- **Console**: https://nls-portal.console.aliyun.com/applist
- **Token API**: https://help.aliyun.com/document_detail/450514.html
- **Error Codes**: https://help.aliyun.com/document_detail/90727.html
- **SDK Docs**: https://help.aliyun.com/zh/isi/developer-reference/sdk-for-node-js-1
- **Voice List**: https://help.aliyun.com/document_detail/84435.html

## Contact Support

If none of these work:
1. Check Aliyun service status
2. Contact Aliyun support
3. Verify your account has TTS service enabled
4. Check billing (account might be suspended)

---

**Remember**: The most common issue is **expired tokens**. Try getting a fresh token first!

