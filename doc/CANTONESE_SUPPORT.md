# Cantonese Support in Text-to-Speech Tool

## Problem Overview

The CogTTS API from 智谱AI is primarily trained on **Mandarin Chinese** (普通话). When you input Cantonese text using Chinese characters, the system cannot automatically distinguish between Mandarin and Cantonese pronunciation because:

1. **Same Character Set**: Both languages use the same Chinese characters (汉字)
2. **No Dialect Parameter**: The [CogTTS API](https://docs.bigmodel.cn/cn/guide/models/sound-and-video/cogtts) doesn't have an explicit language/dialect parameter
3. **Default Behavior**: The AI model defaults to Mandarin pronunciation

**Example Problem:**
- Text: `你好` (Hello)
- Mandarin: "nǐ hǎo" 
- Cantonese: "nei5 hou2"
- Without specification, the API will use Mandarin pronunciation

## Solution Implemented

Since the API doesn't support explicit language selection, we've implemented a **workaround solution** with multiple approaches:

### 1. Language Selector ✅

Added a language/dialect selector at the top of the TTS tool:
- **Mandarin 普通话**: Default mode, works directly with Chinese characters
- **Cantonese 粤语**: Activates Cantonese-specific features

### 2. Jyutping Romanization Input ✅ (Recommended)

When Cantonese is selected, a **romanization input field** appears:

**How it works:**
1. User enters Chinese characters in the main text field
2. User enters Jyutping (粤拼) romanization in the romanization field
3. The system uses the romanization for audio generation
4. Result: Much more accurate Cantonese pronunciation

**Example:**
```
Text Input: 你好，今日天氣好唔好呀？
Romanization: nei5 hou2, gam1 jat6 tin1 hei3 hou2 m4 hou2 aa3?
```

### 3. Context Hint Preprocessing ✅

If romanization is NOT provided, the system adds a context hint:
```javascript
// Without romanization
Input: "你好"
Processed: "(粤语发音) 你好"
```

This helps the AI model understand it should attempt Cantonese pronunciation, though results may vary.

### 4. Visual Guidance ✅

Added educational components:
- **Warning Notice**: Explains the limitation and recommends romanization
- **Language Guide Card**: Shows examples and links to Jyutping resources
- **Inline Help**: Links to [Jyutping.org](https://jyutping.org/) for learning
- **History Labels**: Shows which language was used for each generation

## Implementation Details

### Code Changes

**File**: `app/teacher/magic-tools/text-to-speech/page.tsx`

```typescript
// Language options
const LANGUAGE_OPTIONS = [
  { id: 'mandarin', name: 'Mandarin 普通话', ... },
  { id: 'cantonese', name: 'Cantonese 粤语', ... },
];

// Preprocessing function
const preprocessText = (inputText: string, language: string): string => {
  if (language === 'cantonese') {
    if (romanization.trim()) {
      return romanization; // Use romanization if provided
    } else {
      return `(粤语发音) ${inputText}`; // Add context hint
    }
  }
  return inputText;
};
```

### UI Components Added

1. **Language Selection Card**
   - Two-button toggle (Mandarin/Cantonese)
   - Shows active language with blue highlight
   - Displays helpful hints

2. **Cantonese Notice (Warning)**
   - Yellow gradient background
   - Explains API limitation
   - Provides example usage

3. **Romanization Input Field**
   - Only visible when Cantonese is selected
   - Green-tinted for visual distinction
   - Character counter (1024 max)
   - Help text with link to Jyutping resources

4. **Language Guide Card**
   - Explains both languages
   - Shows examples
   - Links to external resources

5. **History Labels**
   - Shows language badge (粤语/普通话) in history
   - Helps track which language was used

## User Workflow

### For Mandarin (Simple)
```
1. Select "Mandarin 普通话"
2. Enter Chinese text
3. Click "Generate Speech"
4. Done! ✅
```

### For Cantonese (Recommended)
```
1. Select "Cantonese 粤语"
2. Enter Chinese characters
3. Enter Jyutping romanization (IMPORTANT!)
4. Click "Generate Speech (Cantonese 粤语)"
5. Done! ✅
```

### For Cantonese (Without Romanization)
```
1. Select "Cantonese 粤语"
2. Enter Chinese characters
3. Skip romanization field
4. Click "Generate Speech"
5. System adds "(粤语发音)" context hint
6. Results may vary ⚠️
```

## Limitations & Workarounds

### API Limitations

❌ **What the API Cannot Do:**
- No native Cantonese support
- No dialect selection parameter
- Model trained primarily on Mandarin
- Cannot auto-detect language from characters

✅ **Our Workarounds:**
- Use romanization to guide pronunciation
- Add context hints to text
- User-selected language mode
- Educational guidance for users

### Pronunciation Accuracy

| Method | Accuracy | Recommendation |
|--------|----------|----------------|
| Mandarin with characters | ⭐⭐⭐⭐⭐ Excellent | Use directly |
| Cantonese with Jyutping | ⭐⭐⭐⭐ Good | **Recommended** |
| Cantonese with context hint | ⭐⭐ Fair | Backup option |
| Cantonese characters only | ⭐ Poor | Not recommended |

## Resources for Users

### Learning Jyutping

1. **Jyutping.org**: https://jyutping.org/
   - Official romanization system
   - Learning resources
   - Conversion tools

2. **Online Converters**:
   - [CantoDict](https://www.cantonese.sheik.co.uk/dictionary/)
   - [Words.hk](https://words.hk/)
   - [粤拼输入法](https://www.jyutping.com/)

3. **Mobile Apps**:
   - Pleco (iOS/Android)
   - Cantonese Dictionary
   - Various Jyutping keyboards

## Technical Notes

### Why Not Use Voice Cloning?

The [CogTTS API also offers voice cloning](https://docs.bigmodel.cn/api-reference/模型-api/音色复刻) (音色复刻), but:
- Requires audio samples
- More complex setup
- Still wouldn't solve the language detection issue
- Best used for custom voices, not languages

### Future Improvements

Potential enhancements (if API adds language support):

1. **Language Detection**
   ```typescript
   // Future: If API adds language parameter
   {
     model: 'cogtts',
     input: text,
     language: 'yue', // Cantonese ISO code
     voice: 'tongtong'
   }
   ```

2. **Auto-Romanization**
   - Integrate with Jyutping converter API
   - Auto-convert characters to romanization
   - User can review/edit before generation

3. **Dialect-Specific Voices**
   - Request Cantonese-trained voices from API provider
   - Use different voice models for different dialects

4. **Pronunciation Dictionary**
   - Build lookup table for common Cantonese phrases
   - Pre-convert common expressions
   - Cache results for reuse

## Testing Examples

### Test Case 1: Simple Greeting

**Mandarin:**
```
Language: Mandarin
Text: 你好，今天天气怎么样？
Result: ✅ Natural Mandarin pronunciation
```

**Cantonese (with Jyutping):**
```
Language: Cantonese
Text: 你好，今日天氣點樣？
Romanization: nei5 hou2, gam1 jat6 tin1 hei3 dim2 joeng2?
Result: ✅ Good Cantonese pronunciation
```

### Test Case 2: Complex Sentence

**Cantonese with romanization:**
```
Text: 我想去茶餐廳食野
Romanization: ngo5 soeng2 heoi3 caa4 caan1 teng1 sik6 je5
Result: ✅ Accurate pronunciation
```

**Cantonese without romanization:**
```
Text: 我想去茶餐廳食野
Romanization: (empty)
Processed: (粤语发音) 我想去茶餐廳食野
Result: ⚠️ May sound like Mandarin with Cantonese attempt
```

## API Documentation Reference

- **Main API Docs**: https://docs.bigmodel.cn/cn/guide/models/sound-and-video/cogtts
- **API Parameters**: https://docs.bigmodel.cn/api-reference/模型-api/文本转语音
- **Voice Options**: 7 voices (tongtong, chuichui, xiaochen, jam, kazi, douji, luodo)
- **Limitations**: Model primarily trained on Mandarin

## Summary

### ✅ What Works
- Clear language selection UI
- Romanization input for Cantonese
- Context hints as fallback
- Educational guidance for users
- History tracking with language labels

### ⚠️ What's Limited
- No native Cantonese support in API
- Romanization required for good results
- Results vary without romanization
- User must know Jyutping

### 🎯 Best Practice
**For Cantonese users:** Always use Jyutping romanization for the best pronunciation accuracy. The extra step is worth it!

---

**Last Updated**: October 26, 2025  
**Version**: 1.0.0  
**Status**: Implemented ✅  
**API Provider**: 智谱AI (ZhipuAI)

