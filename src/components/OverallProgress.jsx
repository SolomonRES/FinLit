import React from 'react';
import { TrendingUp } from 'lucide-react';

function OverallProgress() {
  return (
    <div className="prof-card glass-card">
      <div className="prof-card-header">
        <div className="prof-card-icon-box">
          <TrendingUp strokeWidth={2} />
        </div>
        <h2 className="prof-card-title">Overall Progress</h2>
      </div>

      <div className="prof-stats-grid">
        <div className="prof-stat-box">
          <div className="prof-stat-value">42%</div>
          <div className="prof-stat-label">Total Completion</div>
        </div>
        <div className="prof-stat-box">
          <div className="prof-stat-value">18</div>
          <div className="prof-stat-label">Modules Completed</div>
        </div>
        <div className="prof-stat-box">
          <div className="prof-stat-value">21</div>
          <div className="prof-stat-label">Day Streak</div>
        </div>
      </div>

      <div className="prof-progress-section">
        <div className="prof-progress-info">
          <span>Overall Progress</span>
          <span className="prof-progress-count">18/43 modules</span>
        </div>
        <div className="prof-progress-track">
          <div className="prof-progress-bar" style={{ width: '42%' }}></div>
        </div>
      </div>
    </div>
  );
}

export default OverallProgress;
