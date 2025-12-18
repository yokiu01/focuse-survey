import { SceneProps } from '../types';
import './SceneStyles.css';

// Chapter 1 - Scene 1: 알람이 울린다
export const Chapter1Scene1: React.FC<SceneProps> = ({ data, onNext }) => {
  const handleChoice = (choice: 'snooze_3times' | 'wake_immediately' | 'snooze_alarm' | 'check_sns') => {
    onNext({
      chapter1: {
        ...data.chapter1,
        morningRoutine: choice
      }
    });
  };

  return (
    <div className="scene chapter1-scene1">
      <div className="scene-content">
        {/* 시간 표시 */}
        <div className="time-display">
          <h1 className="time">07:30 AM</h1>
          <p className="day">월요일 아침</p>
        </div>

        {/* 스토리 */}
        <div className="story-text">
          <h2>🌅 알람이 울립니다</h2>
          <p className="scene-description">
            스마트폰 알람이 울립니다.<br />
            오늘도 해야 할 일이 산더미...
          </p>
        </div>

        {/* 선택지 */}
        <div className="choice-group">
          <button
            className="choice-button"
            onClick={() => handleChoice('snooze_alarm')}
          >
            <span className="choice-emoji">😴</span>
            <div className="choice-content">
              <div className="choice-title">알람 끄고 5분만 더 눕기</div>
              <div className="choice-subtitle">(진짜로 5분일 리 없지만...)</div>
            </div>
          </button>

          <button
            className="choice-button"
            onClick={() => handleChoice('wake_immediately')}
          >
            <span className="choice-emoji">💪</span>
            <div className="choice-content">
              <div className="choice-title">바로 일어나서 할 일 목록 확인</div>
              <div className="choice-subtitle">오늘은 달라질 거야!</div>
            </div>
          </button>

          <button
            className="choice-button"
            onClick={() => handleChoice('snooze_3times')}
          >
            <span className="choice-emoji">⏰</span>
            <div className="choice-content">
              <div className="choice-title">알람 미루기 버튼 3번 누르기</div>
              <div className="choice-subtitle">딱 3번만... 정말로...</div>
            </div>
          </button>

          <button
            className="choice-button"
            onClick={() => handleChoice('check_sns')}
          >
            <span className="choice-emoji">📱</span>
            <div className="choice-content">
              <div className="choice-title">핸드폰 집어들고 SNS부터 확인</div>
              <div className="choice-subtitle">잠깐만... (30분 경과)</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
