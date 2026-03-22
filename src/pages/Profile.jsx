import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SidePanel from '../components/SidePanel';
import Footer from '../components/Footer';
import ProfileHeader from '../components/ProfileHeader';
import OverallProgress from '../components/OverallProgress';
import SectorProgress from '../components/SectorProgress';
import Achievements from '../components/Achievements';
import SkillDevelopment from '../components/SkillDevelopment';
import RecentActivity from '../components/RecentActivity';

function Profile() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Navbar onOpenMenu={() => setMenuOpen(true)} />
      <SidePanel isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* profile header */}
      <ProfileHeader />

      {/* main content */}
      <div className="prof-content">
        <div className="prof-container">
          <div className="prof-layout">
            {/* left column (main) */}
            <div className="prof-main">
              <OverallProgress />
              <SectorProgress />
            </div>

            {/* right column (sidebar) */}
            <div className="prof-sidebar">
              <Achievements />

              {/* keep learning */}
              <div className="prof-card glass-card prof-cta-card">
                <h3 className="prof-cta-title">Keep Learning</h3>
                <p className="prof-cta-desc">You're making excellent progress! Continue your journey to financial expertise.</p>
                <Link to="/learning" className="prof-cta-btn">Continue Learning</Link>
              </div>

              {/* quick stats */}
              <div className="prof-card glass-card prof-quickstats">
                <h3 className="prof-quickstats-title">Quick Stats</h3>
                <div className="prof-quickstats-list">
                  <div className="prof-quickstat-row">
                    <span className="prof-quickstat-label">Learning Time</span>
                    <span className="prof-quickstat-value">42.5 hours</span>
                  </div>
                  <div className="prof-quickstat-row">
                    <span className="prof-quickstat-label">Avg. Daily Progress</span>
                    <span className="prof-quickstat-value">2.3 modules</span>
                  </div>
                  <div className="prof-quickstat-row">
                    <span className="prof-quickstat-label">Next Milestone</span>
                    <span className="prof-quickstat-value">50 modules</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* full-width: skill development */}
          <SkillDevelopment />

          {/* full-width: recent activity */}
          <RecentActivity />
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Profile;
