import { useState } from 'react';
import { SceneProps } from '../types';
import './SceneStyles.css';

// Chapter 4 - Scene 1: 오늘의 성적표
export const Chapter4Scene1: React.FC<SceneProps> = ({ data, onNext }) => {
  const [frustrationFrequency, setFrustrationFrequency] = useState<string | null>(null);
  const [showCoping, setShowCoping] = useState(false);
  const [copingStrategy, setCopingStrategy] = useState<string | null>(null);

  const frequencies = [
    {
      id: 'daily',
      emoji: '😭',
      title: '매일',
      subtitle: '하루도 빠짐없이...'
    },
    {
      id: 'weekly_3_4',
      emoji: '😰',
      title: '일주일에 3-4번',
      subtitle: '거의 매일이나 다름없죠'
    },
    {
      id: 'weekly_1_2',
      emoji: '😐',
      title: '일주일에 1-2번',
      subtitle: '가끔 그래요'
    },
    {
      id: 'rarely',
      emoji: '😊',
      title: '거의 없어요',
      subtitle: '운이 좋은 편이네요'
    }
  ];

  const copingStrategies = [
    {
      id: 'self_blame',
      emoji: '😔',
      title: '내 탓을 합니다',
      subtitle: '"나는 왜 이럴까..."'
    },
    {
      id: 'overtime',
      emoji: '🌙',
      title: '야근으로 때웁니다',
      subtitle: '오늘 못한 건 밤에...'
    },
    {
      id: 'give_up',
      emoji: '🤷',
      title: '포기하고 넘깁니다',
      subtitle: '내일 하면 되지 뭐'
    },
    {
      id: 'hope_tomorrow',
      emoji: '🌅',
      title: '내일은 다를 거라 믿습니다',
      subtitle: '내일의 나는 달라!'
    }
  ];

  const handleFrequencySelect = (freqId: string) => {
    setFrustrationFrequency(freqId);
    setTimeout(() => {
      setShowCoping(true);
    }, 500);
  };

  const handleCopingSelect = (copingId: string) => {
    setCopingStrategy(copingId);
  };

  const handleNext = () => {
    onNext({
      chapter4: {
        ...data.chapter4,
        frustrationFrequency: frustrationFrequency as any,
        copingStrategy: copingStrategy as any
      }
    });
  };

  return (
    <div className="scene chapter4-scene1">
      <div className="scene-content">
        <div className="story-text">
          <h2>🌆 퇴근 시간</h2>
          <p className="scene-description">
            "오늘도 계획대로 안 됐네..."<br />
            이런 좌절감, 얼마나 자주 느끼세요?
          </p>
        </div>

        {!showCoping ? (
          <div className="choice-group">
            {frequencies.map((freq) => (
              <button
                key={freq.id}
                className={`choice-button ${frustrationFrequency === freq.id ? 'selected' : ''}`}
                onClick={() => handleFrequencySelect(freq.id)}
                disabled={frustrationFrequency !== null}
              >
                <span className="choice-emoji">{freq.emoji}</span>
                <span className="choice-title">{freq.title}</span>
                <span className="choice-subtitle">{freq.subtitle}</span>
              </button>
            ))}
          </div>
        ) : !copingStrategy ? (
          <div className="fade-in">
            <h3 style={{ textAlign: 'center', marginBottom: 'var(--spacing-xl)' }}>
              그럴 때 어떻게 하세요?
            </h3>
            <div className="choice-group">
              {copingStrategies.map((coping) => (
                <button
                  key={coping.id}
                  className="choice-button"
                  onClick={() => handleCopingSelect(coping.id)}
                >
                  <span className="choice-emoji">{coping.emoji}</span>
                  <span className="choice-title">{coping.title}</span>
                  <span className="choice-subtitle">{coping.subtitle}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="feedback-panel fade-in">
            <p className="feedback-text">
              {copingStrategy === 'self_blame' && '자책하지 마세요. 당신만 그런 게 아니에요 💙'}
              {copingStrategy === 'overtime' && '야근도 방법이지만... 더 나은 방법이 있을 거예요 🌙'}
              {copingStrategy === 'give_up' && '때로는 내려놓는 것도 필요하죠 🤷'}
              {copingStrategy === 'hope_tomorrow' && '내일은 정말 다를지도 몰라요! 🌅'}
            </p>
            <button className="next-button" onClick={handleNext}>
              다음 →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
