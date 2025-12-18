import { useState } from 'react';
import { SceneProps } from '../types';
import './SceneStyles.css';

// Chapter 2 - Scene 3: 과거의 무덤
export const Chapter2Scene3: React.FC<SceneProps> = ({ data, onNext }) => {
  const [abandonedApps, setAbandonedApps] = useState<string[]>([]);
  const [showReasons, setShowReasons] = useState(false);
  const [abandonReasons, setAbandonReasons] = useState<Record<string, string[]>>({});

  const apps = [
    { id: 'notion', name: 'Notion', emoji: '📓' },
    { id: 'todoist', name: 'Todoist', emoji: '✅' },
    { id: 'trello', name: 'Trello', emoji: '📋' },
    { id: 'evernote', name: 'Evernote', emoji: '🐘' },
    { id: 'asana', name: 'Asana', emoji: '🎯' },
    { id: 'monday', name: 'Monday.com', emoji: '📊' },
    { id: 'clickup', name: 'ClickUp', emoji: '🚀' },
    { id: 'airtable', name: 'Airtable', emoji: '📑' },
    { id: 'none', name: '버린 앱 없음', emoji: '😇' }
  ];

  const reasons = [
    '너무 복잡해요',
    '필요 없는 기능이 너무 많아요',
    '느려요',
    '유료화 압박이 심해요',
    '일단 깔았는데 안 쓰게 됐어요',
    '다른 앱이 더 좋아보여서'
  ];

  const toggleApp = (appId: string) => {
    if (appId === 'none') {
      // "버린 앱 없음" 선택 시 다른 것들 모두 해제
      setAbandonedApps(['none']);
    } else {
      if (abandonedApps.includes(appId)) {
        setAbandonedApps(abandonedApps.filter(id => id !== appId));
        // 이유도 함께 제거
        const newReasons = { ...abandonReasons };
        delete newReasons[appId];
        setAbandonReasons(newReasons);
      } else {
        // "버린 앱 없음"이 선택되어 있으면 제거
        const filtered = abandonedApps.filter(id => id !== 'none');
        setAbandonedApps([...filtered, appId]);
      }
    }
  };

  const toggleReason = (appId: string, reason: string) => {
    const currentReasons = abandonReasons[appId] || [];
    if (currentReasons.includes(reason)) {
      setAbandonReasons({
        ...abandonReasons,
        [appId]: currentReasons.filter(r => r !== reason)
      });
    } else {
      setAbandonReasons({
        ...abandonReasons,
        [appId]: [...currentReasons, reason]
      });
    }
  };

  const handleContinue = () => {
    if (abandonedApps.includes('none') || abandonedApps.length === 0) {
      // 버린 앱이 없으면 바로 다음으로
      handleNext();
    } else {
      setShowReasons(true);
    }
  };

  const handleNext = () => {
    onNext({
      chapter2: {
        ...data.chapter2,
        abandonedApps,
        abandonReasons: abandonedApps.includes('none') ? undefined : abandonReasons
      }
    });
  };

  const allReasonsSet = abandonedApps
    .filter(app => app !== 'none')
    .every(app => abandonReasons[app] && abandonReasons[app].length > 0);

  return (
    <div className="scene chapter2-scene3">
      <div className="scene-content">
        <div className="story-text">
          <h2>🪦 잠깐, 휴지통 좀 볼게요</h2>
          <p className="scene-description">
            예전에 깔았다가 지운 할 일 앱 있어요?<br />
            <small>(여러 개 선택 가능)</small>
          </p>
        </div>

        {!showReasons ? (
          <>
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
              onClick={handleContinue}
              disabled={abandonedApps.length === 0}
            >
              다음 →
            </button>
          </>
        ) : (
          <>
            <div className="follow-up-panel fade-in">
              <h3>왜 버리셨어요? 🤔</h3>
              <p className="scene-description">
                각 앱을 버린 이유를 알려주세요
              </p>

              <div className="abandoned-reasons-section">
                {abandonedApps.filter(app => app !== 'none').map((appId) => {
                  const app = apps.find(a => a.id === appId);
                  if (!app) return null;

                  return (
                    <div key={appId} className="reason-group">
                      <div className="reason-group-header">
                        <span className="tool-checkbox-emoji">{app.emoji}</span>
                        <span className="tool-checkbox-name">{app.name}</span>
                      </div>

                      <div className="reason-checkboxes">
                        {reasons.map(reason => (
                          <label key={reason} className="reason-checkbox-label">
                            <input
                              type="checkbox"
                              checked={(abandonReasons[appId] || []).includes(reason)}
                              onChange={() => toggleReason(appId, reason)}
                            />
                            <span>{reason}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                className="next-button"
                onClick={handleNext}
                disabled={!allReasonsSet}
              >
                다음 →
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
