import React from 'react';
import { Star, Target, Activity, TrendingUp } from 'lucide-react';

function CapabilitiesSection() {
  return (
    <section className="capabilities-section">
      <div className="capabilities-background"></div>

      <div className="section-header">
        <div className="section-badge">
          <Star className="badge-icon" strokeWidth={2} />
          Platform Features
        </div>
        <h2 className="section-title">Why Choose FinLit</h2>
      </div>

      <div className="capabilities-grid">
        <div className="capability-card">
          <div className="capability-icon">
            <Target strokeWidth={2} />
          </div>
          <div className="capability-content">
            <h3 className="capability-title">Industry-Specific Curriculum</h3>
            <p className="capability-description">Deep domain expertise across six major financial sectors</p>
          </div>
        </div>

        <div className="capability-card">
          <div className="capability-icon">
            <Activity strokeWidth={2} />
          </div>
          <div className="capability-content">
            <h3 className="capability-title">Advanced Financial Modeling</h3>
            <p className="capability-description">DCF, LBO, M&amp;A models used by top institutions</p>
          </div>
        </div>

        <div className="capability-card">
          <div className="capability-icon">
            <TrendingUp strokeWidth={2} />
          </div>
          <div className="capability-content">
            <h3 className="capability-title">Data-Driven Learning</h3>
            <p className="capability-description">Real-world case studies and market data integration</p>
          </div>
        </div>

        <div className="capability-card">
          <div className="capability-icon">
            <Target strokeWidth={2} />
          </div>
          <div className="capability-content">
            <h3 className="capability-title">Global Market Perspective</h3>
            <p className="capability-description">Coverage of Americas, Europe, and Asia-Pacific markets</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CapabilitiesSection;
