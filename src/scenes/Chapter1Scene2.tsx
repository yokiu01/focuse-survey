import { useState } from 'react';
import { SceneProps } from '../types';
import './SceneStyles.css';

// Chapter 1 - Scene 2: 할 일 목록을 마주하다
export const Chapter1Scene2: React.FC<SceneProps> = ({ data, onNext }) => {
  const [todoCount, setTodoCount] = useState(10);
  const [showReaction, setShowReaction] = useState(false);

  const getReaction = (count: number) => {
    if (count <= 5) return { emoji: '😊', text: '오, 미니멀리스트시군요!' };
    if (count <= 20) return { emoji: '😐', text: '대부분 사람들이 이 정도예요' };
    return { emoji: '😰', text: '어... 이거 진짜 다 하실 건가요?' };
  };

  const handleNext = () => {
    onNext({
      chapter1: {
        ...data.chapter1,
        todoCount
      }
    });
  };

  const reaction = getReaction(todoCount);

  return (
    <div className="scene chapter1-scene2">
      <div className="scene-content">
        {/* 스토리 */}
        <div className="story-text">
          <h2>📱 당신의 할 일 목록을 엽니다</h2>
          <p className="scene-description">
            얼마나 많은 할 일이 쌓여 있나요?
          </p>
        </div>

        {/* 슬라이더 영역 */}
        <div className="question-panel">
          <div className="slider-interaction">
            {showReaction && (
              <div className="reaction-bubble fade-in">
                <span className="reaction-emoji">{reaction.emoji}</span>
                <p className="reaction-text">{reaction.text}</p>
              </div>
            )}

            <div className="slider-container">
              <div className="slider-value big">{todoCount}개</div>
              <input
                type="range"
                min="0"
                max="50"
                value={todoCount}
                onChange={(e) => {
                  setTodoCount(Number(e.target.value));
                  setShowReaction(true);
                }}
                className="number-slider"
              />
              <div className="slider-labels">
                <span>0개<br />📭 비어있음</span>
                <span>25개<br />📫 보통</span>
                <span>50개+<br />📬 폭발 직전</span>
              </div>
            </div>
          </div>

          <button
            className="next-button"
            onClick={handleNext}
            disabled={!showReaction}
          >
            다음 →
          </button>
        </div>
      </div>
    </div>
  );
};
