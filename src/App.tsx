import { useState, useEffect } from 'react';
import { SurveyData, Scene } from './types';
import { storage, createInitialData } from './utils/storage';
import { AnalyticsTracker } from './utils/analytics';
import { PrivacyConsent } from './components/PrivacyConsent';
import { ProgressBar } from './components/ProgressBar';
import { ResultPage } from './components/ResultPage';

// Scene imports
import { Chapter1Scene1 } from './scenes/Chapter1Scene1';
import { Chapter1Scene2 } from './scenes/Chapter1Scene2';
import { Chapter1Scene3 } from './scenes/Chapter1Scene3';
import { Chapter1Scene4 } from './scenes/Chapter1Scene4';
import { Chapter2Scene1 } from './scenes/Chapter2Scene1';
import { Chapter2Scene2 } from './scenes/Chapter2Scene2';
import { Chapter2Scene3 } from './scenes/Chapter2Scene3';
import { Chapter2Scene4 } from './scenes/Chapter2Scene4';
import { Chapter3Scene1 } from './scenes/Chapter3Scene1';
import { Chapter3Scene2 } from './scenes/Chapter3Scene2';
import { Chapter3Scene3 } from './scenes/Chapter3Scene3';
import { Chapter3Scene4 } from './scenes/Chapter3Scene4';
import { Chapter4Scene1 } from './scenes/Chapter4Scene1';
import { Chapter4Scene2 } from './scenes/Chapter4Scene2';
import { Chapter4Scene3 } from './scenes/Chapter4Scene3';
import { Chapter4Scene4 } from './scenes/Chapter4Scene4';

import './App.css';

const SCENES: Scene[] = [
  // Chapter 1: 아침의 혼돈
  { id: 'ch1-s1', chapter: 1, title: '알람이 울린다', component: Chapter1Scene1 },
  { id: 'ch1-s2', chapter: 1, title: '할 일 목록', component: Chapter1Scene2 },
  { id: 'ch1-s3', chapter: 1, title: '우선순위의 지옥', component: Chapter1Scene3 },
  { id: 'ch1-s4', chapter: 1, title: '출근길', component: Chapter1Scene4 },

  // Chapter 2: 오전 업무
  { id: 'ch2-s1', chapter: 2, title: '도구의 무덤', component: Chapter2Scene1 },
  { id: 'ch2-s2', chapter: 2, title: '유료 결제', component: Chapter2Scene2 },
  { id: 'ch2-s3', chapter: 2, title: '과거의 무덤', component: Chapter2Scene3 },
  { id: 'ch2-s4', chapter: 2, title: '25분의 저주', component: Chapter2Scene4 },

  // Chapter 3: 오후 집중력 전투
  { id: 'ch3-s1', chapter: 3, title: '오후 2시의 위기', component: Chapter3Scene1 },
  { id: 'ch3-s2', chapter: 3, title: '방해의 파도', component: Chapter3Scene2 },
  { id: 'ch3-s3', chapter: 3, title: '어제의 당신', component: Chapter3Scene3 },
  { id: 'ch3-s4', chapter: 3, title: '도피의 유혹', component: Chapter3Scene4 },

  // Chapter 4: 퇴근 후 반성
  { id: 'ch4-s1', chapter: 4, title: '오늘의 성적표', component: Chapter4Scene1 },
  { id: 'ch4-s2', chapter: 4, title: '돈과 시간의 투자', component: Chapter4Scene2 },
  { id: 'ch4-s3', chapter: 4, title: '만약의 제안', component: Chapter4Scene3 },
  { id: 'ch4-s4', chapter: 4, title: '베타 테스터 모집', component: Chapter4Scene4 },
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
  };

  const handleNext = (updates: Partial<SurveyData>) => {
    console.log('[App] handleNext 호출됨', { currentSceneIndex, updates });

    setSurveyData(prev => {
      const updated = {
        ...prev,
        ...updates,
        currentScene: currentSceneIndex + 1,
        progress: Math.round(((currentSceneIndex + 1) / SCENES.length) * 100),
        lastUpdated: Date.now()
      };
      console.log('[App] 데이터 업데이트됨', updated);
      return updated;
    });

    setCurrentSceneIndex(prev => {
      const newIndex = prev + 1;
      console.log('[App] 씬 인덱스 변경:', prev, '->', newIndex);
      return newIndex;
    });
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
    console.log('[App] 결과 페이지로 전환', { currentSceneIndex, totalScenes: SCENES.length });
    const completionTime = (Date.now() - surveyData.startTime) / 1000 / 60;
    const updatedData: SurveyData = {
      ...surveyData,
      result: {
        ...surveyData.result,
        completionTime
      }
    };
    console.log('[App] 결과 페이지 데이터:', updatedData);

    return <ResultPage data={updatedData} onRestart={handleRestart} />;
  }

  const SceneComponent = currentScene.component;
  const estimatedTimeLeft = Math.max(0, Math.ceil((SCENES.length - currentSceneIndex) * 1));

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
