import React from 'react';
import { Award, Target, Star, Briefcase, Activity, LayoutGrid } from 'lucide-react';

function Achievements() {
  return (
    <div className="prof-card glass-card">
      <div className="prof-card-header">
        <div className="prof-card-icon-box">
          <Award strokeWidth={2} />
        </div>
        <h2 className="prof-card-title">Achievements</h2>
      </div>
      <div className="prof-achievements-grid">
        {/* earned */}
        <div className="prof-achievement earned">
          <div className="prof-achievement-icon">
            <Target strokeWidth={2} />
          </div>
          <div className="prof-achievement-title">First Module</div>
          <div className="prof-achievement-desc">Completed Investment Banking 101</div>
        </div>
        <div className="prof-achievement earned">
          <div className="prof-achievement-icon">
            <Star strokeWidth={2} />
          </div>
          <div className="prof-achievement-title">Three Week Streak</div>
          <div className="prof-achievement-desc">21 consecutive days of learning</div>
        </div>
        <div className="prof-achievement earned">
          <div className="prof-achievement-icon">
            <Briefcase strokeWidth={2} />
          </div>
          <div className="prof-achievement-title">Deal Analyst</div>
          <div className="prof-achievement-desc">Mastered M&amp;A fundamentals</div>
        </div>
        {/* locked */}
        <div className="prof-achievement locked">
          <div className="prof-achievement-icon">
            <Activity strokeWidth={2} />
          </div>
          <div className="prof-achievement-title">Markets Expert</div>
          <div className="prof-achievement-desc">Completed all Capital Markets modules</div>
        </div>
        <div className="prof-achievement locked">
          <div className="prof-achievement-icon">
            <Award strokeWidth={2} />
          </div>
          <div className="prof-achievement-title">Industry Leader</div>
          <div className="prof-achievement-desc">Completed 50+ modules</div>
        </div>
        <div className="prof-achievement locked">
          <div className="prof-achievement-icon">
            <LayoutGrid strokeWidth={2} />
          </div>
          <div className="prof-achievement-title">Sector Specialist</div>
          <div className="prof-achievement-desc">100% completion in any sector</div>
        </div>
      </div>
    </div>
  );
}

export default Achievements;
