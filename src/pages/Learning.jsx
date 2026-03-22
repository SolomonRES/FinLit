import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import SidePanel from '../components/SidePanel';
import Footer from '../components/Footer';
import LearningHeader from '../components/LearningHeader';
import DomainCard from '../components/DomainCard';
import modulesData from '../data/modules.json';

function Learning() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Group modules by domain preserving order of first appearance
  const domainOrder = [];
  const grouped = {};
  modulesData.forEach(m => {
    if (!grouped[m.domain]) {
      grouped[m.domain] = { key: m.domain_key, items: [] };
      domainOrder.push(m.domain);
    }
    grouped[m.domain].items.push(m);
  });

  const total = modulesData.length;
  const done = modulesData.filter(m => m.status === 'completed').length;
  const pct = Math.round((done / total) * 100);

  return (
    <>
      <Navbar onOpenMenu={() => setMenuOpen(true)} />
      <SidePanel isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* learning header section */}
      <LearningHeader total={total} done={done} pct={pct} />

      {/* domains list */}
      <section className="domains-section">
        <div className="domains-container" id="domainsContainer">
          {domainOrder.map((name, i) => {
            const { key, items } = grouped[name];
            return (
              <DomainCard
                key={name}
                domainName={name}
                domainKey={key}
                modules={items}
                isFirst={i === 0}
              />
            );
          })}
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Learning;
