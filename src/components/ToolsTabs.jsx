import React, { useState } from 'react';
import { Calculator, FileText, Download, DollarSign, TrendingUp, BarChart2, Coins, BarChart3, ArrowRight, Info } from 'lucide-react';

function ToolsTabs() {
  const [activeTab, setActiveTab] = useState('calculators');

  return (
    <section className="tools-content">
      <div className="tools-container">
        {/* underline tabs */}
        <div className="tools-tabs" id="toolsTabs">
          <button
            className={`tools-tab${activeTab === 'calculators' ? ' active' : ''}`}
            data-tab="calculators"
            onClick={() => setActiveTab('calculators')}
          >
            <Calculator className="tools-tab-icon" strokeWidth={2} />
            Financial Calculators
          </button>
          <button
            className={`tools-tab${activeTab === 'casestudies' ? ' active' : ''}`}
            data-tab="casestudies"
            onClick={() => setActiveTab('casestudies')}
          >
            <FileText className="tools-tab-icon" strokeWidth={2} />
            Deal Case Studies
          </button>
          <button
            className={`tools-tab${activeTab === 'templates' ? ' active' : ''}`}
            data-tab="templates"
            onClick={() => setActiveTab('templates')}
          >
            <Download className="tools-tab-icon" strokeWidth={2} />
            Model Templates
          </button>
        </div>

        {/* Financial Calculators panel */}
        <div className={`tools-tab-panel${activeTab === 'calculators' ? ' active' : ''}`} id="panel-calculators">
          <div className="tools-section-header">
            <h2 className="tools-section-title">Interactive Financial Calculators</h2>
            <p className="tools-section-subtitle">Professional-grade tools for valuation, modeling, and financial analysis</p>
          </div>

          <div className="tools-grid">
            {/* DCF Valuation */}
            <div className="tool-card">
              <div className="tool-icon-wrapper">
                <DollarSign className="tool-icon" strokeWidth={2} />
              </div>
              <span className="tool-category-badge">VALUATION</span>
              <h3 className="tool-name">DCF Valuation</h3>
              <p className="tool-description">Calculate intrinsic value using discounted cash flow methodology</p>
              <a href="#" className="tool-open-link">
                Open Calculator
                <ArrowRight className="tool-open-arrow" strokeWidth={2} />
              </a>
            </div>

            {/* WACC Calculator */}
            <div className="tool-card">
              <div className="tool-icon-wrapper">
                <Calculator className="tool-icon" strokeWidth={2} />
              </div>
              <span className="tool-category-badge">VALUATION</span>
              <h3 className="tool-name">WACC Calculator</h3>
              <p className="tool-description">Compute weighted average cost of capital for discount rates</p>
              <a href="#" className="tool-open-link">
                Open Calculator
                <ArrowRight className="tool-open-arrow" strokeWidth={2} />
              </a>
            </div>

            {/* LBO Returns */}
            <div className="tool-card">
              <div className="tool-icon-wrapper">
                <TrendingUp className="tool-icon" strokeWidth={2} />
              </div>
              <span className="tool-category-badge">PRIVATE EQUITY</span>
              <h3 className="tool-name">LBO Returns</h3>
              <p className="tool-description">Model leveraged buyout returns and equity multiples</p>
              <a href="#" className="tool-open-link">
                Open Calculator
                <ArrowRight className="tool-open-arrow" strokeWidth={2} />
              </a>
            </div>

            {/* Accretion/Dilution */}
            <div className="tool-card">
              <div className="tool-icon-wrapper">
                <BarChart2 className="tool-icon" strokeWidth={2} />
              </div>
              <span className="tool-category-badge">M&amp;A</span>
              <h3 className="tool-name">Accretion/Dilution</h3>
              <p className="tool-description">Analyze M&amp;A impact on earnings per share</p>
              <a href="#" className="tool-open-link">
                Open Calculator
                <ArrowRight className="tool-open-arrow" strokeWidth={2} />
              </a>
            </div>

            {/* Bond Pricing */}
            <div className="tool-card">
              <div className="tool-icon-wrapper">
                <Coins className="tool-icon" strokeWidth={2} />
              </div>
              <span className="tool-category-badge">FIXED INCOME</span>
              <h3 className="tool-name">Bond Pricing</h3>
              <p className="tool-description">Calculate bond prices, yields, and duration</p>
              <a href="#" className="tool-open-link">
                Open Calculator
                <ArrowRight className="tool-open-arrow" strokeWidth={2} />
              </a>
            </div>

            {/* Comparable Analysis */}
            <div className="tool-card">
              <div className="tool-icon-wrapper">
                <BarChart3 className="tool-icon" strokeWidth={2} />
              </div>
              <span className="tool-category-badge">VALUATION</span>
              <h3 className="tool-name">Comparable Analysis</h3>
              <p className="tool-description">Analyze trading and transaction multiples</p>
              <a href="#" className="tool-open-link">
                Open Calculator
                <ArrowRight className="tool-open-arrow" strokeWidth={2} />
              </a>
            </div>
          </div>
        </div>

        {/* Deal Case Studies panel */}
        <div className={`tools-tab-panel${activeTab === 'casestudies' ? ' active' : ''}`} id="panel-casestudies">
          <div className="tools-section-header">
            <h2 className="tools-section-title">Real-World Deal Case Studies</h2>
            <p className="tools-section-subtitle">Analyze landmark transactions and learn from actual deal structures</p>
          </div>
          <div className="tools-empty-state">
            <div className="tools-empty-icon">
              <FileText strokeWidth={2} />
            </div>
            <h3 className="tools-empty-title">Coming Soon</h3>
            <p className="tools-empty-desc">Deal case studies are currently in development</p>
          </div>
        </div>

        {/* Model Templates panel */}
        <div className={`tools-tab-panel${activeTab === 'templates' ? ' active' : ''}`} id="panel-templates">
          <div className="tools-section-header">
            <h2 className="tools-section-title">Downloadable Model Templates</h2>
            <p className="tools-section-subtitle">Professional Excel and Google Sheets templates for financial modeling</p>
          </div>
          <div className="tools-empty-state">
            <div className="tools-empty-icon">
              <Download strokeWidth={2} />
            </div>
            <h3 className="tools-empty-title">Coming Soon</h3>
            <p className="tools-empty-desc">Model templates are currently in development</p>
          </div>
        </div>

        {/* coming soon notice */}
        <div className="tools-notice">
          <div className="tools-notice-icon">
            <Info strokeWidth={2} />
          </div>
          <div className="tools-notice-content">
            <h4 className="tools-notice-title">Coming Soon: Interactive Calculators</h4>
            <p className="tools-notice-desc">Full-featured financial calculators are in development. These tools will provide real-time calculations with detailed breakdowns, sensitivity analysis, and exportable results. Track your progress through the Learning Hub to unlock these professional resources.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ToolsTabs;
