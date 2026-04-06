import React, { useState, useEffect, useCallback } from 'react';
import Navbar from '../components/Navbar';
import SidePanel from '../components/SidePanel';
import Footer from '../components/Footer';
import LearningHeader from '../components/LearningHeader';
import DomainCard from '../components/DomainCard';
import ModuleDrawer from '../components/ModuleDrawer';
import { API_BASE } from '../config';

function Learning() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [slowLoad, setSlowLoad] = useState(false);
  const [error, setError] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);

  useEffect(() => {
    const slowTimer = setTimeout(() => setSlowLoad(true), 6000);

    fetch(`${API_BASE}/api/courses`)
      .then(res => {
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        return res.json();
      })
      .then(data => {
        clearTimeout(slowTimer);
        setModules(data);
        setLoading(false);
      })
      .catch(() => {
        clearTimeout(slowTimer);
        setError('Could not reach the server. Please refresh and try again.');
        setLoading(false);
      });

    return () => clearTimeout(slowTimer);
  }, []);

  const handleOpenModule = useCallback(mod => setSelectedModule(mod), []);
  const handleCloseDrawer = useCallback(() => setSelectedModule(null), []);

  // Group modules by domain preserving order of first appearance
  const domainOrder = [];
  const grouped = {};
  modules.forEach(m => {
    if (!grouped[m.domain]) {
      grouped[m.domain] = { key: m.domain_key, items: [] };
      domainOrder.push(m.domain);
    }
    grouped[m.domain].items.push(m);
  });

  const total = modules.length;
  const done = modules.filter(m => m.status === 'completed').length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <>
      <Navbar onOpenMenu={() => setMenuOpen(true)} />
      <SidePanel isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      {loading && (
        <div className="backend-loading-overlay" aria-live="polite" aria-label="Loading modules">
          <div className="backend-loading-card">
            <div className="backend-spinner" />
            <p className="backend-loading-title">Connecting to Server</p>
            <p className="backend-loading-sub">
              {slowLoad
                ? 'The server is waking up - this can take up to 2 minutes on first load.'
                : 'Fetching your learning modules\u2026'}
            </p>
          </div>
        </div>
      )}

      {/* learning header section */}
      <LearningHeader total={total} done={done} pct={pct} />

      {/* domains list */}
      <section className="domains-section">
        <div className="domains-container" id="domainsContainer">
          {error && (
            <div className="backend-error-banner">
              <span>{error}</span>
              <button className="backend-retry-btn" onClick={() => window.location.reload()}>
                Retry
              </button>
            </div>
          )}
          {!loading && !error && domainOrder.map((name, i) => {
            const { key, items } = grouped[name];
            return (
              <DomainCard
                key={name}
                domainName={name}
                domainKey={key}
                modules={items}
                onModuleClick={handleOpenModule}
              />
            );
          })}
        </div>
      </section>

      <Footer />

      <ModuleDrawer module={selectedModule} onClose={handleCloseDrawer} />
    </>
  );
}

export default Learning;
