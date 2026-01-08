import { calculateProgress } from '../utils/analytics';
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
  const progress = calculateProgress(currentScene, totalScenes, true);

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
        </div>
      </div>
    </div>
  );
};
