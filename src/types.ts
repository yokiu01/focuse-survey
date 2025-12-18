// 게임형 설문 데이터 타입 정의

export interface SurveyData {
  // 세션 정보
  userId: string;
  sessionId: string;
  startTime: number;
  lastUpdated: number;
  deviceType: 'mobile' | 'desktop';
  currentChapter: number;
  currentScene: number;
  progress: number; // 0-100

  // Chapter 1: 아침의 혼돈
  chapter1: {
    morningRoutine?: 'snooze_3times' | 'wake_immediately' | 'snooze_alarm' | 'check_sns';
    todoCount?: number; // 0-50+
    priorityDecision?: 'report' | 'planning' | 'email' | 'random' | 'youtube';
    priorityDecisionTime?: number; // 초
    commuteActivity?: 'sns' | 'news' | 'music' | 'planning' | 'sleep';
  };

  // Chapter 2: 오전 업무 (도구 탐색)
  chapter2: {
    currentTools?: string[]; // Notion, Todoist, Trello, 종이, 등
    toolUsageFrequency?: Record<string, 'daily' | 'sometimes' | 'installed'>;
    paidTools?: Record<string, number>; // 도구명: 월 비용
    paymentReasons?: string[]; // 유료 전환 이유
    freeReasons?: string[]; // 무료 고수 이유
    abandonedApps?: string[];
    abandonReasons?: Record<string, string[]>;
    pomodoroExperience?: 'use_now' | 'tried_quit' | 'heard_not_tried' | 'never_heard';
    pomodoroQuitTime?: number; // 몇 분만에 끔
    pomodoroQuitReasons?: string[];
    pomodoroFrequency?: number; // 하루 몇 번
  };

  // Chapter 3: 오후 집중력 전투
  chapter3: {
    completedTasks?: number;
    totalTasks?: number;
    energyLevel?: number; // 0-100
    anxietyLevel?: number; // 0-100
    phoneCheckCount?: number; // 0-50+
    interruptionResponse?: 'ignore_all' | 'check_kakao' | 'check_all' | 'escape';
    yesterdayCompleted?: number;
    yesterdayPlanned?: number;
    failureReasons?: string[];
    escapeActivities?: string[];
  };

  // Chapter 4: 퇴근 후 반성 (지불 의향)
  chapter4: {
    frustrationFrequency?: 'daily' | 'weekly_3_4' | 'weekly_1_2' | 'rarely';
    copingStrategy?: 'self_blame' | 'overtime' | 'give_up' | 'hope_tomorrow';
    adhdSpending?: {
      medication?: number;
      therapy?: number;
      apps?: number;
      books?: number;
      cafe?: number;
      headphones?: number;
      total?: number;
    };
    valueDescription?: string; // 자유 입력
    willingToPay?: number; // 0-50000
    priceOpinion?: 'ok' | 'expensive' | 'too_cheap' | 'custom';
    customPrice?: number;
  };

  // 베타 신청
  betaSignup?: {
    interested?: boolean;
    email?: string;
    notifyLater?: boolean;
    notInterestReason?: string;
  };

  // 결과 분석
  result?: {
    userType?: 'storm_multitasker' | 'perfectionist_procrastinator' | 'focus_survivor' | 'lost_navigator';
    completionTime?: number; // 초
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
