import { useState } from 'react';
import { SceneProps } from '../types';
import './SceneStyles.css';

// Chapter 2 - Scene 1: 도구의 무덤
export const Chapter2Scene1: React.FC<SceneProps> = ({ data, onNext }) => {
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [showFollowUp, setShowFollowUp] = useState(false);
  const [usageFrequency, setUsageFrequency] = useState<Record<string, string>>({});

  const tools = [
    { id: 'notion', name: 'Notion', emoji: '📓' },
    { id: 'todoist', name: 'Todoist', emoji: '✅' },
    { id: 'trello', name: 'Trello', emoji: '📋' },
    { id: 'paper', name: '종이 다이어리', emoji: '📔' },
    { id: 'google_calendar', name: 'Google 캘린더', emoji: '📅' },
    { id: 'post_it', name: '포스트잇', emoji: '📝' },
    { id: 'excel', name: 'Excel/스프레드시트', emoji: '📊' },
    { id: 'kakao', name: '카카오톡 나에게 보내기', emoji: '💬' },
    { id: 'none', name: '머릿속 (앱 같은 거 안 씀)', emoji: '🧠' }
  ];

  const toggleTool = (toolId: string) => {
    if (selectedTools.includes(toolId)) {
      setSelectedTools(selectedTools.filter(id => id !== toolId));
    } else {
      setSelectedTools([...selectedTools, toolId]);
    }
  };

  const handleContinue = () => {
    setShowFollowUp(true);
  };

  const setFrequency = (toolId: string, freq: string) => {
    setUsageFrequency({
      ...usageFrequency,
      [toolId]: freq
    });
  };

  const handleNext = () => {
    const frequency: Record<string, 'daily' | 'sometimes' | 'installed'> = {};
    Object.keys(usageFrequency).forEach(key => {
      frequency[key] = usageFrequency[key] as any;
    });

    onNext({
      chapter2: {
        ...data.chapter2,
        currentTools: selectedTools,
        toolUsageFrequency: frequency
      }
    });
  };

  const allFrequenciesSet = selectedTools.every(tool =>
    usageFrequency[tool] !== undefined
  );

  return (
    <div className="scene chapter2-scene1">
      <div className="scene-content">
        {/* 스토리 */}
        <div className="story-text">
          <h2>💻 사무실 도착! 컴퓨터를 켭니다</h2>
          <p className="scene-description">
            할 일 관리, 지금 뭘 쓰고 계세요?<br />
            <small>(여러 개 선택 가능)</small>
          </p>
        </div>

        {!showFollowUp ? (
          <>
            {/* 도구 선택 */}
            <div className="tool-checklist">
              {tools.map((tool) => (
                <label
                  key={tool.id}
                  className={`tool-checkbox-label ${selectedTools.includes(tool.id) ? 'checked' : ''}`}
                >
                  <input
                    type="checkbox"
                    checked={selectedTools.includes(tool.id)}
                    onChange={() => toggleTool(tool.id)}
                  />
                  <span className="tool-checkbox-emoji">{tool.emoji}</span>
                  <span className="tool-checkbox-name">{tool.name}</span>
                </label>
              ))}
            </div>

            <button
              className="next-button"
              onClick={handleContinue}
              disabled={selectedTools.length === 0}
            >
              다음 →
            </button>
          </>
        ) : (
          <>
            {/* 사용 빈도 질문 */}
            <div className="follow-up-panel fade-in">
              <h3>그 앱들, 다 열어보세요?</h3>
              <p className="scene-description">
                선택한 도구들의 실제 사용 빈도를 알려주세요
              </p>

              <div className="frequency-questions">
                {selectedTools.map((toolId) => {
                  const tool = tools.find(t => t.id === toolId);
                  if (!tool) return null;

                  return (
                    <div key={toolId} className="frequency-question">
                      <div className="frequency-header">
                        <span className="frequency-emoji">{tool.emoji}</span>
                        <span className="frequency-name">{tool.name}</span>
                      </div>
                      <div className="frequency-options">
                        <button
                          className={`frequency-button ${usageFrequency[toolId] === 'daily' ? 'selected' : ''}`}
                          onClick={() => setFrequency(toolId, 'daily')}
                        >
                          매일 봅니다
                        </button>
                        <button
                          className={`frequency-button ${usageFrequency[toolId] === 'sometimes' ? 'selected' : ''}`}
                          onClick={() => setFrequency(toolId, 'sometimes')}
                        >
                          가끔... 생각날 때만
                        </button>
                        <button
                          className={`frequency-button ${usageFrequency[toolId] === 'installed' ? 'selected' : ''}`}
                          onClick={() => setFrequency(toolId, 'installed')}
                        >
                          깔아만 놨어요 😅
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                className="next-button"
                onClick={handleNext}
                disabled={!allFrequenciesSet}
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
