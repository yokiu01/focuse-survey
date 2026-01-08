import { useState } from 'react';
import { SceneProps } from '../types';
import './SceneStyles.css';

// Chapter 1 - Q2: 현재 사용 도구
export const Chapter1Scene1: React.FC<SceneProps> = ({ onNext }) => {
  const [selectedTools, setSelectedTools] = useState<string[]>([]);

  const tools = [
    { id: 'notion', name: 'Notion', emoji: '📓' },
    { id: 'todoist', name: 'Todoist', emoji: '✅' },
    { id: 'tiimo', name: 'Tiimo', emoji: '⏰' },
    { id: 'gcal', name: 'Google 캘린더', emoji: '📅' },
    { id: 'paper', name: '종이/포스트잇', emoji: '📝' },
    { id: 'kakao', name: '카톡 나에게 보내기', emoji: '💬' },
    { id: 'none', name: '머릿속에만', emoji: '🧠' },
    { id: 'other', name: '기타', emoji: '📦' }
  ];

  const toggleTool = (toolId: string) => {
    if (toolId === 'none') {
      setSelectedTools(['none']);
    } else {
      const filtered = selectedTools.filter(id => id !== 'none');
      if (selectedTools.includes(toolId)) {
        setSelectedTools(filtered.filter(id => id !== toolId));
      } else {
        setSelectedTools([...filtered, toolId]);
      }
    }
  };

  const handleNext = () => {
    onNext({
      tools: {
        current: selectedTools
      }
    });
  };

  return (
    <div className="scene chapter1-scene1">
      <div className="scene-content">
        <div className="story-text">
          <h2>💻 할 일 관리, 지금 뭐 쓰세요?</h2>
          <p className="scene-description">
            여러 개 선택 가능해요
          </p>
        </div>

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
          onClick={handleNext}
          disabled={selectedTools.length === 0}
        >
          다음 →
        </button>
      </div>
    </div>
  );
};
