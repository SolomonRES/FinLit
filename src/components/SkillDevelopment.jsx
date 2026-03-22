import React from 'react';
import { Star } from 'lucide-react';

function SkillDevelopment() {
  return (
    <div className="prof-card glass-card prof-full-card">
      <div className="prof-card-header">
        <div className="prof-card-icon-box">
          <Star strokeWidth={2} />
        </div>
        <h2 className="prof-card-title">Skill Development</h2>
      </div>
      <div className="prof-skills-grid">
        <div className="prof-skill-item">
          <div className="prof-skill-top">
            <span className="prof-skill-name">Financial Modeling</span>
            <span className="prof-skill-pct">75%</span>
          </div>
          <div className="prof-progress-track">
            <div className="prof-progress-bar" style={{ width: '75%' }}></div>
          </div>
        </div>
        <div className="prof-skill-item">
          <div className="prof-skill-top">
            <span className="prof-skill-name">Valuation Analysis</span>
            <span className="prof-skill-pct">65%</span>
          </div>
          <div className="prof-progress-track">
            <div className="prof-progress-bar" style={{ width: '65%' }}></div>
          </div>
        </div>
        <div className="prof-skill-item">
          <div className="prof-skill-top">
            <span className="prof-skill-name">M&amp;A Process</span>
            <span className="prof-skill-pct">55%</span>
          </div>
          <div className="prof-progress-track">
            <div className="prof-progress-bar" style={{ width: '55%' }}></div>
          </div>
        </div>
        <div className="prof-skill-item">
          <div className="prof-skill-top">
            <span className="prof-skill-name">Market Research</span>
            <span className="prof-skill-pct">40%</span>
          </div>
          <div className="prof-progress-track">
            <div className="prof-progress-bar" style={{ width: '40%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkillDevelopment;
