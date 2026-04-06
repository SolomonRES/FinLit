import { useState } from 'react';

const STRIKE = 100;
const PREMIUM = 8;

const MODES = {
  longCall: {
    label: 'Long Call',
    color: '#2563eb',
    desc: `Pay $${PREMIUM} premium upfront. Breakeven at $${STRIKE + PREMIUM}. Profit is unlimited above breakeven. Max loss is the $${PREMIUM} premium if the stock expires below $${STRIKE}.`,
    pl: price => Math.max(-PREMIUM, price - STRIKE - PREMIUM),
  },
  longPut: {
    label: 'Long Put',
    color: '#7c3aed',
    desc: `Pay $${PREMIUM} premium upfront. Breakeven at $${STRIKE - PREMIUM}. Profit rises as stock falls below breakeven. Max loss is the $${PREMIUM} premium if stock stays above $${STRIKE}.`,
    pl: price => Math.max(-PREMIUM, STRIKE - price - PREMIUM),
  },
  shortCall: {
    label: 'Short Call',
    color: '#dc2626',
    desc: `Collect $${PREMIUM} premium upfront. Max gain is the $${PREMIUM} premium. Unlimited loss exposure above $${STRIKE + PREMIUM}. Used when expecting the stock to stay flat or fall.`,
    pl: price => Math.min(PREMIUM, -(price - STRIKE - PREMIUM)),
  },
  shortPut: {
    label: 'Short Put',
    color: '#d97706',
    desc: `Collect $${PREMIUM} premium upfront. Max gain is the $${PREMIUM} premium. Loss rises as stock falls below $${STRIKE - PREMIUM}. Used when expecting the stock to stay flat or rise.`,
    pl: price => Math.min(PREMIUM, -(STRIKE - price - PREMIUM)),
  },
};

const W = 520;
const H = 180;
const PAD = { t: 12, r: 20, b: 36, l: 44 };
const PRICES = Array.from({ length: 81 }, (_, i) => 60 + i);
const PL_MIN = -20;
const PL_MAX = 30;

function priceToX(price) {
  return PAD.l + ((price - 60) / 80) * (W - PAD.l - PAD.r);
}

function plToY(pl) {
  const innerH = H - PAD.t - PAD.b;
  return PAD.t + innerH - ((pl - PL_MIN) / (PL_MAX - PL_MIN)) * innerH;
}

const zeroY = plToY(0);

export default function OptionsPayoff() {
  const [mode, setMode] = useState('longCall');
  const m = MODES[mode];

  const pathD = PRICES.map((p, i) => {
    const x = priceToX(p);
    const y = plToY(Math.max(PL_MIN, Math.min(PL_MAX, m.pl(p))));
    return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');

  const plLabels = [-20, -10, 0, 10, 20, 30];
  const priceLabels = [60, 70, 80, 90, 100, 110, 120, 130, 140];

  return (
    <div className="op-wrap">
      <div className="op-toggles">
        {Object.keys(MODES).map(k => (
          <button
            key={k}
            className={`op-toggle${mode === k ? ' active' : ''}`}
            style={mode === k ? { background: MODES[k].color, borderColor: MODES[k].color } : {}}
            onClick={() => setMode(k)}
          >
            {MODES[k].label}
          </button>
        ))}
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="op-svg">
        {/* grid */}
        {plLabels.map(pl => {
          const y = plToY(pl);
          return (
            <g key={pl}>
              <line x1={PAD.l} y1={y} x2={W - PAD.r} y2={y} stroke={pl === 0 ? '#a3a3a3' : '#e5e5e5'} strokeWidth={pl === 0 ? 1.5 : 1} />
              <text x={PAD.l - 6} y={y + 4} fontSize="10" fill="#a3a3a3" textAnchor="end">{pl > 0 ? `+${pl}` : pl}</text>
            </g>
          );
        })}

        {/* x-axis labels */}
        {priceLabels.map(p => (
          <text key={p} x={priceToX(p)} y={H - 6} fontSize="10" fill="#a3a3a3" textAnchor="middle">${p}</text>
        ))}

        {/* strike price vertical line */}
        <line
          x1={priceToX(STRIKE)} y1={PAD.t}
          x2={priceToX(STRIKE)} y2={H - PAD.b}
          stroke="#171717" strokeWidth="1" strokeDasharray="4,3"
        />
        <text x={priceToX(STRIKE)} y={PAD.t - 2} fontSize="9" fill="#525252" textAnchor="middle">Strike ${STRIKE}</text>

        {/* area fill */}
        <path
          d={`${pathD} L${priceToX(140).toFixed(1)},${zeroY.toFixed(1)} L${priceToX(60).toFixed(1)},${zeroY.toFixed(1)} Z`}
          fill={m.color}
          opacity="0.1"
        />

        {/* payoff line */}
        <path
          key={mode}
          d={pathD}
          fill="none"
          stroke={m.color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="op-path"
        />
      </svg>

      <div className="op-info">
        <span className="op-info-label" style={{ color: m.color }}>{m.label}</span>
        <p className="op-info-desc">{m.desc}</p>
      </div>
    </div>
  );
}
