import './PrivacyConsent.css';

interface PrivacyConsentProps {
  onAccept: () => void;
}

export const PrivacyConsent: React.FC<PrivacyConsentProps> = ({ onAccept }) => {
  return (
    <div className="privacy-consent">
      <div className="consent-container">
        {/* Step 1: 핵심 메시지 + CTA (첫 화면) */}
        <div className="hero-section">
          <h1 className="hero-title">
            매일 "오늘도 못했다"고<br />
            자책하시나요?
          </h1>
          <p className="hero-subtitle">
            5분만 이야기 나눠주세요.<br />
            당신의 경험이 더 나은 도구를 만듭니다.
          </p>

          <div className="reward-badge">
            🎁 스타벅스 기프티콘 추첨 (1월 15일 마감)
          </div>

          <div className="welcome-section">
            <h2 className="welcome-title">이런 분 환영</h2>
            <ul className="welcome-list">
              <li>ADHD 진단/의심자</li>
              <li>할 일 관리 어려운 분</li>
              <li>솔직한 이야기 가능한 분</li>
            </ul>
          </div>

          <button className="btn-primary" onClick={onAccept}>
            참여하기
          </button>
        </div>

        {/* Step 2: FAQ (스크롤, 선택) */}
        <div className="faq-section">
          <h3 className="faq-title">자주 묻는 질문</h3>

          <details className="faq-item">
            <summary>개인정보는 어떻게 되나요?</summary>
            <p>
              모든 답변은 익명 처리됩니다.<br />
              연구 목적으로만 사용되며, 마케팅 용도로 사용되지 않습니다.
            </p>
          </details>

          <details className="faq-item">
            <summary>어떤 질문이 나오나요?</summary>
            <p>
              당신의 일상, 어려움, 시도했던 것들에 대한 질문입니다.<br />
              정답이 없으니 편하게 답변해주세요.
            </p>
          </details>

          <details className="faq-item">
            <summary>왜 이 설문을 하나요?</summary>
            <p>
              저도 ADHD로 매일 자책하며 살았습니다.<br />
              같은 어려움을 겪는 분들을 위한 앱을 만들기 위해<br />
              진짜 경험을 듣고 싶습니다.
            </p>
          </details>

          <details className="faq-item">
            <summary>기프티콘은 어떻게 받나요?</summary>
            <p>
              설문 완료 후 이메일을 남겨주시면<br />
              추첨을 통해 10명에게 스타벅스 아메리카노를 보내드립니다.
            </p>
          </details>
        </div>

        {/* 문의처 */}
        <div className="contact-section">
          <p>
            문의: <a href="mailto:dlgusdn06@naver.com">dlgusdn06@naver.com</a>
          </p>
        </div>
      </div>
    </div>
  );
};
