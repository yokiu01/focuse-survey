import { SceneProps } from '../types';
import './SceneStyles.css';

// Chapter 3 - Q11: 솔루션 제시
export const Chapter3Scene2: React.FC<SceneProps> = ({ onNext }) => {

  const options = [
    { id: 'want_now', emoji: '🤩', title: '당장 쓰고 싶다', subtitle: '언제 나와요?' },
    { id: 'looks_ok', emoji: '🤔', title: '괜찮아 보인다', subtitle: '한번 써볼 수도...' },
    { id: 'unsure', emoji: '😐', title: '글쎄...', subtitle: '잘 모르겠어요' },
    { id: 'not_needed', emoji: '🙅', title: '필요 없다', subtitle: '지금도 괜찮아요' }
  ];

  const handleChoice = (choice: 'want_now' | 'looks_ok' | 'unsure' | 'not_needed') => {
    onNext({
      solution: {
        interest: choice
      }
    });
  };

  return (
    <div className="scene chapter3-scene2">
      <div className="scene-content">
        <div className="story-text">
          <h2>💡 이런 앱이 있다면요?</h2>
        </div>

        {/* 솔루션 설명 카드 */}
        <div className="solution-card">
          <p className="solution-intro">"보고서 작성" 이라고만 입력하면</p>
          <p className="solution-intro">AI가 자동으로:</p>

          <div className="solution-features">
            <div className="feature-item">
              <span className="feature-check">✅</span>
              <span>최적 시간 배정 (월요일 오전 9시)</span>
            </div>
            <div className="feature-item">
              <span className="feature-check">✅</span>
              <span>단계별 분해 (개요 30분 → 본문 1시간)</span>
            </div>
            <div className="feature-item">
              <span className="feature-check">✅</span>
              <span>시작 전 알림 ("지금 집중력 좋아요!")</span>
            </div>
          </div>

          <p className="solution-outro">당신은 <strong>실행만</strong> 하면 됩니다.</p>
        </div>

        <div className="question-divider">
          <span>이런 앱, 어떻게 생각하세요?</span>
        </div>

        <div className="choice-group">
          {options.map((option) => (
            <button
              key={option.id}
              className="choice-button"
              onClick={() => handleChoice(option.id as any)}
            >
              <span className="choice-emoji">{option.emoji}</span>
              <div className="choice-content">
                <div className="choice-title">{option.title}</div>
                <div className="choice-subtitle">{option.subtitle}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
