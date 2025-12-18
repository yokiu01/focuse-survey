// 실시간 행동 데이터 측정 유틸리티

export class AnalyticsTracker {
  private sceneStartTime: number = 0;
  private sliderChangeCounts: Map<string, number> = new Map();

  // 씬 시작 추적
  startScene(_sceneId: string): void {
    this.sceneStartTime = performance.now();
  }

  // 씬 종료 및 체류 시간 반환 (초 단위)
  endScene(): number {
    if (!this.sceneStartTime) return 0;
    const duration = (performance.now() - this.sceneStartTime) / 1000;
    this.sceneStartTime = 0;
    return Math.round(duration);
  }

  // 슬라이더 조작 추적 (망설임 측정)
  trackSliderChange(sliderId: string): void {
    const count = this.sliderChangeCounts.get(sliderId) || 0;
    this.sliderChangeCounts.set(sliderId, count + 1);
  }

  // 슬라이더 조작 횟수 반환
  getSliderHesitation(sliderId: string): number {
    return this.sliderChangeCounts.get(sliderId) || 0;
  }

  // 슬라이더 초기화
  resetSliderTracking(sliderId: string): void {
    this.sliderChangeCounts.delete(sliderId);
  }

  // 모든 슬라이더 데이터 반환
  getAllSliderHesitations(): Record<string, number> {
    return Object.fromEntries(this.sliderChangeCounts);
  }

  // 클릭 패턴 추적
  trackClick(elementId: string, context: any = {}): void {
    console.log(`Click tracked: ${elementId}`, context);
  }
}

// 타이머 유틸리티 (의사결정 시간 측정)
export class DecisionTimer {
  private startTime: number = 0;
  private isRunning: boolean = false;

  start(): void {
    this.startTime = performance.now();
    this.isRunning = true;
  }

  stop(): number {
    if (!this.isRunning) return 0;
    const elapsed = (performance.now() - this.startTime) / 1000;
    this.isRunning = false;
    return Math.round(elapsed * 100) / 100; // 소수점 2자리
  }

  reset(): void {
    this.startTime = 0;
    this.isRunning = false;
  }

  getElapsed(): number {
    if (!this.isRunning) return 0;
    return Math.round((performance.now() - this.startTime) / 1000);
  }
}

// 진행률 계산 (거짓말 진행률 포함)
export const calculateProgress = (currentScene: number, totalScenes: number, inflate: boolean = true): number => {
  const realProgress = (currentScene / totalScenes) * 100;

  if (!inflate) return Math.round(realProgress);

  // 실제보다 15-20% 부풀리기 (사용자 동기부여)
  const inflatedProgress = Math.min(100, realProgress * 1.15 + 10);
  return Math.round(inflatedProgress);
};

// 완료 인원 랜덤 생성 (사회적 증거)
export const getCompletionCount = (): number => {
  const baseCount = 891;
  const randomVariation = Math.floor(Math.random() * 50);
  return baseCount + randomVariation;
};
