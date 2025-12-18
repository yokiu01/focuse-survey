import { useState } from 'react';
import { SceneProps } from '../types';
import './SceneStyles.css';

// Chapter 2 - Scene 4: 25분의 저주 (뽀모도로 타이머)
export const Chapter2Scene4: React.FC<SceneProps> = ({ data, onNext }) => {
  const [experience, setExperience] = useState<string | null>(null);
  const [showFollowUp, setShowFollowUp] = useState(false);

  // For "use_now"
  const [frequency, setFrequency] = useState<number>(2);

  // For "tried_quit"
  const [quitTime, setQuitTime] = useState<number>(10);
  const [quitReasons, setQuitReasons] = useState<string[]>([]);

  const experiences = [
    {
      id: 'use_now',
      emoji: '⏰',
      title: '지금도 쓰고 있어요',
      subtitle: '타이머가 없으면 못 살아요'
    },
    {
      id: 'tried_quit',
      emoji: '💔',
      title: '써봤는데 그만뒀어요',
      subtitle: '나랑 안 맞더라고요'
    },
    {
      id: 'heard_not_tried',
      emoji: '🤔',
      title: '들어는 봤는데 안 써봤어요',
      subtitle: '관심은 있어요'
    },
    {
      id: 'never_heard',
      emoji: '❓',
      title: '뽀모도로가 뭔가요?',
      subtitle: '처음 들어봐요'
    }
  ];

  const quitReasonsList = [
    '25분도 못 버티겠어요',
    '타이머 소리가 스트레스예요',
    '타이머 설정하는 게 귀찮아요',
    '휴식 시간에도 일 생각나요',
    '몰입하면 타이머 무시하게 돼요',
    '5분 쉬는 게 오히려 흐름 끊어요'
  ];

  const handleExperienceSelect = (expId: string) => {
    setExperience(expId);
    if (expId === 'heard_not_tried' || expId === 'never_heard') {
      // 시도 안 한 경우 바로 다음으로
      setTimeout(() => {
        onNext({
          chapter2: {
            ...data.chapter2,
            pomodoroExperience: expId as any
          }
        });
      }, 500);
    } else {
      setShowFollowUp(true);
    }
  };

  const toggleQuitReason = (reason: string) => {
    if (quitReasons.includes(reason)) {
      setQuitReasons(quitReasons.filter(r => r !== reason));
    } else {
      setQuitReasons([...quitReasons, reason]);
    }
  };

  const handleNext = () => {
    const updates: any = {
      chapter2: {
        ...data.chapter2,
        pomodoroExperience: experience as any
      }
    };

    if (experience === 'use_now') {
      updates.chapter2.pomodoroFrequency = frequency;
    } else if (experience === 'tried_quit') {
      updates.chapter2.pomodoroQuitTime = quitTime;
      updates.chapter2.pomodoroQuitReasons = quitReasons;
    }

    onNext(updates);
  };

  const canProceed = () => {
    if (experience === 'use_now') return true;
    if (experience === 'tried_quit') return quitReasons.length > 0;
    return false;
  };

  return (
    <div className="scene chapter2-scene4">
      <div className="scene-content">
        <div className="story-text">
          <h2>⏲️ 뽀모도로 타이머, 써보셨어요?</h2>
          <p className="scene-description">
            25분 일하고 5분 쉬는 그거요<br />
            <small>(정직하게 답해주세요!)</small>
          </p>
        </div>

        {!showFollowUp ? (
          <div className="choice-group">
            {experiences.map((exp) => (
              <button
                key={exp.id}
                className={`choice-button ${experience === exp.id ? 'selected' : ''}`}
                onClick={() => handleExperienceSelect(exp.id)}
                disabled={experience !== null}
              >
                <span className="choice-emoji">{exp.emoji}</span>
                <span className="choice-title">{exp.title}</span>
                <span className="choice-subtitle">{exp.subtitle}</span>
              </button>
            ))}
          </div>
        ) : (
          <div className="follow-up-panel fade-in">
            {experience === 'use_now' && (
              <>
                <h3>하루에 몇 번 정도 쓰세요?</h3>
                <div className="slider-container">
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={frequency}
                    onChange={(e) => setFrequency(Number(e.target.value))}
                    className="number-slider"
                  />
                  <div className="slider-value big">
                    {frequency}번
                  </div>
                  <div className="slider-labels">
                    <span>가끔</span>
                    <span>자주</span>
                    <span>항상</span>
                  </div>
                </div>

                <button className="next-button" onClick={handleNext}>
                  다음 → (Chapter 3 시작)
                </button>
              </>
            )}

            {experience === 'tried_quit' && (
              <>
                <h3>얼마나 버티셨어요? 😅</h3>
                <div className="slider-container">
                  <input
                    type="range"
                    min="1"
                    max="30"
                    value={quitTime}
                    onChange={(e) => setQuitTime(Number(e.target.value))}
                    className="number-slider"
                  />
                  <div className="slider-value big">
                    {quitTime}분
                  </div>
                  <div className="slider-labels">
                    <span>바로 포기</span>
                    <span>조금 버팀</span>
                    <span>꽤 버팀</span>
                  </div>
                </div>

                <div style={{ marginTop: 'var(--spacing-2xl)' }}>
                  <h3>왜 그만두셨어요?</h3>
                  <p className="scene-description">
                    솔직히 말씀해주세요 (여러 개 선택 가능)
                  </p>
                  <div className="reason-checkboxes">
                    {quitReasonsList.map(reason => (
                      <label key={reason} className="reason-checkbox-label">
                        <input
                          type="checkbox"
                          checked={quitReasons.includes(reason)}
                          onChange={() => toggleQuitReason(reason)}
                        />
                        <span>{reason}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  className="next-button"
                  onClick={handleNext}
                  disabled={!canProceed()}
                >
                  다음 → (Chapter 3 시작)
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
