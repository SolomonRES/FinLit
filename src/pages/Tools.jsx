import React, { useState } from 'react';
import { Wrench } from 'lucide-react';
import Navbar from '../components/Navbar';
import SidePanel from '../components/SidePanel';
import Footer from '../components/Footer';
import ToolsTabs from '../components/ToolsTabs';

function Tools() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Navbar onOpenMenu={() => setMenuOpen(true)} />
      <SidePanel isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* tools hero section */}
      <section className="tools-hero">
        <div className="grid-pattern"></div>
        <div className="tools-hero-content">
          <div className="tools-badge">
            <Wrench className="badge-icon" strokeWidth={2} />
            Practical Financial Tools
          </div>
          <h1 className="tools-title">Tools &amp; Resources</h1>
          <p className="tools-subtitle">Interactive calculators, real deal case studies, and downloadable templates</p>
        </div>
      </section>

      {/* tools tabs + content */}
      <ToolsTabs />

      <Footer />
    </>
  );
}

export default Tools;
