import { useState } from 'react';
import { SceneProps } from '../types';
import './SceneStyles.css';

// Chapter 1 - Q5: 포기 이유 (조건부: 버린 앱이 있는 경우만)
export const Chapter1Scene4: React.FC<SceneProps> = ({ data, onNext }) => {
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const abandonedApps = data.tools.abandoned || [];

  const reasons = [
    { id: 'complex', text: '너무 복잡함', insight: '단순함 강조' },
    { id: 'too_many_features', text: '기능이 너무 많음', insight: '미니멀 설계' },
    { id: 'manual_planning', text: '결국 내가 다 계획해야 해서', insight: '핵심 PMF' },
    { id: 'annoying_alerts', text: '알림이 짜증남', insight: '맥락 알림' },
    { id: 'stopped_using', text: '그냥 안 쓰게 됨', insight: '습관화 실패' }
  ];

  // 버린 앱이 없으면 바로 다음으로
  if (abandonedApps.includes('none') || abandonedApps.length === 0) {
    return (
      <div className="scene chapter1-scene4">
        <div className="scene-content">
          <div className="story-text">
            <h2>😇 포기한 앱이 없으시군요!</h2>
            <p className="scene-description">
              한 번 쓰면 계속 쓰시는 타입이네요
            </p>
          </div>
          <button className="next-button" onClick={() => onNext({})}>
            다음 →
          </button>
        </div>
      </div>
    );
  }

  const toggleReason = (reasonId: string) => {
    if (selectedReasons.includes(reasonId)) {
      setSelectedReasons(selectedReasons.filter(id => id !== reasonId));
    } else {
      setSelectedReasons([...selectedReasons, reasonId]);
    }
  };

  const handleNext = () => {
    onNext({
      tools: {
        ...data.tools,
        abandonReasons: selectedReasons
      }
    });
  };

  return (
    <div className="scene chapter1-scene4">
      <div className="scene-content">
        <div className="story-text">
          <h2>🤔 왜 포기하셨어요?</h2>
          <p className="scene-description">
            여러 개 선택 가능해요
          </p>
        </div>

        <div className="reason-checkboxes">
          {reasons.map((reason) => (
            <label
              key={reason.id}
              className={`reason-checkbox-label ${selectedReasons.includes(reason.id) ? 'checked' : ''}`}
            >
              <input
                type="checkbox"
                checked={selectedReasons.includes(reason.id)}
                onChange={() => toggleReason(reason.id)}
              />
              <span>{reason.text}</span>
            </label>
          ))}
        </div>

        <button
          className="next-button"
          onClick={handleNext}
          disabled={selectedReasons.length === 0}
        >
          다음 →
        </button>
      </div>
    </div>
  );
};
