import { useState } from 'react';
import { SceneProps } from '../types';
import './SceneStyles.css';

// Chapter 4 - Scene 3: 만약의 제안
export const Chapter4Scene3: React.FC<SceneProps> = ({ data, onNext }) => {
  const [valueDescription, setValueDescription] = useState('');
  const [showPricing, setShowPricing] = useState(false);
  const [willingToPay, setWillingToPay] = useState(15000);
  const [priceOpinion, setPriceOpinion] = useState<string | null>(null);
  const [customPrice, setCustomPrice] = useState(0);

  const handleValueNext = () => {
    setShowPricing(true);
  };

  const handlePriceOpinion = (opinion: string) => {
    setPriceOpinion(opinion);
  };

  const handleNext = () => {
    const updates: any = {
      chapter4: {
        ...data.chapter4,
        valueDescription: valueDescription.trim() || undefined,
        willingToPay,
        priceOpinion: priceOpinion as any
      }
    };

    if (priceOpinion === 'custom' && customPrice > 0) {
      updates.chapter4.customPrice = customPrice;
    }

    onNext(updates);
  };

  const getPriceComment = () => {
    if (willingToPay === 0) return '무료를 선호하시는군요';
    if (willingToPay < 10000) return '합리적인 가격대네요';
    if (willingToPay < 20000) return '꽤 투자 의향이 있으시네요';
    if (willingToPay < 35000) return '높은 가치를 느끼시는군요!';
    return '와... 정말 필요하신가봐요! 😱';
  };

  return (
    <div className="scene chapter4-scene3">
      <div className="scene-content">
        <div className="story-text">
          <h2>💡 만약에 말이죠...</h2>
          <p className="scene-description">
            AI가 당신의 할 일을 파악하고<br />
            우선순위를 자동으로 정해준다면?
          </p>
        </div>

        {!showPricing ? (
          <div className="question-panel fade-in">
            <h3>이런 서비스가 있다면 어떤 가치가 있을까요?</h3>
            <p className="scene-description" style={{ marginTop: 'var(--spacing-md)' }}>
              <small>선택사항입니다. 스킵하셔도 돼요!</small>
            </p>

            <div className="text-input-group">
              <textarea
                className="text-input"
                rows={4}
                value={valueDescription}
                onChange={(e) => setValueDescription(e.target.value)}
                placeholder="예: 매일 아침 뭘 먼저 할지 고민하는 시간을 줄여줄 것 같아요"
                style={{ resize: 'vertical', minHeight: '100px' }}
              />
            </div>

            <button className="next-button" onClick={handleValueNext}>
              다음 →
            </button>
          </div>
        ) : !priceOpinion ? (
          <div className="question-panel fade-in">
            <h3>한 달에 얼마까지 낼 수 있으세요?</h3>

            <div className="emotion-slider">
              <div className="slider-container">
                <input
                  type="range"
                  min="0"
                  max="50000"
                  step="5000"
                  value={willingToPay}
                  onChange={(e) => setWillingToPay(Number(e.target.value))}
                  className="money-slider"
                />
                <div className="slider-value big">
                  {willingToPay.toLocaleString()}원/월
                </div>
                <div className="slider-labels">
                  <span>무료만</span>
                  <span>적정가</span>
                  <span>비싸도 OK</span>
                </div>
              </div>
              <p className="completion-comment">{getPriceComment()}</p>
            </div>

            <div style={{ marginTop: 'var(--spacing-2xl)' }}>
              <h3>만약 이 서비스가 월 15,000원이라면?</h3>
              <div className="price-opinion-buttons">
                <button
                  className="price-opinion-button"
                  onClick={() => handlePriceOpinion('ok')}
                >
                  <span>👍</span>
                  <span>괜찮은 가격이네요</span>
                </button>
                <button
                  className="price-opinion-button"
                  onClick={() => handlePriceOpinion('expensive')}
                >
                  <span>😰</span>
                  <span>좀 비싼데요?</span>
                </button>
                <button
                  className="price-opinion-button"
                  onClick={() => handlePriceOpinion('too_cheap')}
                >
                  <span>🤔</span>
                  <span>너무 싼데 괜찮나?</span>
                </button>
                <button
                  className="price-opinion-button"
                  onClick={() => handlePriceOpinion('custom')}
                >
                  <span>💰</span>
                  <span>다른 가격 제안하기</span>
                </button>
              </div>
            </div>
          </div>
        ) : priceOpinion === 'custom' ? (
          <div className="question-panel fade-in">
            <h3>적정 가격이 얼마라고 생각하세요?</h3>
            <div className="input-row" style={{ justifyContent: 'center', marginTop: 'var(--spacing-xl)' }}>
              <input
                type="number"
                min="0"
                step="1000"
                value={customPrice}
                onChange={(e) => setCustomPrice(Math.max(0, Number(e.target.value)))}
                className="money-input"
                placeholder="0"
                style={{ width: '150px', fontSize: '1.25rem' }}
              />
              <span style={{ fontSize: '1.25rem', fontWeight: '600' }}>원/월</span>
            </div>

            <button
              className="next-button"
              onClick={handleNext}
              disabled={customPrice === 0}
            >
              다음 →
            </button>
          </div>
        ) : (
          <div className="feedback-panel fade-in">
            <p className="feedback-text">
              {priceOpinion === 'ok' && '감사합니다! 좋은 가격대를 찾았네요 👍'}
              {priceOpinion === 'expensive' && '의견 감사합니다. 가격을 재고해볼게요 💭'}
              {priceOpinion === 'too_cheap' && '품질에 자신 있습니다! 걱정 마세요 😊'}
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
