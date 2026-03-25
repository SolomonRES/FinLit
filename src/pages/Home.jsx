import React, { useState, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, ChevronDown } from 'lucide-react';
import Navbar from '../components/Navbar';
import SidePanel from '../components/SidePanel';
import Footer from '../components/Footer';
import HeroBackground from '../components/HeroBackground';
import TickerBar from '../components/TickerBar';
import LogoScroll from '../components/LogoScroll';
import IndustrySection from '../components/IndustrySection';
import CapabilitiesSection from '../components/CapabilitiesSection';
import ContactCTA from '../components/ContactCTA';

const WorldGlobe = lazy(() => import('../components/WorldGlobe'));

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Navbar onOpenMenu={() => setMenuOpen(true)} />
      <SidePanel isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* mobile hero - only visible on mobile */}
      <section className="mobile-hero">
        <div className="mobile-hero-background">
          <div className="grid-pattern"></div>
          <HeroBackground mobile={true} />
        </div>

        <div className="mobile-hero-content">
          {/* glass card */}
          <div className="glass-card mobile-glass-card">
            {/* animated logo */}
            <div className="animated-logo">
              <div className="animated-logo-icon">
                <div className="animated-logo-icon-inner"></div>
              </div>
              <div className="animated-logo-text">FinLit</div>
            </div>

            {/* tagline */}
            <p className="tagline">
              Breaking down complex financial concepts into practical, easy-to-understand guidance
            </p>

            {/* hero stats */}
            <div className="hero-stats">
              <div className="stat-card">
                <div className="stat-value">6</div>
                <div className="stat-label">Industry Sectors</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">80+</div>
                <div className="stat-label">Modules</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">Global</div>
                <div className="stat-label">Coverage</div>
              </div>
            </div>

            {/* cta buttons */}
            <div className="cta-buttons">
              <Link to="/learning" className="btn btn-primary">
                <span>Get Started</span>
                <ArrowRight className="btn-icon" strokeWidth={2} />
              </Link>
              <a href="#platform" className="btn btn-secondary">
                <span>Explore</span>
                <Search className="btn-icon" strokeWidth={2} />
              </a>
            </div>
          </div>

          {/* mobile search */}
          <div className="mobile-search-container">
            <Search className="mobile-search-icon" strokeWidth={2} />
            <input type="text" className="mobile-search-input" placeholder="Search modules, topics, resources..." />
          </div>
        </div>

        {/* scroll indicator */}
        <div className="scroll-indicator">
          <div className="platform-label">
            <span>Financial Literacy Platform</span>
          </div>
          <div className="scroll-arrow">
            <ChevronDown strokeWidth={2} />
          </div>
        </div>
      </section>

      {/* desktop hero */}
      <section className="hero">
        <div className="hero-background">
          <div className="grid-pattern"></div>
          <HeroBackground mobile={false} />
        </div>

        <div className="hero-content">
          <div className="hero-inner">
            <div className="glass-card">
              {/* animated logo */}
              <div className="animated-logo">
                <div className="animated-logo-icon">
                  <div className="animated-logo-icon-inner"></div>
                </div>
                <div className="animated-logo-text">FinLit</div>
              </div>

              {/* tagline */}
              <p className="tagline">
                Breaking down complex financial concepts into practical,<br className="desktop-break" />
                easy-to-understand guidance for decision making
              </p>

              {/* hero stats */}
              <div className="hero-stats">
                <div className="stat-card">
                  <div className="stat-value">6</div>
                  <div className="stat-label">Industry Sectors</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">80+</div>
                  <div className="stat-label">Modules</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">Global</div>
                  <div className="stat-label">Coverage</div>
                </div>
              </div>

              {/* cta buttons */}
              <div className="cta-buttons">
                <Link to="/learning" className="btn btn-primary">
                  <span>Get Started</span>
                  <ArrowRight className="btn-icon" strokeWidth={2} />
                </Link>
                <a href="#platform" className="btn btn-secondary">
                  <span>Explore Platform</span>
                  <Search className="btn-icon" strokeWidth={2} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* stock ticker */}
      <TickerBar />

      {/* logo scroll */}
      <LogoScroll />

      {/* global exchange globe */}
      <Suspense fallback={<div className="globe-lazy-placeholder">Loading globe...</div>}>
        <WorldGlobe />
      </Suspense>

      {/* industry & cities section */}
      <IndustrySection />

      {/* keywords scroll */}
      <section className="keywords-section">
        {/* first row - left to right */}
        <div className="keywords-track keywords-row-1">
          <div className="keywords-text">M&amp;A &bull; DCF &bull; LBO &bull; IPO &bull; DERIVATIVES &bull; EQUITY &bull; FIXED INCOME &bull; SWAPS &bull; OPTIONS &bull; FUTURES &bull; M&amp;A &bull; DCF &bull; LBO &bull; IPO &bull; DERIVATIVES &bull; EQUITY &bull; FIXED INCOME &bull; SWAPS &bull; OPTIONS &bull; FUTURES</div>
        </div>
        {/* second row - right to left */}
        <div className="keywords-track keywords-row-2">
          <div className="keywords-text">PORTFOLIO MANAGEMENT &bull; HEDGE FUNDS &bull; PRIVATE EQUITY &bull; RISK MANAGEMENT &bull; COMPLIANCE &bull; PORTFOLIO MANAGEMENT &bull; HEDGE FUNDS &bull; PRIVATE EQUITY &bull; RISK MANAGEMENT &bull; COMPLIANCE</div>
        </div>
        {/* third row - left to right */}
        <div className="keywords-track keywords-row-3">
          <div className="keywords-text">VALUATION &bull; FINANCIAL MODELING &bull; CAPITAL MARKETS &bull; ASSET ALLOCATION &bull; DUE DILIGENCE &bull; VALUATION &bull; FINANCIAL MODELING &bull; CAPITAL MARKETS &bull; ASSET ALLOCATION &bull; DUE DILIGENCE</div>
        </div>
      </section>

      {/* capabilities section */}
      <CapabilitiesSection />

      {/* CTA + contact section */}
      <ContactCTA />

      <Footer />
    </>
  );
}

export default Home;
