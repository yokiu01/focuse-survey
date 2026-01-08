import { useState } from 'react';
import { SceneProps } from '../types';
import './SceneStyles.css';

// Chapter 1 - Q6: 현재 지출
export const Chapter1Scene5: React.FC<SceneProps> = ({ onNext }) => {
  const [spending, setSpending] = useState<string | null>(null);

  const options = [
    { id: '0', label: '0원 (다 무료)', emoji: '🆓' },
    { id: '~5000', label: '~5,000원/월', emoji: '💵' },
    { id: '~10000', label: '~10,000원/월', emoji: '💳' },
    { id: '15000+', label: '15,000원+/월', emoji: '💰' }
  ];

  const handleSelect = (value: string) => {
    setSpending(value);
  };

  const handleNext = () => {
    onNext({
      spending: {
        current: spending as '0' | '~5000' | '~10000' | '15000+'
      }
    });
  };

  return (
    <div className="scene chapter1-scene5">
      <div className="scene-content">
        <div className="story-text">
          <h2>💰 지금 생산성/집중력 도구에</h2>
          <h2>실제로 쓰는 돈은?</h2>
          <p className="scene-description">
            한 달 기준이에요
          </p>
        </div>

        <div className="choice-group">
          {options.map((option) => (
            <button
              key={option.id}
              className={`choice-button ${spending === option.id ? 'selected' : ''}`}
              onClick={() => handleSelect(option.id)}
            >
              <span className="choice-emoji">{option.emoji}</span>
              <div className="choice-content">
                <div className="choice-title">{option.label}</div>
              </div>
            </button>
          ))}
        </div>

        <button
          className="next-button"
          onClick={handleNext}
          disabled={spending === null}
        >
          다음 → (Chapter 2 시작)
        </button>
      </div>
    </div>
  );
};
