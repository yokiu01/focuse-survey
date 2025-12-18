import { SurveyData } from '../types';

const STORAGE_KEY = 'adhd_survey_data';
const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000; // 7일

export const storage = {
  // 데이터 저장 (자동 중간 저장)
  save(data: SurveyData): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        ...data,
        lastUpdated: Date.now()
      }));
    } catch (error) {
      console.error('Failed to save survey data:', error);
    }
  },

  // 데이터 로드 (이어하기)
  load(): SurveyData | null {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return null;

      const data: SurveyData = JSON.parse(stored);

      // 7일 이상 지난 데이터는 무효화
      if (Date.now() - data.lastUpdated > SESSION_DURATION) {
        this.clear();
        return null;
      }

      return data;
    } catch (error) {
      console.error('Failed to load survey data:', error);
      return null;
    }
  },

  // 데이터 삭제
  clear(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear survey data:', error);
    }
  },

  // 세션 ID 생성
  generateSessionId(): string {
    return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
};

// 초기 데이터 생성
export const createInitialData = (): SurveyData => ({
  userId: storage.generateSessionId(),
  sessionId: storage.generateSessionId(),
  startTime: Date.now(),
  lastUpdated: Date.now(),
  deviceType: /mobile|android|iphone|ipad/i.test(navigator.userAgent) ? 'mobile' : 'desktop',
  currentChapter: 1,
  currentScene: 0,
  progress: 0,
  chapter1: {},
  chapter2: {},
  chapter3: {},
  chapter4: {},
  behavioral: {
    sceneTimings: {},
    backButtonClicks: 0
  }
});
