import React from 'react';
import { Calendar, Star } from 'lucide-react';

function ProfileHeader() {
  return (
    <section className="prof-header">
      <div className="grid-pattern"></div>
      <div className="prof-header-content">
        <h1 className="prof-name">Solomon Ellis-Summers</h1>
        <div className="prof-meta">
          <span className="prof-meta-item">Analyst Track</span>
          <span className="prof-meta-item">
            <Calendar className="prof-meta-icon" strokeWidth={2} />
            Member since January 2026
          </span>
          <span className="prof-streak-badge">
            <Star className="prof-meta-icon" strokeWidth={2} />
            <span className="prof-streak-text">21 day streak</span>
          </span>
        </div>
      </div>
    </section>
  );
}

export default ProfileHeader;
