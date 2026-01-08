import { useState } from 'react';
import { SceneProps } from '../types';
import './SceneStyles.css';

// Chapter 1 - Q4: 버린 도구
export const Chapter1Scene3: React.FC<SceneProps> = ({ data, onNext }) => {
  const [abandonedApps, setAbandonedApps] = useState<string[]>([]);

  const apps = [
    { id: 'notion', name: 'Notion', emoji: '📓' },
    { id: 'todoist', name: 'Todoist', emoji: '✅' },
    { id: 'trello', name: 'Trello', emoji: '📋' },
    { id: 'tiimo', name: 'Tiimo', emoji: '⏰' },
    { id: 'other', name: '기타', emoji: '📦' },
    { id: 'none', name: '없음', emoji: '😇' }
  ];

  const toggleApp = (appId: string) => {
    if (appId === 'none') {
      setAbandonedApps(['none']);
    } else {
      const filtered = abandonedApps.filter(id => id !== 'none');
      if (abandonedApps.includes(appId)) {
        setAbandonedApps(filtered.filter(id => id !== appId));
      } else {
        setAbandonedApps([...filtered, appId]);
      }
    }
  };

  const handleNext = () => {
    onNext({
      tools: {
        ...data.tools,
        abandoned: abandonedApps
      }
    });
  };

  return (
    <div className="scene chapter1-scene3">
      <div className="scene-content">
        <div className="story-text">
          <h2>🪦 예전에 쓰다 포기한 앱 있어요?</h2>
          <p className="scene-description">
            여러 개 선택 가능해요
          </p>
        </div>

        <div className="tool-checklist">
          {apps.map((app) => (
            <label
              key={app.id}
              className={`tool-checkbox-label ${abandonedApps.includes(app.id) ? 'checked' : ''}`}
            >
              <input
                type="checkbox"
                checked={abandonedApps.includes(app.id)}
                onChange={() => toggleApp(app.id)}
              />
              <span className="tool-checkbox-emoji">{app.emoji}</span>
              <span className="tool-checkbox-name">{app.name}</span>
            </label>
          ))}
        </div>

        <button
          className="next-button"
          onClick={handleNext}
          disabled={abandonedApps.length === 0}
        >
          다음 →
        </button>
      </div>
    </div>
  );
};
