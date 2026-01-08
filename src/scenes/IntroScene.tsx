import { SceneProps } from '../types';
import './SceneStyles.css';

// Intro: Q1 - 아침 루틴 (몰입 유도)
export const IntroScene: React.FC<SceneProps> = ({ onNext }) => {
  const handleChoice = (choice: 'snooze' | 'wake_plan' | 'sns' | 'stay_bed') => {
    onNext({
      intro: {
        morningRoutine: choice
      }
    });
  };

  return (
    <div className="scene intro-scene">
      <div className="scene-content">
        <div className="time-display">
          <h1 className="time">07:30 AM</h1>
          <p className="day">월요일 아침</p>
        </div>

        <div className="story-text">
          <h2>알람이 울립니다</h2>
          <p className="scene-description">
            어떻게 하시나요?
          </p>
        </div>

        <div className="choice-group">
          <button
            className="choice-button"
            onClick={() => handleChoice('snooze')}
          >
            <span className="choice-emoji">😴</span>
            <div className="choice-content">
              <div className="choice-title">알람 끄고 5분만 더...</div>
              <div className="choice-subtitle">(진짜로 5분일 리 없지만)</div>
            </div>
          </button>

          <button
            className="choice-button"
            onClick={() => handleChoice('wake_plan')}
          >
            <span className="choice-emoji">💪</span>
            <div className="choice-content">
              <div className="choice-title">바로 일어나서 오늘 할 일 확인</div>
              <div className="choice-subtitle">오늘은 달라질 거야!</div>
            </div>
          </button>

          <button
            className="choice-button"
            onClick={() => handleChoice('sns')}
          >
            <span className="choice-emoji">📱</span>
            <div className="choice-content">
              <div className="choice-title">핸드폰 들고 SNS부터</div>
              <div className="choice-subtitle">잠깐만... (30분 경과)</div>
            </div>
          </button>

          <button
            className="choice-button"
            onClick={() => handleChoice('stay_bed')}
          >
            <span className="choice-emoji">🛏️</span>
            <div className="choice-content">
              <div className="choice-title">그냥 계속 눕기</div>
              <div className="choice-subtitle">일어나기 싫어...</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
