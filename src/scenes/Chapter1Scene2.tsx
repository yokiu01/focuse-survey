import { useState } from 'react';
import { SceneProps } from '../types';
import './SceneStyles.css';

// Chapter 1 - Q3: 도구 사용 빈도
export const Chapter1Scene2: React.FC<SceneProps> = ({ data, onNext }) => {
  const currentTools = data.tools.current || [];
  const [frequency, setFrequency] = useState<Record<string, string>>({});

  const toolNames: Record<string, { name: string; emoji: string }> = {
    notion: { name: 'Notion', emoji: '📓' },
    todoist: { name: 'Todoist', emoji: '✅' },
    tiimo: { name: 'Tiimo', emoji: '⏰' },
    gcal: { name: 'Google 캘린더', emoji: '📅' },
    paper: { name: '종이/포스트잇', emoji: '📝' },
    kakao: { name: '카톡 나에게 보내기', emoji: '💬' },
    none: { name: '머릿속에만', emoji: '🧠' },
    other: { name: '기타', emoji: '📦' }
  };

  // 빈도 질문이 필요한 도구만 필터링 (none 제외)
  const toolsToAsk = currentTools.filter(t => t !== 'none');

  const setToolFrequency = (toolId: string, freq: string) => {
    setFrequency({
      ...frequency,
      [toolId]: freq
    });
  };

  const handleNext = () => {
    const freqData: Record<string, 'daily' | 'sometimes' | 'installed_only'> = {};
    Object.keys(frequency).forEach(key => {
      freqData[key] = frequency[key] as 'daily' | 'sometimes' | 'installed_only';
    });

    onNext({
      tools: {
        ...data.tools,
        frequency: freqData
      }
    });
  };

  const allAnswered = toolsToAsk.every(tool => frequency[tool] !== undefined);

  // 도구가 없거나 머릿속에만이면 바로 다음으로
  if (toolsToAsk.length === 0) {
    return (
      <div className="scene chapter1-scene2">
        <div className="scene-content">
          <div className="story-text">
            <h2>🧠 머릿속으로 관리하시는군요!</h2>
            <p className="scene-description">
              도구 없이 관리하시는 분들도 많아요
            </p>
          </div>
          <button className="next-button" onClick={() => onNext({})}>
            다음 →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="scene chapter1-scene2">
      <div className="scene-content">
        <div className="story-text">
          <h2>📊 그거, 실제로 매일 여세요?</h2>
          <p className="scene-description">
            선택한 도구들의 실제 사용 빈도를 알려주세요
          </p>
        </div>

        <div className="frequency-questions">
          {toolsToAsk.map((toolId) => {
            const tool = toolNames[toolId];
            if (!tool) return null;

            return (
              <div key={toolId} className="frequency-question">
                <div className="frequency-header">
                  <span className="frequency-emoji">{tool.emoji}</span>
                  <span className="frequency-name">{tool.name}</span>
                </div>
                <div className="frequency-options">
                  <button
                    className={`frequency-button ${frequency[toolId] === 'daily' ? 'selected' : ''}`}
                    onClick={() => setToolFrequency(toolId, 'daily')}
                  >
                    매일 봄
                  </button>
                  <button
                    className={`frequency-button ${frequency[toolId] === 'sometimes' ? 'selected' : ''}`}
                    onClick={() => setToolFrequency(toolId, 'sometimes')}
                  >
                    가끔...
                  </button>
                  <button
                    className={`frequency-button ${frequency[toolId] === 'installed_only' ? 'selected' : ''}`}
                    onClick={() => setToolFrequency(toolId, 'installed_only')}
                  >
                    깔아만 놨음
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <button
          className="next-button"
          onClick={handleNext}
          disabled={!allAnswered}
        >
          다음 →
        </button>
      </div>
    </div>
  );
};
