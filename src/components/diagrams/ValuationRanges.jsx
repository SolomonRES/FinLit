import { useEffect, useState } from 'react';

// All values in $M (illustrative company)
const METHODS = [
  { label: 'DCF Analysis',             low: 42, high: 78, color: '#1d4ed8', desc: 'Intrinsic value based on projected free cash flows discounted at WACC. Highly sensitive to terminal growth rate and discount rate assumptions.' },
  { label: 'Comparable Companies',     low: 50, high: 70, color: '#2563eb', desc: 'Public market multiples (EV/EBITDA, P/E) applied to the company\'s financials. Reflects current market sentiment.' },
  { label: 'Precedent Transactions',   low: 58, high: 88, color: '#7c3aed', desc: 'Multiples paid in past M&A deals, typically including a control premium of 20–40% over market price.' },
  { label: '52-Week Trading Range',    low: 38, high: 62, color: '#059669', desc: 'Historical stock price range reflecting public market\'s daily assessment of the company\'s equity value.' },
];

const CURRENT = 55; // current share price
const DOMAIN_MIN = 30;
const DOMAIN_MAX = 100;

function pct(v) { return ((v - DOMAIN_MIN) / (DOMAIN_MAX - DOMAIN_MIN)) * 100; }

export default function ValuationRanges() {
  const [animated, setAnimated] = useState(false);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 120);
    return () => clearTimeout(t);
  }, []);

  const info = hovered !== null ? METHODS[hovered] : null;

  return (
    <div className="vr-wrap">
      <div className="vr-chart">
        {/* axis labels */}
        <div className="vr-axis">
          {[30, 40, 50, 60, 70, 80, 90, 100].map(v => (
            <span key={v} className="vr-tick" style={{ left: `${pct(v)}%` }}>${v}</span>
          ))}
        </div>

        {/* current price line */}
        <div className="vr-current-line" style={{ left: `${pct(CURRENT)}%` }}>
          <span className="vr-current-label">Current ${CURRENT}</span>
        </div>

        {/* bars */}
        <div className="vr-bars">
          {METHODS.map((m, i) => (
            <div
              key={m.label}
              className="vr-row"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <span className="vr-method-label">{m.label}</span>
              <div className="vr-bar-track">
                <div
                  className={`vr-bar${animated ? ' animated' : ''}`}
                  style={{
                    '--bar-left': `${pct(m.low)}%`,
                    '--bar-width': `${pct(m.high) - pct(m.low)}%`,
                    '--bar-color': m.color,
                    animationDelay: `${i * 80}ms`,
                  }}
                >
                  <span className="vr-bar-low">${m.low}</span>
                  <span className="vr-bar-high">${m.high}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={`vr-info${info ? ' visible' : ''}`}>
        {info && (
          <>
            <span className="vr-info-label" style={{ color: info.color }}>{info.label}</span>
            <p className="vr-info-desc">{info.desc}</p>
          </>
        )}
        {!info && <p className="vr-hint">Hover a bar to learn about each valuation method</p>}
      </div>
    </div>
  );
}
