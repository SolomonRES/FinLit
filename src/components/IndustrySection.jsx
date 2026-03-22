import React from 'react';
import { Target, Building2, BarChart2, Package, LayoutGrid, Home, Shield } from 'lucide-react';

function IndustrySection() {
  return (
    <section className="industry-section" id="platform">
      <div className="section-header">
        <div className="section-badge">
          <Target className="badge-icon" strokeWidth={2} />
          Six Sectors &bull; Six Global Hubs
        </div>
        <h2 className="section-title">Global Financial Landscape</h2>
        <p className="section-description">
          Comprehensive coverage across major financial sectors and world-leading financial centers
        </p>
      </div>

      <div className="industry-grid-container">
        {/* industry cards */}
        <div className="industry-grid">
          <div className="industry-card">
            <div className="industry-icon">
              <Building2 strokeWidth={2} />
            </div>
            <h3 className="industry-title">Investment Banking</h3>
            <p className="industry-description">M&amp;A, IPOs, debt &amp; equity capital markets</p>
            <div className="industry-footer">
              <div className="industry-modules">18 modules available</div>
              <div className="industry-progress"><div className="industry-progress-bar"></div></div>
            </div>
          </div>

          <div className="industry-card">
            <div className="industry-icon">
              <BarChart2 strokeWidth={2} />
            </div>
            <h3 className="industry-title">Capital Markets</h3>
            <p className="industry-description">Equity, fixed income, derivatives trading</p>
            <div className="industry-footer">
              <div className="industry-modules">15 modules available</div>
              <div className="industry-progress"><div className="industry-progress-bar"></div></div>
            </div>
          </div>

          <div className="industry-card">
            <div className="industry-icon">
              <Package strokeWidth={2} />
            </div>
            <h3 className="industry-title">Asset Management</h3>
            <p className="industry-description">Portfolio management, hedge funds, PE</p>
            <div className="industry-footer">
              <div className="industry-modules">14 modules available</div>
              <div className="industry-progress"><div className="industry-progress-bar"></div></div>
            </div>
          </div>

          <div className="industry-card">
            <div className="industry-icon">
              <LayoutGrid strokeWidth={2} />
            </div>
            <h3 className="industry-title">Corporate Finance</h3>
            <p className="industry-description">Financial planning, valuation, treasury</p>
            <div className="industry-footer">
              <div className="industry-modules">12 modules available</div>
              <div className="industry-progress"><div className="industry-progress-bar"></div></div>
            </div>
          </div>

          <div className="industry-card">
            <div className="industry-icon">
              <Home strokeWidth={2} />
            </div>
            <h3 className="industry-title">Real Estate</h3>
            <p className="industry-description">Commercial RE, REITs, development</p>
            <div className="industry-footer">
              <div className="industry-modules">11 modules available</div>
              <div className="industry-progress"><div className="industry-progress-bar"></div></div>
            </div>
          </div>

          <div className="industry-card">
            <div className="industry-icon">
              <Shield strokeWidth={2} />
            </div>
            <h3 className="industry-title">Insurance &amp; Risk</h3>
            <p className="industry-description">Underwriting, actuarial, reinsurance</p>
            <div className="industry-footer">
              <div className="industry-modules">10 modules available</div>
              <div className="industry-progress"><div className="industry-progress-bar"></div></div>
            </div>
          </div>
        </div>

        {/* financial cities list */}
        <div className="cities-list">
          <div className="city-item">
            <div className="city-image" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/assets/nyc.png)` }}>
              <div className="city-overlay"></div>
            </div>
            <div className="city-info">
              <h4 className="city-name">New York</h4>
              <p className="city-description">Wall Street Hub</p>
            </div>
          </div>
          <div className="city-item">
            <div className="city-image" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/assets/london.png)` }}>
              <div className="city-overlay"></div>
            </div>
            <div className="city-info">
              <h4 className="city-name">London</h4>
              <p className="city-description">European Finance</p>
            </div>
          </div>
          <div className="city-item">
            <div className="city-image" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/assets/hongkong.png)` }}>
              <div className="city-overlay"></div>
            </div>
            <div className="city-info">
              <h4 className="city-name">Hong Kong</h4>
              <p className="city-description">Asia Pacific</p>
            </div>
          </div>
          <div className="city-item">
            <div className="city-image" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/assets/tokyo.png)` }}>
              <div className="city-overlay"></div>
            </div>
            <div className="city-info">
              <h4 className="city-name">Tokyo</h4>
              <p className="city-description">Asian Markets</p>
            </div>
          </div>
          <div className="city-item">
            <div className="city-image" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/assets/singapore.png)` }}>
              <div className="city-overlay"></div>
            </div>
            <div className="city-info">
              <h4 className="city-name">Singapore</h4>
              <p className="city-description">APAC Gateway</p>
            </div>
          </div>
          <div className="city-item">
            <div className="city-image" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/assets/germany.png)` }}>
              <div className="city-overlay"></div>
            </div>
            <div className="city-info">
              <h4 className="city-name">Frankfurt</h4>
              <p className="city-description">EU Finance Center</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default IndustrySection;
