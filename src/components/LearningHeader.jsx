import React from 'react';
import { Database } from 'lucide-react';

function LearningHeader({ total, done, pct }) {
  return (
    <section className="learning-header">
      <div className="grid-pattern"></div>
      <div className="learning-header-content">
        <div className="learning-badge">
          <Database className="badge-icon" strokeWidth={2} />
          Learning System
        </div>
        <h1 className="learning-title">Training Curriculum</h1>
        <p className="learning-subtitle">Comprehensive modules across six major financial services sectors</p>

        {/* overall progress card */}
        <div className="progress-card-wrapper">
          <div className="glass-card progress-card">
            <div className="progress-card-header">
              <div className="progress-card-label">
                <Database className="progress-card-icon" strokeWidth={2} />
                <span>Overall Progress</span>
              </div>
              <span className="progress-card-percent" id="progressPercent">{pct}%</span>
            </div>
            <div className="progress-bar-track">
              <div className="progress-bar-fill" id="progressBar" style={{ width: pct + '%' }}></div>
            </div>
            <div className="progress-card-footer">
              <span>{done} of {total} modules completed</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LearningHeader;
