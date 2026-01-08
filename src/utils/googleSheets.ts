// Google Sheets 데이터 전송 유틸리티 (v2 - Secure)
import { SurveyData } from '../types';

export interface SubmitResponse {
  success: boolean;
  message?: string;
  error?: string;
}

/**
 * 서버 API를 통해 설문 데이터 전송 (보안 강화)
 */
export async function submitToGoogleSheets(data: SurveyData): Promise<SubmitResponse> {
  try {
    // 데이터 변환 (v2 구조)
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

    console.log('서버 API로 데이터 전송 중...');

    // 서버 API 엔드포인트 호출 (Google Sheets URL 숨김)
    const response = await fetch('/api/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('API 에러:', result.error);
      return {
        success: false,
        error: result.error || '데이터 전송에 실패했습니다.'
      };
    }

    console.log('데이터 전송 완료');
    return {
      success: true,
      message: '데이터가 성공적으로 저장되었습니다.'
    };

  } catch (error) {
    console.error('데이터 전송 실패:', error);
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
 */
export function calculateTrustScore(data: SurveyData): number {
  let score = 100;

  // 완료 시간 체크 (3분 미만 또는 20분 이상이면 의심)
  const completionMinutes = data.result?.completionTime || 0;
  if (completionMinutes < 3) {
    score -= 30;
  } else if (completionMinutes > 20) {
    score -= 10;
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
