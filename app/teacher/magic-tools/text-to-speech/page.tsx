'use client';

import { useState, useRef } from 'react';
import { Button, Card } from '@ui';
import styles from './textToSpeech.module.css';

// Voice options from the API documentation
const VOICES = [
  { id: 'tongtong', name: 'Tongtong 彤彤', description: 'Default voice, warm and friendly' },
  { id: 'chuichui', name: 'Chuichui 锤锤', description: 'Energetic and lively' },
  { id: 'xiaochen', name: 'Xiaochen 小陈', description: 'Clear and professional' },
  { id: 'jam', name: 'Jam', description: 'Animal Circle character' },
  { id: 'kazi', name: 'Kazi', description: 'Animal Circle character' },
  { id: 'douji', name: 'Douji', description: 'Animal Circle character' },
  { id: 'luodo', name: 'Luodo', description: 'Animal Circle character' },
];

const FORMAT_OPTIONS = [
  { id: 'wav', name: 'WAV', description: 'High quality audio' },
  { id: 'pcm', name: 'PCM', description: 'Raw audio data' },
];

const LANGUAGE_OPTIONS = [
  { 
    id: 'mandarin', 
    name: 'Mandarin / English 普通话 / 英语', 
    description: 'Standard Chinese & English',
    hint: '(ZhipuAI - Auto detection)'
  },
  { 
    id: 'cantonese', 
    name: 'Cantonese 粤语', 
    description: 'Native Cantonese support',
    hint: '(Aliyun - Guangdong dialect)'
  },
];

interface AudioHistory {
  id: string;
  text: string;
  voice: string;
  language?: string;
  timestamp: Date;
  audioUrl?: string;
}

export default function TextToSpeechPage() {
  const [text, setText] = useState('');
  const [selectedVoice, setSelectedVoice] = useState('tongtong');
  const [selectedLanguage, setSelectedLanguage] = useState('mandarin');
  const [speed, setSpeed] = useState(1.0);
  const [volume, setVolume] = useState(1.0);
  const [format, setFormat] = useState('wav');
  const [isGenerating, setIsGenerating] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<AudioHistory[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Generate speech using ZhipuAI (Mandarin/English)
  // 通过后端API路由调用，保护API Key安全
  const generateWithZhipu = async () => {
    const response = await fetch('/api/tts/zhipu', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: text,
        voice: selectedVoice,
        speed: speed,
        volume: volume,
        format: format,
      }),
    });

    if (!response.ok) {
      throw new Error(`ZhipuAI API Error: ${response.status}`);
    }

    return await response.blob();
  };

  // Generate speech using Aliyun (Cantonese)
  // 通过后端API路由调用，保护API Key和Token安全
  const generateWithAliyun = async (): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      fetch('/api/tts/aliyun', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text,
          voice: 'kelly', // Your custom Cantonese voice (香港粤语女声 Kelly)
          speed: speed,
          volume: volume,
          format: format,
          // appkey和token在服务器端从环境变量读取，不再从前端传递
        }),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`Aliyun API Error: ${response.status}`);
          }
          return response.blob();
        })
        .then(resolve)
        .catch(reject);
    });
  };

  const handleGenerate = async () => {
    if (!text.trim()) {
      setError('Please enter some text to convert to speech');
      return;
    }

    if (text.length > 1024) {
      setError('Text is too long. Maximum length is 1024 characters.');
      return;
    }

    setIsGenerating(true);
    setError(null);
    setAudioUrl(null);

    try {
      let audioBlob: Blob;

      if (selectedLanguage === 'cantonese') {
        // Use Aliyun for native Cantonese support
        audioBlob = await generateWithAliyun();
      } else {
        // Use ZhipuAI for Mandarin/English (auto-detection)
        audioBlob = await generateWithZhipu();
      }

      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);

      // Add to history
      const newHistoryItem: AudioHistory = {
        id: Date.now().toString(),
        text: text.substring(0, 50) + (text.length > 50 ? '...' : ''),
        voice: selectedVoice,
        language: selectedLanguage,
        timestamp: new Date(),
        audioUrl: url,
      };
      setHistory(prev => [newHistoryItem, ...prev]);

    } catch (err) {
      console.error('Error generating speech:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate speech. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!audioUrl) return;

    const a = document.createElement('a');
    a.href = audioUrl;
    a.download = `speech-${Date.now()}.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handlePlayHistory = (item: AudioHistory) => {
    if (item.audioUrl) {
      setAudioUrl(item.audioUrl);
    }
  };

  const handleDeleteHistory = (id: string) => {
    setHistory(prev => prev.filter(item => item.id !== id));
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes} minutes ago`;
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hours ago`;
    
    return date.toLocaleDateString();
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        {/* Header */}
        <div className={styles.header}>
          <button className={styles.backButton} onClick={() => window.history.back()}>
            ← Back
          </button>
          <h1 className={styles.title}>
            <span className={styles.icon}>🔊</span>
            Text to Speech
            <span className={styles.titleZh}>文字转语音</span>
          </h1>
          <p className={styles.subtitle}>
            Convert your text into natural-sounding speech using AI-powered voice synthesis
          </p>
        </div>

        {/* Main Controls */}
        <div className={styles.layout}>
          <div className={styles.leftPanel}>
            {/* Language Selection */}
            <Card className={styles.languageCard}>
              <h3 className={styles.sectionTitle}>Language / Dialect 语言选择</h3>
              <div className={styles.languageGrid}>
                {LANGUAGE_OPTIONS.map((lang) => (
                  <button
                    key={lang.id}
                    className={`${styles.languageButton} ${selectedLanguage === lang.id ? styles.active : ''}`}
                    onClick={() => setSelectedLanguage(lang.id)}
                  >
                    <div className={styles.languageName}>{lang.name}</div>
                    <div className={styles.languageDescription}>{lang.description}</div>
                    <div className={styles.languageHint}>{lang.hint}</div>
                  </button>
                ))}
              </div>
              
              {selectedLanguage === 'cantonese' && (
                <div className={styles.cantoneseNotice}>
                  <div className={styles.noticeIcon}>🎉</div>
                  <div className={styles.noticeContent}>
                    <strong>Native Cantonese Support 原生粤语支持!</strong>
                    <p>Powered by Aliyun (阿里云), this service provides native Cantonese pronunciation. Simply enter your Cantonese text using Chinese characters - no romanization needed!</p>
                    <p>Example: 你好，今日天氣好唔好呀？ → Natural Cantonese speech! ✨</p>
                  </div>
                </div>
              )}
            </Card>

            {/* Text Input */}
            <Card className={styles.inputCard}>
              <label className={styles.label}>
                Text Input 文本输入
                <span className={styles.charCount}>{text.length}/1024</span>
              </label>
              <textarea
                className={styles.textarea}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={selectedLanguage === 'cantonese' 
                  ? "输入粤语文本 (直接使用中文字即可)\nExample: 你好，今日天氣好唔好呀？\n\nNative Cantonese support - no romanization needed!" 
                  : "Enter text in Mandarin or English...\n输入普通话或英文文本...\n\nAuto language detection supported!"}
                maxLength={1024}
              />
            </Card>

            {/* Voice Selection - Only for Mandarin/English */}
            {selectedLanguage !== 'cantonese' && (
              <Card className={styles.voiceCard}>
                <h3 className={styles.sectionTitle}>
                  Voice Selection 声音选择
                  <span className={styles.sectionSubtitle}>Choose your preferred voice 选择你喜欢的声音</span>
                </h3>
                <div className={styles.voiceGrid}>
                  {VOICES.map((voice) => (
                    <button
                      key={voice.id}
                      className={`${styles.voiceButton} ${selectedVoice === voice.id ? styles.active : ''}`}
                      onClick={() => setSelectedVoice(voice.id)}
                    >
                      <div className={styles.voiceIcon}>🎤</div>
                      <div className={styles.voiceDetails}>
                        <div className={styles.voiceName}>{voice.name}</div>
                        <div className={styles.voiceDescription}>{voice.description}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </Card>
            )}

            {/* Cantonese Voice Info */}
            {selectedLanguage === 'cantonese' && (
              <Card className={styles.cantoneseVoiceCard}>
                <h3 className={styles.sectionTitle}>
                  Cantonese Voice 粤语发音人
                </h3>
                <div className={styles.fixedVoiceInfo}>
                  <div className={styles.fixedVoiceIcon}>🎙️</div>
                  <div className={styles.fixedVoiceContent}>
                    <div className={styles.fixedVoiceName}>Kelly (凯莉)</div>
                    <div className={styles.fixedVoiceDescription}>香港粤语女声 · 专业清晰 · Native Cantonese</div>
                    <div className={styles.fixedVoiceBadge}>✨ Exclusive Voice</div>
                  </div>
                </div>
              </Card>
            )}

            {/* Settings */}
            <Card className={styles.settingsCard}>
              <h3 className={styles.sectionTitle}>Settings 设置</h3>
              
              <div className={styles.settingRow}>
                <label className={styles.settingLabel}>
                  Speed 语速: <span className={styles.settingValue}>{speed.toFixed(1)}x</span>
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="2.0"
                  step="0.1"
                  value={speed}
                  onChange={(e) => setSpeed(parseFloat(e.target.value))}
                  className={styles.slider}
                />
                <div className={styles.rangeLabels}>
                  <span>0.5x</span>
                  <span>2.0x</span>
                </div>
              </div>

              <div className={styles.settingRow}>
                <label className={styles.settingLabel}>
                  Volume 音量: <span className={styles.settingValue}>{volume.toFixed(1)}</span>
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="10.0"
                  step="0.1"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className={styles.slider}
                />
                <div className={styles.rangeLabels}>
                  <span>0.1</span>
                  <span>10.0</span>
                </div>
              </div>

              <div className={styles.settingRow}>
                <label className={styles.settingLabel}>Format 格式</label>
                <div className={styles.formatButtons}>
                  {FORMAT_OPTIONS.map((fmt) => (
                    <button
                      key={fmt.id}
                      className={`${styles.formatButton} ${format === fmt.id ? styles.active : ''}`}
                      onClick={() => setFormat(fmt.id)}
                    >
                      <div className={styles.formatName}>{fmt.name}</div>
                      <div className={styles.formatDescription}>{fmt.description}</div>
                    </button>
                  ))}
                </div>
              </div>
            </Card>

            {/* Generate Button */}
            <Button
              variant="primary"
              className={styles.generateButton}
              onClick={handleGenerate}
              disabled={!text.trim() || isGenerating}
            >
              {isGenerating ? (
                <>
                  <span className={styles.spinner}></span>
                  Generating... 生成中...
                </>
              ) : (
                <>
                  🎤 Generate Speech 生成语音
                  {selectedLanguage === 'cantonese' ? ' (粤语 - Aliyun)' : ' (普通话/English - ZhipuAI)'}
                </>
              )}
            </Button>

            {/* Error Message */}
            {error && (
              <div className={styles.errorMessage}>
                ⚠️ {error}
              </div>
            )}

            {/* Audio Player */}
            {audioUrl && (
              <Card className={styles.playerCard}>
                <h3 className={styles.sectionTitle}>Audio Preview 音频预览</h3>
                <audio
                  ref={audioRef}
                  src={audioUrl}
                  controls
                  className={styles.audioPlayer}
                />
                <Button
                  variant="secondary"
                  className={styles.downloadButton}
                  onClick={handleDownload}
                >
                  ⬇️ Download Audio 下载音频
                </Button>
              </Card>
            )}
          </div>

          {/* History Sidebar */}
          <div className={styles.rightPanel}>
            <Card className={styles.historyCard}>
              <h3 className={styles.sectionTitle}>History 历史记录</h3>
              <div className={styles.historyList}>
                {history.length === 0 ? (
                  <div className={styles.emptyHistory}>
                    <div className={styles.emptyIcon}>🎵</div>
                    <p>No history yet</p>
                    <p className={styles.emptySubtext}>Generated audio will appear here</p>
                  </div>
                ) : (
                  history.map((item) => (
                    <div key={item.id} className={styles.historyItem}>
                      <div className={styles.historyItemContent}>
                        <div className={styles.historyText}>{item.text}</div>
                        <div className={styles.historyMeta}>
                          <span className={styles.historyVoice}>{item.voice}</span>
                          {item.language && (
                            <span className={styles.historyLanguage}>
                              {item.language === 'cantonese' ? '粤语' : '普通话'}
                            </span>
                          )}
                          <span className={styles.historyTime}>{formatTime(item.timestamp)}</span>
                        </div>
                      </div>
                      <div className={styles.historyActions}>
                        <button
                          className={styles.historyButton}
                          onClick={() => handlePlayHistory(item)}
                          title="Play"
                        >
                          ▶️
                        </button>
                        <button
                          className={styles.historyButton}
                          onClick={() => handleDeleteHistory(item.id)}
                          title="Delete"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>

            {/* Info Card */}
            <Card className={styles.infoCard}>
              <h3 className={styles.sectionTitle}>💡 Tips</h3>
              <ul className={styles.tipsList}>
                <li>Maximum text length: 1024 characters</li>
                <li>Adjust speed for better clarity</li>
                <li>WAV format recommended for quality</li>
                <li><strong>Mandarin/English:</strong> ZhipuAI with auto language detection</li>
                <li><strong>Cantonese:</strong> Aliyun with native Cantonese support - just use Chinese characters!</li>
              </ul>
            </Card>

            {/* API Provider Info */}
            <Card className={styles.guideCard}>
              <h3 className={styles.sectionTitle}>🗣️ Dual API System</h3>
              <div className={styles.guideContent}>
                <div className={styles.guideSection}>
                  <h4>ZhipuAI (智谱AI)</h4>
                  <p><strong>Languages:</strong> Mandarin & English</p>
                  <p>Auto-detects language from input text. Works naturally with Chinese characters and English text.</p>
                </div>
                <div className={styles.guideSection}>
                  <h4>Aliyun (阿里云)</h4>
                  <p><strong>Language:</strong> Native Cantonese 粤语</p>
                  <p className={styles.guideExample}>
                    Example:<br/>
                    Input: 你好，今日天氣好唔好呀？<br/>
                    Result: Perfect Cantonese pronunciation! ✨
                  </p>
                  <p style={{marginTop: '0.5rem', fontSize: '0.875rem', color: '#666'}}>
                    No romanization needed - the model understands Cantonese natively.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

