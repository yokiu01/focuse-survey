import { useState } from 'react';
import { SceneProps } from '../types';
import './SceneStyles.css';

// Chapter 3 - Scene 2: 방해의 파도
export const Chapter3Scene2: React.FC<SceneProps> = ({ data, onNext }) => {
  const [phoneCheckCount, setPhoneCheckCount] = useState(10);
  const [showResponse, setShowResponse] = useState(false);
  const [selectedResponse, setSelectedResponse] = useState<string | null>(null);

  const responses = [
    {
      id: 'ignore_all',
      emoji: '🚫',
      title: '다 무시합니다',
      subtitle: '집중 모드 ON',
      feedback: '의지력 갑! 하지만 힘들죠? 😅'
    },
    {
      id: 'check_kakao',
      emoji: '💬',
      title: '카톡만 확인해요',
      subtitle: '급한 거 있을까봐...',
      feedback: '그렇게 급한 건 거의 없는데 말이죠 😅'
    },
    {
      id: 'check_all',
      emoji: '📱',
      title: '일단 다 봅니다',
      subtitle: 'SNS도 슥슥...',
      feedback: '30분이 3분처럼 사라지죠 🙃'
    },
    {
      id: 'escape',
      emoji: '🏃',
      title: '아예 핸드폰 멀리 둡니다',
      subtitle: '보지도 않을 거예요!',
      feedback: '그런데 가서 가져오게 되죠... 😂'
    }
  ];

  const handlePhoneCountNext = () => {
    setShowResponse(true);
  };

  const handleResponseSelect = (responseId: string) => {
    setSelectedResponse(responseId);
  };

  const handleNext = () => {
    onNext({
      chapter3: {
        ...data.chapter3,
        phoneCheckCount,
        interruptionResponse: selectedResponse as any
      }
    });
  };

  const getPhoneCheckEmoji = () => {
    if (phoneCheckCount >= 30) return '📱💥';
    if (phoneCheckCount >= 15) return '📱😰';
    if (phoneCheckCount >= 5) return '📱😐';
    return '📱😌';
  };

  const getPhoneCheckComment = () => {
    if (phoneCheckCount >= 30) return '와... 그게 가능해요? 😱';
    if (phoneCheckCount >= 15) return '꽤 자주 보시네요 😅';
    if (phoneCheckCount >= 5) return '평범한 편이네요';
    return '엄청 집중하시는 편이군요! 👏';
  };

  const selectedResponseData = responses.find(r => r.id === selectedResponse);

  return (
    <div className="scene chapter3-scene2">
      <div className="scene-content">
        <div className="story-text">
          <h2>📱 잠깐, 핸드폰 진동이...</h2>
          <p className="scene-description">
            업무 중 핸드폰, 얼마나 자주 보세요?
          </p>
        </div>

        {!showResponse ? (
          <div className="question-panel fade-in">
            <h3>오전부터 지금까지 몇 번?</h3>
            <div className="emotion-slider">
              <div className="emotion-emoji">{getPhoneCheckEmoji()}</div>
              <div className="slider-container">
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={phoneCheckCount}
                  onChange={(e) => setPhoneCheckCount(Number(e.target.value))}
                  className="number-slider"
                />
                <div className="slider-value big">
                  {phoneCheckCount}번
                </div>
                <div className="slider-labels">
                  <span>거의 안 봄</span>
                  <span>보통</span>
                  <span>엄청 많이</span>
                </div>
              </div>
              <p className="completion-comment">{getPhoneCheckComment()}</p>
            </div>

            <button className="next-button" onClick={handlePhoneCountNext}>
              다음 →
            </button>
          </div>
        ) : !selectedResponse ? (
          <div className="fade-in">
            <h3 style={{ textAlign: 'center', marginBottom: 'var(--spacing-xl)' }}>
              알림 오면 어떻게 하세요?
            </h3>
            <div className="choice-group">
              {responses.map((response) => (
                <button
                  key={response.id}
                  className="choice-button"
                  onClick={() => handleResponseSelect(response.id)}
                >
                  <span className="choice-emoji">{response.emoji}</span>
                  <span className="choice-title">{response.title}</span>
                  <span className="choice-subtitle">{response.subtitle}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="feedback-panel fade-in">
            <div className="feedback-icon">{selectedResponseData?.emoji}</div>
            <p className="feedback-text">{selectedResponseData?.feedback}</p>
            <button className="next-button" onClick={handleNext}>
              다음 →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
