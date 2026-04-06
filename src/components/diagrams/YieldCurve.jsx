import { useState } from 'react';

// Maturities: 3M, 6M, 1Y, 2Y, 5Y, 10Y, 20Y, 30Y
const MATURITIES = ['3M', '6M', '1Y', '2Y', '5Y', '10Y', '20Y', '30Y'];

const CURVES = {
  normal: {
    label: 'Normal (Upward Sloping)',
    color: '#2563eb',
    rates: [5.25, 5.30, 5.10, 4.75, 4.40, 4.20, 4.40, 4.50],
    desc: 'The most common shape. Long-term rates > short-term rates, reflecting expectations of economic growth and inflation over time. Investors demand a premium to lend money for longer.',
  },
  inverted: {
    label: 'Inverted (Downward Sloping)',
    color: '#dc2626',
    rates: [5.25, 5.20, 5.10, 4.90, 4.40, 3.90, 3.60, 3.50],
    desc: 'Short-term rates exceed long-term rates. Historically a reliable recession predictor (yield curve inversions preceded every U.S. recession since 1955). Signals market expects rate cuts ahead.',
  },
  flat: {
    label: 'Flat Curve',
    color: '#d97706',
    rates: [4.80, 4.85, 4.80, 4.75, 4.70, 4.65, 4.60, 4.55],
    desc: 'Short and long-term rates are similar. Often a transition state between normal and inverted. Signals economic uncertainty - markets unsure about growth and inflation direction.',
  },
};

const W = 520;
const H = 200;
const PAD = { t: 16, r: 20, b: 36, l: 44 };

function rateToY(rate, minR, maxR) {
  const innerH = H - PAD.t - PAD.b;
  return PAD.t + innerH - ((rate - minR) / (maxR - minR)) * innerH;
}

function buildPath(rates) {
  const minR = 3.0;
  const maxR = 6.0;
  const innerW = W - PAD.l - PAD.r;
  return rates
    .map((r, i) => {
      const x = PAD.l + (i / (rates.length - 1)) * innerW;
      const y = rateToY(r, minR, maxR);
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');
}

export default function YieldCurve() {
  const [mode, setMode] = useState('normal');
  const curve = CURVES[mode];
  const path = buildPath(curve.rates);

  const minR = 3.0;
  const maxR = 6.0;
  const innerW = W - PAD.l - PAD.r;

  // Y-axis labels: 3%, 4%, 5%, 6%
  const yLabels = [3, 4, 5, 6];

  return (
    <div className="yc-wrap">
      <div className="yc-toggles">
        {Object.keys(CURVES).map(k => (
          <button
            key={k}
            className={`yc-toggle${mode === k ? ' active' : ''}`}
            style={mode === k ? { background: CURVES[k].color, borderColor: CURVES[k].color } : {}}
            onClick={() => setMode(k)}
          >
            {k.charAt(0).toUpperCase() + k.slice(1)}
          </button>
        ))}
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="yc-svg">
        {/* grid lines */}
        {yLabels.map(r => {
          const y = rateToY(r, minR, maxR);
          return (
            <g key={r}>
              <line x1={PAD.l} y1={y} x2={W - PAD.r} y2={y} stroke="#e5e5e5" strokeWidth="1" />
              <text x={PAD.l - 6} y={y + 4} fontSize="10" fill="#a3a3a3" textAnchor="end">{r}%</text>
            </g>
          );
        })}

        {/* x-axis labels */}
        {MATURITIES.map((m, i) => {
          const x = PAD.l + (i / (MATURITIES.length - 1)) * innerW;
          return (
            <text key={m} x={x} y={H - 6} fontSize="10" fill="#a3a3a3" textAnchor="middle">{m}</text>
          );
        })}

        {/* area fill */}
        <path
          d={`${path} L${(W - PAD.r).toFixed(1)},${(H - PAD.b).toFixed(1)} L${PAD.l},${(H - PAD.b).toFixed(1)} Z`}
          fill={curve.color}
          opacity="0.08"
        />

        {/* curve line */}
        <path
          key={mode}
          d={path}
          fill="none"
          stroke={curve.color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="yc-path"
        />

        {/* dots */}
        {curve.rates.map((r, i) => {
          const x = PAD.l + (i / (MATURITIES.length - 1)) * innerW;
          const y = rateToY(r, minR, maxR);
          return (
            <circle key={i} cx={x} cy={y} r="3.5" fill={curve.color} className="yc-dot" />
          );
        })}
      </svg>

      <div className="yc-info">
        <span className="yc-info-label" style={{ color: curve.color }}>{curve.label}</span>
        <p className="yc-info-desc">{curve.desc}</p>
      </div>
    </div>
  );
}
