import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search, BookOpen, Wrench, TrendingUp, Activity, User, X,
  GraduationCap, Calculator, BarChart2, FileText, Layout, UserCircle, ArrowRight
} from 'lucide-react';
import { searchItems, buildModuleItems } from '../data/searchIndex';
import { API_BASE } from '../config';

const CAT_META = {
  Module:   { icon: GraduationCap, color: '#6366f1' },
  Page:     { icon: Layout,        color: '#0ea5e9' },
  Tool:     { icon: Calculator,    color: '#f59e0b' },
  Market:   { icon: BarChart2,     color: '#10b981' },
  Resource: { icon: FileText,      color: '#8b5cf6' },
  Profile:  { icon: UserCircle,    color: '#64748b' },
};

function Navbar({ onOpenMenu }) {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const [modules, setModules] = useState([]);
  const [activeIdx, setActiveIdx] = useState(-1);
  const wrapRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_BASE}/api/courses`)
      .then(r => r.ok ? r.json() : [])
      .then(data => setModules(data))
      .catch(() => {});
  }, []);

  const moduleItems = useMemo(() => buildModuleItems(modules), [modules]);
  const results = useMemo(() => searchItems(query, moduleItems), [query, moduleItems]);
  const showDropdown = focused && query.trim().length > 0;

  useEffect(() => { setActiveIdx(-1); }, [query]);

  useEffect(() => {
    const handler = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setFocused(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSelect = (item) => {
    setQuery('');
    setFocused(false);
    setActiveIdx(-1);
    navigate(item.path);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setQuery(''); setFocused(false); e.target.blur();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIdx(prev => (prev < results.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIdx(prev => (prev > 0 ? prev - 1 : results.length - 1));
    } else if (e.key === 'Enter' && results.length > 0) {
      handleSelect(results[activeIdx >= 0 ? activeIdx : 0]);
    }
  };

  return (
    <nav className="nav-wrapper" ref={wrapRef}>
      <div className={`nav-container${showDropdown ? ' nav-search-open' : ''}`}>
        <div className="nav-content">
          {/* logo */}
          <Link to="/" className="logo">
            <img src={process.env.PUBLIC_URL + '/assets/finlit-logo.png'} alt="FinLit Logo" className="logo-img-icon" />
            <span className="logo-text">FinLit</span>
          </Link>

          {/* search bar - desktop only */}
          <div className="search-container">
            <Search className="search-icon" strokeWidth={2} />
            <input
              type="text"
              className="search-input"
              placeholder="Search modules, topics, resources..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              onKeyDown={handleKeyDown}
            />
            {query && (
              <button className="search-clear-btn" onClick={() => { setQuery(''); }} aria-label="Clear search">
                <X size={14} />
              </button>
            )}
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

        {/* search results - extends navbar */}
        {showDropdown && (
          <div className="search-dropdown">
            {results.length > 0 ? (
              results.map((item, i) => {
                const meta = CAT_META[item.category] || CAT_META.Page;
                const Icon = meta.icon;
                return (
                  <button
                    key={item.path + item.label + i}
                    className={`search-result-item${i === activeIdx ? ' active' : ''}`}
                    onClick={() => handleSelect(item)}
                    onMouseEnter={() => setActiveIdx(i)}
                  >
                    <span className="search-result-icon" style={{ background: meta.color + '14', color: meta.color }}>
                      <Icon size={14} strokeWidth={2} />
                    </span>
                    <span className="search-result-body">
                      <span className="search-result-label">{item.label}</span>
                      <span className="search-result-desc">{item.description}</span>
                    </span>
                    <span className="search-result-cat">{item.category}</span>
                    <ArrowRight size={12} className="search-result-arrow" />
                  </button>
                );
              })
            ) : (
              <div className="search-no-results">
                <Search size={20} strokeWidth={1.5} />
                <span>No results for "{query.trim()}"</span>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
