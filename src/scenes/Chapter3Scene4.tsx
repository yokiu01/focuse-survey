import { useState } from 'react';
import { SceneProps } from '../types';
import './SceneStyles.css';

// Chapter 3 - Q13: 가격 탐색 (조건부: too_expensive 선택 시)
export const Chapter3Scene4: React.FC<SceneProps> = ({ data, onNext }) => {
  const [willingToPay, setWillingToPay] = useState(2000);
  const priceReaction = data.pricing.reaction4900;

  // too_expensive가 아니면 바로 다음으로
  if (priceReaction !== 'too_expensive') {
    return (
      <div className="scene chapter3-scene4">
        <div className="scene-content">
          <div className="story-text">
            {priceReaction === 'will_pay' && (
              <>
                <h2>🎉 감사합니다!</h2>
                <p className="scene-description">
                  좋은 가격대를 찾은 것 같아요
                </p>
              </>
            )}
            {priceReaction === 'only_free' && (
              <>
                <h2>💭 무료를 선호하시는군요</h2>
                <p className="scene-description">
                  무료 버전도 고려해볼게요!
                </p>
              </>
            )}
            {priceReaction === 'no_interest' && (
              <>
                <h2>😊 괜찮아요!</h2>
                <p className="scene-description">
                  솔직한 의견 감사합니다
                </p>
              </>
            )}
          </div>
          <button className="next-button" onClick={() => onNext({})}>
            다음 →
          </button>
        </div>
      </div>
    );
  }

  const handleNext = () => {
    onNext({
      pricing: {
        ...data.pricing,
        willingToPay
      }
    });
  };

  const getPriceComment = () => {
    if (willingToPay === 0) return '무료만 원하시는군요';
    if (willingToPay <= 2000) return '아주 저렴한 가격이네요';
    if (willingToPay <= 4000) return '합리적인 가격대네요';
    return '괜찮은 가격이에요!';
  };

  return (
    <div className="scene chapter3-scene4">
      <div className="scene-content">
        <div className="story-text">
          <h2>💸 그럼 얼마면 쓸 것 같으세요?</h2>
        </div>

        <div className="question-panel">
          <div className="slider-container">
            <div className="slider-value big">
              {willingToPay.toLocaleString()}원/월
            </div>
            <input
              type="range"
              min="0"
              max="10000"
              step="1000"
              value={willingToPay}
              onChange={(e) => setWillingToPay(Number(e.target.value))}
              className="money-slider"
            />
            <div className="slider-labels">
              <span>0원<br />무료만</span>
              <span>5,000원<br />중간</span>
              <span>10,000원<br />좀 비쌈</span>
            </div>
          </div>

          <p className="completion-comment">{getPriceComment()}</p>

          <button className="next-button" onClick={handleNext}>
            다음 →
          </button>
        </div>
      </div>
    </div>
  );
};
