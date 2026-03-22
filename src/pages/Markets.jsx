import React, { useState, useEffect, useRef } from 'react';
import { Clock, TrendingUp, Activity, DollarSign, Target } from 'lucide-react';
import Navbar from '../components/Navbar';
import SidePanel from '../components/SidePanel';
import Footer from '../components/Footer';
import SPXChart from '../components/SPXChart';
import MarketIndex from '../components/MarketIndex';

function Markets() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const tradingviewWrapperRef = useRef(null);

  const marketTime = new Date().toLocaleTimeString();

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      tradingviewWrapperRef.current && tradingviewWrapperRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handler = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  return (
    <>
      <Navbar onOpenMenu={() => setMenuOpen(true)} />
      <SidePanel isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* markets header */}
      <section className="markets-header">
        <div className="grid-pattern"></div>
        <div className="markets-header-content">
          <div className="markets-header-row">
            <div>
              <div className="markets-live-badge">
                <span className="markets-live-dot"></span>
                Live Market Data
              </div>
              <h1 className="markets-title">Global Markets</h1>
              <p className="markets-subtitle">Real-time market intelligence across major exchanges</p>
            </div>
            <div className="markets-updated">
              <Clock className="markets-clock-icon" strokeWidth={2} />
              <span>Updated: <span id="marketTime">{marketTime}</span></span>
            </div>
          </div>
        </div>
      </section>

      {/* markets content */}
      <div className="markets-content">
        <div className="markets-container">

          {/* Live Market Chart (TradingView iframe) */}
          <section className="tradingview-section">
            <div className="tradingview-header">
              <div className="tradingview-header-left">
                <TrendingUp className="markets-section-icon" strokeWidth={2} />
                <h3>Live Market Chart</h3>
              </div>
              <p className="tradingview-desc">Real-time S&P 500 chart powered by TradingView. Interact with indicators, time-frames, and drawing tools.</p>
            </div>
            <div className="tradingview-wrapper" id="tradingviewWrapper" ref={tradingviewWrapperRef}>
              <button
                className="tradingview-fullscreen-btn"
                id="tradingviewFullscreenBtn"
                title="Toggle fullscreen"
                onClick={handleFullscreen}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {isFullscreen ? (
                    <>
                      <polyline points="4 14 10 14 10 20"></polyline>
                      <polyline points="20 10 14 10 14 4"></polyline>
                      <line x1="14" y1="10" x2="21" y2="3"></line>
                      <line x1="3" y1="21" x2="10" y2="14"></line>
                    </>
                  ) : (
                    <>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <polyline points="9 21 3 21 3 15"></polyline>
                      <line x1="21" y1="3" x2="14" y2="10"></line>
                      <line x1="3" y1="21" x2="10" y2="14"></line>
                    </>
                  )}
                </svg>
              </button>
              <iframe
                src="https://s.tradingview.com/widgetembed/?frameElementId=tradingview_widget&symbol=AMEX%3ASPY&interval=D&hidesidetoolbar=0&symboledit=1&saveimage=1&toolbarbg=f1f3f6&studies=%5B%5D&theme=light&style=1&timezone=America%2FNew_York&withdateranges=1&showpopupbutton=1&studies_overrides=%7B%7D&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D&showpopupbutton=1&locale=en&utm_source=localhost&utm_medium=widget_new&utm_campaign=chart"
                title="TradingView S&P 500 Chart"
                className="tradingview-iframe"
                allowTransparency="true"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          </section>

          {/* major indices */}
          <section className="markets-section">
            <div className="markets-section-header">
              <Activity className="markets-section-icon" strokeWidth={2} />
              <h2 className="markets-section-title">Major Indices</h2>
            </div>

            <div className="indices-grid">
              <MarketIndex symbol="SPX" name="S&amp;P 500" region="US" value="4,760.12" change="+34.35 (+0.73%)" positive={true} />
              <MarketIndex symbol="DJI" name="Dow Jones" region="US" value="37,529.84" change="+218.96 (+0.59%)" positive={true} />
              <MarketIndex symbol="IXIC" name="NASDAQ" region="US" value="14,864.85" change="+123.74 (+0.84%)" positive={true} />
              <MarketIndex symbol="UKX" name="FTSE 100" region="EU" value="7,632.45" change="-22.14 (-0.29%)" positive={false} />
              <MarketIndex symbol="DAX" name="DAX" region="EU" value="16,758.23" change="+45.67 (+0.27%)" positive={true} />
              <MarketIndex symbol="HSI" name="Hang Seng" region="APAC" value="16,334.91" change="-134.22 (-0.81%)" positive={false} />
              <MarketIndex symbol="NKY" name="Nikkei 225" region="APAC" value="35,489.57" change="+289.12 (+0.82%)" positive={true} />
            </div>
          </section>

          {/* charts section */}
          <SPXChart />

          {/* currencies & commodities */}
          <section className="markets-section">
            <div className="markets-bottom-grid">
              {/* currencies */}
              <div>
                <div className="markets-section-header">
                  <DollarSign className="markets-section-icon" strokeWidth={2} />
                  <h2 className="markets-section-title">Currencies</h2>
                </div>
                <div className="data-table glass-card">
                  <div className="data-row">
                    <div className="data-pair">EUR/USD</div>
                    <div className="data-values">
                      <span className="data-rate">1.0847</span>
                      <span className="data-change positive">+0.0012</span>
                    </div>
                  </div>
                  <div className="data-row">
                    <div className="data-pair">GBP/USD</div>
                    <div className="data-values">
                      <span className="data-rate">1.2634</span>
                      <span className="data-change negative">-0.0023</span>
                    </div>
                  </div>
                  <div className="data-row">
                    <div className="data-pair">USD/JPY</div>
                    <div className="data-values">
                      <span className="data-rate">148.73</span>
                      <span className="data-change positive">+0.45</span>
                    </div>
                  </div>
                  <div className="data-row last">
                    <div className="data-pair">USD/CNY</div>
                    <div className="data-values">
                      <span className="data-rate">7.2456</span>
                      <span className="data-change negative">-0.0089</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* commodities */}
              <div>
                <div className="markets-section-header">
                  <Target className="markets-section-icon" strokeWidth={2} />
                  <h2 className="markets-section-title">Commodities</h2>
                </div>
                <div className="data-table glass-card">
                  <div className="data-row">
                    <div>
                      <div className="data-pair">WTI Crude</div>
                      <div className="data-unit">$/bbl</div>
                    </div>
                    <div className="data-values">
                      <span className="data-rate">78.45</span>
                      <span className="data-change positive">+1.23</span>
                    </div>
                  </div>
                  <div className="data-row">
                    <div>
                      <div className="data-pair">Gold</div>
                      <div className="data-unit">$/oz</div>
                    </div>
                    <div className="data-values">
                      <span className="data-rate">2,034.50</span>
                      <span className="data-change negative">-8.70</span>
                    </div>
                  </div>
                  <div className="data-row">
                    <div>
                      <div className="data-pair">Silver</div>
                      <div className="data-unit">$/oz</div>
                    </div>
                    <div className="data-values">
                      <span className="data-rate">23.12</span>
                      <span className="data-change positive">+0.34</span>
                    </div>
                  </div>
                  <div className="data-row last">
                    <div>
                      <div className="data-pair">Natural Gas</div>
                      <div className="data-unit">$/MMBtu</div>
                    </div>
                    <div className="data-values">
                      <span className="data-rate">2.67</span>
                      <span className="data-change positive">+0.09</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>

      <Footer />
    </>
  );
}

export default Markets;
