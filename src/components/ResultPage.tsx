import { useState, useEffect } from 'react';
import { SurveyData, UserTypeResult } from '../types';
import { analyzeUserType, getRecommendations } from '../utils/typeAnalyzer';
import { submitToGoogleSheets, calculateDataCompleteness, calculateTrustScore } from '../utils/googleSheets';
import './ResultPage.css';

interface ResultPageProps {
  data: SurveyData;
  onRestart: () => void;
}

export const ResultPage: React.FC<ResultPageProps> = ({ data, onRestart }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [result, setResult] = useState<UserTypeResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    console.log('[ResultPage] 컴포넌트 마운트됨');
    console.log('[ResultPage] data 받음:', data);

    try {
      const analysisResult = analyzeUserType(data);
      console.log('[ResultPage] 분석 완료:', analysisResult);
      setResult(analysisResult);
    } catch (err) {
      console.error('[ResultPage] 분석 에러:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    }
  }, [data]);

  // Google Sheets로 데이터 전송 (한 번만 실행)
  useEffect(() => {
    if (result && !submitted) {
      console.log('[ResultPage] Google Sheets 전송 시작');

      const submitData = async () => {
        try {
          // 신뢰도 점수와 데이터 완성도 계산
          const trustScore = calculateTrustScore(data);
          const dataCompleteness = calculateDataCompleteness(data);

          console.log('[ResultPage] 메타데이터 계산 완료:', { trustScore, dataCompleteness });

          const enrichedData: SurveyData = {
            ...data,
            trustScore,
            dataCompleteness
          };

          const response = await submitToGoogleSheets(enrichedData);

          if (response.success) {
            console.log('[ResultPage] ✅ Google Sheets 전송 성공');
            setSubmitted(true);
          } else {
            console.error('[ResultPage] ❌ Google Sheets 전송 실패:', response.error);
          }
        } catch (err) {
          console.error('[ResultPage] Google Sheets 전송 중 예외 발생:', err);
        }
      };

      submitData();
    }
  }, [result, data, submitted]);

  if (error) {
    return (
      <div className="result-page">
        <div className="result-container">
          <div className="error-message">
            <h2>😕 오류가 발생했습니다</h2>
            <p>{error}</p>
            <button className="next-button" onClick={onRestart}>
              처음부터 다시 시작
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="result-page">
        <div className="result-container">
          <div className="loading-message">
            <h2>⏳ 결과를 분석 중...</h2>
          </div>
        </div>
      </div>
    );
  }

  const recommendations = getRecommendations(result.type);
  const completionTime = data.result?.completionTime ||
    (Date.now() - data.startTime) / 1000 / 60; // 분 단위

  return (
    <div className="result-page">
      <div className="result-container">
        {/* 헤더 */}
        <div className="result-header">
          <div className="result-emoji-large">{result.emoji}</div>
          <h1 className="result-title">당신의 타입은...</h1>
          <h2 className="result-type-name">{result.title}</h2>
          <div className="result-percentage">
            전체 응답자의 <strong>{result.percentage}%</strong>가 같은 타입이에요
          </div>
        </div>

        {/* 설명 */}
        <div className="result-description-card">
          <p className="result-description">{result.description}</p>
        </div>

        {/* 특징 */}
        <div className="result-section">
          <h3 className="section-title">✨ 당신의 특징</h3>
          <ul className="characteristics-list">
            {result.characteristics.map((char, index) => (
              <li key={index} className="characteristic-item">
                {char}
              </li>
            ))}
          </ul>
        </div>

        {/* 고민 */}
        <div className="result-section pain-section">
          <h3 className="section-title">😰 이런 게 힘들죠?</h3>
          <div className="pain-card">
            <p>{result.pain}</p>
          </div>
        </div>

        {/* 추천사항 */}
        <div className="result-section">
          <h3 className="section-title">💡 이렇게 해보세요</h3>
          <ul className="recommendations-list">
            {recommendations.map((rec, index) => (
              <li key={index} className="recommendation-item">
                {rec}
              </li>
            ))}
          </ul>
        </div>

        {/* 상세 정보 토글 */}
        <button
          className="detail-toggle-button"
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? '상세 분석 닫기 ▲' : '상세 분석 보기 ▼'}
        </button>

        {showDetails && (
          <div className="detail-section fade-in">
            <div className="detail-card">
              <h4>🛠️ 현재 도구 사용 패턴</h4>
              <p>{result.currentTool}</p>
            </div>

            <div className="detail-card">
              <h4>💰 지출 패턴</h4>
              <p>{result.spending}</p>
            </div>

            <div className="detail-card">
              <h4>⏱️ 설문 완료 시간</h4>
              <p>{completionTime.toFixed(1)}분</p>
            </div>

            {data.behavioral.backButtonClicks > 0 && (
              <div className="detail-card">
                <h4>🔙 뒤로가기 클릭</h4>
                <p>{data.behavioral.backButtonClicks}번</p>
              </div>
            )}
          </div>
        )}

        {/* 베타 신청 감사 메시지 */}
        {data.betaSignup?.email && !data.betaSignup?.skipped && (
          <div className="beta-thank-you">
            <h2 className="thank-you-title">진심으로 감사드립니다 🙏</h2>
            <div className="thank-you-divider"></div>

            <p className="thank-you-message">
              당신의 솔직한 이야기가<br />
              Focus Days를 만드는 가장 큰 힘이 됩니다.
            </p>

            <p className="thank-you-message">
              오늘 들려주신 경험 하나하나가<br />
              같은 어려움을 겪는 누군가에게<br />
              더 나은 내일을 선물할 것입니다.
            </p>

            <div className="reward-section">
              <h3 className="reward-title">📮 사례비 지급 안내</h3>
              <div className="reward-content">
                <p className="reward-item">
                  <span className="reward-check">✅</span>
                  선착순 10명: <strong>스타벅스 아메리카노 기프티콘</strong>(100% 지급)
                </p>
                <p className="reward-delivery">
                  → 인터뷰 완료 24시간 내 발송
                </p>
                {data.betaSignup.email && (
                  <p className="reward-email">
                    📧 발송 주소: <strong>{data.betaSignup.email}</strong>
                  </p>
                )}
              </div>
            </div>

            <div className="thank-you-footer">
              <p>
                당신이 들려주신 이야기는<br />
                저에게도, 이 프로젝트에도<br />
                큰 의미가 됩니다. 🙏
              </p>
            </div>
          </div>
        )}

        {/* 제안 CTA */}
        {(!data.betaSignup?.email || data.betaSignup?.skipped) && (
          <div className="final-cta">
            <h3>🚀 이런 서비스를 만들고 있어요</h3>
            <p>
              AI가 당신의 할 일을 분석하고<br />
              우선순위를 자동으로 정리해주는 서비스
            </p>
            <p className="launch-info">
              2026년 상반기 출시 예정
            </p>
            {data.pricing?.willingToPay !== undefined && data.pricing.willingToPay > 0 && (
              <p className="pricing-reminder">
                월 {data.pricing.willingToPay.toLocaleString()}원 정도면 괜찮다고 하셨죠? 😊
              </p>
            )}
            <div className="cta-buttons">
              <button className="cta-primary" onClick={() => {
                window.location.href = 'mailto:your@email.com?subject=베타 테스트 신청';
              }}>
                🙋 지금이라도 신청하기
              </button>
            </div>
          </div>
        )}

        {/* 공유 & 재시작 */}
        <div className="action-buttons">
          <button className="share-button" onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: 'ADHD 직장인 타입 테스트',
                text: `나는 "${result.title}" 타입! 당신은?`,
                url: window.location.href
              });
            } else {
              alert('공유 기능은 모바일에서 사용 가능합니다');
            }
          }}>
            📤 결과 공유하기
          </button>

          <button className="restart-button" onClick={onRestart}>
            🔄 처음부터 다시 하기
          </button>
        </div>

        {/* 푸터 */}
        <div className="result-footer">
          <p>
            이 설문은 정확한 진단이 아닌 재미와 인사이트를 위한 것입니다.<br />
            전문적인 도움이 필요하다면 전문가와 상담하세요.
          </p>
        </div>
      </div>
    </div>
  );
};
