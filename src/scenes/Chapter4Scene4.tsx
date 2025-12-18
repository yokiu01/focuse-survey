import { useState } from 'react';
import { SceneProps } from '../types';
import './SceneStyles.css';

// Chapter 4 - Scene 4: 베타 테스터 모집
export const Chapter4Scene4: React.FC<SceneProps> = ({ data, onNext }) => {
  const [interested, setInterested] = useState<boolean | null>(null);
  const [email, setEmail] = useState('');
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [notInterestReason, setNotInterestReason] = useState('');

  const handleInterestYes = () => {
    setInterested(true);
    setShowEmailInput(true);
  };

  const handleInterestNo = () => {
    setInterested(false);
    setShowEmailInput(true);
  };

  const handleNotifyLater = () => {
    onNext({
      betaSignup: {
        ...data.betaSignup,
        interested: true,
        notifyLater: true
      }
    });
  };

  const handleNext = () => {
    console.log('[Chapter4Scene4] handleNext 호출됨', { interested, email, notInterestReason });

    const updates: any = {
      betaSignup: {
        interested,
        email: email.trim() || undefined,
        notInterestReason: notInterestReason.trim() || undefined,
        notifyLater: false
      }
    };

    console.log('[Chapter4Scene4] onNext 호출 전', updates);
    onNext(updates);
    console.log('[Chapter4Scene4] onNext 호출 완료');
  };

  const isValidEmail = (email: string) => {
    return email.length > 0 && email.includes('@');
  };

  const canProceed = () => {
    if (interested === true) {
      return isValidEmail(email);
    } else if (interested === false) {
      return notInterestReason.trim().length > 0 || true; // 이유는 선택사항
    }
    return false;
  };

  return (
    <div className="scene chapter4-scene4">
      <div className="scene-content">
        <div className="story-text">
          <h2>🎁 마지막 질문입니다!</h2>
          <p className="scene-description">
            이 서비스를 실제로 만들고 있어요<br />
            베타 테스트에 참여하시겠어요?
          </p>
        </div>

        {!showEmailInput ? (
          <div className="fade-in">
            <div className="beta-benefits">
              <h3>🎉 베타 테스터 혜택</h3>
              <ul className="benefits-list">
                <li>✨ 정식 출시 후 3개월 무료 이용권</li>
                <li>🎨 서비스 개발 방향 의견 반영</li>
                <li>🚀 신기능 우선 체험</li>
                <li>💝 론칭 시 특별 할인 (50% OFF)</li>
              </ul>
            </div>

            <div className="beta-choice-buttons">
              <button className="beta-yes-button" onClick={handleInterestYes}>
                <span className="beta-button-emoji">🙋</span>
                <span className="beta-button-text">
                  <strong>네, 참여할게요!</strong>
                  <small>이메일 남기기</small>
                </span>
              </button>

              <button className="beta-later-button" onClick={handleNotifyLater}>
                <span className="beta-button-emoji">⏰</span>
                <span className="beta-button-text">
                  <strong>나중에 알려주세요</strong>
                  <small>이메일 안 남김</small>
                </span>
              </button>

              <button className="beta-no-button" onClick={handleInterestNo}>
                <span className="beta-button-emoji">🙅</span>
                <span className="beta-button-text">
                  <strong>관심 없어요</strong>
                  <small>이유 알려주기</small>
                </span>
              </button>
            </div>
          </div>
        ) : interested ? (
          <div className="email-signup-panel fade-in">
            <h3>🎉 감사합니다!</h3>
            <p className="scene-description">
              베타 테스트 시작 시 연락드릴게요<br />
              <small>스팸 메일은 절대 보내지 않습니다</small>
            </p>

            <div className="text-input-group">
              <label htmlFor="email">이메일 주소</label>
              <input
                id="email"
                type="email"
                className="email-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                autoFocus
              />
            </div>

            {!isValidEmail(email) && email.length > 0 && (
              <p className="error-message">올바른 이메일 주소를 입력해주세요</p>
            )}

            <button
              className="next-button"
              onClick={handleNext}
              disabled={!canProceed()}
            >
              완료! 결과 보기 →
            </button>
          </div>
        ) : (
          <div className="not-interested-panel fade-in">
            <h3>😢 아쉽지만 괜찮아요</h3>
            <p className="scene-description">
              혹시 이유를 알려주실 수 있나요?<br />
              <small>(선택사항입니다)</small>
            </p>

            <div className="text-input-group">
              <textarea
                className="text-input"
                rows={3}
                value={notInterestReason}
                onChange={(e) => setNotInterestReason(e.target.value)}
                placeholder="예: 비슷한 서비스를 이미 쓰고 있어요"
                style={{ resize: 'vertical' }}
              />
            </div>

            <button
              className="next-button"
              onClick={handleNext}
            >
              완료! 결과 보기 →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
