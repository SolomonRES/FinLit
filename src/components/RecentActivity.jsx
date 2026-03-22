import React from 'react';
import { Clock, CheckCircle2, BookOpen } from 'lucide-react';

function RecentActivity() {
  return (
    <div className="prof-card glass-card prof-full-card">
      <div className="prof-card-header">
        <div className="prof-card-icon-box">
          <Clock strokeWidth={2} />
        </div>
        <h2 className="prof-card-title">Recent Activity</h2>
      </div>
      <div className="prof-activity-grid">
        {/* completed */}
        <div className="prof-activity-item">
          <div className="prof-activity-dot completed">
            <CheckCircle2 strokeWidth={2} />
          </div>
          <div className="prof-activity-text">
            <div className="prof-activity-module">M&amp;A Valuation Methods</div>
            <div className="prof-activity-sector">Investment Banking</div>
            <div className="prof-activity-date">Today</div>
          </div>
          <span className="prof-activity-badge completed">Completed</span>
        </div>
        <div className="prof-activity-item">
          <div className="prof-activity-dot completed">
            <CheckCircle2 strokeWidth={2} />
          </div>
          <div className="prof-activity-text">
            <div className="prof-activity-module">DCF Modeling</div>
            <div className="prof-activity-sector">Investment Banking</div>
            <div className="prof-activity-date">Today</div>
          </div>
          <span className="prof-activity-badge completed">Completed</span>
        </div>
        {/* in progress */}
        <div className="prof-activity-item">
          <div className="prof-activity-dot in-progress">
            <BookOpen strokeWidth={2} />
          </div>
          <div className="prof-activity-text">
            <div className="prof-activity-module">Equity Capital Markets</div>
            <div className="prof-activity-sector">Capital Markets</div>
            <div className="prof-activity-date">Yesterday</div>
          </div>
        </div>
        {/* completed */}
        <div className="prof-activity-item">
          <div className="prof-activity-dot completed">
            <CheckCircle2 strokeWidth={2} />
          </div>
          <div className="prof-activity-text">
            <div className="prof-activity-module">Debt Financing Structures</div>
            <div className="prof-activity-sector">Capital Markets</div>
            <div className="prof-activity-date">2 days ago</div>
          </div>
          <span className="prof-activity-badge completed">Completed</span>
        </div>
        {/* in progress */}
        <div className="prof-activity-item">
          <div className="prof-activity-dot in-progress">
            <BookOpen strokeWidth={2} />
          </div>
          <div className="prof-activity-text">
            <div className="prof-activity-module">Private Equity Overview</div>
            <div className="prof-activity-sector">Asset Management</div>
            <div className="prof-activity-date">3 days ago</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecentActivity;
