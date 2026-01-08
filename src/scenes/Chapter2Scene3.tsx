import { useState } from 'react';
import { SceneProps } from '../types';
import './SceneStyles.css';

// Chapter 2 - Q9: 실패 원인 (조건부: 실패가 있는 경우만)
export const Chapter2Scene3: React.FC<SceneProps> = ({ data, onNext }) => {
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const failFrequency = data.execution.failFrequency;

  const reasons = [
    { id: 'too_many_plans', text: '계획을 너무 많이 세움', insight: '자동 조절 필요' },
    { id: 'dont_know_priority', text: '뭐부터 해야 할지 모르겠음', insight: '우선순위 AI - 핵심' },
    { id: 'took_longer', text: '예상보다 시간이 더 걸림', insight: '시간 예측 AI' },
    { id: 'distracted', text: '중간에 딴짓함', insight: '맥락 알림' },
    { id: 'urgent_came_up', text: '급한 일이 끼어듦', insight: '유연한 재조정' },
    { id: 'didnt_want_to', text: '그냥... 하기 싫었음', insight: '동기부여' }
  ];

  // 거의 없음을 선택한 경우 바로 다음으로
  if (failFrequency === 'rarely') {
    return (
      <div className="scene chapter2-scene3">
        <div className="scene-content">
          <div className="story-text">
            <h2>🎉 계획대로 잘 하시는군요!</h2>
            <p className="scene-description">
              비결이 뭔가요? 저도 알려주세요 😊
            </p>
          </div>
          <button className="next-button" onClick={() => onNext({})}>
            다음 → (Chapter 3 시작)
          </button>
        </div>
      </div>
    );
  }

  const toggleReason = (reasonId: string) => {
    if (selectedReasons.includes(reasonId)) {
      setSelectedReasons(selectedReasons.filter(id => id !== reasonId));
    } else if (selectedReasons.length < 3) {
      setSelectedReasons([...selectedReasons, reasonId]);
    }
  };

  const handleNext = () => {
    onNext({
      execution: {
        ...data.execution,
        failReasons: selectedReasons
      }
    });
  };

  return (
    <div className="scene chapter2-scene3">
      <div className="scene-content">
        <div className="story-text">
          <h2>🤔 왜 계획대로 안 됐을까요?</h2>
          <p className="scene-description">
            최대 3개까지 선택 가능해요
          </p>
        </div>

        <div className="reason-checkboxes">
          {reasons.map((reason) => (
            <label
              key={reason.id}
              className={`reason-checkbox-label ${selectedReasons.includes(reason.id) ? 'checked' : ''} ${selectedReasons.length >= 3 && !selectedReasons.includes(reason.id) ? 'disabled' : ''}`}
            >
              <input
                type="checkbox"
                checked={selectedReasons.includes(reason.id)}
                onChange={() => toggleReason(reason.id)}
                disabled={selectedReasons.length >= 3 && !selectedReasons.includes(reason.id)}
              />
              <span>{reason.text}</span>
            </label>
          ))}
        </div>

        {selectedReasons.length > 0 && (
          <p className="selection-count">{selectedReasons.length}/3 선택됨</p>
        )}

        <button
          className="next-button"
          onClick={handleNext}
          disabled={selectedReasons.length === 0}
        >
          다음 → (Chapter 3 시작)
        </button>
      </div>
    </div>
  );
};
