import { useState } from 'react';
import { SceneProps } from '../types';
import './SceneStyles.css';

// Chapter 3 - Scene 4: 도피의 유혹
export const Chapter3Scene4: React.FC<SceneProps> = ({ data, onNext }) => {
  const [escapeActivities, setEscapeActivities] = useState<string[]>([]);

  const activities = [
    { id: 'sns', name: 'SNS 무한 스크롤', emoji: '📱' },
    { id: 'youtube', name: '유튜브 쇼츠', emoji: '📺' },
    { id: 'news', name: '뉴스/커뮤니티', emoji: '📰' },
    { id: 'shopping', name: '온라인 쇼핑', emoji: '🛒' },
    { id: 'game', name: '모바일 게임', emoji: '🎮' },
    { id: 'chat', name: '카톡/메신저', emoji: '💬' },
    { id: 'snack', name: '간식 먹으러 가기', emoji: '🍪' },
    { id: 'coffee', name: '커피 타러 가기', emoji: '☕' },
    { id: 'bathroom', name: '화장실', emoji: '🚽' },
    { id: 'organize', name: '책상/파일 정리', emoji: '🗂️' },
    { id: 'none', name: '도피 안 합니다 😇', emoji: '🚫' }
  ];

  const toggleActivity = (activityId: string) => {
    if (activityId === 'none') {
      // "도피 안 합니다" 선택 시 다른 것들 모두 해제
      setEscapeActivities(['none']);
    } else {
      if (escapeActivities.includes(activityId)) {
        setEscapeActivities(escapeActivities.filter(id => id !== activityId));
      } else {
        // "도피 안 합니다"가 선택되어 있으면 제거
        const filtered = escapeActivities.filter(id => id !== 'none');
        setEscapeActivities([...filtered, activityId]);
      }
    }
  };

  const handleNext = () => {
    onNext({
      chapter3: {
        ...data.chapter3,
        escapeActivities
      }
    });
  };

  const getEscapeComment = () => {
    const count = escapeActivities.filter(a => a !== 'none').length;
    if (escapeActivities.includes('none')) return '정말요? 존경스럽네요! 🙏';
    if (count === 0) return '하나도 안 선택하셨네요?';
    if (count <= 2) return '꽤 절제하시는 편이네요 👍';
    if (count <= 5) return '평범한 직장인이시군요 😊';
    return '다양하게 즐기시네요! 😅';
  };

  return (
    <div className="scene chapter3-scene4">
      <div className="scene-content">
        <div className="story-text">
          <h2>🏃 일하기 싫을 때, 뭐 해요?</h2>
          <p className="scene-description">
            집중 안 될 때 하는 것들<br />
            <small>(여러 개 선택 가능)</small>
          </p>
        </div>

        <div className="tool-checklist">
          {activities.map((activity) => (
            <label
              key={activity.id}
              className={`tool-checkbox-label ${escapeActivities.includes(activity.id) ? 'checked' : ''}`}
            >
              <input
                type="checkbox"
                checked={escapeActivities.includes(activity.id)}
                onChange={() => toggleActivity(activity.id)}
              />
              <span className="tool-checkbox-emoji">{activity.emoji}</span>
              <span className="tool-checkbox-name">{activity.name}</span>
            </label>
          ))}
        </div>

        {escapeActivities.length > 0 && (
          <div className="reaction-bubble fade-in">
            <p className="reaction-text">{getEscapeComment()}</p>
          </div>
        )}

        <button
          className="next-button"
          onClick={handleNext}
          disabled={escapeActivities.length === 0}
        >
          다음 → (Chapter 4 시작)
        </button>
      </div>
    </div>
  );
};
