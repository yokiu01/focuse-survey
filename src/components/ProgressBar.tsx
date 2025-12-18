import { useEffect, useState } from 'react';
import { calculateProgress, getCompletionCount } from '../utils/analytics';
import './ProgressBar.css';

interface ProgressBarProps {
  currentScene: number;
  totalScenes: number;
  estimatedTimeLeft?: number; // 분 단위
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentScene,
  totalScenes,
  estimatedTimeLeft
}) => {
  const [completionCount, setCompletionCount] = useState(getCompletionCount());
  const progress = calculateProgress(currentScene, totalScenes, true); // 부풀린 진행률

  // 완료 인원 랜덤 업데이트 (사회적 증거 강화)
  useEffect(() => {
    const interval = setInterval(() => {
      setCompletionCount(getCompletionCount());
    }, 30000); // 30초마다

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="progress-bar-container">
      <div className="progress-bar-wrapper">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          >
            <span className="progress-shine"></span>
          </div>
        </div>
        <div className="progress-info">
          <span className="progress-percentage">{progress}%</span>
          {estimatedTimeLeft !== undefined && (
            <span className="progress-time">
              예상 {estimatedTimeLeft}분 남음
            </span>
          )}
          <span className="progress-social">
            이미 {completionCount.toLocaleString()}명 완료
          </span>
        </div>
      </div>
    </div>
  );
};
