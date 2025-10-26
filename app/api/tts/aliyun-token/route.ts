import { NextResponse } from 'next/server';
import crypto from 'crypto';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Aliyun Token缓存
let cachedToken: { token: string; expireTime: number } | null = null;

/**
 * 根据阿里云文档生成Token
 * https://help.aliyun.com/zh/isi/getting-started/use-http-or-https-to-obtain-an-access-token
 */
export async function GET() {
  try {
    const accessKeyId = process.env.ALIYUN_ACCESS_KEY_ID;
    const accessKeySecret = process.env.ALIYUN_ACCESS_KEY_SECRET;

    if (!accessKeyId || !accessKeySecret) {
      return NextResponse.json(
        { 
          error: 'Missing Aliyun credentials',
          details: 'Please set ALIYUN_ACCESS_KEY_ID and ALIYUN_ACCESS_KEY_SECRET in .env.local'
        },
        { status: 500 }
      );
    }

    // 检查缓存的Token是否还有效（提前5分钟刷新）
    if (cachedToken && cachedToken.expireTime > Date.now() / 1000 + 300) {
      console.log('[Aliyun Token] Using cached token, expires at:', new Date(cachedToken.expireTime * 1000));
      return NextResponse.json({
        token: cachedToken.token,
        expireTime: cachedToken.expireTime,
        cached: true
      });
    }

    console.log('[Aliyun Token] Fetching new token from Aliyun...');

    // 构造请求参数
    const timestamp = new Date().toISOString().replace(/\.\d{3}/, '').replace(/:/g, '%3A');
    const nonce = crypto.randomUUID();

    const parameters: Record<string, string> = {
      AccessKeyId: accessKeyId,
      Action: 'CreateToken',
      Format: 'JSON',
      RegionId: 'cn-shanghai',
      SignatureMethod: 'HMAC-SHA1',
      SignatureNonce: nonce,
      SignatureVersion: '1.0',
      Timestamp: timestamp,
      Version: '2019-02-28'
    };

    // 1. 规范化请求字符串（按字母顺序排序）
    const sortedKeys = Object.keys(parameters).sort();
    const canonicalizedQuery = sortedKeys
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(parameters[key])}`)
      .join('&');

    console.log('[Aliyun Token] Canonicalized query:', canonicalizedQuery);

    // 2. 构造待签名字符串
    const stringToSign = `GET&${encodeURIComponent('/')}&${encodeURIComponent(canonicalizedQuery)}`;
    
    console.log('[Aliyun Token] String to sign:', stringToSign);

    // 3. 计算签名
    const hmac = crypto.createHmac('sha1', `${accessKeySecret}&`);
    hmac.update(stringToSign);
    const signature = hmac.digest('base64');

    console.log('[Aliyun Token] Signature:', signature);

    // 4. 发送请求
    const url = `http://nls-meta.cn-shanghai.aliyuncs.com/?Signature=${encodeURIComponent(signature)}&${canonicalizedQuery}`;
    
    console.log('[Aliyun Token] Request URL:', url);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[Aliyun Token] Error response:', errorText);
      throw new Error(`Failed to get token: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    
    console.log('[Aliyun Token] Response:', JSON.stringify(data));

    if (data.Token && data.Token.Id && data.Token.ExpireTime) {
      const token = data.Token.Id;
      const expireTime = data.Token.ExpireTime;

      // 缓存Token
      cachedToken = { token, expireTime };

      const expireDate = new Date(expireTime * 1000).toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' });
      console.log(`[Aliyun Token] New token obtained, expires at: ${expireDate}`);

      return NextResponse.json({
        token,
        expireTime,
        expireDate,
        cached: false,
        success: true
      });
    } else {
      throw new Error('Invalid response format from Aliyun');
    }

  } catch (error) {
    console.error('[Aliyun Token] Error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to get Aliyun token',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

