import { useState } from 'react';
import { SceneProps } from '../types';
import './SceneStyles.css';

// Chapter 3 - Scene 3: 어제의 당신
export const Chapter3Scene3: React.FC<SceneProps> = ({ data, onNext }) => {
  const [yesterdayCompleted, setYesterdayCompleted] = useState(5);
  const [yesterdayPlanned, setYesterdayPlanned] = useState(10);
  const [showReasons, setShowReasons] = useState(false);
  const [failureReasons, setFailureReasons] = useState<string[]>([]);

  const reasons = [
    '계획을 너무 많이 세웠어요',
    '예상보다 시간이 더 걸렸어요',
    '중간에 급한 일이 생겼어요',
    '집중이 안 됐어요',
    '미루다가 못했어요',
    '그냥... 하기 싫었어요'
  ];

  const handleTasksNext = () => {
    const completionRate = yesterdayPlanned > 0 ? (yesterdayCompleted / yesterdayPlanned) * 100 : 100;
    if (completionRate < 100) {
      setShowReasons(true);
    } else {
      // 100% 완료했으면 이유 물어보지 않고 바로 다음
      handleNext();
    }
  };

  const toggleReason = (reason: string) => {
    if (failureReasons.includes(reason)) {
      setFailureReasons(failureReasons.filter(r => r !== reason));
    } else {
      setFailureReasons([...failureReasons, reason]);
    }
  };

  const handleNext = () => {
    onNext({
      chapter3: {
        ...data.chapter3,
        yesterdayCompleted,
        yesterdayPlanned,
        failureReasons: failureReasons.length > 0 ? failureReasons : undefined
      }
    });
  };

  const completionRate = yesterdayPlanned > 0 ? (yesterdayCompleted / yesterdayPlanned) * 100 : 100;

  const getCompletionEmoji = () => {
    if (completionRate >= 100) return '🎉';
    if (completionRate >= 70) return '😊';
    if (completionRate >= 40) return '😐';
    return '😰';
  };

  const getCompletionComment = () => {
    if (completionRate >= 100) return '완벽! 오늘도 이대로만!';
    if (completionRate >= 70) return '꽤 괜찮은데요? 👍';
    if (completionRate >= 40) return '흠... 반타작이네요';
    return '많이 남겼군요 😅';
  };

  return (
    <div className="scene chapter3-scene3">
      <div className="scene-content">
        <div className="story-text">
          <h2>⏮️ 잠깐, 어제는 어땠어요?</h2>
          <p className="scene-description">
            어제 계획한 일들... 얼마나 했나요?
          </p>
        </div>

        {!showReasons ? (
          <div className="question-panel fade-in">
            <h3>어제의 성과표</h3>

            <div className="task-count-inputs">
              <div className="input-row">
                <label>완료한 일:</label>
                <input
                  type="number"
                  min="0"
                  max="50"
                  value={yesterdayCompleted}
                  onChange={(e) => setYesterdayCompleted(Math.max(0, Number(e.target.value)))}
                  className="text-input"
                  style={{ width: '100px' }}
                />
                <span>개</span>
              </div>

              <div className="input-row">
                <label>계획한 일:</label>
                <input
                  type="number"
                  min="0"
                  max="50"
                  value={yesterdayPlanned}
                  onChange={(e) => setYesterdayPlanned(Math.max(1, Number(e.target.value)))}
                  className="text-input"
                  style={{ width: '100px' }}
                />
                <span>개</span>
              </div>
            </div>

            <div className="completion-rate">
              <div className="completion-emoji">{getCompletionEmoji()}</div>
              <div className="completion-percentage">
                {completionRate.toFixed(0)}% 완료
              </div>
              <p className="completion-comment">{getCompletionComment()}</p>
            </div>

            <button className="next-button" onClick={handleTasksNext}>
              다음 →
            </button>
          </div>
        ) : (
          <div className="follow-up-panel fade-in">
            <h3>왜 못 했을까요? 🤔</h3>
            <p className="scene-description">
              솔직하게 말해주세요 (여러 개 선택 가능)
            </p>

            <div className="reason-checkboxes">
              {reasons.map(reason => (
                <label key={reason} className="reason-checkbox-label">
                  <input
                    type="checkbox"
                    checked={failureReasons.includes(reason)}
                    onChange={() => toggleReason(reason)}
                  />
                  <span>{reason}</span>
                </label>
              ))}
            </div>

            <button
              className="next-button"
              onClick={handleNext}
              disabled={failureReasons.length === 0}
            >
              다음 →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
