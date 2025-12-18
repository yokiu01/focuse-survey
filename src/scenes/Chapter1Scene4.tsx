import { useState } from 'react';
import { SceneProps } from '../types';
import './SceneStyles.css';

// Chapter 1 - Scene 4: 출근길 발견
export const Chapter1Scene4: React.FC<SceneProps> = ({ data, onNext }) => {
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);
  const [customActivity, setCustomActivity] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);

  const activities = [
    {
      id: 'sns',
      emoji: '📱',
      title: 'SNS/유튜브',
      subtitle: '잠깐만... (2시간 경과)',
      feedback: '30분이 3분처럼 느껴지죠? 🙃'
    },
    {
      id: 'news',
      emoji: '📰',
      title: '뉴스/기사 읽기',
      subtitle: '세상 돌아가는 거 알아야지',
      feedback: '정보 수집! 하지만 다 기억은 안 나죠 📰'
    },
    {
      id: 'music',
      emoji: '🎵',
      title: '음악 들으며 명상',
      subtitle: '마음의 평화를...',
      feedback: '힐링 타임! 오늘은 괜찮을 것 같아요 🎵'
    },
    {
      id: 'study',
      emoji: '📚',
      title: '공부하기',
      subtitle: '자기계발은 필수!',
      feedback: '대단해요! 출근길도 허투루 쓰지 않으시네요 📚'
    },
    {
      id: 'game',
      emoji: '🎮',
      title: '게임하기',
      subtitle: '한 판만... 한 판만...',
      feedback: '잠깐의 여유! 재충전 시간이죠 🎮'
    },
    {
      id: 'planning',
      emoji: '📝',
      title: '오늘 할 일 다시 점검',
      subtitle: '계획은 완벽하게!',
      feedback: '계획왕! 하지만 실천은...? 😅'
    },
    {
      id: 'sleep',
      emoji: '😴',
      title: '졸기...',
      subtitle: '어제 또 늦게 잤지',
      feedback: '피곤하죠... 오늘 하루가 걱정되네요 😴'
    },
    {
      id: 'custom',
      emoji: '✏️',
      title: '직접 입력하기',
      subtitle: '다른 활동을 하시나요?',
      feedback: ''
    }
  ];

  const handleChoice = (activityId: string) => {
    setSelectedActivity(activityId);
    if (activityId !== 'custom') {
      setShowFeedback(true);
    }
  };

  const handleNext = () => {
    const finalActivity = selectedActivity === 'custom' && customActivity.trim()
      ? customActivity.trim()
      : selectedActivity;

    onNext({
      chapter1: {
        ...data.chapter1,
        commuteActivity: finalActivity as any
      }
    });
  };

  const selectedActivityData = activities.find(a => a.id === selectedActivity);
  const canProceed = selectedActivity !== 'custom' || customActivity.trim().length > 0;

  return (
    <div className="scene chapter1-scene4">
      <div className="scene-content">
        {/* 스토리 */}
        <div className="story-text">
          <h2>🚇 출근길 지하철</h2>
          <p className="scene-description">
            당신이 출근길에 보통 뭘 하나요?
          </p>
        </div>

        {/* 활동 카드 */}
        <div className="activity-grid">
          {activities.map((activity) => (
            <button
              key={activity.id}
              className={`activity-card ${selectedActivity === activity.id ? 'selected' : ''}`}
              onClick={() => handleChoice(activity.id)}
              disabled={selectedActivity !== null}
            >
              <div className="activity-emoji">{activity.emoji}</div>
              <div className="activity-title">{activity.title}</div>
              <div className="activity-subtitle">{activity.subtitle}</div>
            </button>
          ))}
        </div>

        {/* 직접 입력 */}
        {selectedActivity === 'custom' && !showFeedback && (
          <div className="custom-input-panel fade-in">
            <h3>어떤 활동을 하시나요?</h3>
            <div className="text-input-group">
              <input
                type="text"
                className="text-input"
                value={customActivity}
                onChange={(e) => setCustomActivity(e.target.value)}
                placeholder="예: 책 읽기, 명상하기, 멍때리기..."
                autoFocus
              />
            </div>
            <button
              className="next-button"
              onClick={() => setShowFeedback(true)}
              disabled={!canProceed}
            >
              다음 →
            </button>
          </div>
        )}

        {/* 피드백 메시지 */}
        {showFeedback && selectedActivityData && selectedActivity !== 'custom' && (
          <div className="feedback-panel fade-in">
            <div className="feedback-icon">{selectedActivityData.emoji}</div>
            <p className="feedback-text">{selectedActivityData.feedback}</p>
            <button className="next-button" onClick={handleNext}>
              다음 → (Chapter 2 시작)
            </button>
          </div>
        )}

        {/* 커스텀 피드백 */}
        {showFeedback && selectedActivity === 'custom' && customActivity.trim() && (
          <div className="feedback-panel fade-in">
            <div className="feedback-icon">✨</div>
            <p className="feedback-text">
              "{customActivity}" - 나만의 루틴이 있으시군요! 👍
            </p>
            <button className="next-button" onClick={handleNext}>
              다음 → (Chapter 2 시작)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
