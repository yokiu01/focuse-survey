import { useState } from 'react';
import './PrivacyConsent.css';

interface PrivacyConsentProps {
  onAccept: () => void;
}

export const PrivacyConsent: React.FC<PrivacyConsentProps> = ({ onAccept }) => {
  const [showThinking, setShowThinking] = useState(false);

  const handleThinking = () => {
    setShowThinking(true);
  };

  return (
    <div className="privacy-consent">
      <div className="consent-container">
        <div className="consent-header">
          <h1 className="consent-title">당신의 이야기를 들려주세요 💙</h1>
          <p className="consent-subtitle">게임형 인터뷰에 어서오세요!</p>
        </div>

        <div className="consent-content">
          {/* 공감대 형성 */}
          <section className="empathy-section">
            <p className="personal-story">
              저는<br />
              매일 "오늘도 아무것도 못했다"는 자책감과 싸우며 살아왔습니다.<br />
              매번 집중력을 잃고 일을 미루는 나를 구할 방법을 찾다가, 결국 직접 앱을 만들기로 결심했습니다.
            </p>

            <p className="struggle-story">
              할 일은 산더미인데 어디서부터 시작해야 할지 모르겠고,<br />
              타이머 켜봐야 5분도 못 버티고 포기하고,<br />
              저녁이 되면 "나는 왜 이럴까..." 자책하던 날들.
            </p>

            <p className="question-story">혹시 당신도 그런가요?</p>
          </section>

          <div className="divider"></div>

          {/* 안전감 제공 */}
          <section className="safety-section">
            <p className="not-sales">
              <strong>이 인터뷰는 제품 판매가 아닙니다.</strong>
            </p>

            <p className="genuine-interest">
              당신의 진짜 경험을 듣고 싶습니다.<br />
              - 지금 어떻게 버티고 계신지<br />
              - 무엇이 가장 힘든지<br />
              - 어떤 시도를 해보셨는지
            </p>

            <p className="honest-welcome">
              솔직한 이야기가 가장 큰 도움이 됩니다.<br />
              "안 쓸 것 같아요"라는 답변도 완벽히 괜찮아요.
            </p>
          </section>

          <div className="divider"></div>

          {/* 인터뷰 정보 */}
          <section className="info-section">
            <h3>📋 인터뷰 정보:</h3>
            <ul className="info-list">
              <li>소요 시간: 약 <strong>15분</strong></li>
              <li>사례: <strong>스타벅스 아메리카노 기프티콘</strong> 💝<br />
                <span className="sub-info">(선착순 10명)</span>
              </li>
            </ul>

            <h3>🔒 개인정보 보호:</h3>
            <ul className="info-list">
              <li>모든 답변은 <strong>익명 처리</strong>됩니다</li>
              <li>연구 목적으로만 사용됩니다</li>
              <li>마케팅 용도로 사용되지 않습니다</li>
            </ul>
          </section>

          <div className="divider"></div>

          {/* 참여 대상 */}
          <section className="target-section">
            <h3>✅ 이런 분을 찾습니다:</h3>
            <ul className="target-list">
              <li><span className="checkbox">☑</span> ADHD 진단받으셨거나 의심되시는 분</li>
              <li><span className="checkbox">☑</span> 20-40대 직장인 또는 학생</li>
              <li><span className="checkbox">☑</span> 할 일 관리에 어려움을 느끼시는 분</li>
              <li><span className="checkbox">☑</span> 솔직한 이야기 나눠주실 수 있는 분</li>
            </ul>
          </section>

          <div className="divider"></div>

          {/* CTA */}
          <section className="cta-section">
            <p className="cta-question">참여해주시겠어요?</p>
            <p className="cta-impact">
              당신의 15분이<br />
              수천 명의 ADHD를 가진 사람들에게<br />
              더 나은 하루를 선물할 수 있습니다.
            </p>

            {!showThinking ? (
              <div className="cta-buttons">
                <button className="btn-accept" onClick={onAccept}>
                  네, 참여할게요
                </button>
                <button className="btn-thinking" onClick={handleThinking}>
                  조금 더 생각해볼게요
                </button>
              </div>
            ) : (
              <div className="thinking-panel fade-in">
                <p className="thinking-message">
                  괜찮아요! 천천히 생각하세요 😊<br />
                  준비되시면 언제든 시작하실 수 있어요.
                </p>
                <button className="btn-accept-later" onClick={onAccept}>
                  지금 시작할게요
                </button>
              </div>
            )}
          </section>

          <div className="divider"></div>

          {/* 문의처 */}
          <section className="contact-section">
            <p className="contact-title">💌 문의:</p>
            <p className="contact-info">
              이현우 | <a href="mailto:dlgusdn06@naver.com">dlgusdn06@naver.com</a><br />
              카카오톡: dlgusdn06
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
