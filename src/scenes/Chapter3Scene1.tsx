import { useState } from 'react';
import { SceneProps } from '../types';
import './SceneStyles.css';

// Chapter 3 - Scene 1: 오후 2시의 위기
export const Chapter3Scene1: React.FC<SceneProps> = ({ data, onNext }) => {
  const [completedTasks, setCompletedTasks] = useState(3);
  const [totalTasks, setTotalTasks] = useState(10);
  const [energyLevel, setEnergyLevel] = useState(50);
  const [anxietyLevel, setAnxietyLevel] = useState(50);
  const [showEnergySlider, setShowEnergySlider] = useState(false);
  const [showAnxietySlider, setShowAnxietySlider] = useState(false);

  const handleTaskCountNext = () => {
    setShowEnergySlider(true);
  };

  const handleEnergyNext = () => {
    setShowAnxietySlider(true);
  };

  const handleNext = () => {
    onNext({
      chapter3: {
        ...data.chapter3,
        completedTasks,
        totalTasks,
        energyLevel,
        anxietyLevel
      }
    });
  };

  const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const getCompletionEmoji = () => {
    if (completionRate >= 80) return '🎉';
    if (completionRate >= 50) return '😊';
    if (completionRate >= 30) return '😐';
    return '😰';
  };

  const getEnergyEmoji = () => {
    if (energyLevel >= 80) return '⚡';
    if (energyLevel >= 50) return '😊';
    if (energyLevel >= 30) return '😴';
    return '💀';
  };

  const getAnxietyEmoji = () => {
    if (anxietyLevel >= 80) return '😱';
    if (anxietyLevel >= 50) return '😰';
    if (anxietyLevel >= 30) return '😐';
    return '😌';
  };

  return (
    <div className="scene chapter3-scene1">
      <div className="scene-content">
        <div className="story-text">
          <h2>⏰ 오후 2시, 현재 상황 체크</h2>
          <p className="scene-description">
            점심 먹고 돌아왔습니다<br />
            지금 어떤 상태신가요?
          </p>
        </div>

        {/* 1단계: 할 일 체크 */}
        {!showEnergySlider && (
          <div className="question-panel fade-in">
            <h3>오늘 할 일, 얼마나 했어요?</h3>

            <div className="task-count-inputs">
              <div className="input-row">
                <label>완료한 일:</label>
                <input
                  type="number"
                  min="0"
                  max="50"
                  value={completedTasks}
                  onChange={(e) => setCompletedTasks(Math.max(0, Number(e.target.value)))}
                  className="text-input"
                  style={{ width: '100px' }}
                />
                <span>개</span>
              </div>

              <div className="input-row">
                <label>총 할 일:</label>
                <input
                  type="number"
                  min="0"
                  max="50"
                  value={totalTasks}
                  onChange={(e) => setTotalTasks(Math.max(1, Number(e.target.value)))}
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
              {completionRate < 30 && (
                <p className="completion-comment">아직 시간 있어요... 있죠? 😅</p>
              )}
              {completionRate >= 30 && completionRate < 70 && (
                <p className="completion-comment">나쁘지 않은데요? 계속 가봅시다!</p>
              )}
              {completionRate >= 70 && (
                <p className="completion-comment">오 오늘 잘하시네요! 👏</p>
              )}
            </div>

            <button className="next-button" onClick={handleTaskCountNext}>
              다음 →
            </button>
          </div>
        )}

        {/* 2단계: 에너지 체크 */}
        {showEnergySlider && !showAnxietySlider && (
          <div className="question-panel fade-in">
            <h3>지금 에너지 레벨은?</h3>
            <div className="emotion-slider">
              <div className="emotion-emoji">{getEnergyEmoji()}</div>
              <div className="slider-container">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={energyLevel}
                  onChange={(e) => setEnergyLevel(Number(e.target.value))}
                />
                <div className="slider-value">{energyLevel}%</div>
                <div className="slider-labels">
                  <span>죽음</span>
                  <span>보통</span>
                  <span>완전 깨어남</span>
                </div>
              </div>
            </div>

            <button className="next-button" onClick={handleEnergyNext}>
              다음 →
            </button>
          </div>
        )}

        {/* 3단계: 불안 체크 */}
        {showAnxietySlider && (
          <div className="question-panel fade-in">
            <h3>불안/초조함 정도는?</h3>
            <div className="emotion-slider">
              <div className="emotion-emoji">{getAnxietyEmoji()}</div>
              <div className="slider-container">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={anxietyLevel}
                  onChange={(e) => setAnxietyLevel(Number(e.target.value))}
                  className="anxiety-slider"
                />
                <div className="slider-value">{anxietyLevel}%</div>
                <div className="slider-labels">
                  <span>여유로움</span>
                  <span>조금 불안</span>
                  <span>패닉</span>
                </div>
              </div>
            </div>

            <button className="next-button" onClick={handleNext}>
              다음 →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
