import type { VercelRequest, VercelResponse } from '@vercel/node';

// Rate limiting을 위한 간단한 메모리 스토어
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1분
const RATE_LIMIT_MAX = 5; // 1분에 5회

function getRateLimitKey(req: VercelRequest): string {
  const forwarded = req.headers['x-forwarded-for'];
  const ip = typeof forwarded === 'string' ? forwarded.split(',')[0] : req.socket?.remoteAddress || 'unknown';
  return ip;
}

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(key);

  if (!record || now > record.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }

  record.count++;
  return true;
}

// 입력 데이터 검증
function validatePayload(data: unknown): { valid: boolean; error?: string } {
  if (!data || typeof data !== 'object') {
    return { valid: false, error: 'Invalid payload' };
  }

  const payload = data as Record<string, unknown>;

  // 필수 필드 체크
  if (!payload.sessionId || typeof payload.sessionId !== 'string') {
    return { valid: false, error: 'Missing sessionId' };
  }

  // 이메일 형식 검증 (있는 경우)
  if (payload.betaSignup_email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(String(payload.betaSignup_email))) {
      return { valid: false, error: 'Invalid email format' };
    }
  }

  // 텍스트 필드 길이 제한
  if (payload.feedback_openText && String(payload.feedback_openText).length > 2000) {
    return { valid: false, error: 'Feedback too long' };
  }

  return { valid: true };
}

// XSS 방지를 위한 문자열 정화
function sanitizeString(str: unknown): string {
  if (typeof str !== 'string') return '';
  return str
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .slice(0, 5000); // 최대 길이 제한
}

function sanitizePayload(data: Record<string, unknown>): Record<string, unknown> {
  const sanitized: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string') {
      sanitized[key] = sanitizeString(value);
    } else if (typeof value === 'number' || typeof value === 'boolean') {
      sanitized[key] = value;
    } else if (value === null || value === undefined) {
      sanitized[key] = '';
    } else {
      sanitized[key] = sanitizeString(JSON.stringify(value));
    }
  }

  return sanitized;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS 설정
  res.setHeader('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGIN || '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Preflight 요청 처리
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // POST만 허용
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Rate limiting
  const rateLimitKey = getRateLimitKey(req);
  if (!checkRateLimit(rateLimitKey)) {
    return res.status(429).json({ error: 'Too many requests. Please try again later.' });
  }

  // 환경 변수 체크
  const GOOGLE_SHEETS_URL = process.env.GOOGLE_SHEETS_URL;
  if (!GOOGLE_SHEETS_URL) {
    console.error('GOOGLE_SHEETS_URL not configured');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    const payload = req.body;

    // 입력 검증
    const validation = validatePayload(payload);
    if (!validation.valid) {
      return res.status(400).json({ error: validation.error });
    }

    // 데이터 정화
    const sanitizedPayload = sanitizePayload(payload as Record<string, unknown>);

    // Google Sheets로 전송
    const response = await fetch(GOOGLE_SHEETS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sanitizedPayload),
    });

    if (!response.ok) {
      throw new Error(`Google Sheets responded with ${response.status}`);
    }

    return res.status(200).json({ success: true, message: 'Data submitted successfully' });

  } catch (error) {
    console.error('Submit error:', error);
    return res.status(500).json({ error: 'Failed to submit data' });
  }
}
