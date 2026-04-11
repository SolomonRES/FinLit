import React, { useState, useEffect, useCallback } from 'react';
import { Clock, Activity, DollarSign, Target, PlusCircle, X, Eye, Maximize2, BarChart3, Zap } from 'lucide-react';
import Navbar from '../components/Navbar';
import SidePanel from '../components/SidePanel';
import Footer from '../components/Footer';
import MarketIndex from '../components/MarketIndex';
import AddWatchlistForm from '../components/AddWatchlistForm';
import { API_BASE } from '../config';

const INDICES = [
  { symbol: '^GSPC', display: 'SPX', name: 'S&P 500', region: 'US' },
  { symbol: '^DJI', display: 'DJI', name: 'Dow Jones', region: 'US' },
  { symbol: '^IXIC', display: 'IXIC', name: 'NASDAQ', region: 'US' },
  { symbol: '^FTSE', display: 'UKX', name: 'FTSE 100', region: 'EU' },
  { symbol: '^GDAXI', display: 'DAX', name: 'DAX', region: 'EU' },
  { symbol: '^HSI', display: 'HSI', name: 'Hang Seng', region: 'APAC' },
  { symbol: '^N225', display: 'NKY', name: 'Nikkei 225', region: 'APAC' },
];

const FOREX_PAIRS = [
  { symbol: 'EURUSD=X', label: 'EUR/USD' },
  { symbol: 'GBPUSD=X', label: 'GBP/USD' },
  { symbol: 'JPY=X', label: 'USD/JPY' },
  { symbol: 'CNY=X', label: 'USD/CNY' },
];

const COMMODITIES = [
  { symbol: 'CL=F', label: 'WTI Crude', unit: '$/bbl' },
  { symbol: 'GC=F', label: 'Gold', unit: '$/oz' },
  { symbol: 'SI=F', label: 'Silver', unit: '$/oz' },
  { symbol: 'NG=F', label: 'Natural Gas', unit: '$/MMBtu' },
];

function formatNum(n) {
  if (n == null || isNaN(n)) return '—';
  return n >= 1000 ? n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : n.toFixed(2);
}

function formatChange(change, pct) {
  if (change == null) return { text: '—', positive: true };
  const sign = change >= 0 ? '+' : '';
  const p = pct != null ? ` (${sign}${pct.toFixed(2)}%)` : '';
  return { text: `${sign}${formatNum(change)}${p}`, positive: change >= 0 };
}

async function fetchQuotes(symbols) {
  const joined = symbols.join(',');
  try {
    const res = await fetch(`${API_BASE}/api/quotes?symbols=${encodeURIComponent(joined)}`);
    if (!res.ok) throw new Error('API error');
    return await res.json();
  } catch {
    return null; // null = network/server error, [] = empty response
  }
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function Markets() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showWatchlistForm, setShowWatchlistForm] = useState(false);
  const [watchlist, setWatchlist] = useState([]);
  const [showTerminal, setShowTerminal] = useState(false);
  const [terminalSymbol, setTerminalSymbol] = useState('SPY');
  const [lastUpdated, setLastUpdated] = useState(null);
  const [loading, setLoading] = useState(true);
  const [serverWaking, setServerWaking] = useState(false);

  // Live data state
  const [indexData, setIndexData] = useState([]);
  const [forexData, setForexData] = useState([]);
  const [commodityData, setCommodityData] = useState([]);

  // Fetch live market data
  const fetchAllData = useCallback(async () => {
    setLoading(true);
    setServerWaking(false);
    const allSymbols = [
      ...INDICES.map(i => i.symbol),
      ...FOREX_PAIRS.map(f => f.symbol),
      ...COMMODITIES.map(c => c.symbol),
    ];

    let quotes = null;
    const MAX_RETRIES = 4;
    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
      quotes = await fetchQuotes(allSymbols);
      if (quotes && quotes.length > 0) break;
      if (attempt === 0) setServerWaking(true);
      if (attempt < MAX_RETRIES - 1) await sleep(6000);
    }
    setServerWaking(false);
    quotes = quotes || [];

    const map = {};
    quotes.forEach(q => { map[q.symbol] = q; });

    setIndexData(INDICES.map(idx => {
      const q = map[idx.symbol];
      if (!q) return { ...idx, value: '—', change: '—', positive: true };
      const ch = formatChange(q.regularMarketChange, q.regularMarketChangePercent);
      return { ...idx, value: formatNum(q.regularMarketPrice), change: ch.text, positive: ch.positive };
    }));

    setForexData(FOREX_PAIRS.map(fp => {
      const q = map[fp.symbol];
      if (!q) return { ...fp, rate: '—', change: '—', positive: true };
      const ch = formatChange(q.regularMarketChange, null);
      return { ...fp, rate: formatNum(q.regularMarketPrice), change: ch.text, positive: ch.positive };
    }));

    setCommodityData(COMMODITIES.map(cm => {
      const q = map[cm.symbol];
      if (!q) return { ...cm, rate: '—', change: '—', positive: true };
      const ch = formatChange(q.regularMarketChange, null);
      return { ...cm, rate: formatNum(q.regularMarketPrice), change: ch.text, positive: ch.positive };
    }));

    setLastUpdated(new Date());
    setLoading(false);
  }, []);

  useEffect(() => { fetchAllData(); }, [fetchAllData]);

  // Fetch watchlist
  useEffect(() => {
    fetch(`${API_BASE}/api/watchlist`)
      .then(r => r.ok ? r.json() : [])
      .then(setWatchlist)
      .catch(() => {});
  }, []);

  const handleEntryAdded = useCallback((entry) => {
    setWatchlist(prev => [...prev, entry]);
  }, []);

  const openTerminal = (sym) => {
    setTerminalSymbol(sym || 'SPY');
    setShowTerminal(true);
  };

  return (
    <>
      <Navbar onOpenMenu={() => setMenuOpen(true)} />
      <SidePanel isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* TradingView Chart Modal */}
      {showTerminal && (
        <div className="terminal-overlay" onClick={() => setShowTerminal(false)}>
          <div className="terminal-modal" onClick={e => e.stopPropagation()}>
            <div className="terminal-topbar">
              <div className="terminal-topbar-left">
                <BarChart3 size={18} strokeWidth={2} />
                <span className="terminal-title">Live Chart</span>
                <span className="terminal-symbol-badge">{terminalSymbol}</span>
              </div>
              <button className="terminal-close" onClick={() => setShowTerminal(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="terminal-body">
              <iframe
                src={`https://s.tradingview.com/widgetembed/?frameElementId=tradingview_widget&symbol=${encodeURIComponent(terminalSymbol)}&interval=D&hidesidetoolbar=0&symboledit=1&saveimage=1&toolbarbg=f1f3f6&studies=%5B%5D&theme=light&style=1&timezone=America%2FNew_York&withdateranges=1&showpopupbutton=1&locale=en`}
                title={`${terminalSymbol} Chart`}
                className="terminal-iframe"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

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
            <div className="markets-header-actions">
              {lastUpdated && (
                <div className="markets-updated" style={{ display: 'flex' }}>
                  <Clock className="markets-clock-icon" strokeWidth={2} />
                  <span>Updated: {lastUpdated.toLocaleTimeString()}</span>
                </div>
              )}
              <button className="terminal-launch-btn" onClick={() => openTerminal('SPY')}>
                <Maximize2 size={16} />
                Live Chart
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* markets content */}
      <div className="markets-content">
        <div className="markets-container">

          {/* Quick chart ticker buttons */}
          <section className="quick-charts-section">
            <div className="quick-charts-bar">
              <Zap size={14} strokeWidth={2.5} />
              <span className="quick-charts-label">Quick Charts:</span>
              {['SPY', 'QQQ', 'DIA', 'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'BTC-USD', 'GC=F'].map(sym => (
                <button key={sym} className="quick-chart-btn" onClick={() => openTerminal(sym)}>
                  {sym}
                </button>
              ))}
            </div>
          </section>

          {/* watchlist section */}
          <section className="markets-section">
            <div className="markets-section-header" style={{ justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Eye className="markets-section-icon" strokeWidth={2} />
                <h2 className="markets-section-title">My Watchlist</h2>
              </div>
              <button
                className="watchlist-toggle"
                onClick={() => setShowWatchlistForm(prev => !prev)}
                type="button"
              >
                {showWatchlistForm ? <><X size={16} /> Close</> : <><PlusCircle size={16} /> Add Stock</>}
              </button>
            </div>

            {showWatchlistForm && <AddWatchlistForm onEntryAdded={handleEntryAdded} />}

            {watchlist.length > 0 ? (
              <div className="data-table glass-card watchlist-entries">
                <div className="watchlist-entry-row watchlist-header-row">
                  <span>Symbol</span>
                  <span>Company</span>
                  <span style={{ textAlign: 'right' }}>Target</span>
                  <span style={{ textAlign: 'center' }}>Sector</span>
                </div>
                {watchlist.map(w => (
                  <div className="watchlist-entry-row" key={w._id} onClick={() => openTerminal(w.symbol)} style={{ cursor: 'pointer' }}>
                    <span className="watchlist-symbol">{w.symbol}</span>
                    <span className="watchlist-name">{w.name}</span>
                    <span className="watchlist-price">${Number(w.targetPrice).toFixed(2)}</span>
                    <span className="watchlist-sector-tag">{w.sector}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="data-table glass-card">
                <p className="watchlist-empty">No stocks on your watchlist yet. Add one above!</p>
              </div>
            )}
          </section>

          {/* major indices */}
          <section className="markets-section">
            <div className="markets-section-header">
              <Activity className="markets-section-icon" strokeWidth={2} />
              <h2 className="markets-section-title">Major Indices</h2>
              {loading && <span className="data-loading-badge">{serverWaking ? 'Server waking up...' : 'Fetching live data...'}</span>}
            </div>

            <div className="indices-grid">
              {indexData.length > 0 ? indexData.map(idx => (
                <div key={idx.display} onClick={() => openTerminal(idx.symbol)} style={{ cursor: 'pointer' }}>
                  <MarketIndex
                    symbol={idx.display}
                    name={idx.name}
                    region={idx.region}
                    value={idx.value}
                    change={idx.change}
                    positive={idx.positive}
                  />
                </div>
              )) : INDICES.map(idx => (
                <MarketIndex key={idx.display} symbol={idx.display} name={idx.name} region={idx.region} value="—" change="—" positive={true} />
              ))}
            </div>
          </section>

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
                  {forexData.length > 0 ? forexData.map((fp, i) => (
                    <div className={`data-row${i === forexData.length - 1 ? ' last' : ''}`} key={fp.symbol}>
                      <div className="data-pair">{fp.label}</div>
                      <div className="data-values">
                        <span className="data-rate">{fp.rate}</span>
                        <span className={`data-change ${fp.positive ? 'positive' : 'negative'}`}>{fp.change}</span>
                      </div>
                    </div>
                  )) : FOREX_PAIRS.map((fp, i) => (
                    <div className={`data-row${i === FOREX_PAIRS.length - 1 ? ' last' : ''}`} key={fp.symbol}>
                      <div className="data-pair">{fp.label}</div>
                      <div className="data-values">
                        <span className="data-rate">—</span>
                        <span className="data-change positive">—</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* commodities */}
              <div>
                <div className="markets-section-header">
                  <Target className="markets-section-icon" strokeWidth={2} />
                  <h2 className="markets-section-title">Commodities</h2>
                </div>
                <div className="data-table glass-card">
                  {commodityData.length > 0 ? commodityData.map((cm, i) => (
                    <div className={`data-row${i === commodityData.length - 1 ? ' last' : ''}`} key={cm.symbol} onClick={() => openTerminal(cm.symbol)} style={{ cursor: 'pointer' }}>
                      <div>
                        <div className="data-pair">{cm.label}</div>
                        <div className="data-unit">{cm.unit}</div>
                      </div>
                      <div className="data-values">
                        <span className="data-rate">{cm.rate}</span>
                        <span className={`data-change ${cm.positive ? 'positive' : 'negative'}`}>{cm.change}</span>
                      </div>
                    </div>
                  )) : COMMODITIES.map((cm, i) => (
                    <div className={`data-row${i === COMMODITIES.length - 1 ? ' last' : ''}`} key={cm.symbol}>
                      <div>
                        <div className="data-pair">{cm.label}</div>
                        <div className="data-unit">{cm.unit}</div>
                      </div>
                      <div className="data-values">
                        <span className="data-rate">—</span>
                        <span className="data-change positive">—</span>
                      </div>
                    </div>
                  ))}
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
