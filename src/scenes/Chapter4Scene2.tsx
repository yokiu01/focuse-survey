import { useState } from 'react';
import { SceneProps } from '../types';
import './SceneStyles.css';

// Chapter 4 - Scene 2: 돈과 시간의 투자
export const Chapter4Scene2: React.FC<SceneProps> = ({ data, onNext }) => {
  const [spending, setSpending] = useState({
    medication: 0,
    therapy: 0,
    apps: 0,
    books: 0,
    cafe: 0,
    headphones: 0
  });

  const categories = [
    { id: 'medication', name: 'ADHD 약물', emoji: '💊' },
    { id: 'therapy', name: '상담/코칭', emoji: '🧑‍⚕️' },
    { id: 'apps', name: '할 일 관리 앱', emoji: '📱' },
    { id: 'books', name: '자기계발서', emoji: '📚' },
    { id: 'cafe', name: '카페 작업 (집중용)', emoji: '☕' },
    { id: 'headphones', name: '노이즈캔슬링 이어폰', emoji: '🎧' }
  ];

  const updateSpending = (category: string, value: number) => {
    setSpending({
      ...spending,
      [category]: value
    });
  };

  const getTotalSpending = () => {
    return Object.values(spending).reduce((sum, val) => sum + val, 0);
  };

  const handleNext = () => {
    const total = getTotalSpending();
    onNext({
      chapter4: {
        ...data.chapter4,
        adhdSpending: {
          ...spending,
          total
        }
      }
    });
  };

  const total = getTotalSpending();

  const getTotalComment = () => {
    if (total === 0) return '아무것도 안 쓰시는군요?';
    if (total < 50000) return '꽤 절약하시는 편이네요';
    if (total < 150000) return '평균적인 투자네요';
    if (total < 300000) return '꽤 많이 쓰시는군요';
    return '와... 정말 많이 투자하시네요 😱';
  };

  return (
    <div className="scene chapter4-scene2">
      <div className="scene-content">
        <div className="story-text">
          <h2>💰 한 달에 얼마나 쓰세요?</h2>
          <p className="scene-description">
            집중력/할 일 관리를 위해<br />
            한 달 평균 지출 (대략적으로만!)
          </p>
        </div>

        <div className="spending-inputs">
          {categories.map((category) => (
            <div key={category.id} className="spending-row">
              <div className="spending-label">
                <span className="spending-emoji">{category.emoji}</span>
                <span className="spending-name">{category.name}</span>
              </div>
              <div className="spending-input-wrapper">
                <input
                  type="number"
                  min="0"
                  step="10000"
                  value={spending[category.id as keyof typeof spending]}
                  onChange={(e) => updateSpending(category.id, Math.max(0, Number(e.target.value)))}
                  className="money-input"
                  placeholder="0"
                />
                <span className="currency">원</span>
              </div>
            </div>
          ))}
        </div>

        <div className="total-spending">
          <div className="total-label">월 총 지출</div>
          <div className="total-amount">
            {total.toLocaleString()}원
          </div>
          <div className="total-comment">{getTotalComment()}</div>
        </div>

        <button className="next-button" onClick={handleNext}>
          다음 →
        </button>
      </div>
    </div>
  );
};
