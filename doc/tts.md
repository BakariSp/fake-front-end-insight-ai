# Text-to-Speech API Example

## API Endpoint
**URL**: `https://open.bigmodel.cn/api/paas/v4/audio/speech`

## Basic Usage Example

```javascript
const url = 'https://open.bigmodel.cn/api/paas/v4/audio/speech';
const options = {
  method: 'POST',
  headers: {
    Authorization: 'Bearer 325e5a96711540e5a5e35b2e361692c4.5mdsgQl5GTPtvpGm',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    model: 'cogtts',
    input: '你好，今日天氣好唔好呀？',
    voice: 'tongtong',
    speed: 1.0,
    volume: 1.0,
    response_format: 'wav',
    watermark_enabled: true
  })
};

try {
  const response = await fetch(url, options);
  
  // Response is audio data (blob)
  const audioBlob = await response.blob();
  
  // Create playable URL
  const audioUrl = URL.createObjectURL(audioBlob);
  
  // Use with audio element
  const audio = new Audio(audioUrl);
  audio.play();
  
  console.log('Audio generated successfully!');
} catch (error) {
  console.error('Error:', error);
}
```

## Available Voices
- `tongtong` (彤彤) - Default, warm and friendly
- `chuichui` (锤锤) - Energetic
- `xiaochen` (小陈) - Professional
- `jam`, `kazi`, `douji`, `luodo` - Character voices

## Parameters
- `model`: "cogtts" (required)
- `input`: Text to convert (max 1024 chars)
- `voice`: Voice ID
- `speed`: 0.5 - 2.0
- `volume`: 0.1 - 10.0
- `response_format`: "wav" or "pcm"
- `watermark_enabled`: true/false

## Implementation
See: `/app/teacher/magic-tools/text-to-speech/page.tsx` for full implementation

## Language Support

### Mandarin Chinese (普通话)
Works naturally with Chinese characters - the model is primarily trained on Mandarin.

### Cantonese (粤语) 
⚠️ **Important**: The API doesn't have explicit Cantonese support. 

**Solution**: Use Jyutping romanization for accurate Cantonese pronunciation:
- Example: "你好" → Input romanization: "nei5 hou2"
- See `/teacher/magic-tools/text-to-speech` for Cantonese-specific features
- Full guide: `doc/CANTONESE_SUPPORT.md`

## Documentation
- API Reference: https://docs.bigmodel.cn/api-reference/模型-api/文本转语音
- Model Guide: https://docs.bigmodel.cn/cn/guide/models/sound-and-video/cogtts
- Cantonese Support: See `doc/CANTONESE_SUPPORT.md`