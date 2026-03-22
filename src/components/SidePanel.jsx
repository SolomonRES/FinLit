import React from 'react';
import { Link } from 'react-router-dom';
import { X, BookOpen, Wrench, TrendingUp, Activity, User, ChevronRight } from 'lucide-react';

function SidePanel({ isOpen, onClose }) {
  return (
    <>
      <div
        className={`side-panel-overlay${isOpen ? ' open' : ''}`}
        id="sidePanelOverlay"
        onClick={onClose}
      ></div>
      <aside className={`side-panel${isOpen ? ' open' : ''}`} id="sidePanel">
        <div className="side-panel-decoration"></div>
        <div className="side-panel-header">
          <Link to="/" className="logo" onClick={onClose}>
            <img src={process.env.PUBLIC_URL + '/assets/finlit-logo.png'} alt="FinLit Logo" className="logo-img-icon" />
            <span className="logo-text">FinLit</span>
          </Link>
          <button className="side-panel-close" id="sidePanelClose" aria-label="Close menu" onClick={onClose}>
            <X strokeWidth={2} />
          </button>
        </div>
        <nav className="side-panel-nav">
          <Link to="/learning" className="side-panel-link" style={{"--delay": 0}} onClick={onClose}>
            <div className="side-panel-icon-wrapper">
              <BookOpen className="side-panel-icon" strokeWidth={2} />
            </div>
            <div className="side-panel-link-text">
              <span className="side-panel-link-title">Learning</span>
              <span className="side-panel-link-desc">Courses &amp; modules</span>
            </div>
            <ChevronRight className="side-panel-arrow" strokeWidth={2} />
          </Link>
          <Link to="/tools" className="side-panel-link" style={{"--delay": 1}} onClick={onClose}>
            <div className="side-panel-icon-wrapper">
              <Wrench className="side-panel-icon" strokeWidth={2} />
            </div>
            <div className="side-panel-link-text">
              <span className="side-panel-link-title">Tools</span>
              <span className="side-panel-link-desc">Calculators &amp; models</span>
            </div>
            <ChevronRight className="side-panel-arrow" strokeWidth={2} />
          </Link>
          <Link to="/markets" className="side-panel-link" style={{"--delay": 2}} onClick={onClose}>
            <div className="side-panel-icon-wrapper">
              <TrendingUp className="side-panel-icon" strokeWidth={2} />
            </div>
            <div className="side-panel-link-text">
              <span className="side-panel-link-title">Markets</span>
              <span className="side-panel-link-desc">Live data &amp; analysis</span>
            </div>
            <ChevronRight className="side-panel-arrow" strokeWidth={2} />
          </Link>
          <Link to="/resources" className="side-panel-link" style={{"--delay": 3}} onClick={onClose}>
            <div className="side-panel-icon-wrapper">
              <Activity className="side-panel-icon" strokeWidth={2} />
            </div>
            <div className="side-panel-link-text">
              <span className="side-panel-link-title">Resources</span>
              <span className="side-panel-link-desc">Guides &amp; references</span>
            </div>
            <ChevronRight className="side-panel-arrow" strokeWidth={2} />
          </Link>

          <div className="side-panel-divider"></div>

          <Link to="/profile" className="side-panel-link" style={{"--delay": 4}} onClick={onClose}>
            <div className="side-panel-icon-wrapper">
              <User className="side-panel-icon" strokeWidth={2} />
            </div>
            <div className="side-panel-link-text">
              <span className="side-panel-link-title">Profile</span>
              <span className="side-panel-link-desc">Account &amp; settings</span>
            </div>
            <ChevronRight className="side-panel-arrow" strokeWidth={2} />
          </Link>
        </nav>
        <div className="side-panel-footer">
          <p>&copy; 2026 FinLit</p>
        </div>
      </aside>
    </>
  );
}

export default SidePanel;
