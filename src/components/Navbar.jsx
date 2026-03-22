import React from 'react';
import { Link } from 'react-router-dom';
import { Search, BookOpen, Wrench, TrendingUp, Activity, User } from 'lucide-react';

function Navbar({ onOpenMenu }) {
  return (
    <nav className="nav-wrapper">
      <div className="nav-container">
        <div className="nav-content">
          {/* logo */}
          <Link to="/" className="logo">
            <img src={process.env.PUBLIC_URL + '/assets/finlit-logo.png'} alt="FinLit Logo" className="logo-img-icon" />
            <span className="logo-text">FinLit</span>
          </Link>

          {/* search bar - desktop only */}
          <div className="search-container">
            <Search className="search-icon" strokeWidth={2} />
            <input type="text" className="search-input" placeholder="Search modules, topics, resources..." />
          </div>

          {/* navigation links - desktop only */}
          <div className="nav-links">
            <Link to="/learning" className="nav-link">
              <BookOpen className="nav-icon" strokeWidth={2} />
              Learning
            </Link>
            <Link to="/tools" className="nav-link">
              <Wrench className="nav-icon" strokeWidth={2} />
              Tools
            </Link>
            <Link to="/markets" className="nav-link">
              <TrendingUp className="nav-icon" strokeWidth={2} />
              Markets
            </Link>
            <Link to="/resources" className="nav-link">
              <Activity className="nav-icon" strokeWidth={2} />
              Resources
            </Link>
          </div>

          {/* user profile */}
          <Link to="/profile" className="profile-link">
            <User className="profile-icon" strokeWidth={2} />
          </Link>

          {/* hamburger menu button - mobile only */}
          <button className="hamburger-btn" id="hamburgerBtn" aria-label="Open menu" onClick={onOpenMenu}>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
