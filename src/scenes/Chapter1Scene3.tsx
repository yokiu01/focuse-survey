import { useState } from 'react';
import { SceneProps } from '../types';
import './SceneStyles.css';

// Chapter 1 - Scene 3: 우선순위의 지옥
export const Chapter1Scene3: React.FC<SceneProps> = ({ data, onNext }) => {
  const [startTime] = useState(Date.now());
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);

  const tasks = [
    {
      id: 'report',
      emoji: '📊',
      title: '긴급: 오늘 오전 보고서 마감',
      subtitle: '제일 급하니까...',
      urgent: true
    },
    {
      id: 'planning',
      emoji: '⏰',
      title: '중요: 기획안 3페이지 남음',
      subtitle: '이게 더 중요한데...',
      important: true
    },
    {
      id: 'email',
      emoji: '📧',
      title: '급한 이메일 5개',
      subtitle: '이것부터 처리하고...',
      urgent: true
    }
  ];

  const handleChoice = (choice: 'report' | 'planning' | 'email' | 'random' | 'youtube') => {
    const decisionTime = (Date.now() - startTime) / 1000;

    setSelectedChoice(choice);

    // 짧은 피드백 딜레이 후 다음으로
    setTimeout(() => {
      onNext({
        chapter1: {
          ...data.chapter1,
          priorityDecision: choice,
          priorityDecisionTime: decisionTime
        }
      });
    }, 800);
  };

  return (
    <div className="scene chapter1-scene3">
      <div className="scene-content">
        {/* 스토리 */}
        <div className="story-text">
          <h2>🤔 우선순위의 지옥</h2>
          <p className="scene-description">
            출근하기 전 30분 남았습니다.<br />
            오늘 가장 먼저 할 일을 골라야 합니다.
          </p>
        </div>

        {/* 할 일 카드들 */}
        <div className="task-cards">
          {tasks.map((task) => (
            <button
              key={task.id}
              className={`task-card-button ${selectedChoice === task.id ? 'selected' : ''}`}
              onClick={() => handleChoice(task.id as any)}
              disabled={selectedChoice !== null}
            >
              <span className="task-emoji">{task.emoji}</span>
              <div className="task-info">
                <div className="task-title">{task.title}</div>
                <div className="task-subtitle">{task.subtitle}</div>
              </div>
              {task.urgent && <span className="task-badge urgent">긴급</span>}
              {task.important && <span className="task-badge important">중요</span>}
            </button>
          ))}
        </div>

        {/* 추가 선택지 */}
        <div className="extra-choices">
          <button
            className={`choice-button-small ${selectedChoice === 'random' ? 'selected' : ''}`}
            onClick={() => handleChoice('random')}
            disabled={selectedChoice !== null}
          >
            <span className="choice-emoji">🎲</span>
            <span className="choice-text">그냥 아무거나!</span>
          </button>

          <button
            className={`choice-button-small ${selectedChoice === 'youtube' ? 'selected' : ''}`}
            onClick={() => handleChoice('youtube')}
            disabled={selectedChoice !== null}
          >
            <span className="choice-emoji">😱</span>
            <span className="choice-text">너무 많아... 일단 유튜브</span>
          </button>
        </div>

        {selectedChoice && (
          <div className="feedback-message fade-in">
            {selectedChoice === 'youtube' && '솔직하시네요! 저도 그래요... 😅'}
            {selectedChoice === 'random' && '선택이 너무 어려울 때 있죠... 🎲'}
            {selectedChoice === 'report' && '급한 불부터 끄는 스타일! 🔥'}
            {selectedChoice === 'planning' && '중요한 걸 먼저! 하지만 끝낼 수 있을까요? 🤔'}
            {selectedChoice === 'email' && '이메일부터... 그리고 2시간이 지났습니다 😭'}
          </div>
        )}
      </div>
    </div>
  );
};
