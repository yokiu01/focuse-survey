import { useState } from 'react';
import { SceneProps } from '../types';
import './SceneStyles.css';

// Outro - Q15: 마지막 한마디 (선택)
export const OutroScene2: React.FC<SceneProps> = ({ onNext }) => {
  const [feedbackText, setFeedbackText] = useState('');

  const handleNext = () => {
    onNext({
      feedback: {
        openText: feedbackText.trim() || undefined
      }
    });
  };

  const handleSkip = () => {
    onNext({});
  };

  return (
    <div className="scene outro-scene2">
      <div className="scene-content">
        <div className="story-text">
          <h2>💬 마지막으로...</h2>
          <p className="scene-description">
            이런 앱이 있으면 좋겠다, 또는<br />
            하고 싶은 말 있으세요?
          </p>
          <p className="optional-note">(선택사항이에요)</p>
        </div>

        <div className="text-input-group">
          <textarea
            className="text-input feedback-textarea"
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            placeholder="예: 캘린더 연동이 되면 좋겠어요, 알림이 너무 많으면 싫어요..."
            rows={4}
          />
        </div>

        <div className="outro-buttons">
          <button className="next-button" onClick={handleNext}>
            완료! 결과 보기 →
          </button>

          {feedbackText.length === 0 && (
            <button className="text-button" onClick={handleSkip}>
              건너뛰고 결과 보기
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
