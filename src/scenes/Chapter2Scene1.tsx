import { useState } from 'react';
import { SceneProps } from '../types';
import './SceneStyles.css';

// Chapter 2 - Q7: 어제의 실행률
export const Chapter2Scene1: React.FC<SceneProps> = ({ onNext }) => {
  const [executionRate, setExecutionRate] = useState(50);
  const [showFeedback, setShowFeedback] = useState(false);

  const getFeedback = (rate: number) => {
    if (rate <= 30) return { emoji: '😢', text: '많이 힘드셨겠네요...' };
    if (rate <= 60) return { emoji: '😐', text: '절반 정도... 흔한 일이에요' };
    return { emoji: '🎉', text: '오, 대단하신데요!' };
  };

  const handleSliderChange = (value: number) => {
    setExecutionRate(value);
    setShowFeedback(true);
  };

  const handleNext = () => {
    onNext({
      execution: {
        yesterday: executionRate
      }
    });
  };

  const feedback = getFeedback(executionRate);

  return (
    <div className="scene chapter2-scene1">
      <div className="scene-content">
        <div className="story-text">
          <h2>📊 어제 계획한 일 중</h2>
          <h2>실제로 얼마나 했어요?</h2>
        </div>

        <div className="question-panel">
          <div className="slider-interaction">
            {showFeedback && (
              <div className="reaction-bubble fade-in">
                <span className="reaction-emoji">{feedback.emoji}</span>
                <p className="reaction-text">{feedback.text}</p>
              </div>
            )}

            <div className="slider-container">
              <div className="slider-value big">{executionRate}%</div>
              <input
                type="range"
                min="0"
                max="100"
                value={executionRate}
                onChange={(e) => handleSliderChange(Number(e.target.value))}
                className="number-slider"
              />
              <div className="slider-labels">
                <span>0%<br />거의 못함</span>
                <span>50%<br />반반</span>
                <span>100%<br />다 함!</span>
              </div>
            </div>
          </div>

          <button
            className="next-button"
            onClick={handleNext}
          >
            다음 →
          </button>
        </div>
      </div>
    </div>
  );
};
