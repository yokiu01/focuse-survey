import { useState, useEffect } from 'react';
import { SurveyData, Scene } from './types';
import { storage, createInitialData } from './utils/storage';
import { AnalyticsTracker } from './utils/analytics';
import { PrivacyConsent } from './components/PrivacyConsent';
import { ProgressBar } from './components/ProgressBar';
import { ResultPage } from './components/ResultPage';

// Scene imports (v2 구조)
import { IntroScene } from './scenes/IntroScene';
import { Chapter1Scene1 } from './scenes/Chapter1Scene1';
import { Chapter1Scene2 } from './scenes/Chapter1Scene2';
import { Chapter1Scene3 } from './scenes/Chapter1Scene3';
import { Chapter1Scene4 } from './scenes/Chapter1Scene4';
import { Chapter1Scene5 } from './scenes/Chapter1Scene5';
import { Chapter2Scene1 } from './scenes/Chapter2Scene1';
import { Chapter2Scene2 } from './scenes/Chapter2Scene2';
import { Chapter2Scene3 } from './scenes/Chapter2Scene3';
import { Chapter3Scene1 } from './scenes/Chapter3Scene1';
import { Chapter3Scene2 } from './scenes/Chapter3Scene2';
import { Chapter3Scene3 } from './scenes/Chapter3Scene3';
import { Chapter3Scene4 } from './scenes/Chapter3Scene4';
import { OutroScene1 } from './scenes/OutroScene1';
import { OutroScene2 } from './scenes/OutroScene2';

import './App.css';

// v2 설문 구조: 14개 질문, 7-10분 예상
const SCENES: Scene[] = [
  // Intro: 몰입 유도 (Q1)
  { id: 'intro', chapter: 0, title: '아침 알람', component: IntroScene },

  // Chapter 1: 도구 사용 패턴 (Q2-Q6)
  { id: 'ch1-q2', chapter: 1, title: '현재 도구', component: Chapter1Scene1 },
  { id: 'ch1-q3', chapter: 1, title: '사용 빈도', component: Chapter1Scene2 },
  { id: 'ch1-q4', chapter: 1, title: '버린 도구', component: Chapter1Scene3 },
  { id: 'ch1-q5', chapter: 1, title: '포기 이유', component: Chapter1Scene4 },
  { id: 'ch1-q6', chapter: 1, title: '현재 지출', component: Chapter1Scene5 },

  // Chapter 2: 실행 패턴 (Q7-Q9)
  { id: 'ch2-q7', chapter: 2, title: '어제 실행률', component: Chapter2Scene1 },
  { id: 'ch2-q8', chapter: 2, title: '실패 빈도', component: Chapter2Scene2 },
  { id: 'ch2-q9', chapter: 2, title: '실패 원인', component: Chapter2Scene3 },

  // Chapter 3: 솔루션 반응 (Q10-Q13) - 핵심
  { id: 'ch3-q10', chapter: 3, title: '페인포인트', component: Chapter3Scene1 },
  { id: 'ch3-q11', chapter: 3, title: '솔루션 제시', component: Chapter3Scene2 },
  { id: 'ch3-q12', chapter: 3, title: '가격 검증', component: Chapter3Scene3 },
  { id: 'ch3-q13', chapter: 3, title: '가격 탐색', component: Chapter3Scene4 },

  // Outro: 베타 신청 (Q14-Q15)
  { id: 'outro-q14', chapter: 4, title: '베타 신청', component: OutroScene1 },
  { id: 'outro-q15', chapter: 4, title: '피드백', component: OutroScene2 },
];

function App() {
  const [consented, setConsented] = useState(false);
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [surveyData, setSurveyData] = useState<SurveyData>(createInitialData());
  const [analytics] = useState(new AnalyticsTracker());

  // 중간 저장된 데이터 로드
  useEffect(() => {
    const saved = storage.load();
    if (saved) {
      const shouldResume = confirm(
        '이전에 작성하던 설문이 있습니다. 이어서 하시겠어요?'
      );
      if (shouldResume) {
        setSurveyData(saved);
        setCurrentSceneIndex(saved.currentScene || 0);
        setConsented(true);
      } else {
        storage.clear();
      }
    }
  }, []);

  // 데이터 변경 시 자동 저장
  useEffect(() => {
    if (consented) {
      storage.save(surveyData);
    }
  }, [surveyData, consented]);

  // 씬 변경 시 추적
  useEffect(() => {
    const currentScene = SCENES[currentSceneIndex];

    if (consented && currentScene) {
      analytics.startScene(currentScene.id);
    }

    return () => {
      if (consented && currentScene) {
        const duration = analytics.endScene();
        setSurveyData(prev => ({
          ...prev,
          behavioral: {
            ...prev.behavioral,
            sceneTimings: {
              ...prev.behavioral.sceneTimings,
              [currentScene.id]: duration
            }
          }
        }));
      }
    };
  }, [currentSceneIndex, consented, analytics]);

  const handleConsent = () => {
    setConsented(true);
    setSurveyData(prev => ({
      ...prev,
      startTime: Date.now()
    }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNext = (updates: Partial<SurveyData>) => {
    setSurveyData(prev => {
      const updated = {
        ...prev,
        ...updates,
        // 중첩 객체 머지
        intro: { ...prev.intro, ...updates.intro },
        tools: { ...prev.tools, ...updates.tools },
        spending: { ...prev.spending, ...updates.spending },
        execution: { ...prev.execution, ...updates.execution },
        painPoint: { ...prev.painPoint, ...updates.painPoint },
        solution: { ...prev.solution, ...updates.solution },
        pricing: { ...prev.pricing, ...updates.pricing },
        betaSignup: { ...prev.betaSignup, ...updates.betaSignup },
        feedback: { ...prev.feedback, ...updates.feedback },
        currentScene: currentSceneIndex + 1,
        progress: Math.round(((currentSceneIndex + 1) / SCENES.length) * 100),
        lastUpdated: Date.now()
      };
      return updated;
    });

    setCurrentSceneIndex(prev => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setSurveyData(prev => ({
      ...prev,
      behavioral: {
        ...prev.behavioral,
        backButtonClicks: prev.behavioral.backButtonClicks + 1
      }
    }));
    setCurrentSceneIndex(prev => Math.max(0, prev - 1));
  };

  const handleRestart = () => {
    storage.clear();
    window.location.reload();
  };

  if (!consented) {
    return <PrivacyConsent onAccept={handleConsent} />;
  }

  const currentScene = SCENES[currentSceneIndex];

  // 완료 화면 - 결과 페이지
  if (!currentScene) {
    const completionTime = (Date.now() - surveyData.startTime) / 1000 / 60;
    const updatedData: SurveyData = {
      ...surveyData,
      result: {
        ...surveyData.result,
        completionTime
      }
    };

    return <ResultPage data={updatedData} onRestart={handleRestart} />;
  }

  const SceneComponent = currentScene.component;
  const estimatedTimeLeft = Math.max(0, Math.ceil((SCENES.length - currentSceneIndex) * 0.5));

  return (
    <div className="app-container">
      <ProgressBar
        currentScene={currentSceneIndex}
        totalScenes={SCENES.length}
        estimatedTimeLeft={estimatedTimeLeft}
      />

      <div className="scene-wrapper">
        <SceneComponent
          data={surveyData}
          onNext={handleNext}
          onBack={currentSceneIndex > 0 ? handleBack : undefined}
        />
      </div>

      {currentSceneIndex > 0 && currentSceneIndex < SCENES.length - 1 && (
        <button className="back-button" onClick={handleBack}>
          ← 이전
        </button>
      )}
    </div>
  );
}

export default App;
