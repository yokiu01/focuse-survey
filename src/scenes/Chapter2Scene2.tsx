import { SceneProps } from '../types';
import './SceneStyles.css';

// Chapter 2 - Q8: 실패 빈도
export const Chapter2Scene2: React.FC<SceneProps> = ({ data, onNext }) => {

  const options = [
    { id: 'daily', emoji: '😭', title: '거의 매일 (5-7일)', subtitle: '하루도 빠짐없이...' },
    { id: 'often', emoji: '😰', title: '자주 (3-4일)', subtitle: '거의 매일이나 다름없죠' },
    { id: 'sometimes', emoji: '😐', title: '가끔 (1-2일)', subtitle: '그래도 괜찮은 편' },
    { id: 'rarely', emoji: '😊', title: '거의 없음', subtitle: '운이 좋은 편이네요' }
  ];

  const handleChoice = (choice: 'daily' | 'often' | 'sometimes' | 'rarely') => {
    onNext({
      execution: {
        ...data.execution,
        failFrequency: choice
      }
    });
  };

  return (
    <div className="scene chapter2-scene2">
      <div className="scene-content">
        <div className="story-text">
          <h2>📅 "오늘도 계획대로 안 됐네..."</h2>
          <p className="scene-description">
            이런 날, 일주일에 며칠이에요?
          </p>
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
