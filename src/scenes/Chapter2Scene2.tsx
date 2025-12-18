import { useState } from 'react';
import { SceneProps } from '../types';
import './SceneStyles.css';

// Chapter 2 - Scene 2: 유료 결제의 진실
export const Chapter2Scene2: React.FC<SceneProps> = ({ data, onNext }) => {
  const [paidTools, setPaidTools] = useState<Record<string, number>>({});
  const [showReasons, setShowReasons] = useState(false);
  const [paymentReasons, setPaymentReasons] = useState<string[]>([]);

  const currentTools = data.chapter2.currentTools || [];
  const popularTools = ['notion', 'todoist', 'trello'];
  const toolsWithPrice = currentTools.filter(tool => popularTools.includes(tool));

  const setPriceForTool = (toolId: string, price: number) => {
    setPaidTools({
      ...paidTools,
      [toolId]: price
    });
  };

  const toggleReason = (reason: string) => {
    if (paymentReasons.includes(reason)) {
      setPaymentReasons(paymentReasons.filter(r => r !== reason));
    } else {
      setPaymentReasons([...paymentReasons, reason]);
    }
  };

  const hasPaidTools = Object.values(paidTools).some(price => price > 0);
  const allToolsAnswered = toolsWithPrice.every(tool => paidTools[tool] !== undefined);

  const handleNext = () => {
    onNext({
      chapter2: {
        ...data.chapter2,
        paidTools,
        paymentReasons: hasPaidTools ? paymentReasons : undefined
      }
    });
  };

  return (
    <div className="scene chapter2-scene2">
      <div className="scene-content">
        <div className="story-text">
          <h2>💳 잠깐, 질문 하나만요!</h2>
          <p className="scene-description">
            방금 선택한 앱 중에...<br />
            돈 내고 쓰는 거 있어요?
          </p>
        </div>

        {toolsWithPrice.length > 0 ? (
          <>
            <div className="price-questions">
              {toolsWithPrice.map((toolId) => {
                const toolNames: Record<string, string> = {
                  notion: 'Notion',
                  todoist: 'Todoist',
                  trello: 'Trello'
                };

                return (
                  <div key={toolId} className="price-question">
                    <h3>{toolNames[toolId]}</h3>
                    <div className="price-buttons">
                      <button
                        className={`price-button ${paidTools[toolId] === 0 ? 'selected' : ''}`}
                        onClick={() => setPriceForTool(toolId, 0)}
                      >
                        무료
                      </button>
                      <button
                        className={`price-button ${paidTools[toolId] === 5000 ? 'selected' : ''}`}
                        onClick={() => setPriceForTool(toolId, 5000)}
                      >
                        5,000원/월
                      </button>
                      <button
                        className={`price-button ${paidTools[toolId] === 10000 ? 'selected' : ''}`}
                        onClick={() => setPriceForTool(toolId, 10000)}
                      >
                        10,000원/월
                      </button>
                      <button
                        className={`price-button ${paidTools[toolId] === 15000 ? 'selected' : ''}`}
                        onClick={() => setPriceForTool(toolId, 15000)}
                      >
                        15,000원+/월
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {!allToolsAnswered && (
              <div className="info-message fade-in" style={{ marginTop: 'var(--spacing-lg)', textAlign: 'center' }}>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9375rem' }}>
                  모든 앱에 대해 선택해주세요 (무료도 선택해주세요!)
                </p>
              </div>
            )}

            {allToolsAnswered && hasPaidTools && !showReasons && (
              <div className="fade-in" style={{ marginTop: '20px' }}>
                <button
                  className="next-button"
                  onClick={() => setShowReasons(true)}
                >
                  다음 →
                </button>
              </div>
            )}

            {hasPaidTools && showReasons && (
              <div className="reasons-panel fade-in">
                <h3>왜 돈 내기로 하셨어요?</h3>
                <div className="reason-checkboxes">
                  {['기능 제한 때문에', '광고 없애려고', '진짜 도움돼서', '그냥... 써보려고'].map(reason => (
                    <label key={reason} className="reason-checkbox-label">
                      <input
                        type="checkbox"
                        checked={paymentReasons.includes(reason)}
                        onChange={() => toggleReason(reason)}
                      />
                      <span>{reason}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {allToolsAnswered && (showReasons || !hasPaidTools) && (
              <button
                className="next-button"
                onClick={handleNext}
                disabled={hasPaidTools && paymentReasons.length === 0}
              >
                다음 →
              </button>
            )}
          </>
        ) : (
          <div className="no-tools-message">
            <p>유료 결제 가능한 앱을 선택하지 않으셨네요!</p>
            <button className="next-button" onClick={handleNext}>
              다음 →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
