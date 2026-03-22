import React from 'react';
import { Target, Briefcase, Activity, Home, Shield, LayoutGrid } from 'lucide-react';

function SectorProgress() {
  return (
    <div className="prof-card glass-card">
      <div className="prof-card-header">
        <div className="prof-card-icon-box">
          <Target strokeWidth={2} />
        </div>
        <h2 className="prof-card-title">Sector Progress</h2>
      </div>

      <div className="prof-sector-list">
        {/* Investment Banking */}
        <div className="prof-sector-item">
          <div className="prof-sector-top">
            <div className="prof-sector-info">
              <Briefcase className="prof-sector-icon" strokeWidth={2} />
              <div>
                <div className="prof-sector-name">Investment Banking</div>
                <div className="prof-sector-count">13 of 20 modules</div>
              </div>
            </div>
            <div className="prof-sector-pct">65%</div>
          </div>
          <div className="prof-progress-track">
            <div className="prof-progress-bar" style={{ width: '65%' }}></div>
          </div>
        </div>
        {/* Capital Markets */}
        <div className="prof-sector-item">
          <div className="prof-sector-top">
            <div className="prof-sector-info">
              <Activity className="prof-sector-icon" strokeWidth={2} />
              <div>
                <div className="prof-sector-name">Capital Markets</div>
                <div className="prof-sector-count">6 of 15 modules</div>
              </div>
            </div>
            <div className="prof-sector-pct">40%</div>
          </div>
          <div className="prof-progress-track">
            <div className="prof-progress-bar" style={{ width: '40%' }}></div>
          </div>
        </div>
        {/* Asset Management */}
        <div className="prof-sector-item">
          <div className="prof-sector-top">
            <div className="prof-sector-info">
              <Target className="prof-sector-icon" strokeWidth={2} />
              <div>
                <div className="prof-sector-name">Asset Management</div>
                <div className="prof-sector-count">2 of 10 modules</div>
              </div>
            </div>
            <div className="prof-sector-pct">20%</div>
          </div>
          <div className="prof-progress-track">
            <div className="prof-progress-bar" style={{ width: '20%' }}></div>
          </div>
        </div>
        {/* Corporate Finance */}
        <div className="prof-sector-item">
          <div className="prof-sector-top">
            <div className="prof-sector-info">
              <LayoutGrid className="prof-sector-icon" strokeWidth={2} />
              <div>
                <div className="prof-sector-name">Corporate Finance</div>
                <div className="prof-sector-count">3 of 10 modules</div>
              </div>
            </div>
            <div className="prof-sector-pct">30%</div>
          </div>
          <div className="prof-progress-track">
            <div className="prof-progress-bar" style={{ width: '30%' }}></div>
          </div>
        </div>
        {/* Real Estate */}
        <div className="prof-sector-item">
          <div className="prof-sector-top">
            <div className="prof-sector-info">
              <Home className="prof-sector-icon" strokeWidth={2} />
              <div>
                <div className="prof-sector-name">Real Estate</div>
                <div className="prof-sector-count">1 of 8 modules</div>
              </div>
            </div>
            <div className="prof-sector-pct">10%</div>
          </div>
          <div className="prof-progress-track">
            <div className="prof-progress-bar" style={{ width: '10%' }}></div>
          </div>
        </div>
        {/* Insurance */}
        <div className="prof-sector-item">
          <div className="prof-sector-top">
            <div className="prof-sector-info">
              <Shield className="prof-sector-icon" strokeWidth={2} />
              <div>
                <div className="prof-sector-name">Insurance</div>
                <div className="prof-sector-count">0 of 5 modules</div>
              </div>
            </div>
            <div className="prof-sector-pct">0%</div>
          </div>
          <div className="prof-progress-track">
            <div className="prof-progress-bar" style={{ width: '0%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SectorProgress;
