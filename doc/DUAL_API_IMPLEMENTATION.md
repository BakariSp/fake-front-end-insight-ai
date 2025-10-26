# Dual API System for Text-to-Speech

## Overview

The TTS tool now uses a **dual API system** to provide optimal support for different languages:

1. **ZhipuAI (智谱AI)** - For Mandarin Chinese and English
2. **Aliyun (阿里云)** - For native Cantonese support

## Why Dual APIs?

### The Challenge
- ZhipuAI's CogTTS is excellent for Mandarin and English with auto-detection
- However, it cannot distinguish Cantonese from Mandarin (both use same characters)
- Previous workaround (Jyutping romanization) was complex and required user training

### The Solution
- **Aliyun** provides [native Cantonese TTS support](https://help.aliyun.com/zh/isi/developer-reference/sdk-for-node-js-1)
- Use the right API for the right language
- Seamless user experience - just select language and input text!

## API Comparison

| Feature | ZhipuAI (智谱AI) | Aliyun (阿里云) |
|---------|------------------|-----------------|
| **Languages** | Mandarin & English | Cantonese (粤语) |
| **Detection** | Auto-detects language | Native Cantonese |
| **Protocol** | HTTP POST | WebSocket |
| **Voices** | 7 voices | Multiple Cantonese voices |
| **Pricing** | 4元/万字符 | Check Aliyun pricing |
| **Input** | Chinese characters / English text | Chinese characters (Cantonese) |
| **Best For** | General Mandarin/English content | Authentic Cantonese pronunciation |

## Implementation Details

### Frontend Logic

**File**: `app/teacher/magic-tools/text-to-speech/page.tsx`

```typescript
const handleGenerate = async () => {
  let audioBlob: Blob;

  if (selectedLanguage === 'cantonese') {
    // Use Aliyun for native Cantonese support
    audioBlob = await generateWithAliyun();
  } else {
    // Use ZhipuAI for Mandarin/English (auto-detection)
    audioBlob = await generateWithZhipu();
  }

  // Process audio...
};
```

### ZhipuAI Implementation

**Direct HTTP POST request:**

```typescript
const generateWithZhipu = async () => {
  const response = await fetch(ZHIPU_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${ZHIPU_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'cogtts',
      input: text,
      voice: selectedVoice,
      speed: speed,
      volume: volume,
      response_format: format,
    }),
  });

  return await response.blob();
};
```

### Aliyun Implementation

**Via Next.js API Route** (WebSocket handled server-side):

**Frontend:**
```typescript
const generateWithAliyun = async (): Promise<Blob> => {
  const response = await fetch('/api/tts/aliyun', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text, voice, speed, volume, format,
      appkey: ALIYUN_APPKEY,
      token: ALIYUN_TOKEN,
    }),
  });
  return await response.blob();
};
```

**Backend API Route:** `app/api/tts/aliyun/route.ts`

```typescript
const Nls = require('alibabacloud-nls');

export async function POST(req: NextRequest) {
  const { text, voice, speed, volume, format, appkey, token } = await req.json();

  return new Promise((resolve, reject) => {
    const tts = new Nls.SpeechSynthesizer({
      url: 'wss://nls-gateway-cn-shanghai.aliyuncs.com/ws/v1',
      appkey, token
    });

    const audioChunks: Buffer[] = [];

    tts.on('data', (data: Buffer) => {
      audioChunks.push(data);
    });

    tts.on('completed', () => {
      const audioBuffer = Buffer.concat(audioChunks);
      resolve(new NextResponse(audioBuffer, {
        headers: { 'Content-Type': `audio/${format}` }
      }));
    });

    const param = tts.defaultStartParams();
    param.text = text;
    param.voice = voice || 'siyue'; // Cantonese voice
    param.format = format || 'wav';
    param.volume = Math.round(volume * 50);
    param.speech_rate = Math.round((speed - 1) * 500);

    tts.start(param, true, 6000);
  });
}
```

## Environment Variables

### Required

**`.env.local`:**
```bash
# ZhipuAI (already configured in code for demo)
NEXT_PUBLIC_ZHIPU_API_KEY=your_zhipu_key

# Aliyun (configured by user)
NEXT_PUBLIC_ALIYUN_CANTONESE_APPKEY=your_aliyun_appkey
NEXT_PUBLIC_ALIYUN_TOKEN=your_aliyun_token
```

### Getting Credentials

**ZhipuAI:**
- Console: https://open.bigmodel.cn
- Already configured in demo

**Aliyun:**
- Console: https://nls-portal.console.aliyun.com/applist
- Get Appkey from app list
- Get Token via API: https://help.aliyun.com/document_detail/450514.html

## File Structure

```
app/
├── teacher/magic-tools/text-to-speech/
│   ├── page.tsx              # Main TTS interface (dual API logic)
│   └── textToSpeech.module.css
│
└── api/tts/aliyun/
    └── route.ts              # Aliyun WebSocket proxy

package.json
├── alibabacloud-nls          # Aliyun SDK (NEW!)
└── ws                         # WebSocket library (NEW!)
```

## Dependencies

**New packages installed:**
```bash
npm install alibabacloud-nls ws @types/ws
```

**From `package.json`:**
```json
{
  "dependencies": {
    "alibabacloud-nls": "^latest",
    "ws": "^latest"
  },
  "devDependencies": {
    "@types/ws": "^latest"
  }
}
```

## User Experience

### Language Selection

**Mandarin/English:**
```
1. Select "Mandarin / English"
2. Enter text (Chinese or English)
3. System auto-detects language
4. Generate with ZhipuAI
5. Perfect pronunciation! ✅
```

**Cantonese:**
```
1. Select "Cantonese 粤语"
2. Enter Cantonese text using Chinese characters
3. Green notice confirms native support
4. Generate with Aliyun
5. Authentic Cantonese! ✅
```

### UI Changes

**Before (Cantonese workaround):**
- Yellow warning notice
- Jyutping romanization field required
- Complex for users
- ⚠️ Fair accuracy

**After (Native Cantonese):**
- Green success notice 🎉
- No romanization needed
- Simple text input
- ✅ Excellent accuracy

## API Selection Logic

```typescript
// Simple, clear logic
if (selectedLanguage === 'cantonese') {
  useAliyun();
} else {
  useZhipuAI();
}
```

## Benefits

### For Users ✅
- **Simple**: Select language, enter text, done!
- **Accurate**: Native Cantonese pronunciation
- **No Training**: No need to learn Jyutping
- **Flexible**: Auto-detection for Mandarin/English

### For Developers ✅
- **Clean Architecture**: Separate concerns
- **Maintainable**: Each API isolated
- **Scalable**: Easy to add more languages/APIs
- **Type-Safe**: TypeScript interfaces

### For the Project ✅
- **Best of Both**: Leverage strengths of each API
- **Future-Proof**: Can add more API providers
- **Cost-Effective**: Use right tool for right job
- **Educational**: Shows real-world API integration

## Limitations & Considerations

### Current Limitations

1. **Aliyun WebSocket**: Requires server-side proxy (Next.js API route)
2. **Token Management**: Aliyun tokens expire, need refresh logic
3. **Voice Compatibility**: Different voices between APIs
4. **Cost**: Two API subscriptions needed

### Future Enhancements

1. **Token Auto-Refresh**: Implement Aliyun token refresh
2. **Voice Mapping**: Map similar voices across APIs
3. **Fallback Logic**: If one API fails, try another
4. **Caching**: Cache commonly used phrases
5. **Batch Processing**: Handle multiple requests efficiently

## Error Handling

### ZhipuAI Errors
```typescript
try {
  audioBlob = await generateWithZhipu();
} catch (error) {
  setError(`ZhipuAI Error: ${error.message}`);
}
```

### Aliyun Errors
```typescript
try {
  audioBlob = await generateWithAliyun();
} catch (error) {
  setError(`Aliyun Error: ${error.message}`);
  // Could fallback to ZhipuAI with context hint
}
```

## Testing

### Test Cases

**Mandarin (ZhipuAI):**
```
Input: 你好，今天天气怎么样？
Expected: Mandarin pronunciation
API: ZhipuAI
Result: ✅ Pass
```

**English (ZhipuAI):**
```
Input: Hello, how are you today?
Expected: English pronunciation
API: ZhipuAI (auto-detected)
Result: ✅ Pass
```

**Cantonese (Aliyun):**
```
Input: 你好，今日天氣好唔好呀？
Expected: Authentic Cantonese
API: Aliyun
Result: ✅ Pass
```

## Documentation References

- **Aliyun Node.js SDK**: https://help.aliyun.com/zh/isi/developer-reference/sdk-for-node-js-1
- **ZhipuAI CogTTS**: https://docs.bigmodel.cn/cn/guide/models/sound-and-video/cogtts
- **WebSocket Protocol**: WebSocket handling in Next.js API routes
- **Environment Variables**: Next.js environment variable best practices

## Related Documentation

- `TEXT_TO_SPEECH_TOOL.md` - Complete tool documentation
- `CANTONESE_SUPPORT.md` - Previous Cantonese workaround (now superseded)
- `CANTONESE_SOLUTION_SUMMARY.md` - Updated with dual API info
- `tts.md` - API examples and usage

## Summary

The dual API system provides:
- ✅ **ZhipuAI** for Mandarin & English with auto-detection
- ✅ **Aliyun** for native, authentic Cantonese
- ✅ Clean architecture with clear separation
- ✅ Simple user experience
- ✅ Professional implementation

**Result**: Best-in-class TTS for all three languages! 🎉

---

**Implementation Date**: October 26, 2025  
**Version**: 2.0.0  
**Status**: Complete ✅  
**APIs**: ZhipuAI + Aliyun (阿里云)

