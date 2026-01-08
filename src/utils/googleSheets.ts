// Google Sheets 데이터 전송 유틸리티 (v2)
import { SurveyData } from '../types';

const GOOGLE_SHEETS_URL = import.meta.env.VITE_GOOGLE_SHEETS_URL;

export interface SubmitResponse {
  success: boolean;
  message?: string;
  error?: string;
}

/**
 * Google Sheets로 설문 데이터 전송 (v2 구조)
 */
export async function submitToGoogleSheets(data: SurveyData): Promise<SubmitResponse> {
  // 환경 변수 체크
  if (!GOOGLE_SHEETS_URL || GOOGLE_SHEETS_URL.includes('YOUR_SCRIPT_ID')) {
    console.warn('Google Sheets URL이 설정되지 않았습니다. .env 파일을 확인하세요.');
    return {
      success: false,
      error: 'Google Sheets URL이 설정되지 않았습니다.'
    };
  }

  try {
    // Google Sheets Apps Script 형식에 맞게 데이터 변환 (v2)
    const payload = {
      // 세션 정보
      sessionId: data.sessionId,
      startTime: data.startTime,
      lastUpdated: data.lastUpdated,
      deviceType: data.deviceType,
      progress: data.progress,

      // Intro (Q1)
      intro_morningRoutine: data.intro.morningRoutine,

      // Tools (Q2-Q5)
      tools_current: data.tools.current?.join(', '),
      tools_frequency: JSON.stringify(data.tools.frequency),
      tools_abandoned: data.tools.abandoned?.join(', '),
      tools_abandonReasons: data.tools.abandonReasons?.join(', '),

      // Spending (Q6)
      spending_current: data.spending.current,

      // Execution (Q7-Q9)
      execution_yesterday: data.execution.yesterday,
      execution_failFrequency: data.execution.failFrequency,
      execution_failReasons: data.execution.failReasons?.join(', '),

      // Pain Point (Q10)
      painPoint_main: data.painPoint.main,

      // Solution (Q11)
      solution_interest: data.solution.interest,

      // Pricing (Q12-Q13) - 핵심 PMF 검증
      pricing_reaction4900: data.pricing.reaction4900,
      pricing_willingToPay: data.pricing.willingToPay,

      // Beta Signup (Q14-Q15)
      betaSignup_email: data.betaSignup.email,
      betaSignup_skipped: data.betaSignup.skipped,

      // Feedback
      feedback_openText: data.feedback.openText,

      // 메타데이터
      trustScore: data.trustScore,
      dataCompleteness: data.dataCompleteness,

      // 행동 데이터
      behavioral_backButtonClicks: data.behavioral.backButtonClicks,
      behavioral_dropOffPoint: data.behavioral.dropOffPoint,
      behavioral_sceneTimings: JSON.stringify(data.behavioral.sceneTimings),

      // 결과
      result_completionTime: data.result?.completionTime,
      result_userType: data.result?.userType
    };

    console.log('Google Sheets로 데이터 전송 중 (v2)...', payload);

    await fetch(GOOGLE_SHEETS_URL, {
      method: 'POST',
      mode: 'no-cors', // Google Apps Script는 CORS 제한이 있음
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    // no-cors 모드에서는 응답을 읽을 수 없으므로 성공으로 간주
    console.log('Google Sheets 전송 완료');

    return {
      success: true,
      message: '데이터가 성공적으로 저장되었습니다.'
    };

  } catch (error) {
    console.error('Google Sheets 전송 실패:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.'
    };
  }
}

/**
 * 데이터 완성도 계산 (0-100%) - v2
 */
export function calculateDataCompleteness(data: SurveyData): number {
  const fields = [
    // Intro
    data.intro.morningRoutine !== undefined,
    // Tools
    data.tools.current !== undefined && data.tools.current.length > 0,
    // Spending
    data.spending.current !== undefined,
    // Execution
    data.execution.yesterday !== undefined,
    data.execution.failFrequency !== undefined,
    // Pain Point
    data.painPoint.main !== undefined,
    // Solution
    data.solution.interest !== undefined,
    // Pricing (핵심)
    data.pricing.reaction4900 !== undefined,
    // Beta Signup
    data.betaSignup.email !== undefined || data.betaSignup.skipped === true
  ];

  const completedFields = fields.filter(Boolean).length;
  return Math.round((completedFields / fields.length) * 100);
}

/**
 * 신뢰도 점수 계산 (0-100) - v2
 * - 완료 시간이 너무 짧거나 길면 감점
 * - 뒤로가기를 너무 많이 사용하면 감점
 */
export function calculateTrustScore(data: SurveyData): number {
  let score = 100;

  // 완료 시간 체크 (3분 미만 또는 20분 이상이면 의심)
  const completionMinutes = data.result?.completionTime || 0;
  if (completionMinutes < 3) {
    score -= 30; // 너무 빠름
  } else if (completionMinutes > 20) {
    score -= 10; // 너무 느림
  }

  // 뒤로가기 과다 사용 체크
  if (data.behavioral.backButtonClicks > 10) {
    score -= 20;
  }

  // 데이터 완성도 체크
  const completeness = calculateDataCompleteness(data);
  if (completeness < 50) {
    score -= 30;
  }

  return Math.max(0, Math.min(100, score));
}
