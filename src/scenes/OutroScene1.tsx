import { useState } from 'react';
import { SceneProps } from '../types';
import './SceneStyles.css';

// Outro - Q14: 이메일 수집
export const OutroScene1: React.FC<SceneProps> = ({ data, onNext }) => {
  const [email, setEmail] = useState('');
  const [showEmailInput, setShowEmailInput] = useState(false);

  const isValidEmail = (email: string) => {
    return email.length > 0 && email.includes('@') && email.includes('.');
  };

  const handleInterested = () => {
    setShowEmailInput(true);
  };

  const handleSkip = () => {
    onNext({
      betaSignup: {
        ...data.betaSignup,
        skipped: true
      }
    });
  };

  const handleSubmitEmail = () => {
    onNext({
      betaSignup: {
        email: email.trim(),
        skipped: false
      }
    });
  };

  return (
    <div className="scene outro-scene1">
      <div className="scene-content">
        <div className="story-text">
          <h2>🎉 거의 다 왔어요!</h2>
        </div>

        {!showEmailInput ? (
          <>
            <div className="beta-info-card">
              <p className="beta-intro">
                이 앱, <strong>2025년 상반기</strong> 출시 예정입니다.
              </p>

              <div className="beta-benefits">
                <h3>🎁 베타 테스터 혜택</h3>
                <ul className="benefits-list">
                  <li>✨ 3개월 무료 이용권</li>
                  <li>💝 론칭 시 50% 할인</li>
                  <li>🎨 서비스 방향 의견 반영</li>
                </ul>
              </div>

              <p className="beta-cta">
                관심 있으시면 이메일 남겨주세요!
              </p>
            </div>

            <div className="beta-buttons">
              <button className="beta-yes-button" onClick={handleInterested}>
                <span className="beta-button-emoji">🙋</span>
                <span className="beta-button-text">
                  <strong>네, 알려주세요!</strong>
                </span>
              </button>

              <button className="beta-skip-button" onClick={handleSkip}>
                <span className="beta-button-emoji">⏭️</span>
                <span className="beta-button-text">
                  건너뛰기
                </span>
              </button>
            </div>
          </>
        ) : (
          <div className="email-input-panel fade-in">
            <h3>📧 이메일을 남겨주세요</h3>
            <p className="email-note">스팸 메일은 절대 보내지 않아요!</p>

            <div className="text-input-group">
              <input
                type="email"
                className="email-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                autoFocus
              />
            </div>

            {email.length > 0 && !isValidEmail(email) && (
              <p className="error-message">올바른 이메일 주소를 입력해주세요</p>
            )}

            <button
              className="next-button"
              onClick={handleSubmitEmail}
              disabled={!isValidEmail(email)}
            >
              완료 →
            </button>

            <button className="text-button" onClick={handleSkip}>
              나중에 할게요
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
