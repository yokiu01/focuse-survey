import { SceneProps } from '../types';
import './SceneStyles.css';

// Chapter 3 - Q10: 가장 힘든 순간 (페인포인트)
export const Chapter3Scene1: React.FC<SceneProps> = ({ onNext }) => {

  const painPoints = [
    { id: 'organizing', emoji: '📝', title: '할 일 정리하는 것 자체', subtitle: '뭘 해야 하는지 정리가 안 돼요' },
    { id: 'prioritizing', emoji: '🎯', title: '우선순위 정하기', subtitle: '뭐가 먼저인지 모르겠어요' },
    { id: 'planning', emoji: '📅', title: '계획 세우기 (언제, 얼마나)', subtitle: '시간 배분이 어려워요' },
    { id: 'starting', emoji: '🚀', title: '실행 시작하기', subtitle: '시작이 반이라는데...' },
    { id: 'focusing', emoji: '🧠', title: '끝까지 집중하기', subtitle: '중간에 딴생각이...' }
  ];

  const handleChoice = (choice: 'organizing' | 'prioritizing' | 'planning' | 'starting' | 'focusing') => {
    onNext({
      painPoint: {
        main: choice
      }
    });
  };

  return (
    <div className="scene chapter3-scene1">
      <div className="scene-content">
        <div className="story-text">
          <h2>😤 할 일 관리에서</h2>
          <h2>제일 짜증나는 순간은?</h2>
          <p className="scene-description">
            하나만 선택해주세요
          </p>
        </div>

        <div className="choice-group">
          {painPoints.map((point) => (
            <button
              key={point.id}
              className="choice-button"
              onClick={() => handleChoice(point.id as any)}
            >
              <span className="choice-emoji">{point.emoji}</span>
              <div className="choice-content">
                <div className="choice-title">{point.title}</div>
                <div className="choice-subtitle">{point.subtitle}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
