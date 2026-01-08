// ExecuteAI 설문 v2.0 데이터 타입 정의

export interface SurveyData {
  // 세션 정보
  userId: string;
  sessionId: string;
  startTime: number;
  lastUpdated: number;
  deviceType: 'mobile' | 'desktop';
  currentScene: number;
  progress: number; // 0-100

  // Intro: 아침 루틴 (Q1)
  intro: {
    morningRoutine?: 'snooze' | 'wake_plan' | 'sns' | 'stay_bed';
  };

  // Chapter 1: 도구 사용 패턴 (Q2-Q6)
  tools: {
    current?: string[]; // 현재 사용 도구
    frequency?: Record<string, 'daily' | 'sometimes' | 'installed_only'>; // 사용 빈도
    abandoned?: string[]; // 버린 앱
    abandonReasons?: string[]; // 포기 이유
  };

  // 현재 지출 (Q6)
  spending: {
    current?: '0' | '~5000' | '~10000' | '15000+';
  };

  // Chapter 2: 실행 패턴 (Q7-Q9)
  execution: {
    yesterday?: number; // 0-100 (어제 실행률)
    failFrequency?: 'daily' | 'often' | 'sometimes' | 'rarely';
    failReasons?: string[];
  };

  // Chapter 3: 솔루션 반응 (Q10-Q13)
  painPoint: {
    main?: 'organizing' | 'prioritizing' | 'planning' | 'starting' | 'focusing';
  };

  solution: {
    interest?: 'want_now' | 'looks_ok' | 'unsure' | 'not_needed';
  };

  pricing: {
    reaction4900?: 'will_pay' | 'only_free' | 'too_expensive' | 'no_interest';
    willingToPay?: number;
  };

  // Outro: 베타 신청 (Q14-Q15)
  betaSignup: {
    email?: string;
    skipped?: boolean;
  };

  feedback: {
    openText?: string;
  };

  // 결과 분석
  result?: {
    userType?: 'storm_multitasker' | 'perfectionist_procrastinator' | 'focus_survivor' | 'lost_navigator';
    completionTime?: number; // 분
    sharedResult?: boolean;
  };

  // 행동 데이터
  behavioral: {
    sceneTimings: Record<string, number>; // 각 씬 체류 시간
    backButtonClicks: number;
    dropOffPoint?: string;
  };

  // 메타데이터 (분석용)
  trustScore?: number; // 0-100
  dataCompleteness?: number; // 0-100
}

export type Scene = {
  id: string;
  chapter: number;
  title: string;
  component: React.ComponentType<SceneProps>;
};

export interface SceneProps {
  data: SurveyData;
  onNext: (updates: Partial<SurveyData>) => void;
  onBack?: () => void;
}

// 사용자 타입 정의
export interface UserTypeResult {
  type: 'storm_multitasker' | 'perfectionist_procrastinator' | 'focus_survivor' | 'lost_navigator';
  title: string;
  emoji: string;
  description: string;
  characteristics: string[];
  pain: string;
  currentTool: string;
  spending: string;
  percentage: number; // 같은 타입 비율
}
