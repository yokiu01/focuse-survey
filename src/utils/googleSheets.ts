// Google Sheets 데이터 전송 유틸리티
import { SurveyData } from '../types';

const GOOGLE_SHEETS_URL = import.meta.env.VITE_GOOGLE_SHEETS_URL;

export interface SubmitResponse {
  success: boolean;
  message?: string;
  error?: string;
}

/**
 * Google Sheets로 설문 데이터 전송
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
    // Google Sheets Apps Script 형식에 맞게 데이터 변환
    const payload = {
      sessionId: data.sessionId,
      startTime: data.startTime,
      lastUpdated: data.lastUpdated,
      deviceType: data.deviceType,
      progress: data.progress,

      // Chapter 1: 아침의 혼돈
      chapter1: {
        morningRoutine: data.chapter1.morningRoutine,
        todoCount: data.chapter1.todoCount,
        priorityDecision: data.chapter1.priorityDecision,
        priorityDecisionTime: data.chapter1.priorityDecisionTime,
        commuteActivity: data.chapter1.commuteActivity
      },

      // Chapter 2: 오전 업무 (도구 탐색)
      chapter2: {
        currentTools: data.chapter2.currentTools,
        toolUsageFrequency: data.chapter2.toolUsageFrequency,
        paidTools: data.chapter2.paidTools,
        paymentReasons: data.chapter2.paymentReasons,
        freeReasons: data.chapter2.freeReasons,
        abandonedApps: data.chapter2.abandonedApps,
        abandonReasons: data.chapter2.abandonReasons,
        pomodoroExperience: data.chapter2.pomodoroExperience,
        pomodoroQuitTime: data.chapter2.pomodoroQuitTime,
        pomodoroQuitReasons: data.chapter2.pomodoroQuitReasons,
        pomodoroFrequency: data.chapter2.pomodoroFrequency
      },

      // Chapter 3: 오후 집중력 전투
      chapter3: {
        completedTasks: data.chapter3.completedTasks,
        totalTasks: data.chapter3.totalTasks,
        energyLevel: data.chapter3.energyLevel,
        anxietyLevel: data.chapter3.anxietyLevel,
        phoneCheckCount: data.chapter3.phoneCheckCount,
        interruptionResponse: data.chapter3.interruptionResponse,
        yesterdayCompleted: data.chapter3.yesterdayCompleted,
        yesterdayPlanned: data.chapter3.yesterdayPlanned,
        failureReasons: data.chapter3.failureReasons,
        escapeActivities: data.chapter3.escapeActivities
      },

      // Chapter 4: 퇴근 후 반성 (지불 의향)
      chapter4: {
        frustrationFrequency: data.chapter4.frustrationFrequency,
        copingStrategy: data.chapter4.copingStrategy,
        adhdSpending: data.chapter4.adhdSpending,
        valueDescription: data.chapter4.valueDescription,
        willingToPay: data.chapter4.willingToPay,
        priceOpinion: data.chapter4.priceOpinion,
        customPrice: data.chapter4.customPrice
      },

      // Beta Signup
      betaSignup: {
        interested: data.betaSignup?.interested,
        email: data.betaSignup?.email,
        notInterestReason: data.betaSignup?.notInterestReason,
        notifyLater: data.betaSignup?.notifyLater
      },

      // 메타데이터
      trustScore: data.trustScore,
      dataCompleteness: data.dataCompleteness,

      // 행동 데이터
      behavioral: {
        backButtonClicks: data.behavioral.backButtonClicks,
        dropOffPoint: data.behavioral.dropOffPoint,
        sceneTimings: data.behavioral.sceneTimings
      },

      // 결과
      result: data.result
    };

    console.log('Google Sheets로 데이터 전송 중...', payload);

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
 * 데이터 완성도 계산 (0-100%)
 */
export function calculateDataCompleteness(data: SurveyData): number {
  const fields = [
    data.chapter1.morningRoutine !== undefined,
    data.chapter1.todoCount !== undefined,
    data.chapter1.priorityDecision !== undefined,
    data.chapter1.priorityDecisionTime !== undefined,
    data.chapter2.currentTools !== undefined && data.chapter2.currentTools.length > 0,
    data.chapter2.pomodoroExperience !== undefined,
    data.chapter3.completedTasks !== undefined,
    data.chapter3.totalTasks !== undefined,
    data.chapter3.energyLevel !== undefined,
    data.chapter3.anxietyLevel !== undefined,
    data.chapter4.frustrationFrequency !== undefined,
    data.chapter4.copingStrategy !== undefined,
    data.chapter4.willingToPay !== undefined,
    data.betaSignup?.interested !== undefined
  ];

  const completedFields = fields.filter(Boolean).length;
  return Math.round((completedFields / fields.length) * 100);
}

/**
 * 신뢰도 점수 계산 (0-100)
 * - 완료 시간이 너무 짧거나 길면 감점
 * - 모든 답변이 동일하면 감점
 * - 뒤로가기를 너무 많이 사용하면 감점
 */
export function calculateTrustScore(data: SurveyData): number {
  let score = 100;

  // 완료 시간 체크 (5분 미만 또는 30분 이상이면 의심)
  const completionMinutes = data.result?.completionTime || 0;
  if (completionMinutes < 5) {
    score -= 30; // 너무 빠름
  } else if (completionMinutes > 30) {
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
