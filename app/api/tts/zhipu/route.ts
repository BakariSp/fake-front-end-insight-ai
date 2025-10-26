import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface ZhipuTTSRequest {
  text: string;
  voice: string;
  speed: number;
  volume: number;
  format: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: ZhipuTTSRequest = await req.json();
    const { text, voice, speed, volume, format } = body;

    // 从环境变量获取API Key（服务器端，不会暴露到浏览器）
    const ZHIPU_API_KEY = process.env.ZHIPU_API_KEY;

    if (!ZHIPU_API_KEY) {
      return NextResponse.json(
        { error: 'ZhipuAI API key not configured' },
        { status: 500 }
      );
    }

    console.log('[ZhipuAI TTS] Generating speech with ZhipuAI API');

    const response = await fetch('https://open.bigmodel.cn/api/paas/v4/audio/speech', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ZHIPU_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'cogtts',
        input: text,
        voice: voice,
        speed: speed,
        volume: volume,
        response_format: format,
        watermark_enabled: true,
      }),
    });

    if (!response.ok) {
      throw new Error(`ZhipuAI API Error: ${response.status}`);
    }

    // 返回音频数据
    const audioBlob = await response.arrayBuffer();
    
    return new NextResponse(audioBlob, {
      status: 200,
      headers: {
        'Content-Type': `audio/${format || 'wav'}`,
        'Cache-Control': 'no-cache',
      },
    });

  } catch (error) {
    console.error('[ZhipuAI TTS] Error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to generate speech with ZhipuAI',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

