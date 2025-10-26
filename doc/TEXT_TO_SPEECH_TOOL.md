# Text-to-Speech AI Tool for Teachers

## Overview

The Text-to-Speech (TTS) tool allows teachers to convert written text into natural-sounding audio using AI-powered voice synthesis. This tool is integrated into the Teacher Magic Toolkits section.

## Features

### 🗣️ Language Support (NEW!)
- **Mandarin Chinese (普通话)**: Full native support
- **Cantonese (粤语)**: Supported via Jyutping romanization
  - Language selector to switch between dialects
  - Dedicated romanization input field for Cantonese
  - Visual guidance and examples
  - See [CANTONESE_SUPPORT.md](./CANTONESE_SUPPORT.md) for details

### 🎤 Voice Options
- **Tongtong (彤彤)** - Default voice, warm and friendly
- **Chuichui (锤锤)** - Energetic and lively
- **Xiaochen (小陈)** - Clear and professional
- **Jam, Kazi, Douji, Luodo** - Animal Circle character voices

### ⚙️ Customization Options
- **Language/Dialect Selection**: Choose between Mandarin and Cantonese
- **Speed Control**: Adjust playback speed from 0.5x to 2.0x
- **Volume Control**: Adjust volume from 0.1 to 10.0
- **Format Selection**: Choose between WAV (high quality) or PCM (raw audio)

### 📝 Additional Features
- Text input up to 1024 characters
- Jyutping romanization input for Cantonese (recommended)
- Real-time character counter
- Audio preview with built-in player
- Download generated audio files
- History tracking with language labels
- Play, replay, or delete historical audio
- Educational guidance for Cantonese pronunciation

## Technical Implementation

### API Integration

The tool uses the CogTTS API from ZhipuAI (智谱AI):

**Endpoint**: `https://open.bigmodel.cn/api/paas/v4/audio/speech`

**Request Structure**:
```javascript
{
  model: 'cogtts',
  input: 'Text to convert',
  voice: 'tongtong',
  speed: 1.0,
  volume: 1.0,
  response_format: 'wav',
  watermark_enabled: true
}
```

**Headers**:
```javascript
{
  'Authorization': 'Bearer YOUR_API_KEY',
  'Content-Type': 'application/json'
}
```

### Response Handling

The API returns audio data as a blob, which is:
1. Converted to a blob URL using `URL.createObjectURL()`
2. Set to the audio player for immediate playback
3. Stored in history for later access
4. Available for download

## File Structure

```
app/teacher/magic-tools/
├── layout.tsx                    # Layout wrapper
├── page.tsx                      # Magic Tools landing page
├── magicTools.module.css         # Styles for landing page
└── text-to-speech/
    ├── page.tsx                  # TTS tool implementation
    └── textToSpeech.module.css   # TTS tool styles
```

## Usage Flow

1. **Navigate**: Teacher → Magic Toolkits → Text to Speech
2. **Input Text**: Enter text (max 1024 characters)
3. **Select Voice**: Choose from 7 available voices
4. **Adjust Settings**: Configure speed, volume, and format
5. **Generate**: Click "Generate Speech" button
6. **Preview**: Listen to generated audio
7. **Download**: Save audio file for use in lessons
8. **History**: Access previously generated audio

## Use Cases for Teachers

### 📚 Educational Materials
- Create audio versions of reading materials
- Make content accessible for students with visual impairments
- Provide pronunciation guides for language learning

### 🌍 Multilingual Support
- Generate audio in different Chinese dialects
- Create listening comprehension exercises
- Produce audio for vocabulary learning

### ♿ Accessibility
- Make course materials accessible to all students
- Provide alternative content formats
- Support students with different learning styles

### 💾 Reusable Content
- Build a library of audio resources
- Reuse generated audio across multiple classes
- Share audio materials with other teachers

## Security Considerations

⚠️ **Important**: The API key should be:
- Stored in environment variables (`.env.local`)
- Never committed to version control
- Managed through a backend proxy in production

Example:
```javascript
// .env.local
NEXT_PUBLIC_TTS_API_KEY=your_api_key_here

// In component
const API_KEY = process.env.NEXT_PUBLIC_TTS_API_KEY;
```

## Limitations

- **Text Length**: Maximum 1024 characters per request
- **Watermark**: AI-generated audio includes watermark by default
- **Rate Limits**: Subject to API rate limiting (check API documentation)
- **Language**: Primarily optimized for Mandarin Chinese
- **Cantonese**: Requires Jyutping romanization for accurate pronunciation (see [CANTONESE_SUPPORT.md](./CANTONESE_SUPPORT.md))
- **Dialect Detection**: API cannot auto-detect dialects from Chinese characters

## Future Enhancements

### Planned Features
- [ ] Batch processing for multiple texts
- [ ] Custom voice cloning (using 音色复刻 API)
- [ ] Integration with lesson planning tools
- [ ] Share audio directly to student dashboards
- [ ] SSML support for advanced voice control
- [ ] Multi-language support expansion

### Integration Opportunities
- Link with Resource Library for audio storage
- Integration with Assignment creation
- Connect to Communication module for announcements
- Add to Class materials automatically

## API Documentation

Full API documentation: [智谱AI TTS API](https://docs.bigmodel.cn/api-reference/模型-api/文本转语音)

### Additional API Features Not Yet Implemented

1. **Voice Cloning** (音色复刻)
   - Create custom voices
   - Replicate specific speaking styles
   
2. **Encode Format Options**
   - Base64 encoding
   - Hex encoding
   - For streaming applications

3. **Watermark Control**
   - Option to remove watermark (requires disclaimer)
   - Explicit vs implicit watermarking

## Testing

### Mock Data Available
The current implementation includes:
- Sample voice options
- Test interface
- History tracking demo

### Testing Checklist
- ✅ Text input validation
- ✅ Voice selection
- ✅ Speed/volume controls
- ✅ Audio generation
- ✅ Download functionality
- ✅ History management
- ✅ Error handling
- ✅ Responsive design

## Support & Resources

- **API Provider**: 智谱AI (ZhipuAI)
- **API Console**: [https://open.bigmodel.cn](https://open.bigmodel.cn)
- **Documentation**: Project documentation in `/doc` folder
- **Component Guide**: See `COMPONENTS_GUIDE.md`

## Related Documentation

- `TEACHER_PLATFORM_IMPLEMENTATION.md` - Teacher platform overview
- `AI_TOOLS_IMPLEMENTATION.md` - AI tools architecture
- `COMPONENTS_GUIDE.md` - UI components used
- `tts.md` - API example code with language support info
- `CANTONESE_SUPPORT.md` - **NEW!** Complete guide to Cantonese support
- `TTS_IMPLEMENTATION_SUMMARY.md` - Technical implementation details

---

**Last Updated**: October 26, 2025
**Version**: 1.0.0
**Status**: Active ✅

