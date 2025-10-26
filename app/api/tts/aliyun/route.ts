import { NextRequest, NextResponse } from 'next/server';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const Nls = require('alibabacloud-nls');

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface AliyunTTSRequest {
  text: string;
  voice: string;
  speed: number;
  volume: number;
  format: string;
  appkey: string;
  token: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: AliyunTTSRequest = await req.json();
    const { text, voice, speed, volume, format, appkey, token } = body;

    console.log('[Aliyun TTS] Request received:', { 
      textLength: text?.length, 
      voice, 
      speed, 
      volume, 
      format 
    });

    // Validate required fields
    if (!text) {
      console.error('[Aliyun TTS] Missing text field');
      return NextResponse.json(
        { error: 'Missing required field: text' },
        { status: 400 }
      );
    }

    // Use environment variables if not provided
    // Support multiple variable names for compatibility
    const APPKEY = appkey 
      || process.env.ALIYUN_APPKEY 
      || process.env.NEXT_PUBLIC_ALIYUN_APPKEY
      || process.env.NEXT_PUBLIC_ALIYUN_CANTONESE_APPKEY;
      
    const TOKEN = token 
      || process.env.ALIYUN_TOKEN
      || process.env.NEXT_PUBLIC_ALIYUN_TOKEN;

    console.log('[Aliyun TTS] Credentials check:', { 
      hasAppkey: !!APPKEY, 
      hasToken: !!TOKEN,
      env_ALIYUN_APPKEY: !!process.env.ALIYUN_APPKEY,
      env_NEXT_PUBLIC_ALIYUN_APPKEY: !!process.env.NEXT_PUBLIC_ALIYUN_APPKEY,
      env_NEXT_PUBLIC_ALIYUN_CANTONESE_APPKEY: !!process.env.NEXT_PUBLIC_ALIYUN_CANTONESE_APPKEY,
      env_ALIYUN_TOKEN: !!process.env.ALIYUN_TOKEN,
      env_NEXT_PUBLIC_ALIYUN_TOKEN: !!process.env.NEXT_PUBLIC_ALIYUN_TOKEN,
    });

    if (!APPKEY) {
      console.error('[Aliyun TTS] Missing APPKEY');
      return NextResponse.json(
        { 
          error: 'Aliyun APPKEY not configured',
          details: 'Please set ALIYUN_APPKEY or NEXT_PUBLIC_ALIYUN_CANTONESE_APPKEY in .env.local'
        },
        { status: 500 }
      );
    }

    if (!TOKEN) {
      console.error('[Aliyun TTS] No token available');
      return NextResponse.json(
        { 
          error: 'No Aliyun token available',
          details: 'Please set NEXT_PUBLIC_ALIYUN_TOKEN in .env.local'
        },
        { status: 500 }
      );
    }

    console.log('[Aliyun TTS] Using provided token');

    // Aliyun WebSocket URL
    const URL = 'wss://nls-gateway-cn-shanghai.aliyuncs.com/ws/v1';

    // Store audio chunks
    const audioChunks: Buffer[] = [];

    return new Promise<NextResponse>((resolve, reject) => {
      console.log('[Aliyun TTS] Creating SpeechSynthesizer...');
      
      // Create SpeechSynthesizer instance
      let tts;
      try {
        tts = new Nls.SpeechSynthesizer({
          url: URL,
          appkey: APPKEY,
          token: TOKEN,
        });
        console.log('[Aliyun TTS] SpeechSynthesizer created successfully');
      } catch (error) {
        console.error('[Aliyun TTS] Failed to create SpeechSynthesizer:', error);
        reject(error);
        return;
      }

      // Set up event handlers
      tts.on('meta', (msg: string) => {
        console.log('Aliyun TTS metadata:', msg);
      });

      tts.on('data', (data: Buffer) => {
        console.log(`Received audio chunk: ${data.length} bytes`);
        audioChunks.push(data);
      });

      tts.on('completed', (msg: string) => {
        console.log('Aliyun TTS completed:', msg);
        
        // Combine all audio chunks
        const audioBuffer = Buffer.concat(audioChunks);
        
        // Return audio as response
        resolve(
          new NextResponse(audioBuffer, {
            status: 200,
            headers: {
              'Content-Type': `audio/${format || 'wav'}`,
              'Content-Length': audioBuffer.length.toString(),
              'Cache-Control': 'no-cache',
            },
          })
        );
      });

      tts.on('closed', () => {
        console.log('Aliyun WebSocket closed');
      });

      tts.on('failed', (error: string) => {
        console.error('Aliyun TTS failed:', error);
        reject(new Error(`Aliyun TTS failed: ${error}`));
      });

      // Prepare TTS parameters
      const param = tts.defaultStartParams();
      param.text = text;
      // Support custom voices like 'kelly' or standard voices like 'siyue'
      param.voice = voice || 'kelly'; // Default to custom Cantonese voice 'kelly' (香港粤语女声)
      param.format = format || 'wav';
      param.sample_rate = 16000;
      param.volume = Math.round(volume * 50); // Convert 0.1-10 to Aliyun's 0-100 scale
      param.speech_rate = Math.round((speed - 1) * 500); // Convert 0.5-2.0 to -500~500
      param.enable_subtitle = false;

      console.log('[Aliyun TTS] Starting synthesis with params:', {
        voice: param.voice,
        format: param.format,
        textLength: param.text.length
      });

      // Start synthesis
      tts.start(param, true, 6000)
        .then(() => {
          console.log('[Aliyun TTS] Synthesis started successfully');
        })
        .catch((error: Error) => {
          console.error('[Aliyun TTS] Error starting synthesis:', error);
          reject(error);
        });

      // Timeout after 30 seconds
      setTimeout(() => {
        reject(new Error('Aliyun TTS timeout'));
      }, 30000);
    });

  } catch (error) {
    console.error('[Aliyun TTS] Fatal error:', error);
    console.error('[Aliyun TTS] Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    return NextResponse.json(
      { 
        error: 'Failed to generate speech with Aliyun',
        details: error instanceof Error ? error.message : 'Unknown error',
        type: error instanceof Error ? error.constructor.name : typeof error
      },
      { status: 500 }
    );
  }
}

