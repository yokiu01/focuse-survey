import { SceneProps } from '../types';
import './SceneStyles.css';

// Chapter 3 - Q12: 가격 검증 (핵심)
export const Chapter3Scene3: React.FC<SceneProps> = ({ data, onNext }) => {

  const options = [
    { id: 'will_pay', emoji: '👍', title: '쓸 것 같다', subtitle: '합리적인 가격이네요' },
    { id: 'only_free', emoji: '🆓', title: '무료면 쓰겠다', subtitle: '돈 내기는 좀...' },
    { id: 'too_expensive', emoji: '💸', title: '가격이 좀...', subtitle: '더 저렴하면 좋겠어요' },
    { id: 'no_interest', emoji: '🙅', title: '관심 없다', subtitle: '필요 없어요' }
  ];

  const handleChoice = (choice: 'will_pay' | 'only_free' | 'too_expensive' | 'no_interest') => {
    onNext({
      pricing: {
        ...data.pricing,
        reaction4900: choice
      }
    });
  };

  return (
    <div className="scene chapter3-scene3">
      <div className="scene-content">
        <div className="story-text">
          <h2>💰 이 앱이</h2>
          <h2 className="price-highlight">월 4,900원</h2>
          <h2>이라면?</h2>
        </div>

        <div className="choice-group">
          {options.map((option) => (
            <button
              key={option.id}
              className="choice-button"
              onClick={() => handleChoice(option.id as any)}
            >
              <span className="choice-emoji">{option.emoji}</span>
              <div className="choice-content">
                <div className="choice-title">{option.title}</div>
                <div className="choice-subtitle">{option.subtitle}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
